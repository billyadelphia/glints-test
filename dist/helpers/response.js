"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorValidationResponse = exports.errorResponse = exports.response = void 0;
exports.response = (data, meta = {}, status = 200) => {
    return {
        data,
        meta,
        status,
    };
};
exports.errorResponse = (message, details = {}, status = 500) => {
    return {
        message,
        details,
        status,
    };
};
exports.errorValidationResponse = (error) => {
    const errors = error.errors;
    let fields = errors.map((detail) => {
        return detail.path;
    });
    fields = fields.filter((x, i, a) => a.indexOf(x) === i);
    const details = {};
    fields.forEach((field) => {
        errors.map((detail) => {
            if (detail.path === field) {
                if (details[field] === undefined) {
                    details[field] = [];
                }
                details[field].push(detail.message);
            }
        });
    });
    return exports.errorResponse(error.message, details, 422);
};
//# sourceMappingURL=response.js.map