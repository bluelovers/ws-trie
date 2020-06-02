"use strict";
/**
 * Created by user on 2018/6/8/008.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trieToRegExpSource = exports.trieToRegExp = void 0;
const string_natural_compare_1 = __importDefault(require("string-natural-compare"));
const util_1 = require("./lib/util");
__exportStar(require("./lib/types"), exports);
function trieToRegExp(data, flags, options) {
    var _a;
    if (typeof flags == 'object') {
        [flags, options] = [options, flags];
    }
    options = options || {};
    flags = (_a = flags !== null && flags !== void 0 ? flags : options.flags) !== null && _a !== void 0 ? _a : 'u';
    let source = trieToRegExpSource(data, options);
    if (options.createRegExp) {
        return options.createRegExp(source, flags);
    }
    return new RegExp(source, flags);
}
exports.trieToRegExp = trieToRegExp;
function trieToRegExpSource(data, options = {}) {
    options.getKeys = options.getKeys || function (trie) {
        return Object.keys(trie);
    };
    options.isEndpoint = options.isEndpoint || util_1.isDefaultEndpoint;
    options.toRegexString = options.toRegexString || util_1._to_regex;
    const _fn_push = [].push;
    const { getKeys, isEndpoint, toRegexString } = options;
    function _walk_trie(trie, key, root) {
        let keys = getKeys(trie, key, data), alt_group = [], char_class = [], end = false; // marks the end of a phrase
        keys.forEach(function (_key) {
            let walk_result, insert;
            if (isEndpoint(trie[_key], _key, trie)) {
                end = true;
                return;
            }
            walk_result =
                util_1._quotemeta(_key, options) + _walk_trie(trie[_key], _key);
            // When we have more than one key, `insert` references
            // the alternative regexp group, otherwise it points to
            // the char class group.
            insert = (keys.length > 1) ? _fn_push.bind(alt_group)
                : _fn_push.bind(char_class);
            insert(walk_result);
        });
        //alt_group.sort();
        alt_group.sort(function (a, b) {
            return (b.length - a.length) || string_natural_compare_1.default(a, b);
        });
        return toRegexString(alt_group, char_class, end);
    }
    let result = _walk_trie(data, undefined, true);
    return result;
}
exports.trieToRegExpSource = trieToRegExpSource;
exports.default = trieToRegExp;
//# sourceMappingURL=index.js.map