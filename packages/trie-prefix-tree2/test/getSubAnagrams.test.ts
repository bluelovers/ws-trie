import trie from '../lib';

describe('Finding valid sub-anagrams from the Trie given a set of letters', () =>
{
	const input = ['acts', 'arc', 'acts', 'arcs', 'car', 'care', 'scar', 'scared'];
	const data = trie(input);

	test('throws an error when no letters are passed', () =>
	{
		// @ts-ignore
		expect(() => data.getSubAnagrams()).toThrowError();
	});

	test('expects at least two letters', () =>
	{
		expect(() => data.getSubAnagrams('t')).toThrowError();
	});

	test(
		'retrieves a sorted list of all valid sub-anagrams that exist in the Trie',
		() =>
		{
			const actual = data.getSubAnagrams('cares');
			const expected = ['arc', 'arcs', 'car', 'care', 'scar'];

			expect(actual).toEqual(expected);
		},
	);

	test('retrieves anagrams and sub-anagrams', () =>
	{
		const input = ['cat', 'cats'];
		const data = trie(input);
		const actual = data.getSubAnagrams('cats');
		const expected = input;

		expect(actual).toEqual(expected);
	});

	test('returns an empty array when no permutations are found', () =>
	{
		const actual = data.getSubAnagrams('abcd');
		const expected = [];

		expect(actual).toEqual(expected);
	});
});
