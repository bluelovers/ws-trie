/**
 * Created by user on 2020/6/2.
 */

import jsesc from 'jsesc';
import { IOptions } from './types';
import { END_WORD } from '@lazy-trie/types';

export function _to_regex(alt_group: string[], char_class: string[], end: boolean): string
{

	const group_has_one_element = function (el: string)
	{
		return el.length === 1;
	};
	let result = "";

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
			result += '[' + alt_group.join('') + ']';
		}
		else
		{
			// Finally, build a non-capturing alternative group.
			result += '(?:' + alt_group.join('|') + ')';
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
		const jo = Object.assign({
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

export function _is_phrase_valid(phrase: unknown): phrase is string
{
	return typeof phrase === 'string' && phrase.length > 0;
}

export function isDefaultEndpoint(value: unknown, key: unknown, trie: unknown): key is typeof END_WORD
{
	//return (key === END_WORD) && (trie[key] === 1);
	return key === END_WORD;
}
