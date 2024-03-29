import { END_WORD } from '@lazy-trie/types';
import { ITrie } from './create';

export function recurseRandomWord<T>(node: ITrie<T>, prefix: string): string
{
	const word = prefix;

	const branches = Object.keys(node);
	const branch = branches[Math.floor(Math.random() * branches.length)];
	if (branch === END_WORD)
	{
		return word;
	}
	return recurseRandomWord(node[branch], prefix + branch);
}

export default recurseRandomWord;
