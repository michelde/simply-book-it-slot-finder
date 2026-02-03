/**
 * Service for interacting with SimplyBook.it API
 */
import axios, { AxiosError } from 'axios';
import { TimeSlot } from '../types';
import { config } from '../config';

export class BookingService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = config.bookItHost;
  }

  /**
   * Fetches available time slots from the booking system
   * @returns Array of time slots
   * @throws Error if the API request fails
   */
  async getAvailableSlots(): Promise<TimeSlot[]> {
    try {
      const fromDate = this.getCurrentDate();
      const toDate = this.getFutureDate(config.daysAhead);

      const url = `${this.baseUrl}/v2/booking/time-slots/`;
      const params = {
        from: fromDate,
        to: toDate,
        location: '',
        category: '',
        provider: config.provider,
        service: config.service,
        count: 1,
        booking_id: '',
      };

      const response = await axios.get<TimeSlot[]>(url, { params });
      
      // Filter out busy slots
      let freeSlots = response.data.filter((slot) => slot.type !== 'busy');
      
      // Filter out ignored dates if configured
      if (config.datesIgnore.length > 0) {
        freeSlots = freeSlots.filter((slot) => !config.datesIgnore.includes(slot.date));
      }
      
      return freeSlots;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(
          `Failed to fetch booking slots: ${axiosError.message}. ` +
          `Status: ${axiosError.response?.status || 'unknown'}`
        );
      }
      throw new Error(`Unknown error while fetching booking data: ${error}`);
    }
  }

  /**
   * Gets current date in ISO format (YYYY-MM-DD)
   */
  private getCurrentDate(): string {
    return new Date().toISOString().slice(0, 10);
  }

  /**
   * Gets future date in ISO format (YYYY-MM-DD)
   * @param daysAhead Number of days to add
   */
  private getFutureDate(daysAhead: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toISOString().slice(0, 10);
  }
}