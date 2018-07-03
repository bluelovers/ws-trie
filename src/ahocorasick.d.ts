import Trie from './trie';
declare module './trie' {
    interface Trie<T> {
        fail?: Trie<T>;
    }
}
export declare class AhoCorasick<T = any> {
    trie: Trie<T>;
    constructor();
    add(word: string, data?: T): boolean;
    build_fail(node?: Trie<T>): this;
    foreach_match(node: Trie<T>, pos: number, callback: IAhoCorasickCallback<T>): this;
    search(string: string, callback: IAhoCorasickCallback<T>): this;
    to_dot(): string;
}
export declare type IAhoCorasickCallback<T> = (value: string, data: T[], offset: number) => void;
export declare namespace AhoCorasick {
    export { IAhoCorasickCallback };
    export { AhoCorasick };
    export { Trie };
}
export default AhoCorasick;
