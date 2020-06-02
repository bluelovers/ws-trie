import trie from '../lib';

describe('Finding valid anagrams from the Trie given a set of letters', () =>
{
	const input = ['tea', 'car', 'tae', 'dog', 'eta', 'ate', 'eat', 'blah'];
	const data = trie(input);

	test('throws an error when no letters are passed', () =>
	{
		// @ts-ignore
		expect(() => data.getAnagrams()).toThrowError();
	});

	test('expects at least two letters', () =>
	{
		expect(() => data.getAnagrams('t')).toThrowError();
	});

	test(
		'retrieves a sorted list of all valid permutations that exist in the Trie',
		() =>
		{
			const actual = data.getAnagrams('tea');
			const expected = ['ate', 'eat', 'eta', 'tae', 'tea'];

			expect(actual).toEqual(expected);
			expect(data.getAnagrams('gdo')).toEqual(['dog']);
		},
	);

	test('returns an empty array when no permutations are found', () =>
	{
		const actual = data.getAnagrams('abcd');
		const expected = [];

		expect(actual).toEqual(expected);
	});
});
