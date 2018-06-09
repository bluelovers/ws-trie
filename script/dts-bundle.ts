/**
 * Created by user on 2018/6/9/009.
 */

import * as pkg from '../package.json';

var dts = require('dts-bundle');

dts.bundle({
	name: pkg.name,
	main: '../index.d.ts'
});
