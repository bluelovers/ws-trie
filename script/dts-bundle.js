"use strict";
/**
 * Created by user on 2018/6/9/009.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const pkg = require("../package.json");
// @ts-ignore
const dts = require("dts-bundle");
const path = require("path");
dts.bundle({
    name: pkg.name,
    main: path.join(__dirname, '../index.d.ts')
});
