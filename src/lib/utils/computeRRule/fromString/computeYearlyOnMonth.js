import { MONTHS_LF } from '../../../constants/index';

const computeYearlyOnMonth = (data, rruleObj) => {
  if (rruleObj.freq !== 0 || !rruleObj.bymonthday) {
    return data.repeat.yearly.on.month;
  }

  if (typeof rruleObj.bymonth === 'number') {
    return MONTHS_LF[rruleObj.bymonth - 1]
  }

  return MONTHS_LF[rruleObj.bymonth[0] - 1];
};

export default computeYearlyOnMonth;
