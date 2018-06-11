"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const append_1 = require("./append");
const checkPrefix_1 = require("./checkPrefix");
const recursePrefix_1 = require("./recursePrefix");
const utils_1 = require("./utils");
const config_1 = require("./config");
var config_2 = require("./config");
exports.END_VALUE = config_2.END_VALUE;
exports.END_WORD = config_2.END_WORD;
exports.END_DEF = config_2.END_DEF;
const permutations_1 = require("./permutations");
const recurseRandomWord_1 = require("./recurseRandomWord");
const trie_regex_1 = require("trie-regex");
const PERMS_MIN_LEN = config_1.default.PERMS_MIN_LEN;
exports.SYM_RAW = Symbol('trie');
class Trie {
    constructor(input, options, ...argv) {
        if (!Array.isArray(input)) {
            throw (utils_1.throwMsg('parameter Array', typeof input));
        }
        const self = this;
        this.options = Object.assign({
            ignoreCase: true,
        }, options);
        this.options = Object.freeze(this.options);
        if (this.options.mapMode) {
            this[exports.SYM_RAW] = create_1.default([], ...argv);
            input.forEach(row => {
                let [key, value] = row;
                self.addWord(key, value);
            });
        }
        else {
            this[exports.SYM_RAW] = create_1.default([], ...argv);
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
        utils_1.isString(word, 'word is string');
        const reducer = (...params) => {
            // @ts-ignore
            return append_1.default(...params);
        };
        let key = this._key(word);
        const input = utils_1.split(key);
        let node = input.reduce(reducer, this[exports.SYM_RAW]);
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
    removeWord(word) {
        utils_1.isString(word, 'word is string');
        const { prefixFound, prefixNode } = this._checkPrefix(word);
        if (prefixFound) {
            delete prefixNode[config_1.default.END_WORD];
        }
        return this;
    }
    _checkPrefix(prefix) {
        let key = this._key(prefix);
        return checkPrefix_1.default(this[exports.SYM_RAW], key);
    }
    /**
     * Check a prefix is valid
     * @returns Boolean
     */
    isPrefix(prefix) {
        utils_1.isString(prefix, 'prefix is string');
        const { prefixFound } = this._checkPrefix(prefix);
        return prefixFound;
    }
    /**
     * Get a list of all words in the trie with the given prefix
     * @returns Array
     */
    getPrefix(strPrefix, sorted = true) {
        utils_1.isString(strPrefix, 'prefix is string');
        if (typeof sorted !== 'boolean') {
            throw (utils_1.throwMsg('sort parameter as boolean', typeof sorted));
        }
        if (!this.isPrefix(strPrefix)) {
            return [];
        }
        const { prefixNode } = this._checkPrefix(strPrefix);
        return recursePrefix_1.default(prefixNode, strPrefix, sorted);
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
        return recurseRandomWord_1.default(prefixNode, strPrefix);
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
            throw (utils_1.throwMsg('sort parameter as boolean', typeof sorted));
        }
        return recursePrefix_1.default(this[exports.SYM_RAW], '', sorted);
    }
    /**
     * Check the existence of a word in the trie
     * @returns Boolean
     */
    hasWord(word) {
        if (typeof word !== 'string') {
            throw (utils_1.throwMsg('string word', typeof word));
        }
        if (word !== '') {
            const { prefixFound, prefixNode } = this._checkPrefix(word);
            if (prefixFound) {
                // @ts-ignore
                //return prefixNode[config.END_WORD] === config.END_VALUE;
                return utils_1.hasEndpoint(prefixNode);
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
            throw (utils_1.throwMsg('string word', typeof word));
        }
        if (word !== '') {
            const { prefixFound, prefixNode } = this._checkPrefix(word);
            if (utils_1.hasEndpoint(prefixNode)) {
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
            throw (utils_1.throwMsg('string letters', typeof letters));
        }
        if (letters.length < PERMS_MIN_LEN) {
            throw (utils_1.throwMsg(`at least ${PERMS_MIN_LEN} letters`, letters.length));
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
        return permutations_1.default(letters, this[exports.SYM_RAW], {
            type: 'anagram',
        });
    }
    /**
     * Get a list of all sub-anagrams that can be made from the given letters
     * @returns Array
     */
    getSubAnagrams(letters) {
        this.isAnagrams(letters);
        return permutations_1.default(letters, this[exports.SYM_RAW], {
            type: 'sub-anagram',
        });
    }
    toRegExp(flags, options) {
        if (!flags || !utils_1.isString(flags)) {
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
        return trie_regex_1.default(this.tree(), flags, options);
    }
}
exports.Trie = Trie;
function createTrie(input, ...argv) {
    return new Trie(input, ...argv);
}
exports.createTrie = createTrie;
createTrie.prototype = Trie.prototype;
exports.default = createTrie;
