/**
 * Created by user on 2020/6/2.
 */
import { IOptions } from './types';
export declare function _to_regex(alt_group: string[], char_class: string[], end: boolean): string;
export declare function _quotemeta(phrase: string, options?: IOptions): string;
export declare function _is_phrase_valid(phrase: any): phrase is string;
export declare function isDefaultEndpoint(value: any, key: any, trie: any): boolean;
