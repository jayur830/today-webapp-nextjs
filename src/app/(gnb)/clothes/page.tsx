'use client';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

const sections = [
  {
    id: 'outerwear',
    title: '아우터',
    items: [
      {
        id: 'coat',
        title: '코트',
      },
      {
        id: 'long_padding',
        title: '롱패딩',
      },
      {
        id: 'short_padding',
        title: '숏패딩',
      },
      {
        id: 'padding_vest',
        title: '패딩조끼',
      },
      {
        id: 'mustang',
        title: '무스탕',
      },
      {
        id: 'blazer',
        title: '블레이저',
      },
      {
        id: 'trucker_jacket',
        title: '트러커 재킷',
      },
      {
        id: 'aviation_jumper',
        title: '항공점퍼',
      },
      {
        id: 'rider_jacket',
        title: '라이더 재킷',
      },
      {
        id: 'cardigan',
        title: '가디건',
      },
      {
        id: 'fleece',
        title: '플리스',
      },
      {
        id: 'windbreaker',
        title: '바람막이',
      },
      {
        id: 'safari_jacket',
        title: '사파리 재킷',
      },
    ],
  },
  {
    id: 'tops',
    title: '상의',
    items: [
      {
        id: 'knit_and_sweater',
        title: '니트/스웨터',
      },
      {
        id: 'man_to_man',
        title: '맨투맨',
      },
      {
        id: 'hoodie',
        title: '후드티',
      },
      {
        id: 'hooded_zip_up',
        title: '후드집업',
      },
      {
        id: 'shirt',
        title: '셔츠',
      },
      {
        id: 'collar_t_shirt',
        title: '카라티',
      },
      {
        id: 'long_sleeve_t_shirt',
        title: '긴팔티',
      },
      {
        id: 'short_sleeve_t_shirt',
        title: '반팔티',
      },
      {
        id: 'sleeveless_t_shirt',
        title: '민소매',
      },
    ],
  },
  {
    id: 'bottoms',
    title: '하의',
    items: [
      {
        id: 'jeans',
        title: '청바지',
      },
      {
        id: 'slacks',
        title: '슬랙스',
      },
      {
        id: 'shorts',
        title: '반바지',
      },
      {
        id: 'jogger',
        title: '조거팬츠',
      },
      {
        id: 'cargo',
        title: '카고팬츠',
      },
    ],
  },
  {
    id: 'shoes',
    title: '신발',
    items: [
      {
        id: 'sneakers',
        title: '스니커즈',
      },
      {
        id: 'dress_shoes',
        title: '구두',
      },
      {
        id: 'walker',
        title: '워커',
      },
      {
        id: 'slippers',
        title: '슬리퍼',
      },
      {
        id: 'sandal',
        title: '샌들',
      },
      {
        id: 'sports_shoes',
        title: '운동화',
      },
    ],
  },
] as const;

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
          <Stack direction="row" gap={2} marginTop={2}>
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
        </Grid>
      ))}
    </Stack>
  );
}
