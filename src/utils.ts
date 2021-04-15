const UnixToISO = (unixTimestamp: string | number) => {
  return new Date(Number(unixTimestamp)).toISOString();
}

export default UnixToISO;
