import { END_VALUE, END_WORD } from '../lib/config';
import trie from '../lib';

describe('Trie', () =>
{
	test('throws an error when the first argument specified is not an array', () =>
	{
		const input = 'string';
		const expected = `Expected parameter Array, received ${typeof input}`;

		try
		{
			// @ts-ignore
			trie(input);
		}
		catch (error)
		{
			expect(error).toBe(expected);
		}
	});

	test('return methods', () =>
	{
		const data = trie(['dog', 'cat']);

		expect(data).toHaveProperty('dump');
		expect(data).toHaveProperty('addWord');
		expect(data).toHaveProperty('removeWord');
		expect(data).toHaveProperty('isPrefix');
		expect(data).toHaveProperty('countPrefix');
		expect(data).toHaveProperty('getPrefix');
		expect(data).toHaveProperty('getWordsAll');
		expect(data).toHaveProperty('hasWord');
		expect(data).toHaveProperty('getAnagrams');
		expect(data).toHaveProperty('getSubAnagrams');
	});
});

describe('Retrieving the Trie', () =>
{
	test('returns a string representation of the trie object structure', () =>
	{
		const input = ['dog', 'dogs', 'donut'];
		const actual = trie(input);

		let data = actual.tree();

		expect(data)
			.toHaveProperty(`d.o.g.${END_WORD}`)
		;

		expect(data)
			.toHaveProperty(`d.o.g.s.${END_WORD}`)
		;

		expect(data)
			.toHaveProperty(`d.o.n.u.t.${END_WORD}`)
		;

		expect(typeof actual.dump()).toBe('string');

		expect(JSON.parse(actual.dump())).toMatchObject(data);
	});
});

describe('Retrieving the RAW Trie tree', () =>
{
	test('returns the raw trie object structure', () =>
	{
		const input = ['dog', 'dogs', 'donut'];
		const actual = trie(input).tree();

		expect(actual)
			.toHaveProperty(`d.o.g.${END_WORD}`)
		;

		expect(actual)
			.toHaveProperty(`d.o.g.s.${END_WORD}`)
		;

		expect(actual)
			.toHaveProperty(`d.o.n.u.t.${END_WORD}`)
		;
	});
});
