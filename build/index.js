"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron = require("node-cron");
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');
require('@dotenvx/dotenvx').config();
function init() {
    try {
        // ┌────────────── second (optional)
        // │ ┌──────────── minute
        // │ │ ┌────────── hour
        // │ │ │ ┌──────── day of month
        // │ │ │ │ ┌────── month
        // │ │ │ │ │ ┌──── day of week
        // │ │ │ │ │ │
        // │ │ │ │ │ │
        // * * * * * *
        const schedule = process.env.SCHEDULE || "*/30 * * * *";
        if (process.env.NODE_ENV !== "PRODUCTION") {
            // run immediately for development tests
            run();
        }
        else {
            cron.schedule(schedule, () => __awaiter(this, void 0, void 0, function* () {
                run();
            }));
        }
    }
    catch (error) {
        console.error(error);
    }
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Start new run at: ${new Date().toISOString()}`);
        try {
            const daysAhead = parseInt(process.env.DAYSAHEAD || "28");
            const host = process.env.BOOKITHOST || "";
            if (host === "")
                throw new Error("Missing environment variable BOOKITHOST.");
            const url = `${host}/v2/booking/time-slots/?from=${new Date().toISOString().slice(0, 10)}
&to=${futureDate(daysAhead)}
&location=
&category=
&provider=2
&service=2
&count=1
&booking_id=`;
            const { data } = yield axios.get(url);
            const timeSlots = data;
            const freeSlots = timeSlots.filter((e) => e.type !== "busy");
            if (freeSlots.length > 0) {
                sendTelegramMessage(freeSlots.slice(0, 1));
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(`Unknown error from Axios: ${JSON.stringify(error)}`);
            }
            else {
                console.error(`Unknown error while fetch data: ${JSON.stringify(error)}`);
            }
        }
    });
}
function sendTelegramMessage(slots) {
    const token = process.env.TELEGRAM_TOKEN;
    if (token === undefined) {
        console.log('Missing Telegram Token to send message.');
        return;
    }
    const chatId = process.env.TELEGRAM_CHATID;
    if (chatId === undefined) {
        console.log('Missing Telegram chat id to send message.');
        return;
    }
    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(token, { polling: false });
    let message = '';
    if (slots.length === 1) {
        message = `*Neuer Termin am*: \n${slots[0].client_date.replaceAll('-', '\\-')} / ${slots[0].client_time}`;
    }
    else {
        message = '*Neue Termine am:* \n';
        slots.forEach((slot) => {
            message += `${slot.client_date.replaceAll('-', '\\-')} / ${slot.client_time}\n`;
        });
    }
    bot.sendMessage(chatId, message, { "parse_mode": "MarkdownV2" });
}
function futureDate(addDays = 28) {
    let date = new Date();
    date.setDate(date.getDate() + addDays);
    return date.toISOString().slice(0, 10);
}
init();
