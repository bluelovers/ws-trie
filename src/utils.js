"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uni_string_1 = require("uni-string");
const config_1 = require("./config");
function isString(word, msg = 'parameter string') {
    if (typeof word !== 'string' || word === '') {
        throw (throwMsg(msg, typeof word));
    }
    // @ts-ignore
    return word;
}
exports.isString = isString;
function split(str, options = {}) {
    options = options || {};
    if (options.toLowerCase) {
        str = str.toLowerCase();
    }
    let arr = uni_string_1.default.split(str, '');
    let i = arr.length;
    while (i > 0) {
        let j = i - 1;
        let cur = arr[j];
        if (cur.length > 2 && /\u200d/.test(cur)) {
            let a = cur.split(/(\u200d)/);
            arr.splice(j, 1, ...a);
        }
        i = j;
    }
    return arr;
}
exports.split = split;
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
function throwMsg(expected, received) {
    return `Expected ${expected}, received ${received}`;
}
exports.throwMsg = throwMsg;
function isEndpoint(value, key, trie) {
    return key === config_1.END_WORD;
}
exports.isEndpoint = isEndpoint;
function hasEndpoint(node) {
    return config_1.END_WORD in node;
}
exports.hasEndpoint = hasEndpoint;
const utils = require("./utils");
exports.default = utils;
