export class Trie<T = any>
{
	next: {
		[k: string]: Trie<T>
	} = {};
	is_word: boolean = null;
	value: string = null;
	data: T[] = [];

	//fail?: Trie = null;

	add(word: string, data?: T, original_word?: string): boolean
	{
		let chr: string, node: Trie;
		chr = word.charAt(0);
		node = this.next[chr];
		if (!node)
		{
			node = this.next[chr] = new Trie();
			if (original_word)
			{
				node.value = original_word.substr(0, original_word.length - word.length + 1);
			}
			else
			{
				node.value = chr;
			}
		}
		if (word.length > 1)
		{
			return node.add(word.substring(1), data, original_word || word);
		}
		else
		{
			node.data.push(data);
			return node.is_word = true;
		}
	}

	explore_fail_link(word: string)
	{
		let chr, i, node: Trie<T>, _i, _ref;
		node = this;
		for (i = _i = 0, _ref = word.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i)
		{
			chr = word.charAt(i);
			node = node.next[chr];
			if (!node)
			{
				return null;
			}
		}
		return node;
	}

	each_node(callback: (trie: this, node: Trie<T>) => void)
	{
		let node, _k, _ref, _ref1;
		_ref = this.next;
		for (_k in _ref)
		{
			node = _ref[_k];
			callback(this, node);
		}
		_ref1 = this.next;
		for (_k in _ref1)
		{
			node = _ref1[_k];
			node.each_node(callback);
		}
		return this;
	}
}

export default Trie
