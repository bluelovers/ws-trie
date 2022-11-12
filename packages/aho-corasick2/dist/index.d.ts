export declare class Trie<T = any> {
	next: {
		[k: string]: Trie<T>;
	};
	is_word: boolean;
	value: string;
	data: T[];
	fail?: Trie<T>;
	add(word: string, data?: T, original_word?: string): boolean;
	explore_fail_link(word: string): Trie<T>;
	each_node(callback: (trie: this, node: Trie<T>) => void): this;
}
export type IAhoCorasickCallback<T> = (value: string, data: T[], offset: number, node: Trie<T>) => void;
export type IAhoCorasickResult<T = any> = {
	/**
	 * keyword: position[]
	 */
	matches: {
		[k: string]: number[];
	};
	/**
	 * position: keyword[]
	 */
	positions: {
		[k: number]: string[];
	};
	/**
	 * keyword: count
	 */
	count: {
		[k: string]: number;
	};
	/**
	 * keyword: data
	 */
	data: {
		[k: string]: T[];
	};
};
export declare class AhoCorasick<T = any> {
	trie: Trie<T>;
	add(word: string, data?: T): boolean;
	build_fail(node?: Trie<T>): this;
	foreach_match(node: Trie<T>, pos: number, callback: IAhoCorasickCallback<T>): this;
	search(string: string, callback?: IAhoCorasickCallback<T>): IAhoCorasickResult<T>;
	search<R = IAhoCorasickResult<T>>(string: string, callback?: IAhoCorasickCallback<T>): R;
	to_dot(): string;
}

export {
	AhoCorasick as default,
};

export {};
