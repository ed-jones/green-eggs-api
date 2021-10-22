/**
 * Author: Edward Jones
 */

/**
 * Converts a unix timestamp to an ISO string
 */
export const unixToISO = (unixTimestamp: string | number) => {
  return new Date(Number(unixTimestamp)).toISOString();
}
