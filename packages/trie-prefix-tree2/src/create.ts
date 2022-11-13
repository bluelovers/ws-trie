import { append } from './append';
import { END_DEF, END_VALUE } from './config';
import { IInput } from './index';
import { split } from '@lazy-trie/util';
import { END_WORD } from '@lazy-trie/types';

export type ITrie<T = typeof END_VALUE> = ITrieNode<T> | ITrieRaw<T>;

export interface ITrieNode<T = typeof END_VALUE>
{
	[k: string]: ITrieNode<T>,

	//@ts-ignore
	'$$'?: ITrieNodeValue<T>,
	//@ts-ignore
	[END_WORD]?: ITrieNodeValue<T>,
}

export interface ITrieNodeValue<T = typeof END_VALUE>
{
	[k: string]: T,

	[END_DEF]: string,
}

export interface ITrieRaw<T = typeof END_VALUE>
{
	[k: string]: ITrieNode<T>
}

export function create<T>(input: IInput<T>, ...argv): ITrieRaw<T>
{
	if (!Array.isArray(input))
	{
		throw new TypeError(`Expected parameter Array, received ${typeof input}`);
	}

	const trie = input.reduce((accumulator, item) =>
	{
		//split(item.toLowerCase())
		split(item)
			.reduce(append, accumulator)
		;

		return accumulator;
	}, {});

	return trie;
}

export default create;

export function isEndpoint<T>(value: ITrie<T>, key: string, trie: ITrie<T>): value is ITrieNode<T>
{
	return key === END_WORD;
}

export function hasEndpoint<T>(node: ITrie<T>): node is ITrieNode<T>
{
	return END_WORD in node;
}
