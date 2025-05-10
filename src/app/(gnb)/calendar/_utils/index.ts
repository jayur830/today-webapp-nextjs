import type { Dayjs, ManipulateType } from 'dayjs';

import type { OotdType, TodayClothingData } from '@/types';

export function groupBySectionId(data: TodayClothingData[]) {
  return data.reduce(
    (result, { sectionId, ...rest }) =>
      sectionId in result
        ? {
            ...result,
            [sectionId]: [
              ...result[sectionId],
              {
                sectionId,
                ...rest,
              },
            ],
          }
        : {
            ...result,
            [sectionId]: [
              {
                sectionId,
                ...rest,
              },
            ],
          },
    {} as { [sectionId: string]: TodayClothingData[] },
  );
}

// /**
//  * startDate ~ endDate 날짜 범위의 OOTD 생성
//  *
//  * 일단은 랜덤으로 생성
//  * @todo 이걸 바꿔야 함
//  * - 같은 카테고리의 의류 N개는 한번씩 모두 착장에 포함되어야 한다.
//  * - 같은 카테고리의 의류 N개가 모두 착장에 사용되는 도중 이미 사용되었던 의류가 N개를 모두 사용하기 전에 다시 사용되면 안된다.
//  *   - [검은색 스니커즈, 흰색 스니커즈, 흰색 운동화, 검은색 운동화, 검은색 구두] 이렇게 있으면 흰색 운동화를 먼저 조합에 포함하고 5개를 모두 사용하기 전에 흰색 운동화를 다시 사용하는 경우가 없어야 함.
//  */
// export function getOOTD(data: { [sectionId: string]: TodayClothingData[] }, startDate: Dayjs, endDate: Dayjs, unit: ManipulateType = 'day'): OotdType[] {
//   const list = [];
//   for (let d = startDate; d.isBefore(endDate) || d.isSame(endDate); d = d.add(1, unit)) {
//     list.push({
//       date: d.format('YYYY-MM-DD'),
//       clothingList: Object.entries(data).map(([, clothingList]) => clothingList[Math.round(Math.random() * 100) % clothingList.length]),
//     });
//   }
//   return list;
// }
/**
 * Fisher–Yates 알고리즘으로 배열을 in-place로 섞어서 반환합니다.
 */
function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * startDate ~ endDate 날짜 범위의 OOTD 생성
 *
 * - 같은 카테고리(섹션)의 의류 N개는 한번씩 모두 착장에 포함된다.
 * - N개를 모두 사용하기 전에는 절대 같은 의류가 다시 사용되지 않는다.
 */
export function getOOTD(data: { [sectionId: string]: TodayClothingData[] }, startDate: Dayjs, endDate: Dayjs, unit: ManipulateType = 'day'): OotdType[] {
  // 섹션별로 “남은 아이템” 큐를 초기화 (랜덤 순서)
  const remaining: Record<string, TodayClothingData[]> = {};
  for (const sectionId of Object.keys(data)) {
    remaining[sectionId] = shuffle(data[sectionId]);
  }

  const list: OotdType[] = [];
  for (let d = startDate.clone(); d.isBefore(endDate) || d.isSame(endDate); d = d.add(1, unit)) {
    const clothingList: TodayClothingData[] = [];

    for (const [sectionId, items] of Object.entries(data)) {
      // 큐가 비어 있으면 다시 새 사이클 — 원본 배열을 shuffle
      if (remaining[sectionId].length === 0) {
        remaining[sectionId] = shuffle(items);
      }
      // 맨 앞 요소를 꺼내서 사용
      const nextItem = remaining[sectionId].shift()!;
      clothingList.push(nextItem);
    }

    list.push({
      date: d.format('YYYY-MM-DD'),
      clothingList,
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
  const mergedMap = [...oldList, ...newList].reduce((acc, { date, clothingList }) => {
    const clothingMap = acc.get(date) || new Map<string, TodayClothingData>();
    // 동일 `sectionId`의 항목은 새 항목으로 덮어씁니다.
    clothingList.forEach((item) => clothingMap.set(item.sectionId, item));
    return acc.set(date, clothingMap);
  }, new Map<string, Map<string, TodayClothingData>>());

  // Map의 데이터를 `OotdType` 배열로 변환하고, 날짜순으로 정렬합니다.
  return Array.from(mergedMap.entries())
    .map(([date, clothingMap]) => ({
      date,
      clothingList: Array.from(clothingMap.values()),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
