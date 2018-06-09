import { END_VALUE, END_WORD } from '../src/config';
import trie from '../src/index';

describe('Adding a word to the trie', () =>
{
	const input = ['dog'];
	const actual = trie(input).addWord('cat');
	const expected = JSON.stringify({
		d: {
			o: {
				g: {
					[END_WORD]: END_VALUE
				}
			}
		},
		c: {
			a: {
				t: {
					[END_WORD]: END_VALUE
				}
			}
		}
	});

	// @ts-ignore
	expect(() => trie(input).addWord()).to.throw();
	expect(actual.dump()).to.equal(expected);
});
