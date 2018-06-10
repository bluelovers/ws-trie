"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function checkPrefix(prefixNode, prefix) {
    //const input = split(prefix.toLowerCase());
    const input = utils_1.split(prefix);
    const prefixFound = input.every((letter, index) => {
        if (!prefixNode[letter]) {
            return false;
        }
        // @ts-ignore
        return prefixNode = prefixNode[letter];
    });
    return {
        prefixFound,
        prefixNode,
    };
}
exports.checkPrefix = checkPrefix;
exports.default = checkPrefix;
