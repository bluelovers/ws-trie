/**
 * Created by user on 2019/1/21/021.
 */

import trie from 'trie-prefix-tree2'

/**
 * 原文範例
 */
let text = `
Yahoo!ゲームプレイヤーでのゲームの遊び方、問い合わせ先について

Yahoo!ゲーム プレイヤーでのゲームの内容や遊び方については、以下の各ゲームの公式サイト（外部サイト）をご確認ください。
不明な点がある場合は、公式サイトにある問い合わせ先からご連絡ください。
`;

let i18nmap = {};

/**
 * 不需要在意先後順序
 */
i18nmap['ゲーム'] = '遊戲';
i18nmap['プレイヤー'] = '玩家';
i18nmap['ゲームプレイヤー'] = '遊戲玩家';

/**
 * 建立 trie
 */
let myTrie = trie([]);

/*
myTrie.addWord('ゲーム');
myTrie.addWord('プレイヤー');
myTrie.addWord('ゲームプレイヤー');
*/
Object.keys(i18nmap).forEach(k => myTrie.addWord(k));

let r = myTrie.toRegExp('iug');

let ret = text.replace(r, function (s)
{
	/**
	 * 如果包含英文大小寫則需要額外再做其他處理
	 */

	/**
	 * 檢查是否在轉換表內
	 *
	 * 當轉換表不包含英文時(因為不用擔心大小寫問題 所以這裏就絕對都是轉換表內的文字)
	 * 此步驟可以省略變成直接回傳 `return i18nmap[s]`
	 */
	if (s in i18nmap)
	{
		return i18nmap[s]
	}

	return s;
});

console.dir({
	r,
}, {
	colors: true,
});

console.log(ret);
