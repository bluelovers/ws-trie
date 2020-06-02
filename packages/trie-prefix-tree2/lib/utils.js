"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zwjTrimEnd = exports.zwjTrimStart = exports.zwjTrim = exports.hasEndpoint = exports.isEndpoint = exports.throwMsg = exports.stringify = exports.objectCopy = exports.split = exports.isString = exports.ZWJ_STR = exports.ZWJ = void 0;
const uni_string_1 = __importDefault(require("uni-string"));
const config_1 = require("./config");
exports.ZWJ = 0x200d;
exports.ZWJ_STR = '\u200d';
function isString(word, msg = 'string') {
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
function zwjTrim(s) {
    return s.replace(/^[\u200d\s]+|[\u200d\s]+$/, '');
}
exports.zwjTrim = zwjTrim;
function zwjTrimStart(s) {
    return s.replace(/^[\u200d\s]+/, '');
}
exports.zwjTrimStart = zwjTrimStart;
function zwjTrimEnd(s) {
    return s.replace(/[\u200d\s]+$/, '');
}
exports.zwjTrimEnd = zwjTrimEnd;
exports.default = exports;
//# sourceMappingURL=utils.js.map