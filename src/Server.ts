// import "@tsed/passport";
// import "@tsed/multipartfiles";
import "@tsed/ajv";
import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import * as cors from "cors";
import * as userAgent from "express-useragent";

import {RestaurantController, UserController, TransactionController} from "./controllers";

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
@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV || "development",
  httpsPort: process.env.HTTPS_PORT || false,
  logger: {
    debug: true, // process.env.NODE_ENV !== "production",
    logRequest: true,
    logStart: true,
    logEnd: true,
    // requestFields: ["reqId", "method", "url", "headers", "body", "query", "params", "duration"],
  },
  componentsScan: [`${rootDir}/protocols/*.ts`, `${rootDir}/models/*.ts`, `${rootDir}/services/**/*.ts`, `${rootDir}/middlewares/*.ts`],
  mount: {
    "/api/v1": [RestaurantController, UserController, TransactionController],
  },
  exclude: ["**/*.spec.ts"],
  multer: {
    dest: `${superRootDir}/storage/tmp`,
    limits: {
      // fileSize: 1e7,
    },
  },
})
export class Server extends ServerLoader {
  $beforeRoutesInit() {
    this.use(cors())
      .use(userAgent.express())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(
        bodyParser.json({
          // ==> Reuse the json parser
          verify: (req, res, buff) => {
            (req as any).rawBody = buff; // ==> Save the body buff to rawBody to be mapped with @Req("rawBody")
          },
        })
      )
      .use(
        bodyParser.urlencoded({
          extended: true,
        })
      );

    return null;
  }
}
