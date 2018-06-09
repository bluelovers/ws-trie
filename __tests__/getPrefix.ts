import trie from '../src/index';

const input = trie(['aah', 'aahs', 'aardvark', 'aalii', 'aal', 'baa', 'baal']);

describe('Getting prefixes', () =>
{
	it('throws an error when the first parameter is not a string', () =>
	{
		// @ts-ignore
		expect(() => input.getPrefix()).to.throw();
	});

	it('errors when the sort parameter is not boolean', () =>
	{
		// @ts-ignore
		expect(() => input.getPrefix('aah', 123)).to.throw();
	});

	it('returns an empty array when the given prefix is not found', () =>
	{
		expect(input.getPrefix('dog')).to.deep.equal([]);
	});

	it('returns a sorted array of words when sort is set to true', () =>
	{
		expect(input.getPrefix('aal')).to.deep.equal(['aal', 'aalii']);
	});

	it('returns an unsorted array of words when sort is set to false', () =>
	{
		expect(input.getPrefix('aal', false)).to.deep.equal(['aalii', 'aal']);
	});
});

it('Counting prefixes', () =>
{
	// @ts-ignore
	expect(() => input.countPrefix()).to.throw();
	expect(input.countPrefix('a')).to.deep.equal(5);
	expect(input.countPrefix('ba')).to.deep.equal(2);
	expect(input.countPrefix('dog')).to.deep.equal(0);
});
