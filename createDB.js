const mysql = require('mysql2/promise');
const database = require('./database');
const dbName = database.database;

mysql.createConnection({
    host: database.host,
    port: database.port,
    user: database.username,
    password: database.password,
}).then(connection => {
    console.log("dbName", `CREATE DATABASE IF NOT EXISTS ${dbName} ;`)
    connection.query("CREATE DATABASE IF NOT EXISTS `" + dbName + "` ;").then((res) => {
        console.info("Database create or successfully checked");
        process.exit(0);
    })
})