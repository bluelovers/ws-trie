import { create, ITrie, ITrieNode, ITrieNodeValue, ITrieRaw, isEndpoint, hasEndpoint } from './create';
import { append } from './append';
import { checkPrefix } from './checkPrefix';
import { recursePrefix } from './recursePrefix';
import { isString, split, stringify, throwMsg } from '@lazy-trie/util';
import { END_DEF, END_VALUE, PERMS_MIN_LEN } from './config';
import { END_WORD } from '@lazy-trie/types';
import { permutations } from './permutations';
import { recurseRandomWord } from './recurseRandomWord';
import { IOptions, IOptionsAll, trieToRegExp } from 'trie-regex';

export { ITrieRaw, ITrieNode, ITrie, ITrieNodeValue, isEndpoint, hasEndpoint };

export { END_VALUE, END_WORD, END_DEF };

export const SYM_RAW = Symbol('trie');

export type IInput<T> = string[];
export type IInputMap<T> = [string, T][];

export type ITrieOptions = {
	/**
	 * @default true
	 */
	ignoreCase?: boolean,
	mapMode?: boolean,
};

export class Trie<T = typeof END_VALUE>
{
	[SYM_RAW]: ITrieRaw<T>;
	options?: Readonly<ITrieOptions>;

	constructor(input: IInputMap<T>, options?: ITrieOptions & {
		mapMode: true,
	}, ...argv: any[]);
	constructor(input: IInput<T>, options?: ITrieOptions, ...argv: any[]);
	constructor(input: IInput<T> | IInputMap<T>, options?: ITrieOptions, ...argv: any[])
	{
		if (!Array.isArray(input))
		{
			throw throwMsg('parameter Array', typeof input);
		}

		this.options = Object.freeze({
			ignoreCase: true,
			...this.options,
		});

		if (this.options.mapMode)
		{
			this[SYM_RAW] = create<T>([], ...argv);

			(input as IInputMap<T>).forEach((row) =>
			{
				const [key, value] = row;

				this.addWord(key, value);
			});
		}
		else
		{
			this[SYM_RAW] = create<T>([] as IInput<T>, ...argv);

			(input as IInput<T>).forEach((key) =>
			{
				this.addWord(key);
			});
		}
	}

	/**
	 * Get the generated raw trie object
	 */
	tree()
	{
		return this[SYM_RAW];
	}

	/**
	 * Get a string representation of the trie
	 */
	load(obj: ITrieRaw<T>): this;
	load<R>(obj: ITrieRaw<R>): this;
	load(obj: unknown): this;
	load(obj: any)
	{
		this[SYM_RAW] = obj;

		return this;
	}

	/**
	 * Get a string representation of the trie
	 */
	dump(spacer: string | number = 0)
	{
		return stringify(this[SYM_RAW], spacer);
	}

	/**
	 * Add a new word to the trie
	 */
	addWord(word: string, value: T = null)
	{
		isString(word, 'word is string');

		const reducer = (...params: any[]) =>
		{
			// @ts-ignore
			return append(...params);
		};

		const key = this._key(word);

		const input = split(key);
		const node = input.reduce(reducer, this[SYM_RAW]);

		// @ts-ignore
		node[END_WORD] = node[END_WORD] || {};
		node[END_WORD][word] = value;
		node[END_WORD][END_DEF] = word;

		return this;
	}

	protected _key(word: string)
	{
		return this.options.ignoreCase ? word.toLowerCase() : word;
	}

	/**
	 * Remove an existing word from the trie
	 */
	removeWord(word: string, all?: boolean)
	{
		isString(word, 'word is string');

		const { prefixFound, prefixNode } = this._checkPrefix(word);

		if (prefixFound)
		{
			const node = prefixNode[END_WORD];

			/**
			 * 更改了 removeWord 行為
			 * 會先刪除與 word 符合的 key 值
			 * 如果沒有則刪除 預設值
			 * 基本上這個狀況只會發生在 ignoreCase = true 時
			 * 不論如何每次執行都必定刪除一個 key
			 */
			if (!all && Object.keys(node).length > 1)
			{
				let bool: boolean;

				if (word in node)
				{
					delete node[word];
				}
				else if (node[END_DEF] in node)
				{
					delete node[node[END_DEF]];
					bool = true;
				}

				if (bool || word === node[END_DEF])
				{
					node[END_DEF] = Object.keys(node)[0];
				}
			}
			else
			{
				delete prefixNode[END_WORD];
			}
		}

		return this;
	}

