// utils.test.ts
import type { ManipulateType } from 'dayjs';
import dayjs from 'dayjs';

import type { OotdType, TodayClothingData } from '@/types';

import { getOOTD, groupBySectionId, mergeOOTD } from '.';

describe('groupBySectionId', () => {
  it('같은 sectionId를 가진 데이터가 하나의 배열로 묶여야 한다', () => {
    const data: TodayClothingData[] = [
      { sectionId: 'a', clothingId: 'c1', color: '#111111' },
      { sectionId: 'b', clothingId: 'c2', color: '#222222' },
      { sectionId: 'a', clothingId: 'c3', color: '#333333' },
    ];
    const grouped = groupBySectionId(data);

    expect(Object.keys(grouped)).toHaveLength(2);
    expect(grouped.a).toHaveLength(2);
    expect(grouped.b).toHaveLength(1);

    expect(grouped.a).toEqual([
      { sectionId: 'a', clothingId: 'c1', color: '#111111' },
      { sectionId: 'a', clothingId: 'c3', color: '#333333' },
    ]);
    expect(grouped.b).toEqual([{ sectionId: 'b', clothingId: 'c2', color: '#222222' }]);
  });

  it('빈 배열을 넣으면 빈 객체를 반환해야 한다', () => {
    expect(groupBySectionId([])).toEqual({});
  });
});

describe('getOOTD', () => {
  const data: Record<string, TodayClothingData[]> = {
    a: [
      { sectionId: 'a', clothingId: 'a1', color: 'red' },
      { sectionId: 'a', clothingId: 'a2', color: 'darkred' },
    ],
    b: [{ sectionId: 'b', clothingId: 'b1', color: 'blue' }],
  };
  const startDate = dayjs('2021-01-01');
  const endDate = dayjs('2021-01-03');

  beforeAll(() => {
    // 테스트의 재현성을 위해 Math.random을 모킹
    jest.spyOn(Math, 'random').mockReturnValue(0);
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('날짜 범위(startDate~endDate)만큼 OotdType 배열을 반환해야 한다', () => {
    const list = getOOTD(data, startDate, endDate, 'day' as ManipulateType);
    expect(list).toHaveLength(3);
    expect(list.map((o) => o.date)).toEqual(['2021-01-01', '2021-01-02', '2021-01-03']);
  });

  it('각 OotdType.clothingList의 길이는 섹션 수와 같아야 한다', () => {
    const list = getOOTD(data, startDate, endDate);
    list.forEach((o) => {
      expect(o.clothingList).toHaveLength(Object.keys(data).length);
    });
  });

  it('항상 각 섹션의 첫 번째 아이템이 선택된다', () => {
    const list = getOOTD(data, startDate, endDate);
    list.forEach((o) => {
      expect(o.clothingList).toContainEqual(data.a[0]);
      expect(o.clothingList).toContainEqual(data.b[0]);
    });
  });
});

describe('mergeOOTD', () => {
  const oldList: OotdType[] = [
    {
      date: '2021-01-01',
      clothingList: [
        { sectionId: 'a', clothingId: 'a1', color: 'red' },
        { sectionId: 'b', clothingId: 'b1', color: 'blue' },
      ],
    },
    {
      date: '2021-01-02',
      clothingList: [{ sectionId: 'a', clothingId: 'a3', color: 'pink' }],
    },
  ];
  const newList: OotdType[] = [
    {
      date: '2021-01-01',
      clothingList: [
        { sectionId: 'a', clothingId: 'a2', color: 'green' },
        { sectionId: 'c', clothingId: 'c1', color: 'black' },
      ],
    },
    {
      date: '2021-01-03',
      clothingList: [{ sectionId: 'd', clothingId: 'd1', color: 'white' }],
    },
  ];

  it('동일 날짜 동일 섹션은 newList로 덮어쓰고, 나머지는 유지한다', () => {
    const merged = mergeOOTD(oldList, newList);

    // 날짜 순 정렬 확인
    expect(merged.map((o) => o.date)).toEqual(['2021-01-01', '2021-01-02', '2021-01-03']);

    // 1월 1일 항목 검증
    const jan1 = merged.find((o) => o.date === '2021-01-01')!;
    expect(jan1.clothingList).toHaveLength(3);
    expect(jan1.clothingList).toEqual(
      expect.arrayContaining([
        { sectionId: 'a', clothingId: 'a2', color: 'green' },
        { sectionId: 'b', clothingId: 'b1', color: 'blue' },
        { sectionId: 'c', clothingId: 'c1', color: 'black' },
      ]),
    );

    // 1월 2일은 oldList 그대로
    const jan2 = merged.find((o) => o.date === '2021-01-02')!;
    expect(jan2.clothingList).toEqual(oldList[1].clothingList);

    // 1월 3일은 newList만
    const jan3 = merged.find((o) => o.date === '2021-01-03')!;
    expect(jan3.clothingList).toEqual(newList[1].clothingList);
  });

  it('oldList 또는 newList가 빈 배열이어도 동작한다', () => {
    expect(mergeOOTD([], newList)).toEqual(newList.slice().sort((a, b) => a.date.localeCompare(b.date)));
    expect(mergeOOTD(oldList, [])).toEqual(oldList.slice().sort((a, b) => a.date.localeCompare(b.date)));
  });
});
