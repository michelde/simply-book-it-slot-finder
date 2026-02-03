/**
 * Configuration module for the Simply Book It Slot Finder
 * Validates and exports environment variables with defaults
 */

export interface Config {
  schedule: string;
  nodeEnv: string;
  daysAhead: number;
  bookItHost: string;
  telegramToken?: string;
  telegramChatId?: string;
  provider: string;
  service: string;
  datesIgnore: string[];
}

/**
 * Validates required environment variables
 * @throws Error if required variables are missing
 */
function validateConfig(): Config {
  const bookItHost = process.env.BOOKITHOST;
  
  if (!bookItHost) {
    throw new Error('Missing required environment variable: BOOKITHOST');
  }

  // Validate URL format
  try {
    new URL(bookItHost);
  } catch (error) {
    throw new Error('BOOKITHOST must be a valid URL');
  }

  const daysAhead = parseInt(process.env.DAYSAHEAD || '28', 10);
  if (isNaN(daysAhead) || daysAhead < 1 || daysAhead > 365) {
    throw new Error('DAYSAHEAD must be a number between 1 and 365');
  }

  // Parse and validate DATES_IGNORE
  const datesIgnoreRaw = process.env.DATES_IGNORE || '';
  const datesIgnore: string[] = [];
  
  if (datesIgnoreRaw.trim()) {
    const dates = datesIgnoreRaw.split(',').map(d => d.trim()).filter(d => d);
    
    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    for (const date of dates) {
      if (!dateRegex.test(date)) {
        throw new Error(`Invalid date format in DATES_IGNORE: ${date}. Expected format: YYYY-MM-DD`);
      }
      // Verify it's a valid date
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid date in DATES_IGNORE: ${date}`);
      }
      datesIgnore.push(date);
    }
  }

  return {
    schedule: process.env.SCHEDULE || '*/30 * * * *',
    nodeEnv: process.env.NODE_ENV || 'development',
    daysAhead,
    bookItHost,
    telegramToken: process.env.TELEGRAM_TOKEN,
    telegramChatId: process.env.TELEGRAM_CHATID,
    provider: process.env.PROVIDER || '2',
    service: process.env.SERVICE || '2',
    datesIgnore,
  };
}

export const config = validateConfig();