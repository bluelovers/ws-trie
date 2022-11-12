import { Trie } from './trie';
import { IAhoCorasickResult, IAhoCorasickCallback } from './types';

export { Trie };

export class AhoCorasick<T = any>
{
	trie: Trie<T> = new Trie();

	add(word: string, data?: T)
	{
		return this.trie.add(word, data);
	}

	build_fail(node?: Trie<T>)
	{
		let _k, fail_node, i, j, ref, ref1, sub_node;
		node = node || this.trie;
		node.fail = null;
		if (node.value)
		{
			for (i = j = 1, ref = node.value.length; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j)
			{
				fail_node = this.trie.explore_fail_link(node.value.substring(i));
				if (fail_node)
				{
					node.fail = fail_node;
					break;
				}
			}
		}
		ref1 = node.next;
		for (_k in ref1)
		{
			sub_node = ref1[_k];
			this.build_fail(sub_node);
		}
		return this;
	}

	foreach_match(node: Trie<T>, pos: number, callback: IAhoCorasickCallback<T>)
	{
		let offset: number;
		while (node)
		{
			if (node.is_word)
			{
				offset = pos - node.value.length;
				callback(node.value, node.data, offset, node);
			}
			node = node.fail;
		}
		return this;
	}

	search(string: string, callback?: IAhoCorasickCallback<T>): IAhoCorasickResult<T>;
	search<R = IAhoCorasickResult<T>>(string: string, callback?: IAhoCorasickCallback<T>): R;
	search(string: string, callback?: IAhoCorasickCallback<T>)
	{
		/**
		 * 參考 aca 回傳的資料結構
		 * @see https://www.npmjs.com/package/aca
		 */
		const result: IAhoCorasickResult<T> = {
			matches: {},
			positions: {},
			count: {},
			data: {},
		};

		let callbackResult: IAhoCorasickCallback<T>;

		if (callback)
		{
			callbackResult = function (...argv)
			{
				const [value, data, offset, node] = argv;

				result.matches[value] = result.matches[value] || [];

				result.matches[value].push(offset);

				result.positions[offset] = result.positions[offset] || [];
				result.positions[offset].push(value);

				if (result.count[value] == null)
				{
					result.count[value] = 0;
				}

				result.count[value]++;

				result.data[value] = node.data;

				// @ts-ignore
				callback.call(result, ...argv);
			};
		}
		else
		{
			callbackResult = function (...argv)
			{
				const [value, data, offset, node] = argv;

				result.matches[value] = result.matches[value] || [];

				result.matches[value].push(offset);

				result.positions[offset] = result.positions[offset] || [];
				result.positions[offset].push(value);

				if (result.count[value] == null)
				{
					result.count[value] = 0;
				}

				result.count[value]++;

				result.data[value] = node.data;
			};
		}

		let chr, current, idx, j, ref;
		current = this.trie;
		for (idx = j = 0, ref = string.length; 0 <= ref ? j < ref : j > ref; idx = 0 <= ref ? ++j : --j)
		{
			chr = string.charAt(idx);
			while (current && !current.next[chr])
			{
				current = current.fail;
			}
			if (!current)
			{
				current = this.trie;
			}
			if (current.next[chr])
			{
				current = current.next[chr];

				this.foreach_match(current, idx + 1, callbackResult);
			}
		}

		// @ts-ignore
		return result;
	}

	to_dot(): string
	{
		let dot, fail_cb, last_chr, link_cb, v_;
		dot = ['digraph Trie {'];
		v_ = function (node)
		{
			if (node && node.value)
			{
				return `"${node.value}"`;
			}

				return "\"\"";

		};
		last_chr = function (str)
		{
			if (str)
			{
				return str.charAt(str.length - 1);
			}
		};
		link_cb = function (from, to)
		{
			let k, option, to_label, to_opt, v;
			to_label = last_chr(to.value);
			to_opt = [`label = "${to_label}"`];
			if (to.is_word)
			{
				option = {
					style: 'filled',
					color: 'skyblue'
				};
				for (k in option)
				{
					v = option[k];
					to_opt.push(`${k} = "${v}"`);
				}
			}
			dot.push(`${v_(from)} -> ${v_(to)};`);
			dot.push(`${v_(to)} [ ${to_opt.join(',')} ];`);
			return fail_cb(from, to);
		};
		fail_cb = function (from, to)
		{
			let style;
			[from, to] = [to, to.fail];
			style = to ? 'dashed' : 'dotted';
			return dot.push(`${v_(from)} -> ${v_(to)} [ style = "${style}" ];`);
		};
		this.trie.each_node(link_cb);
		dot.push('}');
		return dot.join("\n");
	}
}

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(AhoCorasick, "__esModule", { value: true });

	Object.defineProperty(AhoCorasick, 'AhoCorasick', { value: AhoCorasick });
	Object.defineProperty(AhoCorasick, 'default', { value: AhoCorasick });

	Object.defineProperty(AhoCorasick, 'Trie', { value: Trie });
}

export default AhoCorasick;
