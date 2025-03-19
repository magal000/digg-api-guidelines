FROM node:22 AS packages
ENV NODE_ENV=staging

WORKDIR /app

COPY --chown=node:node ["./","./"]

# Clean npm cache (optional but can help fix issues)
RUN npm cache clean --force

# Run npm install (this is where the error occurs)
RUN npm install --omit=dev --verbose
RUN npm install ts-node typescript --omit=dev

# Print the most recent npm error log dynamically
RUN cat $(ls -t /root/.npm/_logs/ | head -n 1)
ENTRYPOINT ["npm", "start", "--"]