"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
function append(trie, letter, index, array) {
    trie[letter] = trie[letter] || {};
    trie = trie[letter];
    if (index === array.length - 1) {
        trie[config_1.END_WORD] = config_1.END_VALUE;
    }
    return trie;
}
exports.append = append;
exports.default = append;
