import { END_VALUE, END_WORD } from '../lib/config';
import trie from '../lib';

it('Adding a word to the trie', () =>
{
	const input = ['dog'];
	const actual = trie(input).addWord('cat');

	// @ts-ignore
	expect(() => trie(input).addWord()).toThrowError();

	let data = actual.tree();

	expect(data)
		.toHaveProperty(`d.o.g.${END_WORD}`)
	;

	expect(data)
		.toHaveProperty(`c.a.t.${END_WORD}`)
	;
});
