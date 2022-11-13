import trie from '../src';

describe('Prefix checking', () =>
{
	const input = trie(['dog', 'cat', 'meow']);

	test('throws an error when the prefix is undefined', () =>
	{
		// @ts-ignore
		expect(() => input.isPrefix()).toThrowError();
	});

	test('converts the given prefix to lowercase', () =>
	{
		expect(input.isPrefix('D')).toBe(true);
	});

	test('returns false for an invalid prefix', () =>
	{
		expect(input.isPrefix('med')).toBe(false);
	});

	test('returns true for a valid prefix', () =>
	{
		expect(input.isPrefix('do')).toBe(true);
	});
});
