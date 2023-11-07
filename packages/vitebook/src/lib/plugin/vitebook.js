var _e = Object.defineProperty;
var we = (r, e, t) => e in r ? _e(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var Z = (r, e, t) => (we(r, typeof e != "symbol" ? e + "" : e, t), t);
import { normalizePath as Se } from "vite";
import ar from "path";
import { fileURLToPath as Pe, parse as Fe } from "url";
import dr from "fs";
const Wr = "%[a-f0-9]{2}", Nr = new RegExp("(" + Wr + ")|([^%]+?)", "gi"), Lr = new RegExp("(" + Wr + ")+", "gi");
function Fr(r, e) {
  try {
    return [decodeURIComponent(r.join(""))];
  } catch {
  }
  if (r.length === 1)
    return r;
  e = e || 1;
  const t = r.slice(0, e), n = r.slice(e);
  return Array.prototype.concat.call([], Fr(t), Fr(n));
}
function Be(r) {
  try {
    return decodeURIComponent(r);
  } catch {
    let e = r.match(Nr) || [];
    for (let t = 1; t < e.length; t++)
      r = Fr(e, t).join(""), e = r.match(Nr) || [];
    return r;
  }
}
function He(r) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = Lr.exec(r);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const o = Be(t[0]);
      o !== t[0] && (e[t[0]] = o);
    }
    t = Lr.exec(r);
  }
  e["%C2"] = "�";
  const n = Object.keys(e);
  for (const o of n)
    r = r.replace(new RegExp(o, "g"), e[o]);
  return r;
}
function Ce(r) {
  if (typeof r != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof r + "`");
  try {
    return decodeURIComponent(r);
  } catch {
    return He(r);
  }
}
function Jr(r, e) {
  if (!(typeof r == "string" && typeof e == "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (r === "" || e === "")
    return [];
  const t = r.indexOf(e);
  return t === -1 ? [] : [
    r.slice(0, t),
    r.slice(t + e.length)
  ];
}
function Te(r, e) {
  const t = {};
  if (Array.isArray(e))
    for (const n of e) {
      const o = Object.getOwnPropertyDescriptor(r, n);
      o != null && o.enumerable && Object.defineProperty(t, n, o);
    }
  else
    for (const n of Reflect.ownKeys(r)) {
      const o = Object.getOwnPropertyDescriptor(r, n);
      if (o.enumerable) {
        const p = r[n];
        e(n, p, r) && Object.defineProperty(t, n, o);
      }
    }
  return t;
}
const Oe = (r) => r == null, je = (r) => encodeURIComponent(r).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), Br = Symbol("encodeFragmentIdentifier");
function Re(r) {
  switch (r.arrayFormat) {
    case "index":
      return (e) => (t, n) => {
        const o = t.length;
        return n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
          ...t,
          [C(e, r), "[", o, "]"].join("")
        ] : [
          ...t,
          [C(e, r), "[", C(o, r), "]=", C(n, r)].join("")
        ];
      };
    case "bracket":
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        [C(e, r), "[]"].join("")
      ] : [
        ...t,
        [C(e, r), "[]=", C(n, r)].join("")
      ];
    case "colon-list-separator":
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        [C(e, r), ":list="].join("")
      ] : [
        ...t,
        [C(e, r), ":list=", C(n, r)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = r.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (n, o) => o === void 0 || r.skipNull && o === null || r.skipEmptyString && o === "" ? n : (o = o === null ? "" : o, n.length === 0 ? [[C(t, r), e, C(o, r)].join("")] : [[n, C(o, r)].join(r.arrayFormatSeparator)]);
    }
    default:
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        C(e, r)
      ] : [
        ...t,
        [C(e, r), "=", C(n, r)].join("")
      ];
  }
}
function Ae(r) {
  let e;
  switch (r.arrayFormat) {
    case "index":
      return (t, n, o) => {
        if (e = /\[(\d*)]$/.exec(t), t = t.replace(/\[\d*]$/, ""), !e) {
          o[t] = n;
          return;
        }
        o[t] === void 0 && (o[t] = {}), o[t][e[1]] = n;
      };
    case "bracket":
      return (t, n, o) => {
        if (e = /(\[])$/.exec(t), t = t.replace(/\[]$/, ""), !e) {
          o[t] = n;
          return;
        }
        if (o[t] === void 0) {
          o[t] = [n];
          return;
        }
        o[t] = [...o[t], n];
      };
    case "colon-list-separator":
      return (t, n, o) => {
        if (e = /(:list)$/.exec(t), t = t.replace(/:list$/, ""), !e) {
          o[t] = n;
          return;
        }
        if (o[t] === void 0) {
          o[t] = [n];
          return;
        }
        o[t] = [...o[t], n];
      };
    case "comma":
    case "separator":
      return (t, n, o) => {
        const p = typeof n == "string" && n.includes(r.arrayFormatSeparator), l = typeof n == "string" && !p && M(n, r).includes(r.arrayFormatSeparator);
        n = l ? M(n, r) : n;
        const d = p || l ? n.split(r.arrayFormatSeparator).map((H) => M(H, r)) : n === null ? n : M(n, r);
        o[t] = d;
      };
    case "bracket-separator":
      return (t, n, o) => {
        const p = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !p) {
          o[t] = n && M(n, r);
          return;
        }
        const l = n === null ? [] : n.split(r.arrayFormatSeparator).map((d) => M(d, r));
        if (o[t] === void 0) {
          o[t] = l;
          return;
        }
        o[t] = [...o[t], ...l];
      };
    default:
      return (t, n, o) => {
        if (o[t] === void 0) {
          o[t] = n;
          return;
        }
        o[t] = [...[o[t]].flat(), n];
      };
  }
}
function Qr(r) {
  if (typeof r != "string" || r.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function C(r, e) {
  return e.encode ? e.strict ? je(r) : encodeURIComponent(r) : r;
}
function M(r, e) {
  return e.decode ? Ce(r) : r;
}
function Yr(r) {
  return Array.isArray(r) ? r.sort() : typeof r == "object" ? Yr(Object.keys(r)).sort((e, t) => Number(e) - Number(t)).map((e) => r[e]) : r;
}
function Zr(r) {
  const e = r.indexOf("#");
  return e !== -1 && (r = r.slice(0, e)), r;
}
function Ie(r) {
  let e = "";
  const t = r.indexOf("#");
  return t !== -1 && (e = r.slice(t)), e;
}
function Kr(r, e) {
  return e.parseNumbers && !Number.isNaN(Number(r)) && typeof r == "string" && r.trim() !== "" ? r = Number(r) : e.parseBooleans && r !== null && (r.toLowerCase() === "true" || r.toLowerCase() === "false") && (r = r.toLowerCase() === "true"), r;
}
function Cr(r) {
  r = Zr(r);
  const e = r.indexOf("?");
  return e === -1 ? "" : r.slice(e + 1);
}
function Tr(r, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, Qr(e.arrayFormatSeparator);
  const t = Ae(e), n = /* @__PURE__ */ Object.create(null);
  if (typeof r != "string" || (r = r.trim().replace(/^[?#&]/, ""), !r))
    return n;
  for (const o of r.split("&")) {
    if (o === "")
      continue;
    const p = e.decode ? o.replace(/\+/g, " ") : o;
    let [l, d] = Jr(p, "=");
    l === void 0 && (l = p), d = d === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? d : M(d, e), t(M(l, e), d, n);
  }
  for (const [o, p] of Object.entries(n))
    if (typeof p == "object" && p !== null)
      for (const [l, d] of Object.entries(p))
        p[l] = Kr(d, e);
    else
      n[o] = Kr(p, e);
  return e.sort === !1 ? n : (e.sort === !0 ? Object.keys(n).sort() : Object.keys(n).sort(e.sort)).reduce((o, p) => {
    const l = n[p];
    return l && typeof l == "object" && !Array.isArray(l) ? o[p] = Yr(l) : o[p] = l, o;
  }, /* @__PURE__ */ Object.create(null));
}
function re(r, e) {
  if (!r)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, Qr(e.arrayFormatSeparator);
  const t = (l) => e.skipNull && Oe(r[l]) || e.skipEmptyString && r[l] === "", n = Re(e), o = {};
  for (const [l, d] of Object.entries(r))
    t(l) || (o[l] = d);
  const p = Object.keys(o);
  return e.sort !== !1 && p.sort(e.sort), p.map((l) => {
    const d = r[l];
    return d === void 0 ? "" : d === null ? C(l, e) : Array.isArray(d) ? d.length === 0 && e.arrayFormat === "bracket-separator" ? C(l, e) + "[]" : d.reduce(n(l), []).join("&") : C(l, e) + "=" + C(d, e);
  }).filter((l) => l.length > 0).join("&");
}
function ee(r, e) {
  var o;
  e = {
    decode: !0,
    ...e
  };
  let [t, n] = Jr(r, "#");
  return t === void 0 && (t = r), {
    url: ((o = t == null ? void 0 : t.split("?")) == null ? void 0 : o[0]) ?? "",
    query: Tr(Cr(r), e),
    ...e && e.parseFragmentIdentifier && n ? { fragmentIdentifier: M(n, e) } : {}
  };
}
function te(r, e) {
  e = {
    encode: !0,
    strict: !0,
    [Br]: !0,
    ...e
  };
  const t = Zr(r.url).split("?")[0] || "", n = Cr(r.url), o = {
    ...Tr(n, { sort: !1 }),
    ...r.query
  };
  let p = re(o, e);
  p && (p = `?${p}`);
  let l = Ie(r.url);
  if (r.fragmentIdentifier) {
    const d = new URL(t);
    d.hash = r.fragmentIdentifier, l = e[Br] ? d.hash : `#${r.fragmentIdentifier}`;
  }
  return `${t}${p}${l}`;
}
function ne(r, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [Br]: !1,
    ...t
  };
  const { url: n, query: o, fragmentIdentifier: p } = ee(r, t);
  return te({
    url: n,
    query: Te(o, e),
    fragmentIdentifier: p
  }, t);
}
function ke(r, e, t) {
  const n = Array.isArray(e) ? (o) => !e.includes(o) : (o, p) => !e(o, p);
  return ne(r, n, t);
}
const Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: ke,
  extract: Cr,
  parse: Tr,
  parseUrl: ee,
  pick: ne,
  stringify: re,
  stringifyUrl: te
}, Symbol.toStringTag, { value: "Module" }));
class mr {
  constructor(e) {
    Z(this, "storyId", "");
    Z(this, "storyFullPath", "");
    Z(this, "storyRelativePath", "");
    Z(this, "fullPath", "");
    Z(this, "htmlTemplatePath", {
      fullPath: "",
      replace: ""
    });
    Z(this, "scriptTemplatePath", {
      fullPath: "",
      replace: ""
    });
    this.fullPath = e.fullPath, this.htmlTemplatePath = e.htmlTemplatePath, this.scriptTemplatePath = e.scriptTemplatePath;
  }
  getHtml() {
    try {
      var e = dr.readFileSync(this.htmlTemplatePath.fullPath, "utf-8");
      return e.replace(
        this.htmlTemplatePath.replace,
        `${this.scriptTemplatePath.fullPath}?story_html_script_id=${this.storyId}`
      ) ?? `<div>something went wrong. This ${this.htmlTemplatePath.fullPath} file exist ?</div>`;
    } catch {
      return `<div>cant get ${this.htmlTemplatePath.fullPath}. file exist ?</div>`;
    }
  }
  getScript() {
    var e = dr.readFileSync(this.scriptTemplatePath.fullPath, "utf-8");
    return e.replace(this.scriptTemplatePath.replace, this.fullPath);
  }
  getScriptUseCode(e) {
    return e.replace(this.scriptTemplatePath.replace, this.fullPath);
  }
}
var X = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ae(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function $e(r) {
  if (r.__esModule)
    return r;
  var e = r.default;
  if (typeof e == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(t, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return r[n];
      }
    });
  }), t;
}
var oe = { exports: {} };
function Ue(r) {
  throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var _r = { exports: {} };
const ze = {}, qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ze
}, Symbol.toStringTag, { value: "Module" })), De = /* @__PURE__ */ $e(qe);
var Mr;
function xr() {
  return Mr || (Mr = 1, function(r, e) {
    (function(t, n) {
      r.exports = n();
    })(X, function() {
      var t = t || function(n, o) {
        var p;
        if (typeof window < "u" && window.crypto && (p = window.crypto), typeof self < "u" && self.crypto && (p = self.crypto), typeof globalThis < "u" && globalThis.crypto && (p = globalThis.crypto), !p && typeof window < "u" && window.msCrypto && (p = window.msCrypto), !p && typeof X < "u" && X.crypto && (p = X.crypto), !p && typeof Ue == "function")
          try {
            p = De;
          } catch {
          }
        var l = function() {
          if (p) {
            if (typeof p.getRandomValues == "function")
              try {
                return p.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof p.randomBytes == "function")
              try {
                return p.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, d = Object.create || function() {
          function c() {
          }
          return function(x) {
            var v;
            return c.prototype = x, v = new c(), c.prototype = null, v;
          };
        }(), H = {}, i = H.lib = {}, a = i.Base = function() {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function(c) {
              var x = d(this);
              return c && x.mixIn(c), (!x.hasOwnProperty("init") || this.init === x.init) && (x.init = function() {
                x.$super.init.apply(this, arguments);
              }), x.init.prototype = x, x.$super = this, x;
            },
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var c = this.extend();
              return c.init.apply(c, arguments), c;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function(c) {
              for (var x in c)
                c.hasOwnProperty(x) && (this[x] = c[x]);
              c.hasOwnProperty("toString") && (this.toString = c.toString);
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }(), w = i.WordArray = a.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function(c, x) {
            c = this.words = c || [], x != o ? this.sigBytes = x : this.sigBytes = c.length * 4;
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function(c) {
            return (c || B).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function(c) {
            var x = this.words, v = c.words, g = this.sigBytes, _ = c.sigBytes;
            if (this.clamp(), g % 4)
              for (var F = 0; F < _; F++) {
                var T = v[F >>> 2] >>> 24 - F % 4 * 8 & 255;
                x[g + F >>> 2] |= T << 24 - (g + F) % 4 * 8;
              }
            else
              for (var O = 0; O < _; O += 4)
                x[g + O >>> 2] = v[O >>> 2];
            return this.sigBytes += _, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var c = this.words, x = this.sigBytes;
            c[x >>> 2] &= 4294967295 << 32 - x % 4 * 8, c.length = n.ceil(x / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var c = a.clone.call(this);
            return c.words = this.words.slice(0), c;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function(c) {
            for (var x = [], v = 0; v < c; v += 4)
              x.push(l());
            return new w.init(x, c);
          }
        }), m = H.enc = {}, B = m.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function(c) {
            for (var x = c.words, v = c.sigBytes, g = [], _ = 0; _ < v; _++) {
              var F = x[_ >>> 2] >>> 24 - _ % 4 * 8 & 255;
              g.push((F >>> 4).toString(16)), g.push((F & 15).toString(16));
            }
            return g.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function(c) {
            for (var x = c.length, v = [], g = 0; g < x; g += 2)
              v[g >>> 3] |= parseInt(c.substr(g, 2), 16) << 24 - g % 8 * 4;
            return new w.init(v, x / 2);
          }
        }, S = m.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function(c) {
            for (var x = c.words, v = c.sigBytes, g = [], _ = 0; _ < v; _++) {
              var F = x[_ >>> 2] >>> 24 - _ % 4 * 8 & 255;
              g.push(String.fromCharCode(F));
            }
            return g.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function(c) {
            for (var x = c.length, v = [], g = 0; g < x; g++)
              v[g >>> 2] |= (c.charCodeAt(g) & 255) << 24 - g % 4 * 8;
            return new w.init(v, x);
          }
        }, b = m.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function(c) {
            try {
              return decodeURIComponent(escape(S.stringify(c)));
            } catch {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function(c) {
            return S.parse(unescape(encodeURIComponent(c)));
          }
        }, y = i.BufferedBlockAlgorithm = a.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new w.init(), this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function(c) {
            typeof c == "string" && (c = b.parse(c)), this._data.concat(c), this._nDataBytes += c.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function(c) {
            var x, v = this._data, g = v.words, _ = v.sigBytes, F = this.blockSize, T = F * 4, O = _ / T;
            c ? O = n.ceil(O) : O = n.max((O | 0) - this._minBufferSize, 0);
            var j = O * F, q = n.min(j * 4, _);
            if (j) {
              for (var R = 0; R < j; R += F)
                this._doProcessBlock(g, R);
              x = g.splice(0, j), v.sigBytes -= q;
            }
            return new w.init(x, q);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var c = a.clone.call(this);
            return c._data = this._data.clone(), c;
          },
          _minBufferSize: 0
        });
        i.Hasher = y.extend({
          /**
           * Configuration options.
           */
          cfg: a.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(c) {
            this.cfg = this.cfg.extend(c), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            y.reset.call(this), this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function(c) {
            return this._append(c), this._process(), this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function(c) {
            c && this._append(c);
            var x = this._doFinalize();
            return x;
          },
          blockSize: 16,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function(c) {
            return function(x, v) {
              return new c.init(v).finalize(x);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function(c) {
            return function(x, v) {
              return new P.HMAC.init(c, v).finalize(x);
            };
          }
        });
        var P = H.algo = {};
        return H;
      }(Math);
      return t;
    });
  }(_r)), _r.exports;
}
(function(r, e) {
  (function(t, n) {
    r.exports = n(xr());
  })(X, function(t) {
    return function(n) {
      var o = t, p = o.lib, l = p.WordArray, d = p.Hasher, H = o.algo, i = [];
      (function() {
        for (var b = 0; b < 64; b++)
          i[b] = n.abs(n.sin(b + 1)) * 4294967296 | 0;
      })();
      var a = H.MD5 = d.extend({
        _doReset: function() {
          this._hash = new l.init([
            1732584193,
            4023233417,
            2562383102,
            271733878
          ]);
        },
        _doProcessBlock: function(b, y) {
          for (var P = 0; P < 16; P++) {
            var c = y + P, x = b[c];
            b[c] = (x << 8 | x >>> 24) & 16711935 | (x << 24 | x >>> 8) & 4278255360;
          }
          var v = this._hash.words, g = b[y + 0], _ = b[y + 1], F = b[y + 2], T = b[y + 3], O = b[y + 4], j = b[y + 5], q = b[y + 6], R = b[y + 7], W = b[y + 8], D = b[y + 9], J = b[y + 10], N = b[y + 11], Q = b[y + 12], L = b[y + 13], Y = b[y + 14], K = b[y + 15], h = v[0], s = v[1], u = v[2], f = v[3];
          h = w(h, s, u, f, g, 7, i[0]), f = w(f, h, s, u, _, 12, i[1]), u = w(u, f, h, s, F, 17, i[2]), s = w(s, u, f, h, T, 22, i[3]), h = w(h, s, u, f, O, 7, i[4]), f = w(f, h, s, u, j, 12, i[5]), u = w(u, f, h, s, q, 17, i[6]), s = w(s, u, f, h, R, 22, i[7]), h = w(h, s, u, f, W, 7, i[8]), f = w(f, h, s, u, D, 12, i[9]), u = w(u, f, h, s, J, 17, i[10]), s = w(s, u, f, h, N, 22, i[11]), h = w(h, s, u, f, Q, 7, i[12]), f = w(f, h, s, u, L, 12, i[13]), u = w(u, f, h, s, Y, 17, i[14]), s = w(s, u, f, h, K, 22, i[15]), h = m(h, s, u, f, _, 5, i[16]), f = m(f, h, s, u, q, 9, i[17]), u = m(u, f, h, s, N, 14, i[18]), s = m(s, u, f, h, g, 20, i[19]), h = m(h, s, u, f, j, 5, i[20]), f = m(f, h, s, u, J, 9, i[21]), u = m(u, f, h, s, K, 14, i[22]), s = m(s, u, f, h, O, 20, i[23]), h = m(h, s, u, f, D, 5, i[24]), f = m(f, h, s, u, Y, 9, i[25]), u = m(u, f, h, s, T, 14, i[26]), s = m(s, u, f, h, W, 20, i[27]), h = m(h, s, u, f, L, 5, i[28]), f = m(f, h, s, u, F, 9, i[29]), u = m(u, f, h, s, R, 14, i[30]), s = m(s, u, f, h, Q, 20, i[31]), h = B(h, s, u, f, j, 4, i[32]), f = B(f, h, s, u, W, 11, i[33]), u = B(u, f, h, s, N, 16, i[34]), s = B(s, u, f, h, Y, 23, i[35]), h = B(h, s, u, f, _, 4, i[36]), f = B(f, h, s, u, O, 11, i[37]), u = B(u, f, h, s, R, 16, i[38]), s = B(s, u, f, h, J, 23, i[39]), h = B(h, s, u, f, L, 4, i[40]), f = B(f, h, s, u, g, 11, i[41]), u = B(u, f, h, s, T, 16, i[42]), s = B(s, u, f, h, q, 23, i[43]), h = B(h, s, u, f, D, 4, i[44]), f = B(f, h, s, u, Q, 11, i[45]), u = B(u, f, h, s, K, 16, i[46]), s = B(s, u, f, h, F, 23, i[47]), h = S(h, s, u, f, g, 6, i[48]), f = S(f, h, s, u, R, 10, i[49]), u = S(u, f, h, s, Y, 15, i[50]), s = S(s, u, f, h, j, 21, i[51]), h = S(h, s, u, f, Q, 6, i[52]), f = S(f, h, s, u, T, 10, i[53]), u = S(u, f, h, s, J, 15, i[54]), s = S(s, u, f, h, _, 21, i[55]), h = S(h, s, u, f, W, 6, i[56]), f = S(f, h, s, u, K, 10, i[57]), u = S(u, f, h, s, q, 15, i[58]), s = S(s, u, f, h, L, 21, i[59]), h = S(h, s, u, f, O, 6, i[60]), f = S(f, h, s, u, N, 10, i[61]), u = S(u, f, h, s, F, 15, i[62]), s = S(s, u, f, h, D, 21, i[63]), v[0] = v[0] + h | 0, v[1] = v[1] + s | 0, v[2] = v[2] + u | 0, v[3] = v[3] + f | 0;
        },
        _doFinalize: function() {
          var b = this._data, y = b.words, P = this._nDataBytes * 8, c = b.sigBytes * 8;
          y[c >>> 5] |= 128 << 24 - c % 32;
          var x = n.floor(P / 4294967296), v = P;
          y[(c + 64 >>> 9 << 4) + 15] = (x << 8 | x >>> 24) & 16711935 | (x << 24 | x >>> 8) & 4278255360, y[(c + 64 >>> 9 << 4) + 14] = (v << 8 | v >>> 24) & 16711935 | (v << 24 | v >>> 8) & 4278255360, b.sigBytes = (y.length + 1) * 4, this._process();
          for (var g = this._hash, _ = g.words, F = 0; F < 4; F++) {
            var T = _[F];
            _[F] = (T << 8 | T >>> 24) & 16711935 | (T << 24 | T >>> 8) & 4278255360;
          }
          return g;
        },
        clone: function() {
          var b = d.clone.call(this);
          return b._hash = this._hash.clone(), b;
        }
      });
      function w(b, y, P, c, x, v, g) {
        var _ = b + (y & P | ~y & c) + x + g;
        return (_ << v | _ >>> 32 - v) + y;
      }
      function m(b, y, P, c, x, v, g) {
        var _ = b + (y & c | P & ~c) + x + g;
        return (_ << v | _ >>> 32 - v) + y;
      }
      function B(b, y, P, c, x, v, g) {
        var _ = b + (y ^ P ^ c) + x + g;
        return (_ << v | _ >>> 32 - v) + y;
      }
      function S(b, y, P, c, x, v, g) {
        var _ = b + (P ^ (y | ~c)) + x + g;
        return (_ << v | _ >>> 32 - v) + y;
      }
      o.MD5 = d._createHelper(a), o.HmacMD5 = d._createHmacHelper(a);
    }(Math), t.MD5;
  });
})(oe);
var Ne = oe.exports;
const Le = /* @__PURE__ */ ae(Ne);
var ie = { exports: {} }, wr = { exports: {} }, Xr;
function ce() {
  return Xr || (Xr = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(xr());
    })(X, function(t) {
      return function(n) {
        var o = t, p = o.lib, l = p.Base, d = p.WordArray, H = o.x64 = {};
        H.Word = l.extend({
          /**
           * Initializes a newly created 64-bit word.
           *
           * @param {number} high The high 32 bits.
           * @param {number} low The low 32 bits.
           *
           * @example
           *
           *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
           */
          init: function(i, a) {
            this.high = i, this.low = a;
          }
          /**
           * Bitwise NOTs this word.
           *
           * @return {X64Word} A new x64-Word object after negating.
           *
           * @example
           *
           *     var negated = x64Word.not();
           */
          // not: function () {
          // var high = ~this.high;
          // var low = ~this.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ANDs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to AND with this word.
           *
           * @return {X64Word} A new x64-Word object after ANDing.
           *
           * @example
           *
           *     var anded = x64Word.and(anotherX64Word);
           */
          // and: function (word) {
          // var high = this.high & word.high;
          // var low = this.low & word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise ORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to OR with this word.
           *
           * @return {X64Word} A new x64-Word object after ORing.
           *
           * @example
           *
           *     var ored = x64Word.or(anotherX64Word);
           */
          // or: function (word) {
          // var high = this.high | word.high;
          // var low = this.low | word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Bitwise XORs this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to XOR with this word.
           *
           * @return {X64Word} A new x64-Word object after XORing.
           *
           * @example
           *
           *     var xored = x64Word.xor(anotherX64Word);
           */
          // xor: function (word) {
          // var high = this.high ^ word.high;
          // var low = this.low ^ word.low;
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the left.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftL(25);
           */
          // shiftL: function (n) {
          // if (n < 32) {
          // var high = (this.high << n) | (this.low >>> (32 - n));
          // var low = this.low << n;
          // } else {
          // var high = this.low << (n - 32);
          // var low = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Shifts this word n bits to the right.
           *
           * @param {number} n The number of bits to shift.
           *
           * @return {X64Word} A new x64-Word object after shifting.
           *
           * @example
           *
           *     var shifted = x64Word.shiftR(7);
           */
          // shiftR: function (n) {
          // if (n < 32) {
          // var low = (this.low >>> n) | (this.high << (32 - n));
          // var high = this.high >>> n;
          // } else {
          // var low = this.high >>> (n - 32);
          // var high = 0;
          // }
          // return X64Word.create(high, low);
          // },
          /**
           * Rotates this word n bits to the left.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotL(25);
           */
          // rotL: function (n) {
          // return this.shiftL(n).or(this.shiftR(64 - n));
          // },
          /**
           * Rotates this word n bits to the right.
           *
           * @param {number} n The number of bits to rotate.
           *
           * @return {X64Word} A new x64-Word object after rotating.
           *
           * @example
           *
           *     var rotated = x64Word.rotR(7);
           */
          // rotR: function (n) {
          // return this.shiftR(n).or(this.shiftL(64 - n));
          // },
          /**
           * Adds this word with the passed word.
           *
           * @param {X64Word} word The x64-Word to add with this word.
           *
           * @return {X64Word} A new x64-Word object after adding.
           *
           * @example
           *
           *     var added = x64Word.add(anotherX64Word);
           */
          // add: function (word) {
          // var low = (this.low + word.low) | 0;
          // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
          // var high = (this.high + word.high + carry) | 0;
          // return X64Word.create(high, low);
          // }
        }), H.WordArray = l.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.x64.WordArray.create();
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ]);
           *
           *     var wordArray = CryptoJS.x64.WordArray.create([
           *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
           *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
           *     ], 10);
           */
          init: function(i, a) {
            i = this.words = i || [], a != n ? this.sigBytes = a : this.sigBytes = i.length * 8;
          },
          /**
           * Converts this 64-bit word array to a 32-bit word array.
           *
           * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
           *
           * @example
           *
           *     var x32WordArray = x64WordArray.toX32();
           */
          toX32: function() {
            for (var i = this.words, a = i.length, w = [], m = 0; m < a; m++) {
              var B = i[m];
              w.push(B.high), w.push(B.low);
            }
            return d.create(w, this.sigBytes);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {X64WordArray} The clone.
           *
           * @example
           *
           *     var clone = x64WordArray.clone();
           */
          clone: function() {
            for (var i = l.clone.call(this), a = i.words = this.words.slice(0), w = a.length, m = 0; m < w; m++)
              a[m] = a[m].clone();
            return i;
          }
        });
      }(), t;
    });
  }(wr)), wr.exports;
}
var Sr = { exports: {} }, Vr;
function Ke() {
  return Vr || (Vr = 1, function(r, e) {
    (function(t, n, o) {
      r.exports = n(xr(), ce());
    })(X, function(t) {
      return function() {
        var n = t, o = n.lib, p = o.Hasher, l = n.x64, d = l.Word, H = l.WordArray, i = n.algo;
        function a() {
          return d.create.apply(d, arguments);
        }
        var w = [
          a(1116352408, 3609767458),
          a(1899447441, 602891725),
          a(3049323471, 3964484399),
          a(3921009573, 2173295548),
          a(961987163, 4081628472),
          a(1508970993, 3053834265),
          a(2453635748, 2937671579),
          a(2870763221, 3664609560),
          a(3624381080, 2734883394),
          a(310598401, 1164996542),
          a(607225278, 1323610764),
          a(1426881987, 3590304994),
          a(1925078388, 4068182383),
          a(2162078206, 991336113),
          a(2614888103, 633803317),
          a(3248222580, 3479774868),
          a(3835390401, 2666613458),
          a(4022224774, 944711139),
          a(264347078, 2341262773),
          a(604807628, 2007800933),
          a(770255983, 1495990901),
          a(1249150122, 1856431235),
          a(1555081692, 3175218132),
          a(1996064986, 2198950837),
          a(2554220882, 3999719339),
          a(2821834349, 766784016),
          a(2952996808, 2566594879),
          a(3210313671, 3203337956),
          a(3336571891, 1034457026),
          a(3584528711, 2466948901),
          a(113926993, 3758326383),
          a(338241895, 168717936),
          a(666307205, 1188179964),
          a(773529912, 1546045734),
          a(1294757372, 1522805485),
          a(1396182291, 2643833823),
          a(1695183700, 2343527390),
          a(1986661051, 1014477480),
          a(2177026350, 1206759142),
          a(2456956037, 344077627),
          a(2730485921, 1290863460),
          a(2820302411, 3158454273),
          a(3259730800, 3505952657),
          a(3345764771, 106217008),
          a(3516065817, 3606008344),
          a(3600352804, 1432725776),
          a(4094571909, 1467031594),
          a(275423344, 851169720),
          a(430227734, 3100823752),
          a(506948616, 1363258195),
          a(659060556, 3750685593),
          a(883997877, 3785050280),
          a(958139571, 3318307427),
          a(1322822218, 3812723403),
          a(1537002063, 2003034995),
          a(1747873779, 3602036899),
          a(1955562222, 1575990012),
          a(2024104815, 1125592928),
          a(2227730452, 2716904306),
          a(2361852424, 442776044),
          a(2428436474, 593698344),
          a(2756734187, 3733110249),
          a(3204031479, 2999351573),
          a(3329325298, 3815920427),
          a(3391569614, 3928383900),
          a(3515267271, 566280711),
          a(3940187606, 3454069534),
          a(4118630271, 4000239992),
          a(116418474, 1914138554),
          a(174292421, 2731055270),
          a(289380356, 3203993006),
          a(460393269, 320620315),
          a(685471733, 587496836),
          a(852142971, 1086792851),
          a(1017036298, 365543100),
          a(1126000580, 2618297676),
          a(1288033470, 3409855158),
          a(1501505948, 4234509866),
          a(1607167915, 987167468),
          a(1816402316, 1246189591)
        ], m = [];
        (function() {
          for (var S = 0; S < 80; S++)
            m[S] = a();
        })();
        var B = i.SHA512 = p.extend({
          _doReset: function() {
            this._hash = new H.init([
              new d.init(1779033703, 4089235720),
              new d.init(3144134277, 2227873595),
              new d.init(1013904242, 4271175723),
              new d.init(2773480762, 1595750129),
              new d.init(1359893119, 2917565137),
              new d.init(2600822924, 725511199),
              new d.init(528734635, 4215389547),
              new d.init(1541459225, 327033209)
            ]);
          },
          _doProcessBlock: function(S, b) {
            for (var y = this._hash.words, P = y[0], c = y[1], x = y[2], v = y[3], g = y[4], _ = y[5], F = y[6], T = y[7], O = P.high, j = P.low, q = c.high, R = c.low, W = x.high, D = x.low, J = v.high, N = v.low, Q = g.high, L = g.low, Y = _.high, K = _.low, h = F.high, s = F.low, u = T.high, f = T.low, $ = O, A = j, or = q, rr = R, ir = W, er = D, br = J, cr = N, U = Q, I = L, pr = Y, sr = K, vr = h, fr = s, gr = u, lr = f, z = 0; z < 80; z++) {
              var E, V, yr = m[z];
              if (z < 16)
                V = yr.high = S[b + z * 2] | 0, E = yr.low = S[b + z * 2 + 1] | 0;
              else {
                var Or = m[z - 15], tr = Or.high, hr = Or.low, se = (tr >>> 1 | hr << 31) ^ (tr >>> 8 | hr << 24) ^ tr >>> 7, jr = (hr >>> 1 | tr << 31) ^ (hr >>> 8 | tr << 24) ^ (hr >>> 7 | tr << 25), Rr = m[z - 2], nr = Rr.high, ur = Rr.low, fe = (nr >>> 19 | ur << 13) ^ (nr << 3 | ur >>> 29) ^ nr >>> 6, Ar = (ur >>> 19 | nr << 13) ^ (ur << 3 | nr >>> 29) ^ (ur >>> 6 | nr << 26), Ir = m[z - 7], le = Ir.high, he = Ir.low, kr = m[z - 16], ue = kr.high, Er = kr.low;
                E = jr + he, V = se + le + (E >>> 0 < jr >>> 0 ? 1 : 0), E = E + Ar, V = V + fe + (E >>> 0 < Ar >>> 0 ? 1 : 0), E = E + Er, V = V + ue + (E >>> 0 < Er >>> 0 ? 1 : 0), yr.high = V, yr.low = E;
              }
              var de = U & pr ^ ~U & vr, $r = I & sr ^ ~I & fr, xe = $ & or ^ $ & ir ^ or & ir, pe = A & rr ^ A & er ^ rr & er, ve = ($ >>> 28 | A << 4) ^ ($ << 30 | A >>> 2) ^ ($ << 25 | A >>> 7), Ur = (A >>> 28 | $ << 4) ^ (A << 30 | $ >>> 2) ^ (A << 25 | $ >>> 7), ye = (U >>> 14 | I << 18) ^ (U >>> 18 | I << 14) ^ (U << 23 | I >>> 9), be = (I >>> 14 | U << 18) ^ (I >>> 18 | U << 14) ^ (I << 23 | U >>> 9), zr = w[z], ge = zr.high, qr = zr.low, k = lr + be, G = gr + ye + (k >>> 0 < lr >>> 0 ? 1 : 0), k = k + $r, G = G + de + (k >>> 0 < $r >>> 0 ? 1 : 0), k = k + qr, G = G + ge + (k >>> 0 < qr >>> 0 ? 1 : 0), k = k + E, G = G + V + (k >>> 0 < E >>> 0 ? 1 : 0), Dr = Ur + pe, me = ve + xe + (Dr >>> 0 < Ur >>> 0 ? 1 : 0);
              gr = vr, lr = fr, vr = pr, fr = sr, pr = U, sr = I, I = cr + k | 0, U = br + G + (I >>> 0 < cr >>> 0 ? 1 : 0) | 0, br = ir, cr = er, ir = or, er = rr, or = $, rr = A, A = k + Dr | 0, $ = G + me + (A >>> 0 < k >>> 0 ? 1 : 0) | 0;
            }
            j = P.low = j + A, P.high = O + $ + (j >>> 0 < A >>> 0 ? 1 : 0), R = c.low = R + rr, c.high = q + or + (R >>> 0 < rr >>> 0 ? 1 : 0), D = x.low = D + er, x.high = W + ir + (D >>> 0 < er >>> 0 ? 1 : 0), N = v.low = N + cr, v.high = J + br + (N >>> 0 < cr >>> 0 ? 1 : 0), L = g.low = L + I, g.high = Q + U + (L >>> 0 < I >>> 0 ? 1 : 0), K = _.low = K + sr, _.high = Y + pr + (K >>> 0 < sr >>> 0 ? 1 : 0), s = F.low = s + fr, F.high = h + vr + (s >>> 0 < fr >>> 0 ? 1 : 0), f = T.low = f + lr, T.high = u + gr + (f >>> 0 < lr >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var S = this._data, b = S.words, y = this._nDataBytes * 8, P = S.sigBytes * 8;
            b[P >>> 5] |= 128 << 24 - P % 32, b[(P + 128 >>> 10 << 5) + 30] = Math.floor(y / 4294967296), b[(P + 128 >>> 10 << 5) + 31] = y, S.sigBytes = b.length * 4, this._process();
            var c = this._hash.toX32();
            return c;
          },
          clone: function() {
            var S = p.clone.call(this);
            return S._hash = this._hash.clone(), S;
          },
          blockSize: 1024 / 32
        });
        n.SHA512 = p._createHelper(B), n.HmacSHA512 = p._createHmacHelper(B);
      }(), t.SHA512;
    });
  }(Sr)), Sr.exports;
}
var Pr = { exports: {} }, Gr;
function Me() {
  return Gr || (Gr = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(xr());
    })(X, function(t) {
      (function() {
        var n = t, o = n.lib, p = o.Base, l = n.enc, d = l.Utf8, H = n.algo;
        H.HMAC = p.extend({
          /**
           * Initializes a newly created HMAC.
           *
           * @param {Hasher} hasher The hash algorithm to use.
           * @param {WordArray|string} key The secret key.
           *
           * @example
           *
           *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
           */
          init: function(i, a) {
            i = this._hasher = new i.init(), typeof a == "string" && (a = d.parse(a));
            var w = i.blockSize, m = w * 4;
            a.sigBytes > m && (a = i.finalize(a)), a.clamp();
            for (var B = this._oKey = a.clone(), S = this._iKey = a.clone(), b = B.words, y = S.words, P = 0; P < w; P++)
              b[P] ^= 1549556828, y[P] ^= 909522486;
            B.sigBytes = S.sigBytes = m, this.reset();
          },
          /**
           * Resets this HMAC to its initial state.
           *
           * @example
           *
           *     hmacHasher.reset();
           */
          reset: function() {
            var i = this._hasher;
            i.reset(), i.update(this._iKey);
          },
          /**
           * Updates this HMAC with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {HMAC} This HMAC instance.
           *
           * @example
           *
           *     hmacHasher.update('message');
           *     hmacHasher.update(wordArray);
           */
          update: function(i) {
            return this._hasher.update(i), this;
          },
          /**
           * Finalizes the HMAC computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The HMAC.
           *
           * @example
           *
           *     var hmac = hmacHasher.finalize();
           *     var hmac = hmacHasher.finalize('message');
           *     var hmac = hmacHasher.finalize(wordArray);
           */
          finalize: function(i) {
            var a = this._hasher, w = a.finalize(i);
            a.reset();
            var m = a.finalize(this._oKey.clone().concat(w));
            return m;
          }
        });
      })();
    });
  }(Pr)), Pr.exports;
}
(function(r, e) {
  (function(t, n, o) {
    r.exports = n(xr(), ce(), Ke(), Me());
  })(X, function(t) {
    return t.HmacSHA512;
  });
})(ie);
var Xe = ie.exports;
const Ve = /* @__PURE__ */ ae(Xe), Ge = ar.dirname(Pe(new URL(import.meta.url))), We = function(r) {
  const e = [], t = [r];
  do {
    const n = t.pop(), o = dr.lstatSync(n);
    o.isDirectory() ? dr.readdirSync(n).forEach(
      (p) => t.push(ar.join(n, p))
    ) : o.isFile() && e.push(ar.normalize(n));
  } while (t.length !== 0);
  return e;
}, Je = (r) => {
  const e = /^story\./.test(r), t = /^book\./.test(r);
  let n = "";
  if (e) {
    const o = r.match(/^story\.([a-f0-9]{32})/);
    o && o.length && (n = o[1]);
  }
  return {
    storyId: n,
    isBook: t
  };
}, Hr = (r) => Le(
  Ve(r, "")
).toString(), Qe = (r) => {
  const e = [], t = Object.keys(r);
  for (let n = 0; n < t.length; n++) {
    const o = {
      storyId: Hr(r[t[n]].fullPath),
      file: r[t[n]].storyRelativePath
    };
    e.push(o);
  }
  return e;
}, Ye = (r) => {
  const e = {
    book: Qe(r)
  };
  let t = dr.readFileSync(
    ar.join(Ge, "../client/index.html"),
    "utf-8"
  );
  return t = t.replace("--json-base64--", btoa(JSON.stringify(e))), t = t.replace(
    "<!-- script -->",
    '<script type="module" src="/@vite/client"><\/script>'
  ), t.replace("--json-base64--", btoa(JSON.stringify(e)));
};
function at(r) {
  const e = {
    command: "build",
    host: "",
    root: "",
    book: {},
    bookRegex: /\.story\./,
    storiesPath: "src",
    storiesCache: ".stories_cache",
    viteStoryKey: "",
    scriptTemplatePath: {
      fullPath: "",
      replace: ""
    },
    htmlTemplatePath: {
      fullPath: "",
      replace: ""
    }
  }, t = (l) => {
    const d = Hr(l.fullPath);
    l.storyId = d;
    const H = l.fullPath.replace(e.root, "");
    l.storyRelativePath = H;
    const i = Se(
      ar.join(e.root, e.storiesCache, l.storyRelativePath)
    );
    l.storyFullPath = i, e.book[d] = l;
  }, n = () => {
    const l = We(ar.join(e.root, e.storiesPath));
    e.book = {};
    for (let d = 0; d < l.length; d++)
      p(l[d]) && t(
        new mr({
          fullPath: l[d],
          htmlTemplatePath: r.htmlTemplatePath,
          scriptTemplatePath: r.scriptTemplatePath
        })
      );
  }, o = (l) => {
    const d = Hr(l.fullPath);
    e.book[d] && delete e.book[d];
  }, p = (l) => {
    const d = l.split("/").pop();
    return e.bookRegex.test(d);
  };
  return {
    name: "vite-plugin-vitebook",
    config(l, d) {
      e.command = d.command;
    },
    configResolved(l) {
      e.command == "serve" && (e.root = l.root, n());
    },
    configureServer(l) {
      l.watcher.on("add", (d) => {
        p(d) && (l.ws.send({
          type: "full-reload"
        }), t(
          new mr({
            fullPath: d,
            htmlTemplatePath: r.htmlTemplatePath,
            scriptTemplatePath: r.scriptTemplatePath
          })
        ));
      }), l.watcher.on("unlink", (d) => {
        p(d) && (l.ws.send({
          type: "full-reload"
        }), o(
          new mr({
            fullPath: d,
            htmlTemplatePath: {
              fullPath: "",
              replace: ""
            },
            scriptTemplatePath: {
              fullPath: "",
              replace: ""
            }
          })
        ));
      }), l.middlewares.use((d, H, i) => {
        l.config.___vitebook || (l.config.___vitebook = {}), l.config.___vitebook.host = d.headers.host, i();
      });
    },
    transformIndexHtml(l, d) {
      var w;
      const H = (w = d.server) == null ? void 0 : w.config.___vitebook.host, { storyId: i, isBook: a } = Je(H);
      return i == "" && !a ? l : a ? Ye(e.book) : i != "" ? e.book[i] ? e.book[i].getHtml() : `<div>story book id does not exist ${i}, try clear cache</div>` : l;
    },
    transform(l, d, H) {
      if (!d.includes("story_html_script_id"))
        return {
          code: l
        };
      const i = Fe(d);
      if (!i.query)
        return {
          code: l
        };
      const a = Ee.parse(i.query);
      return a.story_html_script_id ? e.book[a.story_html_script_id] ? {
        code: e.book[a.story_html_script_id].getScriptUseCode(l)
      } : {
        code: l
      } : {
        code: l
      };
    }
  };
}
export {
  at as default
};
