/**
 * Created by user on 2018/6/8/008.
 */

import jsesc from 'jsesc';
import naturalCompare from 'string-natural-compare';
//import { END_WORD } from 'trie-prefix-tree/dist/config';

const END_WORD = '$$';

export type IOptions = {
	getKeys?(value, key?, data?, root?: boolean): string[],
	isEndpoint?(value, key, trie): boolean,
	toRegexString?(alt_group, char_class, end): string,

	disableEscaped?: boolean,

	jsescOptions?: {
		es6?: boolean,
		minimal?: boolean,
	}
};

export type IOptionsPlus<T = RegExp> = {
	createRegExp<T>(source: string, flags?): T
};

export type IOptionsAll<T = RegExp> = IOptions & IOptionsPlus<T>;

export function trieToRegExp<T>(data, options: IOptions & IOptionsPlus<T>, flags?: string): T
export function trieToRegExp<T>(data, flags?: string, options?: IOptions & IOptionsPlus<T>): T
export function trieToRegExp<T = RegExp>(data, options: IOptions): T
export function trieToRegExp<T = RegExp>(data, flags?: string, options?: IOptions): T
export function trieToRegExp(data, flags?, options?)
{
	if (typeof flags == 'object')
	{
		[flags, options] = [options, flags];
	}

	options = options || {};

	let source = trieToRegExpSource(data, options);

	if (options.createRegExp)
	{
		return options.createRegExp(source, flags);
	}

	return new RegExp(source, flags || 'u');
}

export function trieToRegExpSource(data, options: IOptions = {}): string
{
	options.getKeys = options.getKeys || function (trie)
	{
		return Object.keys(trie);
	};

	options.isEndpoint = options.isEndpoint || function (value, key, trie)
	{
		//return (key === END_WORD) && (trie[key] === 1);
		return (key === END_WORD);
	};

	options.toRegexString = options.toRegexString || _to_regex;

	const _fn_push = [].push;

	function _walk_trie(trie, key?, root?: boolean)
	{
		let keys = options.getKeys(trie, key, data),
			alt_group = [],
			char_class = [],
			end = false; // marks the end of a phrase

		keys.forEach(function (_key)
		{
			let walk_result, insert;

			if (options.isEndpoint(trie[_key], _key, trie))
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

		return options.toRegexString(alt_group, char_class, end);
	}

	let result = _walk_trie(data, undefined, true);
	return result;
}

export function _to_regex(alt_group, char_class, end: boolean): string
{

	let group_has_one_element = function (el)
		{
			return el.length === 1;
		},
		result = "";

	// Once we've finished walking through the tree we need to build
	// the regex match groups...
	if (alt_group.length > 0)
	{

		if (alt_group.length === 1)
		{
			// Individual elements are merged with the current result.
			result += alt_group[0];
		}
		else if (alt_group.every(group_has_one_element))
		{
			// When every single array in the alternative group is
			// a single element array, this gets flattened in to
			// a character class.
			result += ('[' + alt_group.join('') + ']');
		}
		else
		{
			// Finally, build a non-capturing alternative group.
			result += ('(?:' + alt_group.join('|') + ')');
		}
	}
	else if (char_class.length > 0)
	{
		result += char_class[0];
	}

	if (end && result)
	{

		if (result.length === 1)
		{
			result += '?';
		}
		else
		{
			result = '(?:' + result + ')?';
		}
	}

	return result;
}

export function _quotemeta(phrase: string, options: IOptions = {})
{
	if (!_is_phrase_valid(phrase))
	{
		return phrase;
	}

	let s = phrase
		.replace(/([\t\n\f\r\\\$\(\)\*\+\-\.\?\[\]\^\{\|\}])/g, '\\$1');

	if (!options.disableEscaped)
	{
		let jo = Object.assign({
			'es6': true,
			//'minimal': true,
		}, options.jsescOptions);

		s = s.replace(/[^\x20-\x7E]+/ug, function (s)
		{
			return jsesc(s, jo);
		});
	}

	return s;
}

export function _is_phrase_valid(phrase): phrase is string
{
	return (typeof phrase === 'string' && phrase.length > 0);
}

export default trieToRegExp
