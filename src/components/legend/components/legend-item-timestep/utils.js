import moment from 'moment';
import find from 'lodash/find';
import compact from 'lodash/compact';

export function getRangeForDates(dates, _range) {
  const duration = moment(dates[1]).diff(moment(dates[0]), 'hours');
  const dateRange = find(_range, duration);

  return dateRange ? [dateRange.start, dateRange.end] : [dates[0], dates[1]];
}

export const addToDate = (date, count, interval = 'days') => {
  const result = new Date(date);
  if (interval === 'years') {
    result.setFullYear(result.getFullYear() + count);
  } else if (interval === 'months') {
    result.setMonth(result.getMonth() + count);
  } else if (interval === 'days') {
    result.setDate(result.getDate() + count);
  }
  return result;
};

export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  let month = null;
  let day = null;
  const year = d.getFullYear();

  if (format.includes('MM')) {
    month = (d.getMonth() + 1).toString();
    if (month.length < 2) month = `0${month}`;
  }

  if (format.includes('DD')) {
    day = d.getDate().toString();
    if (day.length < 2) day = `0${day}`;
  }

  return compact([year, month, day]).join('-');
};

export const formatDatePretty = (date, dateFormat = 'YYYY-MM-DD') => {
  const d = new Date(date);
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
    'DEC'
  ];
  let day = d.getDate().toString();
  const month = d.getMonth();
  const year = d.getFullYear();

  if (day.length < 2) day = `0${day}`;

  return `${hasDays ? `${day} ` : ''}${hasMonths ? `${months[month]} ` : ''}${
    year
  }`;
};

// startDate and endDate are string dates
export const dateDiff = (startDate, endDate, interval) => {
  const diff = moment.utc(endDate).diff(startDate, interval);
  return Math.abs(diff);
};

export const getTicks = (timelineConfig = {}) => {
  const { minDate, maxDate, interval, marks, dateFormat } = timelineConfig;

  // If user defines their own markers let's parse them if he pass a date as a value
  if (marks) {
    const newMarks = Object.keys(marks).reduce((acc, m) => {
      if (typeof m === 'string') {
        const key = moment(m).diff(minDate, interval);

        return {
          ...acc,
          [key]: marks[m]
        }
      }

      return {
        ...acc,
        [m]: marks[m]
      }
    }, {});

    return newMarks;
  }


  // Otherwise, let's add default marks at the begginig and the end
  const minMark = 0;
  const maxMark = moment(maxDate).diff(minDate, interval);

  const newMarks = {
    [minMark]: {
      label: moment(minDate).format(dateFormat)
    },
    [maxMark]: {
      label: moment(maxDate).format(dateFormat)
    }
  };

  return newMarks;
};