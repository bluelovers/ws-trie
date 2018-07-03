"use strict";
/**
 * Created by user on 2018/7/3/003.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
const trie_1 = require("./src/trie");
// @ts-ignore
const ahocorasick_1 = require("./src/ahocorasick");
__export(require("./src/ahocorasick"));
// @ts-ignore
exports.default = ahocorasick_1.AhoCorasick;
exports = Object.assign(ahocorasick_1.AhoCorasick, exports);
module.exports = ahocorasick_1.AhoCorasick;
