import trie from '../src/index';

describe('Retrieving a full list of words in the trie', () =>
{
	const input = ['one', 'two', 'three'];
	const actual = trie(input).getWordsAll();
	const expected = input.sort();

	it('errors when the sort parameter is not boolean', () =>
	{
		expect(() =>
		{
			// @ts-ignore
			trie(input).getWordsAll('');
		}).to.throw();
	});

	it('returns a sorted array of all words found by default', () =>
	{
		expect(actual).to.deep.equal(expected);
	});

	it('returns an unsorted array of all words found when sort is false', () =>
	{
		expect(trie(input).getWordsAll(false)).to.deep.equal(input);
	});

	it('adding and removing words', () =>
	{
		const input = ['one', 'two', 'three'];
		const data = trie(input).addWord('four').removeWord('one');
		const actual = data.getWordsAll();
		const expected = ['four', 'three', 'two'];

		expect(actual).to.deep.equal(expected);
	});
});
