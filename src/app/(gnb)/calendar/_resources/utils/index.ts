import type { Dayjs, ManipulateType } from 'dayjs';

import type { TodayClothingData } from '@/types';

/**
 * startDate ~ endDate 날짜 범위의 OOTD 생성
 *
 * 일단은 랜덤으로 생성
 */
export function getOOTD(data: { [sectionId: string]: TodayClothingData[] }, startDate: Dayjs, endDate: Dayjs, unit: ManipulateType = 'day') {
  const list = [];
  for (let d = startDate; d.isBefore(endDate) || d.isSame(endDate); d = d.add(1, unit)) {
    list.push({
      date: d.format('YYYY-MM-DD'),
      clothingList: Object
        .entries(data)
        .map(([, clothingList]) => clothingList[Math.round(Math.random() * 100) % clothingList.length]),
    });
  }
  return list;
}
