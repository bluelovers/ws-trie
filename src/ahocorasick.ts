import Trie from './trie';

declare module './trie'
{
	export interface Trie<T>
	{
		fail?: Trie<T>
	}
}

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
			for (i = j = 1, ref = node.value.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j)
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
				callback(node.value, node.data, offset);
			}
			node = node.fail;
		}
		return this;
	}

	search(string: string, callback: IAhoCorasickCallback<T>)
	{
		let chr, current, idx, j, ref;
		current = this.trie;
		for (idx = j = 0, ref = string.length; (0 <= ref ? j < ref : j > ref); idx = 0 <= ref ? ++j : --j)
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
				if (callback)
				{
					this.foreach_match(current, idx + 1, callback);
				}
			}
		}
		return this;
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
			else
			{
				return "\"\"";
			}
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

export type IAhoCorasickCallback<T> = (value: string, data: T[], offset: number) => void

export namespace AhoCorasick
{
	// @ts-ignore
	export { IAhoCorasickCallback }

	// @ts-ignore
	export { AhoCorasick }
	// @ts-ignore
	export { Trie }
}

AhoCorasick.AhoCorasick = AhoCorasick;
AhoCorasick.Trie = Trie;

export default AhoCorasick
