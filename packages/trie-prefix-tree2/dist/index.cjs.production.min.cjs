"use strict";

var e = require("@lazy-trie/types"), r = require("@lazy-trie/util"), t = require("trie-regex");

function append(r, t, i, n) {
  return r[t] = r[t] || {}, r = r[t], i === n.length - 1 && (r[e.END_WORD] = null), 
  r;
}

function create(e, ...t) {
  if (!Array.isArray(e)) throw new TypeError("Expected parameter Array, received " + typeof e);
  return e.reduce(((e, t) => (r.split(t).reduce(append, e), e)), {});
}

function isEndpoint(r, t, i) {
  return t === e.END_WORD;
}

function hasEndpoint(r) {
  return e.END_WORD in r;
}

function pushInOrder(e, r) {
  let t = 0;
  for (;t < r.length && !(e < r[t]); ) t += 1;
  return r.splice(t, 0, e), r;
}

function recursePrefix(r, t, i, n = []) {
  let s = t;
  for (const o in r) o === e.END_WORD && (i ? pushInOrder(s, n) : n.push(s), s = ""), 
  recursePrefix(r[o], t + o, i, n);
  return n;
}

const i = Object.freeze({}), n = Symbol("default");

function permutations(e, r, t = {
  type: "anagram"
}) {
  if ("string" != typeof e) throw new TypeError("Permutations expects string letters, received " + typeof e);
  const i = [], permute = (e, r, n = "") => {
    const s = 0 === e.length, o = i.includes(n), a = hasEndpoint(r);
    s && a && !o && i.push(n);
    for (let s = 0, o = e.length; s < o; s++) {
      const c = e[s];
      if ("sub-anagram" === t.type && a && !i.includes(n) && i.push(n), r[c]) {
        const t = e.substring(0, s) + e.substring(s + 1, o);
        permute(t, r[c], n + c);
      }
    }
    return i.sort();
  };
  return permute(e, r);
}

function recurseRandomWord(r, t) {
  const i = t, n = Object.keys(r), s = n[Math.floor(Math.random() * n.length)];
  return s === e.END_WORD ? i : recurseRandomWord(r[s], t + s);
}

const s = Symbol("trie");

class Trie {
  constructor(e, t, ...i) {
    if (!Array.isArray(e)) throw r.throwMsg("parameter Array", typeof e);
    this.options = Object.freeze({
      ignoreCase: !0,
      ...this.options
    }), this.options.mapMode ? (this[s] = create([], ...i), e.forEach((e => {
      const [r, t] = e;
      this.addWord(r, t);
    }))) : (this[s] = create([], ...i), e.forEach((e => {
      this.addWord(e);
    })));
  }
  tree() {
    return this[s];
  }
  load(e) {
    return this[s] = e, this;
  }
  dump(e = 0) {
    return r.stringify(this[s], e);
  }
  addWord(t, i = null) {
    r.isString(t, "word is string");
    const o = this._key(t), a = r.split(o).reduce(((...e) => append(...e)), this[s]);
    return a[e.END_WORD] = a[e.END_WORD] || {}, a[e.END_WORD][t] = i, a[e.END_WORD][n] = t, 
    this;
  }
  _key(e) {
    return this.options.ignoreCase ? e.toLowerCase() : e;
  }
  removeWord(t, i) {
    r.isString(t, "word is string");
    const {prefixFound: s, prefixNode: o} = this._checkPrefix(t);
    if (s) {
      const r = o[e.END_WORD];
      if (!i && Object.keys(r).length > 1) {
        let e;
        t in r ? delete r[t] : r[n] in r && (delete r[r[n]], e = !0), (e || t === r[n]) && (r[n] = Object.keys(r)[0]);
      } else delete o[e.END_WORD];
    }
    return this;
  }
  _checkPrefix(e) {
    const t = this._key(e);
    return function checkPrefix(e, t) {
      return {
        prefixFound: r.split(t).every(((r, t) => !!e[r] && (e = e[r]))),
        prefixNode: e
      };
    }(this[s], t);
  }
  isPrefix(e) {
    r.isString(e, "prefix is string");
    const {prefixFound: t} = this._checkPrefix(e);
    return t;
  }
  getPrefix(e, t = !0) {
    if (r.isString(e, "prefix is string"), "boolean" != typeof t) throw r.throwMsg("sort parameter as boolean", typeof t);
    if (!this.isPrefix(e)) return [];
    const {prefixNode: i} = this._checkPrefix(e);
    return recursePrefix(i, e, t);
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
    if ("boolean" != typeof e) throw r.throwMsg("sort parameter as boolean", typeof e);
    return recursePrefix(this[s], "", e);
  }
  hasWord(e) {
    if ("string" != typeof e) throw r.throwMsg("string word", typeof e);
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
      if (!r && n in t) {
        let r = t[n];
        if (r in t || (r = Object.keys(t)[0]), r in t) return {
          key: r,
          value: t[r],
          matched: r === e
        };
      }
    }
    return null;
  }
  getWordNode(t) {
    if ("string" != typeof t) throw r.throwMsg("string word", typeof t);
    if ("" !== t) {
      const {prefixNode: r} = this._checkPrefix(t);
      if (hasEndpoint(r)) return r[e.END_WORD];
    }
    return null;
  }
  getWordNodeKeys(e) {
    const r = this.getWordNode(e);
    return r ? Object.keys(r) : null;
  }
  isAnagrams(e) {
    if ("string" != typeof e) throw r.throwMsg("string letters", typeof e);
    if (e.length < 2) throw r.throwMsg("at least 2 letters", e.length);
    return e;
  }
  getAnagrams(e) {
    return this.isAnagrams(e), permutations(e, this[s], {
      type: "anagram"
    });
  }
  getSubAnagrams(e) {
    return this.isAnagrams(e), permutations(e, this[s], {
      type: "sub-anagram"
    });
  }
  toRegExp(e, i) {
    return e && r.isString(e) || (e = "u", this.options.ignoreCase && (e += "i")), i = Object.assign({
      disableEscaped: !0,
      isEndpoint,
      jsescOptions: {
        es6: !0,
        minimal: !1
      }
    }, i), t.trieToRegExp(this.tree(), e, i);
  }
}

function createTrie(...e) {
  return new Trie(...e);
}

Object.assign(createTrie, {
  prototype: Trie.prototype
}), Object.defineProperty(createTrie, "__esModule", {
  value: !0
}), Object.defineProperty(createTrie, "createTrie", {
  value: createTrie
}), Object.defineProperty(createTrie, "default", {
  value: createTrie
}), Object.defineProperty(createTrie, "trie", {
  value: createTrie
}), Object.defineProperty(createTrie, "Trie", {
  value: Trie
}), Object.defineProperty(createTrie, "SYM_RAW", {
  value: s
}), Object.defineProperty(createTrie, "END_VALUE", {
  value: i
}), Object.defineProperty(createTrie, "END_WORD", {
  value: e.END_WORD
}), Object.defineProperty(createTrie, "END_DEF", {
  value: n
}), Object.defineProperty(createTrie, "isEndpoint", {
  value: isEndpoint
}), Object.defineProperty(createTrie, "hasEndpoint", {
  value: hasEndpoint
}), module.exports = createTrie;
//# sourceMappingURL=index.cjs.production.min.cjs.map
