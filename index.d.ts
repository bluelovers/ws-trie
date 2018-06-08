export declare type IOptions = {
    getKeys?(value, key?, data?, root?: boolean): string[];
    isEndpoint?(value, key, trie): boolean;
    toRegexString?(alt_group, char_class, end): string;
};
export declare type IOptionsPlus<T = RegExp> = {
    createRegExp<T>(source: string, flags?): T;
};
export declare function trieToRegExp<T>(data: any, options: IOptions & IOptionsPlus<T>, flags?: string): T;
export declare function trieToRegExp<T>(data: any, flags?: string, options?: IOptions & IOptionsPlus<T>): T;
export declare function trieToRegExp<T = RegExp>(data: any, options: IOptions): T;
export declare function trieToRegExp<T = RegExp>(data: any, flags?: string, options?: IOptions): T;
export declare function trieToRegExpSource(data: any, options?: IOptions): string;
export declare function _to_regex(alt_group: any, char_class: any, end: boolean): string;
export declare function _quotemeta(phrase: string): string;
export declare function _is_phrase_valid(phrase: any): phrase is string;
export default trieToRegExp;
