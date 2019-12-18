#!/usr/bin/env bash
./node_modules/.bin/pm2 install typescript
./node_modules/.bin/pm2 delete luckydraw
npm run start
