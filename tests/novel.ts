/**
 * Created by user on 2018/7/4/004.
 */

import AhoCorasick from 'aho-corasick2';

let ac = new AhoCorasick();

/**
 * 第一個字 為原文 第二個字為註解
 */
let list = [
	['サムライ', '武士'],
	['マスター', '大師'],
	['クノイチ', '女忍者'],
	['キング', '王'],
	['ダンピール', '丹皮尔'],
	['ポイズン', '劇毒'],
	['ウェンディゴ', '威尔迪哥'],
	['エンプーサ', '安普莎'],
	['クリスタル', '水晶'],
	['アラクネ', '阿剌克涅'],
	['ゴブリン', '哥布林'],
	['ハイ', '高等'],
	['コボルト', '狗头人'],
	['スキュラ', '斯庫拉'],
	['オリジン', '起源'],
	['ドルイド', '德魯伊'],
	['ラストローズ', '淫欲罗茲 最後的玫瑰'],
	['ローズ', '薔薇 玫瑰'],
	['ラスト', 'Lust 性欲 渇望 Last 最後'],
];

list.forEach(function (word: any)
{
	let key;
	let data;

	if (typeof word === 'string')
	{
		key = word;
		data = {
			word,
		};
	}
	else if (word.word)
	{
		key = word.key || word.word;
		data = word;
	}
	else if (Array.isArray(word))
	{
		key = word[0];
		data = {
			word: word[0],
			input: word.slice(1),
		};
	}
	else
	{
		throw new TypeError();
	}

	ac.add(key, data);
});

ac.build_fail();

search('スキュラオリジンハイドルイド');
search('クリスタルエンプーサ');
search('ラストローズ');

function search(input: string)
{
	let actual = ac.search(input);

	let ret = {
		input,
		actual,
	};

	console.dir(ret, {
		depth: null,
		colors: true,
	});

	return ret;
}
