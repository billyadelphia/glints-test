"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// require("module-alias/register");
// import "./LoadEnv";
require("dotenv/config");
const common_1 = require("@tsed/common");
const Server_1 = require("./Server");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            common_1.$log.debug("Start server...");
            const server = yield common_1.ServerLoader.bootstrap(Server_1.Server);
            yield server.listen();
            common_1.$log.debug("Server initialized");
        }
        catch (er) {
            common_1.$log.error(er);
        }
    });
}
bootstrap();
//# sourceMappingURL=index.js.map