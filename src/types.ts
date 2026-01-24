/**
 * Type definitions for the Simply Book It Slot Finder
 */

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  type: string;
  slots_count: number;
  client_date: string;
  client_time: string;
  available_slots: number | null;
  total_slots: number | null;
}