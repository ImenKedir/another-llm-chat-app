export function formatISOToDayAndHour(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // shows the full name of the day
    hour: "2-digit", // shows the hour in 2-digit format
    minute: "2-digit", // shows the minute in 2-digit format
    hour12: true, // uses 12-hour format with AM/PM
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
