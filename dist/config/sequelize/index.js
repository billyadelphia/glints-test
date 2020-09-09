"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("../../../database.js");
const sequelize_typescript_1 = require("sequelize-typescript");
const moment = require("moment");
exports.default = new sequelize_typescript_1.Sequelize({
    dialect: config.dialect ? config.dialect : "mysql",
    database: config.database,
    username: config.username,
    password: config.password,
    port: config.port,
    host: config.host,
    timezone: moment().format("Z"),
});
//# sourceMappingURL=index.js.map