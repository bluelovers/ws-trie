import { END_VALUE, END_WORD } from '../src/config';
import trie from '../src/index';

it('Removing a word from the trie', () =>
{
	const input = ['dog', 'dogs', 'plane', 'planet'];
	const actual = trie(input);
	const expected = JSON.stringify({
		d: {
			o: {
				g: {
					[END_WORD]: END_VALUE,
					s: {
						[END_WORD]: END_VALUE
					}
				}
			}
		},
		p: {
			l: {
				a: {
					n: {
						e: {
							t: {
								[END_WORD]: END_VALUE
							}
						}
					}
				}
			}
		}
	});

	expect(() => trie(input).removeWord()).to.throw();
	expect(actual.removeWord('plane').dump()).to.deep.equal(expected);
	expect(actual.removeWord('nonword').dump()).to.deep.equal(actual.dump());
});
