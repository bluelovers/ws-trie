"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recurseRandomWord = void 0;
const config_1 = require("./config");
function recurseRandomWord(node, prefix) {
    const word = prefix;
    const branches = Object.keys(node);
    const branch = branches[Math.floor(Math.random() * branches.length)];
    if (branch === config_1.END_WORD) {
        return word;
    }
    return recurseRandomWord(node[branch], prefix + branch);
}
exports.recurseRandomWord = recurseRandomWord;
exports.default = recurseRandomWord;
//# sourceMappingURL=recurseRandomWord.js.map