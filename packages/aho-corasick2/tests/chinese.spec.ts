/**
 * Created by user on 2018/7/3/003.
 */

import { AhoCorasick } from '..';

it(`Picks out chinese words`, () =>
{
	let content, find_list, i, len, ref, word;

	let ac = new AhoCorasick();

	ref = ['五毛党', '国家', '黑手党', '党国', '毛五贴'];

	for (i = 0, len = ref.length; i < len; i++)
	{
		word = ref[i];
		ac.add(word);
	}

	expect(ac).toMatchSnapshot();

	ac.build_fail();

	expect(ac).toMatchSnapshot();

	find_list = ['毛五贴', '五毛党', '党国', '国家'];
	content = '宋国毛五贴五毛党国家是谁啊';

	let r = ac.search(content, function (found_word, data, offset)
	{
		expect(content.substr(offset, found_word.length)).toEqual(found_word)
	});

	expect(find_list.length).toBeTruthy();
	expect(Object.keys(r.count)).toEqual(find_list)

	expect(r).toMatchSnapshot();

	console.log(r);
});

