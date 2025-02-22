'use client';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import ColorPicker from './_resources/components/ColorPicker';
import { sections } from './_resources/constants';

export default function Page() {
  const [
    data,
    setData,
  ] = useState(() => sections.reduce((result, { id: sectionId, items }) => ({
    ...result,
    [sectionId]: {
      selected: items[0].id,
      color: '#FFFFFF',
    },
  }), {} as {
    [sectionId in (typeof sections)[number]['id']]: {
      selected: (typeof sections)[number]['items'][number]['id'];
      color: `#${string}`;
    };
  }));

  return (
    <Stack gap={5} padding={3}>
      {sections.map(({ id: sectionId, title, items }, i) => (
        <Grid key={i}>
          <Typography variant="h1" fontWeight={700}>
            {title}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={2} marginTop={2} marginBottom={3}>
            {items.map(({ id, title }, j) => (
              <Button
                key={j}
                onClick={() => {
                  setData((state) => ({
                    ...state,
                    [sectionId]: {
                      ...state[sectionId as keyof typeof state],
                      selected: id,
                    },
                  }));
                }}
                sx={{
                  minWidth: 0,
                  borderRadius: 99,
                  padding: 0,
                }}
              >
                <Chip label={title} color={data[sectionId as keyof typeof data].selected === id ? 'primary' : 'default'} />
              </Button>
            ))}
          </Stack>
          <ColorPicker
            value={data[sectionId].color || '#FFFFFF'}
            onChange={(color) => {
              setData((state) => ({
                ...state,
                [sectionId]: {
                  ...state[sectionId as keyof typeof state],
                  color,
                },
              }));
            }}
          />
        </Grid>
      ))}
    </Stack>
  );
}
