import { END_WORD } from './config';
import { ITrie, ITrieNode, ITrieRaw } from './create';

// sort items as they're being found
// to prevent slow .sort() in NodeJs
export function pushInOrder<T>(word: T, prefixes: T[])
{
	let i = 0;

	while (i < prefixes.length)
	{
		if (word < prefixes[i])
		{
			break;
		}
		i += 1;
	}

	prefixes.splice(i, 0, word);

	return prefixes;
}

export function recursePrefix<T>(node: ITrie<T>, prefix: string, sorted: boolean, prefixes: string[] = []): string[]
{
	let word = prefix;

	for (const branch in node)
	{
		// @ts-ignore
		if (branch === END_WORD)
		{
			if (sorted)
			{
				pushInOrder(word, prefixes);
			}
			else
			{
				prefixes.push(word);
			}
			word = '';
		}
		recursePrefix(node[branch], prefix + branch, sorted, prefixes);
	}

	return prefixes;
}

export default recursePrefix
