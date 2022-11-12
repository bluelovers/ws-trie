/**
 * Created by user on 2020/6/2.
 */

import { Opts as IJsescOptions } from 'jsesc';

export interface IOptions
{
	getKeys?(value, key?, data?, root?: boolean): string[],

	isEndpoint?(value, key, trie): boolean,

	toRegexString?(alt_group, char_class, end): string,

	disableEscaped?: boolean,

	jsescOptions?: IJsescOptions,

	flags?: string,
}

export interface IOptionsPlus<T = RegExp>
{
	createRegExp<T>(source: string, flags?): T
}

export interface IOptionsAll<T = RegExp> extends IOptions, IOptionsPlus<T>
{

}
