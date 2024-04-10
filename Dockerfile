FROM node:alpine as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine as production
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY --from=build ./app/dist ./dist
EXPOSE 8080
CMD ["npm", "start"]
