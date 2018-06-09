import { END_VALUE, END_WORD } from '../src/config';
import create from '../src/create';

describe('Creating the Trie', () =>
{
	it('throws when the first argument is not an array', () =>
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
			expect(error).to.deep.equal(expected);
		}
	});

	it('returns a Trie object structure converted to lowercase', () =>
	{
		const input = ['Dog'];
		const data = create(input);
		const expected = {
			d: {
				o: {
					g: {
						[END_WORD]: END_VALUE
					}
				}
			}
		};

		expect(data).to.deep.equal(expected);
	});
});
