/**
 * Get current date in YYYY-MM-DD format
 * @returns {string} Current date as ISO date string
 */
export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const formatDateToString = (isoDate: string): string => {
  return new Date(isoDate + 'T12:00:00').toDateString();
};
