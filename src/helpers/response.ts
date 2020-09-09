import {ValidationError, ValidationErrorItem} from "sequelize";

export const response = (data: any, meta: any = {}, status: number = 200) => {
  return {
    data,
    meta,
    status,
  };
};

export const errorResponse = (message: any, details: any = {}, status: number = 500) => {
  return {
    message,
    details,
    status,
  };
};

interface ValidationMessages {
  [index: string]: string[];
}

export const errorValidationResponse = (error: ValidationError) => {
  const errors = error.errors;
  let fields = errors.map((detail: ValidationErrorItem) => {
    return detail.path;
  });
  fields = fields.filter((x, i, a) => a.indexOf(x) === i);
  const details = {} as ValidationMessages;
  fields.forEach((field: string) => {
    errors.map((detail: ValidationErrorItem) => {
      if (detail.path === field) {
        if (details[field] === undefined) {
          details[field] = [];
        }
        details[field].push(detail.message);
      }
    });
  });

  return errorResponse(error.message, details, 422);
};
