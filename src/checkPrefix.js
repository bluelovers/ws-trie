"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkPrefix(prefixNode, prefix) {
    const input = prefix.toLowerCase().split('');
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
