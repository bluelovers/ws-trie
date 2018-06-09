import trie from '../src/index';

describe('validating a word exists', () =>
{
	const input = ['dog', 'cat', 'lion', 'tiger', 'carse', 'car', 'scar'];
	const data = trie(input);

	it('throws an error when a word is not passed', () =>
	{
		// @ts-ignore
		expect(() => data.hasWord()).to.throw();
	});

	it('returns true for a valid word found', () =>
	{
		expect(data.hasWord('dog')).to.equal(true);
	});

	it('converts the word to lowercase', () =>
	{
		expect(data.hasWord('DOG')).to.equal(true);
	});

	it('returns false for an invalid word', () =>
	{
		expect(data.hasWord('elephant')).to.equal(false);
	});
});
