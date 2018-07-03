"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trie_1 = require("./trie");
class AhoCorasick {
    constructor() {
        this.trie = new trie_1.default();
    }
    add(word, data) {
        return this.trie.add(word, data);
    }
    build_fail(node) {
        let _k, fail_node, i, j, ref, ref1, sub_node;
        node = node || this.trie;
        node.fail = null;
        if (node.value) {
            for (i = j = 1, ref = node.value.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
                fail_node = this.trie.explore_fail_link(node.value.substring(i));
                if (fail_node) {
                    node.fail = fail_node;
                    break;
                }
            }
        }
        ref1 = node.next;
        for (_k in ref1) {
            sub_node = ref1[_k];
            this.build_fail(sub_node);
        }
        return this;
    }
    foreach_match(node, pos, callback) {
        let offset;
        while (node) {
            if (node.is_word) {
                offset = pos - node.value.length;
                callback(node.value, node.data, offset, node);
            }
            node = node.fail;
        }
        return this;
    }
    search(string, callback) {
        /**
         * 參考 aca 回傳的資料結構
         * @see https://www.npmjs.com/package/aca
         */
        let result = {
            matches: {},
            positions: {},
            count: {},
            data: {},
        };
        let callbackResult;
        if (callback) {
            callbackResult = function (...argv) {
                let [value, data, offset, node] = argv;
                result.matches[value] = result.matches[value] || [];
                result.matches[value].push(offset);
                result.positions[offset] = result.positions[offset] || [];
                result.positions[offset].push(value);
                if (result.count[value] == null) {
                    result.count[value] = 0;
                }
                result.count[value]++;
                result.data[value] = node.data;
                // @ts-ignore
                callback.call(result, ...argv);
            };
        }
        else {
            callbackResult = function (...argv) {
                let [value, data, offset, node] = argv;
                result.matches[value] = result.matches[value] || [];
                result.matches[value].push(offset);
                result.positions[offset] = result.positions[offset] || [];
                result.positions[offset].push(value);
                if (result.count[value] == null) {
                    result.count[value] = 0;
                }
                result.count[value]++;
                result.data[value] = node.data;
            };
        }
        let chr, current, idx, j, ref;
        current = this.trie;
        for (idx = j = 0, ref = string.length; (0 <= ref ? j < ref : j > ref); idx = 0 <= ref ? ++j : --j) {
            chr = string.charAt(idx);
            while (current && !current.next[chr]) {
                current = current.fail;
            }
            if (!current) {
                current = this.trie;
            }
            if (current.next[chr]) {
                current = current.next[chr];
                this.foreach_match(current, idx + 1, callbackResult);
            }
        }
        // @ts-ignore
        return result;
    }
    to_dot() {
        let dot, fail_cb, last_chr, link_cb, v_;
        dot = ['digraph Trie {'];
        v_ = function (node) {
            if (node && node.value) {
                return `"${node.value}"`;
            }
            else {
                return "\"\"";
            }
        };
        last_chr = function (str) {
            if (str) {
                return str.charAt(str.length - 1);
            }
        };
        link_cb = function (from, to) {
            let k, option, to_label, to_opt, v;
            to_label = last_chr(to.value);
            to_opt = [`label = "${to_label}"`];
            if (to.is_word) {
                option = {
                    style: 'filled',
                    color: 'skyblue'
                };
                for (k in option) {
                    v = option[k];
                    to_opt.push(`${k} = "${v}"`);
                }
            }
            dot.push(`${v_(from)} -> ${v_(to)};`);
            dot.push(`${v_(to)} [ ${to_opt.join(',')} ];`);
            return fail_cb(from, to);
        };
        fail_cb = function (from, to) {
            let style;
            [from, to] = [to, to.fail];
            style = to ? 'dashed' : 'dotted';
            return dot.push(`${v_(from)} -> ${v_(to)} [ style = "${style}" ];`);
        };
        this.trie.each_node(link_cb);
        dot.push('}');
        return dot.join("\n");
    }
}
exports.AhoCorasick = AhoCorasick;
(function (AhoCorasick) {
})(AhoCorasick = exports.AhoCorasick || (exports.AhoCorasick = {}));
AhoCorasick.AhoCorasick = AhoCorasick;
AhoCorasick.Trie = trie_1.default;
exports.default = AhoCorasick;
