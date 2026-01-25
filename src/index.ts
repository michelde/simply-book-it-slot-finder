/**
 * Simply Book It Slot Finder
 * Main entry point for the application
 */

// Load environment variables FIRST before any other imports
require('@dotenvx/dotenvx').config();

import cron from 'node-cron';
import { config } from './config';
import { BookingService } from './services/bookingService';
import { NotificationService } from './services/notificationService';

class SlotFinderApp {
  private bookingService: BookingService;
  private notificationService: NotificationService;

  constructor() {
    this.bookingService = new BookingService();
    this.notificationService = new NotificationService();
  }

  /**
   * Initializes and starts the application
   */
  async start(): Promise<void> {
    try {
      console.log('='.repeat(60));
      console.log('Simply Book It Slot Finder');
      console.log('='.repeat(60));
      console.log(`Environment: ${config.nodeEnv}`);
      console.log(`Schedule: ${config.schedule}`);
      console.log(`Checking: ${config.bookItHost}`);
      console.log(`Days ahead: ${config.daysAhead}`);
      console.log(`Provider: ${config.provider}, Service: ${config.service}`);
      console.log('='.repeat(60));

      if (config.nodeEnv !== 'PRODUCTION') {
        console.log('\n🔍 Running in development mode - executing immediately...\n');
        await this.run();
      } else {
        console.log(`\n⏱️  Running in production mode - scheduled: ${config.schedule}\n`);
        cron.schedule(config.schedule, async () => {
          await this.run();
        });
        console.log('✅ Scheduler started successfully. Waiting for next run...\n');
      }
    } catch (error) {
      console.error('❌ Failed to start application:', error);
      process.exit(1);
    }
  }

  /**
   * Main execution logic - checks for available slots and sends notifications
   */
  private async run(): Promise<void> {
    const timestamp = new Date().toISOString();
    console.log(`\n${'─'.repeat(60)}`);
    console.log(`🔍 Starting slot check at: ${timestamp}`);
    console.log(`${'─'.repeat(60)}`);

    try {
      const availableSlots = await this.bookingService.getAvailableSlots();

      if (availableSlots.length > 0) {
        console.log(`✅ Found ${availableSlots.length} available slot(s)!`);
        
        // Send notification about available slots
        await this.notificationService.sendNotification(availableSlots);
      } else {
        console.log('ℹ️  No available slots found.');
      }

      console.log(`${'─'.repeat(60)}\n`);
    } catch (error) {
      console.error('❌ Error during slot check:', error);
      console.log(`${'─'.repeat(60)}\n`);
    }
  }
}

// Start the application
const app = new SlotFinderApp();
app.start().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});