import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('vi');

const DayjsParse = {
  fullDate: date => dayjs(date).format('LLL'),
  dynamicsDate: time => {
    const date = dayjs(time);
    const now = dayjs();
    if (now.diff(date, 'days') < 4) {
      return date.fromNow();
    }
    return `${date.format('HH:mm')} - ${date.format('DD/MM/YYYY')}`;
  },
};

export default DayjsParse;
