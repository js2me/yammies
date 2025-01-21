import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { typeGuard } from './type-guard.js';
import { Maybe } from './utils/types.js';

import 'dayjs/locale/ru';

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.locale('ru');

const NO_VALUE = '–'; // en-dash

const toLibFormat = function (
  value: Maybe<string | number | Dayjs>,
  asTime?: boolean,
): Dayjs | undefined {
  if (typeGuard.isNumber(value)) {
    if (asTime) {
      return dayjs.duration(value) as unknown as Dayjs;
    }
    return dayjs(value);
  } else if (typeGuard.isString(value)) {
    return dayjs(value);
  } else if (dayjs.isDayjs(value)) {
    return value;
  }
};

export const formatDate = function (
  value: Maybe<string | number | Dayjs>,
  settings?: Maybe<{
    format?:
      | 'human'
      | 'full'
      | 'short'
      | 'day'
      | 'day-only'
      | 'date'
      | 'month'
      | 'spent-time'
      | 'time'
      | 'time-short';
    pattern?: string;
    asTime?: boolean;
  }>,
) {
  const dateFormat = settings?.format;
  const datePattern = settings?.pattern;
  const asTime = settings?.asTime;

  value = toLibFormat(value, asTime);

  if (typeGuard.isUndefined(value)) {
    return NO_VALUE;
  }

  if (datePattern) {
    return value.format(datePattern);
  }

  switch (dateFormat) {
    case 'human': {
      return value.fromNow();
    }
    case 'spent-time': {
      return value.fromNow(true);
    }
    case 'full': {
      return value.format('DD MMM YYYY HH:mm:ss');
    }
    case 'short': {
      return value.format('DD MMM HH:mm');
    }
    case 'time': {
      return value.format('HH:mm:ss');
    }
    case 'time-short': {
      return value.format('HH:mm');
    }
    case 'day': {
      return value.format('DD MMM YYYY');
    }
    case 'month': {
      return value.format('MMMM YYYY');
    }
    default: {
      return value.format('DD.MM.YYYY');
    }
  }
};

export const getDatesDuration = (dateA: Date, dateB: Date) => {
  const startedDate = dayjs(dateA);
  const endedDate = dayjs(dateB);

  const diff = endedDate.diff(startedDate, 'ms');
  const duration = dayjs.duration(diff);

  if (duration.asSeconds() < 1) {
    return duration.format('SSS[ мс]');
  } else if (duration.asMinutes() < 1) {
    return duration.format('s[ сек]');
  } else if (duration.asHours() < 1) {
    return duration.format('m[ мин] s[ сек]');
  } else if (duration.asDays() < 1) {
    return duration.format('h[ ч] m[ мин] s[ сек]');
  } else if (duration.asMonths() < 1) {
    return duration.format('D[ д] H[ ч] m[ мин] s[ сек]');
  } else {
    return duration.format('M[ мес] D[ д] H[ ч] m[ мин] s[ сек]');
  }
};

export const timeDuration = (timeInMs: number) => {
  const duration = dayjs.duration(timeInMs);

  return {
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  };
};
