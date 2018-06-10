"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const append_1 = require("./append");
const config_1 = require("./config");
const utils_1 = require("./utils");
function create(input, ...argv) {
    if (!Array.isArray(input)) {
        throw (`Expected parameter Array, received ${typeof input}`);
    }
    const trie = input.reduce((accumulator, item) => {
        //split(item.toLowerCase())
        utils_1.split(item)
            .reduce(append_1.default, accumulator);
        return accumulator;
    }, {});
    return trie;
}
exports.create = create;
exports.default = create;
