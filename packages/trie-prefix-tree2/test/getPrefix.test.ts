import trie from '../src';

const input = trie(['aah', 'aahs', 'aardvark', 'aalii', 'aal', 'baa', 'baal']);

describe('Getting prefixes', () =>
{
	test('throws an error when the first parameter is not a string', () =>
	{
		// @ts-ignore
		expect(() => input.getPrefix()).toThrowError();
	});

	test('errors when the sort parameter is not boolean', () =>
	{
		// @ts-ignore
		expect(() => input.getPrefix('aah', 123)).toThrowError();
	});

	test('returns an empty array when the given prefix is not found', () =>
	{
		expect(input.getPrefix('dog')).toEqual([]);
	});

	test('returns a sorted array of words when sort is set to true', () =>
	{
		expect(input.getPrefix('aal')).toEqual(['aal', 'aalii']);
	});

	test('returns an unsorted array of words when sort is set to false', () =>
	{
		expect(input.getPrefix('aal', false)).toEqual(['aalii', 'aal']);
	});
});

test('Counting prefixes', () =>
{
	// @ts-ignore
	expect(() => input.countPrefix()).toThrowError();
	expect(input.countPrefix('a')).toEqual(5);
	expect(input.countPrefix('ba')).toEqual(2);
	expect(input.countPrefix('dog')).toEqual(0);
});
