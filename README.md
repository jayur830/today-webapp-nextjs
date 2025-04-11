# 오늘 뭐 입지?

내 옷을 등록하고 날짜별로 옷을 조합한 착장을 제시해주는 서비스입니다.

## 서비스 소개

"오늘 뭐 입지?"는 사용자가 보유한 옷들을 등록하고, 원하는 기간에 대해 날짜별로 옷을 조합한 착장을 제시해주는 서비스입니다.

### 현재 구현된 기능

- 옷 등록 및 관리
  - localStorage를 사용한 개인 데이터 저장
  - 옷 카테고리별 등록 및 관리
  - 미리 정의된 색상 목록에서 선택
- 날짜별 랜덤 착장 추천
  - 원하는 기간 설정
  - 날짜별 랜덤 조합 생성

### 향후 계획

#### 기능 개선
- 날씨 기반 착장 추천
- 특별 일정(미팅, 데이트 등) 기반 착장 추천
- 사용자 선호도 기반 맞춤 추천
- 색상 선택 기능 개선
  - color picker 구현
  - 사용자 정의 색상 저장

#### 백엔드 구축
- 사용자 인증 기능 추가
- 데이터베이스 연동
  - 개인별 옷 데이터 저장
  - 착장 히스토리 관리
  - 사용자 설정 저장

## 기술 스택

- **프레임워크**: Next.js 15.2.3
- **언어**: TypeScript
- **UI 라이브러리**: 
  - Material-UI (@mui/material)
  - Emotion (@emotion/react, @emotion/styled)
- **상태 관리**: React Context API
- **날짜 처리**: dayjs
- **빌드 도구**: Yarn

## 프로젝트 구조

```
src/
├── app/          # Next.js 13+ App Router
├── components/   # 재사용 가능한 컴포넌트
├── contexts/     # React Context 관련 파일
├── styles/       # 전역 스타일 및 테마
├── types/        # TypeScript 타입 정의
├── constants/    # 상수 정의
├── assets/       # 정적 에셋
└── middleware.ts # Next.js 미들웨어
```

## 시작하기

### 필수 조건

- Node.js
- Yarn

### 설치

```bash
yarn install
```

### 개발 서버 실행

```bash
yarn dev
```

### 프로덕션 빌드

```bash
yarn build
yarn start
```

## Docker 지원

프로젝트는 Docker를 통한 배포를 지원합니다.

### Docker 빌드

```bash
docker build -t today-webapp .
```

### Docker 실행

```bash
docker run -p 3000:3000 today-webapp
```

## 코드 스타일

- ESLint와 Prettier를 사용하여 코드 스타일을 유지합니다.
- TypeScript를 사용하여 타입 안정성을 보장합니다.
