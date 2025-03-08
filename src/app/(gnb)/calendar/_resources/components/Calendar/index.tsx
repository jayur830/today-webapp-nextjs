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
      display="flex"
      flexDirection="column"
      gap={1}
      minHeight={100}
      borderRight={`1px solid ${grey['400']}`}
      borderBottom={`1px solid ${grey['400']}`}
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
    <Grid display="grid" gridTemplateColumns="repeat(7, 1fr)" width="100%" maxWidth={1024} borderTop={`1px solid ${grey['400']}`} borderLeft={`1px solid ${grey['400']}`} borderRadius={3}>
      {calendarList.map((d, i) => {
        if (d.isSame(today, 'month')) {
          return (
            <DateCell key={i}>
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
          <DateCell key={i}>
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
