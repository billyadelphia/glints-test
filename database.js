require('dotenv').config();
module.exports = {
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT || 3306,
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "dialect": "mysql",
    "dialectOptions": {}
}