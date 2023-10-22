import { DateProvider } from '../date-provider';
import dayjs from 'dayjs';

export class DayjsDateProvider implements DateProvider {
  compareDate(date1: Date, date2: Date): number {
    const dayjsDate1 = dayjs(date1);
    const dayjsDate2 = dayjs(date2);

    return dayjsDate1.isBefore(dayjsDate2)
      ? -1
      : dayjsDate2.isAfter(dayjsDate1)
      ? 1
      : 0;
  }
}
