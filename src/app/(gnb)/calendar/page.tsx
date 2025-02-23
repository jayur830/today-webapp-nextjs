'use client';

import 'dayjs/locale/ko';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { IconButton, iconButtonClasses, inputClasses } from '@mui/material';
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
    <Stack alignItems="center" gap={2} width="100%" padding={3}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          [`.${iconButtonClasses.root}`]: {
            padding: 0,
          },
        }}
      >
        <IconButton
          onClick={() => {
            setDate((d) => d.subtract(1, 'month'));
          }}
        >
          <ChevronLeft htmlColor="black" />
        </IconButton>
        <MobileDatePicker
          format="YYYY-MM"
          openTo="month"
          views={[
            'year',
            'month',
          ]}
          slotProps={{
            textField: {
              label: null,
              variant: 'standard',
              sx: {
                [`.${inputClasses.root}`]: {
                  width: 80,
                  [`.${inputClasses.input}`]: {
                    textAlign: 'center',
                    fontWeight: 700,
                  },
                  ':hover:not(.Mui-disabled, .Mui-error):before, ::before, ::after': {
                    borderBottom: 'none',
                  },
                },
              },
            },
          }}
          value={date}
          onChange={(value) => {
            if (value) {
              setDate(value);
            }
          }}
        />
        <IconButton
          onClick={() => {
            setDate((d) => d.add(1, 'month'));
          }}
        >
          <ChevronRight htmlColor="black" />
        </IconButton>
      </Stack>
      <Grid display="grid" gridTemplateColumns="repeat(7, 1fr)" width="100%" borderTop={`1px solid ${grey['400']}`} borderLeft={`1px solid ${grey['400']}`}>
        {Array(date.startOf('month').day()).fill(1).map((_, i) => {
          return (
            <Box key={i} height={100} borderRight={`1px solid ${grey['400']}`} borderBottom={`1px solid ${grey['400']}`} padding={2}>
              {dayjs().format('YYYY-MM-DD') === date.startOf('month').subtract(date.startOf('month').day() - i, 'day').format('YYYY-MM-DD')
                ? (
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
                      <Typography color="common.white">
                        {date.startOf('month').subtract(date.startOf('month').day() - i, 'day').date()}
                      </Typography>
                    </Box>
                  )
                : (
                    <Typography color="textDisabled">
                      {date.startOf('month').subtract(date.startOf('month').day() - i, 'day').date()}
                    </Typography>
                  )}
            </Box>
          );
        })}
        {Array(date.daysInMonth()).fill(1).map((_, i) => (
          <Box key={i} height={100} borderRight={`1px solid ${grey['400']}`} borderBottom={`1px solid ${grey['400']}`} padding={2}>
            {dayjs().format('YYYY-MM-DD') === date.startOf('month').add(i, 'day').format('YYYY-MM-DD')
              ? (
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
                    <Typography color="common.white">{i + 1}</Typography>
                  </Box>
                )
              : (
                  <Typography>{i + 1}</Typography>
                )}
          </Box>
        ))}
        {Array(6 - date.endOf('month').day()).fill(1).map((_, i) => (
          <Box key={i} height={100} borderRight={`1px solid ${grey['400']}`} borderBottom={`1px solid ${grey['400']}`} padding={2}>
            {dayjs().format('YYYY-MM-DD') === date.add(1, 'month').startOf('month').add(i, 'day').format('YYYY-MM-DD')
              ? (
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
                    <Typography color="common.white">{i + 1}</Typography>
                  </Box>
                )
              : (
                  <Typography color="textDisabled">{i + 1}</Typography>
                )}
          </Box>
        ))}
      </Grid>
    </Stack>
  );
}
