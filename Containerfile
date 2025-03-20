FROM node:lts-slim AS packages
ENV NODE_ENV=staging

WORKDIR /app

COPY --chown=node:node ["./","./"]

#RUN npm config set strict-ssl false 

RUN npm install --omit=dev
RUN npm install ts-node typescript --omit=dev 
ENTRYPOINT ["npm", "start", "--"]