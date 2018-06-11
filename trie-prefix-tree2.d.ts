// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   trie-regex

declare module "trie-prefix-tree2" {
    /**
     * Created by user on 2018/6/9/009.
     */
    import trie, { Trie } from "trie-prefix-tree2/src";
    export * from "trie-prefix-tree2/src";
    export { Trie };
    export default trie;
}

declare module "trie-prefix-tree2/src" {
    import { ITrieRaw, ITrieNode } from "trie-prefix-tree2/src/create";
    import { END_VALUE } from "trie-prefix-tree2/src/config";
    import trieToRegExp, { IOptionsAll as ITrieToRegExpOptionsAll, IOptions as ITrieToRegExpOptions } from "trie-regex";
    export const SYM_RAW: unique symbol;
    export type IInput<T> = string[];
    export type IInputMap<T> = [string, T][];
    export type ITrieOptions = {
        /**
         * @default true
         */
        ignoreCase?: boolean;
        mapMode?: boolean;
    };
    export class Trie<T = typeof END_VALUE> {
        [SYM_RAW]: ITrieRaw<T>;
        options?: Readonly<ITrieOptions>;
        constructor(
            input: IInputMap<T>,
            options?: ITrieOptions & {
                mapMode: true;
            },
            ...argv: any[]
        );
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
        removeWord(word: string): this;
        protected _checkPrefix(
            prefix: string
        ): {
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
    export function createTrie<T = typeof END_VALUE>(input: string[], ...argv: any[]): Trie<T>;
    export default createTrie;
}

declare module "trie-prefix-tree2/src/create" {
    import { END_WORD, END_VALUE } from "trie-prefix-tree2/src/config";
    import { IInput } from "trie-prefix-tree2/src/index";
    export type ITrie<T = typeof END_VALUE> = ITrieNode<T> | ITrieRaw<T>;
    export interface ITrieNode<T = typeof END_VALUE> {
        [k: string]: ITrieNode<T>;
        $$?: T;
        [END_WORD]?: T;
    }
    export interface ITrieRaw<T = typeof END_VALUE> {
        [k: string]: ITrieNode<T>;
    }
    export function create<T>(input: IInput<T>, ...argv: any[]): ITrieRaw<T>;
    export default create;
}

declare module "trie-prefix-tree2/src/config" {
    export const END_WORD = "$$";
    export const END_VALUE: Readonly<{}>;
    export const END_DEF: unique symbol;
    export const PERMS_MIN_LEN = 2;
    import * as config from "trie-prefix-tree2/src/config";
    export default config;
}

declare module "trie-prefix-tree2/src/index" {
    import { ITrieRaw, ITrieNode } from "trie-prefix-tree2/src/create";
    import { END_VALUE } from "trie-prefix-tree2/src/config";
    import trieToRegExp, { IOptionsAll as ITrieToRegExpOptionsAll, IOptions as ITrieToRegExpOptions } from "trie-regex";
    export const SYM_RAW: unique symbol;
    export type IInput<T> = string[];
    export type IInputMap<T> = [string, T][];
    export type ITrieOptions = {
        /**
         * @default true
         */
        ignoreCase?: boolean;
        mapMode?: boolean;
    };
    export class Trie<T = typeof END_VALUE> {
        [SYM_RAW]: ITrieRaw<T>;
        options?: Readonly<ITrieOptions>;
        constructor(
            input: IInputMap<T>,
            options?: ITrieOptions & {
                mapMode: true;
            },
            ...argv: any[]
        );
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
        removeWord(word: string): this;
        protected _checkPrefix(
            prefix: string
        ): {
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
    export function createTrie<T = typeof END_VALUE>(input: string[], ...argv: any[]): Trie<T>;
    export default createTrie;
}
