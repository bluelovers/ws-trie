/**
 * Created by user on 2018/7/3/003.
 */

/// <reference types="mocha" />
/// <reference types="benchmark" />
/// <reference types="chai" />
/// <reference types="node" />

import { chai, relative, expect, path, assert, util, mochaAsync } from './_local-dev';

// @ts-ignore
import { ITest } from 'mocha';

import AhoCorasick from '..';

// @ts-ignore
describe(relative(__filename), () =>
{
	// @ts-ignore
	it(`Picks out chinese words`, function ()
	{
		let content, find_list, i, len, ref, word;

		let ac = new AhoCorasick();

		ref = ['五毛党', '国家', '黑手党', '党国', '毛五贴'];

		for (i = 0, len = ref.length; i < len; i++)
		{
			word = ref[i];
			ac.add(word);
		}
		ac.build_fail();

		find_list = ['毛五贴', '五毛党', '党国', '国家'];
		content = '宋国毛五贴五毛党国家是谁啊';

		let r = ac.search(content, function (found_word, data, offset)
		{
			expect(content.substr(offset, found_word.length))
				.to.deep.equal(found_word)
		});

		expect(find_list.length).to.ok;
		expect(Object.keys(r.count)).to.deep.equal(find_list)

		console.log(r);
	});
});
