"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const append_1 = require("./append");
const config_1 = require("./config");
function create(input) {
    if (!Array.isArray(input)) {
        throw (`Expected parameter Array, received ${typeof input}`);
    }
    const trie = input.reduce((accumulator, item) => {
        item
            .toLowerCase()
            .split('')
            .reduce(append_1.default, accumulator);
        return accumulator;
    }, {});
    return trie;
}
exports.create = create;
exports.default = create;
