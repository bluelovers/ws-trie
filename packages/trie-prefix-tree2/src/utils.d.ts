import { ITrie, ITrieNode } from './create';
export declare const ZWJ = 8205;
export declare const ZWJ_STR = "\u200D";
export declare function isString(word: string, msg?: string): word is string;
export declare type ISplitOptions = {
    toLowerCase?: boolean;
};
export declare function split(str: string, options?: ISplitOptions): string[];
export declare function objectCopy(obj?: any): any;
export declare function stringify(obj?: any, spacer?: number | string): string;
export declare function throwMsg(expected: any, received: any): string;
export declare function isEndpoint<T>(value: ITrie<T>, key: string, trie: ITrie<T>): value is ITrieNode<T>;
export declare function hasEndpoint<T>(node: ITrie<T>): node is ITrieNode<T>;
export declare function zwjTrim(s: string): string;
export declare function zwjTrimStart(s: string): string;
export declare function zwjTrimEnd(s: string): string;
declare const _default: typeof import("./utils");
export default _default;
