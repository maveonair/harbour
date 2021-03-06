FROM node:lts-alpine

ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --no-cache dumb-init ca-certificates

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

RUN addgroup -g 21337 app
RUN adduser -D -u 21337 -G app app
USER app

EXPOSE 3000

ENTRYPOINT [ "/usr/bin/dumb-init", "--" ]
CMD ["yarn", "start"]
