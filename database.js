require('dotenv').config();
module.exports = {
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": 3306,
    "username": "root",
    "password": process.env.MYSQL_ROOT_PASSWORD,
    "dialect": "mysql",
    "dialectOptions": {}
}