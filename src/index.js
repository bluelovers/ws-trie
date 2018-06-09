"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = require("./create");
const append_1 = require("./append");
const checkPrefix_1 = require("./checkPrefix");
const recursePrefix_1 = require("./recursePrefix");
const utils_1 = require("./utils");
const config_1 = require("./config");
const permutations_1 = require("./permutations");
const PERMS_MIN_LEN = config_1.default.PERMS_MIN_LEN;
exports.SYM_RAW = Symbol('trie');
class Trie {
    constructor(input, ...argv) {
        if (!Array.isArray(input)) {
            throw (`Expected parameter Array, received ${typeof input}`);
        }
        const trie = create_1.default([...input], ...argv);
        this[exports.SYM_RAW] = trie;
    }
    /**
     * Get the generated raw trie object
     */
    tree() {
        return this[exports.SYM_RAW];
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
    addWord(word) {
        if (typeof word !== 'string' || word === '') {
            throw (`Expected parameter string, received ${typeof word}`);
        }
        const reducer = (...params) => {
            // @ts-ignore
            return append_1.default(...params);
        };
        const input = word.toLowerCase().split('');
        input.reduce(reducer, this[exports.SYM_RAW]);
        return this;
    }
    /**
     * Remove an existing word from the trie
     */
    removeWord(word) {
        if (typeof word !== 'string' || word === '') {
            throw (`Expected parameter string, received ${typeof word}`);
        }
        const { prefixFound, prefixNode } = checkPrefix_1.default(this[exports.SYM_RAW], word);
        if (prefixFound) {
            delete prefixNode[config_1.default.END_WORD];
        }
        return this;
    }
    /**
     * Check a prefix is valid
     * @returns Boolean
     */
    isPrefix(prefix) {
        if (typeof prefix !== 'string' || prefix === '') {
            throw (`Expected string prefix, received ${typeof prefix}`);
        }
        const { prefixFound } = checkPrefix_1.default(this[exports.SYM_RAW], prefix);
        return prefixFound;
    }
    /**
     * Get a list of all words in the trie with the given prefix
     * @returns Array
     */
    getPrefix(strPrefix, sorted = true) {
        if (typeof strPrefix !== 'string' || strPrefix === '') {
            throw (`Expected string prefix, received ${typeof strPrefix}`);
        }
        if (typeof sorted !== 'boolean') {
            throw (`Expected sort parameter as boolean, received ${typeof sorted}`);
        }
        if (!this.isPrefix(strPrefix)) {
            return [];
        }
        const { prefixNode } = checkPrefix_1.default(this[exports.SYM_RAW], strPrefix);
        return recursePrefix_1.default(prefixNode, strPrefix, sorted);
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
    getWords(sorted = true) {
        if (typeof sorted !== 'boolean') {
            throw (`Expected sort parameter as boolean, received ${typeof sorted}`);
        }
        return recursePrefix_1.default(this[exports.SYM_RAW], '', sorted);
    }
    /**
     * Check the existence of a word in the trie
     * @returns Boolean
     */
    hasWord(word) {
        if (typeof word !== 'string') {
            throw (`Expected string word, received ${typeof word}`);
        }
        const { prefixFound, prefixNode } = checkPrefix_1.default(this[exports.SYM_RAW], word);
        if (prefixFound) {
            // @ts-ignore
            return prefixNode[config_1.default.END_WORD] === config_1.default.END_VALUE;
        }
        return false;
    }
    /**
     * Get a list of valid anagrams that can be made from the given letters
     * @returns Array
     */
    getAnagrams(letters) {
        if (typeof letters !== 'string') {
            throw (`Anagrams expected string letters, received ${typeof letters}`);
        }
        if (letters.length < PERMS_MIN_LEN) {
            throw (`getAnagrams expects at least ${PERMS_MIN_LEN} letters`);
        }
        return permutations_1.default(letters, this[exports.SYM_RAW], {
            type: 'anagram',
        });
    }
    /**
     * Get a list of all sub-anagrams that can be made from the given letters
     * @returns Array
     */
    getSubAnagrams(letters) {
        if (typeof letters !== 'string') {
            throw (`Expected string letters, received ${typeof letters}`);
        }
        if (letters.length < PERMS_MIN_LEN) {
            throw (`getSubAnagrams expects at least ${PERMS_MIN_LEN} letters`);
        }
        return permutations_1.default(letters, this[exports.SYM_RAW], {
            type: 'sub-anagram',
        });
    }
}
exports.Trie = Trie;
function createTrie(input, ...argv) {
    return new Trie(input, ...argv);
}
exports.createTrie = createTrie;
createTrie.prototype = Trie.prototype;
exports.default = createTrie;
