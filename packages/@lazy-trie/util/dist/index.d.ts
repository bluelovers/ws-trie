export declare const ZWJ = 8205;
export declare const ZWJ_STR = "\u200D";
export declare function isString(word: string, msg?: string): word is string;
export type ISplitOptions = {
	toLowerCase?: boolean;
};
export declare function split(str: string, options?: ISplitOptions): string[];
export declare function objectCopy<T>(obj?: T): T;
export declare function stringify(obj?: unknown, spacer?: number | string): string;
export declare function throwMsg(expected: any, received: any): string;
export declare function zwjTrim(s: string): string;
export declare function zwjTrimStart(s: string): string;
export declare function zwjTrimEnd(s: string): string;

export {};
