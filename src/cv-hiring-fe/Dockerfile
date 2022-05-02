FROM node:alphine
WORKDIR /app
COPY package-lock.json ./
COPY ./ ./
RUN yarn
CMD ["yarn", "run", "start"]