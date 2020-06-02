/**
 * Created by user on 2018/6/8/008.
 */
import { IOptionsAll, IOptions } from './lib/types';
export * from './lib/types';
export declare function trieToRegExp<T = RegExp>(data: Record<any, any>, options: IOptionsAll<T>, flags?: string): T;
export declare function trieToRegExp<T = RegExp>(data: Record<any, any>, flags: string, options: IOptionsAll<T>): T;
export declare function trieToRegExp<T = RegExp>(data: Record<any, any>, options: IOptions, flags?: string): T;
export declare function trieToRegExp<T = RegExp>(data: Record<any, any>, flags?: string, options?: IOptions): T;
export declare function trieToRegExpSource(data: Record<any, any>, options?: IOptions): string;
export default trieToRegExp;
