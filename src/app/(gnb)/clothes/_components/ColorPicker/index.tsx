'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { memo, useCallback, useState } from 'react';

import { colors } from '@/constants/clothing';

export interface ColorPickerProps {
  value: string;
  onChange?(value: string): void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null | undefined>();

  const handleChange = useCallback(
    (color: string) => {
      onChange && onChange(color);
      setAnchorEl(undefined);
    },
    [onChange],
  );

  return (
    <>
      <Button
        fullWidth
        variant="text"
        disableRipple
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        sx={{
          background: 'transparent',
          padding: 0,
          ':hover': {
            background: 'transparent',
          },
        }}
      >
        <TextField
          fullWidth
          size="small"
          value={value}
          slotProps={{
            input: {
              readOnly: true,
              startAdornment: <Box bgcolor={value} width={20} border={`1px solid ${grey['400']}`} borderRadius={1} marginRight={1} sx={{ aspectRatio: 1 }} />,
              sx: {
                cursor: 'pointer',
                '.MuiInputBase-input': {
                  cursor: 'pointer',
                },
              },
            },
          }}
        />
      </Button>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        open={!!anchorEl}
        onClose={(_, reason) => {
          if (reason === 'backdropClick') {
            setAnchorEl(undefined);
          }
        }}
        slotProps={{
          paper: {
            sx: {
              padding: 2,
            },
          },
        }}
        sx={{
          maxHeight: 200,
        }}
      >
        <Stack direction="row" gap={1}>
          {['#FFFFFF', '#000000'].map((color) => (
            <Button
              key={color}
              onClick={() => {
                onChange && onChange(color);
                setAnchorEl(undefined);
              }}
              sx={{
                minWidth: 0,
                minHeight: 0,
                padding: 0,
              }}
            >
              <Box bgcolor={color} width={20} border={`1px solid ${grey['400']}`} borderRadius={1} sx={{ aspectRatio: 1 }} />
            </Button>
          ))}
        </Stack>
        <Grid display="grid" gridTemplateColumns="repeat(14, 1fr)" gap={1} marginTop={1}>
          {colors.map((color, i) => (
            <ColorButton
              key={`${color}-${i}`}
              color={color}
              onClick={() => {
                handleChange(color);
              }}
            />
          ))}
        </Grid>
      </Popover>
    </>
  );
}

interface ColorButtonProps {
  color: string;
  onClick(): void;
}

const ColorButton = memo(({ color, onClick }: ColorButtonProps) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        minWidth: 0,
        minHeight: 0,
        padding: 0,
      }}
    >
      <Box bgcolor={color} width={20} border={`1px solid ${grey['400']}`} borderRadius={1} sx={{ aspectRatio: 1 }} />
    </Button>
  );
});
