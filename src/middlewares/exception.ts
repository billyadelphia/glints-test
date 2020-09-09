import {Err, GlobalErrorHandlerMiddleware, OverrideProvider, Req, Res} from "@tsed/common";
import {Exception as Error, Unauthorized} from "@tsed/exceptions";
import {errorValidationResponse, errorResponse} from "../helpers/response";
import {ValidationError} from "sequelize";

@OverrideProvider(GlobalErrorHandlerMiddleware)
export class Exception extends GlobalErrorHandlerMiddleware {
  use(@Err() error: any, @Req() request: Req, @Res() response: Res): any {
    if (error instanceof Error) {
      return response.status(error.status).json(errorResponse(error.message, error.body ? error.body : {}, error.status));
    }
    if (error instanceof ValidationError) {
      return response.status(422).json(errorValidationResponse(error));
    }

    return super.use(error, request, response);
  }
}
