import { END_VALUE, END_WORD } from '../src/config';
import trie from '../src/index';

describe('Adding a word to the trie', () =>
{
	const input = ['dog'];
	const actual = trie(input).addWord('cat');

	// @ts-ignore
	expect(() => trie(input).addWord()).to.throw();

	let data = actual.tree();

	expect(data)
		.to.have.nested.property('d.o.g')
		.to.have.property(END_WORD)
	;

	expect(data)
		.to.have.nested.property('c.a.t')
		.to.have.property(END_WORD)
	;
});
