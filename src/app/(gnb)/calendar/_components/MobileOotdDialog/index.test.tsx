import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { sections } from '@/constants/clothing';
import type { TodayClothingData } from '@/types';

import MobileOotdDialog from '.';

describe('MobileOotdDialog 컴포넌트', () => {
  const ootdList: TodayClothingData[] = [
    { sectionId: 'tops', clothingId: 'hoodie', color: '#FF0000' },
    { sectionId: 'bottoms', clothingId: 'jeans', color: '#00FF00' },
  ];
  let container: HTMLElement;

  beforeEach(() => {
    const rendered = render(<MobileOotdDialog ootdList={ootdList} />);
    container = rendered.container;
  });

  it('초기에는 다이얼로그가 닫혀 있어야 한다', () => {
    expect(screen.queryByText('오늘의 착장')).not.toBeInTheDocument();
  });

  it('아이콘 버튼 클릭 시 다이얼로그가 열리고 제목이 보여야 한다', () => {
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('오늘의 착장')).toBeVisible();
  });

  it('ootdList에 있는 아이템 수만큼 Chip 제목이 렌더링 되어야 한다', () => {
    fireEvent.click(screen.getByRole('button'));
    ootdList.forEach((item) => {
      const title = sections.find((sec) => sec.id === item.sectionId)!.items.find((it) => it.id === item.clothingId)!.title;
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('각 Chip 옆에 지정된 color의 박스가 렌더링 되어야 한다', () => {
    fireEvent.click(screen.getByRole('button'));

    const colorBoxes = screen.getAllByTestId('clothing-color');
    expect(colorBoxes).toHaveLength(ootdList.length);

    colorBoxes.forEach((box, i) => {
      expect(box).toHaveStyle(`background-color: ${ootdList[i].color}`);
    });
  });

  it('백드롭을 클릭하면 다이얼로그가 닫혀야 한다', async () => {
    // 다이얼로그 열기
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('오늘의 착장')).toBeVisible();

    // 백드롭 요소 선택 (.MuiBackdrop-root)
    const backdrop = document.body.querySelector('.MuiBackdrop-root');
    expect(backdrop).toBeInTheDocument();

    // 백드롭 클릭 -> onClose 트리거
    fireEvent.click(backdrop!);
    await waitFor(() => {
      expect(screen.queryByText('오늘의 착장')).not.toBeInTheDocument();
    });
  });
});
