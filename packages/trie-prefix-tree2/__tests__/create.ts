import { END_VALUE, END_WORD } from '../src/config';
import create from '../src/create';
import trie from '../src';

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
		const data = trie(input).tree();
		const expected = {
			d: {
				o: {
					g: {
						[END_WORD]: END_VALUE
					}
				}
			}
		};

		//expect(data).to.deep.equal(expected);
		expect(data)
			.to.have.nested.property('d.o.g')
			.to.have.property(END_WORD)
		;
	});

	it('returns a Trie object structure', () =>
	{
		const input = ['Dog'];
		const data = create(input);
		const expected = {
			D: {
				o: {
					g: {
						[END_WORD]: END_VALUE
					}
				}
			}
		};

		//expect(data).to.deep.equal(expected);
		expect(data)
			.to.have.nested.property('D.o.g')
			.to.have.property(END_WORD)
		;
	});
});
