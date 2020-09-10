"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@tsed/common");
const testing_1 = require("@tsed/testing");
const SuperTest = require("supertest");
const Server_1 = require("./Server");
describe("Server", () => {
    let request;
    beforeEach(testing_1.TestContext.bootstrap(Server_1.Server));
    beforeEach(testing_1.TestContext.inject([common_1.PlatformApplication], (app) => {
        request = SuperTest(app.raw);
    }));
    afterEach(testing_1.TestContext.reset);
    it("should call GET /rest", () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield request.get("/rest").expect(404);
    }));
});
//# sourceMappingURL=Server.spec.js.map