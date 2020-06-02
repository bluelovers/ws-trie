import trie from '../lib';

describe('Retrieving a full list of words in the trie', () =>
{
	const input = ['one', 'two', 'three'];
	const actual = trie(input).getWordsAll();
	const expected = input.sort();

	test('errors when the sort parameter is not boolean', () =>
	{
		expect(() =>
		{
			// @ts-ignore
			trie(input).getWordsAll('');
		}).toThrowError();
	});

	test('returns a sorted array of all words found by default', () =>
	{
		expect(actual).toEqual(expected);
	});

	test('returns an unsorted array of all words found when sort is false', () =>
	{
		expect(trie(input).getWordsAll(false)).toEqual(input);
	});

	test('adding and removing words', () =>
	{
		const input = ['one', 'two', 'three'];
		const data = trie(input).addWord('four').removeWord('one');
		const actual = data.getWordsAll();
		const expected = ['four', 'three', 'two'];

		expect(actual).toEqual(expected);
	});
});
