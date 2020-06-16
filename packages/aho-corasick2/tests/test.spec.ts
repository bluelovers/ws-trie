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
	it(`Test simple`, function ()
	{
		let ac, j, len, ref, word;
		ac = new AhoCorasick();
		ref = ['ab', 'bcr', 'caa'];
		for (j = 0, len = ref.length; j < len; j++)
		{
			word = ref[j];
			ac.add(word, {
				word: word
			});
		}
		ac.build_fail();

		ac.search('foab', function (found_word, data, offset)
		{

			let expected = 'ab';

			expect(found_word).to.deep.equal(expected);
			expect(data[0].word).to.deep.equal(expected);

			expect(offset).to.deep.equal(2);
		});

		ac.search('bcaa', function (found_word, data, offset)
		{

			let expected = 'caa';

			expect(found_word).to.deep.equal(expected);
			expect(data[0].word).to.deep.equal(expected);

			expect(offset).to.deep.equal(1);
		});
	});

	it(`Picks out multiple words`, function ()
	{

		let ac, content, find_list, j, len, ref, word;
		ac = new AhoCorasick();
		ref = ['little bit of', 'receivings', 'ivi', 'boot', 'here'];
		for (j = 0, len = ref.length; j < len; j++) {
			word = ref[j];
			ac.add(word);
		}
		ac.build_fail();
		find_list = ['here', 'little bit of', 'ivi', 'boot'];
		content = 'here is a little bit of text that more closely resembles the kind of style that this library will be receiving. maybe with another sentance one to boot';

		let r = ac.search(content, function(found_word, data, offset) {

			let actual = content.substr(offset, found_word.length);

			expect(actual).to.deep.equal(found_word);
		});

		expect(find_list.length).to.ok;
		expect(Object.keys(r.count)).to.deep.equal(find_list)

		console.log(r);
	});

	it(`Match every`, function ()
	{

		let ac, i, j, len, match_word, ref, word;
		ac = new AhoCorasick();
		ref = ['foo', 'foo bar'];
		for (j = 0, len = ref.length; j < len; j++) {
			word = ref[j];
			ac.add(word);
		}
		ac.build_fail();
		ac.search('foo', function(found_word, data, offset) {

			expect(found_word).to.deep.equal('foo');

			expect(offset).to.deep.equal(0);

		});
		i = 0;
		match_word = ['foo', 'foo bar'];
		let r = ac.search('foo bar', function(found_word, data, offset) {

			expect(found_word).to.deep.equal(match_word[i++]);

			expect(offset).to.deep.equal(0);
		});

	});

	it(`Multiple matches`, function ()
	{

		let ac, actual, expected, j, len, ref, word;
		ac = new AhoCorasick();
		ref = ['say', 'she', 'shr', 'he', 'her'];
		for (j = 0, len = ref.length; j < len; j++) {
			word = ref[j];
			ac.add(word, {
				word: word
			});
		}
		ac.build_fail();
		expected = {
			she: 1,
			he: 1,
			her: 1
		};
		actual = {};
		let r = ac.search('yasherhs', function(found_word) {
			if (actual[found_word] == null) {
				actual[found_word] = 0;
			}
			return actual[found_word]++;
		});

		expect(actual).to.deep.equal(expected);

		console.log(r);

	});

	it(`Allow attaching multiple bits of data`, function ()
	{

		let ac;
		ac = new AhoCorasick();
		ac.add('foo', 'data1');
		ac.add('foo', 'data2');

		ac.build_fail();

		let r = ac.search('foo', function(found_word, data) {

			expect(data[0]).to.deep.equal('data1');
			expect(data[1]).to.deep.equal('data2');

		});

		expect(r.count['foo']).to.deep.equal(1);

		expect(r.data['foo']).to.deep.equal(['data1', 'data2']);

		console.log(r);

	});

});
