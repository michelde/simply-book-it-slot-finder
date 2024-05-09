# simply-book-it-slot-finder

Simple script to find a free time slot at a simly booking page. It uses the same API as
used by the browser. If a time slot was found the user can be notified using a telegram
chat. The notification part can be also enhanced to other notification handlers, e.g.
E-Mail, Whatsapp, Slack, Teams, ...

## Usage

In order to get this program running you need to execute this on any host, which runs
as long as you want to check for new time slots.

The program requires some settings which can be done using the environment variables:

| parameter  | optional | default | description |
|------------|----------|---------|-------------|
| SCHEDULE   | yes      | every 30 minutes |   |
| NODE_ENV   | yes      | -       | To run in scheduled mode use "PRODUCTION" |
| DAYSAHEAD  | yes      | 28      | How many days in the future check for new slots. |
| BOOKITHOST | no       | -       | Which site to query, e.g. https://danmiessen.simplybook.it  |
| TELEGRAM_TOKEN |  no  | -       | The bot token you get from Telegram. |
| TELEGRAM_CHATID | no  | -       | The chat id in which the message should be posted. |

To start the program you need to call the npm script: `npm run start`.

Once a free slot was found a message will be send and will look like this:
![Telegram Sample](/images/telegram_sample.jpeg)
