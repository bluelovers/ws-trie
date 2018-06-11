import { ITrieRaw, ITrieNode, ITrieNodeValue } from './create';
export { ITrieRaw, ITrieNode, ITrie, ITrieNodeValue } from './create';
import { END_VALUE } from './config';
export { END_VALUE, END_WORD, END_DEF } from './config';
import trieToRegExp, { IOptionsAll as ITrieToRegExpOptionsAll, IOptions as ITrieToRegExpOptions } from 'trie-regex';
export { IOptionsAll as ITrieToRegExpOptionsAll, IOptions as ITrieToRegExpOptions } from 'trie-regex';
export declare const SYM_RAW: unique symbol;
export declare type IInput<T> = string[];
export declare type IInputMap<T> = [string, T][];
export declare type ITrieOptions = {
    /**
     * @default true
     */
    ignoreCase?: boolean;
    mapMode?: boolean;
};
export declare class Trie<T = typeof END_VALUE> {
    [SYM_RAW]: ITrieRaw<T>;
    options?: Readonly<ITrieOptions>;
    constructor(input: IInputMap<T>, options?: ITrieOptions & {
        mapMode: true;
    }, ...argv: any[]);
    constructor(input: IInput<T>, options?: ITrieOptions, ...argv: any[]);
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
    addWord(word: string, value?: T): this;
    protected _key(word: string): string;
    /**
     * Remove an existing word from the trie
     */
    removeWord(word: string, all?: boolean): this;
    protected _checkPrefix(prefix: string): {
        prefixFound: boolean;
        prefixNode: ITrieNode<T>;
    };
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
    getWordsAll(sorted?: boolean): string[];
    /**
     * Check the existence of a word in the trie
     * @returns Boolean
     */
    hasWord(word: string): boolean;
    /**
     *
     * @example
     * tree.getWordData('object.entries')
     * // => { key: 'Object.entries', value: null, matched: false }
     * tree.getWordData('Object.entries')
     * // { key: 'Object.entries', value: null, matched: true }
     */
    getWordData(word: string, notChkDefault?: boolean): {
        key: string;
        value: T;
        matched: boolean;
    };
    getWordData<R>(word: string, notChkDefault?: boolean): {
        key: string;
        value: R;
        matched: boolean;
    };
    /**
     * @example
     * tree.getWordNode('Object.entries')
     * // => { 'Object.entries': null, [Symbol(default)]: 'Object.entries' }
     */
    getWordNode(word: string): ITrieNodeValue<T>;
    getWordNode<R>(word: string): ITrieNodeValue<R>;
    /**
     * @example
     * tree.getWordNodeKeys('Object.entries')
     * // => [ 'Object.entries' ]
     */
    getWordNodeKeys(word: string): string[];
    protected isAnagrams(letters: string): letters is string;
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
    toRegExp<R = RegExp>(flags?: string, options?: ITrieToRegExpOptions): R;
    toRegExp<R>(flags?: string, options?: ITrieToRegExpOptionsAll<R>): ReturnType<typeof trieToRegExp>;
}
export declare function createTrie<T = typeof END_VALUE>(input: string[], ...argv: any[]): Trie<T>;
export default createTrie;
