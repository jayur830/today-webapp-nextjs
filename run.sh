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
  yarn add -D husky commitizen @commitlint/cli @commitlint/config-conventional
  yarn husky
  yarn commitizen init cz-conventional-changelog --yarn --dev --exact

# pnpm 사용 시
elif [ -d pnpm-lock.yaml ]; then
  pnpm add -D husky commitizen @commitlint/cli @commitlint/config-conventional
  pnpm husky
  pnpm commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact

# npm 사용 시
else
  npm i -D husky commitizen @commitlint/cli @commitlint/config-conventional
  npx husky
  npx commitizen init cz-conventional-changelog --save-dev --save-exact
fi

# package.json 설정
if [ `grep -c '"prepare": "husky"' package.json` == 0 ]; then
  sed -i '' 's/  "scripts": {/  "scripts": {\n    "prepare": "husky",/g' package.json
fi

# prepare-commit-msg 파일 생성
echo "#!/bin/bash
exec < /dev/tty && node_modules/.bin/cz --hook || true
" > .husky/prepare-commit-msg

chmod +x .husky/prepare-commit-msg

# commitlint 설정
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

echo "#!/bin/bash
node_modules/.bin/commitlint --edit "$1"
" > .husky/commit-msg

chmod +x .husky/commit-msg
