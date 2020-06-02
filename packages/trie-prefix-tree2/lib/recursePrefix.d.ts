import { ITrie } from './create';
export declare function pushInOrder<T>(word: T, prefixes: T[]): T[];
export declare function recursePrefix<T>(node: ITrie<T>, prefix: string, sorted: boolean, prefixes?: string[]): string[];
export default recursePrefix;
