'use client';

import 'dayjs/locale/ko';

import Cached from '@mui/icons-material/Cached';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import type { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker/MobileDatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';

import { STORAGE_KEY, STORAGE_KEY_OOTD } from '@/constants';
import { sections } from '@/constants/clothing';
import useLocalStorageState from '@/hooks/useLocalStorageState';
import type { OotdType, TodayClothingData } from '@/types';

import Calendar from './_components/Calendar';
import DatePicker from './_components/DatePicker';
import MobileOotdDialog from './_components/MobileOotdDialog';
import useCalendar from './_hooks/useCalendar';
import { getOOTD, groupBySectionId, mergeOOTD } from './_utils';

const defaultSlotProps = {
  toolbar: {
    hidden: true,
  },
  actionBar: {
    sx: {
      display: 'none',
    },
  },
  dialog: {
    slotProps: {
      paper: {
        sx: { animation: 'fadeIn 0.3s ease-in-out' },
      },
    },
  },
};

export default function Page() {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [ootdList, setOotdList] = useLocalStorageState<OotdType[]>(STORAGE_KEY_OOTD, []);

  const { date, calendar, onChange, onPrev, onNext } = useCalendar();
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  const [storageData] = useLocalStorageState<TodayClothingData[]>(STORAGE_KEY, []);
  const data = groupBySectionId(storageData);

  const ootdMap = ootdList.reduce(
    (result, { date, clothingList }) => ({
      ...result,
      [date]: clothingList,
    }),
    {} as Record<string, TodayClothingData[]>,
  );

  const onGenerateOOTD = () => {
    const oldList: OotdType[] = JSON.parse(localStorage.getItem(STORAGE_KEY_OOTD) || '[]');
    const newList = getOOTD(data, startDate, endDate);
    const mergedList = mergeOOTD(oldList, newList);

    localStorage.setItem(STORAGE_KEY_OOTD, JSON.stringify(mergedList));
    setOotdList(mergedList);
  };

  return (
    <Stack alignItems="center" gap={2} width="100%" padding={2}>
      <Stack direction="row" justifyContent={{ xs: 'center', md: 'flex-start' }} alignItems="center" gap={1} width="100%">
        <DatePicker date={date} onChange={onChange} onPrev={onPrev} onNext={onNext} />
        <MobileDatePicker
          format="YYYY-MM-DD"
          closeOnSelect
          value={startDate}
          onChange={(value) => {
            if (value) {
              setStartDate(value);
              if (value.isAfter(endDate)) {
                setEndDate(value);
              }
            }
          }}
          slotProps={{
            ...defaultSlotProps,
            textField: {
              label: '시작일',
              size: 'small',
            },
          }}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        />
        <MobileDatePicker
          format="YYYY-MM-DD"
          closeOnSelect
          minDate={startDate}
          value={endDate}
          onChange={(value) => {
            if (value) {
              setEndDate(value);
            }
          }}
          slotProps={{
            ...defaultSlotProps,
            textField: {
              label: '종료일',
              size: 'small',
            },
          }}
          sx={{
            display: { xs: 'none', md: 'block' },
          }}
        />
        <Button variant="contained" endIcon={<Cached />} onClick={onGenerateOOTD} sx={{ display: { xs: 'none', md: 'flex' } }}>
          OOTD 생성
        </Button>
      </Stack>
      <Calendar
        calendarList={calendar}
        today={date}
        renderCell={(date) => {
          if (date.format('YYYY-MM-DD') in ootdMap) {
            if (isMobile) {
              return <MobileOotdDialog date={date.format('YYYY-MM-DD')} ootdList={ootdMap[date.format('YYYY-MM-DD')]} />;
            }
            return (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                <Button fullWidth size="small" LinkComponent={Link} href={`/calendar/${date.format('YYYY-MM-DD')}`}>
                  <EditIcon />
                </Button>
                {ootdMap[date.format('YYYY-MM-DD')].map((clothing) => (
                  <Chip
                    key={`${clothing.sectionId}-${clothing.clothingId}`}
                    label={
                      <Stack direction="row" alignItems="center" gap={1}>
                        {(sections.find(({ id }) => clothing.sectionId === id)?.items || []).find(({ id }) => id === clothing.clothingId)?.title || ''}
                        <Box bgcolor={clothing.color} width={16} border={`1px solid ${grey['400']}`} borderRadius={1} sx={{ aspectRatio: 1 }} />
                      </Stack>
                    }
                  />
                ))}
              </Stack>
            );
          }

          return <></>;
        }}
      />
      <Stack display={{ xs: 'flex', md: 'none' }} direction="column" alignItems="center" gap={1} width="100%">
        <Box display="flex" alignItems="center" gap={1} width="100%">
          <Typography variant="body1" fontWeight={500} textAlign="right" width={40}>
            시작일
          </Typography>
          <MobileDatePicker
            format="YYYY-MM-DD"
            closeOnSelect
            value={startDate}
            onChange={(value) => {
              if (value) {
                setStartDate(value);
                if (value.isAfter(endDate)) {
                  setEndDate(value);
                }
              }
            }}
            slotProps={{
              ...defaultSlotProps,
              textField: {
                fullWidth: true,
                size: 'small',
                sx: {
                  flex: 1,
                },
              },
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={1} width="100%">
          <Typography variant="body1" fontWeight={500} textAlign="right" width={40}>
            종료일
          </Typography>
          <MobileDatePicker
            format="YYYY-MM-DD"
            closeOnSelect
            minDate={startDate}
            value={endDate}
            onChange={(value) => {
              if (value) {
                setEndDate(value);
              }
            }}
            slotProps={{
              ...defaultSlotProps,
              textField: {
                fullWidth: true,
                size: 'small',
                sx: {
                  flex: 1,
                },
              },
            }}
          />
        </Box>
        <Button fullWidth variant="contained" endIcon={<Cached />} onClick={onGenerateOOTD}>
          OOTD 생성
        </Button>
      </Stack>
    </Stack>
  );
}
