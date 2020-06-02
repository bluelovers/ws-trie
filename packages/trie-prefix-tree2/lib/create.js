"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const append_1 = __importDefault(require("./append"));
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
//# sourceMappingURL=create.js.map