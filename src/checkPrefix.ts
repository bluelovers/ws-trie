import { ITrie, ITrieNode } from './create';
import utils from './utils';

export function checkPrefix<T>(prefixNode: ITrie<T>, prefix: string)
{
	const input = prefix.toLowerCase().split('');
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
	}
}

export default checkPrefix
