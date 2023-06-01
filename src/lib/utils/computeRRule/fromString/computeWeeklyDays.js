import {extractDateFromRRule} from "../../dateHelper";

const computeWeeklyDays = (data, rruleObj) => {
  let weekdays = [];
  const extractedDate = rruleObj.dtstart;
  const weekdayIndex = extractedDate ? extractedDate.getDay() : null;
  if (rruleObj.freq !== 2) {
    return data.repeat.weekly.days;
  }

  if (rruleObj.byweekday) {
    weekdays = rruleObj.byweekday.map(weekday => weekday.weekday);
  }
  return {
    mon: weekdays.includes(0) || weekdayIndex === 1,
    tue: weekdays.includes(1) || weekdayIndex === 2,
    wed: weekdays.includes(2) || weekdayIndex === 3,
    thu: weekdays.includes(3) || weekdayIndex === 4,
    fri: weekdays.includes(4) || weekdayIndex === 5,
    sat: weekdays.includes(5) || weekdayIndex === 6,
    sun: weekdays.includes(6) || weekdayIndex === 0,
  };
};

export default computeWeeklyDays;
