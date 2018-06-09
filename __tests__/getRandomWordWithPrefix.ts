import trie from '../src/index';

describe('Retrieving a random words in the trie', () =>
{
	const words = ['cat', 'catfish', 'dog'];
	const t = trie(words);

	it('picks words only with the prefix', () =>
	{
		for (let i = 0; i < 100; i++)
		{
			const word = t.getRandomWordWithPrefix('cat');

			expect(words).to.contain(word);
			expect(word).not.to.deep.equal('dog');
		}
	});

	it('can pick randomly in all of the words', () =>
	{
		const word = t.getRandomWordWithPrefix();

		expect(words).to.contain(word);
	});

	it('doesn\'t return words without the prefix', () =>
	{
		const word = t.getRandomWordWithPrefix('xyz');
		expect(word).to.deep.equal('');
	});

	it('errors when the prefix is not boolean', () =>
	{
		// @ts-ignore
		expect(() => t.getRandomWordWithPrefix(123)).to.throw();
	});
});
