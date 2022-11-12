"use strict";
/**
 * Created by user on 2018/6/9/009.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trie = exports.Trie = void 0;
//import * as triePrefixTree from './src';
//
//export = triePrefixTree;
const index_1 = require("./lib/index");
Object.defineProperty(exports, "Trie", { enumerable: true, get: function () { return index_1.Trie; } });
Object.defineProperty(exports, "trie", { enumerable: true, get: function () { return index_1.createTrie; } });
__exportStar(require("./lib"), exports);
exports.default = index_1.createTrie;
//# sourceMappingURL=index.js.map