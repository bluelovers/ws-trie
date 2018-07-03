import Trie from './trie';
declare module './trie' {
    interface Trie<T> {
        fail?: Trie<T>;
    }
}
export declare class AhoCorasick<T = any> {
    trie: Trie<T>;
    add(word: string, data?: T): boolean;
    build_fail(node?: Trie<T>): this;
    foreach_match(node: Trie<T>, pos: number, callback: IAhoCorasickCallback<T>): this;
    search(string: string, callback?: IAhoCorasickCallback<T>): IAhoCorasickResult<T>;
    search<R = IAhoCorasickResult<T>>(string: string, callback?: IAhoCorasickCallback<T>): R;
    to_dot(): string;
}
export declare type IAhoCorasickCallback<T> = (value: string, data: T[], offset: number, node: Trie<T>) => void;
export declare type IAhoCorasickResult<T = any> = {
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
export declare namespace AhoCorasick {
    export { IAhoCorasickCallback };
    export { AhoCorasick };
    export { Trie };
}
export default AhoCorasick;
