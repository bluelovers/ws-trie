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
			// @ts-ignore
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
		const actual = trie(input);

		let data = actual.tree();

		expect(data)
			.to.have.nested.property('d.o.g')
			.to.have.property(END_WORD)
		;

		expect(data)
			.to.have.nested.property('d.o.g.s')
			.to.have.property(END_WORD)
		;

		expect(data)
			.to.have.nested.property('d.o.n.u.t')
			.to.have.property(END_WORD)
		;

		expect(actual.dump()).to.be.a('string');

		expect(JSON.parse(actual.dump())).to.be.deep.equal(data);
	});
});

describe('Retrieving the RAW Trie tree', () =>
{
	it('returns the raw trie object structure', () =>
	{
		const input = ['dog', 'dogs', 'donut'];
		const actual = trie(input).tree();

		expect(actual)
			.to.have.nested.property('d.o.g')
			.to.have.property(END_WORD)
		;

		expect(actual)
			.to.have.nested.property('d.o.g.s')
			.to.have.property(END_WORD)
		;

		expect(actual)
			.to.have.nested.property('d.o.n.u.t')
			.to.have.property(END_WORD)
		;
	});
});
