import { END_WORD as e } from "@lazy-trie/types";

export { END_WORD } from "@lazy-trie/types";

import { split as r, throwMsg as t, stringify as i, isString as n } from "@lazy-trie/util";

import { trieToRegExp as s } from "trie-regex";

function append(r, t, i, n) {
  return r[t] = r[t] || {}, r = r[t], i === n.length - 1 && (r[e] = null), r;
}

function create(e, ...t) {
  if (!Array.isArray(e)) throw new TypeError("Expected parameter Array, received " + typeof e);
  return e.reduce(((e, t) => (r(t).reduce(append, e), e)), {});
}

function isEndpoint(r, t, i) {
  return t === e;
}

function hasEndpoint(r) {
  return e in r;
}

function pushInOrder(e, r) {
  let t = 0;
  for (;t < r.length && !(e < r[t]); ) t += 1;
  return r.splice(t, 0, e), r;
}

function recursePrefix(r, t, i, n = []) {
  let s = t;
  for (const o in r) o === e && (i ? pushInOrder(s, n) : n.push(s), s = ""), recursePrefix(r[o], t + o, i, n);
  return n;
}

const o = Object.freeze({}), a = Symbol("default");

function permutations(e, r, t = {
  type: "anagram"
}) {
  if ("string" != typeof e) throw new TypeError("Permutations expects string letters, received " + typeof e);
  const i = [], permute = (e, r, n = "") => {
    const s = 0 === e.length, o = i.includes(n), a = hasEndpoint(r);
    s && a && !o && i.push(n);
    for (let s = 0, o = e.length; s < o; s++) {
      const f = e[s];
      if ("sub-anagram" === t.type && a && !i.includes(n) && i.push(n), r[f]) {
        const t = e.substring(0, s) + e.substring(s + 1, o);
        permute(t, r[f], n + f);
      }
    }
    return i.sort();
  };
  return permute(e, r);
}

function recurseRandomWord(r, t) {
  const i = t, n = Object.keys(r), s = n[Math.floor(Math.random() * n.length)];
  return s === e ? i : recurseRandomWord(r[s], t + s);
}

const f = Symbol("trie");

class Trie {
  constructor(e, r, ...i) {
    if (!Array.isArray(e)) throw t("parameter Array", typeof e);
    this.options = Object.freeze({
      ignoreCase: !0,
      ...this.options
    }), this.options.mapMode ? (this[f] = create([], ...i), e.forEach((e => {
      const [r, t] = e;
      this.addWord(r, t);
    }))) : (this[f] = create([], ...i), e.forEach((e => {
      this.addWord(e);
    })));
  }
  tree() {
    return this[f];
  }
  load(e) {
    return this[f] = e, this;
  }
  dump(e = 0) {
    return i(this[f], e);
  }
  addWord(t, i = null) {
    n(t, "word is string");
    const s = this._key(t), o = r(s).reduce(((...e) => append(...e)), this[f]);
    return o[e] = o[e] || {}, o[e][t] = i, o[e][a] = t, this;
  }
  _key(e) {
    return this.options.ignoreCase ? e.toLowerCase() : e;
  }
  removeWord(r, t) {
    n(r, "word is string");
    const {prefixFound: i, prefixNode: s} = this._checkPrefix(r);
    if (i) {
      const i = s[e];
      if (!t && Object.keys(i).length > 1) {
        let e;
        r in i ? delete i[r] : i[a] in i && (delete i[i[a]], e = !0), (e || r === i[a]) && (i[a] = Object.keys(i)[0]);
      } else delete s[e];
    }
    return this;
  }
  _checkPrefix(e) {
    const t = this._key(e);
    return function checkPrefix(e, t) {
      return {
        prefixFound: r(t).every(((r, t) => !!e[r] && (e = e[r]))),
        prefixNode: e
      };
    }(this[f], t);
  }
  isPrefix(e) {
    n(e, "prefix is string");
    const {prefixFound: r} = this._checkPrefix(e);
    return r;
  }
  getPrefix(e, r = !0) {
    if (n(e, "prefix is string"), "boolean" != typeof r) throw t("sort parameter as boolean", typeof r);
    if (!this.isPrefix(e)) return [];
    const {prefixNode: i} = this._checkPrefix(e);
    return recursePrefix(i, e, r);
  }
  getRandomWordWithPrefix(...e) {
    let r;
    if (e.length) {
      if (r = e[0], !this.isPrefix(r)) return "";
    } else r = "";
    const {prefixNode: t} = this._checkPrefix(r);
    return recurseRandomWord(t, r);
  }
  countPrefix(e) {
    return this.getPrefix(e).length;
  }
  getWordsAll(e = !0) {
    if ("boolean" != typeof e) throw t("sort parameter as boolean", typeof e);
    return recursePrefix(this[f], "", e);
  }
  hasWord(e) {
    if ("string" != typeof e) throw t("string word", typeof e);
    if ("" !== e) {
      const {prefixFound: r, prefixNode: t} = this._checkPrefix(e);
      if (r) return hasEndpoint(t);
    }
    return !1;
  }
  getWordData(e, r) {
    const t = this.getWordNode(e);
    if (t) {
      if (e in t) return {
        key: e,
        value: t[e],
        matched: !0
      };
      if (!r && a in t) {
        let r = t[a];
        if (r in t || (r = Object.keys(t)[0]), r in t) return {
          key: r,
          value: t[r],
          matched: r === e
        };
      }
    }
    return null;
  }
  getWordNode(r) {
    if ("string" != typeof r) throw t("string word", typeof r);
    if ("" !== r) {
      const {prefixNode: t} = this._checkPrefix(r);
      if (hasEndpoint(t)) return t[e];
    }
    return null;
  }
  getWordNodeKeys(e) {
    const r = this.getWordNode(e);
    return r ? Object.keys(r) : null;
  }
  isAnagrams(e) {
    if ("string" != typeof e) throw t("string letters", typeof e);
    if (e.length < 2) throw t("at least 2 letters", e.length);
    return e;
  }
  getAnagrams(e) {
    return this.isAnagrams(e), permutations(e, this[f], {
      type: "anagram"
    });
  }
  getSubAnagrams(e) {
    return this.isAnagrams(e), permutations(e, this[f], {
      type: "sub-anagram"
    });
  }
  toRegExp(e, r) {
    return e && n(e) || (e = "u", this.options.ignoreCase && (e += "i")), r = Object.assign({
      disableEscaped: !0,
      isEndpoint,
      jsescOptions: {
        es6: !0,
        minimal: !1
      }
    }, r), s(this.tree(), e, r);
  }
}

function createTrie(...e) {
  return new Trie(...e);
}

Object.assign(createTrie, {
  prototype: Trie.prototype
});

export { a as END_DEF, o as END_VALUE, f as SYM_RAW, Trie, createTrie, createTrie as default, hasEndpoint, isEndpoint, createTrie as trie };
//# sourceMappingURL=index.esm.mjs.map
