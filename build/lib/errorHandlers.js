"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAllErrorHandler = exports.forbiddenErrorHandler = exports.badRequestErrorHandler = exports.notFoundErrorHandler = void 0;
var errorResponse_1 = require("./errorResponse");
exports.notFoundErrorHandler = function (err, req, res, next) {
    if (errorResponse_1.isErrorResponse(err) && err.httpStatusCode === 404) {
        res.status(404).send(err.message || "Error not found!");
    }
    else {
        next(err);
    }
};
exports.badRequestErrorHandler = function (err, req, res, next) {
    if (errorResponse_1.isErrorResponse(err) && err.httpStatusCode === 400) {
        res.status(400).send(err.message);
    }
    else {
        next(err);
    }
};
exports.forbiddenErrorHandler = function (err, req, res, next) {
    if (errorResponse_1.isErrorResponse(err) && err.httpStatusCode === 403) {
        res.status(403).send("Forbidden!");
    }
    else {
        next(err);
    }
};
exports.catchAllErrorHandler = function (err, req, res, next) {
    res.status(500).send("Generic Server Error");
};
