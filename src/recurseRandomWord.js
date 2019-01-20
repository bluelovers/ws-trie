"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
function recurseRandomWord(node, prefix) {
    const word = prefix;
    const branches = Object.keys(node);
    const branch = branches[Math.floor(Math.random() * branches.length)];
    if (branch === config_1.default.END_WORD) {
        return word;
    }
    return recurseRandomWord(node[branch], prefix + branch);
}
exports.recurseRandomWord = recurseRandomWord;
exports.default = recurseRandomWord;
//# sourceMappingURL=recurseRandomWord.js.map