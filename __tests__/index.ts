import { END_VALUE, END_WORD } from '../src/config';
import trie from '../src/index';

describe('Trie', () =>
{
	it('throws an error when the first argument specified is not an array', () =>
	{
		const input = 'string';
		const expected = `Expected parameter Array, received ${typeof input}`;

		try
		{
			trie(input);
		}
		catch (error)
		{
			expect(error).to.equal(expected);
		}
	});

	it('return methods', () =>
	{
		const data = trie(['dog', 'cat']);

		expect(data).to.have.property('dump');
		expect(data).to.have.property('addWord');
		expect(data).to.have.property('removeWord');
		expect(data).to.have.property('isPrefix');
		expect(data).to.have.property('countPrefix');
		expect(data).to.have.property('getPrefix');
		expect(data).to.have.property('getWords');
		expect(data).to.have.property('hasWord');
		expect(data).to.have.property('getAnagrams');
		expect(data).to.have.property('getSubAnagrams');
	});
});

describe('Retrieving the Trie', () =>
{
	it('returns a string representation of the trie object structure', () =>
	{
		const input = ['dog', 'dogs', 'donut'];
		const actual = trie(input).dump();
		const expected = JSON.stringify({
			d: {
				o: {
					g: {
						[END_WORD]: END_VALUE,
						s: {
							[END_WORD]: END_VALUE
						}
					},
					n: {
						u: {
							t: {
								[END_WORD]: END_VALUE
							}
						}
					}
				}
			}
		});

		expect(actual).to.equal(expected);
	});
});

describe('Retrieving the RAW Trie tree', () =>
{
	it('returns the raw trie object structure', () =>
	{
		const input = ['dog', 'dogs', 'donut'];
		const actual = JSON.stringify(trie(input).tree());
		const expected = JSON.stringify({
			d: {
				o: {
					g: {
						[END_WORD]: END_VALUE,
						s: {
							[END_WORD]: END_VALUE
						}
					},
					n: {
						u: {
							t: {
								[END_WORD]: END_VALUE
							}
						}
					}
				}
			}
		});

		expect(actual).to.equal(expected);
	});
});
