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
export declare function trieToRegExp<T = RegExp>(data: Record<any, any>, options: IOptionsAll<T>, flags?: string): T;
export declare function trieToRegExp<T = RegExp>(data: Record<any, any>, flags: string, options: IOptionsAll<T>): T;
export declare function trieToRegExp<T = RegExp>(data: Record<any, any>, options: IOptions, flags?: string): T;
export declare function trieToRegExp<T = RegExp>(data: Record<any, any>, flags?: string, options?: IOptions): T;
export declare function trieToRegExpSource(data: Record<any, any>, options?: IOptions): string;

export {
	trieToRegExp as default,
};

export {};
