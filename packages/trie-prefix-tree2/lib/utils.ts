import UString from 'uni-string';
import { END_WORD } from './config';
import { ITrie, ITrieNode } from './create';

export const ZWJ = 0x200d;
export const ZWJ_STR = '\u200d';

export function isString(word: string, msg = 'string'): word is string
{
	if (typeof word !== 'string' || word === '')
	{
		throw(throwMsg(msg, typeof word));
	}

	// @ts-ignore
	return word
}

export type ISplitOptions = {
	toLowerCase?: boolean,
}

export function split(str: string, options: ISplitOptions = {}): string[]
{
	options = options || {};

	if (options.toLowerCase)
	{
		str = str.toLowerCase();
	}

	let arr = UString.split(str, '');

	let i = arr.length;

	while (i > 0)
	{
		let j = i - 1;
		let cur = arr[j];

		if (cur.length > 2 && /\u200d/.test(cur))
		{
			let a = cur.split(/(\u200d)/);

			arr.splice(j, 1, ...a);
		}

		i = j;
	}

	return arr;
}

export function objectCopy<T>(obj?: T): T
{
	if (typeof obj === 'undefined')
	{
		return {} as T;
	}
	return JSON.parse(JSON.stringify(obj));
}

export function stringify(obj?, spacer: number | string = 2)
{
	if (typeof obj === 'undefined')
	{
		return '';
	}
	return JSON.stringify(obj, null, spacer);
}

export function throwMsg(expected, received)
{
	return `Expected ${expected}, received ${received}`;
}

export function isEndpoint<T>(value: ITrie<T>, key: string, trie: ITrie<T>): value is ITrieNode<T>
{
	return key === END_WORD;
}

export function hasEndpoint<T>(node: ITrie<T>): node is ITrieNode<T>
{
	return END_WORD in node;
}

export function zwjTrim(s: string)
{
	return s.replace(/^[\u200d\s]+|[\u200d\s]+$/, '');
}

export function zwjTrimStart(s: string)
{
	return s.replace(/^[\u200d\s]+/, '');
}

export function zwjTrimEnd(s: string)
{
	return s.replace(/[\u200d\s]+$/, '');
}

export default exports as typeof import('./utils');
