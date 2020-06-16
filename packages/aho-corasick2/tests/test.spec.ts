/**
 * Created by user on 2018/7/3/003.
 */

import AhoCorasick from '..';

// @ts-ignore
it(`Test simple`, () =>
{
	let ac, j, len, ref, word;
	ac = new AhoCorasick();
	ref = ['ab', 'bcr', 'caa'];
	for (j = 0, len = ref.length; j < len; j++)
	{
		word = ref[j];
		ac.add(word, {
			word: word,
		});
	}
	ac.build_fail();

	expect(ac).toMatchSnapshot();

	let r;

	r = ac.search('foab', function (found_word, data, offset)
	{

		let expected = 'ab';

		expect(found_word).toEqual(expected);
		expect(data[0].word).toEqual(expected);

		expect(offset).toEqual(2);
	});

	expect(r).toMatchSnapshot();

	r = ac.search('bcaa', function (found_word, data, offset)
	{

		let expected = 'caa';

		expect(found_word).toEqual(expected);
		expect(data[0].word).toEqual(expected);

		expect(offset).toEqual(1);
	});

	expect(r).toMatchSnapshot();
});

it(`Picks out multiple words`, () =>
{

	let ac, content, find_list, j, len, ref, word;
	ac = new AhoCorasick();
	ref = ['little bit of', 'receivings', 'ivi', 'boot', 'here'];
	for (j = 0, len = ref.length; j < len; j++)
	{
		word = ref[j];
		ac.add(word);
	}
	ac.build_fail();

	expect(ac).toMatchSnapshot();

	find_list = ['here', 'little bit of', 'ivi', 'boot'];
	content = 'here is a little bit of text that more closely resembles the kind of style that this library will be receiving. maybe with another sentance one to boot';

	let r = ac.search(content, function (found_word, data, offset)
	{

		let actual = content.substr(offset, found_word.length);

		expect(actual).toEqual(found_word);
	});

	expect(find_list.length).toBeTruthy();
	expect(Object.keys(r.count)).toEqual(find_list)

	expect(r).toMatchSnapshot();

	console.log(r);
});

it(`Match every`, () =>
{

	let ac, i, j, len, match_word, ref, word;
	ac = new AhoCorasick();
	ref = ['foo', 'foo bar'];
	for (j = 0, len = ref.length; j < len; j++)
	{
		word = ref[j];
		ac.add(word);
	}
	ac.build_fail();

	expect(ac).toMatchSnapshot();

	let r = ac.search('foo', function (found_word, data, offset)
	{

		expect(found_word).toEqual('foo');

		expect(offset).toEqual(0);

	});

	expect(r).toMatchSnapshot();

	i = 0;
	match_word = ['foo', 'foo bar'];
	r = ac.search('foo bar', function (found_word, data, offset)
	{

		expect(found_word).toEqual(match_word[i++]);

		expect(offset).toEqual(0);
	});

	expect(r).toMatchSnapshot();

});

it(`Multiple matches`, () =>
{

	let ac, actual, expected, j, len, ref, word;
	ac = new AhoCorasick();
	ref = ['say', 'she', 'shr', 'he', 'her'];
	for (j = 0, len = ref.length; j < len; j++)
	{
		word = ref[j];
		ac.add(word, {
			word: word,
		});
	}
	ac.build_fail();

	expect(ac).toMatchSnapshot();

	expected = {
		she: 1,
		he: 1,
		her: 1,
	};
	actual = {};
	let r = ac.search('yasherhs', function (found_word)
	{
		if (actual[found_word] == null)
		{
			actual[found_word] = 0;
		}
		return actual[found_word]++;
	});

	expect(actual).toEqual(expected);

	expect(r).toMatchSnapshot();

	console.log(r);

});

it(`Allow attaching multiple bits of data`, () =>
{

	let ac;
	ac = new AhoCorasick();
	ac.add('foo', 'data1');
	ac.add('foo', 'data2');

	ac.build_fail();

	let r = ac.search('foo', function (found_word, data)
	{

		expect(data[0]).toEqual('data1');
		expect(data[1]).toEqual('data2');

	});

	expect(r.count['foo']).toEqual(1);

	expect(r.data['foo']).toEqual(['data1', 'data2']);

	expect(ac).toMatchSnapshot();
	expect(r).toMatchSnapshot();

	console.log(r);

});

