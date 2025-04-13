#!/bin/bash

# 깃 저장소 초기화
if [ ! -d '.git' ]; then
  git init
fi

# 패키지 락 파일이 없으면 패키지 초기화
if [ ! -d 'package-lock.json' ]; then
  npm init -y
  npm i
fi

# yarn 사용 시
if [ -d yarn.lock ]; then
  yarn add -D husky commitizen
  yarn husky
  yarn commitizen init cz-conventional-changelog --yarn --dev --exact

# pnpm 사용 시
elif [ -d pnpm-lock.yaml ]; then
  pnpm add -D husky commitizen
  pnpm husky
  pnpm commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact

# npm 사용 시
else
  npm i -D husky commitizen
  npx husky
  npx commitizen init cz-conventional-changelog --save-dev --save-exact
fi

# package.json 설정
if [ `grep -c '"prepare": "husky"' package.json` == 0 ]; then
  sed -i '' 's/  "scripts": {/  "scripts": {\n    "prepare": "husky",/g' package.json
fi

echo "npx cz" > .husky/pre-commit
