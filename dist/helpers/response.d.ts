import { ValidationError } from "sequelize";
export declare const response: (data: any, meta?: any, status?: number) => {
    data: any;
    meta: any;
    status: number;
};
export declare const errorResponse: (message: any, details?: any, status?: number) => {
    message: any;
    details: any;
    status: number;
};
export declare const errorValidationResponse: (error: ValidationError) => {
    message: any;
    details: any;
    status: number;
};
