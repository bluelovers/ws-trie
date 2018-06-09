import config, { END_VALUE, END_WORD } from './config';
import { ITrieRaw, ITrieNode } from './create';
import utils from './utils';

export function append(trie: ITrieNode, letter, index, array)
{
	trie[letter] = trie[letter] || {};
	trie = trie[letter];

	if (index === array.length - 1)
	{
		trie[END_WORD] = END_VALUE;
	}

	return trie;
}

export default append
