import { UString } from 'uni-string';

export const ZWJ = 0x200d;
export const ZWJ_STR = '\u200d';

export function isString(word: string, msg = 'string'): word is string
{
	if (typeof word !== 'string' || word === '')
	{
		throw throwMsg(msg, typeof word);
	}

	// @ts-ignore
	return word;
}

export type ISplitOptions = {
	toLowerCase?: boolean,
};

export function split(str: string, options: ISplitOptions = {}): string[]
{
	options ??= {};

	if (options.toLowerCase)
	{
		str = str.toLowerCase();
	}

	const arr = UString.split(str, '');

	let i = arr.length;

	while (i > 0)
	{
		const j = i - 1;
		const cur = arr[j];

		if (cur.length > 2 && cur.includes('‍'))
		{
			const a = cur.split(/(\u200d)/);

			arr.splice(j, 1, ...a);
		}

		i = j;
	}

	return arr;
}

export function objectCopy<T>(obj?: T): T
{
	if (typeof obj === 'undefined')
	{
		return {} as T;
	}
	return JSON.parse(JSON.stringify(obj));
}

export function stringify(obj?: unknown, spacer: number | string = 2)
{
	if (typeof obj === 'undefined')
	{
		return '';
	}
	return JSON.stringify(obj, null, spacer);
}

export function throwMsg(expected: any, received: any)
{
	return `Expected ${expected}, received ${received}`;
}

export function zwjTrim(s: string)
{
	return s.replace(/^[\u200d\s]+|[\u200d\s]+$/, '');
}

export function zwjTrimStart(s: string)
{
	return s.replace(/^[\u200d\s]+/, '');
}

export function zwjTrimEnd(s: string)
{
	return s.replace(/[\u200d\s]+$/, '');
}
