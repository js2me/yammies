import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

import { unitsToMs } from './ms.js';
import { declension } from './text.js';
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

export const dayTimeDuration = (timeInMs: number) => {
  let left = timeInMs;

  const days = Math.floor(left / unitsToMs.day);
  left = left % unitsToMs.day;

  const hours = Math.floor(left / unitsToMs.hour);
  left = left % unitsToMs.hour;

  const minutes = Math.floor(left / unitsToMs.min);
  left = left % unitsToMs.min;

  const seconds = Math.floor(left / unitsToMs.sec);
  left = left % unitsToMs.sec;

  const milliseconds = Math.floor(left);

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};

type DateChangeParam = [amount: number, unit?: Maybe<ManipulateType>];

export const changeDate = (
  date: Maybe<Date | number | string>,
  ...args: [
    ...DateChangeParam,
    ...Partial<DateChangeParam>,
    ...Partial<DateChangeParam>,
    ...Partial<DateChangeParam>,
    ...Partial<DateChangeParam>,
    ...Partial<DateChangeParam>,
  ]
) => {
  let wrappedDate = dayjs(date);

  for (let i = 0; i < args.length; i += 2) {
    const amount = args[i] as DateChangeParam[0];
    const unit = args[i + 1] as DateChangeParam[1];
    if (unit != null) {
      wrappedDate = wrappedDate.add(amount, unit);
    }
  }

  return wrappedDate.toDate();
};

export const timeDuration = (timeInMs: number) => {
  const { days, hours, milliseconds, minutes, seconds } =
    dayTimeDuration(timeInMs);

  return {
    hours: hours + unitsToMs.day * days,
    milliseconds,
    minutes,
    seconds,
  };
};

const durationFormatLabels = {
  days: { compact: 'д', full: ['день', 'дня', 'дней'] },
  hours: { compact: 'ч', full: ['час', 'часа', 'часов'] },
  minutes: { compact: 'мин', full: ['минута', 'минуты', 'минут'] },
  seconds: { compact: 'сек', full: ['секунда', 'секунды', 'секунд'] },
} as const;

export const getDatesFormatDuration = (
  dateA: Date,
  dateB: Date,
  compact?: boolean,
) => {
  const startedDate = dayjs(dateA);
  const endedDate = dayjs(dateB);

  const diff = endedDate.diff(startedDate, 'ms');

  const { days, hours, minutes, seconds } = dayTimeDuration(diff);

  const formattedParts: string[] = [];

  if (days) {
    if (compact) {
      formattedParts.push(`${days} ${durationFormatLabels.days.compact}`);
    } else {
      formattedParts.push(
        `${days} ${declension(days, durationFormatLabels.days.full)}`,
      );
    }
  }

  if (hours) {
    if (compact) {
      formattedParts.push(`${hours} ${durationFormatLabels.hours.compact}`);
    } else {
      formattedParts.push(
        `${hours} ${declension(hours, durationFormatLabels.hours.full)}`,
      );
    }
  }

  if (minutes) {
    if (compact) {
      formattedParts.push(`${minutes} ${durationFormatLabels.minutes.compact}`);
    } else {
      formattedParts.push(
        `${minutes} ${declension(minutes, durationFormatLabels.minutes.full)}`,
      );
    }
  }

  if (seconds) {
    if (compact) {
      formattedParts.push(`${seconds} ${durationFormatLabels.seconds.compact}`);
    } else {
      formattedParts.push(
        `${seconds} ${declension(seconds, durationFormatLabels.seconds.full)}`,
      );
    }
  }

  return formattedParts.join(' ');
};
