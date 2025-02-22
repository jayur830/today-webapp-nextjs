import { amber, blue, blueGrey, brown, cyan, deepOrange, deepPurple, green, grey, indigo, lightBlue, lightGreen, lime, orange, pink, purple, red, teal, yellow } from '@mui/material/colors';

export const sections = [
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

export const colors = [
  ...Object.entries(red).map(([, color]) => color.toUpperCase()),
  ...Object.entries(pink).map(([, color]) => color.toUpperCase()),
  ...Object.entries(purple).map(([, color]) => color.toUpperCase()),
  ...Object.entries(deepPurple).map(([, color]) => color.toUpperCase()),
  ...Object.entries(indigo).map(([, color]) => color.toUpperCase()),
  ...Object.entries(blue).map(([, color]) => color.toUpperCase()),
  ...Object.entries(lightBlue).map(([, color]) => color.toUpperCase()),
  ...Object.entries(cyan).map(([, color]) => color.toUpperCase()),
  ...Object.entries(teal).map(([, color]) => color.toUpperCase()),
  ...Object.entries(green).map(([, color]) => color.toUpperCase()),
  ...Object.entries(lightGreen).map(([, color]) => color.toUpperCase()),
  ...Object.entries(lime).map(([, color]) => color.toUpperCase()),
  ...Object.entries(yellow).map(([, color]) => color.toUpperCase()),
  ...Object.entries(amber).map(([, color]) => color.toUpperCase()),
  ...Object.entries(orange).map(([, color]) => color.toUpperCase()),
  ...Object.entries(deepOrange).map(([, color]) => color.toUpperCase()),
  ...Object.entries(brown).map(([, color]) => color.toUpperCase()),
  ...Object.entries(grey).map(([, color]) => color.toUpperCase()),
  ...Object.entries(blueGrey).map(([, color]) => color.toUpperCase()),
];
