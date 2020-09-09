import { GlobalErrorHandlerMiddleware, Req, Res } from "@tsed/common";
export declare class Exception extends GlobalErrorHandlerMiddleware {
    use(error: any, request: Req, response: Res): any;
}
