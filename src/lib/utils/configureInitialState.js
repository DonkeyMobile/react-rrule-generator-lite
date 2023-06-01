import moment from 'moment';
import { isEmpty, uniqueId } from 'lodash';

import computeRRuleToString from './computeRRule/toString/computeRRule';
import {DATE_TIME_FORMAT, MONTHS_LF} from '../constants/index';
import {extractDateFromRRule} from "./dateHelper";

const configureState = (config = {}, calendarComponent, id, value) => {
  const extractedDate = extractDateFromRRule(value);
  const configureFrequency = () => (config.repeat ? config.repeat[0] : 'Yearly');
  const configureYearly = () => (config.yearly || 'on');
  const configureMonthly = () => (config.monthly || 'on');
  const configureEnd = () => (config.end ? config.end[0] : 'Never');
  const configureHideStart = () => (typeof config.hideStart === 'undefined' ? true : config.hideStart);
  const uniqueRruleId = isEmpty(id) ? uniqueId('rrule-') : id;

  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const weekdayIndex = extractedDate ? extractedDate.getDay() : 0;
  const monthIndex = extractedDate ? extractedDate.getMonth() : 0;
  const dayOfMonth = extractedDate ? extractedDate.getDate() : 1;

  const data = {
    start: {
      onDate: {
        date: moment().format(DATE_TIME_FORMAT),
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday,
          calendarComponent,
        },
      },
    },
    repeat: {
      frequency: configureFrequency(),
      yearly: {
        mode: configureYearly(),
        on: {
          month: MONTHS_LF[monthIndex],
          day: dayOfMonth,
        },
        onThe: {
          month: MONTHS_LF[monthIndex],
          day: weekdays[weekdayIndex],
          which: 'First',
        },
        options: {
          modes: config.yearly,
        },
      },
      monthly: {
        mode: configureMonthly(),
        interval: 1,
        on: {
          day: dayOfMonth,
        },
        onThe: {
          day: weekdays[weekdayIndex],
          which: 'First',
        },
        options: {
          modes: config.monthly,
        },
      },
      weekly: {
        interval: 1,
        days: {
          mon: weekdayIndex === 1,
          tue: weekdayIndex === 2,
          wed: weekdayIndex === 3,
          thu: weekdayIndex === 4,
          fri: weekdayIndex === 5,
          sat: weekdayIndex === 6,
          sun: weekdayIndex === 0,
        },
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday,
        },
      },
      daily: {
        interval: 1,
      },
      hourly: {
        interval: 1,
      },
      options: {
        frequency: config.repeat,
      },
    },
    end: {
      mode: configureEnd(),
      after: 1,
      onDate: {
        date: moment().format(DATE_TIME_FORMAT),
        options: {
          weekStartsOnSunday: config.weekStartsOnSunday,
          calendarComponent,
        },
      },
      options: {
        modes: config.end,
      },
    },
    options: {
      hideStart: configureHideStart(),
      hideEnd: config.hideEnd,
      hideError: config.hideError,
      weekStartsOnSunday: config.weekStartsOnSunday,
    },
    error: null,
  };

  return {
    id: uniqueRruleId,
    data,
    rrule: computeRRuleToString(data),
  };
};

export default configureState;
