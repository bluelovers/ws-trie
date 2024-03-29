/// <reference types="jsesc" />

import { END_WORD } from '@lazy-trie/types';
import { IOptions, IOptionsAll, trieToRegExp } from 'trie-regex';

export declare const END_VALUE: any;
export declare const END_DEF: unique symbol;
export type ITrie<T = typeof END_VALUE> = ITrieNode<T> | ITrieRaw<T>;
export interface ITrieNode<T = typeof END_VALUE> {
	[k: string]: ITrieNode<T>;
	"$$"?: ITrieNodeValue<T>;
	[END_WORD]?: ITrieNodeValue<T>;
}
export interface ITrieNodeValue<T = typeof END_VALUE> {
	[k: string]: T;
	[END_DEF]: string;
}
export interface ITrieRaw<T = typeof END_VALUE> {
	[k: string]: ITrieNode<T>;
}
export declare function isEndpoint<T>(value: ITrie<T>, key: string, trie: ITrie<T>): value is ITrieNode<T>;
export declare function hasEndpoint<T>(node: ITrie<T>): node is ITrieNode<T>;
export declare const SYM_RAW: unique symbol;
export type IInput<T> = string[];
export type IInputMap<T> = [
	string,
	T
][];
export type ITrieOptions = {
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
	load(obj: unknown): this;
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
	toRegExp<R = RegExp>(flags?: string, options?: IOptions): R;
	toRegExp<R>(flags?: string, options?: IOptionsAll<R>): ReturnType<typeof trieToRegExp>;
}
export declare function createTrie<T = typeof END_VALUE>(input: IInputMap<T>, options?: ITrieOptions & {
	mapMode: true;
}, ...argv: any[]): Trie<T>;
export declare function createTrie<T = typeof END_VALUE>(input: IInput<T>, options?: ITrieOptions, ...argv: any[]): Trie<T>;

export {
	createTrie as default,
	createTrie as trie,
};

export {};
