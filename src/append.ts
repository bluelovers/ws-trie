import config, { END_VALUE, END_WORD } from './config';
import { ITrieRaw, ITrieNode, ITrie } from './create';
import utils from './utils';

export function append<T>(trie: ITrie<T>, letter: string, index: number, array: string[]): ITrieNode<T>
{
	trie[letter] = trie[letter] || {};
	trie = trie[letter];

	if (index === array.length - 1)
	{
		// @ts-ignore
		trie[END_WORD] = null;
	}

	return trie;
}

export default append
