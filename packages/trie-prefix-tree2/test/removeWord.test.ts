import { END_VALUE, END_WORD } from '../lib/config';
import trie from '../lib';

describe('Removing a word from the trie', () =>
{
	const input = ['dog', 'dogs', 'plane', 'planet'];
	const actual = trie(input);

	// @ts-ignore
	expect(() => trie(input).removeWord()).toThrowError();

	let data = actual.tree();

	test('check structure', () =>
	{
		input.forEach(v =>
		{
			let k = v.split('');

			expect(data)
				.toHaveProperty([...k, END_WORD])
			;
		});
	});

	test(`remove 'plane'`, () =>
	{
		expect(data)
			.toHaveProperty(`p.l.a.n.e.t.${END_WORD}`)
		;

		actual.removeWord('plane');

		expect(data)
			.toHaveProperty(`p.l.a.n.e`)
		;

		expect(data)
			.not.toHaveProperty(`p.l.a.n.e.${END_WORD}`)
		;

		expect(data)
			.toHaveProperty(`p.l.a.n.e.t.${END_WORD}`)
		;
	});

	test(`remove not exists 'nonword'`, () =>
	{
		expect(actual.removeWord('nonword').dump()).toEqual(actual.dump());
	});

});
