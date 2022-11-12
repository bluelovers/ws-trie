/**
 * Created by user on 2018/6/8/008.
 */

import { naturalCompare } from 'string-natural-compare2';
import { _quotemeta, _to_regex, isDefaultEndpoint } from './util';
import { IOptionsAll, IOptions } from './types';
export * from './types';

export function trieToRegExp<T = RegExp>(data: Record<any, any>, options: IOptionsAll<T>, flags?: string): T;
export function trieToRegExp<T = RegExp>(data: Record<any, any>, flags: string, options: IOptionsAll<T>): T;
export function trieToRegExp<T = RegExp>(data: Record<any, any>, options: IOptions, flags?: string): T;
export function trieToRegExp<T = RegExp>(data: Record<any, any>, flags?: string, options?: IOptions): T;
export function trieToRegExp(data: Record<any, any>, flags: any, options: any)
{
	if (typeof flags == 'object')
	{
		[flags, options] = [options, flags];
	}

	options = options || {} as IOptionsAll;
	flags = flags ?? options.flags ?? 'u';

	const source = trieToRegExpSource(data, options);

	if (options.createRegExp)
	{
		return options.createRegExp(source, flags);
	}

	return new RegExp(source, flags);
}

export function trieToRegExpSource(data: Record<any, any>, options: IOptions = {}): string
{
	const getKeys = options.getKeys ?? function (trie)
	{
		return Object.keys(trie);
	};

	const isEndpoint = options.isEndpoint ?? isDefaultEndpoint;
	const toRegexString = options.toRegexString ?? _to_regex;
	const _fn_push = ([] as any[]).push;

	function _walk_trie(trie: Record<any, any>, key?: string, root?: boolean)
	{
		const keys = getKeys(trie, key, data);
		const alt_group: string[] = [];
		const char_class: string[] = [];
		let end = false; // marks the end of a phrase

		keys.forEach(function (_key)
		{
			if (isEndpoint(trie[_key], _key, trie))
			{
				end = true;
				return;
			}

			const walk_result = _quotemeta(_key, options) + _walk_trie(trie[_key], _key);

			// When we have more than one key, `insert` references
			// the alternative regexp group, otherwise it points to
			// the char class group.
			_fn_push.call(keys.length > 1 ? alt_group : char_class, walk_result);
		});

		//alt_group.sort();

		alt_group.sort(function (a, b)
		{
			return (b.length - a.length) || naturalCompare(a, b);
		});

		return toRegexString(alt_group, char_class, end);
	}

	return _walk_trie(data, void 0, true);
}

export default trieToRegExp;
