export function extractDateFromRRule(rrule) {
  const dtstartIndex = rrule.indexOf('DTSTART:');
  const ruleStart = rrule.indexOf('Z\nFREQ');

  if (dtstartIndex !== -1 && ruleStart !== -1) {
    const dateString = rrule.slice(dtstartIndex + 8, ruleStart);
    return new Date(Date.UTC(parseInt(dateString.substring(0, 4)),     // year
      parseInt(dateString.substring(4, 6)) - 1, // month
      parseInt(dateString.substring(6, 8)),     // day
      parseInt(dateString.substring(9, 11)),     // hour
      parseInt(dateString.substring(11, 13)),    // minute
      parseInt(dateString.substring(13, 15))     // second
    ));
  }

  return null;
}


