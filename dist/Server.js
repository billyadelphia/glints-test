"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const tslib_1 = require("tslib");
// import "@tsed/passport";
// import "@tsed/multipartfiles";
require("@tsed/ajv");
const common_1 = require("@tsed/common");
const bodyParser = require("body-parser");
const compress = require("compression");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const userAgent = require("express-useragent");
const controllers_1 = require("./controllers");
const rootDir = __dirname;
const superRootDir = process.cwd();
// const whitelistList = process.env.ALLOWED_CORS?.split(",");
// const whitelist = whitelistList;
// const corsOptionsDelegate = (req: any, callback: any) => {
//   let corsOptions;
//   if (whitelist?.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = {origin: true}; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = {origin: false}; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };
let Server = class Server extends common_1.ServerLoader {
    $beforeRoutesInit() {
        this.use(cors())
            .use(userAgent.express())
            .use(common_1.GlobalAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json({
            // ==> Reuse the json parser
            verify: (req, res, buff) => {
                req.rawBody = buff; // ==> Save the body buff to rawBody to be mapped with @Req("rawBody")
            },
        }))
            .use(bodyParser.urlencoded({
            extended: true,
        }));
        return null;
    }
};
Server = tslib_1.__decorate([
    common_1.ServerSettings({
        rootDir,
        acceptMimes: ["application/json"],
        port: process.env.WEB_PORT || 8080,
        env: process.env.NODE_ENV || "development",
        httpsPort: process.env.HTTPS_PORT || false,
        logger: {
            debug: true,
            logRequest: true,
            logStart: true,
            logEnd: true,
        },
        componentsScan: [`${rootDir}/protocols/*.ts`, `${rootDir}/models/*.ts`, `${rootDir}/services/**/*.ts`, `${rootDir}/middlewares/*.ts`],
        mount: {
            "/api/v1": [controllers_1.RestaurantController, controllers_1.UserController, controllers_1.TransactionController],
        },
        exclude: ["**/*.spec.ts"],
        multer: {
            dest: `${superRootDir}/storage/tmp`,
            limits: {
            // fileSize: 1e7,
            },
        },
    })
], Server);
exports.Server = Server;
//# sourceMappingURL=Server.js.map