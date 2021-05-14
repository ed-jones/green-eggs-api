export const unixToISO = (unixTimestamp: string | number) => {
  return new Date(Number(unixTimestamp)).toISOString();
}
