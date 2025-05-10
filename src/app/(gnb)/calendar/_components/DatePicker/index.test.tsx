import { fireEvent, render, screen } from '@testing-library/react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React from 'react';

import type { DatePickerProps } from '.';
import DatePicker from '.';

// MobileDatePicker 모듈 전체를 모의(Mock)로 교체합니다.
jest.mock('@mui/x-date-pickers/MobileDatePicker/MobileDatePicker', () => {
  return {
    MobileDatePicker: (props: { value: Dayjs; onChange: (d: Dayjs | null) => void }) => {
      return (
        <div data-testid="mobile-date-picker" onClick={() => props.onChange(props.value.add(1, 'month'))}>
          {/* 포맷된 날짜를 화면에 표시 */}
          {props.value.format('YYYY-MM')}
        </div>
      );
    },
  };
});

describe('DatePicker 컴포넌트', () => {
  const today = dayjs('2022-05-15');
  let props: DatePickerProps;

  beforeEach(() => {
    props = {
      date: today,
      onChange: jest.fn(),
      onPrev: jest.fn(),
      onNext: jest.fn(),
    };
    render(<DatePicker {...props} />);
  });

  it('날짜 표시가 YYYY-MM 형식이어야 한다', () => {
    const picker = screen.getByTestId('mobile-date-picker');
    expect(picker).toHaveTextContent(today.format('YYYY-MM'));
  });

  it('왼쪽 화살표를 클릭하면 onPrev가 호출된다', () => {
    // IconButton이 두 개 있으므로 첫 번째가 prev 버튼
    const [prevBtn] = screen.getAllByRole('button');
    fireEvent.click(prevBtn);
    expect(props.onPrev).toHaveBeenCalledTimes(1);
  });

  it('오른쪽 화살표를 클릭하면 onNext가 호출된다', () => {
    const [, nextBtn] = screen.getAllByRole('button');
    fireEvent.click(nextBtn);
    expect(props.onNext).toHaveBeenCalledTimes(1);
  });

  it('MobileDatePicker를 클릭하면 onChange에 date +1달이 전달된다', () => {
    const picker = screen.getByTestId('mobile-date-picker');
    fireEvent.click(picker);
    // 모의 구현에 따라 기존 날짜에 1개월을 더한 값이 넘어와야 함
    expect(props.onChange).toHaveBeenCalledWith(today.add(1, 'month'));
  });
});
