"use strict";
/**
 * Created by user on 2020/6/2.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDefaultEndpoint = exports._is_phrase_valid = exports._quotemeta = exports._to_regex = void 0;
const jsesc_1 = __importDefault(require("jsesc"));
const END_WORD = '$$';
function _to_regex(alt_group, char_class, end) {
    let group_has_one_element = function (el) {
        return el.length === 1;
    }, result = "";
    // Once we've finished walking through the tree we need to build
    // the regex match groups...
    if (alt_group.length > 0) {
        if (alt_group.length === 1) {
            // Individual elements are merged with the current result.
            result += alt_group[0];
        }
        else if (alt_group.every(group_has_one_element)) {
            // When every single array in the alternative group is
            // a single element array, this gets flattened in to
            // a character class.
            result += ('[' + alt_group.join('') + ']');
        }
        else {
            // Finally, build a non-capturing alternative group.
            result += ('(?:' + alt_group.join('|') + ')');
        }
    }
    else if (char_class.length > 0) {
        result += char_class[0];
    }
    if (end && result) {
        if (result.length === 1) {
            result += '?';
        }
        else {
            result = '(?:' + result + ')?';
        }
    }
    return result;
}
exports._to_regex = _to_regex;
function _quotemeta(phrase, options = {}) {
    if (!_is_phrase_valid(phrase)) {
        return phrase;
    }
    let s = phrase
        .replace(/([\t\n\f\r\\\$\(\)\*\+\-\.\?\[\]\^\{\|\}])/g, '\\$1');
    if (!options.disableEscaped) {
        let jo = Object.assign({
            'es6': true,
        }, options.jsescOptions);
        s = s.replace(/[^\x20-\x7E]+/ug, function (s) {
            return jsesc_1.default(s, jo);
        });
    }
    return s;
}
exports._quotemeta = _quotemeta;
function _is_phrase_valid(phrase) {
    return (typeof phrase === 'string' && phrase.length > 0);
}
exports._is_phrase_valid = _is_phrase_valid;
function isDefaultEndpoint(value, key, trie) {
    //return (key === END_WORD) && (trie[key] === 1);
    return (key === END_WORD);
}
exports.isDefaultEndpoint = isDefaultEndpoint;
//# sourceMappingURL=util.js.map