import { END_VALUE, END_WORD } from '../lib/config';
import create from '../lib/create';
import trie from '../lib';

describe('Creating the Trie', () =>
{
	test('throws when the first argument is not an array', () =>
	{
		const input = '';
		const expected = `Expected parameter Array, received ${typeof input}`;

		try
		{
			// @ts-ignore
			create(input);
		}
		catch (error)
		{
			expect(error).toEqual(expected);
		}
	});

	test('returns a Trie object structure converted to lowercase', () =>
	{
		const input = ['Dog'];
		const data = trie(input).tree();
		const expected = {
			d: {
				o: {
					g: {
						[END_WORD]: END_VALUE,
					},
				},
			},
		};

		//expect(data).to.deep.equal(expected);
		expect(data)
			.toHaveProperty(`d.o.g.${END_WORD}`)
		;
	});

	test('returns a Trie object structure', () =>
	{
		const input = ['Dog'];
		const data = create(input);
		const expected = {
			D: {
				o: {
					g: {
						[END_WORD]: END_VALUE,
					},
				},
			},
		};

		//expect(data).to.deep.equal(expected);
		expect(data)
			.toHaveProperty(`D.o.g.${END_WORD}`)
		;
	});
});
