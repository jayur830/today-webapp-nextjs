import { act, renderHook } from '@testing-library/react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import useCalendar from './useCalendar';

describe('useCalendar hook', () => {
  const startOfThisMonth = dayjs().startOf('month');

  it('초기 date는 현재 월의 시작일이어야 한다', () => {
    const { result } = renderHook(useCalendar);
    expect(result.current.date.isSame(startOfThisMonth, 'day')).toBe(true);
  });

  it('calendar 배열 길이는 7의 배수여야 하고, 주 수는 5주 또는 6주여야 한다', () => {
    const { result } = renderHook(() => useCalendar());
    const len = result.current.calendar.length;
    // 7일 단위로 끊기는지
    expect(len % 7).toBe(0);
    // 5주 또는 6주
    const weeks = len / 7;
    expect([5, 6]).toContain(weeks);
  });

  it('calendar의 모든 항목이 유효한 Dayjs 인스턴스여야 한다', () => {
    const { result } = renderHook(() => useCalendar());
    result.current.calendar.forEach((d) => {
      expect((d as Dayjs).isValid()).toBe(true);
    });
  });

  it('calendar의 첫 번째 날짜는 해당 월 시작일의 주(Sunday)여야 한다', () => {
    const { result } = renderHook(() => useCalendar());
    const first = result.current.calendar[0];
    expect(first.day()).toBe(0); // Sunday
  });

  it('onPrev 호출 시 date가 한 달 전으로 이동한다', () => {
    const { result } = renderHook(() => useCalendar());
    const prevMonth = startOfThisMonth.subtract(1, 'month').startOf('month');
    act(() => {
      result.current.onPrev();
    });
    expect(result.current.date.isSame(prevMonth, 'day')).toBe(true);
  });

  it('onNext 호출 시 date가 한 달 후로 이동한다', () => {
    const { result } = renderHook(() => useCalendar());
    const nextMonth = startOfThisMonth.add(1, 'month').startOf('month');
    act(() => {
      result.current.onNext();
    });
    expect(result.current.date.isSame(nextMonth, 'day')).toBe(true);
  });

  it('onChange 호출 시 date가 주어진 값으로 설정된다', () => {
    const { result } = renderHook(() => useCalendar());
    const customDate = dayjs('2021-12-25');
    act(() => {
      result.current.onChange(customDate);
    });
    expect(result.current.date.isSame(customDate, 'day')).toBe(true);
  });

  it('calendar 내부의 날짜들이 이전·현재·다음 달을 모두 포함해야 한다', () => {
    const { result } = renderHook(() => useCalendar());
    const cal = result.current.calendar;
    const hasPrevMonth = cal.some((d) => d.isBefore(startOfThisMonth, 'month'));
    const hasThisMonth = cal.some((d) => d.isSame(startOfThisMonth, 'month'));
    const hasNextMonth = cal.some((d) => d.isAfter(startOfThisMonth, 'month'));
    expect(hasPrevMonth).toBe(true);
    expect(hasThisMonth).toBe(true);
    expect(hasNextMonth).toBe(true);
  });
});
