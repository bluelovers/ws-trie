import append from './append';
import { END_WORD, END_VALUE, END_DEF } from './config';
import { IInput, IInputMap } from './index';
import { split } from './utils';

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
		throw(`Expected parameter Array, received ${typeof input}`);
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

export default create
