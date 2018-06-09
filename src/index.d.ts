import { ITrieRaw } from './create';
import { END_VALUE } from './config';
export declare const SYM_RAW: unique symbol;
export declare type IInput<T> = string[];
export declare type IInputMap<T> = [string, T][];
export declare class Trie<T = typeof END_VALUE> {
    [SYM_RAW]: ITrieRaw<T>;
    constructor(input: IInput<T>, ...argv: any[]);
    /**
     * Get the generated raw trie object
     */
    tree(): ITrieRaw<T>;
    /**
     * Get a string representation of the trie
     */
    load(obj: ITrieRaw<T>): this;
    load<R>(obj: ITrieRaw<R>): this;
    load(obj: any): this;
    /**
     * Get a string representation of the trie
     */
    dump(spacer?: string | number): string;
    /**
     * Add a new word to the trie
     */
    addWord(word: string): this;
    /**
     * Remove an existing word from the trie
     */
    removeWord(word: string): this;
    /**
     * Check a prefix is valid
     * @returns Boolean
     */
    isPrefix(prefix: string): prefix is string;
    /**
     * Get a list of all words in the trie with the given prefix
     * @returns Array
     */
    getPrefix(strPrefix: string, sorted?: boolean): string[];
    /**
     * Get a random word in the trie with the given prefix
     * @returns String
     */
    getRandomWordWithPrefix(strPrefix?: string): string;
    /**
     * Count the number of words with the given prefixSearch
     * @returns Number
     */
    countPrefix(strPrefix: string): number;
    /**
     * Get all words in the trie
     * @returns Array
     */
    getWords(sorted?: boolean): string[];
    /**
     * Check the existence of a word in the trie
     * @returns Boolean
     */
    hasWord(word: string): boolean;
    isAnagrams(letters: string): letters is string;
    /**
     * Get a list of valid anagrams that can be made from the given letters
     * @returns Array
     */
    getAnagrams(letters: string): string[];
    /**
     * Get a list of all sub-anagrams that can be made from the given letters
     * @returns Array
     */
    getSubAnagrams(letters: string): string[];
}
export declare function createTrie<T = typeof END_VALUE>(input: string[], ...argv: any[]): Trie<T>;
export default createTrie;
