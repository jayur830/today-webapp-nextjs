'use client';

import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import IconButton, { iconButtonClasses } from '@mui/material/IconButton';
import { inputClasses } from '@mui/material/Input';
import Stack from '@mui/material/Stack';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker/MobileDatePicker';
import type { Dayjs } from 'dayjs';

export interface DatePickerProps {
  date: Dayjs;
  onChange(date: Dayjs): void;
  onPrev(): void;
  onNext(): void;
}

export default function DatePicker({ date, onChange, onPrev, onNext }: DatePickerProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        [`.${iconButtonClasses.root}`]: {
          padding: 0,
        },
      }}
    >
      <IconButton onClick={onPrev}>
        <ChevronLeft htmlColor="black" />
      </IconButton>
      <MobileDatePicker
        format="YYYY-MM"
        openTo="month"
        views={['year', 'month']}
        value={date}
        onChange={(value) => {
          if (value) {
            onChange(value);
          }
        }}
        slotProps={{
          toolbar: {
            hidden: true,
          },
          textField: {
            label: null,
            variant: 'standard',
            sx: {
              [`.${inputClasses.root}`]: {
                width: 80,
                [`.${inputClasses.input}`]: {
                  textAlign: 'center',
                  fontWeight: 700,
                  cursor: 'pointer',
                },
                ':hover:not(.Mui-disabled, .Mui-error):before, ::before, ::after': {
                  borderBottom: 'none',
                },
              },
            },
          },
        }}
      />
      <IconButton onClick={onNext}>
        <ChevronRight htmlColor="black" />
      </IconButton>
    </Stack>
  );
}
