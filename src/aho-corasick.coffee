"use strict"

class Trie
  constructor: ->
    @next = {}
    @is_word = null
    @value = null
    @data = []

  add: (word, data, original_word) ->
    chr = word.charAt 0
    node = @next[chr]

    unless node
      node = @next[chr] = new Trie()

      if original_word
        node.value = original_word.substr 0, original_word.length - word.length + 1
      else
        node.value = chr

    if word.length > 1
      node.add word.substring(1), data, original_word || word
    else
      node.data.push data
      node.is_word = true

  explore_fail_link: (word) ->
    node = @
    for i in [0...word.length]
      chr = word.charAt i
      node = node.next[chr]
      return null unless node
    node

  foreach_edge: (link_cb, fail_cb)->
    each_node = (from, node) ->
      link_cb from, node
      fail_cb node, node.fail if node.fail
      each_node node, sub_node for _k, sub_node of node.next
      @
    each_node null, sub_node for _k, sub_node of @next
    @

class AhoCorasick
  constructor: ->
    @trie = new Trie()

  add: (word, data) ->
    @trie.add word, data

  build_fail: (node) ->
    node = node || @trie
    node.fail = null

    if node.value
      for i in [1...node.value.length]
        fail_node = @trie.explore_fail_link node.value.substring(i)
        if fail_node
          node.fail = fail_node
          break

    @build_fail sub_node for _k,sub_node of node.next
    @

  foreach_match: (node, pos, callback) ->
    while node
      if node.is_word
        offset = pos - node.value.length
        callback node.value, node.data, offset
      node = node.fail
    @

  search: (string, callback) ->
    current = @trie

    for idx in [0...string.length]
      chr = string.charAt idx

      while current and not current.next[chr]
        current = current.fail
      current = @trie unless current

      if current.next[chr]
        current = current.next[chr]
        @foreach_match current, idx+1, callback if callback
    @

  build_edge_png: ->
    util = require('util')
    graphviz = require('graphviz')
    g = graphviz.digraph("Trie")
    map_node = (node) ->
      if node and node.value
        g.from node.value
      else
        g.from ''
    link_cb = (from, to) ->
      to_label = to.value.charAt to.value.length - 1
      to_node = map_node to
      from_node = map_node from
      g.addEdge from_node, to_node
      to_node.set 'label', to_label
      if to.is_word
        option =
          style: 'filled'
          color: 'skyblue'
        to_node.set k, v for k, v of option
      on
    fail_cb = (from, to) ->
      g.addEdge map_node(from), map_node(to), style: 'dashed'
    @trie.foreach_edge link_cb, fail_cb
    console.log g.to_dot()
    g.output 'png', 'trie.png'


if module
  module.exports = AhoCorasick
else
  window.AhoCorasick = AhoCorasick
