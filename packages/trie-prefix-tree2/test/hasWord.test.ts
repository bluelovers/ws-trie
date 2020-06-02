import trie from '../lib';

describe('validating a word exists', () =>
{
	const input = ['dog', 'cat', 'lion', 'tiger', 'carse', 'car', 'scar'];
	const data = trie(input);

	test('throws an error when a word is not passed', () =>
	{
		// @ts-ignore
		expect(() => data.hasWord()).toThrowError();
	});

	test('returns true for a valid word found', () =>
	{
		expect(data.hasWord('dog')).toBe(true);
	});

	test('converts the word to lowercase', () =>
	{
		expect(data.hasWord('DOG')).toBe(true);
	});

	test('returns false for an invalid word', () =>
	{
		expect(data.hasWord('elephant')).toBe(false);
	});
});
