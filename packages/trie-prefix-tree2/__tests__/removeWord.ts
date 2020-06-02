import { END_VALUE, END_WORD } from '../src/config';
import trie from '../src/index';

describe('Removing a word from the trie', () =>
{
	const input = ['dog', 'dogs', 'plane', 'planet'];
	const actual = trie(input);

	// @ts-ignore
	expect(() => trie(input).removeWord()).to.throw();

	let data = actual.tree();

	it('check structure', () =>
	{
		input.forEach(v =>
		{
			let k = v.split('').join('.');

			expect(data)
				.to.have.nested.property(k)
				.to.have.property(END_WORD)
			;
		});
	});

	it(`remove 'plane'`, () =>
	{
		expect(data)
			.to.have.nested.property('p.l.a.n.e.t')
			.to.have.property(END_WORD)
		;

		actual.removeWord('plane');

		expect(data)
			.to.have.nested.property('p.l.a.n.e')
			.to.not.have.property(END_WORD)
		;

		expect(data)
			.to.have.nested.property('p.l.a.n.e.t')
			.to.have.property(END_WORD)
		;
	});

	it(`remove not exists 'nonword'`, () =>
	{
		expect(actual.removeWord('nonword').dump()).to.deep.equal(actual.dump());
	});

});
