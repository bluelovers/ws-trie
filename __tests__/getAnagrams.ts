import trie from '../src/index';

describe('Finding valid anagrams from the Trie given a set of letters', () =>
{
	const input = ['tea', 'car', 'tae', 'dog', 'eta', 'ate', 'eat', 'blah'];
	const data = trie(input);

	it('throws an error when no letters are passed', () =>
	{
		expect(() => data.getAnagrams()).to.throw();
	});

	it('expects at least two letters', () =>
	{
		expect(() => data.getAnagrams('t')).to.throw();
	});

	it('retrieves a sorted list of all valid permutations that exist in the Trie', () =>
	{
		const actual = data.getAnagrams('tea');
		const expected = ['ate', 'eat', 'eta', 'tae', 'tea'];

		expect(actual).to.deep.equal(expected);
		expect(data.getAnagrams('gdo')).to.deep.equal(['dog']);
	});

	it('returns an empty array when no permutations are found', () =>
	{
		const actual = data.getAnagrams('abcd');
		const expected = [];

		expect(actual).to.deep.equal(expected);
	});
});
