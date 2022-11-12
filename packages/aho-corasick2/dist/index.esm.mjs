class Trie {
  next={};
  is_word=null;
  value=null;
  data=[];
  add(t, e, i) {
    let n, s;
    return n = t.charAt(0), s = this.next[n], s || (s = this.next[n] = new Trie, s.value = i ? i.substr(0, i.length - t.length + 1) : n), 
    t.length > 1 ? s.add(t.substring(1), e, i || t) : (s.data.push(e), s.is_word = !0);
  }
  explore_fail_link(t) {
    let e, i, n, s, a;
    for (n = this, i = s = 0, a = t.length; 0 <= a ? s < a : s > a; i = 0 <= a ? ++s : --s) if (e = t.charAt(i), 
    n = n.next[e], !n) return null;
    return n;
  }
  each_node(t) {
    let e, i, n, s;
    for (i in n = this.next, n) e = n[i], t(this, e);
    for (i in s = this.next, s) e = s[i], e.each_node(t);
    return this;
  }
}

class AhoCorasick {
  trie=new Trie;
  add(t, e) {
    return this.trie.add(t, e);
  }
  build_fail(t) {
    let e, i, n, s, a, r, l;
    if ((t = t || this.trie).fail = null, t.value) for (n = s = 1, a = t.value.length; 1 <= a ? s < a : s > a; n = 1 <= a ? ++s : --s) if (i = this.trie.explore_fail_link(t.value.substring(n)), 
    i) {
      t.fail = i;
      break;
    }
    for (e in r = t.next, r) l = r[e], this.build_fail(l);
    return this;
  }
  foreach_match(t, e, i) {
    let n;
    for (;t; ) t.is_word && (n = e - t.value.length, i(t.value, t.data, n, t)), t = t.fail;
    return this;
  }
  search(t, e) {
    const i = {
      matches: {},
      positions: {},
      count: {},
      data: {}
    };
    let n, s, a, r, l, o;
    for (n = e ? function(...t) {
      const [n, s, a, r] = t;
      i.matches[n] = i.matches[n] || [], i.matches[n].push(a), i.positions[a] = i.positions[a] || [], 
      i.positions[a].push(n), null == i.count[n] && (i.count[n] = 0), i.count[n]++, i.data[n] = r.data, 
      e.call(i, ...t);
    } : function(...t) {
      const [e, n, s, a] = t;
      i.matches[e] = i.matches[e] || [], i.matches[e].push(s), i.positions[s] = i.positions[s] || [], 
      i.positions[s].push(e), null == i.count[e] && (i.count[e] = 0), i.count[e]++, i.data[e] = a.data;
    }, a = this.trie, r = l = 0, o = t.length; 0 <= o ? l < o : l > o; r = 0 <= o ? ++l : --l) {
      for (s = t.charAt(r); a && !a.next[s]; ) a = a.fail;
      a || (a = this.trie), a.next[s] && (a = a.next[s], this.foreach_match(a, r + 1, n));
    }
    return i;
  }
  to_dot() {
    let t, e, i, n, s;
    return t = [ "digraph Trie {" ], s = function(t) {
      return t && t.value ? `"${t.value}"` : '""';
    }, i = function(t) {
      if (t) return t.charAt(t.length - 1);
    }, n = function(n, a) {
      let r, l, o, h, u;
      if (o = i(a.value), h = [ `label = "${o}"` ], a.is_word) for (r in l = {
        style: "filled",
        color: "skyblue"
      }, l) u = l[r], h.push(`${r} = "${u}"`);
      return t.push(`${s(n)} -> ${s(a)};`), t.push(`${s(a)} [ ${h.join(",")} ];`), e(n, a);
    }, e = function(e, i) {
      let n;
      return [e, i] = [ i, i.fail ], n = i ? "dashed" : "dotted", t.push(`${s(e)} -> ${s(i)} [ style = "${n}" ];`);
    }, this.trie.each_node(n), t.push("}"), t.join("\n");
  }
}

export { AhoCorasick, Trie, AhoCorasick as default };
//# sourceMappingURL=index.esm.mjs.map
