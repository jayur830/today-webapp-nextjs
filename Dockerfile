FROM node:20-alpine as builder

WORKDIR /usr/app
COPY . .
RUN yarn
RUN yarn build

FROM node:20-alpine as runner

# Timezone
RUN apk add --no-cache tzdata
ENV TZ=Asia/Seoul
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/app
COPY --from=builder /usr/app/.next/standalone .
COPY --from=builder /usr/app/.next/static .next/static
COPY --from=builder /usr/app/public ./public
EXPOSE 80
ENV PORT 80
CMD ["node", "server.js"]
