/* /tw 번체 페이지 전용 런타임 변환기.
 * 서버가 HTML·RSC 페이로드는 번체로 바꿔 내려주지만, 클라이언트 JS 번들에 들어있는 간체 사전/동적 텍스트는
 * hydration 이후 간체로 되돌아간다. 그 텍스트를 DOM 에서 다시 번체(OpenCC cn->twp)로 변환한다.
 * docs/i18n_traditional_chinese_tw.md 참고. opencc-cn2t.js 를 먼저 로드해야 한다. */
(function () {
  if (!/^\/tw(\/|$)/.test(location.pathname) || typeof OpenCC === 'undefined') return
  var conv = OpenCC.Converter({ from: 'cn', to: 'twp' })
  var HAN = /[㐀-鿿]/
  var ATTRS = ['placeholder', 'title', 'alt', 'aria-label']
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, CODE: 1, PRE: 1 }

  function fixText(node) {
    var v = node.nodeValue
    if (v && HAN.test(v)) {
      var c = conv(v)
      if (c !== v) node.nodeValue = c
    }
  }
  function fixEl(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var v = el.getAttribute(ATTRS[i])
      if (v && HAN.test(v)) {
        var c = conv(v)
        if (c !== v) el.setAttribute(ATTRS[i], c)
      }
    }
  }
  function walk(root) {
    if (root.nodeType === 3) return fixText(root)
    if (root.nodeType !== 1 || SKIP[root.tagName]) return
    fixEl(root)
    for (var n = root.firstChild; n; n = n.nextSibling) walk(n)
  }
  function fixTitle() {
    var t = document.title
    if (t && HAN.test(t)) {
      var c = conv(t)
      if (c !== t) document.title = c
    }
  }

  var mo = new MutationObserver(function (list) {
    for (var i = 0; i < list.length; i++) {
      var m = list[i]
      if (m.type === 'characterData') {
        if (!m.target.parentNode || !SKIP[m.target.parentNode.tagName]) fixText(m.target)
      } else if (m.type === 'attributes') {
        fixEl(m.target)
      } else {
        for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j])
      }
    }
    fixTitle()
  })

  function start() {
    walk(document.body)
    fixTitle()
    mo.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS,
    })
  }
  if (document.body) start()
  else document.addEventListener('DOMContentLoaded', start)
})()
