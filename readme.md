### HOW TO INSTALL

## Prerequisites

```
nodejs >= 12
mysql >= 8
pm2 ( npm install -g pm2 )
typescript ( npm install -g typescript )
sequelize-cli ( npm install -g sequelize-cli )
```

## Installation

```
git clone git@github.com:billyadelphia/glints-test.git
cd glints-test
cp .env.example .env ( please edit .env file )
npm install
npm run pre:migrate && npm run migrate && npm run seed && pm2 start ecosystem.config.js && pm2 logs
```
