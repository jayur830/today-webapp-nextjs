#!/bin/bash

# Initialize git repository
if [ ! -d '.git' ]; then
  echo git init
fi

# Initialize packages if package.json doesn't exist
if [ ! -e 'package.json' ]; then
  npm init -y
  npm i
fi

# For yarn users
if [ -e yarn.lock ]; then
  yarn add -D husky commitizen @commitlint/cli @commitlint/config-conventional
  yarn husky
  yarn commitizen init cz-conventional-changelog --yarn --dev --exact

# For pnpm users
elif [ -e pnpm-lock.yaml ]; then
  pnpm add -D husky commitizen @commitlint/cli @commitlint/config-conventional
  pnpm husky
  pnpm commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact

# For npm users
elif [ -e package-lock.json ]; then
  npm i -D husky commitizen @commitlint/cli @commitlint/config-conventional
  npx husky
  npx commitizen init cz-conventional-changelog --save-dev --save-exact

fi

# Configure package.json
if [ `grep -c '"prepare": "husky"' package.json` == 0 ]; then
  sed -i '' 's/  "scripts": {/  "scripts": {\n    "prepare": "husky",/g' package.json
fi

# Create prepare-commit-msg file
echo "#!/bin/bash
exec < /dev/tty && node_modules/.bin/cz --hook || true
" > .husky/prepare-commit-msg

chmod +x .husky/prepare-commit-msg

# Configure commitlint
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js

echo "#!/bin/bash
node_modules/.bin/commitlint --edit "$1"
" > .husky/commit-msg

chmod +x .husky/commit-msg

# Husky Install
yarn husky