	protected _checkPrefix(prefix: string)
	{
		const key = this._key(prefix);
		return checkPrefix(this[SYM_RAW], key);
	}

	/**
	 * Check a prefix is valid
	 * @returns Boolean
	 */
	isPrefix(prefix: string): prefix is string
	{
		isString(prefix, 'prefix is string');

		const { prefixFound } = this._checkPrefix(prefix);

		return prefixFound;
	}

	/**
	 * Get a list of all words in the trie with the given prefix
	 * @returns Array
	 */
	getPrefix(strPrefix: string, sorted = true)
	{
		isString(strPrefix, 'prefix is string');

		if (typeof sorted !== 'boolean')
		{
			throw throwMsg('sort parameter as boolean', typeof sorted);
		}

		if (!this.isPrefix(strPrefix))
		{
			return [];
		}

		const { prefixNode } = this._checkPrefix(strPrefix);

		return recursePrefix(prefixNode, strPrefix, sorted);
	}

	/**
	 * Get a random word in the trie with the given prefix
	 * @returns String
	 */
	getRandomWordWithPrefix(strPrefix?: string): string;
	getRandomWordWithPrefix(...argv: any[]): string
	{
		let strPrefix: string;

		if (argv.length)
		{
			strPrefix = argv[0];

			if (!this.isPrefix(strPrefix))
			{
				return '';
			}
		}
		else
		{
			strPrefix = '';
		}

		const { prefixNode } = this._checkPrefix(strPrefix);

		return recurseRandomWord(prefixNode, strPrefix);
	}

	/**
	 * Count the number of words with the given prefixSearch
	 * @returns Number
	 */
	countPrefix(strPrefix: string)
	{
		const prefixes = this.getPrefix(strPrefix);

		return prefixes.length;
	}

	/**
	 * Get all words in the trie
	 * @returns Array
	 */
	getWordsAll(sorted = true)
	{
		if (typeof sorted !== 'boolean')
		{
			throw throwMsg('sort parameter as boolean', typeof sorted);
		}
		return recursePrefix<T>(this[SYM_RAW], '', sorted);
	}

	/**
	 * Check the existence of a word in the trie
	 * @returns Boolean
	 */
	hasWord(word: string)
	{
		if (typeof word !== 'string')
		{
			throw throwMsg('string word', typeof word);
		}

		if (word !== '')
		{
			const { prefixFound, prefixNode } = this._checkPrefix(word);

			if (prefixFound)
			{
				// @ts-ignore
				//return prefixNode[config.END_WORD] === config.END_VALUE;
				return hasEndpoint(prefixNode);
			}
		}

		return false;
	}

	/**
	 *
	 * @example
	 * tree.getWordData('object.entries')
	 * // => { key: 'Object.entries', value: null, matched: false }
	 * tree.getWordData('Object.entries')
	 * // { key: 'Object.entries', value: null, matched: true }
	 */
	getWordData(word: string, notChkDefault?: boolean): {
		key: string,
		value: T,
		matched: boolean,
	};
	getWordData<R>(word: string, notChkDefault?: boolean): {
		key: string,
		value: R,
		matched: boolean,
	};
	getWordData(word: string, notChkDefault?: boolean)
	{
		const node = this.getWordNode(word);

		if (node)
		{
			if (word in node)
			{
				return {
					key: word,
					value: node[word],
					matched: true as const,
				};
			}
			else if (!notChkDefault && END_DEF in node)
			{
				let k: string = node[END_DEF];

				if (!(k in node))
				{
					k = Object.keys(node)[0];
				}

				if (k in node)
				{
					return {
						key: k,
						value: node[k],
						matched: k === word,
					};
				}
			}
		}

		return null;
	}

