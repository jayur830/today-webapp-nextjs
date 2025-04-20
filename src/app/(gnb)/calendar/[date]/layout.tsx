import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ date: string }> }) {
  const { date } = await params;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return redirect('/calendar');
  }

  const [year, month, day] = date.split('-');

  if (isNaN(+year) || isNaN(+month) || isNaN(+day)) {
    return redirect('/calendar');
  }

  if (+month < 1 || +month > 12) {
    return redirect('/calendar');
  }

  const daysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
  if (+day < 1 || +day > daysInMonth) {
    return redirect('/calendar');
  }

  return children;
}
