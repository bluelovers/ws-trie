"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPrefix = void 0;
const utils_1 = require("./utils");
function checkPrefix(prefixNode, prefix) {
    //const input = split(prefix.toLowerCase());
    const input = (0, utils_1.split)(prefix);
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
//# sourceMappingURL=checkPrefix.js.map