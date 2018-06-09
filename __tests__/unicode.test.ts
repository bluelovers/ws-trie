/**
 * Created by user on 2018/6/9/009.
 */

/// <reference types="mocha" />
/// <reference types="chai" />
/// <reference types="node" />

import { END_WORD } from '../src/config';
import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';

// @ts-ignore
import { ITest } from 'mocha';

import trie from '../src/index';

// @ts-ignore
describe(relative(__filename), () =>
{
	let currentTest: ITest;

	beforeEach(function ()
	{
		currentTest = this.currentTest as ITest;

		//console.log('it:before', currentTest.title);
		//console.log('it:before', currentTest.fullTitle());
	});

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
			it(expected, function ()
			{
				expect(actual.tree())
					.to.have.nested.property(expected)
					.to.have.property(END_WORD)
				;
			});
		});
	});
});
