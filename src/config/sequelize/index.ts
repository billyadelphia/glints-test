const config = require("../../../database.js");

import {Sequelize} from "sequelize-typescript";
import * as moment from "moment";

export default new Sequelize({
  dialect: config.dialect ? config.dialect : "mysql",
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  timezone: moment().format("Z"),
});
