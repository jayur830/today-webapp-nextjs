import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function useCalendar() {
  const [
    date,
    setDate,
  ] = useState<Dayjs>(dayjs().startOf('month'));

  const calendar = [
    ...Array(date.startOf('month').day())
      .fill(1)
      .map((_, i) => date.startOf('month').subtract(date.startOf('month').day() - i, 'day')),
    ...Array(date.daysInMonth())
      .fill(1)
      .map((_, i) => date.startOf('month').add(i, 'day')),
    ...Array(6 - date.endOf('month').day())
      .fill(1)
      .map((_, i) => date.add(1, 'month').startOf('month').add(i, 'day')),
  ];

  const onChange = (d: Dayjs) => {
    setDate(d);
  };

  const onPrev = () => {
    setDate((d) => d.subtract(1, 'month'));
  };

  const onNext = () => {
    setDate((d) => d.add(1, 'month'));
  };

  return {
    date,
    calendar,
    onChange,
    onPrev,
    onNext,
  };
}
