import append from './append';
import { END_WORD, END_VALUE } from './config';
import { IInput, IInputMap } from './index';

export type ITrie<T = typeof END_VALUE> = ITrieNode<T> | ITrieRaw<T>;

export interface ITrieNode<T = typeof END_VALUE>
{
	[k: string]: ITrieNode<T>,

	// @ts-ignore
	[END_WORD]?: T,
}

export interface ITrieRaw<T = typeof END_VALUE>
{
	[k: string]: ITrieNode<T>
}

export function create<T>(input: IInput<T>, ...argv): ITrieRaw<T>
{
	if (!Array.isArray(input))
	{
		throw(`Expected parameter Array, received ${typeof input}`);
	}

	const trie = input.reduce((accumulator, item) =>
	{
		item
			.toLowerCase()
			.split('')
			.reduce(append, accumulator);

		return accumulator;
	}, {});

	return trie;
}

export default create
