import { ITrie, ITrieNode } from './create';
export declare function checkPrefix<T>(prefixNode: ITrie<T>, prefix: string): {
    prefixFound: boolean;
    prefixNode: ITrieNode<T>;
};
export default checkPrefix;
