"use strict";
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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTrie = exports.Trie = exports.SYM_RAW = exports.END_DEF = exports.END_WORD = exports.END_VALUE = void 0;
const create_1 = require("./create");
const append_1 = require("./append");
const checkPrefix_1 = require("./checkPrefix");
const recursePrefix_1 = require("./recursePrefix");
const utils_1 = __importStar(require("./utils"));
const config_1 = require("./config");
var config_2 = require("./config");
Object.defineProperty(exports, "END_VALUE", { enumerable: true, get: function () { return config_2.END_VALUE; } });
Object.defineProperty(exports, "END_WORD", { enumerable: true, get: function () { return config_2.END_WORD; } });
Object.defineProperty(exports, "END_DEF", { enumerable: true, get: function () { return config_2.END_DEF; } });
const permutations_1 = require("./permutations");
const recurseRandomWord_1 = require("./recurseRandomWord");
const trie_regex_1 = require("trie-regex");
exports.SYM_RAW = Symbol('trie');
class Trie {
    constructor(input, options, ...argv) {
        if (!Array.isArray(input)) {
            throw ((0, utils_1.throwMsg)('parameter Array', typeof input));
        }
        const self = this;
        this.options = Object.assign({
            ignoreCase: true,
        }, options);
        this.options = Object.freeze(this.options);
        if (this.options.mapMode) {
            this[exports.SYM_RAW] = (0, create_1.create)([], ...argv);
            input.forEach(row => {
                let [key, value] = row;
                self.addWord(key, value);
            });
        }
        else {
            this[exports.SYM_RAW] = (0, create_1.create)([], ...argv);
            input.forEach(key => {
                self.addWord(key);
            });
        }
    }
    /**
     * Get the generated raw trie object
     */
    tree() {
        return this[exports.SYM_RAW];
    }
    load(obj) {
        this[exports.SYM_RAW] = obj;
        return this;
    }
    /**
     * Get a string representation of the trie
     */
    dump(spacer = 0) {
        return utils_1.default.stringify(this[exports.SYM_RAW], spacer);
    }
    /**
     * Add a new word to the trie
     */
    addWord(word, value = null) {
        (0, utils_1.isString)(word, 'word is string');
        const reducer = (...params) => {
            // @ts-ignore
            return (0, append_1.append)(...params);
        };
        let key = this._key(word);
        const input = (0, utils_1.split)(key);
        let node = input.reduce(reducer, this[exports.SYM_RAW]);
        // @ts-ignore
        node[config_1.END_WORD] = node[config_1.END_WORD] || {};
        node[config_1.END_WORD][word] = value;
        node[config_1.END_WORD][config_1.END_DEF] = word;
        return this;
    }
    _key(word) {
        return this.options.ignoreCase ? word.toLowerCase() : word;
    }
    /**
     * Remove an existing word from the trie
     */
    removeWord(word, all) {
        (0, utils_1.isString)(word, 'word is string');
        const { prefixFound, prefixNode } = this._checkPrefix(word);
        if (prefixFound) {
            let node = prefixNode[config_1.END_WORD];
            /**
             * 更改了 removeWord 行為
             * 會先刪除與 word 符合的 key 值
             * 如果沒有則刪除 預設值
             * 基本上這個狀況只會發生在 ignoreCase = true 時
             * 不論如何每次執行都必定刪除一個 key
             */
            if (!all && Object.keys(node).length > 1) {
                let bool;
                if (word in node) {
                    delete node[word];
                }
                else if (node[config_1.END_DEF] in node) {
                    delete node[node[config_1.END_DEF]];
                    bool = true;
                }
                if (bool || word == node[config_1.END_DEF]) {
                    node[config_1.END_DEF] = Object.keys(node)[0];
                }
            }
            else {
                delete prefixNode[config_1.END_WORD];
            }
        }
        return this;
    }
    _checkPrefix(prefix) {
        let key = this._key(prefix);
        return (0, checkPrefix_1.checkPrefix)(this[exports.SYM_RAW], key);
    }
    /**
     * Check a prefix is valid
     * @returns Boolean
     */
    isPrefix(prefix) {
        (0, utils_1.isString)(prefix, 'prefix is string');
        const { prefixFound } = this._checkPrefix(prefix);
        return prefixFound;
    }
    /**
     * Get a list of all words in the trie with the given prefix
     * @returns Array
     */
    getPrefix(strPrefix, sorted = true) {
        (0, utils_1.isString)(strPrefix, 'prefix is string');
        if (typeof sorted !== 'boolean') {
            throw ((0, utils_1.throwMsg)('sort parameter as boolean', typeof sorted));
        }
        if (!this.isPrefix(strPrefix)) {
            return [];
        }
        const { prefixNode } = this._checkPrefix(strPrefix);
        return (0, recursePrefix_1.recursePrefix)(prefixNode, strPrefix, sorted);
    }
    getRandomWordWithPrefix(...argv) {
        let strPrefix;
        if (argv.length) {
            strPrefix = argv[0];
            if (!this.isPrefix(strPrefix)) {
                return '';
            }
        }
        else {
            strPrefix = '';
        }
        const { prefixNode } = this._checkPrefix(strPrefix);
        return (0, recurseRandomWord_1.recurseRandomWord)(prefixNode, strPrefix);
    }
    /**
     * Count the number of words with the given prefixSearch
     * @returns Number
     */
    countPrefix(strPrefix) {
        const prefixes = this.getPrefix(strPrefix);
        return prefixes.length;
    }
    /**
     * Get all words in the trie
     * @returns Array
     */
    getWordsAll(sorted = true) {
        if (typeof sorted !== 'boolean') {
            throw ((0, utils_1.throwMsg)('sort parameter as boolean', typeof sorted));
        }
        return (0, recursePrefix_1.recursePrefix)(this[exports.SYM_RAW], '', sorted);
    }
    /**
     * Check the existence of a word in the trie
     * @returns Boolean
     */
    hasWord(word) {
        if (typeof word !== 'string') {
            throw ((0, utils_1.throwMsg)('string word', typeof word));
        }
        if (word !== '') {
            const { prefixFound, prefixNode } = this._checkPrefix(word);
            if (prefixFound) {
                // @ts-ignore
                //return prefixNode[config.END_WORD] === config.END_VALUE;
                return (0, utils_1.hasEndpoint)(prefixNode);
            }
        }
        return false;
    }
    getWordData(word, notChkDefault) {
        let node = this.getWordNode(word);
        if (node) {
            if (word in node) {
                return {
                    key: word,
                    value: node[word],
                    matched: word === word,
                };
            }
            else if (!notChkDefault && config_1.END_DEF in node) {
                let k = node[config_1.END_DEF];
                if (!(k in node)) {
                    k = Object.keys(node)[0];
                }
                if (k in node) {
                    return {
                        key: k,
                        value: node[k],
                        matched: k === word,
                    };
                }
            }
        }
        return null;
    }
    getWordNode(word) {
        if (typeof word !== 'string') {
            throw ((0, utils_1.throwMsg)('string word', typeof word));
        }
        if (word !== '') {
            const { prefixFound, prefixNode } = this._checkPrefix(word);
            if ((0, utils_1.hasEndpoint)(prefixNode)) {
                return prefixNode[config_1.END_WORD];
            }
        }
        return null;
    }
    /**
     * @example
     * tree.getWordNodeKeys('Object.entries')
     * // => [ 'Object.entries' ]
     */
    getWordNodeKeys(word) {
        let node = this.getWordNode(word);
        if (node) {
            return Object.keys(node);
        }
        return null;
    }
    isAnagrams(letters) {
        if (typeof letters !== 'string') {
            throw ((0, utils_1.throwMsg)('string letters', typeof letters));
        }
        if (letters.length < config_1.PERMS_MIN_LEN) {
            throw ((0, utils_1.throwMsg)(`at least ${config_1.PERMS_MIN_LEN} letters`, letters.length));
        }
        // @ts-ignore
        return letters;
    }
    /**
     * Get a list of valid anagrams that can be made from the given letters
     * @returns Array
     */
    getAnagrams(letters) {
        this.isAnagrams(letters);
        return (0, permutations_1.permutations)(letters, this[exports.SYM_RAW], {
            type: 'anagram',
        });
    }
    /**
     * Get a list of all sub-anagrams that can be made from the given letters
     * @returns Array
     */
    getSubAnagrams(letters) {
        this.isAnagrams(letters);
        return (0, permutations_1.permutations)(letters, this[exports.SYM_RAW], {
            type: 'sub-anagram',
        });
    }
    toRegExp(flags, options) {
        if (!flags || !(0, utils_1.isString)(flags)) {
            flags = 'u';
            if (this.options.ignoreCase) {
                flags += 'i';
            }
        }
        options = Object.assign({
            disableEscaped: true,
            isEndpoint: utils_1.isEndpoint,
            jsescOptions: {
                'es6': true,
                'minimal': false,
            },
        }, options);
        return (0, trie_regex_1.trieToRegExp)(this.tree(), flags, options);
    }
}
exports.Trie = Trie;
function createTrie(...argv) {
    // @ts-ignore
    return new Trie(...argv);
}
exports.createTrie = createTrie;
Object.assign(createTrie, {
    prototype: Trie.prototype,
});
//createTrie.prototype = Trie.prototype;
exports.default = createTrie;
//# sourceMappingURL=index.js.map