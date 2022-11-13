import { naturalCompare as e } from "string-natural-compare2";

import t from "jsesc";

import { END_WORD as n } from "@lazy-trie/types";

function _to_regex(e, t, n) {
  let r = "";
  return e.length > 0 ? 1 === e.length ? r += e[0] : e.every((function(e) {
    return 1 === e.length;
  })) ? r += "[" + e.join("") + "]" : r += "(?:" + e.join("|") + ")" : t.length > 0 && (r += t[0]), 
  n && r && (1 === r.length ? r += "?" : r = "(?:" + r + ")?"), r;
}

function _quotemeta(e) {
  let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  if (!_is_phrase_valid(e)) return e;
  let r = e.replace(/([\t\n\f\r\\\$\(\)\*\+\-\.\?\[\]\^\{\|\}])/g, "\\$1");
  if (!n.disableEscaped) {
    const e = Object.assign({
      es6: !0
    }, n.jsescOptions);
    r = r.replace(/[^\x20-\x7E]+/gu, (function(n) {
      return t(n, e);
    }));
  }
  return r;
}

function _is_phrase_valid(e) {
  return "string" == typeof e && e.length > 0;
}

function isDefaultEndpoint(e, t, r) {
  return t === n;
}

function trieToRegExp(e, t, n) {
  var r, o;
  "object" == typeof t && ([t, n] = [ n, t ]), n = n || {}, t = null !== (r = null !== (o = t) && void 0 !== o ? o : n.flags) && void 0 !== r ? r : "u";
  const i = trieToRegExpSource(e, n);
  return n.createRegExp ? n.createRegExp(i, t) : new RegExp(i, t);
}

function trieToRegExpSource(t) {
  var n, r, o;
  let i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  const l = null !== (n = i.getKeys) && void 0 !== n ? n : function(e) {
    return Object.keys(e);
  }, u = null !== (r = i.isEndpoint) && void 0 !== r ? r : isDefaultEndpoint, c = null !== (o = i.toRegexString) && void 0 !== o ? o : _to_regex, g = [].push;
  function _walk_trie(n, r, o) {
    const s = l(n, r, t), a = [], p = [];
    let f = !1;
    return s.forEach((function(e) {
      if (u(n[e], e, n)) return void (f = !0);
      const t = _quotemeta(e, i) + _walk_trie(n[e], e);
      g.call(s.length > 1 ? a : p, t);
    })), a.sort((function(t, n) {
      return n.length - t.length || e(t, n);
    })), c(a, p, f);
  }
  return _walk_trie(t, void 0);
}

export { trieToRegExp as default, trieToRegExp, trieToRegExpSource };
//# sourceMappingURL=index.esm.mjs.map
