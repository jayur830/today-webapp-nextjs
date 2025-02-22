'use client';

import 'dayjs/locale/ko';

import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker/MobileDatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function Page() {
  const [
    date,
    setDate,
  ] = useState<Dayjs>(dayjs().startOf('month'));

  return (
    <Stack alignItems="center" gap={2} padding={3}>
      <MobileDatePicker
        format="YYYY-MM"
        openTo="month"
        views={[
          'year',
          'month',
        ]}
        slotProps={{

        }}
        value={date}
        onChange={(value) => {
          if (value) {
            setDate(value);
          }
        }}
      />
      <Grid display="grid" gridTemplateColumns="repeat(7, 1fr)" width="100%" borderTop={`1px solid ${grey['400']}`} borderLeft={`1px solid ${grey['400']}`}>
        {Array(date.startOf('month').day()).fill(1).map((_, i) => (
          <Box key={i} height={100} borderRight={`1px solid ${grey['400']}`} borderBottom={`1px solid ${grey['400']}`} padding={2}>
            <Typography color="textDisabled">
              {date.startOf('month').subtract(date.startOf('month').day() - i, 'day').date()}
            </Typography>
          </Box>
        ))}
        {Array(date.daysInMonth()).fill(1).map((_, i) => (
          <Box key={i} height={100} borderRight={`1px solid ${grey['400']}`} borderBottom={`1px solid ${grey['400']}`} padding={2}>
            <Typography>{i + 1}</Typography>
          </Box>
        ))}
        {Array(6 - date.endOf('month').day()).fill(1).map((_, i) => (
          <Box key={i} height={100} borderRight={`1px solid ${grey['400']}`} borderBottom={`1px solid ${grey['400']}`} padding={2}>
            <Typography color="textDisabled">{i + 1}</Typography>
          </Box>
        ))}
      </Grid>
    </Stack>
  );
}
