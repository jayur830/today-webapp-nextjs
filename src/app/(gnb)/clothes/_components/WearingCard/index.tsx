import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { PropsWithChildren } from 'react';
import { memo } from 'react';

export interface WearingCardProps {
  title: string;
  onDelete(): void;
}

const WearingCard = memo(({ children, title, onDelete }: PropsWithChildren<WearingCardProps>) => {
  return (
    <Card
      sx={{
        position: 'relative',
        flex: 'none',
        border: '1px solid',
        borderColor: grey[400],
        borderRadius: 1,
        padding: 2,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>
        <IconButton onClick={onDelete} sx={{ padding: 0 }}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <Box paddingTop={2}>{children}</Box>
    </Card>
  );
});

export default WearingCard;

export function PreviewPrepare({ color }: { color: string }) {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" paddingX={3} sx={{ filter: 'blur(65px)' }}>
        <Box bgcolor={color} width={100} height={130} borderRadius={6} />
      </Box>
      <Box position="absolute" top={0} left={0} display="flex" justifyContent="center" alignItems="center" width="calc(100% - 48px)" height="100%" paddingX={3}>
        <Typography variant="body1" fontWeight={700} textAlign="center" whiteSpace="pre-line">
          {'이미지\n준비중이에요'}
        </Typography>
      </Box>
    </>
  );
}
