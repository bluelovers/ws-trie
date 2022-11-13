import trie from '../src';

describe('Retrieving a random words in the trie', () =>
{
	const words = ['cat', 'catfish', 'dog'];
	const t = trie(words);

	test('picks words only with the prefix', () =>
	{
		for (let i = 0; i < 100; i++)
		{
			const word = t.getRandomWordWithPrefix('cat');

			expect(words).toEqual(expect.arrayContaining([word]));
			expect(word).not.toEqual('dog');
		}
	});

	test('can pick randomly in all of the words', () =>
	{
		const word = t.getRandomWordWithPrefix();

		expect(words).toEqual(expect.arrayContaining([word]));
	});

	test('doesn\'t return words without the prefix', () =>
	{
		const word = t.getRandomWordWithPrefix('xyz');
		expect(word).toEqual('');
	});

	test('errors when the prefix is not boolean', () =>
	{
		// @ts-ignore
		expect(() => t.getRandomWordWithPrefix(123)).toThrowError();
	});
});
