import permutations from '../src/permutations';

describe('string permutations', () =>
{
	test('throws when the first argument is not a string', () =>
	{
		// @ts-ignore
		expect(() => permutations()).toThrowError();
	});

	test('produces an array', () =>
	{
		expect(permutations('abc', {})).toEqual([]);
	});
});
