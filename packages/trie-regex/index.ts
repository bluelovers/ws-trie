/**
 * Created by user on 2018/6/8/008.
 */

import naturalCompare from 'string-natural-compare';
import { _quotemeta, _to_regex, isDefaultEndpoint } from './lib/util';
import { IOptionsAll, IOptions } from './lib/types';
export * from './lib/types';

export function trieToRegExp<T = RegExp>(data: Record<any, any>, options: IOptionsAll<T>, flags?: string): T
export function trieToRegExp<T = RegExp>(data: Record<any, any>, flags: string, options: IOptionsAll<T>): T
export function trieToRegExp<T = RegExp>(data: Record<any, any>, options: IOptions, flags?: string): T
export function trieToRegExp<T = RegExp>(data: Record<any, any>, flags?: string, options?: IOptions): T
export function trieToRegExp(data, flags?, options?)
{
	if (typeof flags == 'object')
	{
		[flags, options] = [options, flags];
	}

	options = options || {};
	flags = flags ?? options.flags ?? 'u';

	let source = trieToRegExpSource(data, options);

	if (options.createRegExp)
	{
		return options.createRegExp(source, flags);
	}

	return new RegExp(source, flags);
}

export function trieToRegExpSource(data: Record<any, any>, options: IOptions = {}): string
{
	options.getKeys = options.getKeys || function (trie)
	{
		return Object.keys(trie);
	};

	options.isEndpoint = options.isEndpoint || isDefaultEndpoint;

	options.toRegexString = options.toRegexString || _to_regex;

	const _fn_push = [].push;

	const { getKeys, isEndpoint, toRegexString } = options;

	function _walk_trie(trie, key?, root?: boolean)
	{
		let keys = getKeys(trie, key, data),
			alt_group: string[] = [],
			char_class: string[] = [],
			end = false; // marks the end of a phrase

		keys.forEach(function (_key)
		{
			let walk_result, insert;

			if (isEndpoint(trie[_key], _key, trie))
			{
				end = true;
				return;
			}

			walk_result =
				_quotemeta(_key, options) + _walk_trie(trie[_key], _key);

			// When we have more than one key, `insert` references
			// the alternative regexp group, otherwise it points to
			// the char class group.
			insert = (keys.length > 1) ? _fn_push.bind(alt_group)
				: _fn_push.bind(char_class);
			insert(walk_result);
		});

		//alt_group.sort();

		alt_group.sort(function (a, b)
		{
			return (b.length - a.length) || naturalCompare(a, b);
		});

		return toRegexString(alt_group, char_class, end);
	}

	let result = _walk_trie(data, undefined, true);
	return result;
}

export default trieToRegExp
