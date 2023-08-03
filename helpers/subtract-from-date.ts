type DateOffsetType = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

export const subtractFromDate = (
  date: Date,
  { years, months, days, hours, minutes, seconds, milliseconds }: DateOffsetType
) => {
  const millisecondsOffset = milliseconds ?? 0;
  const secondsOffset = seconds ? 1000 * seconds : 0;
  const minutesOffset = minutes ? 1000 * 60 * minutes : 0;
  const hoursOffset = hours ? 1000 * 60 * 60 * hours : 0;
  const daysOffset = days ? 1000 * 60 * 60 * 24 * days : 0;

  // calculating offset
  const dateOffset =
    millisecondsOffset +
    secondsOffset +
    minutesOffset +
    hoursOffset +
    daysOffset;

  // new date
  let newDate: Date | number = date;

  // check for year and month
  if (years) newDate = date.setFullYear(date.getFullYear() - years);
  if (months) newDate = date.setMonth(date.getMonth() - months);
  newDate = new Date(+newDate - dateOffset);
  return newDate;
};
