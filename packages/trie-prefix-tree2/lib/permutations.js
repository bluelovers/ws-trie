"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permutations = void 0;
const utils_1 = require("./utils");
function permutations(letters, trie, opts = {
    type: 'anagram',
}) {
    if (typeof letters !== 'string') {
        throw (`Permutations expects string letters, received ${typeof letters}`);
    }
    let words = [];
    const permute = (word, node, prefix = '') => {
        const wordIsEmpty = word.length === 0;
        const wordFound = words.includes(prefix);
        //const endWordFound = node[config.END_WORD] === 1;
        const endWordFound = utils_1.hasEndpoint(node);
        if (wordIsEmpty && endWordFound && !wordFound) {
            words.push(prefix);
        }
        for (let i = 0, len = word.length; i < len; i++) {
            const letter = word[i];
            if (opts.type === 'sub-anagram') {
                if (endWordFound && !words.includes(prefix)) {
                    words.push(prefix);
                }
            }
            if (node[letter]) {
                const remaining = word.substring(0, i) + word.substring(i + 1, len);
                // @ts-ignore
                permute(remaining, node[letter], prefix + letter, words);
            }
        }
        return words.sort();
    };
    return permute(letters, trie);
}
exports.permutations = permutations;
exports.default = permutations;
//# sourceMappingURL=permutations.js.map