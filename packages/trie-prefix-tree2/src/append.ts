import { END_WORD } from '@lazy-trie/types';
import { ITrie, ITrieNode } from './create';

export function append<T>(trie: ITrie<T>, letter: string, index: number, array: string[]): ITrieNode<T>
{
	trie[letter] = trie[letter] || {};
	trie = trie[letter];

	if (index === array.length - 1)
	{
		trie[END_WORD] = null;
	}

	return trie;
}

export default append;
