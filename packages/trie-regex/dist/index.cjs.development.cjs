'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var stringNaturalCompare2 = require('string-natural-compare2');
var jsesc = require('jsesc');

const END_WORD = '$$';
function _to_regex(alt_group, char_class, end) {
  const group_has_one_element = function (el) {
    return el.length === 1;
  };
  let result = "";
  if (alt_group.length > 0) {
    if (alt_group.length === 1) {
      result += alt_group[0];
    } else if (alt_group.every(group_has_one_element)) {
      result += '[' + alt_group.join('') + ']';
    } else {
      result += '(?:' + alt_group.join('|') + ')';
    }
  } else if (char_class.length > 0) {
    result += char_class[0];
  }
  if (end && result) {
    if (result.length === 1) {
      result += '?';
    } else {
      result = '(?:' + result + ')?';
    }
  }
  return result;
}
function _quotemeta(phrase) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!_is_phrase_valid(phrase)) {
    return phrase;
  }
  let s = phrase.replace(/([\t\n\f\r\\\$\(\)\*\+\-\.\?\[\]\^\{\|\}])/g, '\\$1');
  if (!options.disableEscaped) {
    const jo = Object.assign({
      'es6': true
    }, options.jsescOptions);
    s = s.replace(/[^\x20-\x7E]+/ug, function (s) {
      return jsesc(s, jo);
    });
  }
  return s;
}
function _is_phrase_valid(phrase) {
  return typeof phrase === 'string' && phrase.length > 0;
}
function isDefaultEndpoint(value, key, trie) {
  return key === END_WORD;
}

function trieToRegExp(data, flags, options) {
  var _ref, _flags;
  if (typeof flags == 'object') {
    [flags, options] = [options, flags];
  }
  options = options || {};
  flags = (_ref = (_flags = flags) !== null && _flags !== void 0 ? _flags : options.flags) !== null && _ref !== void 0 ? _ref : 'u';
  const source = trieToRegExpSource(data, options);
  if (options.createRegExp) {
    return options.createRegExp(source, flags);
  }
  return new RegExp(source, flags);
}
function trieToRegExpSource(data) {
  var _options$getKeys, _options$isEndpoint, _options$toRegexStrin;
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const getKeys = (_options$getKeys = options.getKeys) !== null && _options$getKeys !== void 0 ? _options$getKeys : function (trie) {
    return Object.keys(trie);
  };
  const isEndpoint = (_options$isEndpoint = options.isEndpoint) !== null && _options$isEndpoint !== void 0 ? _options$isEndpoint : isDefaultEndpoint;
  const toRegexString = (_options$toRegexStrin = options.toRegexString) !== null && _options$toRegexStrin !== void 0 ? _options$toRegexStrin : _to_regex;
  const _fn_push = [].push;
  function _walk_trie(trie, key, root) {
    const keys = getKeys(trie, key, data);
    const alt_group = [];
    const char_class = [];
    let end = false;
    keys.forEach(function (_key) {
      if (isEndpoint(trie[_key], _key, trie)) {
        end = true;
        return;
      }
      const walk_result = _quotemeta(_key, options) + _walk_trie(trie[_key], _key);
      _fn_push.call(keys.length > 1 ? alt_group : char_class, walk_result);
    });
    alt_group.sort(function (a, b) {
      return b.length - a.length || stringNaturalCompare2.naturalCompare(a, b);
    });
    return toRegexString(alt_group, char_class, end);
  }
  return _walk_trie(data, void 0);
}

exports.default = trieToRegExp;
exports.trieToRegExp = trieToRegExp;
exports.trieToRegExpSource = trieToRegExpSource;
//# sourceMappingURL=index.cjs.development.cjs.map
