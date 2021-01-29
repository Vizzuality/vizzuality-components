import dayjs from 'dayjs';

/**
 * Translate Moment units into DayJS units
 */
const getDayJsInterval = (interval) => {
  // Shorthand units don't have to be translated
  const momentToDayJSUnit = {
    years: 'year',
    quarters: 'quarter',
    months: 'month',
    weeks: 'week',
    days: 'day',
    hours: 'hour',
    minutes: 'minute',
    seconds: 'second',
    milliseconds: 'millisecond',
  };

  return momentToDayJSUnit[interval] || interval;
};

export const addToDate = (date, count, interval = 'days', toEnd) => {
  const d = dayjs(date);

  return toEnd
    ? d.add(count, getDayJsInterval(interval)).endOf(getDayJsInterval(interval))
    : d.add(count, getDayJsInterval(interval));
};

export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format);
};

export const formatDatePretty = (date, dateFormat = 'YYYY-MM-DD') => {
  const d = dayjs(date);
  const hasDays = dateFormat.includes('DD');
  const hasMonths = dateFormat.includes('MM');

  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEPT',
    'OCT',
    'NOV',
    'DEC',
  ];
  const day = d.format('DD');
  const month = d.month();
  const year = d.year();

  return `${hasDays ? `${day} ` : ''}${hasMonths ? `${months[month]} ` : ''}${year}`;
};

// startDate and endDate are string dates
export const dateDiff = (startDate, endDate, interval) => {
  const diff = dayjs(endDate).diff(dayjs(startDate), getDayJsInterval(interval));

  return diff * -1;
};

export const getTicks = (timelineConfig = {}) => {
  const { minDate, maxDate, interval, marks, dateFormat } = timelineConfig;

  // If user defines their own markers let's parse them if he pass a date as a value
  if (marks) {
    const newMarks = Object.keys(marks).reduce((acc, m) => {
      if (typeof m === 'string') {
        const key = dayjs(m).diff(dayjs(minDate), getDayJsInterval(interval));

        return {
          ...acc,
          [key]: marks[m],
        };
      }

      return {
        ...acc,
        [m]: marks[m],
      };
    }, {});

    return newMarks;
  }

  // Otherwise, let's add default marks at the begginig and the end
  const minMark = 0;
  const maxMark = dayjs(maxDate).diff(dayjs(minDate), getDayJsInterval(interval));

  const newMarks = {
    [minMark]: {
      label: dayjs(minDate).format(dateFormat),
    },
    [maxMark]: {
      label: dayjs(maxDate).format(dateFormat),
    },
  };

  return newMarks;
};

// startDate and endDate are string dates
export const gradientConverter = (gradient, minDate, interval) =>
  Object.keys(gradient).reduce(
    (acc, val) => ({
      ...acc,
      [dateDiff(val, minDate, interval)]: gradient[val],
    }),
    {}
  );
