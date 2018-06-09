import trie from '../src/index';

describe('Prefix checking', () =>
{
	const input = trie(['dog', 'cat', 'meow']);

	it('throws an error when the prefix is undefined', () =>
	{
		// @ts-ignore
		expect(() => input.isPrefix()).to.throw();
	});

	it('converts the given prefix to lowercase', () =>
	{
		expect(input.isPrefix('D')).to.equal(true);
	});

	it('returns false for an invalid prefix', () =>
	{
		expect(input.isPrefix('med')).to.equal(false);
	});

	it('returns true for a valid prefix', () =>
	{
		expect(input.isPrefix('do')).to.equal(true);
	});
});
