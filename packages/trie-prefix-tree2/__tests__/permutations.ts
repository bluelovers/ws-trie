import permutations from '../src/permutations';

describe('string permutations', () =>
{
	it('throws when the first argument is not a string', () =>
	{
		// @ts-ignore
		expect(() => permutations()).to.throw();
	});

	it('produces an array', () =>
	{
		expect(permutations('abc', {})).to.deep.equal([]);
	});
});
