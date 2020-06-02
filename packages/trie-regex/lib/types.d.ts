/**
 * Created by user on 2020/6/2.
 */
import { Opts as IJsescOptions } from 'jsesc';
export interface IOptions {
    getKeys?(value: any, key?: any, data?: any, root?: boolean): string[];
    isEndpoint?(value: any, key: any, trie: any): boolean;
    toRegexString?(alt_group: any, char_class: any, end: any): string;
    disableEscaped?: boolean;
    jsescOptions?: IJsescOptions;
    flags?: string;
}
export interface IOptionsPlus<T = RegExp> {
    createRegExp<T>(source: string, flags?: any): T;
}
export interface IOptionsAll<T = RegExp> extends IOptions, IOptionsPlus<T> {
}
