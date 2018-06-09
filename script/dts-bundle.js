"use strict";
/**
 * Created by user on 2018/6/9/009.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const pkg = require("../package.json");
var dts = require('dts-bundle');
dts.bundle({
    name: pkg.name,
    main: '../index.d.ts'
});
