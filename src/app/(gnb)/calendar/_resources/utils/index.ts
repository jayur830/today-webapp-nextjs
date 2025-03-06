import type { Dayjs, ManipulateType } from 'dayjs';

import type { OotdType, TodayClothingData } from '@/types';

/**
 * startDate ~ endDate 날짜 범위의 OOTD 생성
 *
 * 일단은 랜덤으로 생성
 */
export function getOOTD(data: { [sectionId: string]: TodayClothingData[] }, startDate: Dayjs, endDate: Dayjs, unit: ManipulateType = 'day'): OotdType[] {
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

/**
 * oldList와 newList를 날짜별로 병합합니다.
 * 동일 날짜의 clothingList에서는 sectionId가 중복되면 newList 항목으로 덮어씁니다.
 * 결과는 날짜 순으로 정렬된 배열입니다.
 *
 * @param oldList 기존 OOTD 데이터 배열
 * @param newList 새로 추가될 OOTD 데이터 배열
 * @returns 병합 및 정렬된 `OotdType` 배열
 */
export function mergeOOTD(oldList: OotdType[], newList: OotdType[]): OotdType[] {
  // `oldList`와 `newList`를 합친 후, 날짜별로 그룹화하여 각 날짜의 `clothingList`를 Map으로 누적합니다.
  const mergedMap = [
    ...oldList,
    ...newList,
  ].reduce(
    (acc, { date, clothingList }) => {
      const clothingMap = acc.get(date) || new Map<string, TodayClothingData>();
      // 동일 `sectionId`의 항목은 새 항목으로 덮어씁니다.
      clothingList.forEach((item) => clothingMap.set(item.sectionId, item));
      return acc.set(date, clothingMap);
    },
    new Map<string, Map<string, TodayClothingData>>(),
  );

  // Map의 데이터를 `OotdType` 배열로 변환하고, 날짜순으로 정렬합니다.
  return Array.from(mergedMap.entries())
    .map(([
      date,
      clothingMap,
    ]) => ({
      date,
      clothingList: Array.from(clothingMap.values()),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
