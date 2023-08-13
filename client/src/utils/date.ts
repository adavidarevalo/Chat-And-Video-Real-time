import moment from 'moment';

export const dateHandler = (date: string) => {
  const now = moment();
  const momentDate = moment(date);
  const time = momentDate.fromNow(true);
  const dateByHourAndMin = momentDate.format('HH:mm');

  const getDay = () => {
    const days = time.split(' ')[0];
    if (Number(days) < 8) return now.subtract(+days, 'days').format('dddd');

    return momentDate.format('DD/MM/YYYY');
  };

  if (time === 'a few seconds') return 'Now';

  if (time.search('minute') !== -1) {
    const mins = time.split(' ')[0];
    if (mins === 'a') return '1 min';

    return `${mins} min`;
  }

  if (time.search('hour') !== -1) return dateByHourAndMin;

  if (time === 'a day') return 'Yesterday';

  if (time.search('days') !== -1) {
    return getDay();
  }

  return time;
};
