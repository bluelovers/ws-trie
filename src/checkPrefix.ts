import utils from './utils';

export function checkPrefix(prefixNode, prefix: string)
{
	const input = prefix.toLowerCase().split('');
	const prefixFound = input.every((letter, index) =>
	{
		if (!prefixNode[letter])
		{
			return false;
		}
		return prefixNode = prefixNode[letter];
	});

	return {
		prefixFound,
		prefixNode,
	};
}

export default checkPrefix
