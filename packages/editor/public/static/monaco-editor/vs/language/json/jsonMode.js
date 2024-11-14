/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.50.0(c321d0fbecb50ab8a5365fa1965476b0ae63fc87)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
define('vs/language/json/jsonMode', ['require', 'require'], (require) => {
  'use strict';
  var moduleExports = (() => {
    var Qn = Object.create;
    var Z = Object.defineProperty;
    var Yn = Object.getOwnPropertyDescriptor;
    var Gn = Object.getOwnPropertyNames;
    var Zn = Object.getPrototypeOf,
      Cn = Object.prototype.hasOwnProperty;
    var et = ((e) =>
      typeof require < 'u' ? require : typeof Proxy < 'u' ? new Proxy(e, { get: (r, i) => (typeof require < 'u' ? require : r)[i] }) : e)(function (
      e,
    ) {
      if (typeof require < 'u') return require.apply(this, arguments);
      throw Error('Dynamic require of "' + e + '" is not supported');
    });
    var nt = (e, r) => () => (r || e((r = { exports: {} }).exports, r), r.exports),
      tt = (e, r) => {
        for (var i in r) Z(e, i, { get: r[i], enumerable: !0 });
      },
      G = (e, r, i, t) => {
        if ((r && typeof r == 'object') || typeof r == 'function')
          for (let n of Gn(r)) !Cn.call(e, n) && n !== i && Z(e, n, { get: () => r[n], enumerable: !(t = Yn(r, n)) || t.enumerable });
        return e;
      },
      Re = (e, r, i) => (G(e, r, 'default'), i && G(i, r, 'default')),
      We = (e, r, i) => ((i = e != null ? Qn(Zn(e)) : {}), G(r || !e || !e.__esModule ? Z(i, 'default', { value: e, enumerable: !0 }) : i, e)),
      rt = (e) => G(Z({}, '__esModule', { value: !0 }), e);
    var Ne = nt((zt, Se) => {
      var it = We(et('vs/editor/editor.api'));
      Se.exports = it;
    });
    var Ht = {};
    tt(Ht, {
      CompletionAdapter: () => H,
      DefinitionAdapter: () => Ie,
      DiagnosticsAdapter: () => B,
      DocumentColorAdapter: () => X,
      DocumentFormattingEditProvider: () => $,
      DocumentHighlightAdapter: () => xe,
      DocumentLinkAdapter: () => Ee,
      DocumentRangeFormattingEditProvider: () => K,
      DocumentSymbolAdapter: () => z,
      FoldingRangeAdapter: () => q,
      HoverAdapter: () => J,
      ReferenceAdapter: () => we,
      RenameAdapter: () => _e,
      SelectionRangeAdapter: () => Q,
      WorkerManager: () => R,
      fromPosition: () => L,
      fromRange: () => Le,
      getWorker: () => Ut,
      setupMode: () => Vt,
      toRange: () => v,
      toTextEdit: () => M,
    });
    var u = {};
    Re(u, We(Ne()));
    var ot = 2 * 60 * 1e3,
      R = class {
        constructor(r) {
          (this._defaults = r),
            (this._worker = null),
            (this._client = null),
            (this._idleCheckInterval = window.setInterval(() => this._checkIfIdle(), 30 * 1e3)),
            (this._lastUsedTime = 0),
            (this._configChangeListener = this._defaults.onDidChange(() => this._stopWorker()));
        }
        _stopWorker() {
          this._worker && (this._worker.dispose(), (this._worker = null)), (this._client = null);
        }
        dispose() {
          clearInterval(this._idleCheckInterval), this._configChangeListener.dispose(), this._stopWorker();
        }
        _checkIfIdle() {
          if (!this._worker) return;
          Date.now() - this._lastUsedTime > ot && this._stopWorker();
        }
        _getClient() {
          return (
            (this._lastUsedTime = Date.now()),
            this._client ||
              ((this._worker = u.editor.createWebWorker({
                moduleId: 'vs/language/json/jsonWorker',
                label: this._defaults.languageId,
                createData: {
                  languageSettings: this._defaults.diagnosticsOptions,
                  languageId: this._defaults.languageId,
                  enableSchemaRequest: this._defaults.diagnosticsOptions.enableSchemaRequest,
                },
              })),
              (this._client = this._worker.getProxy())),
            this._client
          );
        }
        getLanguageServiceWorker(...r) {
          let i;
          return this._getClient()
            .then((t) => {
              i = t;
            })
            .then((t) => {
              if (this._worker) return this._worker.withSyncedResources(r);
            })
            .then((t) => i);
        }
      };
    var De;
    (function (e) {
      function r(i) {
        return typeof i == 'string';
      }
      e.is = r;
    })(De || (De = {}));
    var le;
    (function (e) {
      function r(i) {
        return typeof i == 'string';
      }
      e.is = r;
    })(le || (le = {}));
    var Fe;
    (function (e) {
      (e.MIN_VALUE = -2147483648), (e.MAX_VALUE = 2147483647);
      function r(i) {
        return typeof i == 'number' && e.MIN_VALUE <= i && i <= e.MAX_VALUE;
      }
      e.is = r;
    })(Fe || (Fe = {}));
    var C;
    (function (e) {
      (e.MIN_VALUE = 0), (e.MAX_VALUE = 2147483647);
      function r(i) {
        return typeof i == 'number' && e.MIN_VALUE <= i && i <= e.MAX_VALUE;
      }
      e.is = r;
    })(C || (C = {}));
    var E;
    (function (e) {
      function r(t, n) {
        return t === Number.MAX_VALUE && (t = C.MAX_VALUE), n === Number.MAX_VALUE && (n = C.MAX_VALUE), { line: t, character: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.objectLiteral(n) && a.uinteger(n.line) && a.uinteger(n.character);
      }
      e.is = i;
    })(E || (E = {}));
    var h;
    (function (e) {
      function r(t, n, o, s) {
        if (a.uinteger(t) && a.uinteger(n) && a.uinteger(o) && a.uinteger(s)) return { start: E.create(t, n), end: E.create(o, s) };
        if (E.is(t) && E.is(n)) return { start: t, end: n };
        throw new Error(`Range#create called with invalid arguments[${t}, ${n}, ${o}, ${s}]`);
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.objectLiteral(n) && E.is(n.start) && E.is(n.end);
      }
      e.is = i;
    })(h || (h = {}));
    var ee;
    (function (e) {
      function r(t, n) {
        return { uri: t, range: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.objectLiteral(n) && h.is(n.range) && (a.string(n.uri) || a.undefined(n.uri));
      }
      e.is = i;
    })(ee || (ee = {}));
    var Me;
    (function (e) {
      function r(t, n, o, s) {
        return { targetUri: t, targetRange: n, targetSelectionRange: o, originSelectionRange: s };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          a.objectLiteral(n) &&
          h.is(n.targetRange) &&
          a.string(n.targetUri) &&
          h.is(n.targetSelectionRange) &&
          (h.is(n.originSelectionRange) || a.undefined(n.originSelectionRange))
        );
      }
      e.is = i;
    })(Me || (Me = {}));
    var ue;
    (function (e) {
      function r(t, n, o, s) {
        return { red: t, green: n, blue: o, alpha: s };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          a.objectLiteral(n) &&
          a.numberRange(n.red, 0, 1) &&
          a.numberRange(n.green, 0, 1) &&
          a.numberRange(n.blue, 0, 1) &&
          a.numberRange(n.alpha, 0, 1)
        );
      }
      e.is = i;
    })(ue || (ue = {}));
    var je;
    (function (e) {
      function r(t, n) {
        return { range: t, color: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.objectLiteral(n) && h.is(n.range) && ue.is(n.color);
      }
      e.is = i;
    })(je || (je = {}));
    var Ue;
    (function (e) {
      function r(t, n, o) {
        return { label: t, textEdit: n, additionalTextEdits: o };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          a.objectLiteral(n) &&
          a.string(n.label) &&
          (a.undefined(n.textEdit) || N.is(n)) &&
          (a.undefined(n.additionalTextEdits) || a.typedArray(n.additionalTextEdits, N.is))
        );
      }
      e.is = i;
    })(Ue || (Ue = {}));
    var W;
    (function (e) {
      (e.Comment = 'comment'), (e.Imports = 'imports'), (e.Region = 'region');
    })(W || (W = {}));
    var Ve;
    (function (e) {
      function r(t, n, o, s, l, f) {
        let m = { startLine: t, endLine: n };
        return (
          a.defined(o) && (m.startCharacter = o),
          a.defined(s) && (m.endCharacter = s),
          a.defined(l) && (m.kind = l),
          a.defined(f) && (m.collapsedText = f),
          m
        );
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          a.objectLiteral(n) &&
          a.uinteger(n.startLine) &&
          a.uinteger(n.startLine) &&
          (a.undefined(n.startCharacter) || a.uinteger(n.startCharacter)) &&
          (a.undefined(n.endCharacter) || a.uinteger(n.endCharacter)) &&
          (a.undefined(n.kind) || a.string(n.kind))
        );
      }
      e.is = i;
    })(Ve || (Ve = {}));
    var ce;
    (function (e) {
      function r(t, n) {
        return { location: t, message: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && ee.is(n.location) && a.string(n.message);
      }
      e.is = i;
    })(ce || (ce = {}));
    var O;
    (function (e) {
      (e.Error = 1), (e.Warning = 2), (e.Information = 3), (e.Hint = 4);
    })(O || (O = {}));
    var Be;
    (function (e) {
      (e.Unnecessary = 1), (e.Deprecated = 2);
    })(Be || (Be = {}));
    var He;
    (function (e) {
      function r(i) {
        let t = i;
        return a.objectLiteral(t) && a.string(t.href);
      }
      e.is = r;
    })(He || (He = {}));
    var ne;
    (function (e) {
      function r(t, n, o, s, l, f) {
        let m = { range: t, message: n };
        return (
          a.defined(o) && (m.severity = o),
          a.defined(s) && (m.code = s),
          a.defined(l) && (m.source = l),
          a.defined(f) && (m.relatedInformation = f),
          m
        );
      }
      e.create = r;
      function i(t) {
        var n;
        let o = t;
        return (
          a.defined(o) &&
          h.is(o.range) &&
          a.string(o.message) &&
          (a.number(o.severity) || a.undefined(o.severity)) &&
          (a.integer(o.code) || a.string(o.code) || a.undefined(o.code)) &&
          (a.undefined(o.codeDescription) || a.string((n = o.codeDescription) === null || n === void 0 ? void 0 : n.href)) &&
          (a.string(o.source) || a.undefined(o.source)) &&
          (a.undefined(o.relatedInformation) || a.typedArray(o.relatedInformation, ce.is))
        );
      }
      e.is = i;
    })(ne || (ne = {}));
    var S;
    (function (e) {
      function r(t, n, ...o) {
        let s = { title: t, command: n };
        return a.defined(o) && o.length > 0 && (s.arguments = o), s;
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && a.string(n.title) && a.string(n.command);
      }
      e.is = i;
    })(S || (S = {}));
    var N;
    (function (e) {
      function r(o, s) {
        return { range: o, newText: s };
      }
      e.replace = r;
      function i(o, s) {
        return { range: { start: o, end: o }, newText: s };
      }
      e.insert = i;
      function t(o) {
        return { range: o, newText: '' };
      }
      e.del = t;
      function n(o) {
        let s = o;
        return a.objectLiteral(s) && a.string(s.newText) && h.is(s.range);
      }
      e.is = n;
    })(N || (N = {}));
    var fe;
    (function (e) {
      function r(t, n, o) {
        let s = { label: t };
        return n !== void 0 && (s.needsConfirmation = n), o !== void 0 && (s.description = o), s;
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          a.objectLiteral(n) &&
          a.string(n.label) &&
          (a.boolean(n.needsConfirmation) || n.needsConfirmation === void 0) &&
          (a.string(n.description) || n.description === void 0)
        );
      }
      e.is = i;
    })(fe || (fe = {}));
    var D;
    (function (e) {
      function r(i) {
        let t = i;
        return a.string(t);
      }
      e.is = r;
    })(D || (D = {}));
    var Je;
    (function (e) {
      function r(o, s, l) {
        return { range: o, newText: s, annotationId: l };
      }
      e.replace = r;
      function i(o, s, l) {
        return { range: { start: o, end: o }, newText: s, annotationId: l };
      }
      e.insert = i;
      function t(o, s) {
        return { range: o, newText: '', annotationId: s };
      }
      e.del = t;
      function n(o) {
        let s = o;
        return N.is(s) && (fe.is(s.annotationId) || D.is(s.annotationId));
      }
      e.is = n;
    })(Je || (Je = {}));
    var de;
    (function (e) {
      function r(t, n) {
        return { textDocument: t, edits: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && ke.is(n.textDocument) && Array.isArray(n.edits);
      }
      e.is = i;
    })(de || (de = {}));
    var ge;
    (function (e) {
      function r(t, n, o) {
        let s = { kind: 'create', uri: t };
        return n !== void 0 && (n.overwrite !== void 0 || n.ignoreIfExists !== void 0) && (s.options = n), o !== void 0 && (s.annotationId = o), s;
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          n &&
          n.kind === 'create' &&
          a.string(n.uri) &&
          (n.options === void 0 ||
            ((n.options.overwrite === void 0 || a.boolean(n.options.overwrite)) &&
              (n.options.ignoreIfExists === void 0 || a.boolean(n.options.ignoreIfExists)))) &&
          (n.annotationId === void 0 || D.is(n.annotationId))
        );
      }
      e.is = i;
    })(ge || (ge = {}));
    var pe;
    (function (e) {
      function r(t, n, o, s) {
        let l = { kind: 'rename', oldUri: t, newUri: n };
        return o !== void 0 && (o.overwrite !== void 0 || o.ignoreIfExists !== void 0) && (l.options = o), s !== void 0 && (l.annotationId = s), l;
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          n &&
          n.kind === 'rename' &&
          a.string(n.oldUri) &&
          a.string(n.newUri) &&
          (n.options === void 0 ||
            ((n.options.overwrite === void 0 || a.boolean(n.options.overwrite)) &&
              (n.options.ignoreIfExists === void 0 || a.boolean(n.options.ignoreIfExists)))) &&
          (n.annotationId === void 0 || D.is(n.annotationId))
        );
      }
      e.is = i;
    })(pe || (pe = {}));
    var me;
    (function (e) {
      function r(t, n, o) {
        let s = { kind: 'delete', uri: t };
        return n !== void 0 && (n.recursive !== void 0 || n.ignoreIfNotExists !== void 0) && (s.options = n), o !== void 0 && (s.annotationId = o), s;
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          n &&
          n.kind === 'delete' &&
          a.string(n.uri) &&
          (n.options === void 0 ||
            ((n.options.recursive === void 0 || a.boolean(n.options.recursive)) &&
              (n.options.ignoreIfNotExists === void 0 || a.boolean(n.options.ignoreIfNotExists)))) &&
          (n.annotationId === void 0 || D.is(n.annotationId))
        );
      }
      e.is = i;
    })(me || (me = {}));
    var he;
    (function (e) {
      function r(i) {
        let t = i;
        return (
          t &&
          (t.changes !== void 0 || t.documentChanges !== void 0) &&
          (t.documentChanges === void 0 || t.documentChanges.every((n) => (a.string(n.kind) ? ge.is(n) || pe.is(n) || me.is(n) : de.is(n))))
        );
      }
      e.is = r;
    })(he || (he = {}));
    var ze;
    (function (e) {
      function r(t) {
        return { uri: t };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && a.string(n.uri);
      }
      e.is = i;
    })(ze || (ze = {}));
    var $e;
    (function (e) {
      function r(t, n) {
        return { uri: t, version: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && a.string(n.uri) && a.integer(n.version);
      }
      e.is = i;
    })($e || ($e = {}));
    var ke;
    (function (e) {
      function r(t, n) {
        return { uri: t, version: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && a.string(n.uri) && (n.version === null || a.integer(n.version));
      }
      e.is = i;
    })(ke || (ke = {}));
    var Ke;
    (function (e) {
      function r(t, n, o, s) {
        return { uri: t, languageId: n, version: o, text: s };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && a.string(n.uri) && a.string(n.languageId) && a.integer(n.version) && a.string(n.text);
      }
      e.is = i;
    })(Ke || (Ke = {}));
    var be;
    (function (e) {
      (e.PlainText = 'plaintext'), (e.Markdown = 'markdown');
      function r(i) {
        let t = i;
        return t === e.PlainText || t === e.Markdown;
      }
      e.is = r;
    })(be || (be = {}));
    var V;
    (function (e) {
      function r(i) {
        let t = i;
        return a.objectLiteral(i) && be.is(t.kind) && a.string(t.value);
      }
      e.is = r;
    })(V || (V = {}));
    var k;
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
    })(k || (k = {}));
    var te;
    (function (e) {
      (e.PlainText = 1), (e.Snippet = 2);
    })(te || (te = {}));
    var Xe;
    (function (e) {
      e.Deprecated = 1;
    })(Xe || (Xe = {}));
    var qe;
    (function (e) {
      function r(t, n, o) {
        return { newText: t, insert: n, replace: o };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return n && a.string(n.newText) && h.is(n.insert) && h.is(n.replace);
      }
      e.is = i;
    })(qe || (qe = {}));
    var Qe;
    (function (e) {
      (e.asIs = 1), (e.adjustIndentation = 2);
    })(Qe || (Qe = {}));
    var Ye;
    (function (e) {
      function r(i) {
        let t = i;
        return t && (a.string(t.detail) || t.detail === void 0) && (a.string(t.description) || t.description === void 0);
      }
      e.is = r;
    })(Ye || (Ye = {}));
    var Ge;
    (function (e) {
      function r(i) {
        return { label: i };
      }
      e.create = r;
    })(Ge || (Ge = {}));
    var Ze;
    (function (e) {
      function r(i, t) {
        return { items: i || [], isIncomplete: !!t };
      }
      e.create = r;
    })(Ze || (Ze = {}));
    var re;
    (function (e) {
      function r(t) {
        return t.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
      }
      e.fromPlainText = r;
      function i(t) {
        let n = t;
        return a.string(n) || (a.objectLiteral(n) && a.string(n.language) && a.string(n.value));
      }
      e.is = i;
    })(re || (re = {}));
    var Ce;
    (function (e) {
      function r(i) {
        let t = i;
        return (
          !!t &&
          a.objectLiteral(t) &&
          (V.is(t.contents) || re.is(t.contents) || a.typedArray(t.contents, re.is)) &&
          (i.range === void 0 || h.is(i.range))
        );
      }
      e.is = r;
    })(Ce || (Ce = {}));
    var en;
    (function (e) {
      function r(i, t) {
        return t ? { label: i, documentation: t } : { label: i };
      }
      e.create = r;
    })(en || (en = {}));
    var nn;
    (function (e) {
      function r(i, t, ...n) {
        let o = { label: i };
        return a.defined(t) && (o.documentation = t), a.defined(n) ? (o.parameters = n) : (o.parameters = []), o;
      }
      e.create = r;
    })(nn || (nn = {}));
    var F;
    (function (e) {
      (e.Text = 1), (e.Read = 2), (e.Write = 3);
    })(F || (F = {}));
    var tn;
    (function (e) {
      function r(i, t) {
        let n = { range: i };
        return a.number(t) && (n.kind = t), n;
      }
      e.create = r;
    })(tn || (tn = {}));
    var b;
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
    })(b || (b = {}));
    var rn;
    (function (e) {
      e.Deprecated = 1;
    })(rn || (rn = {}));
    var on;
    (function (e) {
      function r(i, t, n, o, s) {
        let l = { name: i, kind: t, location: { uri: o, range: n } };
        return s && (l.containerName = s), l;
      }
      e.create = r;
    })(on || (on = {}));
    var sn;
    (function (e) {
      function r(i, t, n, o) {
        return o !== void 0 ? { name: i, kind: t, location: { uri: n, range: o } } : { name: i, kind: t, location: { uri: n } };
      }
      e.create = r;
    })(sn || (sn = {}));
    var an;
    (function (e) {
      function r(t, n, o, s, l, f) {
        let m = { name: t, detail: n, kind: o, range: s, selectionRange: l };
        return f !== void 0 && (m.children = f), m;
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          n &&
          a.string(n.name) &&
          a.number(n.kind) &&
          h.is(n.range) &&
          h.is(n.selectionRange) &&
          (n.detail === void 0 || a.string(n.detail)) &&
          (n.deprecated === void 0 || a.boolean(n.deprecated)) &&
          (n.children === void 0 || Array.isArray(n.children)) &&
          (n.tags === void 0 || Array.isArray(n.tags))
        );
      }
      e.is = i;
    })(an || (an = {}));
    var ln;
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
    })(ln || (ln = {}));
    var ie;
    (function (e) {
      (e.Invoked = 1), (e.Automatic = 2);
    })(ie || (ie = {}));
    var un;
    (function (e) {
      function r(t, n, o) {
        let s = { diagnostics: t };
        return n != null && (s.only = n), o != null && (s.triggerKind = o), s;
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          a.defined(n) &&
          a.typedArray(n.diagnostics, ne.is) &&
          (n.only === void 0 || a.typedArray(n.only, a.string)) &&
          (n.triggerKind === void 0 || n.triggerKind === ie.Invoked || n.triggerKind === ie.Automatic)
        );
      }
      e.is = i;
    })(un || (un = {}));
    var cn;
    (function (e) {
      function r(t, n, o) {
        let s = { title: t },
          l = !0;
        return typeof n == 'string' ? ((l = !1), (s.kind = n)) : S.is(n) ? (s.command = n) : (s.edit = n), l && o !== void 0 && (s.kind = o), s;
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          n &&
          a.string(n.title) &&
          (n.diagnostics === void 0 || a.typedArray(n.diagnostics, ne.is)) &&
          (n.kind === void 0 || a.string(n.kind)) &&
          (n.edit !== void 0 || n.command !== void 0) &&
          (n.command === void 0 || S.is(n.command)) &&
          (n.isPreferred === void 0 || a.boolean(n.isPreferred)) &&
          (n.edit === void 0 || he.is(n.edit))
        );
      }
      e.is = i;
    })(cn || (cn = {}));
    var fn;
    (function (e) {
      function r(t, n) {
        let o = { range: t };
        return a.defined(n) && (o.data = n), o;
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && h.is(n.range) && (a.undefined(n.command) || S.is(n.command));
      }
      e.is = i;
    })(fn || (fn = {}));
    var dn;
    (function (e) {
      function r(t, n) {
        return { tabSize: t, insertSpaces: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && a.uinteger(n.tabSize) && a.boolean(n.insertSpaces);
      }
      e.is = i;
    })(dn || (dn = {}));
    var gn;
    (function (e) {
      function r(t, n, o) {
        return { range: t, target: n, data: o };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && h.is(n.range) && (a.undefined(n.target) || a.string(n.target));
      }
      e.is = i;
    })(gn || (gn = {}));
    var pn;
    (function (e) {
      function r(t, n) {
        return { range: t, parent: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.objectLiteral(n) && h.is(n.range) && (n.parent === void 0 || e.is(n.parent));
      }
      e.is = i;
    })(pn || (pn = {}));
    var mn;
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
    })(mn || (mn = {}));
    var hn;
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
    })(hn || (hn = {}));
    var kn;
    (function (e) {
      function r(i) {
        let t = i;
        return (
          a.objectLiteral(t) &&
          (t.resultId === void 0 || typeof t.resultId == 'string') &&
          Array.isArray(t.data) &&
          (t.data.length === 0 || typeof t.data[0] == 'number')
        );
      }
      e.is = r;
    })(kn || (kn = {}));
    var bn;
    (function (e) {
      function r(t, n) {
        return { range: t, text: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return n != null && h.is(n.range) && a.string(n.text);
      }
      e.is = i;
    })(bn || (bn = {}));
    var yn;
    (function (e) {
      function r(t, n, o) {
        return { range: t, variableName: n, caseSensitiveLookup: o };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return n != null && h.is(n.range) && a.boolean(n.caseSensitiveLookup) && (a.string(n.variableName) || n.variableName === void 0);
      }
      e.is = i;
    })(yn || (yn = {}));
    var Tn;
    (function (e) {
      function r(t, n) {
        return { range: t, expression: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return n != null && h.is(n.range) && (a.string(n.expression) || n.expression === void 0);
      }
      e.is = i;
    })(Tn || (Tn = {}));
    var vn;
    (function (e) {
      function r(t, n) {
        return { frameId: t, stoppedLocation: n };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return a.defined(n) && h.is(t.stoppedLocation);
      }
      e.is = i;
    })(vn || (vn = {}));
    var ye;
    (function (e) {
      (e.Type = 1), (e.Parameter = 2);
      function r(i) {
        return i === 1 || i === 2;
      }
      e.is = r;
    })(ye || (ye = {}));
    var Te;
    (function (e) {
      function r(t) {
        return { value: t };
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          a.objectLiteral(n) &&
          (n.tooltip === void 0 || a.string(n.tooltip) || V.is(n.tooltip)) &&
          (n.location === void 0 || ee.is(n.location)) &&
          (n.command === void 0 || S.is(n.command))
        );
      }
      e.is = i;
    })(Te || (Te = {}));
    var xn;
    (function (e) {
      function r(t, n, o) {
        let s = { position: t, label: n };
        return o !== void 0 && (s.kind = o), s;
      }
      e.create = r;
      function i(t) {
        let n = t;
        return (
          (a.objectLiteral(n) &&
            E.is(n.position) &&
            (a.string(n.label) || a.typedArray(n.label, Te.is)) &&
            (n.kind === void 0 || ye.is(n.kind)) &&
            n.textEdits === void 0) ||
          (a.typedArray(n.textEdits, N.is) &&
            (n.tooltip === void 0 || a.string(n.tooltip) || V.is(n.tooltip)) &&
            (n.paddingLeft === void 0 || a.boolean(n.paddingLeft)) &&
            (n.paddingRight === void 0 || a.boolean(n.paddingRight)))
        );
      }
      e.is = i;
    })(xn || (xn = {}));
    var In;
    (function (e) {
      function r(i) {
        return { kind: 'snippet', value: i };
      }
      e.createSnippet = r;
    })(In || (In = {}));
    var wn;
    (function (e) {
      function r(i, t, n, o) {
        return { insertText: i, filterText: t, range: n, command: o };
      }
      e.create = r;
    })(wn || (wn = {}));
    var _n;
    (function (e) {
      function r(i) {
        return { items: i };
      }
      e.create = r;
    })(_n || (_n = {}));
    var En;
    (function (e) {
      (e.Invoked = 0), (e.Automatic = 1);
    })(En || (En = {}));
    var Ln;
    (function (e) {
      function r(i, t) {
        return { range: i, text: t };
      }
      e.create = r;
    })(Ln || (Ln = {}));
    var An;
    (function (e) {
      function r(i, t) {
        return { triggerKind: i, selectedCompletionInfo: t };
      }
      e.create = r;
    })(An || (An = {}));
    var On;
    (function (e) {
      function r(i) {
        let t = i;
        return a.objectLiteral(t) && le.is(t.uri) && a.string(t.name);
      }
      e.is = r;
    })(On || (On = {}));
    var Pn;
    (function (e) {
      function r(o, s, l, f) {
        return new ve(o, s, l, f);
      }
      e.create = r;
      function i(o) {
        let s = o;
        return !!(
          a.defined(s) &&
          a.string(s.uri) &&
          (a.undefined(s.languageId) || a.string(s.languageId)) &&
          a.uinteger(s.lineCount) &&
          a.func(s.getText) &&
          a.func(s.positionAt) &&
          a.func(s.offsetAt)
        );
      }
      e.is = i;
      function t(o, s) {
        let l = o.getText(),
          f = n(s, (g, c) => {
            let y = g.range.start.line - c.range.start.line;
            return y === 0 ? g.range.start.character - c.range.start.character : y;
          }),
          m = l.length;
        for (let g = f.length - 1; g >= 0; g--) {
          let c = f[g],
            y = o.offsetAt(c.range.start),
            p = o.offsetAt(c.range.end);
          if (p <= m) l = l.substring(0, y) + c.newText + l.substring(p, l.length);
          else throw new Error('Overlapping edit');
          m = y;
        }
        return l;
      }
      e.applyEdits = t;
      function n(o, s) {
        if (o.length <= 1) return o;
        let l = (o.length / 2) | 0,
          f = o.slice(0, l),
          m = o.slice(l);
        n(f, s), n(m, s);
        let g = 0,
          c = 0,
          y = 0;
        for (; g < f.length && c < m.length; ) s(f[g], m[c]) <= 0 ? (o[y++] = f[g++]) : (o[y++] = m[c++]);
        for (; g < f.length; ) o[y++] = f[g++];
        for (; c < m.length; ) o[y++] = m[c++];
        return o;
      }
    })(Pn || (Pn = {}));
    var ve = class {
        constructor(r, i, t, n) {
          (this._uri = r), (this._languageId = i), (this._version = t), (this._content = n), (this._lineOffsets = void 0);
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
        getText(r) {
          if (r) {
            let i = this.offsetAt(r.start),
              t = this.offsetAt(r.end);
            return this._content.substring(i, t);
          }
          return this._content;
        }
        update(r, i) {
          (this._content = r.text), (this._version = i), (this._lineOffsets = void 0);
        }
        getLineOffsets() {
          if (this._lineOffsets === void 0) {
            let r = [],
              i = this._content,
              t = !0;
            for (let n = 0; n < i.length; n++) {
              t && (r.push(n), (t = !1));
              let o = i.charAt(n);
              (t =
                o === '\r' ||
                o ===
                  `
`),
                o === '\r' &&
                  n + 1 < i.length &&
                  i.charAt(n + 1) ===
                    `
` &&
                  n++;
            }
            t && i.length > 0 && r.push(i.length), (this._lineOffsets = r);
          }
          return this._lineOffsets;
        }
        positionAt(r) {
          r = Math.max(Math.min(r, this._content.length), 0);
          let i = this.getLineOffsets(),
            t = 0,
            n = i.length;
          if (n === 0) return E.create(0, r);
          for (; t < n; ) {
            let s = Math.floor((t + n) / 2);
            i[s] > r ? (n = s) : (t = s + 1);
          }
          let o = t - 1;
          return E.create(o, r - i[o]);
        }
        offsetAt(r) {
          let i = this.getLineOffsets();
          if (r.line >= i.length) return this._content.length;
          if (r.line < 0) return 0;
          let t = i[r.line],
            n = r.line + 1 < i.length ? i[r.line + 1] : this._content.length;
          return Math.max(Math.min(t + r.character, n), t);
        }
        get lineCount() {
          return this.getLineOffsets().length;
        }
      },
      a;
    (function (e) {
      let r = Object.prototype.toString;
      function i(p) {
        return typeof p < 'u';
      }
      e.defined = i;
      function t(p) {
        return typeof p > 'u';
      }
      e.undefined = t;
      function n(p) {
        return p === !0 || p === !1;
      }
      e.boolean = n;
      function o(p) {
        return r.call(p) === '[object String]';
      }
      e.string = o;
      function s(p) {
        return r.call(p) === '[object Number]';
      }
      e.number = s;
      function l(p, A, ae) {
        return r.call(p) === '[object Number]' && A <= p && p <= ae;
      }
      e.numberRange = l;
      function f(p) {
        return r.call(p) === '[object Number]' && -2147483648 <= p && p <= 2147483647;
      }
      e.integer = f;
      function m(p) {
        return r.call(p) === '[object Number]' && 0 <= p && p <= 2147483647;
      }
      e.uinteger = m;
      function g(p) {
        return r.call(p) === '[object Function]';
      }
      e.func = g;
      function c(p) {
        return p !== null && typeof p == 'object';
      }
      e.objectLiteral = c;
      function y(p, A) {
        return Array.isArray(p) && p.every(A);
      }
      e.typedArray = y;
    })(a || (a = {}));
    var B = class {
      constructor(r, i, t) {
        this._languageId = r;
        this._worker = i;
        this._disposables = [];
        this._listener = Object.create(null);
        let n = (s) => {
            let l = s.getLanguageId();
            if (l !== this._languageId) return;
            let f;
            (this._listener[s.uri.toString()] = s.onDidChangeContent(() => {
              window.clearTimeout(f), (f = window.setTimeout(() => this._doValidate(s.uri, l), 500));
            })),
              this._doValidate(s.uri, l);
          },
          o = (s) => {
            u.editor.setModelMarkers(s, this._languageId, []);
            let l = s.uri.toString(),
              f = this._listener[l];
            f && (f.dispose(), delete this._listener[l]);
          };
        this._disposables.push(u.editor.onDidCreateModel(n)),
          this._disposables.push(u.editor.onWillDisposeModel(o)),
          this._disposables.push(
            u.editor.onDidChangeModelLanguage((s) => {
              o(s.model), n(s.model);
            }),
          ),
          this._disposables.push(
            t((s) => {
              u.editor.getModels().forEach((l) => {
                l.getLanguageId() === this._languageId && (o(l), n(l));
              });
            }),
          ),
          this._disposables.push({
            dispose: () => {
              u.editor.getModels().forEach(o);
              for (let s in this._listener) this._listener[s].dispose();
            },
          }),
          u.editor.getModels().forEach(n);
      }
      dispose() {
        this._disposables.forEach((r) => r && r.dispose()), (this._disposables.length = 0);
      }
      _doValidate(r, i) {
        this._worker(r)
          .then((t) => t.doValidation(r.toString()))
          .then((t) => {
            let n = t.map((s) => lt(r, s)),
              o = u.editor.getModel(r);
            o && o.getLanguageId() === i && u.editor.setModelMarkers(o, i, n);
          })
          .then(void 0, (t) => {
            console.error(t);
          });
      }
    };
    function at(e) {
      switch (e) {
        case O.Error:
          return u.MarkerSeverity.Error;
        case O.Warning:
          return u.MarkerSeverity.Warning;
        case O.Information:
          return u.MarkerSeverity.Info;
        case O.Hint:
          return u.MarkerSeverity.Hint;
        default:
          return u.MarkerSeverity.Info;
      }
    }
    function lt(e, r) {
      let i = typeof r.code == 'number' ? String(r.code) : r.code;
      return {
        severity: at(r.severity),
        startLineNumber: r.range.start.line + 1,
        startColumn: r.range.start.character + 1,
        endLineNumber: r.range.end.line + 1,
        endColumn: r.range.end.character + 1,
        message: r.message,
        code: i,
        source: r.source,
      };
    }
    var H = class {
      constructor(r, i) {
        this._worker = r;
        this._triggerCharacters = i;
      }
      get triggerCharacters() {
        return this._triggerCharacters;
      }
      provideCompletionItems(r, i, t, n) {
        let o = r.uri;
        return this._worker(o)
          .then((s) => s.doComplete(o.toString(), L(i)))
          .then((s) => {
            if (!s) return;
            let l = r.getWordUntilPosition(i),
              f = new u.Range(i.lineNumber, l.startColumn, i.lineNumber, l.endColumn),
              m = s.items.map((g) => {
                let c = {
                  label: g.label,
                  insertText: g.insertText || g.label,
                  sortText: g.sortText,
                  filterText: g.filterText,
                  documentation: g.documentation,
                  detail: g.detail,
                  command: ft(g.command),
                  range: f,
                  kind: ct(g.kind),
                };
                return (
                  g.textEdit &&
                    (ut(g.textEdit) ? (c.range = { insert: v(g.textEdit.insert), replace: v(g.textEdit.replace) }) : (c.range = v(g.textEdit.range)),
                    (c.insertText = g.textEdit.newText)),
                  g.additionalTextEdits && (c.additionalTextEdits = g.additionalTextEdits.map(M)),
                  g.insertTextFormat === te.Snippet && (c.insertTextRules = u.languages.CompletionItemInsertTextRule.InsertAsSnippet),
                  c
                );
              });
            return { isIncomplete: s.isIncomplete, suggestions: m };
          });
      }
    };
    function L(e) {
      if (e) return { character: e.column - 1, line: e.lineNumber - 1 };
    }
    function Le(e) {
      if (e)
        return {
          start: { line: e.startLineNumber - 1, character: e.startColumn - 1 },
          end: { line: e.endLineNumber - 1, character: e.endColumn - 1 },
        };
    }
    function v(e) {
      if (e) return new u.Range(e.start.line + 1, e.start.character + 1, e.end.line + 1, e.end.character + 1);
    }
    function ut(e) {
      return typeof e.insert < 'u' && typeof e.replace < 'u';
    }
    function ct(e) {
      let r = u.languages.CompletionItemKind;
      switch (e) {
        case k.Text:
          return r.Text;
        case k.Method:
          return r.Method;
        case k.Function:
          return r.Function;
        case k.Constructor:
          return r.Constructor;
        case k.Field:
          return r.Field;
        case k.Variable:
          return r.Variable;
        case k.Class:
          return r.Class;
        case k.Interface:
          return r.Interface;
        case k.Module:
          return r.Module;
        case k.Property:
          return r.Property;
        case k.Unit:
          return r.Unit;
        case k.Value:
          return r.Value;
        case k.Enum:
          return r.Enum;
        case k.Keyword:
          return r.Keyword;
        case k.Snippet:
          return r.Snippet;
        case k.Color:
          return r.Color;
        case k.File:
          return r.File;
        case k.Reference:
          return r.Reference;
      }
      return r.Property;
    }
    function M(e) {
      if (e) return { range: v(e.range), text: e.newText };
    }
    function ft(e) {
      return e && e.command === 'editor.action.triggerSuggest' ? { id: e.command, title: e.title, arguments: e.arguments } : void 0;
    }
    var J = class {
      constructor(r) {
        this._worker = r;
      }
      provideHover(r, i, t) {
        let n = r.uri;
        return this._worker(n)
          .then((o) => o.doHover(n.toString(), L(i)))
          .then((o) => {
            if (o) return { range: v(o.range), contents: gt(o.contents) };
          });
      }
    };
    function dt(e) {
      return e && typeof e == 'object' && typeof e.kind == 'string';
    }
    function Rn(e) {
      return typeof e == 'string'
        ? { value: e }
        : dt(e)
        ? e.kind === 'plaintext'
          ? { value: e.value.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&') }
          : { value: e.value }
        : {
            value:
              '```' +
              e.language +
              `
` +
              e.value +
              '\n```\n',
          };
    }
    function gt(e) {
      if (e) return Array.isArray(e) ? e.map(Rn) : [Rn(e)];
    }
    var xe = class {
      constructor(r) {
        this._worker = r;
      }
      provideDocumentHighlights(r, i, t) {
        let n = r.uri;
        return this._worker(n)
          .then((o) => o.findDocumentHighlights(n.toString(), L(i)))
          .then((o) => {
            if (o) return o.map((s) => ({ range: v(s.range), kind: pt(s.kind) }));
          });
      }
    };
    function pt(e) {
      switch (e) {
        case F.Read:
          return u.languages.DocumentHighlightKind.Read;
        case F.Write:
          return u.languages.DocumentHighlightKind.Write;
        case F.Text:
          return u.languages.DocumentHighlightKind.Text;
      }
      return u.languages.DocumentHighlightKind.Text;
    }
    var Ie = class {
      constructor(r) {
        this._worker = r;
      }
      provideDefinition(r, i, t) {
        let n = r.uri;
        return this._worker(n)
          .then((o) => o.findDefinition(n.toString(), L(i)))
          .then((o) => {
            if (o) return [Wn(o)];
          });
      }
    };
    function Wn(e) {
      return { uri: u.Uri.parse(e.uri), range: v(e.range) };
    }
    var we = class {
        constructor(r) {
          this._worker = r;
        }
        provideReferences(r, i, t, n) {
          let o = r.uri;
          return this._worker(o)
            .then((s) => s.findReferences(o.toString(), L(i)))
            .then((s) => {
              if (s) return s.map(Wn);
            });
        }
      },
      _e = class {
        constructor(r) {
          this._worker = r;
        }
        provideRenameEdits(r, i, t, n) {
          let o = r.uri;
          return this._worker(o)
            .then((s) => s.doRename(o.toString(), L(i), t))
            .then((s) => mt(s));
        }
      };
    function mt(e) {
      if (!e || !e.changes) return;
      let r = [];
      for (let i in e.changes) {
        let t = u.Uri.parse(i);
        for (let n of e.changes[i]) r.push({ resource: t, versionId: void 0, textEdit: { range: v(n.range), text: n.newText } });
      }
      return { edits: r };
    }
    var z = class {
      constructor(r) {
        this._worker = r;
      }
      provideDocumentSymbols(r, i) {
        let t = r.uri;
        return this._worker(t)
          .then((n) => n.findDocumentSymbols(t.toString()))
          .then((n) => {
            if (n)
              return n.map((o) =>
                ht(o)
                  ? Sn(o)
                  : {
                      name: o.name,
                      detail: '',
                      containerName: o.containerName,
                      kind: Nn(o.kind),
                      range: v(o.location.range),
                      selectionRange: v(o.location.range),
                      tags: [],
                    },
              );
          });
      }
    };
    function ht(e) {
      return 'children' in e;
    }
    function Sn(e) {
      return {
        name: e.name,
        detail: e.detail ?? '',
        kind: Nn(e.kind),
        range: v(e.range),
        selectionRange: v(e.selectionRange),
        tags: e.tags ?? [],
        children: (e.children ?? []).map((r) => Sn(r)),
      };
    }
    function Nn(e) {
      let r = u.languages.SymbolKind;
      switch (e) {
        case b.File:
          return r.File;
        case b.Module:
          return r.Module;
        case b.Namespace:
          return r.Namespace;
        case b.Package:
          return r.Package;
        case b.Class:
          return r.Class;
        case b.Method:
          return r.Method;
        case b.Property:
          return r.Property;
        case b.Field:
          return r.Field;
        case b.Constructor:
          return r.Constructor;
        case b.Enum:
          return r.Enum;
        case b.Interface:
          return r.Interface;
        case b.Function:
          return r.Function;
        case b.Variable:
          return r.Variable;
        case b.Constant:
          return r.Constant;
        case b.String:
          return r.String;
        case b.Number:
          return r.Number;
        case b.Boolean:
          return r.Boolean;
        case b.Array:
          return r.Array;
      }
      return r.Function;
    }
    var Ee = class {
        constructor(r) {
          this._worker = r;
        }
        provideLinks(r, i) {
          let t = r.uri;
          return this._worker(t)
            .then((n) => n.findDocumentLinks(t.toString()))
            .then((n) => {
              if (n) return { links: n.map((o) => ({ range: v(o.range), url: o.target })) };
            });
        }
      },
      $ = class {
        constructor(r) {
          this._worker = r;
        }
        provideDocumentFormattingEdits(r, i, t) {
          let n = r.uri;
          return this._worker(n).then((o) =>
            o.format(n.toString(), null, Dn(i)).then((s) => {
              if (!(!s || s.length === 0)) return s.map(M);
            }),
          );
        }
      },
      K = class {
        constructor(r) {
          this._worker = r;
          this.canFormatMultipleRanges = !1;
        }
        provideDocumentRangeFormattingEdits(r, i, t, n) {
          let o = r.uri;
          return this._worker(o).then((s) =>
            s.format(o.toString(), Le(i), Dn(t)).then((l) => {
              if (!(!l || l.length === 0)) return l.map(M);
            }),
          );
        }
      };
    function Dn(e) {
      return { tabSize: e.tabSize, insertSpaces: e.insertSpaces };
    }
    var X = class {
        constructor(r) {
          this._worker = r;
        }
        provideDocumentColors(r, i) {
          let t = r.uri;
          return this._worker(t)
            .then((n) => n.findDocumentColors(t.toString()))
            .then((n) => {
              if (n) return n.map((o) => ({ color: o.color, range: v(o.range) }));
            });
        }
        provideColorPresentations(r, i, t) {
          let n = r.uri;
          return this._worker(n)
            .then((o) => o.getColorPresentations(n.toString(), i.color, Le(i.range)))
            .then((o) => {
              if (o)
                return o.map((s) => {
                  let l = { label: s.label };
                  return (
                    s.textEdit && (l.textEdit = M(s.textEdit)), s.additionalTextEdits && (l.additionalTextEdits = s.additionalTextEdits.map(M)), l
                  );
                });
            });
        }
      },
      q = class {
        constructor(r) {
          this._worker = r;
        }
        provideFoldingRanges(r, i, t) {
          let n = r.uri;
          return this._worker(n)
            .then((o) => o.getFoldingRanges(n.toString(), i))
            .then((o) => {
              if (o)
                return o.map((s) => {
                  let l = { start: s.startLine + 1, end: s.endLine + 1 };
                  return typeof s.kind < 'u' && (l.kind = kt(s.kind)), l;
                });
            });
        }
      };
    function kt(e) {
      switch (e) {
        case W.Comment:
          return u.languages.FoldingRangeKind.Comment;
        case W.Imports:
          return u.languages.FoldingRangeKind.Imports;
        case W.Region:
          return u.languages.FoldingRangeKind.Region;
      }
    }
    var Q = class {
      constructor(r) {
        this._worker = r;
      }
      provideSelectionRanges(r, i, t) {
        let n = r.uri;
        return this._worker(n)
          .then((o) => o.getSelectionRanges(n.toString(), i.map(L)))
          .then((o) => {
            if (o)
              return o.map((s) => {
                let l = [];
                for (; s; ) l.push({ range: v(s.range) }), (s = s.parent);
                return l;
              });
          });
      }
    };
    function oe(e, r = !1) {
      let i = e.length,
        t = 0,
        n = '',
        o = 0,
        s = 16,
        l = 0,
        f = 0,
        m = 0,
        g = 0,
        c = 0;
      function y(d, x) {
        let _ = 0,
          I = 0;
        for (; _ < d || !x; ) {
          let T = e.charCodeAt(t);
          if (T >= 48 && T <= 57) I = I * 16 + T - 48;
          else if (T >= 65 && T <= 70) I = I * 16 + T - 65 + 10;
          else if (T >= 97 && T <= 102) I = I * 16 + T - 97 + 10;
          else break;
          t++, _++;
        }
        return _ < d && (I = -1), I;
      }
      function p(d) {
        (t = d), (n = ''), (o = 0), (s = 16), (c = 0);
      }
      function A() {
        let d = t;
        if (e.charCodeAt(t) === 48) t++;
        else for (t++; t < e.length && j(e.charCodeAt(t)); ) t++;
        if (t < e.length && e.charCodeAt(t) === 46)
          if ((t++, t < e.length && j(e.charCodeAt(t)))) for (t++; t < e.length && j(e.charCodeAt(t)); ) t++;
          else return (c = 3), e.substring(d, t);
        let x = t;
        if (t < e.length && (e.charCodeAt(t) === 69 || e.charCodeAt(t) === 101))
          if ((t++, ((t < e.length && e.charCodeAt(t) === 43) || e.charCodeAt(t) === 45) && t++, t < e.length && j(e.charCodeAt(t)))) {
            for (t++; t < e.length && j(e.charCodeAt(t)); ) t++;
            x = t;
          } else c = 3;
        return e.substring(d, x);
      }
      function ae() {
        let d = '',
          x = t;
        for (;;) {
          if (t >= i) {
            (d += e.substring(x, t)), (c = 2);
            break;
          }
          let _ = e.charCodeAt(t);
          if (_ === 34) {
            (d += e.substring(x, t)), t++;
            break;
          }
          if (_ === 92) {
            if (((d += e.substring(x, t)), t++, t >= i)) {
              c = 2;
              break;
            }
            switch (e.charCodeAt(t++)) {
              case 34:
                d += '"';
                break;
              case 92:
                d += '\\';
                break;
              case 47:
                d += '/';
                break;
              case 98:
                d += '\b';
                break;
              case 102:
                d += '\f';
                break;
              case 110:
                d += `
`;
                break;
              case 114:
                d += '\r';
                break;
              case 116:
                d += '	';
                break;
              case 117:
                let T = y(4, !0);
                T >= 0 ? (d += String.fromCharCode(T)) : (c = 4);
                break;
              default:
                c = 5;
            }
            x = t;
            continue;
          }
          if (_ >= 0 && _ <= 31)
            if (Y(_)) {
              (d += e.substring(x, t)), (c = 2);
              break;
            } else c = 6;
          t++;
        }
        return d;
      }
      function Pe() {
        if (((n = ''), (c = 0), (o = t), (f = l), (g = m), t >= i)) return (o = i), (s = 17);
        let d = e.charCodeAt(t);
        if (Ae(d)) {
          do t++, (n += String.fromCharCode(d)), (d = e.charCodeAt(t));
          while (Ae(d));
          return (s = 15);
        }
        if (Y(d))
          return (
            t++,
            (n += String.fromCharCode(d)),
            d === 13 &&
              e.charCodeAt(t) === 10 &&
              (t++,
              (n += `
`)),
            l++,
            (m = t),
            (s = 14)
          );
        switch (d) {
          case 123:
            return t++, (s = 1);
          case 125:
            return t++, (s = 2);
          case 91:
            return t++, (s = 3);
          case 93:
            return t++, (s = 4);
          case 58:
            return t++, (s = 6);
          case 44:
            return t++, (s = 5);
          case 34:
            return t++, (n = ae()), (s = 10);
          case 47:
            let x = t - 1;
            if (e.charCodeAt(t + 1) === 47) {
              for (t += 2; t < i && !Y(e.charCodeAt(t)); ) t++;
              return (n = e.substring(x, t)), (s = 12);
            }
            if (e.charCodeAt(t + 1) === 42) {
              t += 2;
              let _ = i - 1,
                I = !1;
              for (; t < _; ) {
                let T = e.charCodeAt(t);
                if (T === 42 && e.charCodeAt(t + 1) === 47) {
                  (t += 2), (I = !0);
                  break;
                }
                t++, Y(T) && (T === 13 && e.charCodeAt(t) === 10 && t++, l++, (m = t));
              }
              return I || (t++, (c = 1)), (n = e.substring(x, t)), (s = 13);
            }
            return (n += String.fromCharCode(d)), t++, (s = 16);
          case 45:
            if (((n += String.fromCharCode(d)), t++, t === i || !j(e.charCodeAt(t)))) return (s = 16);
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
            return (n += A()), (s = 11);
          default:
            for (; t < i && Xn(d); ) t++, (d = e.charCodeAt(t));
            if (o !== t) {
              switch (((n = e.substring(o, t)), n)) {
                case 'true':
                  return (s = 8);
                case 'false':
                  return (s = 9);
                case 'null':
                  return (s = 7);
              }
              return (s = 16);
            }
            return (n += String.fromCharCode(d)), t++, (s = 16);
        }
      }
      function Xn(d) {
        if (Ae(d) || Y(d)) return !1;
        switch (d) {
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
      function qn() {
        let d;
        do d = Pe();
        while (d >= 12 && d <= 15);
        return d;
      }
      return {
        setPosition: p,
        getPosition: () => t,
        scan: r ? qn : Pe,
        getToken: () => s,
        getTokenValue: () => n,
        getTokenOffset: () => o,
        getTokenLength: () => t - o,
        getTokenStartLine: () => f,
        getTokenStartCharacter: () => o - g,
        getTokenError: () => c,
      };
    }
    function Ae(e) {
      return e === 32 || e === 9;
    }
    function Y(e) {
      return e === 10 || e === 13;
    }
    function j(e) {
      return e >= 48 && e <= 57;
    }
    var Fn;
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
    })(Fn || (Fn = {}));
    var Tt = new Array(20).fill(0).map((e, r) => ' '.repeat(r)),
      U = 200,
      vt = {
        ' ': {
          '\n': new Array(U).fill(0).map(
            (e, r) =>
              `
` + ' '.repeat(r),
          ),
          '\r': new Array(U).fill(0).map((e, r) => '\r' + ' '.repeat(r)),
          '\r\n': new Array(U).fill(0).map(
            (e, r) =>
              `\r
` + ' '.repeat(r),
          ),
        },
        '	': {
          '\n': new Array(U).fill(0).map(
            (e, r) =>
              `
` + '	'.repeat(r),
          ),
          '\r': new Array(U).fill(0).map((e, r) => '\r' + '	'.repeat(r)),
          '\r\n': new Array(U).fill(0).map(
            (e, r) =>
              `\r
` + '	'.repeat(r),
          ),
        },
      };
    var Mn;
    (function (e) {
      e.DEFAULT = { allowTrailingComma: !1 };
    })(Mn || (Mn = {}));
    var Bn = oe,
      jn;
    (function (e) {
      (e[(e.None = 0)] = 'None'),
        (e[(e.UnexpectedEndOfComment = 1)] = 'UnexpectedEndOfComment'),
        (e[(e.UnexpectedEndOfString = 2)] = 'UnexpectedEndOfString'),
        (e[(e.UnexpectedEndOfNumber = 3)] = 'UnexpectedEndOfNumber'),
        (e[(e.InvalidUnicode = 4)] = 'InvalidUnicode'),
        (e[(e.InvalidEscapeCharacter = 5)] = 'InvalidEscapeCharacter'),
        (e[(e.InvalidCharacter = 6)] = 'InvalidCharacter');
    })(jn || (jn = {}));
    var Un;
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
    })(Un || (Un = {}));
    var Vn;
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
    })(Vn || (Vn = {}));
    function zn(e) {
      return { getInitialState: () => new se(null, null, !1, null), tokenize: (r, i) => jt(e, r, i) };
    }
    var Hn = 'delimiter.bracket.json',
      Jn = 'delimiter.array.json',
      Ot = 'delimiter.colon.json',
      Pt = 'delimiter.comma.json',
      Rt = 'keyword.json',
      Wt = 'keyword.json',
      St = 'string.value.json',
      Nt = 'number.json',
      Dt = 'string.key.json',
      Ft = 'comment.block.json',
      Mt = 'comment.line.json';
    var P = class e {
        constructor(r, i) {
          this.parent = r;
          this.type = i;
        }
        static pop(r) {
          return r ? r.parent : null;
        }
        static push(r, i) {
          return new e(r, i);
        }
        static equals(r, i) {
          if (!r && !i) return !0;
          if (!r || !i) return !1;
          for (; r && i; ) {
            if (r === i) return !0;
            if (r.type !== i.type) return !1;
            (r = r.parent), (i = i.parent);
          }
          return !0;
        }
      },
      se = class e {
        constructor(r, i, t, n) {
          (this._state = r), (this.scanError = i), (this.lastWasColon = t), (this.parents = n);
        }
        clone() {
          return new e(this._state, this.scanError, this.lastWasColon, this.parents);
        }
        equals(r) {
          return r === this
            ? !0
            : !r || !(r instanceof e)
            ? !1
            : this.scanError === r.scanError && this.lastWasColon === r.lastWasColon && P.equals(this.parents, r.parents);
        }
        getStateData() {
          return this._state;
        }
        setStateData(r) {
          this._state = r;
        }
      };
    function jt(e, r, i, t = 0) {
      let n = 0,
        o = !1;
      switch (i.scanError) {
        case 2:
          (r = '"' + r), (n = 1);
          break;
        case 1:
          (r = '/*' + r), (n = 2);
          break;
      }
      let s = Bn(r),
        l = i.lastWasColon,
        f = i.parents,
        m = { tokens: [], endState: i.clone() };
      for (;;) {
        let g = t + s.getPosition(),
          c = '',
          y = s.scan();
        if (y === 17) break;
        if (g === t + s.getPosition()) throw new Error('Scanner did not advance, next 3 characters are: ' + r.substr(s.getPosition(), 3));
        switch ((o && (g -= n), (o = n > 0), y)) {
          case 1:
            (f = P.push(f, 0)), (c = Hn), (l = !1);
            break;
          case 2:
            (f = P.pop(f)), (c = Hn), (l = !1);
            break;
          case 3:
            (f = P.push(f, 1)), (c = Jn), (l = !1);
            break;
          case 4:
            (f = P.pop(f)), (c = Jn), (l = !1);
            break;
          case 6:
            (c = Ot), (l = !0);
            break;
          case 5:
            (c = Pt), (l = !1);
            break;
          case 8:
          case 9:
            (c = Rt), (l = !1);
            break;
          case 7:
            (c = Wt), (l = !1);
            break;
          case 10:
            let A = (f ? f.type : 0) === 1;
            (c = l || A ? St : Dt), (l = !1);
            break;
          case 11:
            (c = Nt), (l = !1);
            break;
        }
        if (e)
          switch (y) {
            case 12:
              c = Mt;
              break;
            case 13:
              c = Ft;
              break;
          }
        (m.endState = new se(i.getStateData(), s.getTokenError(), l, f)), m.tokens.push({ startIndex: g, scopes: c });
      }
      return m;
    }
    var w;
    function Ut() {
      return new Promise((e, r) => {
        if (!w) return r('JSON not registered!');
        e(w);
      });
    }
    var Oe = class extends B {
      constructor(r, i, t) {
        super(r, i, t.onDidChange),
          this._disposables.push(
            u.editor.onWillDisposeModel((n) => {
              this._resetSchema(n.uri);
            }),
          ),
          this._disposables.push(
            u.editor.onDidChangeModelLanguage((n) => {
              this._resetSchema(n.model.uri);
            }),
          );
      }
      _resetSchema(r) {
        this._worker().then((i) => {
          i.resetSchema(r.toString());
        });
      }
    };
    function Vt(e) {
      let r = [],
        i = [],
        t = new R(e);
      r.push(t), (w = (...s) => t.getLanguageServiceWorker(...s));
      function n() {
        let { languageId: s, modeConfiguration: l } = e;
        Kn(i),
          l.documentFormattingEdits && i.push(u.languages.registerDocumentFormattingEditProvider(s, new $(w))),
          l.documentRangeFormattingEdits && i.push(u.languages.registerDocumentRangeFormattingEditProvider(s, new K(w))),
          l.completionItems && i.push(u.languages.registerCompletionItemProvider(s, new H(w, [' ', ':', '"']))),
          l.hovers && i.push(u.languages.registerHoverProvider(s, new J(w))),
          l.documentSymbols && i.push(u.languages.registerDocumentSymbolProvider(s, new z(w))),
          l.tokens && i.push(u.languages.setTokensProvider(s, zn(!0))),
          l.colors && i.push(u.languages.registerColorProvider(s, new X(w))),
          l.foldingRanges && i.push(u.languages.registerFoldingRangeProvider(s, new q(w))),
          l.diagnostics && i.push(new Oe(s, w, e)),
          l.selectionRanges && i.push(u.languages.registerSelectionRangeProvider(s, new Q(w)));
      }
      n(), r.push(u.languages.setLanguageConfiguration(e.languageId, Bt));
      let o = e.modeConfiguration;
      return (
        e.onDidChange((s) => {
          s.modeConfiguration !== o && ((o = s.modeConfiguration), n());
        }),
        r.push($n(i)),
        $n(r)
      );
    }
    function $n(e) {
      return { dispose: () => Kn(e) };
    }
    function Kn(e) {
      for (; e.length; ) e.pop().dispose();
    }
    var Bt = {
      wordPattern: /(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,
      comments: { lineComment: '//', blockComment: ['/*', '*/'] },
      brackets: [
        ['{', '}'],
        ['[', ']'],
      ],
      autoClosingPairs: [
        { open: '{', close: '}', notIn: ['string'] },
        { open: '[', close: ']', notIn: ['string'] },
        { open: '"', close: '"', notIn: ['string'] },
      ],
    };
    return rt(Ht);
  })();
  return moduleExports;
});
