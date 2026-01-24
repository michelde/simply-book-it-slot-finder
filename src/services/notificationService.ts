/**
 * Service for sending notifications via Telegram
 */
import TelegramBot from 'node-telegram-bot-api';
import { TimeSlot } from '../types';
import { config } from '../config';

export class NotificationService {
  private bot: TelegramBot | null = null;
  private readonly token?: string;
  private readonly chatId?: string;

  constructor() {
    this.token = config.telegramToken;
    this.chatId = config.telegramChatId;

    if (this.token) {
      this.bot = new TelegramBot(this.token, { polling: false });
    }
  }

  /**
   * Sends notification about available slots via Telegram
   * @param slots Array of available time slots
   */
  async sendNotification(slots: TimeSlot[]): Promise<void> {
    if (!this.isConfigured()) {
      console.warn('Telegram notification is not configured. Skipping notification.');
      console.log(`Found ${slots.length} available slot(s):`);
      slots.forEach((slot) => {
        console.log(`  - ${slot.client_date} at ${slot.client_time}`);
      });
      return;
    }

    try {
      const message = this.formatMessage(slots);
      await this.bot!.sendMessage(this.chatId!, message, {
        parse_mode: 'MarkdownV2',
      });
      console.log(`Notification sent successfully for ${slots.length} slot(s)`);
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
      throw new Error(`Telegram notification failed: ${error}`);
    }
  }

  /**
   * Checks if Telegram notification is properly configured
   */
  private isConfigured(): boolean {
    return !!(this.token && this.chatId && this.bot);
  }

  /**
   * Formats the notification message
   * @param slots Array of time slots
   */
  private formatMessage(slots: TimeSlot[]): string {
    if (slots.length === 1) {
      const slot = slots[0];
      return `*Neuer Termin verfügbar\\!*\n\n📅 ${this.escapeMarkdown(slot.client_date)}\n🕐 ${this.escapeMarkdown(slot.client_time)}`;
    }

    let message = `*${slots.length} neue Termine verfügbar\\!*\n\n`;
    slots.forEach((slot, index) => {
      message += `${index + 1}\\. 📅 ${this.escapeMarkdown(slot.client_date)} 🕐 ${this.escapeMarkdown(slot.client_time)}\n`;
    });
    return message;
  }

  /**
   * Escapes special characters for Telegram MarkdownV2
   * @param text Text to escape
   */
  private escapeMarkdown(text: string): string {
    return text.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&');
  }
}