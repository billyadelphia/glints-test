FROM node:12.18.3-alpine

RUN apk update && apk add bash curl build-base git python

COPY package.json .
COPY package-lock.json .
COPY database.js .
COPY .env .
COPY ./src ./src
COPY ./dist ./dist
COPY ./data ./data
COPY ./migrations ./migrations
COPY ecosystem.config.js .
COPY createDB.js .
COPY .sequelizerc .
COPY tsconfig-paths-bootstrap.js .
COPY tsconfig.json .
COPY ./seeder ./seeder
COPY ./data ./data
COPY wait-for-it.sh /
RUN npm install pm2 -g
RUN npm install typescript -g
RUN npm install ts-node -g
RUN npm install sequelize-cli -g
RUN npm install
# RUN npm run pre:migrate
# RUN npm run migrate
# RUN npm run seed
ENV NODE_ENV production
CMD /wait-for-it.sh db:3306 -- npm run docker

# CMD ["pm2", "restart", "ecosystem.config.js"]
