var Zepto = (function () {
  var t,
    e,
    $,
    n,
    i,
    r,
    o = [],
    a = o.slice,
    s = o.filter,
    c = window.document,
    u = {},
    l = {},
    f = {
      "column-count": 1,
      columns: 1,
      "font-weight": 1,
      "line-height": 1,
      opacity: 1,
      "z-index": 1,
      zoom: 1,
    },
    d = /^\s*<(\w+|!)[^>]*>/,
    h = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    p =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    g = /^(?:body|html)$/i,
    m = /([A-Z])/g,
    v = ["val", "css", "html", "text", "data", "width", "height", "offset"],
    y = c.createElement("table"),
    w = c.createElement("tr"),
    b = {
      tr: c.createElement("tbody"),
      tbody: y,
      thead: y,
      tfoot: y,
      td: w,
      th: w,
      "*": c.createElement("div"),
    },
    x = /complete|loaded|interactive/,
    C = /^[\w-]*$/,
    S = {},
    E = S.toString,
    j = {},
    M = c.createElement("div"),
    O = {
      tabindex: "tabIndex",
      readonly: "readOnly",
      for: "htmlFor",
      class: "className",
      maxlength: "maxLength",
      cellspacing: "cellSpacing",
      cellpadding: "cellPadding",
      rowspan: "rowSpan",
      colspan: "colSpan",
      usemap: "useMap",
      frameborder: "frameBorder",
      contenteditable: "contentEditable",
    },
    T =
      Array.isArray ||
      function (t) {
        return t instanceof Array;
      };
  function k(t) {
    return null == t ? String(t) : S[E.call(t)] || "object";
  }
  function P(t) {
    return "function" == k(t);
  }
  function H(t) {
    return null != t && t == t.window;
  }
  function D(t) {
    return null != t && t.nodeType == t.DOCUMENT_NODE;
  }
  function N(t) {
    return "object" == k(t);
  }
  function L(t) {
    return N(t) && !H(t) && Object.getPrototypeOf(t) == Object.prototype;
  }
  function R(t) {
    return "number" == typeof t.length;
  }
  function A(t) {
    return t
      .replace(/::/g, "/")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
      .replace(/([a-z\d])([A-Z])/g, "$1_$2")
      .replace(/_/g, "-")
      .toLowerCase();
  }
  function z(t) {
    return t in l ? l[t] : (l[t] = new RegExp("(^|\\s)" + t + "(\\s|$)"));
  }
  function B(t, e) {
    return "number" != typeof e || f[A(t)] ? e : e + "px";
  }
  function F(t) {
    return "children" in t
      ? a.call(t.children)
      : $.map(t.childNodes, function (t) {
          if (1 == t.nodeType) return t;
        });
  }
  function I(t, e) {
    return null == e ? $(t) : $(t).filter(e);
  }
  function X(t, e, n, i) {
    return P(e) ? e.call(t, n, i) : e;
  }
  function _(t, e, n) {
    null == n ? t.removeAttribute(e) : t.setAttribute(e, n);
  }
  function W(e, n) {
    var i = e.className,
      r = i && i.baseVal !== t;
    if (n === t) return r ? i.baseVal : i;
    r ? (i.baseVal = n) : (e.className = n);
  }
  function q(t) {
    var e;
    try {
      return t
        ? "true" == t ||
            ("false" != t &&
              ("null" == t
                ? null
                : /^0/.test(t) || isNaN((e = Number(t)))
                ? /^[\[\{]/.test(t)
                  ? $.parseJSON(t)
                  : t
                : e))
        : t;
    } catch (e) {
      return t;
    }
  }
  return (
    (j.matches = function (t, e) {
      if (!e || !t || 1 !== t.nodeType) return !1;
      var n =
        t.webkitMatchesSelector ||
        t.mozMatchesSelector ||
        t.oMatchesSelector ||
        t.matchesSelector;
      if (n) return n.call(t, e);
      var i,
        r = t.parentNode,
        o = !r;
      return (
        o && (r = M).appendChild(t),
        (i = ~j.qsa(r, e).indexOf(t)),
        o && M.removeChild(t),
        i
      );
    }),
    (i = function (t) {
      return t.replace(/-+(.)?/g, function (t, e) {
        return e ? e.toUpperCase() : "";
      });
    }),
    (r = function (t) {
      return s.call(t, function (e, n) {
        return t.indexOf(e) == n;
      });
    }),
    (j.fragment = function (e, n, i) {
      var r, o, s;
      return (
        h.test(e) && (r = $(c.createElement(RegExp.$1))),
        r ||
          (e.replace && (e = e.replace(p, "<$1></$2>")),
          n === t && (n = d.test(e) && RegExp.$1),
          n in b || (n = "*"),
          ((s = b[n]).innerHTML = "" + e),
          (r = $.each(a.call(s.childNodes), function () {
            s.removeChild(this);
          }))),
        L(i) &&
          ((o = $(r)),
          $.each(i, function (t, e) {
            v.indexOf(t) > -1 ? o[t](e) : o.attr(t, e);
          })),
        r
      );
    }),
    (j.Z = function (t, e) {
      return ((t = t || []).__proto__ = $.fn), (t.selector = e || ""), t;
    }),
    (j.isZ = function (t) {
      return t instanceof j.Z;
    }),
    (j.init = function (e, n) {
      var i, r;
      if (!e) return j.Z();
      if ("string" == typeof e)
        if ("<" == (e = e.trim())[0] && d.test(e))
          (i = j.fragment(e, RegExp.$1, n)), (e = null);
        else {
          if (n !== t) return $(n).find(e);
          i = j.qsa(c, e);
        }
      else {
        if (P(e)) return $(c).ready(e);
        if (j.isZ(e)) return e;
        if (T(e))
          (r = e),
            (i = s.call(r, function (t) {
              return null != t;
            }));
        else if (N(e)) (i = [e]), (e = null);
        else if (d.test(e))
          (i = j.fragment(e.trim(), RegExp.$1, n)), (e = null);
        else {
          if (n !== t) return $(n).find(e);
          i = j.qsa(c, e);
        }
      }
      return j.Z(i, e);
    }),
    (($ = function (t, e) {
      return j.init(t, e);
    }).extend = function (n) {
      var i,
        r = a.call(arguments, 1);
      return (
        "boolean" == typeof n && ((i = n), (n = r.shift())),
        r.forEach(function (r) {
          !(function n(i, r, o) {
            for (e in r)
              o && (L(r[e]) || T(r[e]))
                ? (L(r[e]) && !L(i[e]) && (i[e] = {}),
                  T(r[e]) && !T(i[e]) && (i[e] = []),
                  n(i[e], r[e], o))
                : r[e] !== t && (i[e] = r[e]);
          })(n, r, i);
        }),
        n
      );
    }),
    (j.qsa = function (t, e) {
      var n,
        i = "#" == e[0],
        r = !i && "." == e[0],
        o = i || r ? e.slice(1) : e,
        s = C.test(o);
      return D(t) && s && i
        ? (n = t.getElementById(o))
          ? [n]
          : []
        : 1 !== t.nodeType && 9 !== t.nodeType
        ? []
        : a.call(
            s && !i
              ? r
                ? t.getElementsByClassName(o)
                : t.getElementsByTagName(e)
              : t.querySelectorAll(e)
          );
    }),
    ($.contains = c.documentElement.contains
      ? function (t, e) {
          return t !== e && t.contains(e);
        }
      : function (t, e) {
          for (; e && (e = e.parentNode); ) if (e === t) return !0;
          return !1;
        }),
    ($.type = k),
    ($.isFunction = P),
    ($.isWindow = H),
    ($.isArray = T),
    ($.isPlainObject = L),
    ($.isEmptyObject = function (t) {
      var e;
      for (e in t) return !1;
      return !0;
    }),
    ($.inArray = function (t, e, n) {
      return o.indexOf.call(e, t, n);
    }),
    ($.camelCase = i),
    ($.trim = function (t) {
      return null == t ? "" : String.prototype.trim.call(t);
    }),
    ($.uuid = 0),
    ($.support = {}),
    ($.expr = {}),
    ($.map = function (t, e) {
      var n,
        i,
        r,
        o,
        a = [];
      if (R(t))
        for (i = 0; i < t.length; i++) null != (n = e(t[i], i)) && a.push(n);
      else for (r in t) null != (n = e(t[r], r)) && a.push(n);
      return (o = a).length > 0 ? $.fn.concat.apply([], o) : o;
    }),
    ($.each = function (t, e) {
      var n, i;
      if (R(t)) {
        for (n = 0; n < t.length; n++)
          if (!1 === e.call(t[n], n, t[n])) return t;
      } else for (i in t) if (!1 === e.call(t[i], i, t[i])) return t;
      return t;
    }),
    ($.grep = function (t, e) {
      return s.call(t, e);
    }),
    window.JSON && ($.parseJSON = JSON.parse),
    $.each(
      "Boolean Number String Function Array Date RegExp Object Error".split(
        " "
      ),
      function (t, e) {
        S["[object " + e + "]"] = e.toLowerCase();
      }
    ),
    ($.fn = {
      forEach: o.forEach,
      reduce: o.reduce,
      push: o.push,
      sort: o.sort,
      indexOf: o.indexOf,
      concat: o.concat,
      map: function (t) {
        return $(
          $.map(this, function (e, n) {
            return t.call(e, n, e);
          })
        );
      },
      slice: function () {
        return $(a.apply(this, arguments));
      },
      ready: function (t) {
        return (
          x.test(c.readyState) && c.body
            ? t($)
            : c.addEventListener(
                "DOMContentLoaded",
                function () {
                  t($);
                },
                !1
              ),
          this
        );
      },
      get: function (e) {
        return e === t ? a.call(this) : this[e >= 0 ? e : e + this.length];
      },
      toArray: function () {
        return this.get();
      },
      size: function () {
        return this.length;
      },
      remove: function () {
        return this.each(function () {
          null != this.parentNode && this.parentNode.removeChild(this);
        });
      },
      each: function (t) {
        return (
          o.every.call(this, function (e, n) {
            return !1 !== t.call(e, n, e);
          }),
          this
        );
      },
      filter: function (t) {
        return P(t)
          ? this.not(this.not(t))
          : $(
              s.call(this, function (e) {
                return j.matches(e, t);
              })
            );
      },
      add: function (t, e) {
        return $(r(this.concat($(t, e))));
      },
      is: function (t) {
        return this.length > 0 && j.matches(this[0], t);
      },
      not: function (e) {
        var n = [];
        if (P(e) && e.call !== t)
          this.each(function (t) {
            e.call(this, t) || n.push(this);
          });
        else {
          var i =
            "string" == typeof e
              ? this.filter(e)
              : R(e) && P(e.item)
              ? a.call(e)
              : $(e);
          this.forEach(function (t) {
            i.indexOf(t) < 0 && n.push(t);
          });
        }
        return $(n);
      },
      has: function (t) {
        return this.filter(function () {
          return N(t) ? $.contains(this, t) : $(this).find(t).size();
        });
      },
      eq: function (t) {
        return -1 === t ? this.slice(t) : this.slice(t, +t + 1);
      },
      first: function () {
        var t = this[0];
        return t && !N(t) ? t : $(t);
      },
      last: function () {
        var t = this[this.length - 1];
        return t && !N(t) ? t : $(t);
      },
      find: function (t) {
        var e = this;
        return t
          ? "object" == typeof t
            ? $(t).filter(function () {
                var t = this;
                return o.some.call(e, function (e) {
                  return $.contains(e, t);
                });
              })
            : 1 == this.length
            ? $(j.qsa(this[0], t))
            : this.map(function () {
                return j.qsa(this, t);
              })
          : [];
      },
      closest: function (t, e) {
        var n = this[0],
          i = !1;
        for (
          "object" == typeof t && (i = $(t));
          n && !(i ? i.indexOf(n) >= 0 : j.matches(n, t));

        )
          n = n !== e && !D(n) && n.parentNode;
        return $(n);
      },
      parents: function (t) {
        for (var e = [], n = this; n.length > 0; )
          n = $.map(n, function (t) {
            if ((t = t.parentNode) && !D(t) && e.indexOf(t) < 0)
              return e.push(t), t;
          });
        return I(e, t);
      },
      parent: function (t) {
        return I(r(this.pluck("parentNode")), t);
      },
      children: function (t) {
        return I(
          this.map(function () {
            return F(this);
          }),
          t
        );
      },
      contents: function () {
        return this.map(function () {
          return a.call(this.childNodes);
        });
      },
      siblings: function (t) {
        return I(
          this.map(function (t, e) {
            return s.call(F(e.parentNode), function (t) {
              return t !== e;
            });
          }),
          t
        );
      },
      empty: function () {
        return this.each(function () {
          this.innerHTML = "";
        });
      },
      pluck: function (t) {
        return $.map(this, function (e) {
          return e[t];
        });
      },
      show: function () {
        return this.each(function () {
          var t, e, n;
          "none" == this.style.display && (this.style.display = ""),
            "none" == getComputedStyle(this, "").getPropertyValue("display") &&
              (this.style.display =
                ((t = this.nodeName),
                u[t] ||
                  ((e = c.createElement(t)),
                  c.body.appendChild(e),
                  (n = getComputedStyle(e, "").getPropertyValue("display")),
                  e.parentNode.removeChild(e),
                  "none" == n && (n = "block"),
                  (u[t] = n)),
                u[t]));
        });
      },
      replaceWith: function (t) {
        return this.before(t).remove();
      },
      wrap: function (t) {
        var e = P(t);
        if (this[0] && !e)
          var n = $(t).get(0),
            i = n.parentNode || this.length > 1;
        return this.each(function (r) {
          $(this).wrapAll(e ? t.call(this, r) : i ? n.cloneNode(!0) : n);
        });
      },
      wrapAll: function (t) {
        if (this[0]) {
          var e;
          for ($(this[0]).before((t = $(t))); (e = t.children()).length; )
            t = e.first();
          $(t).append(this);
        }
        return this;
      },
      wrapInner: function (t) {
        var e = P(t);
        return this.each(function (n) {
          var i = $(this),
            r = i.contents(),
            o = e ? t.call(this, n) : t;
          r.length ? r.wrapAll(o) : i.append(o);
        });
      },
      unwrap: function () {
        return (
          this.parent().each(function () {
            $(this).replaceWith($(this).children());
          }),
          this
        );
      },
      clone: function () {
        return this.map(function () {
          return this.cloneNode(!0);
        });
      },
      hide: function () {
        return this.css("display", "none");
      },
      toggle: function (e) {
        return this.each(function () {
          var n = $(this);
          (e === t ? "none" == n.css("display") : e) ? n.show() : n.hide();
        });
      },
      prev: function (t) {
        return $(this.pluck("previousElementSibling")).filter(t || "*");
      },
      next: function (t) {
        return $(this.pluck("nextElementSibling")).filter(t || "*");
      },
      html: function (t) {
        return 0 in arguments
          ? this.each(function (e) {
              var n = this.innerHTML;
              $(this).empty().append(X(this, t, e, n));
            })
          : 0 in this
          ? this[0].innerHTML
          : null;
      },
      text: function (t) {
        return 0 in arguments
          ? this.each(function (e) {
              var n = X(this, t, e, this.textContent);
              this.textContent = null == n ? "" : "" + n;
            })
          : 0 in this
          ? this[0].textContent
          : null;
      },
      attr: function (n, i) {
        var r;
        return "string" != typeof n || 1 in arguments
          ? this.each(function (t) {
              if (1 === this.nodeType)
                if (N(n)) for (e in n) _(this, e, n[e]);
                else _(this, n, X(this, i, t, this.getAttribute(n)));
            })
          : this.length && 1 === this[0].nodeType
          ? !(r = this[0].getAttribute(n)) && n in this[0]
            ? this[0][n]
            : r
          : t;
      },
      removeAttr: function (t) {
        return this.each(function () {
          1 === this.nodeType && _(this, t);
        });
      },
      prop: function (t, e) {
        return (
          (t = O[t] || t),
          1 in arguments
            ? this.each(function (n) {
                this[t] = X(this, e, n, this[t]);
              })
            : this[0] && this[0][t]
        );
      },
      data: function (e, n) {
        var i = "data-" + e.replace(m, "-$1").toLowerCase(),
          r = 1 in arguments ? this.attr(i, n) : this.attr(i);
        return null !== r ? q(r) : t;
      },
      val: function (t) {
        return 0 in arguments
          ? this.each(function (e) {
              this.value = X(this, t, e, this.value);
            })
          : this[0] &&
              (this[0].multiple
                ? $(this[0])
                    .find("option")
                    .filter(function () {
                      return this.selected;
                    })
                    .pluck("value")
                : this[0].value);
      },
      offset: function (t) {
        if (t)
          return this.each(function (e) {
            var n = $(this),
              i = X(this, t, e, n.offset()),
              r = n.offsetParent().offset(),
              o = { top: i.top - r.top, left: i.left - r.left };
            "static" == n.css("position") && (o.position = "relative"),
              n.css(o);
          });
        if (!this.length) return null;
        var e = this[0].getBoundingClientRect();
        return {
          left: e.left + window.pageXOffset,
          top: e.top + window.pageYOffset,
          width: Math.round(e.width),
          height: Math.round(e.height),
        };
      },
      css: function (t, n) {
        if (arguments.length < 2) {
          var r = this[0],
            o = getComputedStyle(r, "");
          if (!r) return;
          if ("string" == typeof t)
            return r.style[i(t)] || o.getPropertyValue(t);
          if (T(t)) {
            var a = {};
            return (
              $.each(T(t) ? t : [t], function (t, e) {
                a[e] = r.style[i(e)] || o.getPropertyValue(e);
              }),
              a
            );
          }
        }
        var s = "";
        if ("string" == k(t))
          n || 0 === n
            ? (s = A(t) + ":" + B(t, n))
            : this.each(function () {
                this.style.removeProperty(A(t));
              });
        else
          for (e in t)
            t[e] || 0 === t[e]
              ? (s += A(e) + ":" + B(e, t[e]) + ";")
              : this.each(function () {
                  this.style.removeProperty(A(e));
                });
        return this.each(function () {
          this.style.cssText += ";" + s;
        });
      },
      index: function (t) {
        return t
          ? this.indexOf($(t)[0])
          : this.parent().children().indexOf(this[0]);
      },
      hasClass: function (t) {
        return (
          !!t &&
          o.some.call(
            this,
            function (t) {
              return this.test(W(t));
            },
            z(t)
          )
        );
      },
      addClass: function (t) {
        return t
          ? this.each(function (e) {
              n = [];
              var i = W(this);
              X(this, t, e, i)
                .split(/\s+/g)
                .forEach(function (t) {
                  $(this).hasClass(t) || n.push(t);
                }, this),
                n.length && W(this, i + (i ? " " : "") + n.join(" "));
            })
          : this;
      },
      removeClass: function (e) {
        return this.each(function (i) {
          if (e === t) return W(this, "");
          (n = W(this)),
            X(this, e, i, n)
              .split(/\s+/g)
              .forEach(function (t) {
                n = n.replace(z(t), " ");
              }),
            W(this, n.trim());
        });
      },
      toggleClass: function (e, n) {
        return e
          ? this.each(function (i) {
              var r = $(this);
              X(this, e, i, W(this))
                .split(/\s+/g)
                .forEach(function (e) {
                  (n === t ? !r.hasClass(e) : n)
                    ? r.addClass(e)
                    : r.removeClass(e);
                });
            })
          : this;
      },
      scrollTop: function (e) {
        if (this.length) {
          var n = "scrollTop" in this[0];
          return e === t
            ? n
              ? this[0].scrollTop
              : this[0].pageYOffset
            : this.each(
                n
                  ? function () {
                      this.scrollTop = e;
                    }
                  : function () {
                      this.scrollTo(this.scrollX, e);
                    }
              );
        }
      },
      scrollLeft: function (e) {
        if (this.length) {
          var n = "scrollLeft" in this[0];
          return e === t
            ? n
              ? this[0].scrollLeft
              : this[0].pageXOffset
            : this.each(
                n
                  ? function () {
                      this.scrollLeft = e;
                    }
                  : function () {
                      this.scrollTo(e, this.scrollY);
                    }
              );
        }
      },
      position: function () {
        if (this.length) {
          var t = this[0],
            e = this.offsetParent(),
            n = this.offset(),
            i = g.test(e[0].nodeName) ? { top: 0, left: 0 } : e.offset();
          return (
            (n.top -= parseFloat($(t).css("margin-top")) || 0),
            (n.left -= parseFloat($(t).css("margin-left")) || 0),
            (i.top += parseFloat($(e[0]).css("border-top-width")) || 0),
            (i.left += parseFloat($(e[0]).css("border-left-width")) || 0),
            { top: n.top - i.top, left: n.left - i.left }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var t = this.offsetParent || c.body;
            t && !g.test(t.nodeName) && "static" == $(t).css("position");

          )
            t = t.offsetParent;
          return t;
        });
      },
    }),
    ($.fn.detach = $.fn.remove),
    ["width", "height"].forEach(function (e) {
      var n = e.replace(/./, function (t) {
        return t[0].toUpperCase();
      });
      $.fn[e] = function (i) {
        var r,
          o = this[0];
        return i === t
          ? H(o)
            ? o["inner" + n]
            : D(o)
            ? o.documentElement["scroll" + n]
            : (r = this.offset()) && r[e]
          : this.each(function (t) {
              (o = $(this)).css(e, X(this, i, t, o[e]()));
            });
      };
    }),
    ["after", "prepend", "before", "append"].forEach(function (t, e) {
      var n = e % 2;
      ($.fn[t] = function () {
        var t,
          i,
          r = $.map(arguments, function (e) {
            return "object" == (t = k(e)) || "array" == t || null == e
              ? e
              : j.fragment(e);
          }),
          o = this.length > 1;
        return r.length < 1
          ? this
          : this.each(function (t, a) {
              (i = n ? a : a.parentNode),
                (a =
                  0 == e
                    ? a.nextSibling
                    : 1 == e
                    ? a.firstChild
                    : 2 == e
                    ? a
                    : null);
              var s = $.contains(c.documentElement, i);
              r.forEach(function (t) {
                if (o) t = t.cloneNode(!0);
                else if (!i) return $(t).remove();
                i.insertBefore(t, a),
                  s &&
                    (function t(e, n) {
                      n(e);
                      for (var i = 0, r = e.childNodes.length; i < r; i++)
                        t(e.childNodes[i], n);
                    })(t, function (t) {
                      null == t.nodeName ||
                        "SCRIPT" !== t.nodeName.toUpperCase() ||
                        (t.type && "text/javascript" !== t.type) ||
                        t.src ||
                        window.eval.call(window, t.innerHTML);
                    });
              });
            });
      }),
        ($.fn[n ? t + "To" : "insert" + (e ? "Before" : "After")] = function (
          e
        ) {
          return $(e)[t](this), this;
        });
    }),
    (j.Z.prototype = $.fn),
    (j.uniq = r),
    (j.deserializeValue = q),
    ($.zepto = j),
    $
  );
})();
(window.Zepto = Zepto),
  void 0 === window.$ && (window.$ = Zepto),
  (function ($) {
    var t,
      e = 1,
      n = Array.prototype.slice,
      i = $.isFunction,
      r = function (t) {
        return "string" == typeof t;
      },
      o = {},
      a = {},
      s = "onfocusin" in window,
      c = { focus: "focusin", blur: "focusout" },
      u = { mouseenter: "mouseover", mouseleave: "mouseout" };
    function l(t) {
      return t._zid || (t._zid = e++);
    }
    function f(t, e, n, i) {
      if ((e = d(e)).ns)
        var r =
          ((a = e.ns),
          new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)"));
      var a;
      return (o[l(t)] || []).filter(function (t) {
        return (
          t &&
          (!e.e || t.e == e.e) &&
          (!e.ns || r.test(t.ns)) &&
          (!n || l(t.fn) === l(n)) &&
          (!i || t.sel == i)
        );
      });
    }
    function d(t) {
      var e = ("" + t).split(".");
      return { e: e[0], ns: e.slice(1).sort().join(" ") };
    }
    function h(t, e) {
      return (t.del && !s && t.e in c) || !!e;
    }
    function p(t) {
      return u[t] || (s && c[t]) || t;
    }
    function g(e, n, i, r, a, s, c) {
      var f = l(e),
        g = o[f] || (o[f] = []);
      n.split(/\s/).forEach(function (n) {
        if ("ready" == n) return $(document).ready(i);
        var o = d(n);
        (o.fn = i),
          (o.sel = a),
          o.e in u &&
            (i = function (t) {
              var e = t.relatedTarget;
              if (!e || (e !== this && !$.contains(this, e)))
                return o.fn.apply(this, arguments);
            }),
          (o.del = s);
        var l = s || i;
        (o.proxy = function (n) {
          if (!(n = x(n)).isImmediatePropagationStopped()) {
            n.data = r;
            var i = l.apply(e, n._args == t ? [n] : [n].concat(n._args));
            return !1 === i && (n.preventDefault(), n.stopPropagation()), i;
          }
        }),
          (o.i = g.length),
          g.push(o),
          "addEventListener" in e &&
            e.addEventListener(p(o.e), o.proxy, h(o, c));
      });
    }
    function m(t, e, n, i, r) {
      var a = l(t);
      (e || "").split(/\s/).forEach(function (e) {
        f(t, e, n, i).forEach(function (e) {
          delete o[a][e.i],
            "removeEventListener" in t &&
              t.removeEventListener(p(e.e), e.proxy, h(e, r));
        });
      });
    }
    (a.click = a.mousedown = a.mouseup = a.mousemove = "MouseEvents"),
      ($.event = { add: g, remove: m }),
      ($.proxy = function (t, e) {
        var o = 2 in arguments && n.call(arguments, 2);
        if (i(t)) {
          var a = function () {
            return t.apply(e, o ? o.concat(n.call(arguments)) : arguments);
          };
          return (a._zid = l(t)), a;
        }
        if (r(e))
          return o
            ? (o.unshift(t[e], t), $.proxy.apply(null, o))
            : $.proxy(t[e], t);
        throw new TypeError("expected function");
      }),
      ($.fn.bind = function (t, e, n) {
        return this.on(t, e, n);
      }),
      ($.fn.unbind = function (t, e) {
        return this.off(t, e);
      }),
      ($.fn.one = function (t, e, n, i) {
        return this.on(t, e, n, i, 1);
      });
    var v = function () {
        return !0;
      },
      y = function () {
        return !1;
      },
      w = /^([A-Z]|returnValue$|layer[XY]$)/,
      b = {
        preventDefault: "isDefaultPrevented",
        stopImmediatePropagation: "isImmediatePropagationStopped",
        stopPropagation: "isPropagationStopped",
      };
    function x(e, n) {
      return (
        (!n && e.isDefaultPrevented) ||
          (n || (n = e),
          $.each(b, function (t, i) {
            var r = n[t];
            (e[t] = function () {
              return (this[i] = v), r && r.apply(n, arguments);
            }),
              (e[i] = y);
          }),
          (n.defaultPrevented !== t
            ? n.defaultPrevented
            : "returnValue" in n
            ? !1 === n.returnValue
            : n.getPreventDefault && n.getPreventDefault()) &&
            (e.isDefaultPrevented = v)),
        e
      );
    }
    function C(e) {
      var n,
        i = { originalEvent: e };
      for (n in e) w.test(n) || e[n] === t || (i[n] = e[n]);
      return x(i, e);
    }
    ($.fn.delegate = function (t, e, n) {
      return this.on(e, t, n);
    }),
      ($.fn.undelegate = function (t, e, n) {
        return this.off(e, t, n);
      }),
      ($.fn.live = function (t, e) {
        return $(document.body).delegate(this.selector, t, e), this;
      }),
      ($.fn.die = function (t, e) {
        return $(document.body).undelegate(this.selector, t, e), this;
      }),
      ($.fn.on = function (e, o, a, s, c) {
        var u,
          l,
          f = this;
        return e && !r(e)
          ? ($.each(e, function (t, e) {
              f.on(t, o, a, e, c);
            }),
            f)
          : (r(o) || i(s) || !1 === s || ((s = a), (a = o), (o = t)),
            (i(a) || !1 === a) && ((s = a), (a = t)),
            !1 === s && (s = y),
            f.each(function (t, i) {
              c &&
                (u = function (t) {
                  return m(i, t.type, s), s.apply(this, arguments);
                }),
                o &&
                  (l = function (t) {
                    var e,
                      r = $(t.target).closest(o, i).get(0);
                    if (r && r !== i)
                      return (
                        (e = $.extend(C(t), {
                          currentTarget: r,
                          liveFired: i,
                        })),
                        (u || s).apply(r, [e].concat(n.call(arguments, 1)))
                      );
                  }),
                g(i, e, s, a, o, l || u);
            }));
      }),
      ($.fn.off = function (e, n, o) {
        var a = this;
        return e && !r(e)
          ? ($.each(e, function (t, e) {
              a.off(t, n, e);
            }),
            a)
          : (r(n) || i(o) || !1 === o || ((o = n), (n = t)),
            !1 === o && (o = y),
            a.each(function () {
              m(this, e, o, n);
            }));
      }),
      ($.fn.trigger = function (t, e) {
        return (
          ((t = r(t) || $.isPlainObject(t) ? $.Event(t) : x(t))._args = e),
          this.each(function () {
            "dispatchEvent" in this
              ? this.dispatchEvent(t)
              : $(this).triggerHandler(t, e);
          })
        );
      }),
      ($.fn.triggerHandler = function (t, e) {
        var n, i;
        return (
          this.each(function (o, a) {
            ((n = C(r(t) ? $.Event(t) : t))._args = e),
              (n.target = a),
              $.each(f(a, t.type || t), function (t, e) {
                if (((i = e.proxy(n)), n.isImmediatePropagationStopped()))
                  return !1;
              });
          }),
          i
        );
      }),
      "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error"
        .split(" ")
        .forEach(function (t) {
          $.fn[t] = function (e) {
            return e ? this.bind(t, e) : this.trigger(t);
          };
        }),
      ["focus", "blur"].forEach(function (t) {
        $.fn[t] = function (e) {
          return (
            e
              ? this.bind(t, e)
              : this.each(function () {
                  try {
                    this[t]();
                  } catch (t) {}
                }),
            this
          );
        };
      }),
      ($.Event = function (t, e) {
        r(t) || (t = (e = t).type);
        var n = document.createEvent(a[t] || "Events"),
          i = !0;
        if (e) for (var o in e) "bubbles" == o ? (i = !!e[o]) : (n[o] = e[o]);
        return n.initEvent(t, i, !0), x(n);
      });
  })(Zepto),
  (function ($) {
    var t,
      e,
      n = 0,
      i = window.document,
      r = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      o = /^(?:text|application)\/javascript/i,
      a = /^(?:text|application)\/xml/i,
      s = "application/json",
      c = "text/html",
      u = /^\s*$/;
    function l(t, e, n, r) {
      if (t.global)
        return (function (t, e, n) {
          var i = $.Event(e);
          return $(t).trigger(i, n), !i.isDefaultPrevented();
        })(e || i, n, r);
    }
    function f(t, e) {
      var n = e.context;
      if (
        !1 === e.beforeSend.call(n, t, e) ||
        !1 === l(e, n, "ajaxBeforeSend", [t, e])
      )
        return !1;
      l(e, n, "ajaxSend", [t, e]);
    }
    function d(t, e, n, i) {
      var r = n.context;
      n.success.call(r, t, "success", e),
        i && i.resolveWith(r, [t, "success", e]),
        l(n, r, "ajaxSuccess", [e, n, t]),
        p("success", e, n);
    }
    function h(t, e, n, i, r) {
      var o = i.context;
      i.error.call(o, n, e, t),
        r && r.rejectWith(o, [n, e, t]),
        l(i, o, "ajaxError", [n, i, t || e]),
        p(e, n, i);
    }
    function p(t, e, n) {
      var i = n.context;
      n.complete.call(i, e, t),
        l(n, i, "ajaxComplete", [e, n]),
        (function (t) {
          t.global && !--$.active && l(t, null, "ajaxStop");
        })(n);
    }
    function g() {}
    function m(t, e) {
      return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?");
    }
    function v(t, e, n, i) {
      return (
        $.isFunction(e) && ((i = n), (n = e), (e = void 0)),
        $.isFunction(n) || ((i = n), (n = void 0)),
        { url: t, data: e, success: n, dataType: i }
      );
    }
    ($.active = 0),
      ($.ajaxJSONP = function (t, e) {
        if (!("type" in t)) return $.ajax(t);
        var r,
          o,
          a = t.jsonpCallback,
          s = ($.isFunction(a) ? a() : a) || "jsonp" + ++n,
          c = i.createElement("script"),
          u = window[s],
          l = function (t) {
            $(c).triggerHandler("error", t || "abort");
          },
          p = { abort: l };
        return (
          e && e.promise(p),
          $(c).on("load error", function (n, i) {
            clearTimeout(o),
              $(c).off().remove(),
              "error" != n.type && r
                ? d(r[0], p, t, e)
                : h(null, i || "error", p, t, e),
              (window[s] = u),
              r && $.isFunction(u) && u(r[0]),
              (u = r = void 0);
          }),
          !1 === f(p, t)
            ? (l("abort"), p)
            : ((window[s] = function () {
                r = arguments;
              }),
              (c.src = t.url.replace(/\?(.+)=\?/, "?$1=" + s)),
              i.head.appendChild(c),
              t.timeout > 0 &&
                (o = setTimeout(function () {
                  l("timeout");
                }, t.timeout)),
              p)
        );
      }),
      ($.ajaxSettings = {
        type: "GET",
        beforeSend: g,
        success: g,
        error: g,
        complete: g,
        context: null,
        global: !0,
        xhr: function () {
          return new window.XMLHttpRequest();
        },
        accepts: {
          script:
            "text/javascript, application/javascript, application/x-javascript",
          json: s,
          xml: "application/xml, text/xml",
          html: c,
          text: "text/plain",
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0,
      }),
      ($.ajax = function (n) {
        var i = $.extend({}, n || {}),
          r = $.Deferred && $.Deferred();
        for (t in $.ajaxSettings) void 0 === i[t] && (i[t] = $.ajaxSettings[t]);
        !(function (t) {
          t.global && 0 == $.active++ && l(t, null, "ajaxStart");
        })(i),
          i.crossDomain ||
            (i.crossDomain =
              /^([\w-]+:)?\/\/([^\/]+)/.test(i.url) &&
              RegExp.$2 != window.location.host),
          i.url || (i.url = window.location.toString()),
          (function (t) {
            t.processData &&
              t.data &&
              "string" != $.type(t.data) &&
              (t.data = $.param(t.data, t.traditional)),
              !t.data ||
                (t.type && "GET" != t.type.toUpperCase()) ||
                ((t.url = m(t.url, t.data)), (t.data = void 0));
          })(i);
        var p = i.dataType,
          v = /\?.+=\?/.test(i.url);
        if (
          (v && (p = "jsonp"),
          (!1 !== i.cache &&
            ((n && !0 === n.cache) || ("script" != p && "jsonp" != p))) ||
            (i.url = m(i.url, "_=" + Date.now())),
          "jsonp" == p)
        )
          return (
            v ||
              (i.url = m(
                i.url,
                i.jsonp ? i.jsonp + "=?" : !1 === i.jsonp ? "" : "callback=?"
              )),
            $.ajaxJSONP(i, r)
          );
        var y,
          w = i.accepts[p],
          b = {},
          x = function (t, e) {
            b[t.toLowerCase()] = [t, e];
          },
          C = /^([\w-]+:)\/\//.test(i.url)
            ? RegExp.$1
            : window.location.protocol,
          S = i.xhr(),
          E = S.setRequestHeader;
        if (
          (r && r.promise(S),
          i.crossDomain || x("X-Requested-With", "XMLHttpRequest"),
          x("Accept", w || "*/*"),
          (w = i.mimeType || w) &&
            (w.indexOf(",") > -1 && (w = w.split(",", 2)[0]),
            S.overrideMimeType && S.overrideMimeType(w)),
          (i.contentType ||
            (!1 !== i.contentType &&
              i.data &&
              "GET" != i.type.toUpperCase())) &&
            x(
              "Content-Type",
              i.contentType || "application/x-www-form-urlencoded"
            ),
          i.headers)
        )
          for (e in i.headers) x(e, i.headers[e]);
        if (
          ((S.setRequestHeader = x),
          (S.onreadystatechange = function () {
            if (4 == S.readyState) {
              (S.onreadystatechange = g), clearTimeout(y);
              var t,
                e = !1;
              if (
                (S.status >= 200 && S.status < 300) ||
                304 == S.status ||
                (0 == S.status && "file:" == C)
              ) {
                (p =
                  p ||
                  ((n = i.mimeType || S.getResponseHeader("content-type")) &&
                    (n = n.split(";", 2)[0]),
                  (n &&
                    (n == c
                      ? "html"
                      : n == s
                      ? "json"
                      : o.test(n)
                      ? "script"
                      : a.test(n) && "xml")) ||
                    "text")),
                  (t = S.responseText);
                try {
                  "script" == p
                    ? (0, eval)(t)
                    : "xml" == p
                    ? (t = S.responseXML)
                    : "json" == p && (t = u.test(t) ? null : $.parseJSON(t));
                } catch (t) {
                  e = t;
                }
                e ? h(e, "parsererror", S, i, r) : d(t, S, i, r);
              } else
                h(S.statusText || null, S.status ? "error" : "abort", S, i, r);
            }
            var n;
          }),
          !1 === f(S, i))
        )
          return S.abort(), h(null, "abort", S, i, r), S;
        if (i.xhrFields) for (e in i.xhrFields) S[e] = i.xhrFields[e];
        var j = !("async" in i) || i.async;
        for (e in (S.open(i.type, i.url, j, i.username, i.password), b))
          E.apply(S, b[e]);
        return (
          i.timeout > 0 &&
            (y = setTimeout(function () {
              (S.onreadystatechange = g),
                S.abort(),
                h(null, "timeout", S, i, r);
            }, i.timeout)),
          S.send(i.data ? i.data : null),
          S
        );
      }),
      ($.get = function () {
        return $.ajax(v.apply(null, arguments));
      }),
      ($.post = function () {
        var t = v.apply(null, arguments);
        return (t.type = "POST"), $.ajax(t);
      }),
      ($.getJSON = function () {
        var t = v.apply(null, arguments);
        return (t.dataType = "json"), $.ajax(t);
      }),
      ($.fn.load = function (t, e, n) {
        if (!this.length) return this;
        var i,
          o = this,
          a = t.split(/\s/),
          s = v(t, e, n),
          c = s.success;
        return (
          a.length > 1 && ((s.url = a[0]), (i = a[1])),
          (s.success = function (t) {
            o.html(i ? $("<div>").html(t.replace(r, "")).find(i) : t),
              c && c.apply(o, arguments);
          }),
          $.ajax(s),
          this
        );
      });
    var y = encodeURIComponent;
    $.param = function (t, e) {
      var n = [];
      return (
        (n.add = function (t, e) {
          this.push(y(t) + "=" + y(e));
        }),
        (function t(e, n, i, r) {
          var o,
            a = $.isArray(n),
            s = $.isPlainObject(n);
          $.each(n, function (n, c) {
            (o = $.type(c)),
              r &&
                (n = i
                  ? r
                  : r +
                    "[" +
                    (s || "object" == o || "array" == o ? n : "") +
                    "]"),
              !r && a
                ? e.add(c.name, c.value)
                : "array" == o || (!i && "object" == o)
                ? t(e, c, i, n)
                : e.add(n, c);
          });
        })(n, t, e),
        n.join("&").replace(/%20/g, "+")
      );
    };
  })(Zepto),
  (function ($) {
    ($.fn.serializeArray = function () {
      var t,
        e = [];
      return (
        $([].slice.call(this.get(0).elements)).each(function () {
          var n = (t = $(this)).attr("type");
          "fieldset" != this.nodeName.toLowerCase() &&
            !this.disabled &&
            "submit" != n &&
            "reset" != n &&
            "button" != n &&
            (("radio" != n && "checkbox" != n) || this.checked) &&
            e.push({ name: t.attr("name"), value: t.val() });
        }),
        e
      );
    }),
      ($.fn.serialize = function () {
        var t = [];
        return (
          this.serializeArray().forEach(function (e) {
            t.push(
              encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value)
            );
          }),
          t.join("&")
        );
      }),
      ($.fn.submit = function (t) {
        if (t) this.bind("submit", t);
        else if (this.length) {
          var e = $.Event("submit");
          this.eq(0).trigger(e), e.isDefaultPrevented() || this.get(0).submit();
        }
        return this;
      });
  })(Zepto),
  (function ($) {
    "__proto__" in {} ||
      $.extend($.zepto, {
        Z: function (t, e) {
          return (
            (t = t || []),
            $.extend(t, $.fn),
            (t.selector = e || ""),
            (t.__Z = !0),
            t
          );
        },
        isZ: function (t) {
          return "array" === $.type(t) && "__Z" in t;
        },
      }),
      (window.Zepto = Zepto),
      "$" in window || (window.$ = Zepto),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return Zepto;
        });
    try {
      getComputedStyle(void 0);
    } catch (e) {
      var t = getComputedStyle;
      window.getComputedStyle = function (e) {
        try {
          return t(e);
        } catch (t) {
          return null;
        }
      };
    }
  })(Zepto),
  (function ($) {
    ($.Jcrop = function (t, e) {
      var n,
        i = $.extend({}, $.Jcrop.defaults),
        r = navigator.userAgent.toLowerCase(),
        o = /msie/.test(r),
        a = /msie [1-6]\./.test(r);
      function s(t) {
        return Math.round(t) + "px";
      }
      function c(t) {
        return i.baseClass + "-" + t;
      }
      function u(t) {
        var e = $(t).offset();
        return [e.left, e.top];
      }
      function l(t) {
        return [t.pageX - n[0], t.pageY - n[1]];
      }
      function f(t) {
        "object" != typeof t && (t = {}),
          (i = $.extend(i, t)),
          $.each(
            ["onChange", "onSelect", "onRelease", "onDblClick"],
            function (t, e) {
              "function" != typeof i[e] && (i[e] = function () {});
            }
          );
      }
      function d(t, e, r) {
        if (
          ((n = u(j)),
          Y.fdOBfddHKX("move" === t ? t : t + "-resize"),
          "move" === t)
        )
          return Y.activateHandlers(
            (function (t) {
              var e = t;
              return (
                G.watchKeys(),
                function (t) {
                  V.moveOffset([t[0] - e[0], t[1] - e[1]]), (e = t), Z.update();
                }
              );
            })(e),
            v,
            r
          );
        var o = V.getFixed(),
          a = h(t),
          s = V.getCorner(h(a));
        V.setPressed(V.getCorner(a)),
          V.setCurrent(s),
          Y.activateHandlers(
            (function (t, e) {
              return function (n) {
                if (i.aspectRatio)
                  switch (t) {
                    case "e":
                    case "w":
                      n[1] = e.y + 1;
                      break;
                    case "n":
                    case "s":
                      n[0] = e.x + 1;
                  }
                else
                  switch (t) {
                    case "e":
                    case "w":
                      n[1] = e.y2;
                      break;
                    case "n":
                    case "s":
                      n[0] = e.x2;
                  }
                V.setCurrent(n), Z.update();
              };
            })(t, o),
            v,
            r
          );
      }
      function h(t) {
        switch (t) {
          case "n":
            return "sw";
          case "s":
          case "e":
            return "nw";
          case "w":
            return "ne";
          case "ne":
            return "sw";
          case "nw":
            return "se";
          case "se":
            return "nw";
          case "sw":
            return "ne";
        }
      }
      function p(t) {
        return function (e) {
          return (
            !i.disabled &&
            !("move" === t && !i.allowMove) &&
            ((n = u(j)),
            (F = !0),
            d(t, l(e)),
            e.stopPropagation(),
            e.preventDefault(),
            !1)
          );
        };
      }
      function g(t, e, n) {
        var i = t.width(),
          r = t.height();
        i > e && e > 0 && ((i = e), (r = (e / t.width()) * t.height())),
          r > n && n > 0 && ((r = n), (i = (n / t.height()) * t.width())),
          (z = t.width() / i),
          (B = t.height() / r),
          t.width(i).height(r);
      }
      function m(t) {
        return {
          x: t.x * z,
          y: t.y * B,
          x2: t.x2 * z,
          y2: t.y2 * B,
          w: t.w * z,
          h: t.h * B,
        };
      }
      function v(t) {
        var e = V.getFixed();
        e.w > i.minSelect[0] && e.h > i.minSelect[1]
          ? (Z.enableHandles(), Z.done())
          : Z.release(),
          Y.fdOBfddHKX(i.allowSelect ? i.cursor : "default");
      }
      function y(t) {
        if (i.disabled) return !1;
        if (!i.allowSelect) return !1;
        (F = !0), (n = u(j)), Z.disableHandles(), Y.fdOBfddHKX(i.cursor);
        var e = l(t);
        return (
          V.setPressed(e),
          Z.update(),
          Y.activateHandlers(w, v, "touch" === t.type.substring(0, 5)),
          G.watchKeys(),
          t.stopPropagation(),
          t.preventDefault(),
          !1
        );
      }
      function w(t) {
        V.setCurrent(t), Z.update();
      }
      function b() {
        var t = $("<div></div>").addClass(c("tracker"));
        return o && t.css({ opacity: 0, backgroundColor: "white" }), t;
      }
      "object" != typeof t && (t = $(t)[0]),
        "object" != typeof e && (e = {}),
        f(e);
      var x = {
          border: "none",
          visibility: "visible",
          margin: 0,
          padding: 0,
          position: "absolute",
          top: 0,
          left: 0,
        },
        C = $(t),
        S = !0;
      if ("IMG" == t.tagName) {
        if (0 != C[0].width && 0 != C[0].height)
          C.width(C[0].width), C.height(C[0].height);
        else {
          var E = new Image();
          (E.src = C[0].src), C.width(E.width), C.height(E.height);
        }
        var j = C.clone().removeAttr("id").css(x).show();
        j.width(C.width()), j.height(C.height()), C.after(j).hide();
      } else
        (j = C.css(x).show()), (S = !1), null === i.shade && (i.shade = !0);
      g(j, i.boxWidth, i.boxHeight);
      var M = j.width(),
        O = j.height(),
        T = $("<div />")
          .width(M)
          .height(O)
          .addClass(c("holder"))
          .css({ position: "relative", backgroundColor: i.bgColor })
          .insertAfter(C)
          .append(j);
      i.addClass && T.addClass(i.addClass);
      var k = $("<div />"),
        P = $("<div />")
          .width("100%")
          .height("100%")
          .css({ zIndex: 310, position: "absolute", overflow: "hidden" }),
        H = $("<div />").width("100%").height("100%").css("zIndex", 320),
        D = $("<div />")
          .css({ position: "absolute", zIndex: 600 })
          .dblclick(function () {
            var t = V.getFixed();
            i.onDblClick.call(rt, t);
          })
          .insertBefore(j)
          .append(P, H);
      S &&
        ((k = $("<img />")
          .attr("src", j.attr("src"))
          .css(x)
          .width(M)
          .height(O)),
        P.append(k)),
        a && D.css({ overflowY: "hidden" });
      var N,
        L,
        R,
        A,
        z,
        B,
        F,
        I,
        X = i.boundary,
        _ = b()
          .width(M + 2 * X)
          .height(O + 2 * X)
          .css({ position: "absolute", top: s(-X), left: s(-X), zIndex: 290 })
          .mousedown(y),
        W = i.bgColor,
        q = i.bgOpacity;
      n = u(j);
      var J = (function () {
          function t() {
            var t,
              e = {},
              n = ["touchstart", "touchmove", "touchend"],
              i = document.createElement("div");
            try {
              for (t = 0; t < n.length; t++) {
                var r = n[t],
                  o = (r = "on" + r) in i;
                o ||
                  (i.setAttribute(r, "return;"),
                  (o = "function" == typeof i[r])),
                  (e[n[t]] = o);
              }
              return e.touchstart && e.touchend && e.touchmove;
            } catch (t) {
              return !1;
            }
          }
          return {
            createDragger: function (t) {
              return function (e) {
                return (
                  !i.disabled &&
                  !("move" === t && !i.allowMove) &&
                  ((n = u(j)),
                  (F = !0),
                  d(t, l(J.cfilter(e)), !0),
                  e.stopPropagation(),
                  e.preventDefault(),
                  !1)
                );
              };
            },
            newSelection: function (t) {
              return y(J.cfilter(t));
            },
            cfilter: function (t) {
              return (
                (t.pageX = t.originalEvent.changedTouches[0].pageX),
                (t.pageY = t.originalEvent.changedTouches[0].pageY),
                t
              );
            },
            isSupported: t,
            support:
              !0 === i.touchSupport || !1 === i.touchSupport
                ? i.touchSupport
                : t(),
          };
        })(),
        V = (function () {
          var t,
            e,
            n = 0,
            r = 0,
            o = 0,
            a = 0;
          function s() {
            if (!i.aspectRatio)
              return (function () {
                var t,
                  e = o - n,
                  i = a - r;
                N && Math.abs(e) > N && (o = e > 0 ? n + N : n - N);
                L && Math.abs(i) > L && (a = i > 0 ? r + L : r - L);
                A / B &&
                  Math.abs(i) < A / B &&
                  (a = i > 0 ? r + A / B : r - A / B);
                R / z &&
                  Math.abs(e) < R / z &&
                  (o = e > 0 ? n + R / z : n - R / z);
                n < 0 && ((o -= n), (n -= n));
                r < 0 && ((a -= r), (r -= r));
                o < 0 && ((n -= o), (o -= o));
                a < 0 && ((r -= a), (a -= a));
                o > M && ((n -= t = o - M), (o -= t));
                a > O && ((r -= t = a - O), (a -= t));
                n > M && ((a -= t = n - O), (r -= t));
                r > O && ((a -= t = r - O), (r -= t));
                return l(u(n, r, o, a));
              })();
            var t,
              e,
              s,
              c,
              f = i.aspectRatio,
              d = i.minSize[0] / z,
              h = i.maxSize[0] / z,
              p = i.maxSize[1] / B,
              g = o - n,
              m = a - r,
              v = Math.abs(g),
              y = Math.abs(m);
            return (
              0 === h && (h = 10 * M),
              0 === p && (p = 10 * O),
              v / y < f
                ? ((e = a),
                  (s = y * f),
                  (t = g < 0 ? n - s : s + n) < 0
                    ? ((t = 0),
                      (c = Math.abs((t - n) / f)),
                      (e = m < 0 ? r - c : c + r))
                    : t > M &&
                      ((t = M),
                      (c = Math.abs((t - n) / f)),
                      (e = m < 0 ? r - c : c + r)))
                : ((t = o),
                  (c = v / f),
                  (e = m < 0 ? r - c : r + c) < 0
                    ? ((e = 0),
                      (s = Math.abs((e - r) * f)),
                      (t = g < 0 ? n - s : s + n))
                    : e > O &&
                      ((e = O),
                      (s = Math.abs(e - r) * f),
                      (t = g < 0 ? n - s : s + n))),
              t > n
                ? (t - n < d ? (t = n + d) : t - n > h && (t = n + h),
                  (e = e > r ? r + (t - n) / f : r - (t - n) / f))
                : t < n &&
                  (n - t < d ? (t = n - d) : n - t > h && (t = n - h),
                  (e = e > r ? r + (n - t) / f : r - (n - t) / f)),
              t < 0 ? ((n -= t), (t = 0)) : t > M && ((n -= t - M), (t = M)),
              e < 0 ? ((r -= e), (e = 0)) : e > O && ((r -= e - O), (e = O)),
              l(u(n, r, t, e))
            );
          }
          function c(t) {
            return (
              t[0] < 0 && (t[0] = 0),
              t[1] < 0 && (t[1] = 0),
              t[0] > M && (t[0] = M),
              t[1] > O && (t[1] = O),
              [Math.round(t[0]), Math.round(t[1])]
            );
          }
          function u(t, e, n, i) {
            var r = t,
              o = n,
              a = e,
              s = i;
            return (
              n < t && ((r = n), (o = t)),
              i < e && ((a = i), (s = e)),
              [r, a, o, s]
            );
          }
          function l(t) {
            return {
              x: t[0],
              y: t[1],
              x2: t[2],
              y2: t[3],
              w: t[2] - t[0],
              h: t[3] - t[1],
            };
          }
          return {
            flipCoords: u,
            setPressed: function (t) {
              (t = c(t)), (o = n = t[0]), (a = r = t[1]);
            },
            setCurrent: function (n) {
              (n = c(n)),
                (t = n[0] - o),
                (e = n[1] - a),
                (o = n[0]),
                (a = n[1]);
            },
            getOffset: function () {
              return [t, e];
            },
            moveOffset: function (t) {
              var e = t[0],
                i = t[1];
              0 > n + e && (e -= e + n),
                0 > r + i && (i -= i + r),
                O < a + i && (i += O - (a + i)),
                M < o + e && (e += M - (o + e)),
                (n += e),
                (o += e),
                (r += i),
                (a += i);
            },
            getCorner: function (t) {
              var e = s();
              switch (t) {
                case "ne":
                  return [e.x2, e.y];
                case "nw":
                  return [e.x, e.y];
                case "se":
                  return [e.x2, e.y2];
                case "sw":
                  return [e.x, e.y2];
              }
            },
            getFixed: s,
          };
        })(),
        U = (function () {
          var t = !1,
            e = $("<div />").css({
              position: "absolute",
              zIndex: 240,
              opacity: 0,
            }),
            n = {
              top: a(),
              left: a().height(O),
              right: a().height(O),
              bottom: a(),
            };
          function r() {
            return o(V.getFixed());
          }
          function o(t) {
            n.top.css({ left: s(t.x), width: s(t.w), height: s(t.y) }),
              n.bottom.css({
                top: s(t.y2),
                left: s(t.x),
                width: s(t.w),
                height: s(O - t.y2),
              }),
              n.right.css({ left: s(t.x2), width: s(M - t.x2) }),
              n.left.css({ width: s(t.x) });
          }
          function a() {
            return $("<div />")
              .css({
                position: "absolute",
                backgroundColor: i.shadeColor || i.bgColor,
              })
              .appendTo(e);
          }
          function c() {
            t ||
              ((t = !0),
              e.insertBefore(j),
              r(),
              Z.setBgOpacity(1, 0, 1),
              k.hide(),
              u(i.shadeColor || i.bgColor, 1),
              Z.isAwake() ? f(i.bgOpacity, 1) : f(1, 1));
          }
          function u(t, e) {
            nt(d(), t, e);
          }
          function l() {
            t &&
              (e.remove(),
              k.show(),
              (t = !1),
              Z.isAwake()
                ? Z.setBgOpacity(i.bgOpacity, 1, 1)
                : (Z.setBgOpacity(1, 1, 1), Z.disableHandles()),
              nt(T, 0, 1));
          }
          function f(n, r) {
            t &&
              (i.bgFade && !r
                ? e.animate(
                    { opacity: 1 - n },
                    { queue: !1, duration: i.fadeTime }
                  )
                : e.css({ opacity: 1 - n }));
          }
          function d() {
            return e.children();
          }
          return {
            update: r,
            updateRaw: o,
            getShades: d,
            setBgColor: u,
            enable: c,
            disable: l,
            VNIIVmOpRN: function (t, e) {
              n.left.css({ height: s(e) }), n.right.css({ height: s(e) });
            },
            refresh: function () {
              i.shade ? c() : l(), Z.isAwake() && f(i.bgOpacity);
            },
            opacity: f,
          };
        })(),
        Z = (function () {
          var t,
            e = 370,
            n = {},
            r = {},
            o = {},
            a = !1;
          function u(t, e) {
            var n = $("<div />")
              .mousedown(p(t))
              .css({ cursor: t + "-resize", position: "absolute", zIndex: e })
              .addClass("ord-" + t);
            return (
              J.support && n.bind("touchstart.jcrop", J.createDragger(t)),
              H.append(n),
              n
            );
          }
          function l() {
            var t = V.getFixed();
            V.setPressed([t.x, t.y]), V.setCurrent([t.x2, t.y2]), f();
          }
          function f(e) {
            if (t) return d(e);
          }
          function d(e) {
            var n,
              r,
              o,
              a,
              c = V.getFixed();
            (n = c.w),
              (r = c.h),
              D.width(Math.round(n)).height(Math.round(r)),
              (o = c.x),
              (a = c.y),
              i.shade || k.css({ top: s(-a), left: s(-o) }),
              D.css({ top: s(a), left: s(o) }),
              i.shade && U.updateRaw(c),
              t ||
                (function () {
                  D.show(), i.shade ? U.opacity(q) : h(q, !0);
                  t = !0;
                })(),
              e ? i.onSelect.call(rt, m(c)) : i.onChange.call(rt, m(c));
          }
          function h(e, n, r) {
            (t || n) &&
              (i.bgFade && !r
                ? j.animate({ opacity: e }, { queue: !1, duration: i.fadeTime })
                : j.css("opacity", e));
          }
          function g() {
            if (((a = !0), i.allowResize)) return H.show(), !0;
          }
          function v() {
            (a = !1), H.hide();
          }
          function y(t) {
            t ? ((I = !0), v()) : ((I = !1), g());
          }
          i.dragEdges &&
            $.isArray(i.createDragbars) &&
            (function (t) {
              var n;
              for (n = 0; n < t.length; n++)
                o[t[n]] = u(t[n], e++).addClass("jcrop-dragbar");
            })(i.createDragbars),
            $.isArray(i.createHandles) &&
              (function (t) {
                var n, o, a, s;
                for (n = 0; n < t.length; n++)
                  r[t[n]] =
                    ((o = t[n]),
                    (s = void 0),
                    (a = i.handleSize),
                    (s = u(o, e++)
                      .css({ opacity: i.handleOpacity })
                      .addClass(c("handle"))),
                    a && s.width(a).height(a),
                    s);
              })(i.createHandles),
            i.drawBorders &&
              $.isArray(i.createBorders) &&
              (function (t) {
                var e, r, o, a;
                for (r = 0; r < t.length; r++) {
                  switch (t[r]) {
                    case "n":
                      e = "hline";
                      break;
                    case "s":
                      e = "hline bottom";
                      break;
                    case "e":
                      e = "vline right";
                      break;
                    case "w":
                      e = "vline";
                  }
                  n[t[r]] =
                    ((o = e),
                    (a = $("<div />")
                      .css({ position: "absolute", opacity: i.borderOpacity })
                      .addClass(c(o))),
                    P.append(a),
                    a);
                }
              })(i.createBorders),
            $(document).bind("touchstart.jcrop-ios", function (t) {
              $(t.currentTarget).hasClass("jcrop-tracker") &&
                t.stopPropagation();
            });
          var w = b()
            .mousedown(p("move"))
            .css({ cursor: "move", position: "absolute", zIndex: 360 });
          return (
            J.support && w.bind("touchstart.jcrop", J.createDragger("move")),
            P.append(w),
            v(),
            {
              updateVisible: f,
              update: d,
              release: function () {
                v(),
                  D.hide(),
                  i.shade ? U.opacity(1) : h(1),
                  (t = !1),
                  i.onRelease.call(rt);
              },
              refresh: l,
              isAwake: function () {
                return t;
              },
              fdOBfddHKX: function (t) {
                w.css("cursor", t);
              },
              enableHandles: g,
              enableOnly: function () {
                a = !0;
              },
              showHandles: function () {
                a && H.show();
              },
              disableHandles: v,
              animMode: y,
              setBgOpacity: h,
              done: function () {
                y(!1), l();
              },
            }
          );
        })(),
        Y = (function () {
          var t = function () {},
            e = function () {},
            n = i.trackDocument;
          function r(e) {
            return t(l(e)), !1;
          }
          function o(n) {
            return (
              n.preventDefault(),
              n.stopPropagation(),
              F &&
                ((F = !1),
                e(l(n)),
                Z.isAwake() && i.onSelect.call(rt, m(V.getFixed())),
                _.css({ zIndex: 290 }),
                $(document).unbind(".jcrop"),
                (t = function () {}),
                (e = function () {})),
              !1
            );
          }
          function a(e) {
            return t(l(J.cfilter(e))), !1;
          }
          function s(t) {
            return o(J.cfilter(t));
          }
          return (
            n || _.mousemove(r).mouseup(o).mouseout(o),
            j.before(_),
            {
              activateHandlers: function (i, c, u) {
                return (
                  (F = !0),
                  (t = i),
                  (e = c),
                  (function (t) {
                    _.css({ zIndex: 450 }),
                      t
                        ? $(document)
                            .bind("touchmove.jcrop", a)
                            .bind("touchend.jcrop", s)
                        : n &&
                          $(document)
                            .bind("mousemove.jcrop", r)
                            .bind("mouseup.jcrop", o);
                  })(u),
                  !1
                );
              },
              fdOBfddHKX: function (t) {
                _.css("cursor", t);
              },
            }
          );
        })(),
        G = (function () {
          var t = $('<input type="radio" />')
              .css({ position: "fixed", left: "-120px", width: "12px" })
              .addClass("jcrop-keymgr"),
            e = $("<div />")
              .css({ position: "absolute", overflow: "hidden" })
              .append(t);
          function n(t, e, n) {
            i.allowMove && (V.moveOffset([e, n]), Z.updateVisible(!0)),
              t.preventDefault(),
              t.stopPropagation();
          }
          return (
            i.keySupport &&
              (t
                .keydown(function (t) {
                  if (t.ctrlKey || t.metaKey) return !0;
                  var e = !!t.shiftKey ? 10 : 1;
                  switch (t.keyCode) {
                    case 37:
                      n(t, -e, 0);
                      break;
                    case 39:
                      n(t, e, 0);
                      break;
                    case 38:
                      n(t, 0, -e);
                      break;
                    case 40:
                      n(t, 0, e);
                      break;
                    case 27:
                      i.allowSelect && Z.release();
                      break;
                    case 9:
                      return !0;
                  }
                  return !1;
                })
                .blur(function (e) {
                  t.hide();
                }),
              a || !i.fixedSupport
                ? (t.css({ position: "absolute", left: "-20px" }),
                  e.append(t).insertBefore(j))
                : t.insertBefore(j)),
            {
              watchKeys: function () {
                i.keySupport && (t.show(), t.focus());
              },
            }
          );
        })();
      function K(t) {
        Q([t[0] / z, t[1] / B, t[2] / z, t[3] / B]),
          i.onSelect.call(rt, m(V.getFixed())),
          Z.enableHandles();
      }
      function Q(t) {
        V.setPressed([t[0], t[1]]), V.setCurrent([t[2], t[3]]), Z.update();
      }
      function tt() {
        (i.disabled = !0),
          Z.disableHandles(),
          Z.fdOBfddHKX("default"),
          Y.fdOBfddHKX("default");
      }
      function et() {
        (i.disabled = !1), it();
      }
      function nt(t, e, n) {
        var r = e || i.bgColor;
        i.bgFade &&
        $.fx.step.hasOwnProperty("backgroundColor") &&
        i.fadeTime &&
        !n
          ? t.animate(
              { backgroundColor: r },
              { queue: !1, duration: i.fadeTime }
            )
          : t.css("backgroundColor", r);
      }
      function it(t) {
        i.allowResize
          ? t
            ? Z.enableOnly()
            : Z.enableHandles()
          : Z.disableHandles(),
          Y.fdOBfddHKX(i.allowSelect ? i.cursor : "default"),
          Z.fdOBfddHKX(i.allowMove ? "move" : "default"),
          i.hasOwnProperty("trueSize") &&
            ((z = i.trueSize[0] / M), (B = i.trueSize[1] / O)),
          i.hasOwnProperty("setSelect") &&
            (K(i.setSelect), Z.done(), delete i.setSelect),
          U.refresh(),
          i.bgColor != W &&
            (nt(
              i.shade ? U.getShades() : T,
              (i.shade && i.shadeColor) || i.bgColor
            ),
            (W = i.bgColor)),
          q != i.bgOpacity &&
            ((q = i.bgOpacity), i.shade ? U.refresh() : Z.setBgOpacity(q)),
          (N = i.maxSize[0] || 0),
          (L = i.maxSize[1] || 0),
          (R = i.minSize[0] || 0),
          (A = i.minSize[1] || 0),
          i.hasOwnProperty("outerImage") &&
            (j.attr("src", i.outerImage), delete i.outerImage),
          Z.refresh();
      }
      J.support && _.bind("touchstart.jcrop", J.newSelection), H.hide(), it(!0);
      var rt = {
        QqzVLwGWfp: function (t, e) {
          Z.release(), tt();
          var n = new Image();
          (n.onload = function () {
            var r = n.width,
              o = n.height,
              a = i.boxWidth,
              s = i.boxHeight;
            j.width(r).height(o),
              j.attr("src", t),
              k.attr("src", t),
              g(j, a, s),
              (M = j.width()),
              (O = j.height()),
              k.width(M).height(O),
              _.width(M + 2 * X).height(O + 2 * X),
              T.width(M).height(O),
              U.VNIIVmOpRN(M, O),
              et(),
              "function" == typeof e && e.call(rt);
          }),
            (n.src = t);
        },
        animateTo: function (t, e) {
          var n = t[0] / z,
            r = t[1] / B,
            o = t[2] / z,
            a = t[3] / B;
          if (!I) {
            var s = V.flipCoords(n, r, o, a),
              c = V.getFixed(),
              u = [c.x, c.y, c.x2, c.y2],
              l = u,
              f = i.animationDelay,
              d = s[0] - u[0],
              h = s[1] - u[1],
              p = s[2] - u[2],
              g = s[3] - u[3],
              m = 0,
              v = i.swingSpeed;
            (n = l[0]), (r = l[1]), (o = l[2]), (a = l[3]), Z.animMode(!0);
            var y = function () {
              (m += (100 - m) / v),
                (l[0] = Math.round(n + (m / 100) * d)),
                (l[1] = Math.round(r + (m / 100) * h)),
                (l[2] = Math.round(o + (m / 100) * p)),
                (l[3] = Math.round(a + (m / 100) * g)),
                m >= 99.8 && (m = 100),
                m < 100
                  ? (Q(l), w())
                  : (Z.done(),
                    Z.animMode(!1),
                    "function" == typeof e && e.call(rt));
            };
            w();
          }
          function w() {
            window.setTimeout(y, f);
          }
        },
        setSelect: K,
        setOptions: function (t) {
          f(t), it();
        },
        tellSelect: function () {
          return m(V.getFixed());
        },
        tellScaled: function () {
          return V.getFixed();
        },
        setClass: function (t) {
          T.removeClass().addClass(c("holder")).addClass(t);
        },
        disable: tt,
        enable: et,
        cancel: function () {
          Z.done(), Y.activateHandlers(null, null);
        },
        release: Z.release,
        destroy: function () {
          T.remove(),
            C.show(),
            C.css("visibility", "visible"),
            $(t).removeData("Jcrop");
        },
        focus: G.watchKeys,
        getBounds: function () {
          return [M * z, O * B];
        },
        getWidgetSize: function () {
          return [M, O];
        },
        getScaleFactor: function () {
          return [z, B];
        },
        kqTFFGTdxB: function () {
          return i;
        },
        ui: { holder: T, selection: D },
      };
      return (
        o &&
          T.bind("selectstart", function () {
            return !1;
          }),
        C.data("Jcrop", rt),
        rt
      );
    }),
      ($.fn.Jcrop = function (t, e) {
        var n;
        return (
          this.each(function () {
            if ($(this).data("Jcrop")) {
              if ("api" === t) return $(this).data("Jcrop");
              $(this).data("Jcrop").setOptions(t);
            } else
              "IMG" == this.tagName
                ? $.Jcrop.Loader(this, function () {
                    $(this).css({
                      display: "WBDaXrGDxP",
                      visibility: "hidden",
                    }),
                      (n = $.Jcrop(this, t)),
                      $.isFunction(e) && e.call(n);
                  })
                : ($(this).css({ display: "WBDaXrGDxP", visibility: "hidden" }),
                  (n = $.Jcrop(this, t)),
                  $.isFunction(e) && e.call(n));
          }),
          this
        );
      }),
      ($.Jcrop.Loader = function (t, e, n) {
        var i = $(t),
          r = i[0];
        i
          .bind("load.jcloader", function t() {
            r.complete
              ? (i.unbind(".jcloader"), $.isFunction(e) && e.call(r))
              : window.setTimeout(t, 50);
          })
          .bind("error.jcloader", function (t) {
            i.unbind(".jcloader"), $.isFunction(n) && n.call(r);
          }),
          r.complete && $.isFunction(e) && (i.unbind(".jcloader"), e.call(r));
      }),
      ($.Jcrop.defaults = {
        allowSelect: !0,
        allowMove: !0,
        allowResize: !0,
        trackDocument: !0,
        baseClass: "jcrop",
        addClass: null,
        bgColor: "black",
        bgOpacity: 0.6,
        bgFade: !1,
        borderOpacity: 0.4,
        handleOpacity: 0.5,
        handleSize: null,
        aspectRatio: 0,
        keySupport: !0,
        createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
        createDragbars: ["n", "s", "e", "w"],
        createBorders: ["n", "s", "e", "w"],
        drawBorders: !0,
        dragEdges: !0,
        fixedSupport: !0,
        touchSupport: null,
        shade: null,
        boxWidth: 0,
        boxHeight: 0,
        boundary: 2,
        fadeTime: 400,
        animationDelay: 20,
        swingSpeed: 3,
        minSelect: [0, 0],
        maxSize: [0, 0],
        minSize: [0, 0],
        onChange: function () {},
        onSelect: function () {},
        onDblClick: function () {},
        onRelease: function () {},
      });
  })($),
  $(function ($) {
    window.addEventListener("contextmenu", function (t) {
      t.preventDefault();
    }),
      window.addEventListener("keydown", function (t) {
        27 === t.keyCode && window.close();
      }),
      window.addEventListener("mousedown", function (t) {
        2 == t.which && t.preventDefault();
      }),
      window.addEventListener(
        "blur",
        function () {
          window.close();
        },
        !1
      ),
      chrome.runtime.sendMessage(
        {
          msg: "capture:init",
          data: {
            windowInnerWidth: window.innerWidth,
            windowInnerHeight: window.innerHeight,
          },
        },
        function (t) {
          var e = document.getElementById("capture");
          (window.reductionRatio = t.reductionRatio),
            (e.src = t.imageUrl),
            (e.width = t.imageWidth),
            (e.height = t.imageHeight),
            t.imageWidth < window.innerWidth &&
              $("div.LyWrap").css({
                left: (window.innerWidth - t.imageWidth) / 2,
                position: "absolute",
              }),
            t.imageHeight < window.innerHeight &&
              $("div.LyWrap").css({
                top: (window.innerHeight - t.imageHeight) / 2,
                position: "absolute",
              });
          var n = $(".MdVLine"),
            i = $(".MdHLine"),
            r = $(".MdTxt01"),
            o = $(".MdBtnSet"),
            a = ($("#capture"), null);
          r.css("left", -999), o.css("left", -999);
          var s = $(".LyWrap").offset();
          t.XLT &&
            (o.find(".MdBtn01Cancel").attr("title", t.XLT.CANCEL),
            o.find(".MdBtn01Save").attr("title", t.XLT.SAVE),
            o.find(".MdBtn01Send").attr("title", t.XLT.SEND));
          var c = function (t) {
              var e = new RegExp("[?&]" + t + "=([^&]*)").exec(
                window.location.search
              );
              return e && decodeURIComponent(e[1].replace(/\+/g, " "));
            },
            u = function (t) {
              return 1 == String(t).length ? "0" + t : t;
            },
            l = function (t) {
              var e,
                n,
                i = h;
              e = (n = document.createElement("canvas")).getContext("2d");
              var r = 1;
              void 0 !== window.reductionRatio && (r = window.reductionRatio),
                (n.width = i.w / r),
                (n.height = i.h / r),
                e.drawImage(
                  $("#capture")[0],
                  i.x / r,
                  i.y / r,
                  i.w / r,
                  i.h / r,
                  0,
                  0,
                  i.w / r,
                  i.h / r
                );
              var o = new XMLHttpRequest();
              o.open("GET", n.toDataURL("image/jpeg", 1)),
                (o.responseType = "arraybuffer"),
                (o.onload = function () {
                  var e = new Blob([o.response], { type: "image/png" });
                  t(e);
                }),
                o.send();
            },
            f = null,
            d = null,
            h = null;
          "true" !== c("isVisibleSend") && $(".MdBtn01Send").hide();
          var p = c("whereToSend");
          $("img").css({ opacity: 0.6 }),
            $(document)
              .off()
              .on("mousemove", function (t) {
                (f = t), n.css("left", t.clientX), i.css("top", t.clientY);
              }),
            $(o)
              .off()
              .on("click", function (t) {
                switch ($(t.target).attr("class")) {
                  case "MdBtn01Save":
                    "note" == p
                      ? chrome.runtime.sendMessage({
                          msg: "sendGA",
                          data: ["Memos", "Edit Memo", "capture_save"],
                        })
                      : "message" == p &&
                        chrome.runtime.sendMessage({
                          msg: "sendGA",
                          data: ["Chatroom", "capture", "capture_save"],
                        }),
                      l(function (t) {
                        var e = new Date(),
                          n =
                            "line_" +
                            e.getUTCFullYear() +
                            u(e.getUTCMonth() + 1) +
                            u(e.getUTCDate()) +
                            "_" +
                            u(e.getHours()) +
                            u(e.getMinutes()) +
                            u(e.getSeconds()) +
                            ".png",
                          i = URL.createObjectURL(t);
                        chrome.downloads.download(
                          { url: i, filename: n },
                          function (t) {
                            URL.revokeObjectURL(i);
                          }
                        ),
                          setTimeout(function () {
                            window.close();
                          }, 2e3);
                      }),
                      t.stopPropagation(),
                      t.stopImmediatePropagation();
                    break;
                  case "MdBtn01Send":
                    "note" == p
                      ? chrome.runtime.sendMessage({
                          msg: "sendGA",
                          data: ["Memos", "Edit Memo", "capture_send"],
                        })
                      : "message" == p &&
                        chrome.runtime.sendMessage({
                          msg: "sendGA",
                          data: ["Chatroom", "capture", "capture_send"],
                        }),
                      l(function (t) {
                        var e = new window.FileReader();
                        e.readAsDataURL(t),
                          (e.onloadend = function () {
                            var t = e.result;
                            chrome.runtime.sendMessage(
                              { msg: "completeCapture", data: t },
                              function (t) {}
                            ),
                              window.close();
                          });
                      }),
                      t.stopPropagation(),
                      t.stopImmediatePropagation();
                    break;
                  case "MdBtn01Cancel":
                    "note" == p
                      ? chrome.runtime.sendMessage({
                          msg: "sendGA",
                          data: ["Memos", "Edit Memo", "capture_cancel"],
                        })
                      : "message" == p &&
                        chrome.runtime.sendMessage({
                          msg: "sendGA",
                          data: ["Chatroom", "capture", "capture_cancel"],
                        }),
                      o.hide(),
                      t.stopPropagation(),
                      t.stopImmediatePropagation(),
                      d.release();
                }
              }),
            $("#capture").Jcrop(
              {
                onChange: function (t) {
                  if (null != f) {
                    "block" != r.css("display") && r.show();
                    var e =
                        Math.abs(t.x - f.clientX) > Math.abs(t.x2 - f.clientX)
                          ? t.x2
                          : t.x - 60,
                      n =
                        Math.abs(t.y - f.clientY) > Math.abs(t.y2 - f.clientY)
                          ? t.y2
                          : t.y;
                    r
                      .css({ left: s.left + e, top: s.top + (n - 20) })
                      .text(t.w + " / " + t.h),
                      o.hide(),
                      null === a && (a = $(".jcrop-holder > div  img")),
                      a.css({ opacity: 1 });
                  }
                },
                onSelect: function (t) {
                  if (null != f) {
                    var e = window.innerWidth,
                      n = window.innerHeight;
                    (h = t), r.hide();
                    var i = 0,
                      s = 0,
                      c = f.clientX < t.x2 && 0 <= t.x - 126,
                      u = f.clientY < t.y2 && 0 <= t.y - 36,
                      l = f.clientX > t.x && f.clientX + 126 < e,
                      d = f.clientY > t.y && f.clientY + 36 + 20 < n,
                      p = f.clientX <= t.x && f.clientX < t.x2,
                      g = f.clientY <= t.y && f.clientY < t.y2;
                    p && g && c && u
                      ? ((i = t.x), (s = t.y - 36 - 2))
                      : p && g && c && !u
                      ? ((i = t.x - 126), (s = t.y + 2))
                      : p && g && !c && !u
                      ? ((i = t.x), (s = t.y + 2))
                      : p && g && !c && u
                      ? ((i = t.x), (s = t.y - 36 - 2))
                      : p && !g && c && d
                      ? ((i = t.x), (s = t.y2 + 2))
                      : p && !g && c && !d
                      ? ((i = t.x - 126), (s = t.y2 - 36))
                      : !p || g || c || d
                      ? p && !g && !c && d
                        ? ((i = t.x), (s = t.y2 + 2))
                        : !p && g && l && u
                        ? ((i = t.x2 - 126), (s = t.y - 36 - 2))
                        : !p && g && l && !u
                        ? ((i = t.x2 - 126), (s = t.y - 2))
                        : !p && g && !l && u
                        ? ((i = t.x2 - 126), (s = t.y - 36 - 2))
                        : p || !g || l || u
                        ? p || g || l || d
                          ? p || g || l || !d
                            ? p || g || !l || d
                              ? ((i = t.x2 - 126), (s = t.y2 + 2))
                              : ((i = t.x2), (s = t.y2 - 36 - 2))
                            : ((i = t.x2 - 126), (s = t.y2 + 2))
                          : ((i = t.x2 - 126), (s = t.y2 - 36 - 2))
                        : ((i = t.x2 - 126), (s = t.y))
                      : ((i = t.x), (s = t.y2 - 36)),
                      o.css({ left: i, top: s }).show(),
                      a.css({ opacity: 1 });
                  }
                },
                onRelease: function () {
                  r.css("left", -999),
                    o.css("left", -999),
                    $(".jcrop-holder > img").css({ opacity: 0.6 });
                },
                cursor:
                  "url(res/img/common/ico_cursor_crosshair.png) 12 12, crosshair",
                keySupport: !1,
              },
              function () {
                d = this;
              }
            );
        }.bind(this)
      );
  });
//# sourceMappingURL=cvwbb.js.map
