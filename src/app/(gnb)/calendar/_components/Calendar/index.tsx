'use client';

import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { PropsWithChildren, ReactNode } from 'react';

function DateCell({ children }: PropsWithChildren) {
  return (
    <Box
      className="date-cell"
      display="flex"
      flexDirection="column"
      gap={1}
      minHeight={100}
      padding={{
        xs: '15%',
        md: 2,
      }}
    >
      {children}
    </Box>
  );
}

export interface CalendarProps {
  calendarList: Dayjs[];
  today: Dayjs;
  renderCell(date: Dayjs): ReactNode;
}

export default function Calendar({ calendarList, today, renderCell }: CalendarProps) {
  return (
    <Grid
      display="grid"
      gridTemplateColumns="repeat(7, 1fr)"
      width="100%"
      maxWidth={1024}
      border={`1px solid ${grey['400']}`}
      borderRadius={3}
      sx={{
        '.date-cell': {
          borderRight: `1px solid ${grey['400']}`,
          borderTop: `1px solid ${grey['400']}`,
          '&:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3), &:nth-of-type(4), &:nth-of-type(5), &:nth-of-type(6), &:nth-of-type(7)': {
            borderTop: 'none',
          },
          '&:nth-of-type(7n)': {
            borderRight: 'none',
          },
          '&:nth-of-type(n / 7)': {
            borderRight: 'none',
          },
        },
      }}
    >
      {calendarList.map((d, i) => {
        if (d.isSame(today, 'month')) {
          return (
            <DateCell key={d.format('YYYY-MM-DD')}>
              {dayjs().isSame(d, 'day') ? (
                <Box
                  position="relative"
                  top={-4}
                  left={-6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  bgcolor="primary.main"
                  width={30}
                  height={30}
                  borderRadius={99}
                  sx={{ aspectRatio: 1 }}
                >
                  <Typography color="common.white">{d.format('D')}</Typography>
                </Box>
              ) : (
                <Typography>{d.format('D')}</Typography>
              )}
              {renderCell(d)}
            </DateCell>
          );
        }

        return (
          <DateCell key={d.format('YYYY-MM-DD')}>
            {dayjs().isSame(d, 'day') ? (
              <Box
                position="relative"
                top={-4}
                left={-6}
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor={grey['500']}
                width={30}
                height={30}
                borderRadius={99}
                sx={{ aspectRatio: 1 }}
              >
                <Typography color="common.white">{d.format('D')}</Typography>
              </Box>
            ) : (
              <Typography color="textDisabled">{d.format('D')}</Typography>
            )}
            {renderCell(d)}
          </DateCell>
        );
      })}
    </Grid>
  );
}
