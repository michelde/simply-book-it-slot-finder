# Quick Start Guide

Get up and running with Simply Book It Slot Finder in 5 minutes!

## Prerequisites

- Node.js 18+ or Docker installed
- A Telegram bot token (optional but recommended)
- The SimplyBook.it URL you want to monitor

## Option 1: Quick Start with Docker (Recommended)

### 1. Clone and Configure

```bash
git clone https://github.com/yourusername/simply-book-it-slot-finder.git
cd simply-book-it-slot-finder
cp .env.example .env
```

### 2. Edit Configuration

Edit the `.env` file with your details:

```bash
# Required
BOOKITHOST=https://yourcompany.simplybook.it

# For Telegram notifications (recommended)
TELEGRAM_TOKEN=your_bot_token_here
TELEGRAM_CHATID=your_chat_id_here

# Optional
NODE_ENV=PRODUCTION
SCHEDULE=*/30 * * * *
DAYSAHEAD=28
```

### 3. Run with Docker Compose

```bash
docker-compose up -d
```

### 4. Check Logs

```bash
docker-compose logs -f slot-finder
```

That's it! The application is now monitoring for available slots.

## Option 2: Quick Start with Node.js

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/simply-book-it-slot-finder.git
cd simply-book-it-slot-finder
npm install
cp .env.example .env
```

### 2. Configure

Edit `.env` with your settings (same as above).

### 3. Build and Run

```bash
npm run build
npm start
```

## Getting Your Telegram Credentials

### Create a Bot

1. Open Telegram and search for [@BotFather](https://t.me/BotFather)
2. Send `/newbot`
3. Follow the instructions
4. Save the token provided

### Get Your Chat ID

1. Send a message to your bot
2. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Find the `"chat":{"id":` field
4. That's your chat ID!

## Testing

To test without waiting for the schedule, run in development mode:

```bash
# With Node.js
NODE_ENV=development npm run start:dev

# With Docker
docker run --env-file .env -e NODE_ENV=development simply-book-it-slot-finder
```

This will check for slots immediately.

## Customizing the Schedule

Edit `SCHEDULE` in your `.env` file using cron syntax:

```bash
# Every 15 minutes
SCHEDULE=*/15 * * * *

# Every hour
SCHEDULE=0 * * * *

# Every day at 9 AM
SCHEDULE=0 9 * * *

# Every 2 hours during business hours (9-5, Mon-Fri)
SCHEDULE=0 9-17/2 * * 1-5
```

## Stopping the Application

### With Docker Compose

```bash
docker-compose down
```

### With Node.js

Press `Ctrl+C` in the terminal.

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [TROUBLESHOOTING](README.md#troubleshooting) if you encounter issues
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute to the project

## Common Issues

**Not receiving notifications?**
- Verify your `TELEGRAM_TOKEN` and `TELEGRAM_CHATID` are correct
- Send a message to your bot first to start the chat

**No slots found?**
- Check that `BOOKITHOST` is correct
- Verify `PROVIDER` and `SERVICE` IDs match your booking system
- Try increasing `DAYSAHEAD`

**Docker container exits immediately?**
- Check logs: `docker-compose logs slot-finder`
- Ensure `.env` file exists and is readable

## Support

Need help? 
- Check the [full documentation](README.md)
- [Open an issue](https://github.com/yourusername/simply-book-it-slot-finder/issues)

---

Happy slot hunting! 🎯