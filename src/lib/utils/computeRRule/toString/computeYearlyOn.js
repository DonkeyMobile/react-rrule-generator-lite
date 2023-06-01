import {MONTHS_LF} from '../../../constants/index';

const computeYearlyOn = on => ({
  bymonth: MONTHS_LF.indexOf(on.month) + 1,
  bymonthday: on.day,
});

export default computeYearlyOn;
