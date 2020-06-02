/**
 * Created by user on 2018/6/8/008.
 */
export declare type IOptions = {
    getKeys?(value: any, key?: any, data?: any, root?: boolean): string[];
    isEndpoint?(value: any, key: any, trie: any): boolean;
    toRegexString?(alt_group: any, char_class: any, end: any): string;
    disableEscaped?: boolean;
    jsescOptions?: {
        es6?: boolean;
        minimal?: boolean;
    };
};
export declare type IOptionsPlus<T = RegExp> = {
    createRegExp<T>(source: string, flags?: any): T;
};
export declare type IOptionsAll<T = RegExp> = IOptions & IOptionsPlus<T>;
export declare function trieToRegExp<T>(data: any, options: IOptions & IOptionsPlus<T>, flags?: string): T;
export declare function trieToRegExp<T>(data: any, flags?: string, options?: IOptions & IOptionsPlus<T>): T;
export declare function trieToRegExp<T = RegExp>(data: any, options: IOptions): T;
export declare function trieToRegExp<T = RegExp>(data: any, flags?: string, options?: IOptions): T;
export declare function trieToRegExpSource(data: any, options?: IOptions): string;
export declare function _to_regex(alt_group: any, char_class: any, end: boolean): string;
export declare function _quotemeta(phrase: string, options?: IOptions): string;
export declare function _is_phrase_valid(phrase: any): phrase is string;
export default trieToRegExp;
