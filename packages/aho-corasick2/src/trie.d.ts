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
export default Trie;
