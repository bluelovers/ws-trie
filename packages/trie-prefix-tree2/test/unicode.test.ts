/**
 * Created by user on 2018/6/9/009.
 */

import { END_WORD } from '@lazy-trie/types';

import trie from '../src';

let actual = trie([
	'𠬠典',
	'オリーブ',
]);
let expected = [
	'𠬠.典',
	'オ.リ.ー.ブ',
];

// @ts-ignore
describe(`unicode`, () =>
{
	expected.forEach(expected =>
	{
		test(expected, () =>
		{
			expect(actual.tree())
				.toHaveProperty(`${expected}.${END_WORD}`)
			;
		});
	});
});

