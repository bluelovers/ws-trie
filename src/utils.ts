
export function objectCopy(obj?)
{
	if (typeof obj === 'undefined')
	{
		return {};
	}
	return JSON.parse(JSON.stringify(obj));
}

export function stringify(obj?, spacer: number | string = 2)
{
	if (typeof obj === 'undefined')
	{
		return '';
	}
	return JSON.stringify(obj, null, spacer);
}

import * as utils from './utils';
export default utils;
