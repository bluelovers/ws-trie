"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function objectCopy(obj) {
    if (typeof obj === 'undefined') {
        return {};
    }
    return JSON.parse(JSON.stringify(obj));
}
exports.objectCopy = objectCopy;
function stringify(obj, spacer = 2) {
    if (typeof obj === 'undefined') {
        return '';
    }
    return JSON.stringify(obj, null, spacer);
}
exports.stringify = stringify;
const utils = require("./utils");
exports.default = utils;
