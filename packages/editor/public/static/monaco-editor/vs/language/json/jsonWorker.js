/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.50.0(c321d0fbecb50ab8a5365fa1965476b0ae63fc87)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/language/json/jsonWorker', ['require', 'require'], (require) => {
  'use strict';
  var moduleExports = (() => {
    var ft = Object.defineProperty;
    var br = Object.getOwnPropertyDescriptor;
    var vr = Object.getOwnPropertyNames;
    var xr = Object.prototype.hasOwnProperty;
    var kr = (e, t) => {
        for (var r in t) ft(e, r, { get: t[r], enumerable: !0 });
      },
      Ar = (e, t, r, n) => {
        if ((t && typeof t == 'object') || typeof t == 'function')
          for (let i of vr(t)) !xr.call(e, i) && i !== r && ft(e, i, { get: () => t[i], enumerable: !(n = br(t, i)) || n.enumerable });
        return e;
      };
    var Sr = (e) => Ar(ft({}, '__esModule', { value: !0 }), e);
    var ai = {};
    kr(ai, { JSONWorker: () => ct, create: () => oi });
    function Se(e, t = !1) {
      let r = e.length,
        n = 0,
        i = '',
        s = 0,
        o = 16,
        c = 0,
        l = 0,
        a = 0,
        u = 0,
        f = 0;
      function d(g, S) {
        let x = 0,
          T = 0;
        for (; x < g || !S; ) {
          let O = e.charCodeAt(n);
          if (O >= 48 && O <= 57) T = T * 16 + O - 48;
          else if (O >= 65 && O <= 70) T = T * 16 + O - 65 + 10;
          else if (O >= 97 && O <= 102) T = T * 16 + O - 97 + 10;
          else break;
          n++, x++;
        }
        return x < g && (T = -1), T;
      }
      function h(g) {
        (n = g), (i = ''), (s = 0), (o = 16), (f = 0);
      }
      function p() {
        let g = n;
        if (e.charCodeAt(n) === 48) n++;
        else for (n++; n < e.length && Ae(e.charCodeAt(n)); ) n++;
        if (n < e.length && e.charCodeAt(n) === 46)
          if ((n++, n < e.length && Ae(e.charCodeAt(n)))) for (n++; n < e.length && Ae(e.charCodeAt(n)); ) n++;
          else return (f = 3), e.substring(g, n);
        let S = n;
        if (n < e.length && (e.charCodeAt(n) === 69 || e.charCodeAt(n) === 101))
          if ((n++, ((n < e.length && e.charCodeAt(n) === 43) || e.charCodeAt(n) === 45) && n++, n < e.length && Ae(e.charCodeAt(n)))) {
            for (n++; n < e.length && Ae(e.charCodeAt(n)); ) n++;
            S = n;
          } else f = 3;
        return e.substring(g, S);
      }
      function m() {
        let g = '',
          S = n;
        for (;;) {
          if (n >= r) {
            (g += e.substring(S, n)), (f = 2);
            break;
          }
          let x = e.charCodeAt(n);
          if (x === 34) {
            (g += e.substring(S, n)), n++;
            break;
          }
          if (x === 92) {
            if (((g += e.substring(S, n)), n++, n >= r)) {
              f = 2;
              break;
            }
            switch (e.charCodeAt(n++)) {
              case 34:
                g += '"';
                break;
              case 92:
                g += '\\';
                break;
              case 47:
                g += '/';
                break;
              case 98:
                g += '\b';
                break;
              case 102:
                g += '\f';
                break;
              case 110:
                g += `
`;
                break;
              case 114:
                g += '\r';
                break;
              case 116:
                g += '	';
                break;
              case 117:
                let O = d(4, !0);
                O >= 0 ? (g += String.fromCharCode(O)) : (f = 4);
                break;
              default:
                f = 5;
            }
            S = n;
            continue;
          }
          if (x >= 0 && x <= 31)
            if (Ie(x)) {
              (g += e.substring(S, n)), (f = 2);
              break;
            } else f = 6;
          n++;
        }
        return g;
      }
      function y() {
        if (((i = ''), (f = 0), (s = n), (l = c), (u = a), n >= r)) return (s = r), (o = 17);
        let g = e.charCodeAt(n);
        if (ut(g)) {
          do n++, (i += String.fromCharCode(g)), (g = e.charCodeAt(n));
          while (ut(g));
          return (o = 15);
        }
        if (Ie(g))
          return (
            n++,
            (i += String.fromCharCode(g)),
            g === 13 &&
              e.charCodeAt(n) === 10 &&
              (n++,
              (i += `
`)),
            c++,
            (a = n),
            (o = 14)
          );
        switch (g) {
          case 123:
            return n++, (o = 1);
          case 125:
            return n++, (o = 2);
          case 91:
            return n++, (o = 3);
          case 93:
            return n++, (o = 4);
          case 58:
            return n++, (o = 6);
          case 44:
            return n++, (o = 5);
          case 34:
            return n++, (i = m()), (o = 10);
          case 47:
            let S = n - 1;
            if (e.charCodeAt(n + 1) === 47) {
              for (n += 2; n < r && !Ie(e.charCodeAt(n)); ) n++;
              return (i = e.substring(S, n)), (o = 12);
            }
            if (e.charCodeAt(n + 1) === 42) {
              n += 2;
              let x = r - 1,
                T = !1;
              for (; n < x; ) {
                let O = e.charCodeAt(n);
                if (O === 42 && e.charCodeAt(n + 1) === 47) {
                  (n += 2), (T = !0);
                  break;
                }
                n++, Ie(O) && (O === 13 && e.charCodeAt(n) === 10 && n++, c++, (a = n));
              }
              return T || (n++, (f = 1)), (i = e.substring(S, n)), (o = 13);
            }
            return (i += String.fromCharCode(g)), n++, (o = 16);
          case 45:
            if (((i += String.fromCharCode(g)), n++, n === r || !Ae(e.charCodeAt(n)))) return (o = 16);
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            return (i += p()), (o = 11);
          default:
            for (; n < r && k(g); ) n++, (g = e.charCodeAt(n));
            if (s !== n) {
              switch (((i = e.substring(s, n)), i)) {
                case 'true':
                  return (o = 8);
                case 'false':
                  return (o = 9);
                case 'null':
                  return (o = 7);
              }
              return (o = 16);
            }
            return (i += String.fromCharCode(g)), n++, (o = 16);
        }
      }
      function k(g) {
        if (ut(g) || Ie(g)) return !1;
        switch (g) {
          case 125:
          case 93:
          case 123:
          case 91:
          case 34:
          case 58:
          case 44:
          case 47:
            return !1;
        }
        return !0;
      }
      function w() {
        let g;
        do g = y();
        while (g >= 12 && g <= 15);
        return g;
      }
      return {
        setPosition: h,
        getPosition: () => n,
        scan: t ? w : y,
        getToken: () => o,
        getTokenValue: () => i,
        getTokenOffset: () => s,
        getTokenLength: () => n - s,
        getTokenStartLine: () => l,
        getTokenStartCharacter: () => s - u,
        getTokenError: () => f,
      };
    }
    function ut(e) {
      return e === 32 || e === 9;
    }
    function Ie(e) {
      return e === 10 || e === 13;
    }
    function Ae(e) {
      return e >= 48 && e <= 57;
    }
    var sn;
    (function (e) {
      (e[(e.lineFeed = 10)] = 'lineFeed'),
        (e[(e.carriageReturn = 13)] = 'carriageReturn'),
        (e[(e.space = 32)] = 'space'),
        (e[(e._0 = 48)] = '_0'),
        (e[(e._1 = 49)] = '_1'),
        (e[(e._2 = 50)] = '_2'),
        (e[(e._3 = 51)] = '_3'),
        (e[(e._4 = 52)] = '_4'),
        (e[(e._5 = 53)] = '_5'),
        (e[(e._6 = 54)] = '_6'),
        (e[(e._7 = 55)] = '_7'),
        (e[(e._8 = 56)] = '_8'),
        (e[(e._9 = 57)] = '_9'),
        (e[(e.a = 97)] = 'a'),
        (e[(e.b = 98)] = 'b'),
        (e[(e.c = 99)] = 'c'),
        (e[(e.d = 100)] = 'd'),
        (e[(e.e = 101)] = 'e'),
        (e[(e.f = 102)] = 'f'),
        (e[(e.g = 103)] = 'g'),
        (e[(e.h = 104)] = 'h'),
        (e[(e.i = 105)] = 'i'),
        (e[(e.j = 106)] = 'j'),
        (e[(e.k = 107)] = 'k'),
        (e[(e.l = 108)] = 'l'),
        (e[(e.m = 109)] = 'm'),
        (e[(e.n = 110)] = 'n'),
        (e[(e.o = 111)] = 'o'),
        (e[(e.p = 112)] = 'p'),
        (e[(e.q = 113)] = 'q'),
        (e[(e.r = 114)] = 'r'),
        (e[(e.s = 115)] = 's'),
        (e[(e.t = 116)] = 't'),
        (e[(e.u = 117)] = 'u'),
        (e[(e.v = 118)] = 'v'),
        (e[(e.w = 119)] = 'w'),
        (e[(e.x = 120)] = 'x'),
        (e[(e.y = 121)] = 'y'),
        (e[(e.z = 122)] = 'z'),
        (e[(e.A = 65)] = 'A'),
        (e[(e.B = 66)] = 'B'),
        (e[(e.C = 67)] = 'C'),
        (e[(e.D = 68)] = 'D'),
        (e[(e.E = 69)] = 'E'),
        (e[(e.F = 70)] = 'F'),
        (e[(e.G = 71)] = 'G'),
        (e[(e.H = 72)] = 'H'),
        (e[(e.I = 73)] = 'I'),
        (e[(e.J = 74)] = 'J'),
        (e[(e.K = 75)] = 'K'),
        (e[(e.L = 76)] = 'L'),
        (e[(e.M = 77)] = 'M'),
        (e[(e.N = 78)] = 'N'),
        (e[(e.O = 79)] = 'O'),
        (e[(e.P = 80)] = 'P'),
        (e[(e.Q = 81)] = 'Q'),
        (e[(e.R = 82)] = 'R'),
        (e[(e.S = 83)] = 'S'),
        (e[(e.T = 84)] = 'T'),
        (e[(e.U = 85)] = 'U'),
        (e[(e.V = 86)] = 'V'),
        (e[(e.W = 87)] = 'W'),
        (e[(e.X = 88)] = 'X'),
        (e[(e.Y = 89)] = 'Y'),
        (e[(e.Z = 90)] = 'Z'),
        (e[(e.asterisk = 42)] = 'asterisk'),
        (e[(e.backslash = 92)] = 'backslash'),
        (e[(e.closeBrace = 125)] = 'closeBrace'),
        (e[(e.closeBracket = 93)] = 'closeBracket'),
        (e[(e.colon = 58)] = 'colon'),
        (e[(e.comma = 44)] = 'comma'),
        (e[(e.dot = 46)] = 'dot'),
        (e[(e.doubleQuote = 34)] = 'doubleQuote'),
        (e[(e.minus = 45)] = 'minus'),
        (e[(e.openBrace = 123)] = 'openBrace'),
        (e[(e.openBracket = 91)] = 'openBracket'),
        (e[(e.plus = 43)] = 'plus'),
        (e[(e.slash = 47)] = 'slash'),
        (e[(e.formFeed = 12)] = 'formFeed'),
        (e[(e.tab = 9)] = 'tab');
    })(sn || (sn = {}));
    var Q = new Array(20).fill(0).map((e, t) => ' '.repeat(t)),
      we = 200,
      dt = {
        ' ': {
          '\n': new Array(we).fill(0).map(
            (e, t) =>
              `
` + ' '.repeat(t),
          ),
          '\r': new Array(we).fill(0).map((e, t) => '\r' + ' '.repeat(t)),
          '\r\n': new Array(we).fill(0).map(
            (e, t) =>
              `\r
` + ' '.repeat(t),
          ),
        },
        '	': {
          '\n': new Array(we).fill(0).map(
            (e, t) =>
              `
` + '	'.repeat(t),
          ),
          '\r': new Array(we).fill(0).map((e, t) => '\r' + '	'.repeat(t)),
          '\r\n': new Array(we).fill(0).map(
            (e, t) =>
              `\r
` + '	'.repeat(t),
          ),
        },
      },
      on = [
        `
`,
        '\r',
        `\r
`,
      ];
    function pt(e, t, r) {
      let n, i, s, o, c;
      if (t) {
        for (o = t.offset, c = o + t.length, s = o; s > 0 && !ht(e, s - 1); ) s--;
        let x = c;
        for (; x < e.length && !ht(e, x); ) x++;
        (i = e.substring(s, x)), (n = Or(i, r));
      } else (i = e), (n = 0), (s = 0), (o = 0), (c = e.length);
      let l = Tr(r, e),
        a = on.includes(l),
        u = 0,
        f = 0,
        d;
      r.insertSpaces ? (d = Q[r.tabSize || 4] ?? Oe(Q[1], r.tabSize || 4)) : (d = '	');
      let h = d === '	' ? '	' : ' ',
        p = Se(i, !1),
        m = !1;
      function y() {
        if (u > 1) return Oe(l, u) + Oe(d, n + f);
        let x = d.length * (n + f);
        return !a || x > dt[h][l].length ? l + Oe(d, n + f) : x <= 0 ? l : dt[h][l][x];
      }
      function k() {
        let x = p.scan();
        for (u = 0; x === 15 || x === 14; ) x === 14 && r.keepLines ? (u += 1) : x === 14 && (u = 1), (x = p.scan());
        return (m = x === 16 || p.getTokenError() !== 0), x;
      }
      let w = [];
      function g(x, T, O) {
        !m && (!t || (T < c && O > o)) && e.substring(T, O) !== x && w.push({ offset: T, length: O - T, content: x });
      }
      let S = k();
      if ((r.keepLines && u > 0 && g(Oe(l, u), 0, 0), S !== 17)) {
        let x = p.getTokenOffset() + s,
          T = d.length * n < 20 && r.insertSpaces ? Q[d.length * n] : Oe(d, n);
        g(T, s, x);
      }
      for (; S !== 17; ) {
        let x = p.getTokenOffset() + p.getTokenLength() + s,
          T = k(),
          O = '',
          I = !1;
        for (; u === 0 && (T === 12 || T === 13); ) {
          let j = p.getTokenOffset() + s;
          g(Q[1], x, j), (x = p.getTokenOffset() + p.getTokenLength() + s), (I = T === 12), (O = I ? y() : ''), (T = k());
        }
        if (T === 2) S !== 1 && f--, (r.keepLines && u > 0) || (!r.keepLines && S !== 1) ? (O = y()) : r.keepLines && (O = Q[1]);
        else if (T === 4) S !== 3 && f--, (r.keepLines && u > 0) || (!r.keepLines && S !== 3) ? (O = y()) : r.keepLines && (O = Q[1]);
        else {
          switch (S) {
            case 3:
            case 1:
              f++, (r.keepLines && u > 0) || !r.keepLines ? (O = y()) : (O = Q[1]);
              break;
            case 5:
              (r.keepLines && u > 0) || !r.keepLines ? (O = y()) : (O = Q[1]);
              break;
            case 12:
              O = y();
              break;
            case 13:
              u > 0 ? (O = y()) : I || (O = Q[1]);
              break;
            case 6:
              r.keepLines && u > 0 ? (O = y()) : I || (O = Q[1]);
              break;
            case 10:
              r.keepLines && u > 0 ? (O = y()) : T === 6 && !I && (O = '');
              break;
            case 7:
            case 8:
            case 9:
            case 11:
            case 2:
            case 4:
              r.keepLines && u > 0 ? (O = y()) : (T === 12 || T === 13) && !I ? (O = Q[1]) : T !== 5 && T !== 17 && (m = !0);
              break;
            case 16:
              m = !0;
              break;
          }
          u > 0 && (T === 12 || T === 13) && (O = y());
        }
        T === 17 && (r.keepLines && u > 0 ? (O = y()) : (O = r.insertFinalNewline ? l : ''));
        let E = p.getTokenOffset() + s;
        g(O, x, E), (S = T);
      }
      return w;
    }
    function Oe(e, t) {
      let r = '';
      for (let n = 0; n < t; n++) r += e;
      return r;
    }
    function Or(e, t) {
      let r = 0,
        n = 0,
        i = t.tabSize || 4;
      for (; r < e.length; ) {
        let s = e.charAt(r);
        if (s === Q[1]) n++;
        else if (s === '	') n += i;
        else break;
        r++;
      }
      return Math.floor(n / i);
    }
    function Tr(e, t) {
      for (let r = 0; r < t.length; r++) {
        let n = t.charAt(r);
        if (n === '\r')
          return r + 1 < t.length &&
            t.charAt(r + 1) ===
              `
`
            ? `\r
`
            : '\r';
        if (
          n ===
          `
`
        )
          return `
`;
      }
      return (
        (e && e.eol) ||
        `
`
      );
    }
    function ht(e, t) {
      return (
        `\r
`.indexOf(e.charAt(t)) !== -1
      );
    }
    var De;
    (function (e) {
      e.DEFAULT = { allowTrailingComma: !1 };
    })(De || (De = {}));
    function an(e, t = [], r = De.DEFAULT) {
      let n = null,
        i = [],
        s = [];
      function o(l) {
        Array.isArray(i) ? i.push(l) : n !== null && (i[n] = l);
      }
      return (
        ln(
          e,
          {
            onObjectBegin: () => {
              let l = {};
              o(l), s.push(i), (i = l), (n = null);
            },
            onObjectProperty: (l) => {
              n = l;
            },
            onObjectEnd: () => {
              i = s.pop();
            },
            onArrayBegin: () => {
              let l = [];
              o(l), s.push(i), (i = l), (n = null);
            },
            onArrayEnd: () => {
              i = s.pop();
            },
            onLiteralValue: o,
            onError: (l, a, u) => {
              t.push({ error: l, offset: a, length: u });
            },
          },
          r,
        ),
        i[0]
      );
    }
    function gt(e) {
      if (!e.parent || !e.parent.children) return [];
      let t = gt(e.parent);
      if (e.parent.type === 'property') {
        let r = e.parent.children[0].value;
        t.push(r);
      } else if (e.parent.type === 'array') {
        let r = e.parent.children.indexOf(e);
        r !== -1 && t.push(r);
      }
      return t;
    }
    function Re(e) {
      switch (e.type) {
        case 'array':
          return e.children.map(Re);
        case 'object':
          let t = Object.create(null);
          for (let r of e.children) {
            let n = r.children[1];
            n && (t[r.children[0].value] = Re(n));
          }
          return t;
        case 'null':
        case 'string':
        case 'number':
        case 'boolean':
          return e.value;
        default:
          return;
      }
    }
    function Pr(e, t, r = !1) {
      return (t >= e.offset && t < e.offset + e.length) || (r && t === e.offset + e.length);
    }
    function mt(e, t, r = !1) {
      if (Pr(e, t, r)) {
        let n = e.children;
        if (Array.isArray(n))
          for (let i = 0; i < n.length && n[i].offset <= t; i++) {
            let s = mt(n[i], t, r);
            if (s) return s;
          }
        return e;
      }
    }
    function ln(e, t, r = De.DEFAULT) {
      let n = Se(e, !1),
        i = [];
      function s(v) {
        return v ? () => v(n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter()) : () => !0;
      }
      function o(v) {
        return v ? () => v(n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter(), () => i.slice()) : () => !0;
      }
      function c(v) {
        return v ? (P) => v(P, n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter()) : () => !0;
      }
      function l(v) {
        return v ? (P) => v(P, n.getTokenOffset(), n.getTokenLength(), n.getTokenStartLine(), n.getTokenStartCharacter(), () => i.slice()) : () => !0;
      }
      let a = o(t.onObjectBegin),
        u = l(t.onObjectProperty),
        f = s(t.onObjectEnd),
        d = o(t.onArrayBegin),
        h = s(t.onArrayEnd),
        p = l(t.onLiteralValue),
        m = c(t.onSeparator),
        y = s(t.onComment),
        k = c(t.onError),
        w = r && r.disallowComments,
        g = r && r.allowTrailingComma;
      function S() {
        for (;;) {
          let v = n.scan();
          switch (n.getTokenError()) {
            case 4:
              x(14);
              break;
            case 5:
              x(15);
              break;
            case 3:
              x(13);
              break;
            case 1:
              w || x(11);
              break;
            case 2:
              x(12);
              break;
            case 6:
              x(16);
              break;
          }
          switch (v) {
            case 12:
            case 13:
              w ? x(10) : y();
              break;
            case 16:
              x(1);
              break;
            case 15:
            case 14:
              break;
            default:
              return v;
          }
        }
      }
      function x(v, P = [], L = []) {
        if ((k(v), P.length + L.length > 0)) {
          let $ = n.getToken();
          for (; $ !== 17; ) {
            if (P.indexOf($) !== -1) {
              S();
              break;
            } else if (L.indexOf($) !== -1) break;
            $ = S();
          }
        }
      }
      function T(v) {
        let P = n.getTokenValue();
        return v ? p(P) : (u(P), i.push(P)), S(), !0;
      }
      function O() {
        switch (n.getToken()) {
          case 11:
            let v = n.getTokenValue(),
              P = Number(v);
            isNaN(P) && (x(2), (P = 0)), p(P);
            break;
          case 7:
            p(null);
            break;
          case 8:
            p(!0);
            break;
          case 9:
            p(!1);
            break;
          default:
            return !1;
        }
        return S(), !0;
      }
      function I() {
        return n.getToken() !== 10
          ? (x(3, [], [2, 5]), !1)
          : (T(!1), n.getToken() === 6 ? (m(':'), S(), N() || x(4, [], [2, 5])) : x(5, [], [2, 5]), i.pop(), !0);
      }
      function E() {
        a(), S();
        let v = !1;
        for (; n.getToken() !== 2 && n.getToken() !== 17; ) {
          if (n.getToken() === 5) {
            if ((v || x(4, [], []), m(','), S(), n.getToken() === 2 && g)) break;
          } else v && x(6, [], []);
          I() || x(4, [], [2, 5]), (v = !0);
        }
        return f(), n.getToken() !== 2 ? x(7, [2], []) : S(), !0;
      }
      function j() {
        d(), S();
        let v = !0,
          P = !1;
        for (; n.getToken() !== 4 && n.getToken() !== 17; ) {
          if (n.getToken() === 5) {
            if ((P || x(4, [], []), m(','), S(), n.getToken() === 4 && g)) break;
          } else P && x(6, [], []);
          v ? (i.push(0), (v = !1)) : i[i.length - 1]++, N() || x(4, [], [4, 5]), (P = !0);
        }
        return h(), v || i.pop(), n.getToken() !== 4 ? x(8, [4], []) : S(), !0;
      }
      function N() {
        switch (n.getToken()) {
          case 3:
            return j();
          case 1:
            return E();
          case 10:
            return T(!0);
          default:
            return O();
        }
      }
      return (
        S(),
        n.getToken() === 17 ? (r.allowEmptyContent ? !0 : (x(4, [], []), !1)) : N() ? (n.getToken() !== 17 && x(9, [], []), !0) : (x(4, [], []), !1)
      );
    }
    var ee = Se,
      cn;
    (function (e) {
      (e[(e.None = 0)] = 'None'),
        (e[(e.UnexpectedEndOfComment = 1)] = 'UnexpectedEndOfComment'),
        (e[(e.UnexpectedEndOfString = 2)] = 'UnexpectedEndOfString'),
        (e[(e.UnexpectedEndOfNumber = 3)] = 'UnexpectedEndOfNumber'),
        (e[(e.InvalidUnicode = 4)] = 'InvalidUnicode'),
        (e[(e.InvalidEscapeCharacter = 5)] = 'InvalidEscapeCharacter'),
        (e[(e.InvalidCharacter = 6)] = 'InvalidCharacter');
    })(cn || (cn = {}));
    var fn;
    (function (e) {
      (e[(e.OpenBraceToken = 1)] = 'OpenBraceToken'),
        (e[(e.CloseBraceToken = 2)] = 'CloseBraceToken'),
        (e[(e.OpenBracketToken = 3)] = 'OpenBracketToken'),
        (e[(e.CloseBracketToken = 4)] = 'CloseBracketToken'),
        (e[(e.CommaToken = 5)] = 'CommaToken'),
        (e[(e.ColonToken = 6)] = 'ColonToken'),
        (e[(e.NullKeyword = 7)] = 'NullKeyword'),
        (e[(e.TrueKeyword = 8)] = 'TrueKeyword'),
        (e[(e.FalseKeyword = 9)] = 'FalseKeyword'),
        (e[(e.StringLiteral = 10)] = 'StringLiteral'),
        (e[(e.NumericLiteral = 11)] = 'NumericLiteral'),
        (e[(e.LineCommentTrivia = 12)] = 'LineCommentTrivia'),
        (e[(e.BlockCommentTrivia = 13)] = 'BlockCommentTrivia'),
        (e[(e.LineBreakTrivia = 14)] = 'LineBreakTrivia'),
        (e[(e.Trivia = 15)] = 'Trivia'),
        (e[(e.Unknown = 16)] = 'Unknown'),
        (e[(e.EOF = 17)] = 'EOF');
    })(fn || (fn = {}));
    var dn = an;
    var hn = mt,
      pn = gt,
      gn = Re;
    var un;
    (function (e) {
      (e[(e.InvalidSymbol = 1)] = 'InvalidSymbol'),
        (e[(e.InvalidNumberFormat = 2)] = 'InvalidNumberFormat'),
        (e[(e.PropertyNameExpected = 3)] = 'PropertyNameExpected'),
        (e[(e.ValueExpected = 4)] = 'ValueExpected'),
        (e[(e.ColonExpected = 5)] = 'ColonExpected'),
        (e[(e.CommaExpected = 6)] = 'CommaExpected'),
        (e[(e.CloseBraceExpected = 7)] = 'CloseBraceExpected'),
        (e[(e.CloseBracketExpected = 8)] = 'CloseBracketExpected'),
        (e[(e.EndOfFileExpected = 9)] = 'EndOfFileExpected'),
        (e[(e.InvalidCommentToken = 10)] = 'InvalidCommentToken'),
        (e[(e.UnexpectedEndOfComment = 11)] = 'UnexpectedEndOfComment'),
        (e[(e.UnexpectedEndOfString = 12)] = 'UnexpectedEndOfString'),
        (e[(e.UnexpectedEndOfNumber = 13)] = 'UnexpectedEndOfNumber'),
        (e[(e.InvalidUnicode = 14)] = 'InvalidUnicode'),
        (e[(e.InvalidEscapeCharacter = 15)] = 'InvalidEscapeCharacter'),
        (e[(e.InvalidCharacter = 16)] = 'InvalidCharacter');
    })(un || (un = {}));
    function mn(e, t, r) {
      return pt(e, t, r);
    }
    function ge(e, t) {
      if (e === t) return !0;
      if (e == null || t === null || t === void 0 || typeof e != typeof t || typeof e != 'object' || Array.isArray(e) !== Array.isArray(t)) return !1;
      let r, n;
      if (Array.isArray(e)) {
        if (e.length !== t.length) return !1;
        for (r = 0; r < e.length; r++) if (!ge(e[r], t[r])) return !1;
      } else {
        let i = [];
        for (n in e) i.push(n);
        i.sort();
        let s = [];
        for (n in t) s.push(n);
        if ((s.sort(), !ge(i, s))) return !1;
        for (r = 0; r < i.length; r++) if (!ge(e[i[r]], t[i[r]])) return !1;
      }
      return !0;
    }
    function W(e) {
      return typeof e == 'number';
    }
    function Y(e) {
      return typeof e < 'u';
    }
    function te(e) {
      return typeof e == 'boolean';
    }
    function Ue(e) {
      return typeof e == 'string';
    }
    function oe(e) {
      return typeof e == 'object' && e !== null && !Array.isArray(e);
    }
    function jr(e, t) {
      if (e.length < t.length) return !1;
      for (let r = 0; r < t.length; r++) if (e[r] !== t[r]) return !1;
      return !0;
    }
    function fe(e, t) {
      let r = e.length - t.length;
      return r > 0 ? e.lastIndexOf(t) === r : r === 0 ? e === t : !1;
    }
    function me(e) {
      let t = '';
      jr(e, '(?i)') && ((e = e.substring(4)), (t = 'i'));
      try {
        return new RegExp(e, t + 'u');
      } catch {
        try {
          return new RegExp(e, t);
        } catch {
          return;
        }
      }
    }
    function bt(e) {
      let t = 0;
      for (let r = 0; r < e.length; r++) {
        t++;
        let n = e.charCodeAt(r);
        55296 <= n && n <= 56319 && r++;
      }
      return t;
    }
    var vt;
    (function (e) {
      function t(r) {
        return typeof r == 'string';
      }
      e.is = t;
    })(vt || (vt = {}));
    var xt;
    (function (e) {
      function t(r) {
        return typeof r == 'string';
      }
      e.is = t;
    })(xt || (xt = {}));
    var bn;
    (function (e) {
      (e.MIN_VALUE = -2147483648), (e.MAX_VALUE = 2147483647);
      function t(r) {
        return typeof r == 'number' && e.MIN_VALUE <= r && r <= e.MAX_VALUE;
      }
      e.is = t;
    })(bn || (bn = {}));
    var Be;
    (function (e) {
      (e.MIN_VALUE = 0), (e.MAX_VALUE = 2147483647);
      function t(r) {
        return typeof r == 'number' && e.MIN_VALUE <= r && r <= e.MAX_VALUE;
      }
      e.is = t;
    })(Be || (Be = {}));
    var D;
    (function (e) {
      function t(n, i) {
        return n === Number.MAX_VALUE && (n = Be.MAX_VALUE), i === Number.MAX_VALUE && (i = Be.MAX_VALUE), { line: n, character: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.objectLiteral(i) && b.uinteger(i.line) && b.uinteger(i.character);
      }
      e.is = r;
    })(D || (D = {}));
    var _;
    (function (e) {
      function t(n, i, s, o) {
        if (b.uinteger(n) && b.uinteger(i) && b.uinteger(s) && b.uinteger(o)) return { start: D.create(n, i), end: D.create(s, o) };
        if (D.is(n) && D.is(i)) return { start: n, end: i };
        throw new Error(`Range#create called with invalid arguments[${n}, ${i}, ${s}, ${o}]`);
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.objectLiteral(i) && D.is(i.start) && D.is(i.end);
      }
      e.is = r;
    })(_ || (_ = {}));
    var ue;
    (function (e) {
      function t(n, i) {
        return { uri: n, range: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.objectLiteral(i) && _.is(i.range) && (b.string(i.uri) || b.undefined(i.uri));
      }
      e.is = r;
    })(ue || (ue = {}));
    var vn;
    (function (e) {
      function t(n, i, s, o) {
        return { targetUri: n, targetRange: i, targetSelectionRange: s, originSelectionRange: o };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          b.objectLiteral(i) &&
          _.is(i.targetRange) &&
          b.string(i.targetUri) &&
          _.is(i.targetSelectionRange) &&
          (_.is(i.originSelectionRange) || b.undefined(i.originSelectionRange))
        );
      }
      e.is = r;
    })(vn || (vn = {}));
    var Je;
    (function (e) {
      function t(n, i, s, o) {
        return { red: n, green: i, blue: s, alpha: o };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          b.objectLiteral(i) &&
          b.numberRange(i.red, 0, 1) &&
          b.numberRange(i.green, 0, 1) &&
          b.numberRange(i.blue, 0, 1) &&
          b.numberRange(i.alpha, 0, 1)
        );
      }
      e.is = r;
    })(Je || (Je = {}));
    var kt;
    (function (e) {
      function t(n, i) {
        return { range: n, color: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.objectLiteral(i) && _.is(i.range) && Je.is(i.color);
      }
      e.is = r;
    })(kt || (kt = {}));
    var At;
    (function (e) {
      function t(n, i, s) {
        return { label: n, textEdit: i, additionalTextEdits: s };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          b.objectLiteral(i) &&
          b.string(i.label) &&
          (b.undefined(i.textEdit) || G.is(i)) &&
          (b.undefined(i.additionalTextEdits) || b.typedArray(i.additionalTextEdits, G.is))
        );
      }
      e.is = r;
    })(At || (At = {}));
    var ye;
    (function (e) {
      (e.Comment = 'comment'), (e.Imports = 'imports'), (e.Region = 'region');
    })(ye || (ye = {}));
    var St;
    (function (e) {
      function t(n, i, s, o, c, l) {
        let a = { startLine: n, endLine: i };
        return (
          b.defined(s) && (a.startCharacter = s),
          b.defined(o) && (a.endCharacter = o),
          b.defined(c) && (a.kind = c),
          b.defined(l) && (a.collapsedText = l),
          a
        );
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          b.objectLiteral(i) &&
          b.uinteger(i.startLine) &&
          b.uinteger(i.startLine) &&
          (b.undefined(i.startCharacter) || b.uinteger(i.startCharacter)) &&
          (b.undefined(i.endCharacter) || b.uinteger(i.endCharacter)) &&
          (b.undefined(i.kind) || b.string(i.kind))
        );
      }
      e.is = r;
    })(St || (St = {}));
    var wt;
    (function (e) {
      function t(n, i) {
        return { location: n, message: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && ue.is(i.location) && b.string(i.message);
      }
      e.is = r;
    })(wt || (wt = {}));
    var z;
    (function (e) {
      (e.Error = 1), (e.Warning = 2), (e.Information = 3), (e.Hint = 4);
    })(z || (z = {}));
    var xn;
    (function (e) {
      (e.Unnecessary = 1), (e.Deprecated = 2);
    })(xn || (xn = {}));
    var kn;
    (function (e) {
      function t(r) {
        let n = r;
        return b.objectLiteral(n) && b.string(n.href);
      }
      e.is = t;
    })(kn || (kn = {}));
    var ne;
    (function (e) {
      function t(n, i, s, o, c, l) {
        let a = { range: n, message: i };
        return (
          b.defined(s) && (a.severity = s),
          b.defined(o) && (a.code = o),
          b.defined(c) && (a.source = c),
          b.defined(l) && (a.relatedInformation = l),
          a
        );
      }
      e.create = t;
      function r(n) {
        var i;
        let s = n;
        return (
          b.defined(s) &&
          _.is(s.range) &&
          b.string(s.message) &&
          (b.number(s.severity) || b.undefined(s.severity)) &&
          (b.integer(s.code) || b.string(s.code) || b.undefined(s.code)) &&
          (b.undefined(s.codeDescription) || b.string((i = s.codeDescription) === null || i === void 0 ? void 0 : i.href)) &&
          (b.string(s.source) || b.undefined(s.source)) &&
          (b.undefined(s.relatedInformation) || b.typedArray(s.relatedInformation, wt.is))
        );
      }
      e.is = r;
    })(ne || (ne = {}));
    var be;
    (function (e) {
      function t(n, i, ...s) {
        let o = { title: n, command: i };
        return b.defined(s) && s.length > 0 && (o.arguments = s), o;
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && b.string(i.title) && b.string(i.command);
      }
      e.is = r;
    })(be || (be = {}));
    var G;
    (function (e) {
      function t(s, o) {
        return { range: s, newText: o };
      }
      e.replace = t;
      function r(s, o) {
        return { range: { start: s, end: s }, newText: o };
      }
      e.insert = r;
      function n(s) {
        return { range: s, newText: '' };
      }
      e.del = n;
      function i(s) {
        let o = s;
        return b.objectLiteral(o) && b.string(o.newText) && _.is(o.range);
      }
      e.is = i;
    })(G || (G = {}));
    var Ot;
    (function (e) {
      function t(n, i, s) {
        let o = { label: n };
        return i !== void 0 && (o.needsConfirmation = i), s !== void 0 && (o.description = s), o;
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          b.objectLiteral(i) &&
          b.string(i.label) &&
          (b.boolean(i.needsConfirmation) || i.needsConfirmation === void 0) &&
          (b.string(i.description) || i.description === void 0)
        );
      }
      e.is = r;
    })(Ot || (Ot = {}));
    var Te;
    (function (e) {
      function t(r) {
        let n = r;
        return b.string(n);
      }
      e.is = t;
    })(Te || (Te = {}));
    var An;
    (function (e) {
      function t(s, o, c) {
        return { range: s, newText: o, annotationId: c };
      }
      e.replace = t;
      function r(s, o, c) {
        return { range: { start: s, end: s }, newText: o, annotationId: c };
      }
      e.insert = r;
      function n(s, o) {
        return { range: s, newText: '', annotationId: o };
      }
      e.del = n;
      function i(s) {
        let o = s;
        return G.is(o) && (Ot.is(o.annotationId) || Te.is(o.annotationId));
      }
      e.is = i;
    })(An || (An = {}));
    var Ce;
    (function (e) {
      function t(n, i) {
        return { textDocument: n, edits: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && It.is(i.textDocument) && Array.isArray(i.edits);
      }
      e.is = r;
    })(Ce || (Ce = {}));
    var Tt;
    (function (e) {
      function t(n, i, s) {
        let o = { kind: 'create', uri: n };
        return i !== void 0 && (i.overwrite !== void 0 || i.ignoreIfExists !== void 0) && (o.options = i), s !== void 0 && (o.annotationId = s), o;
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          i &&
          i.kind === 'create' &&
          b.string(i.uri) &&
          (i.options === void 0 ||
            ((i.options.overwrite === void 0 || b.boolean(i.options.overwrite)) &&
              (i.options.ignoreIfExists === void 0 || b.boolean(i.options.ignoreIfExists)))) &&
          (i.annotationId === void 0 || Te.is(i.annotationId))
        );
      }
      e.is = r;
    })(Tt || (Tt = {}));
    var Nt;
    (function (e) {
      function t(n, i, s, o) {
        let c = { kind: 'rename', oldUri: n, newUri: i };
        return s !== void 0 && (s.overwrite !== void 0 || s.ignoreIfExists !== void 0) && (c.options = s), o !== void 0 && (c.annotationId = o), c;
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          i &&
          i.kind === 'rename' &&
          b.string(i.oldUri) &&
          b.string(i.newUri) &&
          (i.options === void 0 ||
            ((i.options.overwrite === void 0 || b.boolean(i.options.overwrite)) &&
              (i.options.ignoreIfExists === void 0 || b.boolean(i.options.ignoreIfExists)))) &&
          (i.annotationId === void 0 || Te.is(i.annotationId))
        );
      }
      e.is = r;
    })(Nt || (Nt = {}));
    var Pt;
    (function (e) {
      function t(n, i, s) {
        let o = { kind: 'delete', uri: n };
        return i !== void 0 && (i.recursive !== void 0 || i.ignoreIfNotExists !== void 0) && (o.options = i), s !== void 0 && (o.annotationId = s), o;
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          i &&
          i.kind === 'delete' &&
          b.string(i.uri) &&
          (i.options === void 0 ||
            ((i.options.recursive === void 0 || b.boolean(i.options.recursive)) &&
              (i.options.ignoreIfNotExists === void 0 || b.boolean(i.options.ignoreIfNotExists)))) &&
          (i.annotationId === void 0 || Te.is(i.annotationId))
        );
      }
      e.is = r;
    })(Pt || (Pt = {}));
    var qe;
    (function (e) {
      function t(r) {
        let n = r;
        return (
          n &&
          (n.changes !== void 0 || n.documentChanges !== void 0) &&
          (n.documentChanges === void 0 || n.documentChanges.every((i) => (b.string(i.kind) ? Tt.is(i) || Nt.is(i) || Pt.is(i) : Ce.is(i))))
        );
      }
      e.is = t;
    })(qe || (qe = {}));
    var Sn;
    (function (e) {
      function t(n) {
        return { uri: n };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && b.string(i.uri);
      }
      e.is = r;
    })(Sn || (Sn = {}));
    var Lt;
    (function (e) {
      function t(n, i) {
        return { uri: n, version: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && b.string(i.uri) && b.integer(i.version);
      }
      e.is = r;
    })(Lt || (Lt = {}));
    var It;
    (function (e) {
      function t(n, i) {
        return { uri: n, version: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && b.string(i.uri) && (i.version === null || b.integer(i.version));
      }
      e.is = r;
    })(It || (It = {}));
    var wn;
    (function (e) {
      function t(n, i, s, o) {
        return { uri: n, languageId: i, version: s, text: o };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && b.string(i.uri) && b.string(i.languageId) && b.integer(i.version) && b.string(i.text);
      }
      e.is = r;
    })(wn || (wn = {}));
    var le;
    (function (e) {
      (e.PlainText = 'plaintext'), (e.Markdown = 'markdown');
      function t(r) {
        let n = r;
        return n === e.PlainText || n === e.Markdown;
      }
      e.is = t;
    })(le || (le = {}));
    var Ne;
    (function (e) {
      function t(r) {
        let n = r;
        return b.objectLiteral(r) && le.is(n.kind) && b.string(n.value);
      }
      e.is = t;
    })(Ne || (Ne = {}));
    var H;
    (function (e) {
      (e.Text = 1),
        (e.Method = 2),
        (e.Function = 3),
        (e.Constructor = 4),
        (e.Field = 5),
        (e.Variable = 6),
        (e.Class = 7),
        (e.Interface = 8),
        (e.Module = 9),
        (e.Property = 10),
        (e.Unit = 11),
        (e.Value = 12),
        (e.Enum = 13),
        (e.Keyword = 14),
        (e.Snippet = 15),
        (e.Color = 16),
        (e.File = 17),
        (e.Reference = 18),
        (e.Folder = 19),
        (e.EnumMember = 20),
        (e.Constant = 21),
        (e.Struct = 22),
        (e.Event = 23),
        (e.Operator = 24),
        (e.TypeParameter = 25);
    })(H || (H = {}));
    var R;
    (function (e) {
      (e.PlainText = 1), (e.Snippet = 2);
    })(R || (R = {}));
    var Et;
    (function (e) {
      e.Deprecated = 1;
    })(Et || (Et = {}));
    var On;
    (function (e) {
      function t(n, i, s) {
        return { newText: n, insert: i, replace: s };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return i && b.string(i.newText) && _.is(i.insert) && _.is(i.replace);
      }
      e.is = r;
    })(On || (On = {}));
    var Tn;
    (function (e) {
      (e.asIs = 1), (e.adjustIndentation = 2);
    })(Tn || (Tn = {}));
    var Nn;
    (function (e) {
      function t(r) {
        let n = r;
        return n && (b.string(n.detail) || n.detail === void 0) && (b.string(n.description) || n.description === void 0);
      }
      e.is = t;
    })(Nn || (Nn = {}));
    var Ee;
    (function (e) {
      function t(r) {
        return { label: r };
      }
      e.create = t;
    })(Ee || (Ee = {}));
    var _t;
    (function (e) {
      function t(r, n) {
        return { items: r || [], isIncomplete: !!n };
      }
      e.create = t;
    })(_t || (_t = {}));
    var _e;
    (function (e) {
      function t(n) {
        return n.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
      }
      e.fromPlainText = t;
      function r(n) {
        let i = n;
        return b.string(i) || (b.objectLiteral(i) && b.string(i.language) && b.string(i.value));
      }
      e.is = r;
    })(_e || (_e = {}));
    var jt;
    (function (e) {
      function t(r) {
        let n = r;
        return (
          !!n &&
          b.objectLiteral(n) &&
          (Ne.is(n.contents) || _e.is(n.contents) || b.typedArray(n.contents, _e.is)) &&
          (r.range === void 0 || _.is(r.range))
        );
      }
      e.is = t;
    })(jt || (jt = {}));
    var Pn;
    (function (e) {
      function t(r, n) {
        return n ? { label: r, documentation: n } : { label: r };
      }
      e.create = t;
    })(Pn || (Pn = {}));
    var Ln;
    (function (e) {
      function t(r, n, ...i) {
        let s = { label: r };
        return b.defined(n) && (s.documentation = n), b.defined(i) ? (s.parameters = i) : (s.parameters = []), s;
      }
      e.create = t;
    })(Ln || (Ln = {}));
    var Vt;
    (function (e) {
      (e.Text = 1), (e.Read = 2), (e.Write = 3);
    })(Vt || (Vt = {}));
    var Mt;
    (function (e) {
      function t(r, n) {
        let i = { range: r };
        return b.number(n) && (i.kind = n), i;
      }
      e.create = t;
    })(Mt || (Mt = {}));
    var re;
    (function (e) {
      (e.File = 1),
        (e.Module = 2),
        (e.Namespace = 3),
        (e.Package = 4),
        (e.Class = 5),
        (e.Method = 6),
        (e.Property = 7),
        (e.Field = 8),
        (e.Constructor = 9),
        (e.Enum = 10),
        (e.Interface = 11),
        (e.Function = 12),
        (e.Variable = 13),
        (e.Constant = 14),
        (e.String = 15),
        (e.Number = 16),
        (e.Boolean = 17),
        (e.Array = 18),
        (e.Object = 19),
        (e.Key = 20),
        (e.Null = 21),
        (e.EnumMember = 22),
        (e.Struct = 23),
        (e.Event = 24),
        (e.Operator = 25),
        (e.TypeParameter = 26);
    })(re || (re = {}));
    var In;
    (function (e) {
      e.Deprecated = 1;
    })(In || (In = {}));
    var Ft;
    (function (e) {
      function t(r, n, i, s, o) {
        let c = { name: r, kind: n, location: { uri: s, range: i } };
        return o && (c.containerName = o), c;
      }
      e.create = t;
    })(Ft || (Ft = {}));
    var En;
    (function (e) {
      function t(r, n, i, s) {
        return s !== void 0 ? { name: r, kind: n, location: { uri: i, range: s } } : { name: r, kind: n, location: { uri: i } };
      }
      e.create = t;
    })(En || (En = {}));
    var $t;
    (function (e) {
      function t(n, i, s, o, c, l) {
        let a = { name: n, detail: i, kind: s, range: o, selectionRange: c };
        return l !== void 0 && (a.children = l), a;
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          i &&
          b.string(i.name) &&
          b.number(i.kind) &&
          _.is(i.range) &&
          _.is(i.selectionRange) &&
          (i.detail === void 0 || b.string(i.detail)) &&
          (i.deprecated === void 0 || b.boolean(i.deprecated)) &&
          (i.children === void 0 || Array.isArray(i.children)) &&
          (i.tags === void 0 || Array.isArray(i.tags))
        );
      }
      e.is = r;
    })($t || ($t = {}));
    var Dt;
    (function (e) {
      (e.Empty = ''),
        (e.QuickFix = 'quickfix'),
        (e.Refactor = 'refactor'),
        (e.RefactorExtract = 'refactor.extract'),
        (e.RefactorInline = 'refactor.inline'),
        (e.RefactorRewrite = 'refactor.rewrite'),
        (e.Source = 'source'),
        (e.SourceOrganizeImports = 'source.organizeImports'),
        (e.SourceFixAll = 'source.fixAll');
    })(Dt || (Dt = {}));
    var We;
    (function (e) {
      (e.Invoked = 1), (e.Automatic = 2);
    })(We || (We = {}));
    var Rt;
    (function (e) {
      function t(n, i, s) {
        let o = { diagnostics: n };
        return i != null && (o.only = i), s != null && (o.triggerKind = s), o;
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          b.defined(i) &&
          b.typedArray(i.diagnostics, ne.is) &&
          (i.only === void 0 || b.typedArray(i.only, b.string)) &&
          (i.triggerKind === void 0 || i.triggerKind === We.Invoked || i.triggerKind === We.Automatic)
        );
      }
      e.is = r;
    })(Rt || (Rt = {}));
    var Ut;
    (function (e) {
      function t(n, i, s) {
        let o = { title: n },
          c = !0;
        return typeof i == 'string' ? ((c = !1), (o.kind = i)) : be.is(i) ? (o.command = i) : (o.edit = i), c && s !== void 0 && (o.kind = s), o;
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          i &&
          b.string(i.title) &&
          (i.diagnostics === void 0 || b.typedArray(i.diagnostics, ne.is)) &&
          (i.kind === void 0 || b.string(i.kind)) &&
          (i.edit !== void 0 || i.command !== void 0) &&
          (i.command === void 0 || be.is(i.command)) &&
          (i.isPreferred === void 0 || b.boolean(i.isPreferred)) &&
          (i.edit === void 0 || qe.is(i.edit))
        );
      }
      e.is = r;
    })(Ut || (Ut = {}));
    var _n;
    (function (e) {
      function t(n, i) {
        let s = { range: n };
        return b.defined(i) && (s.data = i), s;
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && _.is(i.range) && (b.undefined(i.command) || be.is(i.command));
      }
      e.is = r;
    })(_n || (_n = {}));
    var jn;
    (function (e) {
      function t(n, i) {
        return { tabSize: n, insertSpaces: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && b.uinteger(i.tabSize) && b.boolean(i.insertSpaces);
      }
      e.is = r;
    })(jn || (jn = {}));
    var Bt;
    (function (e) {
      function t(n, i, s) {
        return { range: n, target: i, data: s };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && _.is(i.range) && (b.undefined(i.target) || b.string(i.target));
      }
      e.is = r;
    })(Bt || (Bt = {}));
    var Pe;
    (function (e) {
      function t(n, i) {
        return { range: n, parent: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.objectLiteral(i) && _.is(i.range) && (i.parent === void 0 || e.is(i.parent));
      }
      e.is = r;
    })(Pe || (Pe = {}));
    var Vn;
    (function (e) {
      (e.namespace = 'namespace'),
        (e.type = 'type'),
        (e.class = 'class'),
        (e.enum = 'enum'),
        (e.interface = 'interface'),
        (e.struct = 'struct'),
        (e.typeParameter = 'typeParameter'),
        (e.parameter = 'parameter'),
        (e.variable = 'variable'),
        (e.property = 'property'),
        (e.enumMember = 'enumMember'),
        (e.event = 'event'),
        (e.function = 'function'),
        (e.method = 'method'),
        (e.macro = 'macro'),
        (e.keyword = 'keyword'),
        (e.modifier = 'modifier'),
        (e.comment = 'comment'),
        (e.string = 'string'),
        (e.number = 'number'),
        (e.regexp = 'regexp'),
        (e.operator = 'operator'),
        (e.decorator = 'decorator');
    })(Vn || (Vn = {}));
    var Mn;
    (function (e) {
      (e.declaration = 'declaration'),
        (e.definition = 'definition'),
        (e.readonly = 'readonly'),
        (e.static = 'static'),
        (e.deprecated = 'deprecated'),
        (e.abstract = 'abstract'),
        (e.async = 'async'),
        (e.modification = 'modification'),
        (e.documentation = 'documentation'),
        (e.defaultLibrary = 'defaultLibrary');
    })(Mn || (Mn = {}));
    var Fn;
    (function (e) {
      function t(r) {
        let n = r;
        return (
          b.objectLiteral(n) &&
          (n.resultId === void 0 || typeof n.resultId == 'string') &&
          Array.isArray(n.data) &&
          (n.data.length === 0 || typeof n.data[0] == 'number')
        );
      }
      e.is = t;
    })(Fn || (Fn = {}));
    var $n;
    (function (e) {
      function t(n, i) {
        return { range: n, text: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return i != null && _.is(i.range) && b.string(i.text);
      }
      e.is = r;
    })($n || ($n = {}));
    var Dn;
    (function (e) {
      function t(n, i, s) {
        return { range: n, variableName: i, caseSensitiveLookup: s };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return i != null && _.is(i.range) && b.boolean(i.caseSensitiveLookup) && (b.string(i.variableName) || i.variableName === void 0);
      }
      e.is = r;
    })(Dn || (Dn = {}));
    var Rn;
    (function (e) {
      function t(n, i) {
        return { range: n, expression: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return i != null && _.is(i.range) && (b.string(i.expression) || i.expression === void 0);
      }
      e.is = r;
    })(Rn || (Rn = {}));
    var Un;
    (function (e) {
      function t(n, i) {
        return { frameId: n, stoppedLocation: i };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return b.defined(i) && _.is(n.stoppedLocation);
      }
      e.is = r;
    })(Un || (Un = {}));
    var Jt;
    (function (e) {
      (e.Type = 1), (e.Parameter = 2);
      function t(r) {
        return r === 1 || r === 2;
      }
      e.is = t;
    })(Jt || (Jt = {}));
    var Ct;
    (function (e) {
      function t(n) {
        return { value: n };
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          b.objectLiteral(i) &&
          (i.tooltip === void 0 || b.string(i.tooltip) || Ne.is(i.tooltip)) &&
          (i.location === void 0 || ue.is(i.location)) &&
          (i.command === void 0 || be.is(i.command))
        );
      }
      e.is = r;
    })(Ct || (Ct = {}));
    var Bn;
    (function (e) {
      function t(n, i, s) {
        let o = { position: n, label: i };
        return s !== void 0 && (o.kind = s), o;
      }
      e.create = t;
      function r(n) {
        let i = n;
        return (
          (b.objectLiteral(i) &&
            D.is(i.position) &&
            (b.string(i.label) || b.typedArray(i.label, Ct.is)) &&
            (i.kind === void 0 || Jt.is(i.kind)) &&
            i.textEdits === void 0) ||
          (b.typedArray(i.textEdits, G.is) &&
            (i.tooltip === void 0 || b.string(i.tooltip) || Ne.is(i.tooltip)) &&
            (i.paddingLeft === void 0 || b.boolean(i.paddingLeft)) &&
            (i.paddingRight === void 0 || b.boolean(i.paddingRight)))
        );
      }
      e.is = r;
    })(Bn || (Bn = {}));
    var Jn;
    (function (e) {
      function t(r) {
        return { kind: 'snippet', value: r };
      }
      e.createSnippet = t;
    })(Jn || (Jn = {}));
    var Cn;
    (function (e) {
      function t(r, n, i, s) {
        return { insertText: r, filterText: n, range: i, command: s };
      }
      e.create = t;
    })(Cn || (Cn = {}));
    var qn;
    (function (e) {
      function t(r) {
        return { items: r };
      }
      e.create = t;
    })(qn || (qn = {}));
    var Wn;
    (function (e) {
      (e.Invoked = 0), (e.Automatic = 1);
    })(Wn || (Wn = {}));
    var zn;
    (function (e) {
      function t(r, n) {
        return { range: r, text: n };
      }
      e.create = t;
    })(zn || (zn = {}));
    var Hn;
    (function (e) {
      function t(r, n) {
        return { triggerKind: r, selectedCompletionInfo: n };
      }
      e.create = t;
    })(Hn || (Hn = {}));
    var Gn;
    (function (e) {
      function t(r) {
        let n = r;
        return b.objectLiteral(n) && xt.is(n.uri) && b.string(n.name);
      }
      e.is = t;
    })(Gn || (Gn = {}));
    var Xn;
    (function (e) {
      function t(s, o, c, l) {
        return new qt(s, o, c, l);
      }
      e.create = t;
      function r(s) {
        let o = s;
        return !!(
          b.defined(o) &&
          b.string(o.uri) &&
          (b.undefined(o.languageId) || b.string(o.languageId)) &&
          b.uinteger(o.lineCount) &&
          b.func(o.getText) &&
          b.func(o.positionAt) &&
          b.func(o.offsetAt)
        );
      }
      e.is = r;
      function n(s, o) {
        let c = s.getText(),
          l = i(o, (u, f) => {
            let d = u.range.start.line - f.range.start.line;
            return d === 0 ? u.range.start.character - f.range.start.character : d;
          }),
          a = c.length;
        for (let u = l.length - 1; u >= 0; u--) {
          let f = l[u],
            d = s.offsetAt(f.range.start),
            h = s.offsetAt(f.range.end);
          if (h <= a) c = c.substring(0, d) + f.newText + c.substring(h, c.length);
          else throw new Error('Overlapping edit');
          a = d;
        }
        return c;
      }
      e.applyEdits = n;
      function i(s, o) {
        if (s.length <= 1) return s;
        let c = (s.length / 2) | 0,
          l = s.slice(0, c),
          a = s.slice(c);
        i(l, o), i(a, o);
        let u = 0,
          f = 0,
          d = 0;
        for (; u < l.length && f < a.length; ) o(l[u], a[f]) <= 0 ? (s[d++] = l[u++]) : (s[d++] = a[f++]);
        for (; u < l.length; ) s[d++] = l[u++];
        for (; f < a.length; ) s[d++] = a[f++];
        return s;
      }
    })(Xn || (Xn = {}));
    var qt = class {
        constructor(t, r, n, i) {
          (this._uri = t), (this._languageId = r), (this._version = n), (this._content = i), (this._lineOffsets = void 0);
        }
        get uri() {
          return this._uri;
        }
        get languageId() {
          return this._languageId;
        }
        get version() {
          return this._version;
        }
        getText(t) {
          if (t) {
            let r = this.offsetAt(t.start),
              n = this.offsetAt(t.end);
            return this._content.substring(r, n);
          }
          return this._content;
        }
        update(t, r) {
          (this._content = t.text), (this._version = r), (this._lineOffsets = void 0);
        }
        getLineOffsets() {
          if (this._lineOffsets === void 0) {
            let t = [],
              r = this._content,
              n = !0;
            for (let i = 0; i < r.length; i++) {
              n && (t.push(i), (n = !1));
              let s = r.charAt(i);
              (n =
                s === '\r' ||
                s ===
                  `
`),
                s === '\r' &&
                  i + 1 < r.length &&
                  r.charAt(i + 1) ===
                    `
` &&
                  i++;
            }
            n && r.length > 0 && t.push(r.length), (this._lineOffsets = t);
          }
          return this._lineOffsets;
        }
        positionAt(t) {
          t = Math.max(Math.min(t, this._content.length), 0);
          let r = this.getLineOffsets(),
            n = 0,
            i = r.length;
          if (i === 0) return D.create(0, t);
          for (; n < i; ) {
            let o = Math.floor((n + i) / 2);
            r[o] > t ? (i = o) : (n = o + 1);
          }
          let s = n - 1;
          return D.create(s, t - r[s]);
        }
        offsetAt(t) {
          let r = this.getLineOffsets();
          if (t.line >= r.length) return this._content.length;
          if (t.line < 0) return 0;
          let n = r[t.line],
            i = t.line + 1 < r.length ? r[t.line + 1] : this._content.length;
          return Math.max(Math.min(n + t.character, i), n);
        }
        get lineCount() {
          return this.getLineOffsets().length;
        }
      },
      b;
    (function (e) {
      let t = Object.prototype.toString;
      function r(h) {
        return typeof h < 'u';
      }
      e.defined = r;
      function n(h) {
        return typeof h > 'u';
      }
      e.undefined = n;
      function i(h) {
        return h === !0 || h === !1;
      }
      e.boolean = i;
      function s(h) {
        return t.call(h) === '[object String]';
      }
      e.string = s;
      function o(h) {
        return t.call(h) === '[object Number]';
      }
      e.number = o;
      function c(h, p, m) {
        return t.call(h) === '[object Number]' && p <= h && h <= m;
      }
      e.numberRange = c;
      function l(h) {
        return t.call(h) === '[object Number]' && -2147483648 <= h && h <= 2147483647;
      }
      e.integer = l;
      function a(h) {
        return t.call(h) === '[object Number]' && 0 <= h && h <= 2147483647;
      }
      e.uinteger = a;
      function u(h) {
        return t.call(h) === '[object Function]';
      }
      e.func = u;
      function f(h) {
        return h !== null && typeof h == 'object';
      }
      e.objectLiteral = f;
      function d(h, p) {
        return Array.isArray(h) && h.every(p);
      }
      e.typedArray = d;
    })(b || (b = {}));
    var ze = class e {
        constructor(t, r, n, i) {
          (this._uri = t), (this._languageId = r), (this._version = n), (this._content = i), (this._lineOffsets = void 0);
        }
        get uri() {
          return this._uri;
        }
        get languageId() {
          return this._languageId;
        }
        get version() {
          return this._version;
        }
        getText(t) {
          if (t) {
            let r = this.offsetAt(t.start),
              n = this.offsetAt(t.end);
            return this._content.substring(r, n);
          }
          return this._content;
        }
        update(t, r) {
          for (let n of t)
            if (e.isIncremental(n)) {
              let i = Qn(n.range),
                s = this.offsetAt(i.start),
                o = this.offsetAt(i.end);
              this._content = this._content.substring(0, s) + n.text + this._content.substring(o, this._content.length);
              let c = Math.max(i.start.line, 0),
                l = Math.max(i.end.line, 0),
                a = this._lineOffsets,
                u = Zn(n.text, !1, s);
              if (l - c === u.length) for (let d = 0, h = u.length; d < h; d++) a[d + c + 1] = u[d];
              else u.length < 1e4 ? a.splice(c + 1, l - c, ...u) : (this._lineOffsets = a = a.slice(0, c + 1).concat(u, a.slice(l + 1)));
              let f = n.text.length - (o - s);
              if (f !== 0) for (let d = c + 1 + u.length, h = a.length; d < h; d++) a[d] = a[d] + f;
            } else if (e.isFull(n)) (this._content = n.text), (this._lineOffsets = void 0);
            else throw new Error('Unknown change event received');
          this._version = r;
        }
        getLineOffsets() {
          return this._lineOffsets === void 0 && (this._lineOffsets = Zn(this._content, !0)), this._lineOffsets;
        }
        positionAt(t) {
          t = Math.max(Math.min(t, this._content.length), 0);
          let r = this.getLineOffsets(),
            n = 0,
            i = r.length;
          if (i === 0) return { line: 0, character: t };
          for (; n < i; ) {
            let o = Math.floor((n + i) / 2);
            r[o] > t ? (i = o) : (n = o + 1);
          }
          let s = n - 1;
          return { line: s, character: t - r[s] };
        }
        offsetAt(t) {
          let r = this.getLineOffsets();
          if (t.line >= r.length) return this._content.length;
          if (t.line < 0) return 0;
          let n = r[t.line],
            i = t.line + 1 < r.length ? r[t.line + 1] : this._content.length;
          return Math.max(Math.min(n + t.character, i), n);
        }
        get lineCount() {
          return this.getLineOffsets().length;
        }
        static isIncremental(t) {
          let r = t;
          return r != null && typeof r.text == 'string' && r.range !== void 0 && (r.rangeLength === void 0 || typeof r.rangeLength == 'number');
        }
        static isFull(t) {
          let r = t;
          return r != null && typeof r.text == 'string' && r.range === void 0 && r.rangeLength === void 0;
        }
      },
      X;
    (function (e) {
      function t(i, s, o, c) {
        return new ze(i, s, o, c);
      }
      e.create = t;
      function r(i, s, o) {
        if (i instanceof ze) return i.update(s, o), i;
        throw new Error('TextDocument.update: document must be created by TextDocument.create');
      }
      e.update = r;
      function n(i, s) {
        let o = i.getText(),
          c = Wt(s.map(Vr), (u, f) => {
            let d = u.range.start.line - f.range.start.line;
            return d === 0 ? u.range.start.character - f.range.start.character : d;
          }),
          l = 0,
          a = [];
        for (let u of c) {
          let f = i.offsetAt(u.range.start);
          if (f < l) throw new Error('Overlapping edit');
          f > l && a.push(o.substring(l, f)), u.newText.length && a.push(u.newText), (l = i.offsetAt(u.range.end));
        }
        return a.push(o.substr(l)), a.join('');
      }
      e.applyEdits = n;
    })(X || (X = {}));
    function Wt(e, t) {
      if (e.length <= 1) return e;
      let r = (e.length / 2) | 0,
        n = e.slice(0, r),
        i = e.slice(r);
      Wt(n, t), Wt(i, t);
      let s = 0,
        o = 0,
        c = 0;
      for (; s < n.length && o < i.length; ) t(n[s], i[o]) <= 0 ? (e[c++] = n[s++]) : (e[c++] = i[o++]);
      for (; s < n.length; ) e[c++] = n[s++];
      for (; o < i.length; ) e[c++] = i[o++];
      return e;
    }
    function Zn(e, t, r = 0) {
      let n = t ? [r] : [];
      for (let i = 0; i < e.length; i++) {
        let s = e.charCodeAt(i);
        (s === 13 || s === 10) && (s === 13 && i + 1 < e.length && e.charCodeAt(i + 1) === 10 && i++, n.push(r + i + 1));
      }
      return n;
    }
    function Qn(e) {
      let t = e.start,
        r = e.end;
      return t.line > r.line || (t.line === r.line && t.character > r.character) ? { start: r, end: t } : e;
    }
    function Vr(e) {
      let t = Qn(e.range);
      return t !== e.range ? { newText: e.newText, range: t } : e;
    }
    var M;
    (function (e) {
      (e[(e.Undefined = 0)] = 'Undefined'),
        (e[(e.EnumValueMismatch = 1)] = 'EnumValueMismatch'),
        (e[(e.Deprecated = 2)] = 'Deprecated'),
        (e[(e.UnexpectedEndOfComment = 257)] = 'UnexpectedEndOfComment'),
        (e[(e.UnexpectedEndOfString = 258)] = 'UnexpectedEndOfString'),
        (e[(e.UnexpectedEndOfNumber = 259)] = 'UnexpectedEndOfNumber'),
        (e[(e.InvalidUnicode = 260)] = 'InvalidUnicode'),
        (e[(e.InvalidEscapeCharacter = 261)] = 'InvalidEscapeCharacter'),
        (e[(e.InvalidCharacter = 262)] = 'InvalidCharacter'),
        (e[(e.PropertyExpected = 513)] = 'PropertyExpected'),
        (e[(e.CommaExpected = 514)] = 'CommaExpected'),
        (e[(e.ColonExpected = 515)] = 'ColonExpected'),
        (e[(e.ValueExpected = 516)] = 'ValueExpected'),
        (e[(e.CommaOrCloseBacketExpected = 517)] = 'CommaOrCloseBacketExpected'),
        (e[(e.CommaOrCloseBraceExpected = 518)] = 'CommaOrCloseBraceExpected'),
        (e[(e.TrailingComma = 519)] = 'TrailingComma'),
        (e[(e.DuplicateKey = 520)] = 'DuplicateKey'),
        (e[(e.CommentNotPermitted = 521)] = 'CommentNotPermitted'),
        (e[(e.PropertyKeysMustBeDoublequoted = 528)] = 'PropertyKeysMustBeDoublequoted'),
        (e[(e.SchemaResolveError = 768)] = 'SchemaResolveError'),
        (e[(e.SchemaUnsupportedFeature = 769)] = 'SchemaUnsupportedFeature');
    })(M || (M = {}));
    var ie;
    (function (e) {
      (e[(e.v3 = 3)] = 'v3'),
        (e[(e.v4 = 4)] = 'v4'),
        (e[(e.v6 = 6)] = 'v6'),
        (e[(e.v7 = 7)] = 'v7'),
        (e[(e.v2019_09 = 19)] = 'v2019_09'),
        (e[(e.v2020_12 = 20)] = 'v2020_12');
    })(ie || (ie = {}));
    var He;
    (function (e) {
      e.LATEST = {
        textDocument: {
          completion: { completionItem: { documentationFormat: [le.Markdown, le.PlainText], commitCharactersSupport: !0, labelDetailsSupport: !0 } },
        },
      };
    })(He || (He = {}));
    var Mr;
    function A(...e) {
      let t = e[0],
        r,
        n,
        i;
      if (typeof t == 'string') (r = t), (n = t), e.splice(0, 1), (i = !e || typeof e[0] != 'object' ? e : e[0]);
      else if (t instanceof Array) {
        let o = e.slice(1);
        if (t.length !== o.length + 1) throw new Error('expected a string as the first argument to l10n.t');
        let c = t[0];
        for (let l = 1; l < t.length; l++) c += `{${l - 1}}` + t[l];
        return A(c, ...o);
      } else
        (n = t.message),
          (r = n),
          t.comment && t.comment.length > 0 && (r += `/${Array.isArray(t.comment) ? t.comment.join('') : t.comment}`),
          (i = t.args ?? {});
      let s = Mr?.[r];
      return s ? (typeof s == 'string' ? Ge(s, i) : s.comment ? Ge(s.message, i) : Ge(n, i)) : Ge(n, i);
    }
    var Fr = /{([^}]+)}/g;
    function Ge(e, t) {
      return Object.keys(t).length === 0 ? e : e.replace(Fr, (r, n) => t[n] ?? r);
    }
    var $r = {
        'color-hex': {
          errorMessage: A('Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA.'),
          pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/,
        },
        'date-time': {
          errorMessage: A('String is not a RFC3339 date-time.'),
          pattern:
            /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i,
        },
        date: { errorMessage: A('String is not a RFC3339 date.'), pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i },
        time: {
          errorMessage: A('String is not a RFC3339 time.'),
          pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i,
        },
        email: {
          errorMessage: A('String is not an e-mail address.'),
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/,
        },
        hostname: {
          errorMessage: A('String is not a hostname.'),
          pattern: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
        },
        ipv4: {
          errorMessage: A('String is not an IPv4 address.'),
          pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
        },
        ipv6: {
          errorMessage: A('String is not an IPv6 address.'),
          pattern:
            /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
        },
      },
      ce = class {
        constructor(t, r, n = 0) {
          (this.offset = r), (this.length = n), (this.parent = t);
        }
        get children() {
          return [];
        }
        toString() {
          return (
            'type: ' + this.type + ' (' + this.offset + '/' + this.length + ')' + (this.parent ? ' parent: {' + this.parent.toString() + '}' : '')
          );
        }
      },
      zt = class extends ce {
        constructor(t, r) {
          super(t, r), (this.type = 'null'), (this.value = null);
        }
      },
      Xe = class extends ce {
        constructor(t, r, n) {
          super(t, n), (this.type = 'boolean'), (this.value = r);
        }
      },
      Ht = class extends ce {
        constructor(t, r) {
          super(t, r), (this.type = 'array'), (this.items = []);
        }
        get children() {
          return this.items;
        }
      },
      Gt = class extends ce {
        constructor(t, r) {
          super(t, r), (this.type = 'number'), (this.isInteger = !0), (this.value = Number.NaN);
        }
      },
      je = class extends ce {
        constructor(t, r, n) {
          super(t, r, n), (this.type = 'string'), (this.value = '');
        }
      },
      Xt = class extends ce {
        constructor(t, r, n) {
          super(t, r), (this.type = 'property'), (this.colonOffset = -1), (this.keyNode = n);
        }
        get children() {
          return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
        }
      },
      Zt = class extends ce {
        constructor(t, r) {
          super(t, r), (this.type = 'object'), (this.properties = []);
        }
        get children() {
          return this.properties;
        }
      };
    function Z(e) {
      return te(e) ? (e ? {} : { not: {} }) : e;
    }
    var Yn;
    (function (e) {
      (e[(e.Key = 0)] = 'Key'), (e[(e.Enum = 1)] = 'Enum');
    })(Yn || (Yn = {}));
    var Dr = {
        'http://json-schema.org/draft-03/schema#': ie.v3,
        'http://json-schema.org/draft-04/schema#': ie.v4,
        'http://json-schema.org/draft-06/schema#': ie.v6,
        'http://json-schema.org/draft-07/schema#': ie.v7,
        'https://json-schema.org/draft/2019-09/schema': ie.v2019_09,
        'https://json-schema.org/draft/2020-12/schema': ie.v2020_12,
      },
      Ze = class {
        constructor(t) {
          this.schemaDraft = t;
        }
      },
      Qt = class e {
        constructor(t = -1, r) {
          (this.focusOffset = t), (this.exclude = r), (this.schemas = []);
        }
        add(t) {
          this.schemas.push(t);
        }
        merge(t) {
          Array.prototype.push.apply(this.schemas, t.schemas);
        }
        include(t) {
          return (this.focusOffset === -1 || Yt(t, this.focusOffset)) && t !== this.exclude;
        }
        newSub() {
          return new e(-1, this.exclude);
        }
      },
      ve = class {
        constructor() {}
        get schemas() {
          return [];
        }
        add(t) {}
        merge(t) {}
        include(t) {
          return !0;
        }
        newSub() {
          return this;
        }
      };
    ve.instance = new ve();
    var q = class {
      constructor() {
        (this.problems = []),
          (this.propertiesMatches = 0),
          (this.processedProperties = new Set()),
          (this.propertiesValueMatches = 0),
          (this.primaryValueMatches = 0),
          (this.enumValueMatch = !1),
          (this.enumValues = void 0);
      }
      hasProblems() {
        return !!this.problems.length;
      }
      merge(t) {
        (this.problems = this.problems.concat(t.problems)),
          (this.propertiesMatches += t.propertiesMatches),
          (this.propertiesValueMatches += t.propertiesValueMatches),
          this.mergeProcessedProperties(t);
      }
      mergeEnumValues(t) {
        if (!this.enumValueMatch && !t.enumValueMatch && this.enumValues && t.enumValues) {
          this.enumValues = this.enumValues.concat(t.enumValues);
          for (let r of this.problems)
            r.code === M.EnumValueMismatch &&
              (r.message = A('Value is not accepted. Valid values: {0}.', this.enumValues.map((n) => JSON.stringify(n)).join(', ')));
        }
      }
      mergePropertyMatch(t) {
        (this.problems = this.problems.concat(t.problems)),
          this.propertiesMatches++,
          (t.enumValueMatch || (!t.hasProblems() && t.propertiesMatches)) && this.propertiesValueMatches++,
          t.enumValueMatch && t.enumValues && t.enumValues.length === 1 && this.primaryValueMatches++;
      }
      mergeProcessedProperties(t) {
        t.processedProperties.forEach((r) => this.processedProperties.add(r));
      }
      compare(t) {
        let r = this.hasProblems();
        return r !== t.hasProblems()
          ? r
            ? -1
            : 1
          : this.enumValueMatch !== t.enumValueMatch
          ? t.enumValueMatch
            ? -1
            : 1
          : this.primaryValueMatches !== t.primaryValueMatches
          ? this.primaryValueMatches - t.primaryValueMatches
          : this.propertiesValueMatches !== t.propertiesValueMatches
          ? this.propertiesValueMatches - t.propertiesValueMatches
          : this.propertiesMatches - t.propertiesMatches;
      }
    };
    function er(e, t = []) {
      return new Qe(e, t, []);
    }
    function ae(e) {
      return gn(e);
    }
    function Ve(e) {
      return pn(e);
    }
    function Yt(e, t, r = !1) {
      return (t >= e.offset && t < e.offset + e.length) || (r && t === e.offset + e.length);
    }
    var Qe = class {
      constructor(t, r = [], n = []) {
        (this.root = t), (this.syntaxErrors = r), (this.comments = n);
      }
      getNodeFromOffset(t, r = !1) {
        if (this.root) return hn(this.root, t, r);
      }
      visit(t) {
        if (this.root) {
          let r = (n) => {
            let i = t(n),
              s = n.children;
            if (Array.isArray(s)) for (let o = 0; o < s.length && i; o++) i = r(s[o]);
            return i;
          };
          r(this.root);
        }
      }
      validate(t, r, n = z.Warning, i) {
        if (this.root && r) {
          let s = new q();
          return (
            C(this.root, r, s, ve.instance, new Ze(i ?? Kn(r))),
            s.problems.map((o) => {
              let c = _.create(t.positionAt(o.location.offset), t.positionAt(o.location.offset + o.location.length));
              return ne.create(c, o.message, o.severity ?? n, o.code);
            })
          );
        }
      }
      getMatchingSchemas(t, r = -1, n) {
        if (this.root && t) {
          let i = new Qt(r, n),
            s = Kn(t),
            o = new Ze(s);
          return C(this.root, t, new q(), i, o), i.schemas;
        }
        return [];
      }
    };
    function Kn(e, t = ie.v2020_12) {
      let r = e.$schema;
      return r ? Dr[r] ?? t : t;
    }
    function C(e, t, r, n, i) {
      if (!e || !n.include(e)) return;
      if (e.type === 'property') return C(e.valueNode, t, r, n, i);
      let s = e;
      switch ((o(), s.type)) {
        case 'object':
          u(s);
          break;
        case 'array':
          a(s);
          break;
        case 'string':
          l(s);
          break;
        case 'number':
          c(s);
          break;
      }
      n.add({ node: s, schema: t });
      function o() {
        function f(w) {
          return s.type === w || (w === 'integer' && s.type === 'number' && s.isInteger);
        }
        if (
          (Array.isArray(t.type)
            ? t.type.some(f) ||
              r.problems.push({
                location: { offset: s.offset, length: s.length },
                message: t.errorMessage || A('Incorrect type. Expected one of {0}.', t.type.join(', ')),
              })
            : t.type &&
              (f(t.type) ||
                r.problems.push({
                  location: { offset: s.offset, length: s.length },
                  message: t.errorMessage || A('Incorrect type. Expected "{0}".', t.type),
                })),
          Array.isArray(t.allOf))
        )
          for (let w of t.allOf) {
            let g = new q(),
              S = n.newSub();
            C(s, Z(w), g, S, i), r.merge(g), n.merge(S);
          }
        let d = Z(t.not);
        if (d) {
          let w = new q(),
            g = n.newSub();
          C(s, d, w, g, i),
            w.hasProblems() ||
              r.problems.push({
                location: { offset: s.offset, length: s.length },
                message: t.errorMessage || A('Matches a schema that is not allowed.'),
              });
          for (let S of g.schemas) (S.inverted = !S.inverted), n.add(S);
        }
        let h = (w, g) => {
          let S = [],
            x;
          for (let T of w) {
            let O = Z(T),
              I = new q(),
              E = n.newSub();
            if ((C(s, O, I, E, i), I.hasProblems() || S.push(O), !x)) x = { schema: O, validationResult: I, matchingSchemas: E };
            else if (!g && !I.hasProblems() && !x.validationResult.hasProblems())
              x.matchingSchemas.merge(E),
                (x.validationResult.propertiesMatches += I.propertiesMatches),
                (x.validationResult.propertiesValueMatches += I.propertiesValueMatches),
                x.validationResult.mergeProcessedProperties(I);
            else {
              let j = I.compare(x.validationResult);
              j > 0
                ? (x = { schema: O, validationResult: I, matchingSchemas: E })
                : j === 0 && (x.matchingSchemas.merge(E), x.validationResult.mergeEnumValues(I));
            }
          }
          return (
            S.length > 1 &&
              g &&
              r.problems.push({ location: { offset: s.offset, length: 1 }, message: A('Matches multiple schemas when only one must validate.') }),
            x && (r.merge(x.validationResult), n.merge(x.matchingSchemas)),
            S.length
          );
        };
        Array.isArray(t.anyOf) && h(t.anyOf, !1), Array.isArray(t.oneOf) && h(t.oneOf, !0);
        let p = (w) => {
            let g = new q(),
              S = n.newSub();
            C(s, Z(w), g, S, i), r.merge(g), n.merge(S);
          },
          m = (w, g, S) => {
            let x = Z(w),
              T = new q(),
              O = n.newSub();
            C(s, x, T, O, i), n.merge(O), r.mergeProcessedProperties(T), T.hasProblems() ? S && p(S) : g && p(g);
          },
          y = Z(t.if);
        if ((y && m(y, Z(t.then), Z(t.else)), Array.isArray(t.enum))) {
          let w = ae(s),
            g = !1;
          for (let S of t.enum)
            if (ge(w, S)) {
              g = !0;
              break;
            }
          (r.enumValues = t.enum),
            (r.enumValueMatch = g),
            g ||
              r.problems.push({
                location: { offset: s.offset, length: s.length },
                code: M.EnumValueMismatch,
                message: t.errorMessage || A('Value is not accepted. Valid values: {0}.', t.enum.map((S) => JSON.stringify(S)).join(', ')),
              });
        }
        if (Y(t.const)) {
          let w = ae(s);
          ge(w, t.const)
            ? (r.enumValueMatch = !0)
            : (r.problems.push({
                location: { offset: s.offset, length: s.length },
                code: M.EnumValueMismatch,
                message: t.errorMessage || A('Value must be {0}.', JSON.stringify(t.const)),
              }),
              (r.enumValueMatch = !1)),
            (r.enumValues = [t.const]);
        }
        let k = t.deprecationMessage;
        if (k || t.deprecated) {
          k = k || A('Value is deprecated');
          let w = s.parent?.type === 'property' ? s.parent : s;
          r.problems.push({ location: { offset: w.offset, length: w.length }, severity: z.Warning, message: k, code: M.Deprecated });
        }
      }
      function c(f) {
        let d = f.value;
        function h(S) {
          let x = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(S.toString());
          return x && { value: Number(x[1] + (x[2] || '')), multiplier: (x[2]?.length || 0) - (parseInt(x[3]) || 0) };
        }
        if (W(t.multipleOf)) {
          let S = -1;
          if (Number.isInteger(t.multipleOf)) S = d % t.multipleOf;
          else {
            let x = h(t.multipleOf),
              T = h(d);
            if (x && T) {
              let O = 10 ** Math.abs(T.multiplier - x.multiplier);
              T.multiplier < x.multiplier ? (T.value *= O) : (x.value *= O), (S = T.value % x.value);
            }
          }
          S !== 0 &&
            r.problems.push({ location: { offset: f.offset, length: f.length }, message: A('Value is not divisible by {0}.', t.multipleOf) });
        }
        function p(S, x) {
          if (W(x)) return x;
          if (te(x) && x) return S;
        }
        function m(S, x) {
          if (!te(x) || !x) return S;
        }
        let y = p(t.minimum, t.exclusiveMinimum);
        W(y) &&
          d <= y &&
          r.problems.push({ location: { offset: f.offset, length: f.length }, message: A('Value is below the exclusive minimum of {0}.', y) });
        let k = p(t.maximum, t.exclusiveMaximum);
        W(k) &&
          d >= k &&
          r.problems.push({ location: { offset: f.offset, length: f.length }, message: A('Value is above the exclusive maximum of {0}.', k) });
        let w = m(t.minimum, t.exclusiveMinimum);
        W(w) && d < w && r.problems.push({ location: { offset: f.offset, length: f.length }, message: A('Value is below the minimum of {0}.', w) });
        let g = m(t.maximum, t.exclusiveMaximum);
        W(g) && d > g && r.problems.push({ location: { offset: f.offset, length: f.length }, message: A('Value is above the maximum of {0}.', g) });
      }
      function l(f) {
        if (
          (W(t.minLength) &&
            bt(f.value) < t.minLength &&
            r.problems.push({
              location: { offset: f.offset, length: f.length },
              message: A('String is shorter than the minimum length of {0}.', t.minLength),
            }),
          W(t.maxLength) &&
            bt(f.value) > t.maxLength &&
            r.problems.push({
              location: { offset: f.offset, length: f.length },
              message: A('String is longer than the maximum length of {0}.', t.maxLength),
            }),
          Ue(t.pattern) &&
            (me(t.pattern)?.test(f.value) ||
              r.problems.push({
                location: { offset: f.offset, length: f.length },
                message: t.patternErrorMessage || t.errorMessage || A('String does not match the pattern of "{0}".', t.pattern),
              })),
          t.format)
        )
          switch (t.format) {
            case 'uri':
            case 'uri-reference':
              {
                let h;
                if (!f.value) h = A('URI expected.');
                else {
                  let p = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(f.value);
                  p ? !p[2] && t.format === 'uri' && (h = A('URI with a scheme is expected.')) : (h = A('URI is expected.'));
                }
                h &&
                  r.problems.push({
                    location: { offset: f.offset, length: f.length },
                    message: t.patternErrorMessage || t.errorMessage || A('String is not a URI: {0}', h),
                  });
              }
              break;
            case 'color-hex':
            case 'date-time':
            case 'date':
            case 'time':
            case 'email':
            case 'hostname':
            case 'ipv4':
            case 'ipv6':
              let d = $r[t.format];
              (!f.value || !d.pattern.exec(f.value)) &&
                r.problems.push({
                  location: { offset: f.offset, length: f.length },
                  message: t.patternErrorMessage || t.errorMessage || d.errorMessage,
                });
            default:
          }
      }
      function a(f) {
        let d, h;
        i.schemaDraft >= ie.v2020_12
          ? ((d = t.prefixItems), (h = Array.isArray(t.items) ? void 0 : t.items))
          : ((d = Array.isArray(t.items) ? t.items : void 0), (h = Array.isArray(t.items) ? t.additionalItems : t.items));
        let p = 0;
        if (d !== void 0) {
          let k = Math.min(d.length, f.items.length);
          for (; p < k; p++) {
            let w = d[p],
              g = Z(w),
              S = new q(),
              x = f.items[p];
            x && (C(x, g, S, n, i), r.mergePropertyMatch(S)), r.processedProperties.add(String(p));
          }
        }
        if (h !== void 0 && p < f.items.length)
          if (typeof h == 'boolean')
            for (
              h === !1 &&
              r.problems.push({
                location: { offset: f.offset, length: f.length },
                message: A('Array has too many items according to schema. Expected {0} or fewer.', p),
              });
              p < f.items.length;
              p++
            )
              r.processedProperties.add(String(p)), r.propertiesValueMatches++;
          else
            for (; p < f.items.length; p++) {
              let k = new q();
              C(f.items[p], h, k, n, i), r.mergePropertyMatch(k), r.processedProperties.add(String(p));
            }
        let m = Z(t.contains);
        if (m) {
          let k = 0;
          for (let w = 0; w < f.items.length; w++) {
            let g = f.items[w],
              S = new q();
            C(g, m, S, ve.instance, i), S.hasProblems() || (k++, i.schemaDraft >= ie.v2020_12 && r.processedProperties.add(String(w)));
          }
          k === 0 &&
            !W(t.minContains) &&
            r.problems.push({
              location: { offset: f.offset, length: f.length },
              message: t.errorMessage || A('Array does not contain required item.'),
            }),
            W(t.minContains) &&
              k < t.minContains &&
              r.problems.push({
                location: { offset: f.offset, length: f.length },
                message: t.errorMessage || A('Array has too few items that match the contains contraint. Expected {0} or more.', t.minContains),
              }),
            W(t.maxContains) &&
              k > t.maxContains &&
              r.problems.push({
                location: { offset: f.offset, length: f.length },
                message: t.errorMessage || A('Array has too many items that match the contains contraint. Expected {0} or less.', t.maxContains),
              });
        }
        let y = t.unevaluatedItems;
        if (y !== void 0)
          for (let k = 0; k < f.items.length; k++) {
            if (!r.processedProperties.has(String(k)))
              if (y === !1)
                r.problems.push({
                  location: { offset: f.offset, length: f.length },
                  message: A('Item does not match any validation rule from the array.'),
                });
              else {
                let w = new q();
                C(f.items[k], t.unevaluatedItems, w, n, i), r.mergePropertyMatch(w);
              }
            r.processedProperties.add(String(k)), r.propertiesValueMatches++;
          }
        if (
          (W(t.minItems) &&
            f.items.length < t.minItems &&
            r.problems.push({
              location: { offset: f.offset, length: f.length },
              message: A('Array has too few items. Expected {0} or more.', t.minItems),
            }),
          W(t.maxItems) &&
            f.items.length > t.maxItems &&
            r.problems.push({
              location: { offset: f.offset, length: f.length },
              message: A('Array has too many items. Expected {0} or fewer.', t.maxItems),
            }),
          t.uniqueItems === !0)
        ) {
          let w = function () {
              for (let g = 0; g < k.length - 1; g++) {
                let S = k[g];
                for (let x = g + 1; x < k.length; x++) if (ge(S, k[x])) return !0;
              }
              return !1;
            },
            k = ae(f);
          w() && r.problems.push({ location: { offset: f.offset, length: f.length }, message: A('Array has duplicate items.') });
        }
      }
      function u(f) {
        let d = Object.create(null),
          h = new Set();
        for (let g of f.properties) {
          let S = g.keyNode.value;
          (d[S] = g.valueNode), h.add(S);
        }
        if (Array.isArray(t.required)) {
          for (let g of t.required)
            if (!d[g]) {
              let S = f.parent && f.parent.type === 'property' && f.parent.keyNode,
                x = S ? { offset: S.offset, length: S.length } : { offset: f.offset, length: 1 };
              r.problems.push({ location: x, message: A('Missing property "{0}".', g) });
            }
        }
        let p = (g) => {
          h.delete(g), r.processedProperties.add(g);
        };
        if (t.properties)
          for (let g of Object.keys(t.properties)) {
            p(g);
            let S = t.properties[g],
              x = d[g];
            if (x)
              if (te(S))
                if (S) r.propertiesMatches++, r.propertiesValueMatches++;
                else {
                  let T = x.parent;
                  r.problems.push({
                    location: { offset: T.keyNode.offset, length: T.keyNode.length },
                    message: t.errorMessage || A('Property {0} is not allowed.', g),
                  });
                }
              else {
                let T = new q();
                C(x, S, T, n, i), r.mergePropertyMatch(T);
              }
          }
        if (t.patternProperties)
          for (let g of Object.keys(t.patternProperties)) {
            let S = me(g);
            if (S) {
              let x = [];
              for (let T of h)
                if (S.test(T)) {
                  x.push(T);
                  let O = d[T];
                  if (O) {
                    let I = t.patternProperties[g];
                    if (te(I))
                      if (I) r.propertiesMatches++, r.propertiesValueMatches++;
                      else {
                        let E = O.parent;
                        r.problems.push({
                          location: { offset: E.keyNode.offset, length: E.keyNode.length },
                          message: t.errorMessage || A('Property {0} is not allowed.', T),
                        });
                      }
                    else {
                      let E = new q();
                      C(O, I, E, n, i), r.mergePropertyMatch(E);
                    }
                  }
                }
              x.forEach(p);
            }
          }
        let m = t.additionalProperties;
        if (m !== void 0)
          for (let g of h) {
            p(g);
            let S = d[g];
            if (S) {
              if (m === !1) {
                let x = S.parent;
                r.problems.push({
                  location: { offset: x.keyNode.offset, length: x.keyNode.length },
                  message: t.errorMessage || A('Property {0} is not allowed.', g),
                });
              } else if (m !== !0) {
                let x = new q();
                C(S, m, x, n, i), r.mergePropertyMatch(x);
              }
            }
          }
        let y = t.unevaluatedProperties;
        if (y !== void 0) {
          let g = [];
          for (let S of h)
            if (!r.processedProperties.has(S)) {
              g.push(S);
              let x = d[S];
              if (x) {
                if (y === !1) {
                  let T = x.parent;
                  r.problems.push({
                    location: { offset: T.keyNode.offset, length: T.keyNode.length },
                    message: t.errorMessage || A('Property {0} is not allowed.', S),
                  });
                } else if (y !== !0) {
                  let T = new q();
                  C(x, y, T, n, i), r.mergePropertyMatch(T);
                }
              }
            }
          g.forEach(p);
        }
        if (
          (W(t.maxProperties) &&
            f.properties.length > t.maxProperties &&
            r.problems.push({
              location: { offset: f.offset, length: f.length },
              message: A('Object has more properties than limit of {0}.', t.maxProperties),
            }),
          W(t.minProperties) &&
            f.properties.length < t.minProperties &&
            r.problems.push({
              location: { offset: f.offset, length: f.length },
              message: A('Object has fewer properties than the required number of {0}', t.minProperties),
            }),
          t.dependentRequired)
        )
          for (let g in t.dependentRequired) {
            let S = d[g],
              x = t.dependentRequired[g];
            S && Array.isArray(x) && w(g, x);
          }
        if (t.dependentSchemas)
          for (let g in t.dependentSchemas) {
            let S = d[g],
              x = t.dependentSchemas[g];
            S && oe(x) && w(g, x);
          }
        if (t.dependencies) for (let g in t.dependencies) d[g] && w(g, t.dependencies[g]);
        let k = Z(t.propertyNames);
        if (k)
          for (let g of f.properties) {
            let S = g.keyNode;
            S && C(S, k, r, ve.instance, i);
          }
        function w(g, S) {
          if (Array.isArray(S))
            for (let x of S)
              d[x]
                ? r.propertiesValueMatches++
                : r.problems.push({
                    location: { offset: f.offset, length: f.length },
                    message: A('Object is missing property {0} required by property {1}.', x, g),
                  });
          else {
            let x = Z(S);
            if (x) {
              let T = new q();
              C(f, x, T, n, i), r.mergePropertyMatch(T);
            }
          }
        }
      }
    }
    function tr(e, t) {
      let r = [],
        n = -1,
        i = e.getText(),
        s = ee(i, !1),
        o = t && t.collectComments ? [] : void 0;
      function c() {
        for (;;) {
          let O = s.scan();
          switch ((f(), O)) {
            case 12:
            case 13:
              Array.isArray(o) && o.push(_.create(e.positionAt(s.getTokenOffset()), e.positionAt(s.getTokenOffset() + s.getTokenLength())));
              break;
            case 15:
            case 14:
              break;
            default:
              return O;
          }
        }
      }
      function l(O) {
        return s.getToken() === O ? (c(), !0) : !1;
      }
      function a(O, I, E, j, N = z.Error) {
        if (r.length === 0 || E !== n) {
          let v = _.create(e.positionAt(E), e.positionAt(j));
          r.push(ne.create(v, O, N, I, e.languageId)), (n = E);
        }
      }
      function u(O, I, E = void 0, j = [], N = []) {
        let v = s.getTokenOffset(),
          P = s.getTokenOffset() + s.getTokenLength();
        if (v === P && v > 0) {
          for (v--; v > 0 && /\s/.test(i.charAt(v)); ) v--;
          P = v + 1;
        }
        if ((a(O, I, v, P), E && d(E, !1), j.length + N.length > 0)) {
          let L = s.getToken();
          for (; L !== 17; ) {
            if (j.indexOf(L) !== -1) {
              c();
              break;
            } else if (N.indexOf(L) !== -1) break;
            L = c();
          }
        }
        return E;
      }
      function f() {
        switch (s.getTokenError()) {
          case 4:
            return u(A('Invalid unicode sequence in string.'), M.InvalidUnicode), !0;
          case 5:
            return u(A('Invalid escape character in string.'), M.InvalidEscapeCharacter), !0;
          case 3:
            return u(A('Unexpected end of number.'), M.UnexpectedEndOfNumber), !0;
          case 1:
            return u(A('Unexpected end of comment.'), M.UnexpectedEndOfComment), !0;
          case 2:
            return u(A('Unexpected end of string.'), M.UnexpectedEndOfString), !0;
          case 6:
            return u(A('Invalid characters in string. Control characters must be escaped.'), M.InvalidCharacter), !0;
        }
        return !1;
      }
      function d(O, I) {
        return (O.length = s.getTokenOffset() + s.getTokenLength() - O.offset), I && c(), O;
      }
      function h(O) {
        if (s.getToken() !== 3) return;
        let I = new Ht(O, s.getTokenOffset());
        c();
        let E = 0,
          j = !1;
        for (; s.getToken() !== 4 && s.getToken() !== 17; ) {
          if (s.getToken() === 5) {
            j || u(A('Value expected'), M.ValueExpected);
            let v = s.getTokenOffset();
            if ((c(), s.getToken() === 4)) {
              j && a(A('Trailing comma'), M.TrailingComma, v, v + 1);
              continue;
            }
          } else j && u(A('Expected comma'), M.CommaExpected);
          let N = S(I);
          N ? I.items.push(N) : u(A('Value expected'), M.ValueExpected, void 0, [], [4, 5]), (j = !0);
        }
        return s.getToken() !== 4 ? u(A('Expected comma or closing bracket'), M.CommaOrCloseBacketExpected, I) : d(I, !0);
      }
      let p = new je(void 0, 0, 0);
      function m(O, I) {
        let E = new Xt(O, s.getTokenOffset(), p),
          j = k(E);
        if (!j)
          if (s.getToken() === 16) {
            u(A('Property keys must be doublequoted'), M.PropertyKeysMustBeDoublequoted);
            let v = new je(E, s.getTokenOffset(), s.getTokenLength());
            (v.value = s.getTokenValue()), (j = v), c();
          } else return;
        if (((E.keyNode = j), j.value !== '//')) {
          let v = I[j.value];
          v
            ? (a(A('Duplicate object key'), M.DuplicateKey, E.keyNode.offset, E.keyNode.offset + E.keyNode.length, z.Warning),
              oe(v) && a(A('Duplicate object key'), M.DuplicateKey, v.keyNode.offset, v.keyNode.offset + v.keyNode.length, z.Warning),
              (I[j.value] = !0))
            : (I[j.value] = E);
        }
        if (s.getToken() === 6) (E.colonOffset = s.getTokenOffset()), c();
        else if (
          (u(A('Colon expected'), M.ColonExpected),
          s.getToken() === 10 && e.positionAt(j.offset + j.length).line < e.positionAt(s.getTokenOffset()).line)
        )
          return (E.length = j.length), E;
        let N = S(E);
        return N ? ((E.valueNode = N), (E.length = N.offset + N.length - E.offset), E) : u(A('Value expected'), M.ValueExpected, E, [], [2, 5]);
      }
      function y(O) {
        if (s.getToken() !== 1) return;
        let I = new Zt(O, s.getTokenOffset()),
          E = Object.create(null);
        c();
        let j = !1;
        for (; s.getToken() !== 2 && s.getToken() !== 17; ) {
          if (s.getToken() === 5) {
            j || u(A('Property expected'), M.PropertyExpected);
            let v = s.getTokenOffset();
            if ((c(), s.getToken() === 2)) {
              j && a(A('Trailing comma'), M.TrailingComma, v, v + 1);
              continue;
            }
          } else j && u(A('Expected comma'), M.CommaExpected);
          let N = m(I, E);
          N ? I.properties.push(N) : u(A('Property expected'), M.PropertyExpected, void 0, [], [2, 5]), (j = !0);
        }
        return s.getToken() !== 2 ? u(A('Expected comma or closing brace'), M.CommaOrCloseBraceExpected, I) : d(I, !0);
      }
      function k(O) {
        if (s.getToken() !== 10) return;
        let I = new je(O, s.getTokenOffset());
        return (I.value = s.getTokenValue()), d(I, !0);
      }
      function w(O) {
        if (s.getToken() !== 11) return;
        let I = new Gt(O, s.getTokenOffset());
        if (s.getTokenError() === 0) {
          let E = s.getTokenValue();
          try {
            let j = JSON.parse(E);
            if (!W(j)) return u(A('Invalid number format.'), M.Undefined, I);
            I.value = j;
          } catch {
            return u(A('Invalid number format.'), M.Undefined, I);
          }
          I.isInteger = E.indexOf('.') === -1;
        }
        return d(I, !0);
      }
      function g(O) {
        let I;
        switch (s.getToken()) {
          case 7:
            return d(new zt(O, s.getTokenOffset()), !0);
          case 8:
            return d(new Xe(O, !0, s.getTokenOffset()), !0);
          case 9:
            return d(new Xe(O, !1, s.getTokenOffset()), !0);
          default:
            return;
        }
      }
      function S(O) {
        return h(O) || y(O) || k(O) || w(O) || g(O);
      }
      let x;
      return (
        c() !== 17 &&
          ((x = S(x)),
          x ? s.getToken() !== 17 && u(A('End of file expected.'), M.Undefined) : u(A('Expected a JSON object, array or literal.'), M.Undefined)),
        new Qe(x, r, o)
      );
    }
    function Ke(e, t, r) {
      if (e !== null && typeof e == 'object') {
        let n = t + '	';
        if (Array.isArray(e)) {
          if (e.length === 0) return '[]';
          let i = `[
`;
          for (let s = 0; s < e.length; s++)
            (i += n + Ke(e[s], n, r)),
              s < e.length - 1 && (i += ','),
              (i += `
`);
          return (i += t + ']'), i;
        } else {
          let i = Object.keys(e);
          if (i.length === 0) return '{}';
          let s = `{
`;
          for (let o = 0; o < i.length; o++) {
            let c = i[o];
            (s += n + JSON.stringify(c) + ': ' + Ke(e[c], n, r)),
              o < i.length - 1 && (s += ','),
              (s += `
`);
          }
          return (s += t + '}'), s;
        }
      }
      return r(e);
    }
    var Rr = [',', '}', ']'],
      Ur = [':'],
      et = class {
        constructor(t, r = [], n = Promise, i = {}) {
          (this.schemaService = t), (this.contributions = r), (this.promiseConstructor = n), (this.clientCapabilities = i);
        }
        doResolve(t) {
          for (let r = this.contributions.length - 1; r >= 0; r--) {
            let n = this.contributions[r].resolveCompletion;
            if (n) {
              let i = n(t);
              if (i) return i;
            }
          }
          return this.promiseConstructor.resolve(t);
        }
        doComplete(t, r, n) {
          let i = { items: [], isIncomplete: !1 },
            s = t.getText(),
            o = t.offsetAt(r),
            c = n.getNodeFromOffset(o, !0);
          if (this.isInComment(t, c ? c.offset : 0, o)) return Promise.resolve(i);
          if (c && o === c.offset + c.length && o > 0) {
            let h = s[o - 1];
            ((c.type === 'object' && h === '}') || (c.type === 'array' && h === ']')) && (c = c.parent);
          }
          let l = this.getCurrentWord(t, o),
            a;
          if (c && (c.type === 'string' || c.type === 'number' || c.type === 'boolean' || c.type === 'null'))
            a = _.create(t.positionAt(c.offset), t.positionAt(c.offset + c.length));
          else {
            let h = o - l.length;
            h > 0 && s[h - 1] === '"' && h--, (a = _.create(t.positionAt(h), r));
          }
          let u = !1,
            f = new Map(),
            d = {
              add: (h) => {
                let p = h.label,
                  m = f.get(p);
                if (m)
                  m.documentation || (m.documentation = h.documentation),
                    m.detail || (m.detail = h.detail),
                    m.labelDetails || (m.labelDetails = h.labelDetails);
                else {
                  if (((p = p.replace(/[\n]/g, '\u21B5')), p.length > 60)) {
                    let y = p.substr(0, 57).trim() + '...';
                    f.has(y) || (p = y);
                  }
                  (h.textEdit = G.replace(a, h.insertText)),
                    u && (h.commitCharacters = h.kind === H.Property ? Ur : Rr),
                    (h.label = p),
                    f.set(p, h),
                    i.items.push(h);
                }
              },
              setAsIncomplete: () => {
                i.isIncomplete = !0;
              },
              error: (h) => {
                console.error(h);
              },
              getNumberOfProposals: () => i.items.length,
            };
          return this.schemaService.getSchemaForResource(t.uri, n).then((h) => {
            let p = [],
              m = !0,
              y = '',
              k;
            if (c && c.type === 'string') {
              let g = c.parent;
              g &&
                g.type === 'property' &&
                g.keyNode === c &&
                ((m = !g.valueNode), (k = g), (y = s.substr(c.offset + 1, c.length - 2)), g && (c = g.parent));
            }
            if (c && c.type === 'object') {
              if (c.offset === o) return i;
              c.properties.forEach((T) => {
                (!k || k !== T) && f.set(T.keyNode.value, Ee.create('__'));
              });
              let S = '';
              m && (S = this.evaluateSeparatorAfter(t, t.offsetAt(a.end))),
                h ? this.getPropertyCompletions(h, n, c, m, S, d) : this.getSchemaLessPropertyCompletions(n, c, y, d);
              let x = Ve(c);
              this.contributions.forEach((T) => {
                let O = T.collectPropertyCompletions(t.uri, x, l, m, S === '', d);
                O && p.push(O);
              }),
                !h &&
                  l.length > 0 &&
                  s.charAt(o - l.length - 1) !== '"' &&
                  (d.add({
                    kind: H.Property,
                    label: this.getLabelForValue(l),
                    insertText: this.getInsertTextForProperty(l, void 0, !1, S),
                    insertTextFormat: R.Snippet,
                    documentation: '',
                  }),
                  d.setAsIncomplete());
            }
            let w = {};
            return (
              h ? this.getValueCompletions(h, n, c, o, t, d, w) : this.getSchemaLessValueCompletions(n, c, o, t, d),
              this.contributions.length > 0 && this.getContributedValueCompletions(n, c, o, t, d, p),
              this.promiseConstructor.all(p).then(() => {
                if (d.getNumberOfProposals() === 0) {
                  let g = o;
                  c && (c.type === 'string' || c.type === 'number' || c.type === 'boolean' || c.type === 'null') && (g = c.offset + c.length);
                  let S = this.evaluateSeparatorAfter(t, g);
                  this.addFillerValueCompletions(w, S, d);
                }
                return i;
              })
            );
          });
        }
        getPropertyCompletions(t, r, n, i, s, o) {
          r.getMatchingSchemas(t.schema, n.offset).forEach((l) => {
            if (l.node === n && !l.inverted) {
              let a = l.schema.properties;
              a &&
                Object.keys(a).forEach((f) => {
                  let d = a[f];
                  if (typeof d == 'object' && !d.deprecationMessage && !d.doNotSuggest) {
                    let h = {
                      kind: H.Property,
                      label: f,
                      insertText: this.getInsertTextForProperty(f, d, i, s),
                      insertTextFormat: R.Snippet,
                      filterText: this.getFilterTextForValue(f),
                      documentation: this.fromMarkup(d.markdownDescription) || d.description || '',
                    };
                    d.suggestSortText !== void 0 && (h.sortText = d.suggestSortText),
                      h.insertText && fe(h.insertText, `$1${s}`) && (h.command = { title: 'Suggest', command: 'editor.action.triggerSuggest' }),
                      o.add(h);
                  }
                });
              let u = l.schema.propertyNames;
              if (typeof u == 'object' && !u.deprecationMessage && !u.doNotSuggest) {
                let f = (d, h = void 0) => {
                  let p = {
                    kind: H.Property,
                    label: d,
                    insertText: this.getInsertTextForProperty(d, void 0, i, s),
                    insertTextFormat: R.Snippet,
                    filterText: this.getFilterTextForValue(d),
                    documentation: h || this.fromMarkup(u.markdownDescription) || u.description || '',
                  };
                  u.suggestSortText !== void 0 && (p.sortText = u.suggestSortText),
                    p.insertText && fe(p.insertText, `$1${s}`) && (p.command = { title: 'Suggest', command: 'editor.action.triggerSuggest' }),
                    o.add(p);
                };
                if (u.enum)
                  for (let d = 0; d < u.enum.length; d++) {
                    let h;
                    u.markdownEnumDescriptions && d < u.markdownEnumDescriptions.length
                      ? (h = this.fromMarkup(u.markdownEnumDescriptions[d]))
                      : u.enumDescriptions && d < u.enumDescriptions.length && (h = u.enumDescriptions[d]),
                      f(u.enum[d], h);
                  }
                u.const && f(u.const);
              }
            }
          });
        }
        getSchemaLessPropertyCompletions(t, r, n, i) {
          let s = (o) => {
            o.properties.forEach((c) => {
              let l = c.keyNode.value;
              i.add({
                kind: H.Property,
                label: l,
                insertText: this.getInsertTextForValue(l, ''),
                insertTextFormat: R.Snippet,
                filterText: this.getFilterTextForValue(l),
                documentation: '',
              });
            });
          };
          if (r.parent)
            if (r.parent.type === 'property') {
              let o = r.parent.keyNode.value;
              t.visit(
                (c) => (
                  c.type === 'property' && c !== r.parent && c.keyNode.value === o && c.valueNode && c.valueNode.type === 'object' && s(c.valueNode),
                  !0
                ),
              );
            } else
              r.parent.type === 'array' &&
                r.parent.items.forEach((o) => {
                  o.type === 'object' && o !== r && s(o);
                });
          else
            r.type === 'object' &&
              i.add({
                kind: H.Property,
                label: '$schema',
                insertText: this.getInsertTextForProperty('$schema', void 0, !0, ''),
                insertTextFormat: R.Snippet,
                documentation: '',
                filterText: this.getFilterTextForValue('$schema'),
              });
        }
        getSchemaLessValueCompletions(t, r, n, i, s) {
          let o = n;
          if (
            (r &&
              (r.type === 'string' || r.type === 'number' || r.type === 'boolean' || r.type === 'null') &&
              ((o = r.offset + r.length), (r = r.parent)),
            !r)
          ) {
            s.add({
              kind: this.getSuggestionKind('object'),
              label: 'Empty object',
              insertText: this.getInsertTextForValue({}, ''),
              insertTextFormat: R.Snippet,
              documentation: '',
            }),
              s.add({
                kind: this.getSuggestionKind('array'),
                label: 'Empty array',
                insertText: this.getInsertTextForValue([], ''),
                insertTextFormat: R.Snippet,
                documentation: '',
              });
            return;
          }
          let c = this.evaluateSeparatorAfter(i, o),
            l = (a) => {
              a.parent &&
                !Yt(a.parent, n, !0) &&
                s.add({
                  kind: this.getSuggestionKind(a.type),
                  label: this.getLabelTextForMatchingNode(a, i),
                  insertText: this.getInsertTextForMatchingNode(a, i, c),
                  insertTextFormat: R.Snippet,
                  documentation: '',
                }),
                a.type === 'boolean' && this.addBooleanValueCompletion(!a.value, c, s);
            };
          if (r.type === 'property' && n > (r.colonOffset || 0)) {
            let a = r.valueNode;
            if (a && (n > a.offset + a.length || a.type === 'object' || a.type === 'array')) return;
            let u = r.keyNode.value;
            t.visit((f) => (f.type === 'property' && f.keyNode.value === u && f.valueNode && l(f.valueNode), !0)),
              u === '$schema' && r.parent && !r.parent.parent && this.addDollarSchemaCompletions(c, s);
          }
          if (r.type === 'array')
            if (r.parent && r.parent.type === 'property') {
              let a = r.parent.keyNode.value;
              t.visit(
                (u) => (
                  u.type === 'property' && u.keyNode.value === a && u.valueNode && u.valueNode.type === 'array' && u.valueNode.items.forEach(l), !0
                ),
              );
            } else r.items.forEach(l);
        }
        getValueCompletions(t, r, n, i, s, o, c) {
          let l = i,
            a,
            u;
          if (
            (n &&
              (n.type === 'string' || n.type === 'number' || n.type === 'boolean' || n.type === 'null') &&
              ((l = n.offset + n.length), (u = n), (n = n.parent)),
            !n)
          ) {
            this.addSchemaValueCompletions(t.schema, '', o, c);
            return;
          }
          if (n.type === 'property' && i > (n.colonOffset || 0)) {
            let f = n.valueNode;
            if (f && i > f.offset + f.length) return;
            (a = n.keyNode.value), (n = n.parent);
          }
          if (n && (a !== void 0 || n.type === 'array')) {
            let f = this.evaluateSeparatorAfter(s, l),
              d = r.getMatchingSchemas(t.schema, n.offset, u);
            for (let h of d)
              if (h.node === n && !h.inverted && h.schema) {
                if (n.type === 'array' && h.schema.items) {
                  let p = o;
                  if (h.schema.uniqueItems) {
                    let m = new Set();
                    n.children.forEach((y) => {
                      y.type !== 'array' && y.type !== 'object' && m.add(this.getLabelForValue(ae(y)));
                    }),
                      (p = {
                        ...o,
                        add(y) {
                          m.has(y.label) || o.add(y);
                        },
                      });
                  }
                  if (Array.isArray(h.schema.items)) {
                    let m = this.findItemAtOffset(n, s, i);
                    m < h.schema.items.length && this.addSchemaValueCompletions(h.schema.items[m], f, p, c);
                  } else this.addSchemaValueCompletions(h.schema.items, f, p, c);
                }
                if (a !== void 0) {
                  let p = !1;
                  if (h.schema.properties) {
                    let m = h.schema.properties[a];
                    m && ((p = !0), this.addSchemaValueCompletions(m, f, o, c));
                  }
                  if (h.schema.patternProperties && !p) {
                    for (let m of Object.keys(h.schema.patternProperties))
                      if (me(m)?.test(a)) {
                        p = !0;
                        let k = h.schema.patternProperties[m];
                        this.addSchemaValueCompletions(k, f, o, c);
                      }
                  }
                  if (h.schema.additionalProperties && !p) {
                    let m = h.schema.additionalProperties;
                    this.addSchemaValueCompletions(m, f, o, c);
                  }
                }
              }
            a === '$schema' && !n.parent && this.addDollarSchemaCompletions(f, o),
              c.boolean && (this.addBooleanValueCompletion(!0, f, o), this.addBooleanValueCompletion(!1, f, o)),
              c.null && this.addNullValueCompletion(f, o);
          }
        }
        getContributedValueCompletions(t, r, n, i, s, o) {
          if (!r)
            this.contributions.forEach((c) => {
              let l = c.collectDefaultCompletions(i.uri, s);
              l && o.push(l);
            });
          else if (
            ((r.type === 'string' || r.type === 'number' || r.type === 'boolean' || r.type === 'null') && (r = r.parent),
            r && r.type === 'property' && n > (r.colonOffset || 0))
          ) {
            let c = r.keyNode.value,
              l = r.valueNode;
            if ((!l || n <= l.offset + l.length) && r.parent) {
              let a = Ve(r.parent);
              this.contributions.forEach((u) => {
                let f = u.collectValueCompletions(i.uri, a, c, s);
                f && o.push(f);
              });
            }
          }
        }
        addSchemaValueCompletions(t, r, n, i) {
          typeof t == 'object' &&
            (this.addEnumValueCompletions(t, r, n),
            this.addDefaultValueCompletions(t, r, n),
            this.collectTypes(t, i),
            Array.isArray(t.allOf) && t.allOf.forEach((s) => this.addSchemaValueCompletions(s, r, n, i)),
            Array.isArray(t.anyOf) && t.anyOf.forEach((s) => this.addSchemaValueCompletions(s, r, n, i)),
            Array.isArray(t.oneOf) && t.oneOf.forEach((s) => this.addSchemaValueCompletions(s, r, n, i)));
        }
        addDefaultValueCompletions(t, r, n, i = 0) {
          let s = !1;
          if (Y(t.default)) {
            let o = t.type,
              c = t.default;
            for (let a = i; a > 0; a--) (c = [c]), (o = 'array');
            let l = {
              kind: this.getSuggestionKind(o),
              label: this.getLabelForValue(c),
              insertText: this.getInsertTextForValue(c, r),
              insertTextFormat: R.Snippet,
            };
            this.doesSupportsLabelDetails() ? (l.labelDetails = { description: A('Default value') }) : (l.detail = A('Default value')),
              n.add(l),
              (s = !0);
          }
          Array.isArray(t.examples) &&
            t.examples.forEach((o) => {
              let c = t.type,
                l = o;
              for (let a = i; a > 0; a--) (l = [l]), (c = 'array');
              n.add({
                kind: this.getSuggestionKind(c),
                label: this.getLabelForValue(l),
                insertText: this.getInsertTextForValue(l, r),
                insertTextFormat: R.Snippet,
              }),
                (s = !0);
            }),
            Array.isArray(t.defaultSnippets) &&
              t.defaultSnippets.forEach((o) => {
                let c = t.type,
                  l = o.body,
                  a = o.label,
                  u,
                  f;
                if (Y(l)) {
                  let d = t.type;
                  for (let h = i; h > 0; h--) (l = [l]), (d = 'array');
                  (u = this.getInsertTextForSnippetValue(l, r)),
                    (f = this.getFilterTextForSnippetValue(l)),
                    (a = a || this.getLabelForSnippetValue(l));
                } else if (typeof o.bodyText == 'string') {
                  let d = '',
                    h = '',
                    p = '';
                  for (let m = i; m > 0; m--)
                    (d =
                      d +
                      p +
                      `[
`),
                      (h =
                        h +
                        `
` +
                        p +
                        ']'),
                      (p += '	'),
                      (c = 'array');
                  (u =
                    d +
                    p +
                    o.bodyText
                      .split(
                        `
`,
                      )
                      .join(
                        `
` + p,
                      ) +
                    h +
                    r),
                    (a = a || u),
                    (f = u.replace(/[\n]/g, ''));
                } else return;
                n.add({
                  kind: this.getSuggestionKind(c),
                  label: a,
                  documentation: this.fromMarkup(o.markdownDescription) || o.description,
                  insertText: u,
                  insertTextFormat: R.Snippet,
                  filterText: f,
                }),
                  (s = !0);
              }),
            !s && typeof t.items == 'object' && !Array.isArray(t.items) && i < 5 && this.addDefaultValueCompletions(t.items, r, n, i + 1);
        }
        addEnumValueCompletions(t, r, n) {
          if (
            (Y(t.const) &&
              n.add({
                kind: this.getSuggestionKind(t.type),
                label: this.getLabelForValue(t.const),
                insertText: this.getInsertTextForValue(t.const, r),
                insertTextFormat: R.Snippet,
                documentation: this.fromMarkup(t.markdownDescription) || t.description,
              }),
            Array.isArray(t.enum))
          )
            for (let i = 0, s = t.enum.length; i < s; i++) {
              let o = t.enum[i],
                c = this.fromMarkup(t.markdownDescription) || t.description;
              t.markdownEnumDescriptions && i < t.markdownEnumDescriptions.length && this.doesSupportMarkdown()
                ? (c = this.fromMarkup(t.markdownEnumDescriptions[i]))
                : t.enumDescriptions && i < t.enumDescriptions.length && (c = t.enumDescriptions[i]),
                n.add({
                  kind: this.getSuggestionKind(t.type),
                  label: this.getLabelForValue(o),
                  insertText: this.getInsertTextForValue(o, r),
                  insertTextFormat: R.Snippet,
                  documentation: c,
                });
            }
        }
        collectTypes(t, r) {
          if (Array.isArray(t.enum) || Y(t.const)) return;
          let n = t.type;
          Array.isArray(n) ? n.forEach((i) => (r[i] = !0)) : n && (r[n] = !0);
        }
        addFillerValueCompletions(t, r, n) {
          t.object &&
            n.add({
              kind: this.getSuggestionKind('object'),
              label: '{}',
              insertText: this.getInsertTextForGuessedValue({}, r),
              insertTextFormat: R.Snippet,
              detail: A('New object'),
              documentation: '',
            }),
            t.array &&
              n.add({
                kind: this.getSuggestionKind('array'),
                label: '[]',
                insertText: this.getInsertTextForGuessedValue([], r),
                insertTextFormat: R.Snippet,
                detail: A('New array'),
                documentation: '',
              });
        }
        addBooleanValueCompletion(t, r, n) {
          n.add({
            kind: this.getSuggestionKind('boolean'),
            label: t ? 'true' : 'false',
            insertText: this.getInsertTextForValue(t, r),
            insertTextFormat: R.Snippet,
            documentation: '',
          });
        }
        addNullValueCompletion(t, r) {
          r.add({ kind: this.getSuggestionKind('null'), label: 'null', insertText: 'null' + t, insertTextFormat: R.Snippet, documentation: '' });
        }
        addDollarSchemaCompletions(t, r) {
          this.schemaService
            .getRegisteredSchemaIds((i) => i === 'http' || i === 'https')
            .forEach((i) => {
              i.startsWith('http://json-schema.org/draft-') && (i = i + '#'),
                r.add({
                  kind: H.Module,
                  label: this.getLabelForValue(i),
                  filterText: this.getFilterTextForValue(i),
                  insertText: this.getInsertTextForValue(i, t),
                  insertTextFormat: R.Snippet,
                  documentation: '',
                });
            });
        }
        getLabelForValue(t) {
          return JSON.stringify(t);
        }
        getValueFromLabel(t) {
          return JSON.parse(t);
        }
        getFilterTextForValue(t) {
          return JSON.stringify(t);
        }
        getFilterTextForSnippetValue(t) {
          return JSON.stringify(t).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
        }
        getLabelForSnippetValue(t) {
          return JSON.stringify(t).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
        }
        getInsertTextForPlainText(t) {
          return t.replace(/[\\\$\}]/g, '\\$&');
        }
        getInsertTextForValue(t, r) {
          let n = JSON.stringify(t, null, '	');
          return n === '{}' ? '{$1}' + r : n === '[]' ? '[$1]' + r : this.getInsertTextForPlainText(n + r);
        }
        getInsertTextForSnippetValue(t, r) {
          return Ke(t, '', (i) => (typeof i == 'string' && i[0] === '^' ? i.substr(1) : JSON.stringify(i))) + r;
        }
        getInsertTextForGuessedValue(t, r) {
          switch (typeof t) {
            case 'object':
              return t === null ? '${1:null}' + r : this.getInsertTextForValue(t, r);
            case 'string':
              let n = JSON.stringify(t);
              return (n = n.substr(1, n.length - 2)), (n = this.getInsertTextForPlainText(n)), '"${1:' + n + '}"' + r;
            case 'number':
            case 'boolean':
              return '${1:' + JSON.stringify(t) + '}' + r;
          }
          return this.getInsertTextForValue(t, r);
        }
        getSuggestionKind(t) {
          if (Array.isArray(t)) {
            let r = t;
            t = r.length > 0 ? r[0] : void 0;
          }
          if (!t) return H.Value;
          switch (t) {
            case 'string':
              return H.Value;
            case 'object':
              return H.Module;
            case 'property':
              return H.Property;
            default:
              return H.Value;
          }
        }
        getLabelTextForMatchingNode(t, r) {
          switch (t.type) {
            case 'array':
              return '[]';
            case 'object':
              return '{}';
            default:
              return r.getText().substr(t.offset, t.length);
          }
        }
        getInsertTextForMatchingNode(t, r, n) {
          switch (t.type) {
            case 'array':
              return this.getInsertTextForValue([], n);
            case 'object':
              return this.getInsertTextForValue({}, n);
            default:
              let i = r.getText().substr(t.offset, t.length) + n;
              return this.getInsertTextForPlainText(i);
          }
        }
        getInsertTextForProperty(t, r, n, i) {
          let s = this.getInsertTextForValue(t, '');
          if (!n) return s;
          let o = s + ': ',
            c,
            l = 0;
          if (r) {
            if (Array.isArray(r.defaultSnippets)) {
              if (r.defaultSnippets.length === 1) {
                let a = r.defaultSnippets[0].body;
                Y(a) && (c = this.getInsertTextForSnippetValue(a, ''));
              }
              l += r.defaultSnippets.length;
            }
            if (
              (r.enum && (!c && r.enum.length === 1 && (c = this.getInsertTextForGuessedValue(r.enum[0], '')), (l += r.enum.length)),
              Y(r.const) && (c || (c = this.getInsertTextForGuessedValue(r.const, '')), l++),
              Y(r.default) && (c || (c = this.getInsertTextForGuessedValue(r.default, '')), l++),
              Array.isArray(r.examples) &&
                r.examples.length &&
                (c || (c = this.getInsertTextForGuessedValue(r.examples[0], '')), (l += r.examples.length)),
              l === 0)
            ) {
              let a = Array.isArray(r.type) ? r.type[0] : r.type;
              switch ((a || (r.properties ? (a = 'object') : r.items && (a = 'array')), a)) {
                case 'boolean':
                  c = '$1';
                  break;
                case 'string':
                  c = '"$1"';
                  break;
                case 'object':
                  c = '{$1}';
                  break;
                case 'array':
                  c = '[$1]';
                  break;
                case 'number':
                case 'integer':
                  c = '${1:0}';
                  break;
                case 'null':
                  c = '${1:null}';
                  break;
                default:
                  return s;
              }
            }
          }
          return (!c || l > 1) && (c = '$1'), o + c + i;
        }
        getCurrentWord(t, r) {
          let n = r - 1,
            i = t.getText();
          for (
            ;
            n >= 0 &&
            ` 	
\r\v":{[,]}`.indexOf(i.charAt(n)) === -1;

          )
            n--;
          return i.substring(n + 1, r);
        }
        evaluateSeparatorAfter(t, r) {
          let n = ee(t.getText(), !0);
          switch ((n.setPosition(r), n.scan())) {
            case 5:
            case 2:
            case 4:
            case 17:
              return '';
            default:
              return ',';
          }
        }
        findItemAtOffset(t, r, n) {
          let i = ee(r.getText(), !0),
            s = t.items;
          for (let o = s.length - 1; o >= 0; o--) {
            let c = s[o];
            if (n > c.offset + c.length)
              return i.setPosition(c.offset + c.length), i.scan() === 5 && n >= i.getTokenOffset() + i.getTokenLength() ? o + 1 : o;
            if (n >= c.offset) return o;
          }
          return 0;
        }
        isInComment(t, r, n) {
          let i = ee(t.getText(), !1);
          i.setPosition(r);
          let s = i.scan();
          for (; s !== 17 && i.getTokenOffset() + i.getTokenLength() < n; ) s = i.scan();
          return (s === 12 || s === 13) && i.getTokenOffset() <= n;
        }
        fromMarkup(t) {
          if (t && this.doesSupportMarkdown()) return { kind: le.Markdown, value: t };
        }
        doesSupportMarkdown() {
          if (!Y(this.supportsMarkdown)) {
            let t = this.clientCapabilities.textDocument?.completion?.completionItem?.documentationFormat;
            this.supportsMarkdown = Array.isArray(t) && t.indexOf(le.Markdown) !== -1;
          }
          return this.supportsMarkdown;
        }
        doesSupportsCommitCharacters() {
          return (
            Y(this.supportsCommitCharacters) ||
              (this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.commitCharactersSupport),
            this.supportsCommitCharacters
          );
        }
        doesSupportsLabelDetails() {
          return (
            Y(this.labelDetailsSupport) ||
              (this.labelDetailsSupport = this.clientCapabilities.textDocument?.completion?.completionItem?.labelDetailsSupport),
            this.labelDetailsSupport
          );
        }
      };
    var tt = class {
      constructor(t, r = [], n) {
        (this.schemaService = t), (this.contributions = r), (this.promise = n || Promise);
      }
      doHover(t, r, n) {
        let i = t.offsetAt(r),
          s = n.getNodeFromOffset(i);
        if (!s || ((s.type === 'object' || s.type === 'array') && i > s.offset + 1 && i < s.offset + s.length - 1)) return this.promise.resolve(null);
        let o = s;
        if (s.type === 'string') {
          let u = s.parent;
          if (u && u.type === 'property' && u.keyNode === s && ((s = u.valueNode), !s)) return this.promise.resolve(null);
        }
        let c = _.create(t.positionAt(o.offset), t.positionAt(o.offset + o.length)),
          l = (u) => ({ contents: u, range: c }),
          a = Ve(s);
        for (let u = this.contributions.length - 1; u >= 0; u--) {
          let d = this.contributions[u].getInfoContribution(t.uri, a);
          if (d) return d.then((h) => l(h));
        }
        return this.schemaService.getSchemaForResource(t.uri, n).then((u) => {
          if (u && s) {
            let f = n.getMatchingSchemas(u.schema, s.offset),
              d,
              h,
              p,
              m;
            f.every((k) => {
              if (
                k.node === s &&
                !k.inverted &&
                k.schema &&
                ((d = d || k.schema.title), (h = h || k.schema.markdownDescription || Kt(k.schema.description)), k.schema.enum)
              ) {
                let w = k.schema.enum.indexOf(ae(s));
                k.schema.markdownEnumDescriptions
                  ? (p = k.schema.markdownEnumDescriptions[w])
                  : k.schema.enumDescriptions && (p = Kt(k.schema.enumDescriptions[w])),
                  p && ((m = k.schema.enum[w]), typeof m != 'string' && (m = JSON.stringify(m)));
              }
              return !0;
            });
            let y = '';
            return (
              d && (y = Kt(d)),
              h &&
                (y.length > 0 &&
                  (y += `

`),
                (y += h)),
              p &&
                (y.length > 0 &&
                  (y += `

`),
                (y += `\`${Br(m)}\`: ${p}`)),
              l([y])
            );
          }
          return null;
        });
      }
    };
    function Kt(e) {
      if (e)
        return e
          .replace(
            /([^\n\r])(\r?\n)([^\n\r])/gm,
            `$1

$3`,
          )
          .replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
    }
    function Br(e) {
      return e.indexOf('`') !== -1 ? '`` ' + e + ' ``' : e;
    }
    var rt = class {
        constructor(t, r) {
          (this.jsonSchemaService = t), (this.promise = r), (this.validationEnabled = !0);
        }
        configure(t) {
          t && ((this.validationEnabled = t.validate !== !1), (this.commentSeverity = t.allowComments ? void 0 : z.Error));
        }
        doValidation(t, r, n, i) {
          if (!this.validationEnabled) return this.promise.resolve([]);
          let s = [],
            o = {},
            c = (a) => {
              let u = a.range.start.line + ' ' + a.range.start.character + ' ' + a.message;
              o[u] || ((o[u] = !0), s.push(a));
            },
            l = (a) => {
              let u = n?.trailingCommas ? nt(n.trailingCommas) : z.Error,
                f = n?.comments ? nt(n.comments) : this.commentSeverity,
                d = n?.schemaValidation ? nt(n.schemaValidation) : z.Warning,
                h = n?.schemaRequest ? nt(n.schemaRequest) : z.Warning;
              if (a) {
                let p = (m, y) => {
                  if (r.root && h) {
                    let k = r.root,
                      w = k.type === 'object' ? k.properties[0] : void 0;
                    if (w && w.keyNode.value === '$schema') {
                      let g = w.valueNode || w,
                        S = _.create(t.positionAt(g.offset), t.positionAt(g.offset + g.length));
                      c(ne.create(S, m, h, y));
                    } else {
                      let g = _.create(t.positionAt(k.offset), t.positionAt(k.offset + 1));
                      c(ne.create(g, m, h, y));
                    }
                  }
                };
                if (a.errors.length) p(a.errors[0], M.SchemaResolveError);
                else if (d) {
                  for (let y of a.warnings) p(y, M.SchemaUnsupportedFeature);
                  let m = r.validate(t, a.schema, d, n?.schemaDraft);
                  m && m.forEach(c);
                }
                nr(a.schema) && (f = void 0), rr(a.schema) && (u = void 0);
              }
              for (let p of r.syntaxErrors) {
                if (p.code === M.TrailingComma) {
                  if (typeof u != 'number') continue;
                  p.severity = u;
                }
                c(p);
              }
              if (typeof f == 'number') {
                let p = A('Comments are not permitted in JSON.');
                r.comments.forEach((m) => {
                  c(ne.create(m, p, f, M.CommentNotPermitted));
                });
              }
              return s;
            };
          if (i) {
            let a = i.id || 'schemaservice://untitled/' + Jr++;
            return this.jsonSchemaService
              .registerExternalSchema({ uri: a, schema: i })
              .getResolvedSchema()
              .then((f) => l(f));
          }
          return this.jsonSchemaService.getSchemaForResource(t.uri, r).then((a) => l(a));
        }
        getLanguageStatus(t, r) {
          return { schemas: this.jsonSchemaService.getSchemaURIsForResource(t.uri, r) };
        }
      },
      Jr = 0;
    function nr(e) {
      if (e && typeof e == 'object') {
        if (te(e.allowComments)) return e.allowComments;
        if (e.allOf)
          for (let t of e.allOf) {
            let r = nr(t);
            if (te(r)) return r;
          }
      }
    }
    function rr(e) {
      if (e && typeof e == 'object') {
        if (te(e.allowTrailingCommas)) return e.allowTrailingCommas;
        let t = e;
        if (te(t.allowsTrailingCommas)) return t.allowsTrailingCommas;
        if (e.allOf)
          for (let r of e.allOf) {
            let n = rr(r);
            if (te(n)) return n;
          }
      }
    }
    function nt(e) {
      switch (e) {
        case 'error':
          return z.Error;
        case 'warning':
          return z.Warning;
        case 'ignore':
          return;
      }
    }
    function U(e) {
      return e < 48 ? 0 : e <= 57 ? e - 48 : (e < 97 && (e += 32), e >= 97 && e <= 102 ? e - 97 + 10 : 0);
    }
    function ir(e) {
      if (e[0] === '#')
        switch (e.length) {
          case 4:
            return { red: (U(e.charCodeAt(1)) * 17) / 255, green: (U(e.charCodeAt(2)) * 17) / 255, blue: (U(e.charCodeAt(3)) * 17) / 255, alpha: 1 };
          case 5:
            return {
              red: (U(e.charCodeAt(1)) * 17) / 255,
              green: (U(e.charCodeAt(2)) * 17) / 255,
              blue: (U(e.charCodeAt(3)) * 17) / 255,
              alpha: (U(e.charCodeAt(4)) * 17) / 255,
            };
          case 7:
            return {
              red: (U(e.charCodeAt(1)) * 16 + U(e.charCodeAt(2))) / 255,
              green: (U(e.charCodeAt(3)) * 16 + U(e.charCodeAt(4))) / 255,
              blue: (U(e.charCodeAt(5)) * 16 + U(e.charCodeAt(6))) / 255,
              alpha: 1,
            };
          case 9:
            return {
              red: (U(e.charCodeAt(1)) * 16 + U(e.charCodeAt(2))) / 255,
              green: (U(e.charCodeAt(3)) * 16 + U(e.charCodeAt(4))) / 255,
              blue: (U(e.charCodeAt(5)) * 16 + U(e.charCodeAt(6))) / 255,
              alpha: (U(e.charCodeAt(7)) * 16 + U(e.charCodeAt(8))) / 255,
            };
        }
    }
    var it = class {
      constructor(t) {
        this.schemaService = t;
      }
      findDocumentSymbols(t, r, n = { resultLimit: Number.MAX_VALUE }) {
        let i = r.root;
        if (!i) return [];
        let s = n.resultLimit || Number.MAX_VALUE,
          o = t.uri;
        if ((o === 'vscode://defaultsettings/keybindings.json' || fe(o.toLowerCase(), '/user/keybindings.json')) && i.type === 'array') {
          let d = [];
          for (let h of i.items)
            if (h.type === 'object') {
              for (let p of h.properties)
                if (p.keyNode.value === 'key' && p.valueNode) {
                  let m = ue.create(t.uri, de(t, h));
                  if ((d.push({ name: sr(p.valueNode), kind: re.Function, location: m }), s--, s <= 0))
                    return n && n.onResultLimitExceeded && n.onResultLimitExceeded(o), d;
                }
            }
          return d;
        }
        let c = [{ node: i, containerName: '' }],
          l = 0,
          a = !1,
          u = [],
          f = (d, h) => {
            d.type === 'array'
              ? d.items.forEach((p) => {
                  p && c.push({ node: p, containerName: h });
                })
              : d.type === 'object' &&
                d.properties.forEach((p) => {
                  let m = p.valueNode;
                  if (m)
                    if (s > 0) {
                      s--;
                      let y = ue.create(t.uri, de(t, p)),
                        k = h ? h + '.' + p.keyNode.value : p.keyNode.value;
                      u.push({ name: this.getKeyLabel(p), kind: this.getSymbolKind(m.type), location: y, containerName: h }),
                        c.push({ node: m, containerName: k });
                    } else a = !0;
                });
          };
        for (; l < c.length; ) {
          let d = c[l++];
          f(d.node, d.containerName);
        }
        return a && n && n.onResultLimitExceeded && n.onResultLimitExceeded(o), u;
      }
      findDocumentSymbols2(t, r, n = { resultLimit: Number.MAX_VALUE }) {
        let i = r.root;
        if (!i) return [];
        let s = n.resultLimit || Number.MAX_VALUE,
          o = t.uri;
        if ((o === 'vscode://defaultsettings/keybindings.json' || fe(o.toLowerCase(), '/user/keybindings.json')) && i.type === 'array') {
          let d = [];
          for (let h of i.items)
            if (h.type === 'object') {
              for (let p of h.properties)
                if (p.keyNode.value === 'key' && p.valueNode) {
                  let m = de(t, h),
                    y = de(t, p.keyNode);
                  if ((d.push({ name: sr(p.valueNode), kind: re.Function, range: m, selectionRange: y }), s--, s <= 0))
                    return n && n.onResultLimitExceeded && n.onResultLimitExceeded(o), d;
                }
            }
          return d;
        }
        let c = [],
          l = [{ node: i, result: c }],
          a = 0,
          u = !1,
          f = (d, h) => {
            d.type === 'array'
              ? d.items.forEach((p, m) => {
                  if (p)
                    if (s > 0) {
                      s--;
                      let y = de(t, p),
                        k = y,
                        g = { name: String(m), kind: this.getSymbolKind(p.type), range: y, selectionRange: k, children: [] };
                      h.push(g), l.push({ result: g.children, node: p });
                    } else u = !0;
                })
              : d.type === 'object' &&
                d.properties.forEach((p) => {
                  let m = p.valueNode;
                  if (m)
                    if (s > 0) {
                      s--;
                      let y = de(t, p),
                        k = de(t, p.keyNode),
                        w = [],
                        g = {
                          name: this.getKeyLabel(p),
                          kind: this.getSymbolKind(m.type),
                          range: y,
                          selectionRange: k,
                          children: w,
                          detail: this.getDetail(m),
                        };
                      h.push(g), l.push({ result: w, node: m });
                    } else u = !0;
                });
          };
        for (; a < l.length; ) {
          let d = l[a++];
          f(d.node, d.result);
        }
        return u && n && n.onResultLimitExceeded && n.onResultLimitExceeded(o), c;
      }
      getSymbolKind(t) {
        switch (t) {
          case 'object':
            return re.Module;
          case 'string':
            return re.String;
          case 'number':
            return re.Number;
          case 'array':
            return re.Array;
          case 'boolean':
            return re.Boolean;
          default:
            return re.Variable;
        }
      }
      getKeyLabel(t) {
        let r = t.keyNode.value;
        return r && (r = r.replace(/[\n]/g, '\u21B5')), r && r.trim() ? r : `"${r}"`;
      }
      getDetail(t) {
        if (t) {
          if (t.type === 'boolean' || t.type === 'number' || t.type === 'null' || t.type === 'string') return String(t.value);
          if (t.type === 'array') return t.children.length ? void 0 : '[]';
          if (t.type === 'object') return t.children.length ? void 0 : '{}';
        }
      }
      findDocumentColors(t, r, n) {
        return this.schemaService.getSchemaForResource(t.uri, r).then((i) => {
          let s = [];
          if (i) {
            let o = n && typeof n.resultLimit == 'number' ? n.resultLimit : Number.MAX_VALUE,
              c = r.getMatchingSchemas(i.schema),
              l = {};
            for (let a of c)
              if (!a.inverted && a.schema && (a.schema.format === 'color' || a.schema.format === 'color-hex') && a.node && a.node.type === 'string') {
                let u = String(a.node.offset);
                if (!l[u]) {
                  let f = ir(ae(a.node));
                  if (f) {
                    let d = de(t, a.node);
                    s.push({ color: f, range: d });
                  }
                  if (((l[u] = !0), o--, o <= 0)) return n && n.onResultLimitExceeded && n.onResultLimitExceeded(t.uri), s;
                }
              }
          }
          return s;
        });
      }
      getColorPresentations(t, r, n, i) {
        let s = [],
          o = Math.round(n.red * 255),
          c = Math.round(n.green * 255),
          l = Math.round(n.blue * 255);
        function a(f) {
          let d = f.toString(16);
          return d.length !== 2 ? '0' + d : d;
        }
        let u;
        return (
          n.alpha === 1 ? (u = `#${a(o)}${a(c)}${a(l)}`) : (u = `#${a(o)}${a(c)}${a(l)}${a(Math.round(n.alpha * 255))}`),
          s.push({ label: u, textEdit: G.replace(i, JSON.stringify(u)) }),
          s
        );
      }
    };
    function de(e, t) {
      return _.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length));
    }
    function sr(e) {
      return ae(e) || A('<empty>');
    }
    var st = {
        schemaAssociations: [],
        schemas: {
          'http://json-schema.org/draft-04/schema#': {
            $schema: 'http://json-schema.org/draft-04/schema#',
            definitions: {
              schemaArray: { type: 'array', minItems: 1, items: { $ref: '#' } },
              positiveInteger: { type: 'integer', minimum: 0 },
              positiveIntegerDefault0: { allOf: [{ $ref: '#/definitions/positiveInteger' }, { default: 0 }] },
              simpleTypes: { type: 'string', enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'] },
              stringArray: { type: 'array', items: { type: 'string' }, minItems: 1, uniqueItems: !0 },
            },
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uri' },
              $schema: { type: 'string', format: 'uri' },
              title: { type: 'string' },
              description: { type: 'string' },
              default: {},
              multipleOf: { type: 'number', minimum: 0, exclusiveMinimum: !0 },
              maximum: { type: 'number' },
              exclusiveMaximum: { type: 'boolean', default: !1 },
              minimum: { type: 'number' },
              exclusiveMinimum: { type: 'boolean', default: !1 },
              maxLength: { allOf: [{ $ref: '#/definitions/positiveInteger' }] },
              minLength: { allOf: [{ $ref: '#/definitions/positiveIntegerDefault0' }] },
              pattern: { type: 'string', format: 'regex' },
              additionalItems: { anyOf: [{ type: 'boolean' }, { $ref: '#' }], default: {} },
              items: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/schemaArray' }], default: {} },
              maxItems: { allOf: [{ $ref: '#/definitions/positiveInteger' }] },
              minItems: { allOf: [{ $ref: '#/definitions/positiveIntegerDefault0' }] },
              uniqueItems: { type: 'boolean', default: !1 },
              maxProperties: { allOf: [{ $ref: '#/definitions/positiveInteger' }] },
              minProperties: { allOf: [{ $ref: '#/definitions/positiveIntegerDefault0' }] },
              required: { allOf: [{ $ref: '#/definitions/stringArray' }] },
              additionalProperties: { anyOf: [{ type: 'boolean' }, { $ref: '#' }], default: {} },
              definitions: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
              properties: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
              patternProperties: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
              dependencies: { type: 'object', additionalProperties: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/stringArray' }] } },
              enum: { type: 'array', minItems: 1, uniqueItems: !0 },
              type: {
                anyOf: [
                  { $ref: '#/definitions/simpleTypes' },
                  { type: 'array', items: { $ref: '#/definitions/simpleTypes' }, minItems: 1, uniqueItems: !0 },
                ],
              },
              format: { anyOf: [{ type: 'string', enum: ['date-time', 'uri', 'email', 'hostname', 'ipv4', 'ipv6', 'regex'] }, { type: 'string' }] },
              allOf: { allOf: [{ $ref: '#/definitions/schemaArray' }] },
              anyOf: { allOf: [{ $ref: '#/definitions/schemaArray' }] },
              oneOf: { allOf: [{ $ref: '#/definitions/schemaArray' }] },
              not: { allOf: [{ $ref: '#' }] },
            },
            dependencies: { exclusiveMaximum: ['maximum'], exclusiveMinimum: ['minimum'] },
            default: {},
          },
          'http://json-schema.org/draft-07/schema#': {
            definitions: {
              schemaArray: { type: 'array', minItems: 1, items: { $ref: '#' } },
              nonNegativeInteger: { type: 'integer', minimum: 0 },
              nonNegativeIntegerDefault0: { allOf: [{ $ref: '#/definitions/nonNegativeInteger' }, { default: 0 }] },
              simpleTypes: { enum: ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string'] },
              stringArray: { type: 'array', items: { type: 'string' }, uniqueItems: !0, default: [] },
            },
            type: ['object', 'boolean'],
            properties: {
              $id: { type: 'string', format: 'uri-reference' },
              $schema: { type: 'string', format: 'uri' },
              $ref: { type: 'string', format: 'uri-reference' },
              $comment: { type: 'string' },
              title: { type: 'string' },
              description: { type: 'string' },
              default: !0,
              readOnly: { type: 'boolean', default: !1 },
              examples: { type: 'array', items: !0 },
              multipleOf: { type: 'number', exclusiveMinimum: 0 },
              maximum: { type: 'number' },
              exclusiveMaximum: { type: 'number' },
              minimum: { type: 'number' },
              exclusiveMinimum: { type: 'number' },
              maxLength: { $ref: '#/definitions/nonNegativeInteger' },
              minLength: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
              pattern: { type: 'string', format: 'regex' },
              additionalItems: { $ref: '#' },
              items: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/schemaArray' }], default: !0 },
              maxItems: { $ref: '#/definitions/nonNegativeInteger' },
              minItems: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
              uniqueItems: { type: 'boolean', default: !1 },
              contains: { $ref: '#' },
              maxProperties: { $ref: '#/definitions/nonNegativeInteger' },
              minProperties: { $ref: '#/definitions/nonNegativeIntegerDefault0' },
              required: { $ref: '#/definitions/stringArray' },
              additionalProperties: { $ref: '#' },
              definitions: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
              properties: { type: 'object', additionalProperties: { $ref: '#' }, default: {} },
              patternProperties: { type: 'object', additionalProperties: { $ref: '#' }, propertyNames: { format: 'regex' }, default: {} },
              dependencies: { type: 'object', additionalProperties: { anyOf: [{ $ref: '#' }, { $ref: '#/definitions/stringArray' }] } },
              propertyNames: { $ref: '#' },
              const: !0,
              enum: { type: 'array', items: !0, minItems: 1, uniqueItems: !0 },
              type: {
                anyOf: [
                  { $ref: '#/definitions/simpleTypes' },
                  { type: 'array', items: { $ref: '#/definitions/simpleTypes' }, minItems: 1, uniqueItems: !0 },
                ],
              },
              format: { type: 'string' },
              contentMediaType: { type: 'string' },
              contentEncoding: { type: 'string' },
              if: { $ref: '#' },
              then: { $ref: '#' },
              else: { $ref: '#' },
              allOf: { $ref: '#/definitions/schemaArray' },
              anyOf: { $ref: '#/definitions/schemaArray' },
              oneOf: { $ref: '#/definitions/schemaArray' },
              not: { $ref: '#' },
            },
            default: !0,
          },
        },
      },
      Cr = {
        id: A('A unique identifier for the schema.'),
        $schema: A('The schema to verify this document against.'),
        title: A('A descriptive title of the element.'),
        description: A('A long description of the element. Used in hover menus and suggestions.'),
        default: A('A default value. Used by suggestions.'),
        multipleOf: A('A number that should cleanly divide the current value (i.e. have no remainder).'),
        maximum: A('The maximum numerical value, inclusive by default.'),
        exclusiveMaximum: A('Makes the maximum property exclusive.'),
        minimum: A('The minimum numerical value, inclusive by default.'),
        exclusiveMinimum: A('Makes the minimum property exclusive.'),
        maxLength: A('The maximum length of a string.'),
        minLength: A('The minimum length of a string.'),
        pattern: A('A regular expression to match the string against. It is not implicitly anchored.'),
        additionalItems: A(
          'For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail.',
        ),
        items: A(
          'For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on.',
        ),
        maxItems: A('The maximum number of items that can be inside an array. Inclusive.'),
        minItems: A('The minimum number of items that can be inside an array. Inclusive.'),
        uniqueItems: A('If all of the items in the array must be unique. Defaults to false.'),
        maxProperties: A('The maximum number of properties an object can have. Inclusive.'),
        minProperties: A('The minimum number of properties an object can have. Inclusive.'),
        required: A('An array of strings that lists the names of all properties required on this object.'),
        additionalProperties: A(
          "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail.",
        ),
        definitions: A('Not used for validation. Place subschemas here that you wish to reference inline with $ref.'),
        properties: A('A map of property names to schemas for each property.'),
        patternProperties: A('A map of regular expressions on property names to schemas for matching properties.'),
        dependencies: A(
          'A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object.',
        ),
        enum: A('The set of literal values that are valid.'),
        type: A(
          'Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types.',
        ),
        format: A('Describes the format expected for the value.'),
        allOf: A('An array of schemas, all of which must match.'),
        anyOf: A('An array of schemas, where at least one must match.'),
        oneOf: A('An array of schemas, exactly one of which must match.'),
        not: A('A schema which must not match.'),
        $id: A('A unique identifier for the schema.'),
        $ref: A('Reference a definition hosted on any location.'),
        $comment: A('Comments from schema authors to readers or maintainers of the schema.'),
        readOnly: A('Indicates that the value of the instance is managed exclusively by the owning authority.'),
        examples: A('Sample JSON values associated with a particular schema, for the purpose of illustrating usage.'),
        contains: A('An array instance is valid against "contains" if at least one of its elements is valid against the given schema.'),
        propertyNames: A(
          'If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema.',
        ),
        const: A('An instance validates successfully against this keyword if its value is equal to the value of the keyword.'),
        contentMediaType: A('Describes the media type of a string property.'),
        contentEncoding: A('Describes the content encoding of a string property.'),
        if: A('The validation outcome of the "if" subschema controls which of the "then" or "else" keywords are evaluated.'),
        then: A('The "if" subschema is used for validation when the "if" subschema succeeds.'),
        else: A('The "else" subschema is used for validation when the "if" subschema fails.'),
      };
    for (let e in st.schemas) {
      let t = st.schemas[e];
      for (let r in t.properties) {
        let n = t.properties[r];
        typeof n == 'boolean' && (n = t.properties[r] = {});
        let i = Cr[r];
        i && (n.description = i);
      }
    }
    var or;
    (() => {
      'use strict';
      var e = {
          470: (i) => {
            function s(l) {
              if (typeof l != 'string') throw new TypeError('Path must be a string. Received ' + JSON.stringify(l));
            }
            function o(l, a) {
              for (var u, f = '', d = 0, h = -1, p = 0, m = 0; m <= l.length; ++m) {
                if (m < l.length) u = l.charCodeAt(m);
                else {
                  if (u === 47) break;
                  u = 47;
                }
                if (u === 47) {
                  if (!(h === m - 1 || p === 1))
                    if (h !== m - 1 && p === 2) {
                      if (f.length < 2 || d !== 2 || f.charCodeAt(f.length - 1) !== 46 || f.charCodeAt(f.length - 2) !== 46) {
                        if (f.length > 2) {
                          var y = f.lastIndexOf('/');
                          if (y !== f.length - 1) {
                            y === -1 ? ((f = ''), (d = 0)) : (d = (f = f.slice(0, y)).length - 1 - f.lastIndexOf('/')), (h = m), (p = 0);
                            continue;
                          }
                        } else if (f.length === 2 || f.length === 1) {
                          (f = ''), (d = 0), (h = m), (p = 0);
                          continue;
                        }
                      }
                      a && (f.length > 0 ? (f += '/..') : (f = '..'), (d = 2));
                    } else f.length > 0 ? (f += '/' + l.slice(h + 1, m)) : (f = l.slice(h + 1, m)), (d = m - h - 1);
                  (h = m), (p = 0);
                } else u === 46 && p !== -1 ? ++p : (p = -1);
              }
              return f;
            }
            var c = {
              resolve: function () {
                for (var l, a = '', u = !1, f = arguments.length - 1; f >= -1 && !u; f--) {
                  var d;
                  f >= 0 ? (d = arguments[f]) : (l === void 0 && (l = process.cwd()), (d = l)),
                    s(d),
                    d.length !== 0 && ((a = d + '/' + a), (u = d.charCodeAt(0) === 47));
                }
                return (a = o(a, !u)), u ? (a.length > 0 ? '/' + a : '/') : a.length > 0 ? a : '.';
              },
              normalize: function (l) {
                if ((s(l), l.length === 0)) return '.';
                var a = l.charCodeAt(0) === 47,
                  u = l.charCodeAt(l.length - 1) === 47;
                return (l = o(l, !a)).length !== 0 || a || (l = '.'), l.length > 0 && u && (l += '/'), a ? '/' + l : l;
              },
              isAbsolute: function (l) {
                return s(l), l.length > 0 && l.charCodeAt(0) === 47;
              },
              join: function () {
                if (arguments.length === 0) return '.';
                for (var l, a = 0; a < arguments.length; ++a) {
                  var u = arguments[a];
                  s(u), u.length > 0 && (l === void 0 ? (l = u) : (l += '/' + u));
                }
                return l === void 0 ? '.' : c.normalize(l);
              },
              relative: function (l, a) {
                if ((s(l), s(a), l === a || (l = c.resolve(l)) === (a = c.resolve(a)))) return '';
                for (var u = 1; u < l.length && l.charCodeAt(u) === 47; ++u);
                for (var f = l.length, d = f - u, h = 1; h < a.length && a.charCodeAt(h) === 47; ++h);
                for (var p = a.length - h, m = d < p ? d : p, y = -1, k = 0; k <= m; ++k) {
                  if (k === m) {
                    if (p > m) {
                      if (a.charCodeAt(h + k) === 47) return a.slice(h + k + 1);
                      if (k === 0) return a.slice(h + k);
                    } else d > m && (l.charCodeAt(u + k) === 47 ? (y = k) : k === 0 && (y = 0));
                    break;
                  }
                  var w = l.charCodeAt(u + k);
                  if (w !== a.charCodeAt(h + k)) break;
                  w === 47 && (y = k);
                }
                var g = '';
                for (k = u + y + 1; k <= f; ++k) (k !== f && l.charCodeAt(k) !== 47) || (g.length === 0 ? (g += '..') : (g += '/..'));
                return g.length > 0 ? g + a.slice(h + y) : ((h += y), a.charCodeAt(h) === 47 && ++h, a.slice(h));
              },
              _makeLong: function (l) {
                return l;
              },
              dirname: function (l) {
                if ((s(l), l.length === 0)) return '.';
                for (var a = l.charCodeAt(0), u = a === 47, f = -1, d = !0, h = l.length - 1; h >= 1; --h)
                  if ((a = l.charCodeAt(h)) === 47) {
                    if (!d) {
                      f = h;
                      break;
                    }
                  } else d = !1;
                return f === -1 ? (u ? '/' : '.') : u && f === 1 ? '//' : l.slice(0, f);
              },
              basename: function (l, a) {
                if (a !== void 0 && typeof a != 'string') throw new TypeError('"ext" argument must be a string');
                s(l);
                var u,
                  f = 0,
                  d = -1,
                  h = !0;
                if (a !== void 0 && a.length > 0 && a.length <= l.length) {
                  if (a.length === l.length && a === l) return '';
                  var p = a.length - 1,
                    m = -1;
                  for (u = l.length - 1; u >= 0; --u) {
                    var y = l.charCodeAt(u);
                    if (y === 47) {
                      if (!h) {
                        f = u + 1;
                        break;
                      }
                    } else m === -1 && ((h = !1), (m = u + 1)), p >= 0 && (y === a.charCodeAt(p) ? --p == -1 && (d = u) : ((p = -1), (d = m)));
                  }
                  return f === d ? (d = m) : d === -1 && (d = l.length), l.slice(f, d);
                }
                for (u = l.length - 1; u >= 0; --u)
                  if (l.charCodeAt(u) === 47) {
                    if (!h) {
                      f = u + 1;
                      break;
                    }
                  } else d === -1 && ((h = !1), (d = u + 1));
                return d === -1 ? '' : l.slice(f, d);
              },
              extname: function (l) {
                s(l);
                for (var a = -1, u = 0, f = -1, d = !0, h = 0, p = l.length - 1; p >= 0; --p) {
                  var m = l.charCodeAt(p);
                  if (m !== 47) f === -1 && ((d = !1), (f = p + 1)), m === 46 ? (a === -1 ? (a = p) : h !== 1 && (h = 1)) : a !== -1 && (h = -1);
                  else if (!d) {
                    u = p + 1;
                    break;
                  }
                }
                return a === -1 || f === -1 || h === 0 || (h === 1 && a === f - 1 && a === u + 1) ? '' : l.slice(a, f);
              },
              format: function (l) {
                if (l === null || typeof l != 'object')
                  throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof l);
                return (function (a, u) {
                  var f = u.dir || u.root,
                    d = u.base || (u.name || '') + (u.ext || '');
                  return f ? (f === u.root ? f + d : f + '/' + d) : d;
                })(0, l);
              },
              parse: function (l) {
                s(l);
                var a = { root: '', dir: '', base: '', ext: '', name: '' };
                if (l.length === 0) return a;
                var u,
                  f = l.charCodeAt(0),
                  d = f === 47;
                d ? ((a.root = '/'), (u = 1)) : (u = 0);
                for (var h = -1, p = 0, m = -1, y = !0, k = l.length - 1, w = 0; k >= u; --k)
                  if ((f = l.charCodeAt(k)) !== 47)
                    m === -1 && ((y = !1), (m = k + 1)), f === 46 ? (h === -1 ? (h = k) : w !== 1 && (w = 1)) : h !== -1 && (w = -1);
                  else if (!y) {
                    p = k + 1;
                    break;
                  }
                return (
                  h === -1 || m === -1 || w === 0 || (w === 1 && h === m - 1 && h === p + 1)
                    ? m !== -1 && (a.base = a.name = p === 0 && d ? l.slice(1, m) : l.slice(p, m))
                    : (p === 0 && d ? ((a.name = l.slice(1, h)), (a.base = l.slice(1, m))) : ((a.name = l.slice(p, h)), (a.base = l.slice(p, m))),
                      (a.ext = l.slice(h, m))),
                  p > 0 ? (a.dir = l.slice(0, p - 1)) : d && (a.dir = '/'),
                  a
                );
              },
              sep: '/',
              delimiter: ':',
              win32: null,
              posix: null,
            };
            (c.posix = c), (i.exports = c);
          },
        },
        t = {};
      function r(i) {
        var s = t[i];
        if (s !== void 0) return s.exports;
        var o = (t[i] = { exports: {} });
        return e[i](o, o.exports, r), o.exports;
      }
      (r.d = (i, s) => {
        for (var o in s) r.o(s, o) && !r.o(i, o) && Object.defineProperty(i, o, { enumerable: !0, get: s[o] });
      }),
        (r.o = (i, s) => Object.prototype.hasOwnProperty.call(i, s)),
        (r.r = (i) => {
          typeof Symbol < 'u' && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: 'Module' }),
            Object.defineProperty(i, '__esModule', { value: !0 });
        });
      var n = {};
      (() => {
        let i;
        r.r(n),
          r.d(n, { URI: () => d, Utils: () => j }),
          typeof process == 'object'
            ? (i = process.platform === 'win32')
            : typeof navigator == 'object' && (i = navigator.userAgent.indexOf('Windows') >= 0);
        let s = /^\w[\w\d+.-]*$/,
          o = /^\//,
          c = /^\/\//;
        function l(N, v) {
          if (!N.scheme && v)
            throw new Error(
              `[UriError]: Scheme is missing: {scheme: "", authority: "${N.authority}", path: "${N.path}", query: "${N.query}", fragment: "${N.fragment}"}`,
            );
          if (N.scheme && !s.test(N.scheme)) throw new Error('[UriError]: Scheme contains illegal characters.');
          if (N.path) {
            if (N.authority) {
              if (!o.test(N.path))
                throw new Error(
                  '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character',
                );
            } else if (c.test(N.path))
              throw new Error(
                '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")',
              );
          }
        }
        let a = '',
          u = '/',
          f = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
        class d {
          static isUri(v) {
            return (
              v instanceof d ||
              (!!v &&
                typeof v.authority == 'string' &&
                typeof v.fragment == 'string' &&
                typeof v.path == 'string' &&
                typeof v.query == 'string' &&
                typeof v.scheme == 'string' &&
                typeof v.fsPath == 'string' &&
                typeof v.with == 'function' &&
                typeof v.toString == 'function')
            );
          }
          scheme;
          authority;
          path;
          query;
          fragment;
          constructor(v, P, L, $, F, V = !1) {
            typeof v == 'object'
              ? ((this.scheme = v.scheme || a),
                (this.authority = v.authority || a),
                (this.path = v.path || a),
                (this.query = v.query || a),
                (this.fragment = v.fragment || a))
              : ((this.scheme = (function (se, K) {
                  return se || K ? se : 'file';
                })(v, V)),
                (this.authority = P || a),
                (this.path = (function (se, K) {
                  switch (se) {
                    case 'https':
                    case 'http':
                    case 'file':
                      K ? K[0] !== u && (K = u + K) : (K = u);
                  }
                  return K;
                })(this.scheme, L || a)),
                (this.query = $ || a),
                (this.fragment = F || a),
                l(this, V));
          }
          get fsPath() {
            return w(this, !1);
          }
          with(v) {
            if (!v) return this;
            let { scheme: P, authority: L, path: $, query: F, fragment: V } = v;
            return (
              P === void 0 ? (P = this.scheme) : P === null && (P = a),
              L === void 0 ? (L = this.authority) : L === null && (L = a),
              $ === void 0 ? ($ = this.path) : $ === null && ($ = a),
              F === void 0 ? (F = this.query) : F === null && (F = a),
              V === void 0 ? (V = this.fragment) : V === null && (V = a),
              P === this.scheme && L === this.authority && $ === this.path && F === this.query && V === this.fragment ? this : new p(P, L, $, F, V)
            );
          }
          static parse(v, P = !1) {
            let L = f.exec(v);
            return L ? new p(L[2] || a, T(L[4] || a), T(L[5] || a), T(L[7] || a), T(L[9] || a), P) : new p(a, a, a, a, a);
          }
          static file(v) {
            let P = a;
            if ((i && (v = v.replace(/\\/g, u)), v[0] === u && v[1] === u)) {
              let L = v.indexOf(u, 2);
              L === -1 ? ((P = v.substring(2)), (v = u)) : ((P = v.substring(2, L)), (v = v.substring(L) || u));
            }
            return new p('file', P, v, a, a);
          }
          static from(v) {
            let P = new p(v.scheme, v.authority, v.path, v.query, v.fragment);
            return l(P, !0), P;
          }
          toString(v = !1) {
            return g(this, v);
          }
          toJSON() {
            return this;
          }
          static revive(v) {
            if (v) {
              if (v instanceof d) return v;
              {
                let P = new p(v);
                return (P._formatted = v.external), (P._fsPath = v._sep === h ? v.fsPath : null), P;
              }
            }
            return v;
          }
        }
        let h = i ? 1 : void 0;
        class p extends d {
          _formatted = null;
          _fsPath = null;
          get fsPath() {
            return this._fsPath || (this._fsPath = w(this, !1)), this._fsPath;
          }
          toString(v = !1) {
            return v ? g(this, !0) : (this._formatted || (this._formatted = g(this, !1)), this._formatted);
          }
          toJSON() {
            let v = { $mid: 1 };
            return (
              this._fsPath && ((v.fsPath = this._fsPath), (v._sep = h)),
              this._formatted && (v.external = this._formatted),
              this.path && (v.path = this.path),
              this.scheme && (v.scheme = this.scheme),
              this.authority && (v.authority = this.authority),
              this.query && (v.query = this.query),
              this.fragment && (v.fragment = this.fragment),
              v
            );
          }
        }
        let m = {
          58: '%3A',
          47: '%2F',
          63: '%3F',
          35: '%23',
          91: '%5B',
          93: '%5D',
          64: '%40',
          33: '%21',
          36: '%24',
          38: '%26',
          39: '%27',
          40: '%28',
          41: '%29',
          42: '%2A',
          43: '%2B',
          44: '%2C',
          59: '%3B',
          61: '%3D',
          32: '%20',
        };
        function y(N, v, P) {
          let L,
            $ = -1;
          for (let F = 0; F < N.length; F++) {
            let V = N.charCodeAt(F);
            if (
              (V >= 97 && V <= 122) ||
              (V >= 65 && V <= 90) ||
              (V >= 48 && V <= 57) ||
              V === 45 ||
              V === 46 ||
              V === 95 ||
              V === 126 ||
              (v && V === 47) ||
              (P && V === 91) ||
              (P && V === 93) ||
              (P && V === 58)
            )
              $ !== -1 && ((L += encodeURIComponent(N.substring($, F))), ($ = -1)), L !== void 0 && (L += N.charAt(F));
            else {
              L === void 0 && (L = N.substr(0, F));
              let se = m[V];
              se !== void 0 ? ($ !== -1 && ((L += encodeURIComponent(N.substring($, F))), ($ = -1)), (L += se)) : $ === -1 && ($ = F);
            }
          }
          return $ !== -1 && (L += encodeURIComponent(N.substring($))), L !== void 0 ? L : N;
        }
        function k(N) {
          let v;
          for (let P = 0; P < N.length; P++) {
            let L = N.charCodeAt(P);
            L === 35 || L === 63 ? (v === void 0 && (v = N.substr(0, P)), (v += m[L])) : v !== void 0 && (v += N[P]);
          }
          return v !== void 0 ? v : N;
        }
        function w(N, v) {
          let P;
          return (
            (P =
              N.authority && N.path.length > 1 && N.scheme === 'file'
                ? `//${N.authority}${N.path}`
                : N.path.charCodeAt(0) === 47 &&
                  ((N.path.charCodeAt(1) >= 65 && N.path.charCodeAt(1) <= 90) || (N.path.charCodeAt(1) >= 97 && N.path.charCodeAt(1) <= 122)) &&
                  N.path.charCodeAt(2) === 58
                ? v
                  ? N.path.substr(1)
                  : N.path[1].toLowerCase() + N.path.substr(2)
                : N.path),
            i && (P = P.replace(/\//g, '\\')),
            P
          );
        }
        function g(N, v) {
          let P = v ? k : y,
            L = '',
            { scheme: $, authority: F, path: V, query: se, fragment: K } = N;
          if (($ && ((L += $), (L += ':')), (F || $ === 'file') && ((L += u), (L += u)), F)) {
            let J = F.indexOf('@');
            if (J !== -1) {
              let $e = F.substr(0, J);
              (F = F.substr(J + 1)),
                (J = $e.lastIndexOf(':')),
                J === -1 ? (L += P($e, !1, !1)) : ((L += P($e.substr(0, J), !1, !1)), (L += ':'), (L += P($e.substr(J + 1), !1, !0))),
                (L += '@');
            }
            (F = F.toLowerCase()), (J = F.lastIndexOf(':')), J === -1 ? (L += P(F, !1, !0)) : ((L += P(F.substr(0, J), !1, !0)), (L += F.substr(J)));
          }
          if (V) {
            if (V.length >= 3 && V.charCodeAt(0) === 47 && V.charCodeAt(2) === 58) {
              let J = V.charCodeAt(1);
              J >= 65 && J <= 90 && (V = `/${String.fromCharCode(J + 32)}:${V.substr(3)}`);
            } else if (V.length >= 2 && V.charCodeAt(1) === 58) {
              let J = V.charCodeAt(0);
              J >= 65 && J <= 90 && (V = `${String.fromCharCode(J + 32)}:${V.substr(2)}`);
            }
            L += P(V, !0, !1);
          }
          return se && ((L += '?'), (L += P(se, !1, !1))), K && ((L += '#'), (L += v ? K : y(K, !1, !1))), L;
        }
        function S(N) {
          try {
            return decodeURIComponent(N);
          } catch {
            return N.length > 3 ? N.substr(0, 3) + S(N.substr(3)) : N;
          }
        }
        let x = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
        function T(N) {
          return N.match(x) ? N.replace(x, (v) => S(v)) : N;
        }
        var O = r(470);
        let I = O.posix || O,
          E = '/';
        var j;
        (function (N) {
          (N.joinPath = function (v, ...P) {
            return v.with({ path: I.join(v.path, ...P) });
          }),
            (N.resolvePath = function (v, ...P) {
              let L = v.path,
                $ = !1;
              L[0] !== E && ((L = E + L), ($ = !0));
              let F = I.resolve(L, ...P);
              return $ && F[0] === E && !v.authority && (F = F.substring(1)), v.with({ path: F });
            }),
            (N.dirname = function (v) {
              if (v.path.length === 0 || v.path === E) return v;
              let P = I.dirname(v.path);
              return P.length === 1 && P.charCodeAt(0) === 46 && (P = ''), v.with({ path: P });
            }),
            (N.basename = function (v) {
              return I.basename(v.path);
            }),
            (N.extname = function (v) {
              return I.extname(v.path);
            });
        })(j || (j = {}));
      })(),
        (or = n);
    })();
    var { URI: he, Utils: qi } = or;
    function ar(e, t) {
      if (typeof e != 'string') throw new TypeError('Expected a string');
      let r = String(e),
        n = '',
        i = t ? !!t.extended : !1,
        s = t ? !!t.globstar : !1,
        o = !1,
        c = t && typeof t.flags == 'string' ? t.flags : '',
        l;
      for (let a = 0, u = r.length; a < u; a++)
        switch (((l = r[a]), l)) {
          case '/':
          case '$':
          case '^':
          case '+':
          case '.':
          case '(':
          case ')':
          case '=':
          case '!':
          case '|':
            n += '\\' + l;
            break;
          case '?':
            if (i) {
              n += '.';
              break;
            }
          case '[':
          case ']':
            if (i) {
              n += l;
              break;
            }
          case '{':
            if (i) {
              (o = !0), (n += '(');
              break;
            }
          case '}':
            if (i) {
              (o = !1), (n += ')');
              break;
            }
          case ',':
            if (o) {
              n += '|';
              break;
            }
            n += '\\' + l;
            break;
          case '*':
            let f = r[a - 1],
              d = 1;
            for (; r[a + 1] === '*'; ) d++, a++;
            let h = r[a + 1];
            s
              ? d > 1 && (f === '/' || f === void 0 || f === '{' || f === ',') && (h === '/' || h === void 0 || h === ',' || h === '}')
                ? (h === '/' ? a++ : f === '/' && n.endsWith('\\/') && (n = n.substr(0, n.length - 2)), (n += '((?:[^/]*(?:/|$))*)'))
                : (n += '([^/]*)')
              : (n += '.*');
            break;
          default:
            n += l;
        }
      return (!c || !~c.indexOf('g')) && (n = '^' + n + '$'), new RegExp(n, c);
    }
    var qr = '!',
      Wr = '/',
      en = class {
        constructor(t, r, n) {
          (this.folderUri = r), (this.uris = n), (this.globWrappers = []);
          try {
            for (let i of t) {
              let s = i[0] !== qr;
              s || (i = i.substring(1)),
                i.length > 0 &&
                  (i[0] === Wr && (i = i.substring(1)),
                  this.globWrappers.push({ regexp: ar('**/' + i, { extended: !0, globstar: !0 }), include: s }));
            }
            r && ((r = lr(r)), r.endsWith('/') || (r = r + '/'), (this.folderUri = r));
          } catch {
            (this.globWrappers.length = 0), (this.uris = []);
          }
        }
        matchesPattern(t) {
          if (this.folderUri && !t.startsWith(this.folderUri)) return !1;
          let r = !1;
          for (let { regexp: n, include: i } of this.globWrappers) n.test(t) && (r = i);
          return r;
        }
        getURIs() {
          return this.uris;
        }
      },
      tn = class {
        constructor(t, r, n) {
          (this.service = t),
            (this.uri = r),
            (this.dependencies = new Set()),
            (this.anchors = void 0),
            n && (this.unresolvedSchema = this.service.promise.resolve(new xe(n)));
        }
        getUnresolvedSchema() {
          return this.unresolvedSchema || (this.unresolvedSchema = this.service.loadSchema(this.uri)), this.unresolvedSchema;
        }
        getResolvedSchema() {
          return (
            this.resolvedSchema || (this.resolvedSchema = this.getUnresolvedSchema().then((t) => this.service.resolveSchemaContent(t, this))),
            this.resolvedSchema
          );
        }
        clearSchema() {
          let t = !!this.unresolvedSchema;
          return (this.resolvedSchema = void 0), (this.unresolvedSchema = void 0), this.dependencies.clear(), (this.anchors = void 0), t;
        }
      },
      xe = class {
        constructor(t, r = []) {
          (this.schema = t), (this.errors = r);
        }
      },
      ot = class {
        constructor(t, r = [], n = [], i) {
          (this.schema = t), (this.errors = r), (this.warnings = n), (this.schemaDraft = i);
        }
        getSection(t) {
          let r = this.getSectionRecursive(t, this.schema);
          if (r) return Z(r);
        }
        getSectionRecursive(t, r) {
          if (!r || typeof r == 'boolean' || t.length === 0) return r;
          let n = t.shift();
          if (r.properties && typeof r.properties[n]) return this.getSectionRecursive(t, r.properties[n]);
          if (r.patternProperties) {
            for (let i of Object.keys(r.patternProperties)) if (me(i)?.test(n)) return this.getSectionRecursive(t, r.patternProperties[i]);
          } else {
            if (typeof r.additionalProperties == 'object') return this.getSectionRecursive(t, r.additionalProperties);
            if (n.match('[0-9]+')) {
              if (Array.isArray(r.items)) {
                let i = parseInt(n, 10);
                if (!isNaN(i) && r.items[i]) return this.getSectionRecursive(t, r.items[i]);
              } else if (r.items) return this.getSectionRecursive(t, r.items);
            }
          }
        }
      },
      at = class {
        constructor(t, r, n) {
          (this.contextService = r),
            (this.requestService = t),
            (this.promiseConstructor = n || Promise),
            (this.callOnDispose = []),
            (this.contributionSchemas = {}),
            (this.contributionAssociations = []),
            (this.schemasById = {}),
            (this.filePatternAssociations = []),
            (this.registeredSchemasIds = {});
        }
        getRegisteredSchemaIds(t) {
          return Object.keys(this.registeredSchemasIds).filter((r) => {
            let n = he.parse(r).scheme;
            return n !== 'schemaservice' && (!t || t(n));
          });
        }
        get promise() {
          return this.promiseConstructor;
        }
        dispose() {
          for (; this.callOnDispose.length > 0; ) this.callOnDispose.pop()();
        }
        onResourceChange(t) {
          this.cachedSchemaForResource = void 0;
          let r = !1;
          t = pe(t);
          let n = [t],
            i = Object.keys(this.schemasById).map((s) => this.schemasById[s]);
          for (; n.length; ) {
            let s = n.pop();
            for (let o = 0; o < i.length; o++) {
              let c = i[o];
              c && (c.uri === s || c.dependencies.has(s)) && (c.uri !== s && n.push(c.uri), c.clearSchema() && (r = !0), (i[o] = void 0));
            }
          }
          return r;
        }
        setSchemaContributions(t) {
          if (t.schemas) {
            let r = t.schemas;
            for (let n in r) {
              let i = pe(n);
              this.contributionSchemas[i] = this.addSchemaHandle(i, r[n]);
            }
          }
          if (Array.isArray(t.schemaAssociations)) {
            let r = t.schemaAssociations;
            for (let n of r) {
              let i = n.uris.map(pe),
                s = this.addFilePatternAssociation(n.pattern, n.folderUri, i);
              this.contributionAssociations.push(s);
            }
          }
        }
        addSchemaHandle(t, r) {
          let n = new tn(this, t, r);
          return (this.schemasById[t] = n), n;
        }
        getOrAddSchemaHandle(t, r) {
          return this.schemasById[t] || this.addSchemaHandle(t, r);
        }
        addFilePatternAssociation(t, r, n) {
          let i = new en(t, r, n);
          return this.filePatternAssociations.push(i), i;
        }
        registerExternalSchema(t) {
          let r = pe(t.uri);
          return (
            (this.registeredSchemasIds[r] = !0),
            (this.cachedSchemaForResource = void 0),
            t.fileMatch && t.fileMatch.length && this.addFilePatternAssociation(t.fileMatch, t.folderUri, [r]),
            t.schema ? this.addSchemaHandle(r, t.schema) : this.getOrAddSchemaHandle(r)
          );
        }
        clearExternalSchemas() {
          (this.schemasById = {}), (this.filePatternAssociations = []), (this.registeredSchemasIds = {}), (this.cachedSchemaForResource = void 0);
          for (let t in this.contributionSchemas) (this.schemasById[t] = this.contributionSchemas[t]), (this.registeredSchemasIds[t] = !0);
          for (let t of this.contributionAssociations) this.filePatternAssociations.push(t);
        }
        getResolvedSchema(t) {
          let r = pe(t),
            n = this.schemasById[r];
          return n ? n.getResolvedSchema() : this.promise.resolve(void 0);
        }
        loadSchema(t) {
          if (!this.requestService) {
            let r = A("Unable to load schema from '{0}'. No schema request service available", Me(t));
            return this.promise.resolve(new xe({}, [r]));
          }
          return (
            t.startsWith('http://json-schema.org/') && (t = 'https' + t.substring(4)),
            this.requestService(t).then(
              (r) => {
                if (!r) {
                  let o = A("Unable to load schema from '{0}': No content.", Me(t));
                  return new xe({}, [o]);
                }
                let n = [];
                r.charCodeAt(0) === 65279 &&
                  (n.push(A("Problem reading content from '{0}': UTF-8 with BOM detected, only UTF 8 is allowed.", Me(t))), (r = r.trimStart()));
                let i = {},
                  s = [];
                return (
                  (i = dn(r, s)),
                  s.length && n.push(A("Unable to parse content from '{0}': Parse error at offset {1}.", Me(t), s[0].offset)),
                  new xe(i, n)
                );
              },
              (r) => {
                let n = r.toString(),
                  i = r.toString().split('Error: ');
                return (
                  i.length > 1 && (n = i[1]),
                  fe(n, '.') && (n = n.substr(0, n.length - 1)),
                  new xe({}, [A("Unable to load schema from '{0}': {1}.", Me(t), n)])
                );
              },
            )
          );
        }
        resolveSchemaContent(t, r) {
          let n = t.errors.slice(0),
            i = t.schema,
            s = i.$schema ? pe(i.$schema) : void 0;
          if (s === 'http://json-schema.org/draft-03/schema')
            return this.promise.resolve(new ot({}, [A('Draft-03 schemas are not supported.')], [], s));
          let o = new Set(),
            c = this.contextService,
            l = (m, y) => {
              y = decodeURIComponent(y);
              let k = m;
              return (
                y[0] === '/' && (y = y.substring(1)), y.split('/').some((w) => ((w = w.replace(/~1/g, '/').replace(/~0/g, '~')), (k = k[w]), !k)), k
              );
            },
            a = (m, y, k) => (y.anchors || (y.anchors = p(m)), y.anchors.get(k)),
            u = (m, y) => {
              for (let k in y) y.hasOwnProperty(k) && k !== 'id' && k !== '$id' && (m[k] = y[k]);
            },
            f = (m, y, k, w) => {
              let g;
              w === void 0 || w.length === 0 ? (g = y) : w.charAt(0) === '/' ? (g = l(y, w)) : (g = a(y, k, w)),
                g ? u(m, g) : n.push(A("$ref '{0}' in '{1}' can not be resolved.", w || '', k.uri));
            },
            d = (m, y, k, w) => {
              c && !/^[A-Za-z][A-Za-z0-9+\-.+]*:\/\/.*/.test(y) && (y = c.resolveRelativePath(y, w.uri)), (y = pe(y));
              let g = this.getOrAddSchemaHandle(y);
              return g.getUnresolvedSchema().then((S) => {
                if ((w.dependencies.add(y), S.errors.length)) {
                  let x = k ? y + '#' + k : y;
                  n.push(A("Problems loading reference '{0}': {1}", x, S.errors[0]));
                }
                return f(m, S.schema, g, k), h(m, S.schema, g);
              });
            },
            h = (m, y, k) => {
              let w = [];
              return (
                this.traverseNodes(m, (g) => {
                  let S = new Set();
                  for (; g.$ref; ) {
                    let x = g.$ref,
                      T = x.split('#', 2);
                    if ((delete g.$ref, T[0].length > 0)) {
                      w.push(d(g, T[0], T[1], k));
                      return;
                    } else if (!S.has(x)) {
                      let O = T[1];
                      f(g, y, k, O), S.add(x);
                    }
                  }
                  g.$recursiveRef && o.add('$recursiveRef'), g.$dynamicRef && o.add('$dynamicRef');
                }),
                this.promise.all(w)
              );
            },
            p = (m) => {
              let y = new Map();
              return (
                this.traverseNodes(m, (k) => {
                  let w = k.$id || k.id,
                    g = Ue(w) && w.charAt(0) === '#' ? w.substring(1) : k.$anchor;
                  g && (y.has(g) ? n.push(A("Duplicate anchor declaration: '{0}'", g)) : y.set(g, k)),
                    k.$recursiveAnchor && o.add('$recursiveAnchor'),
                    k.$dynamicAnchor && o.add('$dynamicAnchor');
                }),
                y
              );
            };
          return h(i, i, r).then((m) => {
            let y = [];
            return (
              o.size &&
                y.push(A('The schema uses meta-schema features ({0}) that are not yet supported by the validator.', Array.from(o.keys()).join(', '))),
              new ot(i, n, y, s)
            );
          });
        }
        traverseNodes(t, r) {
          if (!t || typeof t != 'object') return Promise.resolve(null);
          let n = new Set(),
            i = (...u) => {
              for (let f of u) oe(f) && l.push(f);
            },
            s = (...u) => {
              for (let f of u)
                if (oe(f))
                  for (let d in f) {
                    let p = f[d];
                    oe(p) && l.push(p);
                  }
            },
            o = (...u) => {
              for (let f of u) if (Array.isArray(f)) for (let d of f) oe(d) && l.push(d);
            },
            c = (u) => {
              if (Array.isArray(u)) for (let f of u) oe(f) && l.push(f);
              else oe(u) && l.push(u);
            },
            l = [t],
            a = l.pop();
          for (; a; )
            n.has(a) ||
              (n.add(a),
              r(a),
              i(
                a.additionalItems,
                a.additionalProperties,
                a.not,
                a.contains,
                a.propertyNames,
                a.if,
                a.then,
                a.else,
                a.unevaluatedItems,
                a.unevaluatedProperties,
              ),
              s(a.definitions, a.$defs, a.properties, a.patternProperties, a.dependencies, a.dependentSchemas),
              o(a.anyOf, a.allOf, a.oneOf, a.prefixItems),
              c(a.items)),
              (a = l.pop());
        }
        getSchemaFromProperty(t, r) {
          if (r.root?.type === 'object') {
            for (let n of r.root.properties)
              if (n.keyNode.value === '$schema' && n.valueNode?.type === 'string') {
                let i = n.valueNode.value;
                return this.contextService && !/^\w[\w\d+.-]*:/.test(i) && (i = this.contextService.resolveRelativePath(i, t)), i;
              }
          }
        }
        getAssociatedSchemas(t) {
          let r = Object.create(null),
            n = [],
            i = lr(t);
          for (let s of this.filePatternAssociations) if (s.matchesPattern(i)) for (let o of s.getURIs()) r[o] || (n.push(o), (r[o] = !0));
          return n;
        }
        getSchemaURIsForResource(t, r) {
          let n = r && this.getSchemaFromProperty(t, r);
          return n ? [n] : this.getAssociatedSchemas(t);
        }
        getSchemaForResource(t, r) {
          if (r) {
            let s = this.getSchemaFromProperty(t, r);
            if (s) {
              let o = pe(s);
              return this.getOrAddSchemaHandle(o).getResolvedSchema();
            }
          }
          if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === t) return this.cachedSchemaForResource.resolvedSchema;
          let n = this.getAssociatedSchemas(t),
            i = n.length > 0 ? this.createCombinedSchema(t, n).getResolvedSchema() : this.promise.resolve(void 0);
          return (this.cachedSchemaForResource = { resource: t, resolvedSchema: i }), i;
        }
        createCombinedSchema(t, r) {
          if (r.length === 1) return this.getOrAddSchemaHandle(r[0]);
          {
            let n = 'schemaservice://combinedSchema/' + encodeURIComponent(t),
              i = { allOf: r.map((s) => ({ $ref: s })) };
            return this.addSchemaHandle(n, i);
          }
        }
        getMatchingSchemas(t, r, n) {
          if (n) {
            let i = n.id || 'schemaservice://untitled/matchingSchemas/' + zr++;
            return this.addSchemaHandle(i, n)
              .getResolvedSchema()
              .then((o) => r.getMatchingSchemas(o.schema).filter((c) => !c.inverted));
          }
          return this.getSchemaForResource(t.uri, r).then((i) => (i ? r.getMatchingSchemas(i.schema).filter((s) => !s.inverted) : []));
        }
      },
      zr = 0;
    function pe(e) {
      try {
        return he.parse(e).toString(!0);
      } catch {
        return e;
      }
    }
    function lr(e) {
      try {
        return he.parse(e).with({ fragment: null, query: null }).toString(!0);
      } catch {
        return e;
      }
    }
    function Me(e) {
      try {
        let t = he.parse(e);
        if (t.scheme === 'file') return t.fsPath;
      } catch {}
      return e;
    }
    function cr(e, t) {
      let r = [],
        n = [],
        i = [],
        s = -1,
        o = ee(e.getText(), !1),
        c = o.scan();
      function l(p) {
        r.push(p), n.push(i.length);
      }
      for (; c !== 17; ) {
        switch (c) {
          case 1:
          case 3: {
            let p = e.positionAt(o.getTokenOffset()).line,
              m = { startLine: p, endLine: p, kind: c === 1 ? 'object' : 'array' };
            i.push(m);
            break;
          }
          case 2:
          case 4: {
            let p = c === 2 ? 'object' : 'array';
            if (i.length > 0 && i[i.length - 1].kind === p) {
              let m = i.pop(),
                y = e.positionAt(o.getTokenOffset()).line;
              m && y > m.startLine + 1 && s !== m.startLine && ((m.endLine = y - 1), l(m), (s = m.startLine));
            }
            break;
          }
          case 13: {
            let p = e.positionAt(o.getTokenOffset()).line,
              m = e.positionAt(o.getTokenOffset() + o.getTokenLength()).line;
            o.getTokenError() === 1 && p + 1 < e.lineCount
              ? o.setPosition(e.offsetAt(D.create(p + 1, 0)))
              : p < m && (l({ startLine: p, endLine: m, kind: ye.Comment }), (s = p));
            break;
          }
          case 12: {
            let m = e
              .getText()
              .substr(o.getTokenOffset(), o.getTokenLength())
              .match(/^\/\/\s*#(region\b)|(endregion\b)/);
            if (m) {
              let y = e.positionAt(o.getTokenOffset()).line;
              if (m[1]) {
                let k = { startLine: y, endLine: y, kind: ye.Region };
                i.push(k);
              } else {
                let k = i.length - 1;
                for (; k >= 0 && i[k].kind !== ye.Region; ) k--;
                if (k >= 0) {
                  let w = i[k];
                  (i.length = k), y > w.startLine && s !== w.startLine && ((w.endLine = y), l(w), (s = w.startLine));
                }
              }
            }
            break;
          }
        }
        c = o.scan();
      }
      let a = t && t.rangeLimit;
      if (typeof a != 'number' || r.length <= a) return r;
      t && t.onRangeLimitExceeded && t.onRangeLimitExceeded(e.uri);
      let u = [];
      for (let p of n) p < 30 && (u[p] = (u[p] || 0) + 1);
      let f = 0,
        d = 0;
      for (let p = 0; p < u.length; p++) {
        let m = u[p];
        if (m) {
          if (m + f > a) {
            d = p;
            break;
          }
          f += m;
        }
      }
      let h = [];
      for (let p = 0; p < r.length; p++) {
        let m = n[p];
        typeof m == 'number' && (m < d || (m === d && f++ < a)) && h.push(r[p]);
      }
      return h;
    }
    function fr(e, t, r) {
      function n(c) {
        let l = e.offsetAt(c),
          a = r.getNodeFromOffset(l, !0),
          u = [];
        for (; a; ) {
          switch (a.type) {
            case 'string':
            case 'object':
            case 'array':
              let d = a.offset + 1,
                h = a.offset + a.length - 1;
              d < h && l >= d && l <= h && u.push(i(d, h)), u.push(i(a.offset, a.offset + a.length));
              break;
            case 'number':
            case 'boolean':
            case 'null':
            case 'property':
              u.push(i(a.offset, a.offset + a.length));
              break;
          }
          if (a.type === 'property' || (a.parent && a.parent.type === 'array')) {
            let d = o(a.offset + a.length, 5);
            d !== -1 && u.push(i(a.offset, d));
          }
          a = a.parent;
        }
        let f;
        for (let d = u.length - 1; d >= 0; d--) f = Pe.create(u[d], f);
        return f || (f = Pe.create(_.create(c, c))), f;
      }
      function i(c, l) {
        return _.create(e.positionAt(c), e.positionAt(l));
      }
      let s = ee(e.getText(), !0);
      function o(c, l) {
        return s.setPosition(c), s.scan() === l ? s.getTokenOffset() + s.getTokenLength() : -1;
      }
      return t.map(n);
    }
    function Fe(e, t, r) {
      let n;
      if (r) {
        let s = e.offsetAt(r.start),
          o = e.offsetAt(r.end) - s;
        n = { offset: s, length: o };
      }
      let i = {
        tabSize: t ? t.tabSize : 4,
        insertSpaces: t?.insertSpaces === !0,
        insertFinalNewline: t?.insertFinalNewline === !0,
        eol: `
`,
        keepLines: t?.keepLines === !0,
      };
      return mn(e.getText(), n, i).map((s) => G.replace(_.create(e.positionAt(s.offset), e.positionAt(s.offset + s.length)), s.content));
    }
    var B;
    (function (e) {
      (e[(e.Object = 0)] = 'Object'), (e[(e.Array = 1)] = 'Array');
    })(B || (B = {}));
    var ke = class {
      constructor(t, r) {
        (this.propertyName = t ?? ''),
          (this.beginningLineNumber = r),
          (this.childrenProperties = []),
          (this.lastProperty = !1),
          (this.noKeyName = !1);
      }
      addChildProperty(t) {
        if (((t.parent = this), this.childrenProperties.length > 0)) {
          let r = 0;
          t.noKeyName ? (r = this.childrenProperties.length) : (r = Gr(this.childrenProperties, t, Hr)),
            r < 0 && (r = r * -1 - 1),
            this.childrenProperties.splice(r, 0, t);
        } else this.childrenProperties.push(t);
        return t;
      }
    };
    function Hr(e, t) {
      let r = e.propertyName.toLowerCase(),
        n = t.propertyName.toLowerCase();
      return r < n ? -1 : r > n ? 1 : 0;
    }
    function Gr(e, t, r) {
      let n = t.propertyName.toLowerCase(),
        i = e[0].propertyName.toLowerCase(),
        s = e[e.length - 1].propertyName.toLowerCase();
      if (n < i) return 0;
      if (n > s) return e.length;
      let o = 0,
        c = e.length - 1;
      for (; o <= c; ) {
        let l = (c + o) >> 1,
          a = r(t, e[l]);
        if (a > 0) o = l + 1;
        else if (a < 0) c = l - 1;
        else return l;
      }
      return -o - 1;
    }
    function dr(e, t) {
      let r = { ...t, keepLines: !1 },
        n = X.applyEdits(e, Fe(e, r, void 0)),
        i = X.create('test://test.json', 'json', 0, n),
        s = Xr(i),
        o = Zr(i, s),
        c = Fe(o, r, void 0),
        l = X.applyEdits(o, c);
      return [G.replace(_.create(D.create(0, 0), e.positionAt(e.getText().length)), l)];
    }
    function Xr(e) {
      let t = e.getText(),
        r = ee(t, !1),
        n = new ke(),
        i = n,
        s = n,
        o = n,
        c,
        l = 0,
        a = 0,
        u,
        f,
        d = -1,
        h = -1,
        p = 0,
        m = 0,
        y = [],
        k = !1,
        w = !1;
      for (; (c = r.scan()) !== 17; ) {
        if (k === !0 && c !== 14 && c !== 15 && c !== 12 && c !== 13 && s.endLineNumber === void 0) {
          let g = r.getTokenStartLine();
          f === 2 || f === 4 ? (o.endLineNumber = g - 1) : (s.endLineNumber = g - 1), (p = g), (k = !1);
        }
        if ((w === !0 && c !== 14 && c !== 15 && c !== 12 && c !== 13 && ((p = r.getTokenStartLine()), (w = !1)), r.getTokenStartLine() !== l)) {
          for (let g = l; g < r.getTokenStartLine(); g++) {
            let S = e.getText(_.create(D.create(g, 0), D.create(g + 1, 0))).length;
            a = a + S;
          }
          l = r.getTokenStartLine();
        }
        switch (c) {
          case 10: {
            if (u === void 0 || u === 1 || (u === 5 && y[y.length - 1] === B.Object)) {
              let g = new ke(r.getTokenValue(), p);
              (o = s), (s = i.addChildProperty(g));
            }
            break;
          }
          case 3: {
            if ((n.beginningLineNumber === void 0 && (n.beginningLineNumber = r.getTokenStartLine()), y[y.length - 1] === B.Object)) i = s;
            else if (y[y.length - 1] === B.Array) {
              let g = new ke(r.getTokenValue(), p);
              (g.noKeyName = !0), (o = s), (s = i.addChildProperty(g)), (i = s);
            }
            y.push(B.Array), (s.type = B.Array), (p = r.getTokenStartLine()), p++;
            break;
          }
          case 1: {
            if (n.beginningLineNumber === void 0) n.beginningLineNumber = r.getTokenStartLine();
            else if (y[y.length - 1] === B.Array) {
              let g = new ke(r.getTokenValue(), p);
              (g.noKeyName = !0), (o = s), (s = i.addChildProperty(g));
            }
            (s.type = B.Object), y.push(B.Object), (i = s), (p = r.getTokenStartLine()), p++;
            break;
          }
          case 4: {
            (m = r.getTokenStartLine()),
              y.pop(),
              s.endLineNumber === void 0 &&
                (u === 2 || u === 4) &&
                ((s.endLineNumber = m - 1),
                (s.lastProperty = !0),
                (s.lineWhereToAddComma = d),
                (s.indexWhereToAddComa = h),
                (o = s),
                (s = s ? s.parent : void 0),
                (i = s)),
              (n.endLineNumber = m),
              (p = m + 1);
            break;
          }
          case 2: {
            (m = r.getTokenStartLine()),
              y.pop(),
              u !== 1 &&
                (s.endLineNumber === void 0 &&
                  ((s.endLineNumber = m - 1), (s.lastProperty = !0), (s.lineWhereToAddComma = d), (s.indexWhereToAddComa = h)),
                (o = s),
                (s = s ? s.parent : void 0),
                (i = s)),
              (n.endLineNumber = r.getTokenStartLine()),
              (p = m + 1);
            break;
          }
          case 5: {
            (m = r.getTokenStartLine()),
              s.endLineNumber === void 0 &&
                (y[y.length - 1] === B.Object || (y[y.length - 1] === B.Array && (u === 2 || u === 4))) &&
                ((s.endLineNumber = m), (s.commaIndex = r.getTokenOffset() - a), (s.commaLine = m)),
              (u === 2 || u === 4) && ((o = s), (s = s ? s.parent : void 0), (i = s)),
              (p = m + 1);
            break;
          }
          case 13: {
            u === 5 &&
              d === r.getTokenStartLine() &&
              ((y[y.length - 1] === B.Array && (f === 2 || f === 4)) || y[y.length - 1] === B.Object) &&
              ((y[y.length - 1] === B.Array && (f === 2 || f === 4)) || y[y.length - 1] === B.Object) &&
              ((s.endLineNumber = void 0), (k = !0)),
              (u === 1 || u === 3) && d === r.getTokenStartLine() && (w = !0);
            break;
          }
        }
        c !== 14 &&
          c !== 13 &&
          c !== 12 &&
          c !== 15 &&
          ((f = u), (u = c), (d = r.getTokenStartLine()), (h = r.getTokenOffset() + r.getTokenLength() - a));
      }
      return n;
    }
    function Zr(e, t) {
      if (t.childrenProperties.length === 0) return e;
      let r = X.create('test://test.json', 'json', 0, e.getText()),
        n = [];
      for (ur(n, t, t.beginningLineNumber); n.length > 0; ) {
        let i = n.shift(),
          s = i.propertyTreeArray,
          o = i.beginningLineNumber;
        for (let c = 0; c < s.length; c++) {
          let l = s[c],
            a = _.create(D.create(l.beginningLineNumber, 0), D.create(l.endLineNumber + 1, 0)),
            u = e.getText(a),
            f = X.create('test://test.json', 'json', 0, u);
          if (l.lastProperty === !0 && c !== s.length - 1) {
            let p = l.lineWhereToAddComma - l.beginningLineNumber,
              m = l.indexWhereToAddComa,
              y = { range: _.create(D.create(p, m), D.create(p, m)), text: ',' };
            X.update(f, [y], 1);
          } else if (l.lastProperty === !1 && c === s.length - 1) {
            let p = l.commaIndex,
              y = l.commaLine - l.beginningLineNumber,
              k = { range: _.create(D.create(y, p), D.create(y, p + 1)), text: '' };
            X.update(f, [k], 1);
          }
          let d = l.endLineNumber - l.beginningLineNumber + 1,
            h = { range: _.create(D.create(o, 0), D.create(o + d, 0)), text: f.getText() };
          X.update(r, [h], 1), ur(n, l, o), (o = o + d);
        }
      }
      return r;
    }
    function ur(e, t, r) {
      if (t.childrenProperties.length !== 0)
        if (t.type === B.Object) {
          let n = 1 / 0;
          for (let s of t.childrenProperties) s.beginningLineNumber < n && (n = s.beginningLineNumber);
          let i = n - t.beginningLineNumber;
          (r = r + i), e.push(new lt(r, t.childrenProperties));
        } else t.type === B.Array && hr(e, t, r);
    }
    function hr(e, t, r) {
      for (let n of t.childrenProperties) {
        if (n.type === B.Object) {
          let i = 1 / 0;
          for (let o of n.childrenProperties) o.beginningLineNumber < i && (i = o.beginningLineNumber);
          let s = i - n.beginningLineNumber;
          e.push(new lt(r + n.beginningLineNumber - t.beginningLineNumber + s, n.childrenProperties));
        }
        n.type === B.Array && hr(e, n, r + n.beginningLineNumber - t.beginningLineNumber);
      }
    }
    var lt = class {
      constructor(t, r) {
        (this.beginningLineNumber = t), (this.propertyTreeArray = r);
      }
    };
    function pr(e, t) {
      let r = [];
      return (
        t.visit((n) => {
          if (n.type === 'property' && n.keyNode.value === '$ref' && n.valueNode?.type === 'string') {
            let i = n.valueNode.value,
              s = Yr(t, i);
            if (s) {
              let o = e.positionAt(s.offset);
              r.push({ target: `${e.uri}#${o.line + 1},${o.character + 1}`, range: Qr(e, n.valueNode) });
            }
          }
          return !0;
        }),
        Promise.resolve(r)
      );
    }
    function Qr(e, t) {
      return _.create(e.positionAt(t.offset + 1), e.positionAt(t.offset + t.length - 1));
    }
    function Yr(e, t) {
      let r = Kr(t);
      return r ? nn(r, e.root) : null;
    }
    function nn(e, t) {
      if (!t) return null;
      if (e.length === 0) return t;
      let r = e.shift();
      if (t && t.type === 'object') {
        let n = t.properties.find((i) => i.keyNode.value === r);
        return n ? nn(e, n.valueNode) : null;
      } else if (t && t.type === 'array' && r.match(/^(0|[1-9][0-9]*)$/)) {
        let n = Number.parseInt(r),
          i = t.items[n];
        return i ? nn(e, i) : null;
      }
      return null;
    }
    function Kr(e) {
      return e === '#' ? [] : e[0] !== '#' || e[1] !== '/' ? null : e.substring(2).split(/\//).map(ei);
    }
    function ei(e) {
      return e.replace(/~1/g, '/').replace(/~0/g, '~');
    }
    function gr(e) {
      let t = e.promiseConstructor || Promise,
        r = new at(e.schemaRequestService, e.workspaceContext, t);
      r.setSchemaContributions(st);
      let n = new et(r, e.contributions, t, e.clientCapabilities),
        i = new tt(r, e.contributions, t),
        s = new it(r),
        o = new rt(r, t);
      return {
        configure: (c) => {
          r.clearExternalSchemas(), c.schemas?.forEach(r.registerExternalSchema.bind(r)), o.configure(c);
        },
        resetSchema: (c) => r.onResourceChange(c),
        doValidation: o.doValidation.bind(o),
        getLanguageStatus: o.getLanguageStatus.bind(o),
        parseJSONDocument: (c) => tr(c, { collectComments: !0 }),
        newJSONDocument: (c, l) => er(c, l),
        getMatchingSchemas: r.getMatchingSchemas.bind(r),
        doResolve: n.doResolve.bind(n),
        doComplete: n.doComplete.bind(n),
        findDocumentSymbols: s.findDocumentSymbols.bind(s),
        findDocumentSymbols2: s.findDocumentSymbols2.bind(s),
        findDocumentColors: s.findDocumentColors.bind(s),
        getColorPresentations: s.getColorPresentations.bind(s),
        doHover: i.doHover.bind(i),
        getFoldingRanges: cr,
        getSelectionRanges: fr,
        findDefinition: () => Promise.resolve([]),
        findLinks: pr,
        format: (c, l, a) => Fe(c, a, l),
        sort: (c, l) => dr(c, l),
      };
    }
    var mr;
    typeof fetch < 'u' &&
      (mr = function (e) {
        return fetch(e).then((t) => t.text());
      });
    var ct = class {
        constructor(t, r) {
          (this._ctx = t),
            (this._languageSettings = r.languageSettings),
            (this._languageId = r.languageId),
            (this._languageService = gr({
              workspaceContext: {
                resolveRelativePath: (n, i) => {
                  let s = i.substr(0, i.lastIndexOf('/') + 1);
                  return ii(s, n);
                },
              },
              schemaRequestService: r.enableSchemaRequest ? mr : void 0,
              clientCapabilities: He.LATEST,
            })),
            this._languageService.configure(this._languageSettings);
        }
        async doValidation(t) {
          let r = this._getTextDocument(t);
          if (r) {
            let n = this._languageService.parseJSONDocument(r);
            return this._languageService.doValidation(r, n, this._languageSettings);
          }
          return Promise.resolve([]);
        }
        async doComplete(t, r) {
          let n = this._getTextDocument(t);
          if (!n) return null;
          let i = this._languageService.parseJSONDocument(n);
          return this._languageService.doComplete(n, r, i);
        }
        async doResolve(t) {
          return this._languageService.doResolve(t);
        }
        async doHover(t, r) {
          let n = this._getTextDocument(t);
          if (!n) return null;
          let i = this._languageService.parseJSONDocument(n);
          return this._languageService.doHover(n, r, i);
        }
        async format(t, r, n) {
          let i = this._getTextDocument(t);
          if (!i) return [];
          let s = this._languageService.format(i, r, n);
          return Promise.resolve(s);
        }
        async resetSchema(t) {
          return Promise.resolve(this._languageService.resetSchema(t));
        }
        async findDocumentSymbols(t) {
          let r = this._getTextDocument(t);
          if (!r) return [];
          let n = this._languageService.parseJSONDocument(r),
            i = this._languageService.findDocumentSymbols2(r, n);
          return Promise.resolve(i);
        }
        async findDocumentColors(t) {
          let r = this._getTextDocument(t);
          if (!r) return [];
          let n = this._languageService.parseJSONDocument(r),
            i = this._languageService.findDocumentColors(r, n);
          return Promise.resolve(i);
        }
        async getColorPresentations(t, r, n) {
          let i = this._getTextDocument(t);
          if (!i) return [];
          let s = this._languageService.parseJSONDocument(i),
            o = this._languageService.getColorPresentations(i, s, r, n);
          return Promise.resolve(o);
        }
        async getFoldingRanges(t, r) {
          let n = this._getTextDocument(t);
          if (!n) return [];
          let i = this._languageService.getFoldingRanges(n, r);
          return Promise.resolve(i);
        }
        async getSelectionRanges(t, r) {
          let n = this._getTextDocument(t);
          if (!n) return [];
          let i = this._languageService.parseJSONDocument(n),
            s = this._languageService.getSelectionRanges(n, r, i);
          return Promise.resolve(s);
        }
        async parseJSONDocument(t) {
          let r = this._getTextDocument(t);
          if (!r) return null;
          let n = this._languageService.parseJSONDocument(r);
          return Promise.resolve(n);
        }
        async getMatchingSchemas(t) {
          let r = this._getTextDocument(t);
          if (!r) return [];
          let n = this._languageService.parseJSONDocument(r);
          return Promise.resolve(this._languageService.getMatchingSchemas(r, n));
        }
        _getTextDocument(t) {
          let r = this._ctx.getMirrorModels();
          for (let n of r) if (n.uri.toString() === t) return X.create(t, this._languageId, n.version, n.getValue());
          return null;
        }
      },
      ni = 47,
      rn = 46;
    function ri(e) {
      return e.charCodeAt(0) === ni;
    }
    function ii(e, t) {
      if (ri(t)) {
        let r = he.parse(e),
          n = t.split('/');
        return r.with({ path: yr(n) }).toString();
      }
      return si(e, t);
    }
    function yr(e) {
      let t = [];
      for (let n of e)
        n.length === 0 ||
          (n.length === 1 && n.charCodeAt(0) === rn) ||
          (n.length === 2 && n.charCodeAt(0) === rn && n.charCodeAt(1) === rn ? t.pop() : t.push(n));
      e.length > 1 && e[e.length - 1].length === 0 && t.push('');
      let r = t.join('/');
      return e[0].length === 0 && (r = '/' + r), r;
    }
    function si(e, ...t) {
      let r = he.parse(e),
        n = r.path.split('/');
      for (let i of t) n.push(...i.split('/'));
      return r.with({ path: yr(n) }).toString();
    }
    function oi(e, t) {
      return new ct(e, t);
    }
    return Sr(ai);
  })();
  return moduleExports;
});