	/**
	 * @example
	 * tree.getWordNode('Object.entries')
	 * // => { 'Object.entries': null, [Symbol(default)]: 'Object.entries' }
	 */
	getWordNode(word: string): ITrieNodeValue<T>;
	getWordNode<R>(word: string): ITrieNodeValue<R>;
	getWordNode(word: string): ITrieNodeValue<T>
	{
		if (typeof word !== 'string')
		{
			throw throwMsg('string word', typeof word);
		}

		if (word !== '')
		{
			const { prefixFound, prefixNode } = this._checkPrefix(word);

			if (hasEndpoint(prefixNode))
			{
				return prefixNode[END_WORD];
			}
		}

		return null;
	}

	/**
	 * @example
	 * tree.getWordNodeKeys('Object.entries')
	 * // => [ 'Object.entries' ]
	 */
	getWordNodeKeys(word: string): string[]
	{
		const node = this.getWordNode(word);

		if (node)
		{
			return Object.keys(node);
		}

		return null;
	}

	protected isAnagrams(letters: string): letters is string
	{
		if (typeof letters !== 'string')
		{
			throw throwMsg('string letters', typeof letters);
		}

		if (letters.length < PERMS_MIN_LEN)
		{
			throw throwMsg(`at least ${PERMS_MIN_LEN} letters`, letters.length);
		}

		// @ts-ignore
		return letters;
	}

	/**
	 * Get a list of valid anagrams that can be made from the given letters
	 * @returns Array
	 */
	getAnagrams(letters: string)
	{
		this.isAnagrams(letters);

		return permutations(letters, this[SYM_RAW], {
			type: 'anagram',
		});
	}

	/**
	 * Get a list of all sub-anagrams that can be made from the given letters
	 * @returns Array
	 */
	getSubAnagrams(letters: string)
	{
		this.isAnagrams(letters);

		return permutations(letters, this[SYM_RAW], {
			type: 'sub-anagram',
		});
	}

	toRegExp<R = RegExp>(flags?: string, options?: IOptions): R;
	toRegExp<R>(flags?: string, options?: IOptionsAll<R>): ReturnType<typeof trieToRegExp>;
	toRegExp<R>(flags?, options?)
	{
		if (!flags || !isString(flags))
		{
			flags = 'u';

			if (this.options.ignoreCase)
			{
				flags += 'i';
			}
		}

		options = Object.assign({
			disableEscaped: true,
			isEndpoint,

			jsescOptions: {
				'es6': true,
				'minimal': false,
			},

		}, options);

		return trieToRegExp<R>(this.tree(), flags, options);
	}

}

export function createTrie<T = typeof END_VALUE>(input: IInputMap<T>, options?: ITrieOptions & {
	mapMode: true,
}, ...argv): Trie<T>;
export function createTrie<T = typeof END_VALUE>(input: IInput<T>, options?: ITrieOptions, ...argv): Trie<T>;
export function createTrie<T = typeof END_VALUE>(...argv)
{
	// @ts-ignore
	return new Trie<T>(...argv);
}

Object.assign(createTrie, {
	prototype: Trie.prototype,
});

//createTrie.prototype = Trie.prototype;

export { createTrie as trie };

// @ts-ignore
if (process.env.TSDX_FORMAT !== 'esm')
{
	Object.defineProperty(createTrie, "__esModule", { value: true });

	Object.defineProperty(createTrie, 'createTrie', { value: createTrie });
	Object.defineProperty(createTrie, 'default', { value: createTrie });

	Object.defineProperty(createTrie, 'trie', { value: createTrie });
	Object.defineProperty(createTrie, 'Trie', { value: Trie });

	Object.defineProperty(createTrie, 'SYM_RAW', { value: SYM_RAW });

	Object.defineProperty(createTrie, 'END_VALUE', { value: END_VALUE });
	Object.defineProperty(createTrie, 'END_WORD', { value: END_WORD });
	Object.defineProperty(createTrie, 'END_DEF', { value: END_DEF });

	Object.defineProperty(createTrie, 'isEndpoint', { value: isEndpoint });
	Object.defineProperty(createTrie, 'hasEndpoint', { value: hasEndpoint });
}

export default createTrie;
