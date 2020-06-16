import Trie from './trie';
import { IAhoCorasickResult, IAhoCorasickCallback, IAhoCorasickCallback as _IAhoCorasickCallback, IAhoCorasickResult as _IAhoCorasickResult } from './types';
export declare class AhoCorasick<T = any> {
    trie: Trie<T>;
    add(word: string, data?: T): boolean;
    build_fail(node?: Trie<T>): this;
    foreach_match(node: Trie<T>, pos: number, callback: IAhoCorasickCallback<T>): this;
    search(string: string, callback?: IAhoCorasickCallback<T>): IAhoCorasickResult<T>;
    search<R = IAhoCorasickResult<T>>(string: string, callback?: IAhoCorasickCallback<T>): R;
    to_dot(): string;
    static AhoCorasick: typeof AhoCorasick;
    static Trie: typeof Trie;
    static default: typeof AhoCorasick;
}
export declare namespace AhoCorasick {
    type IAhoCorasickCallback<T> = _IAhoCorasickCallback<T>;
    type IAhoCorasickResult<T = any> = _IAhoCorasickResult<T>;
}
export default AhoCorasick;
