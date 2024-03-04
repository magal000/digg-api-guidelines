FROM cgr.dev/chainguard/node AS packages
ENV NODE_ENV=staging

WORKDIR /app

COPY --chown=node:node ["./","./"]

RUN npm install --omit-dev
RUN npm install ts-node typescript --omit-dev 
ENTRYPOINT ["node","--loader","ts-node/esm","./src/app.ts"]

