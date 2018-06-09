"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
// sort items as they're being found
// to prevent slow .sort() in NodeJs
function pushInOrder(word, prefixes) {
    let i = 0;
    while (i < prefixes.length) {
        if (word < prefixes[i]) {
            break;
        }
        i += 1;
    }
    prefixes.splice(i, 0, word);
    return prefixes;
}
exports.pushInOrder = pushInOrder;
function recursePrefix(node, prefix, sorted, prefixes = []) {
    let word = prefix;
    for (const branch in node) {
        // @ts-ignore
        if (branch === config_1.default.END_WORD) {
            if (sorted) {
                pushInOrder(word, prefixes);
            }
            else {
                prefixes.push(word);
            }
            word = '';
        }
        recursePrefix(node[branch], prefix + branch, sorted, prefixes);
    }
    return prefixes;
}
exports.recursePrefix = recursePrefix;
exports.default = recursePrefix;
