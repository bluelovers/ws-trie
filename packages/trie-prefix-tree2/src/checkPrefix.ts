import { ITrie, ITrieNode } from './create';
import { split } from '@lazy-trie/util';

export function checkPrefix<T>(prefixNode: ITrie<T>, prefix: string)
{
	//const input = split(prefix.toLowerCase());
	const input = split(prefix);
	const prefixFound = input.every((letter, index): boolean =>
	{
		if (!prefixNode[letter])
		{
			return false;
		}

		// @ts-ignore
		return prefixNode = prefixNode[letter];
	});

	return {
		prefixFound,
		prefixNode,
	} as {
		prefixFound: boolean;
		prefixNode: ITrieNode<T>;
	};
}

export default checkPrefix;
