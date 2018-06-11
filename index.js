"use strict";
/**
 * Created by user on 2018/6/9/009.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
//import * as triePrefixTree from './src';
//
//export = triePrefixTree;
const src_1 = require("./src");
exports.trie = src_1.default;
exports.Trie = src_1.Trie;
__export(require("./src"));
exports.default = src_1.default;
