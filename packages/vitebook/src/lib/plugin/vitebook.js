var oe = Object.defineProperty;
var ie = (h, l, _) => l in h ? oe(h, l, { enumerable: !0, configurable: !0, writable: !0, value: _ }) : h[l] = _;
var at = (h, l, _) => (ie(h, typeof l != "symbol" ? l + "" : l, _), _);
import { normalizePath as se } from "vite";
import R from "fs";
import U from "path";
import { fileURLToPath as ce } from "url";
var G = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ut(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
function fe(h) {
  if (h.__esModule)
    return h;
  var l = h.default;
  if (typeof l == "function") {
    var _ = function d() {
      return this instanceof d ? Reflect.construct(l, arguments, this.constructor) : l.apply(this, arguments);
    };
    _.prototype = l.prototype;
  } else
    _ = {};
  return Object.defineProperty(_, "__esModule", { value: !0 }), Object.keys(h).forEach(function(d) {
    var S = Object.getOwnPropertyDescriptor(h, d);
    Object.defineProperty(_, d, S.get ? S : {
      enumerable: !0,
      get: function() {
        return h[d];
      }
    });
  }), _;
}
var Kt = { exports: {} };
function le(h) {
  throw new Error('Could not dynamically require "' + h + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var yt = { exports: {} };
const he = {}, ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: he
}, Symbol.toStringTag, { value: "Module" })), de = /* @__PURE__ */ fe(ue);
var qt;
function ut() {
  return qt || (qt = 1, function(h, l) {
    (function(_, d) {
      h.exports = d();
    })(G, function() {
      var _ = _ || function(d, S) {
        var m;
        if (typeof window < "u" && window.crypto && (m = window.crypto), typeof self < "u" && self.crypto && (m = self.crypto), typeof globalThis < "u" && globalThis.crypto && (m = globalThis.crypto), !m && typeof window < "u" && window.msCrypto && (m = window.msCrypto), !m && typeof G < "u" && G.crypto && (m = G.crypto), !m && typeof le == "function")
          try {
            m = de;
          } catch {
          }
        var b = function() {
          if (m) {
            if (typeof m.getRandomValues == "function")
              try {
                return m.getRandomValues(new Uint32Array(1))[0];
              } catch {
              }
            if (typeof m.randomBytes == "function")
              try {
                return m.randomBytes(4).readInt32LE();
              } catch {
              }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        }, p = Object.create || function() {
          function e() {
          }
          return function(s) {
            var c;
            return e.prototype = s, c = new e(), e.prototype = null, c;
          };
        }(), k = {}, r = k.lib = {}, t = r.Base = function() {
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
            extend: function(e) {
              var s = p(this);
              return e && s.mixIn(e), (!s.hasOwnProperty("init") || this.init === s.init) && (s.init = function() {
                s.$super.init.apply(this, arguments);
              }), s.init.prototype = s, s.$super = this, s;
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
              var e = this.extend();
              return e.init.apply(e, arguments), e;
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
            mixIn: function(e) {
              for (var s in e)
                e.hasOwnProperty(s) && (this[s] = e[s]);
              e.hasOwnProperty("toString") && (this.toString = e.toString);
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
        }(), w = r.WordArray = t.extend({
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
          init: function(e, s) {
            e = this.words = e || [], s != S ? this.sigBytes = s : this.sigBytes = e.length * 4;
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
          toString: function(e) {
            return (e || H).stringify(this);
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
          concat: function(e) {
            var s = this.words, c = e.words, v = this.sigBytes, x = e.sigBytes;
            if (this.clamp(), v % 4)
              for (var B = 0; B < x; B++) {
                var T = c[B >>> 2] >>> 24 - B % 4 * 8 & 255;
                s[v + B >>> 2] |= T << 24 - (v + B) % 4 * 8;
              }
            else
              for (var C = 0; C < x; C += 4)
                s[v + C >>> 2] = c[C >>> 2];
            return this.sigBytes += x, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var e = this.words, s = this.sigBytes;
            e[s >>> 2] &= 4294967295 << 32 - s % 4 * 8, e.length = d.ceil(s / 4);
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
            var e = t.clone.call(this);
            return e.words = this.words.slice(0), e;
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
          random: function(e) {
            for (var s = [], c = 0; c < e; c += 4)
              s.push(b());
            return new w.init(s, e);
          }
        }), y = k.enc = {}, H = y.Hex = {
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
          stringify: function(e) {
            for (var s = e.words, c = e.sigBytes, v = [], x = 0; x < c; x++) {
              var B = s[x >>> 2] >>> 24 - x % 4 * 8 & 255;
              v.push((B >>> 4).toString(16)), v.push((B & 15).toString(16));
            }
            return v.join("");
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
          parse: function(e) {
            for (var s = e.length, c = [], v = 0; v < s; v += 2)
              c[v >>> 3] |= parseInt(e.substr(v, 2), 16) << 24 - v % 8 * 4;
            return new w.init(c, s / 2);
          }
        }, g = y.Latin1 = {
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
          stringify: function(e) {
            for (var s = e.words, c = e.sigBytes, v = [], x = 0; x < c; x++) {
              var B = s[x >>> 2] >>> 24 - x % 4 * 8 & 255;
              v.push(String.fromCharCode(B));
            }
            return v.join("");
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
          parse: function(e) {
            for (var s = e.length, c = [], v = 0; v < s; v++)
              c[v >>> 2] |= (e.charCodeAt(v) & 255) << 24 - v % 4 * 8;
            return new w.init(c, s);
          }
        }, u = y.Utf8 = {
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
          stringify: function(e) {
            try {
              return decodeURIComponent(escape(g.stringify(e)));
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
          parse: function(e) {
            return g.parse(unescape(encodeURIComponent(e)));
          }
        }, f = r.BufferedBlockAlgorithm = t.extend({
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
          _append: function(e) {
            typeof e == "string" && (e = u.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes;
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
          _process: function(e) {
            var s, c = this._data, v = c.words, x = c.sigBytes, B = this.blockSize, T = B * 4, C = x / T;
            e ? C = d.ceil(C) : C = d.max((C | 0) - this._minBufferSize, 0);
            var F = C * B, I = d.min(F * 4, x);
            if (F) {
              for (var j = 0; j < F; j += B)
                this._doProcessBlock(v, j);
              s = v.splice(0, F), c.sigBytes -= I;
            }
            return new w.init(s, I);
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
            var e = t.clone.call(this);
            return e._data = this._data.clone(), e;
          },
          _minBufferSize: 0
        });
        r.Hasher = f.extend({
          /**
           * Configuration options.
           */
          cfg: t.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(e) {
            this.cfg = this.cfg.extend(e), this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            f.reset.call(this), this._doReset();
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
          update: function(e) {
            return this._append(e), this._process(), this;
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
          finalize: function(e) {
            e && this._append(e);
            var s = this._doFinalize();
            return s;
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
          _createHelper: function(e) {
            return function(s, c) {
              return new e.init(c).finalize(s);
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
          _createHmacHelper: function(e) {
            return function(s, c) {
              return new P.HMAC.init(e, c).finalize(s);
            };
          }
        });
        var P = k.algo = {};
        return k;
      }(Math);
      return _;
    });
  }(yt)), yt.exports;
}
(function(h, l) {
  (function(_, d) {
    h.exports = d(ut());
  })(G, function(_) {
    return function(d) {
      var S = _, m = S.lib, b = m.WordArray, p = m.Hasher, k = S.algo, r = [];
      (function() {
        for (var u = 0; u < 64; u++)
          r[u] = d.abs(d.sin(u + 1)) * 4294967296 | 0;
      })();
      var t = k.MD5 = p.extend({
        _doReset: function() {
          this._hash = new b.init([
            1732584193,
            4023233417,
            2562383102,
            271733878
          ]);
        },
        _doProcessBlock: function(u, f) {
          for (var P = 0; P < 16; P++) {
            var e = f + P, s = u[e];
            u[e] = (s << 8 | s >>> 24) & 16711935 | (s << 24 | s >>> 8) & 4278255360;
          }
          var c = this._hash.words, v = u[f + 0], x = u[f + 1], B = u[f + 2], T = u[f + 3], C = u[f + 4], F = u[f + 5], I = u[f + 6], j = u[f + 7], V = u[f + 8], K = u[f + 9], J = u[f + 10], X = u[f + 11], Q = u[f + 12], M = u[f + 13], Y = u[f + 14], $ = u[f + 15], o = c[0], a = c[1], i = c[2], n = c[3];
          o = w(o, a, i, n, v, 7, r[0]), n = w(n, o, a, i, x, 12, r[1]), i = w(i, n, o, a, B, 17, r[2]), a = w(a, i, n, o, T, 22, r[3]), o = w(o, a, i, n, C, 7, r[4]), n = w(n, o, a, i, F, 12, r[5]), i = w(i, n, o, a, I, 17, r[6]), a = w(a, i, n, o, j, 22, r[7]), o = w(o, a, i, n, V, 7, r[8]), n = w(n, o, a, i, K, 12, r[9]), i = w(i, n, o, a, J, 17, r[10]), a = w(a, i, n, o, X, 22, r[11]), o = w(o, a, i, n, Q, 7, r[12]), n = w(n, o, a, i, M, 12, r[13]), i = w(i, n, o, a, Y, 17, r[14]), a = w(a, i, n, o, $, 22, r[15]), o = y(o, a, i, n, x, 5, r[16]), n = y(n, o, a, i, I, 9, r[17]), i = y(i, n, o, a, X, 14, r[18]), a = y(a, i, n, o, v, 20, r[19]), o = y(o, a, i, n, F, 5, r[20]), n = y(n, o, a, i, J, 9, r[21]), i = y(i, n, o, a, $, 14, r[22]), a = y(a, i, n, o, C, 20, r[23]), o = y(o, a, i, n, K, 5, r[24]), n = y(n, o, a, i, Y, 9, r[25]), i = y(i, n, o, a, T, 14, r[26]), a = y(a, i, n, o, V, 20, r[27]), o = y(o, a, i, n, M, 5, r[28]), n = y(n, o, a, i, B, 9, r[29]), i = y(i, n, o, a, j, 14, r[30]), a = y(a, i, n, o, Q, 20, r[31]), o = H(o, a, i, n, F, 4, r[32]), n = H(n, o, a, i, V, 11, r[33]), i = H(i, n, o, a, X, 16, r[34]), a = H(a, i, n, o, Y, 23, r[35]), o = H(o, a, i, n, x, 4, r[36]), n = H(n, o, a, i, C, 11, r[37]), i = H(i, n, o, a, j, 16, r[38]), a = H(a, i, n, o, J, 23, r[39]), o = H(o, a, i, n, M, 4, r[40]), n = H(n, o, a, i, v, 11, r[41]), i = H(i, n, o, a, T, 16, r[42]), a = H(a, i, n, o, I, 23, r[43]), o = H(o, a, i, n, K, 4, r[44]), n = H(n, o, a, i, Q, 11, r[45]), i = H(i, n, o, a, $, 16, r[46]), a = H(a, i, n, o, B, 23, r[47]), o = g(o, a, i, n, v, 6, r[48]), n = g(n, o, a, i, j, 10, r[49]), i = g(i, n, o, a, Y, 15, r[50]), a = g(a, i, n, o, F, 21, r[51]), o = g(o, a, i, n, Q, 6, r[52]), n = g(n, o, a, i, T, 10, r[53]), i = g(i, n, o, a, J, 15, r[54]), a = g(a, i, n, o, x, 21, r[55]), o = g(o, a, i, n, V, 6, r[56]), n = g(n, o, a, i, $, 10, r[57]), i = g(i, n, o, a, I, 15, r[58]), a = g(a, i, n, o, M, 21, r[59]), o = g(o, a, i, n, C, 6, r[60]), n = g(n, o, a, i, X, 10, r[61]), i = g(i, n, o, a, B, 15, r[62]), a = g(a, i, n, o, K, 21, r[63]), c[0] = c[0] + o | 0, c[1] = c[1] + a | 0, c[2] = c[2] + i | 0, c[3] = c[3] + n | 0;
        },
        _doFinalize: function() {
          var u = this._data, f = u.words, P = this._nDataBytes * 8, e = u.sigBytes * 8;
          f[e >>> 5] |= 128 << 24 - e % 32;
          var s = d.floor(P / 4294967296), c = P;
          f[(e + 64 >>> 9 << 4) + 15] = (s << 8 | s >>> 24) & 16711935 | (s << 24 | s >>> 8) & 4278255360, f[(e + 64 >>> 9 << 4) + 14] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360, u.sigBytes = (f.length + 1) * 4, this._process();
          for (var v = this._hash, x = v.words, B = 0; B < 4; B++) {
            var T = x[B];
            x[B] = (T << 8 | T >>> 24) & 16711935 | (T << 24 | T >>> 8) & 4278255360;
          }
          return v;
        },
        clone: function() {
          var u = p.clone.call(this);
          return u._hash = this._hash.clone(), u;
        }
      });
      function w(u, f, P, e, s, c, v) {
        var x = u + (f & P | ~f & e) + s + v;
        return (x << c | x >>> 32 - c) + f;
      }
      function y(u, f, P, e, s, c, v) {
        var x = u + (f & e | P & ~e) + s + v;
        return (x << c | x >>> 32 - c) + f;
      }
      function H(u, f, P, e, s, c, v) {
        var x = u + (f ^ P ^ e) + s + v;
        return (x << c | x >>> 32 - c) + f;
      }
      function g(u, f, P, e, s, c, v) {
        var x = u + (P ^ (f | ~e)) + s + v;
        return (x << c | x >>> 32 - c) + f;
      }
      S.MD5 = p._createHelper(t), S.HmacMD5 = p._createHmacHelper(t);
    }(Math), _.MD5;
  });
})(Kt);
var ve = Kt.exports;
const _t = /* @__PURE__ */ Ut(ve);
var Xt = { exports: {} }, gt = { exports: {} }, Lt;
function Mt() {
  return Lt || (Lt = 1, function(h, l) {
    (function(_, d) {
      h.exports = d(ut());
    })(G, function(_) {
      return function(d) {
        var S = _, m = S.lib, b = m.Base, p = m.WordArray, k = S.x64 = {};
        k.Word = b.extend({
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
          init: function(r, t) {
            this.high = r, this.low = t;
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
        }), k.WordArray = b.extend({
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
          init: function(r, t) {
            r = this.words = r || [], t != d ? this.sigBytes = t : this.sigBytes = r.length * 8;
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
            for (var r = this.words, t = r.length, w = [], y = 0; y < t; y++) {
              var H = r[y];
              w.push(H.high), w.push(H.low);
            }
            return p.create(w, this.sigBytes);
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
            for (var r = b.clone.call(this), t = r.words = this.words.slice(0), w = t.length, y = 0; y < w; y++)
              t[y] = t[y].clone();
            return r;
          }
        });
      }(), _;
    });
  }(gt)), gt.exports;
}
var wt = { exports: {} }, Et;
function xe() {
  return Et || (Et = 1, function(h, l) {
    (function(_, d, S) {
      h.exports = d(ut(), Mt());
    })(G, function(_) {
      return function() {
        var d = _, S = d.lib, m = S.Hasher, b = d.x64, p = b.Word, k = b.WordArray, r = d.algo;
        function t() {
          return p.create.apply(p, arguments);
        }
        var w = [
          t(1116352408, 3609767458),
          t(1899447441, 602891725),
          t(3049323471, 3964484399),
          t(3921009573, 2173295548),
          t(961987163, 4081628472),
          t(1508970993, 3053834265),
          t(2453635748, 2937671579),
          t(2870763221, 3664609560),
          t(3624381080, 2734883394),
          t(310598401, 1164996542),
          t(607225278, 1323610764),
          t(1426881987, 3590304994),
          t(1925078388, 4068182383),
          t(2162078206, 991336113),
          t(2614888103, 633803317),
          t(3248222580, 3479774868),
          t(3835390401, 2666613458),
          t(4022224774, 944711139),
          t(264347078, 2341262773),
          t(604807628, 2007800933),
          t(770255983, 1495990901),
          t(1249150122, 1856431235),
          t(1555081692, 3175218132),
          t(1996064986, 2198950837),
          t(2554220882, 3999719339),
          t(2821834349, 766784016),
          t(2952996808, 2566594879),
          t(3210313671, 3203337956),
          t(3336571891, 1034457026),
          t(3584528711, 2466948901),
          t(113926993, 3758326383),
          t(338241895, 168717936),
          t(666307205, 1188179964),
          t(773529912, 1546045734),
          t(1294757372, 1522805485),
          t(1396182291, 2643833823),
          t(1695183700, 2343527390),
          t(1986661051, 1014477480),
          t(2177026350, 1206759142),
          t(2456956037, 344077627),
          t(2730485921, 1290863460),
          t(2820302411, 3158454273),
          t(3259730800, 3505952657),
          t(3345764771, 106217008),
          t(3516065817, 3606008344),
          t(3600352804, 1432725776),
          t(4094571909, 1467031594),
          t(275423344, 851169720),
          t(430227734, 3100823752),
          t(506948616, 1363258195),
          t(659060556, 3750685593),
          t(883997877, 3785050280),
          t(958139571, 3318307427),
          t(1322822218, 3812723403),
          t(1537002063, 2003034995),
          t(1747873779, 3602036899),
          t(1955562222, 1575990012),
          t(2024104815, 1125592928),
          t(2227730452, 2716904306),
          t(2361852424, 442776044),
          t(2428436474, 593698344),
          t(2756734187, 3733110249),
          t(3204031479, 2999351573),
          t(3329325298, 3815920427),
          t(3391569614, 3928383900),
          t(3515267271, 566280711),
          t(3940187606, 3454069534),
          t(4118630271, 4000239992),
          t(116418474, 1914138554),
          t(174292421, 2731055270),
          t(289380356, 3203993006),
          t(460393269, 320620315),
          t(685471733, 587496836),
          t(852142971, 1086792851),
          t(1017036298, 365543100),
          t(1126000580, 2618297676),
          t(1288033470, 3409855158),
          t(1501505948, 4234509866),
          t(1607167915, 987167468),
          t(1816402316, 1246189591)
        ], y = [];
        (function() {
          for (var g = 0; g < 80; g++)
            y[g] = t();
        })();
        var H = r.SHA512 = m.extend({
          _doReset: function() {
            this._hash = new k.init([
              new p.init(1779033703, 4089235720),
              new p.init(3144134277, 2227873595),
              new p.init(1013904242, 4271175723),
              new p.init(2773480762, 1595750129),
              new p.init(1359893119, 2917565137),
              new p.init(2600822924, 725511199),
              new p.init(528734635, 4215389547),
              new p.init(1541459225, 327033209)
            ]);
          },
          _doProcessBlock: function(g, u) {
            for (var f = this._hash.words, P = f[0], e = f[1], s = f[2], c = f[3], v = f[4], x = f[5], B = f[6], T = f[7], C = P.high, F = P.low, I = e.high, j = e.low, V = s.high, K = s.low, J = c.high, X = c.low, Q = v.high, M = v.low, Y = x.high, $ = x.low, o = B.high, a = B.low, i = T.high, n = T.low, q = C, z = F, nt = I, Z = j, ot = V, tt = K, pt = J, it = X, L = Q, A = M, dt = Y, st = $, vt = o, ct = a, bt = i, ft = n, E = 0; E < 80; E++) {
              var O, N, xt = y[E];
              if (E < 16)
                N = xt.high = g[u + E * 2] | 0, O = xt.low = g[u + E * 2 + 1] | 0;
              else {
                var Ht = y[E - 15], et = Ht.high, lt = Ht.low, Gt = (et >>> 1 | lt << 31) ^ (et >>> 8 | lt << 24) ^ et >>> 7, St = (lt >>> 1 | et << 31) ^ (lt >>> 8 | et << 24) ^ (lt >>> 7 | et << 25), Tt = y[E - 2], rt = Tt.high, ht = Tt.low, Nt = (rt >>> 19 | ht << 13) ^ (rt << 3 | ht >>> 29) ^ rt >>> 6, Ct = (ht >>> 19 | rt << 13) ^ (ht << 3 | rt >>> 29) ^ (ht >>> 6 | rt << 26), kt = y[E - 7], Wt = kt.high, Vt = kt.low, Rt = y[E - 16], Jt = Rt.high, Ft = Rt.low;
                O = St + Vt, N = Gt + Wt + (O >>> 0 < St >>> 0 ? 1 : 0), O = O + Ct, N = N + Nt + (O >>> 0 < Ct >>> 0 ? 1 : 0), O = O + Ft, N = N + Jt + (O >>> 0 < Ft >>> 0 ? 1 : 0), xt.high = N, xt.low = O;
              }
              var Qt = L & dt ^ ~L & vt, jt = A & st ^ ~A & ct, Yt = q & nt ^ q & ot ^ nt & ot, Zt = z & Z ^ z & tt ^ Z & tt, te = (q >>> 28 | z << 4) ^ (q << 30 | z >>> 2) ^ (q << 25 | z >>> 7), zt = (z >>> 28 | q << 4) ^ (z << 30 | q >>> 2) ^ (z << 25 | q >>> 7), ee = (L >>> 14 | A << 18) ^ (L >>> 18 | A << 14) ^ (L << 23 | A >>> 9), re = (A >>> 14 | L << 18) ^ (A >>> 18 | L << 14) ^ (A << 23 | L >>> 9), At = w[E], ae = At.high, Dt = At.low, D = ft + re, W = bt + ee + (D >>> 0 < ft >>> 0 ? 1 : 0), D = D + jt, W = W + Qt + (D >>> 0 < jt >>> 0 ? 1 : 0), D = D + Dt, W = W + ae + (D >>> 0 < Dt >>> 0 ? 1 : 0), D = D + O, W = W + N + (D >>> 0 < O >>> 0 ? 1 : 0), Ot = zt + Zt, ne = te + Yt + (Ot >>> 0 < zt >>> 0 ? 1 : 0);
              bt = vt, ft = ct, vt = dt, ct = st, dt = L, st = A, A = it + D | 0, L = pt + W + (A >>> 0 < it >>> 0 ? 1 : 0) | 0, pt = ot, it = tt, ot = nt, tt = Z, nt = q, Z = z, z = D + Ot | 0, q = W + ne + (z >>> 0 < D >>> 0 ? 1 : 0) | 0;
            }
            F = P.low = F + z, P.high = C + q + (F >>> 0 < z >>> 0 ? 1 : 0), j = e.low = j + Z, e.high = I + nt + (j >>> 0 < Z >>> 0 ? 1 : 0), K = s.low = K + tt, s.high = V + ot + (K >>> 0 < tt >>> 0 ? 1 : 0), X = c.low = X + it, c.high = J + pt + (X >>> 0 < it >>> 0 ? 1 : 0), M = v.low = M + A, v.high = Q + L + (M >>> 0 < A >>> 0 ? 1 : 0), $ = x.low = $ + st, x.high = Y + dt + ($ >>> 0 < st >>> 0 ? 1 : 0), a = B.low = a + ct, B.high = o + vt + (a >>> 0 < ct >>> 0 ? 1 : 0), n = T.low = n + ft, T.high = i + bt + (n >>> 0 < ft >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var g = this._data, u = g.words, f = this._nDataBytes * 8, P = g.sigBytes * 8;
            u[P >>> 5] |= 128 << 24 - P % 32, u[(P + 128 >>> 10 << 5) + 30] = Math.floor(f / 4294967296), u[(P + 128 >>> 10 << 5) + 31] = f, g.sigBytes = u.length * 4, this._process();
            var e = this._hash.toX32();
            return e;
          },
          clone: function() {
            var g = m.clone.call(this);
            return g._hash = this._hash.clone(), g;
          },
          blockSize: 1024 / 32
        });
        d.SHA512 = m._createHelper(H), d.HmacSHA512 = m._createHmacHelper(H);
      }(), _.SHA512;
    });
  }(wt)), wt.exports;
}
var mt = { exports: {} }, It;
function pe() {
  return It || (It = 1, function(h, l) {
    (function(_, d) {
      h.exports = d(ut());
    })(G, function(_) {
      (function() {
        var d = _, S = d.lib, m = S.Base, b = d.enc, p = b.Utf8, k = d.algo;
        k.HMAC = m.extend({
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
          init: function(r, t) {
            r = this._hasher = new r.init(), typeof t == "string" && (t = p.parse(t));
            var w = r.blockSize, y = w * 4;
            t.sigBytes > y && (t = r.finalize(t)), t.clamp();
            for (var H = this._oKey = t.clone(), g = this._iKey = t.clone(), u = H.words, f = g.words, P = 0; P < w; P++)
              u[P] ^= 1549556828, f[P] ^= 909522486;
            H.sigBytes = g.sigBytes = y, this.reset();
          },
          /**
           * Resets this HMAC to its initial state.
           *
           * @example
           *
           *     hmacHasher.reset();
           */
          reset: function() {
            var r = this._hasher;
            r.reset(), r.update(this._iKey);
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
          update: function(r) {
            return this._hasher.update(r), this;
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
          finalize: function(r) {
            var t = this._hasher, w = t.finalize(r);
            t.reset();
            var y = t.finalize(this._oKey.clone().concat(w));
            return y;
          }
        });
      })();
    });
  }(mt)), mt.exports;
}
(function(h, l) {
  (function(_, d, S) {
    h.exports = d(ut(), Mt(), xe(), pe());
  })(G, function(_) {
    return _.HmacSHA512;
  });
})(Xt);
var be = Xt.exports;
const Pt = /* @__PURE__ */ Ut(be), ye = U.dirname(ce(new URL(import.meta.url)));
function He(h) {
  const l = {
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
  };
  h != null && (h.htmlTemplatePath != null && (l.htmlTemplatePath = h.htmlTemplatePath), h.scriptTemplatePath != null && (l.scriptTemplatePath = h.scriptTemplatePath));
  const _ = (b) => {
    const p = _t(Pt(b.fullPath, "")).toString(), k = b.fullPath.replace(l.root, "");
    b.storyRelativePath = k;
    const r = se(
      U.join(l.root, l.storiesCache, b.storyRelativePath)
    );
    b.storyFullPath = r, l.book[p] = b, !R.existsSync(b.storyFullPath) && (R.mkdirSync(b.storyFullPath, { recursive: !0 }), R.writeFileSync(
      U.join(b.storyFullPath, "index.html"),
      b.getHtml()
    ), R.writeFileSync(
      U.join(b.storyFullPath, "script.ts"),
      b.getScript()
    ));
  }, d = () => {
    const b = _e(U.join(l.root, l.storiesPath));
    l.book = {};
    for (let p = 0; p < b.length; p++)
      m(b[p]) && _(
        new Bt({
          fullPath: b[p],
          htmlTemplatePath: h.htmlTemplatePath,
          scriptTemplatePath: h.scriptTemplatePath
        })
      );
  }, S = (b) => {
    const p = _t(Pt(b.fullPath, "")).toString();
    l.book[p] && ($t(l.book[p].storyFullPath), delete l.book[p]);
  }, m = (b) => {
    const p = b.split("/").pop();
    return l.bookRegex.test(p);
  };
  return {
    name: "vite-plugin-vue-example",
    // enforce: "pre",
    // resolveId(source, importer, options) {
    //     console.log('resolveId', source, importer, options)
    //     return source
    // },
    config(b, p) {
      l.command = p.command;
    },
    configResolved(b) {
      l.command == "serve" && (l.root = b.root, d());
    },
    configureServer(b) {
      b.watcher.on("add", (p) => {
        m(p) && (b.ws.send({
          type: "full-reload"
        }), _(
          new Bt({
            fullPath: p,
            htmlTemplatePath: h.htmlTemplatePath,
            scriptTemplatePath: h.scriptTemplatePath
          })
        ));
      }), b.watcher.on("unlink", (p) => {
        m(p) && (b.ws.send({
          type: "full-reload"
        }), S(
          new Bt({
            fullPath: p,
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
      }), b.middlewares.use((p, k, r) => {
        const t = p.headers.host ?? "", w = /^story\./.test(t), y = /^book\./.test(t);
        let H = "";
        const g = t.match(/^story\.([a-f0-9]{32})/);
        g && (H = g[1]), b.transformIndexHtml = (u, f, P) => new Promise((e) => {
          if (w && H != "")
            e(l.book[H].getHtml());
          else if (y) {
            const s = [], c = Object.keys(l.book);
            for (let x = 0; x < c.length; x++) {
              const B = {
                storyId: _t(
                  Pt(l.book[c[x]].fullPath, "")
                ).toString(),
                file: l.book[c[x]].storyRelativePath
              };
              s.push(B);
            }
            const v = {
              book: s
            };
            f = R.readFileSync(
              U.join(ye, "../client/index.html"),
              "utf-8"
            ), f = f.replace("--json-base64--", btoa(JSON.stringify(v))), f = f.replace(
              "<!-- script -->",
              '<script type="module" src="/@vite/client"><\/script>'
            ), e(
              f.replace("--json-base64--", btoa(JSON.stringify(v)))
            );
          } else
            e(f);
        }), r();
      });
    }
  };
}
const _e = function(h) {
  const l = [], _ = [h];
  do {
    const d = _.pop(), S = R.lstatSync(d);
    S.isDirectory() ? R.readdirSync(d).forEach(
      (m) => _.push(U.join(d, m))
    ) : S.isFile() && l.push(U.normalize(d));
  } while (_.length !== 0);
  return l;
};
class Bt {
  constructor(l) {
    at(this, "storyFullPath", "");
    at(this, "storyRelativePath", "");
    at(this, "fullPath", "");
    at(this, "htmlTemplatePath", {
      fullPath: "",
      replace: ""
    });
    at(this, "scriptTemplatePath", {
      fullPath: "",
      replace: ""
    });
    this.fullPath = l.fullPath, this.htmlTemplatePath = l.htmlTemplatePath, this.scriptTemplatePath = l.scriptTemplatePath;
  }
  getHtml() {
    var l = R.readFileSync(this.htmlTemplatePath.fullPath, "utf-8");
    return l.replace(
      this.htmlTemplatePath.replace,
      U.join(this.storyFullPath, "script.ts")
    );
  }
  getScript() {
    var l = R.readFileSync(this.scriptTemplatePath.fullPath, "utf-8");
    return l.replace(this.scriptTemplatePath.replace, this.fullPath);
  }
}
const $t = (h) => {
  try {
    if (R.existsSync(h)) {
      const l = R.readdirSync(h);
      for (const _ of l) {
        const d = U.join(h, _), S = R.statSync(d).isFile(), m = R.statSync(d).isDirectory();
        S && R.unlinkSync(d), m && $t(d);
      }
      R.rmdirSync(h);
    }
  } catch (l) {
    console.debug("cant delete path ", h, l);
  }
};
export {
  He as default
};
