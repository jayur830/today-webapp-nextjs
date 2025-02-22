'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import { colors } from '../../constants';

export interface ColorPickerProps {
  value: string;
  onChange?(value: string): void;
}

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [
    anchorEl,
    setAnchorEl,
  ] = useState<HTMLButtonElement | null | undefined>();

  return (
    <>
      <Button
        disableRipple
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        sx={{
          padding: 0,
          ':hover': {
            bgcolor: 'transparent',
          },
        }}
      >
        <TextField
          size="small"
          value={value}
          slotProps={{
            input: {
              readOnly: true,
              startAdornment: (
                <Box
                  bgcolor={value}
                  width={20}
                  border={`1px solid ${grey['400']}`}
                  borderRadius={1}
                  marginRight={1}
                  sx={{ aspectRatio: 1 }}
                />
              ),
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
              display: 'grid',
              gridTemplateColumns: 'repeat(14, 1fr)',
              gap: 1,
              padding: 2,
            },
          },
        }}
        sx={{
          maxHeight: 200,
        }}
      >
        {colors.map((color, i) => (
          <Button
            key={i}
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
            <Box
              bgcolor={color}
              width={20}
              border={`1px solid ${grey['400']}`}
              borderRadius={1}
              sx={{ aspectRatio: 1 }}
            />
          </Button>
        ))}
      </Popover>
    </>
  );
}
