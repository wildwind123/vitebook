var we = Object.defineProperty;
var Se = (r, e, t) => e in r ? we(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var Z = (r, e, t) => (Se(r, typeof e != "symbol" ? e + "" : e, t), t);
import { normalizePath as Pe } from "vite";
import ur from "fs";
import ar from "path";
import { fileURLToPath as Fe, parse as Be } from "url";
var X = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Jr(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function He(r) {
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
var Qr = { exports: {} };
function Ce(r) {
  throw new Error('Could not dynamically require "' + r + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var mr = { exports: {} };
const Te = {}, Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Te
}, Symbol.toStringTag, { value: "Module" })), je = /* @__PURE__ */ He(Oe);
var Lr;
function xr() {
  return Lr || (Lr = 1, function(r, e) {
    (function(t, n) {
      r.exports = n();
    })(X, function() {
      var t = t || function(n, o) {
        var p;
        if (typeof window < "u" && window.crypto && (p = window.crypto), typeof self < "u" && self.crypto && (p = self.crypto), typeof globalThis < "u" && globalThis.crypto && (p = globalThis.crypto), !p && typeof window < "u" && window.msCrypto && (p = window.msCrypto), !p && typeof X < "u" && X.crypto && (p = X.crypto), !p && typeof Ce == "function")
          try {
            p = je;
          } catch {
          }
        var h = function() {
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
        }, x = Object.create || function() {
          function c() {
          }
          return function(u) {
            var v;
            return c.prototype = u, v = new c(), c.prototype = null, v;
          };
        }(), C = {}, i = C.lib = {}, a = i.Base = function() {
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
              var u = x(this);
              return c && u.mixIn(c), (!u.hasOwnProperty("init") || this.init === u.init) && (u.init = function() {
                u.$super.init.apply(this, arguments);
              }), u.init.prototype = u, u.$super = this, u;
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
              for (var u in c)
                c.hasOwnProperty(u) && (this[u] = c[u]);
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
        }(), S = i.WordArray = a.extend({
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
          init: function(c, u) {
            c = this.words = c || [], u != o ? this.sigBytes = u : this.sigBytes = c.length * 4;
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
            var u = this.words, v = c.words, g = this.sigBytes, m = c.sigBytes;
            if (this.clamp(), g % 4)
              for (var F = 0; F < m; F++) {
                var T = v[F >>> 2] >>> 24 - F % 4 * 8 & 255;
                u[g + F >>> 2] |= T << 24 - (g + F) % 4 * 8;
              }
            else
              for (var O = 0; O < m; O += 4)
                u[g + O >>> 2] = v[O >>> 2];
            return this.sigBytes += m, this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var c = this.words, u = this.sigBytes;
            c[u >>> 2] &= 4294967295 << 32 - u % 4 * 8, c.length = n.ceil(u / 4);
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
            for (var u = [], v = 0; v < c; v += 4)
              u.push(h());
            return new S.init(u, c);
          }
        }), _ = C.enc = {}, B = _.Hex = {
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
            for (var u = c.words, v = c.sigBytes, g = [], m = 0; m < v; m++) {
              var F = u[m >>> 2] >>> 24 - m % 4 * 8 & 255;
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
            for (var u = c.length, v = [], g = 0; g < u; g += 2)
              v[g >>> 3] |= parseInt(c.substr(g, 2), 16) << 24 - g % 8 * 4;
            return new S.init(v, u / 2);
          }
        }, w = _.Latin1 = {
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
            for (var u = c.words, v = c.sigBytes, g = [], m = 0; m < v; m++) {
              var F = u[m >>> 2] >>> 24 - m % 4 * 8 & 255;
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
            for (var u = c.length, v = [], g = 0; g < u; g++)
              v[g >>> 2] |= (c.charCodeAt(g) & 255) << 24 - g % 4 * 8;
            return new S.init(v, u);
          }
        }, y = _.Utf8 = {
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
              return decodeURIComponent(escape(w.stringify(c)));
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
            return w.parse(unescape(encodeURIComponent(c)));
          }
        }, b = i.BufferedBlockAlgorithm = a.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new S.init(), this._nDataBytes = 0;
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
            typeof c == "string" && (c = y.parse(c)), this._data.concat(c), this._nDataBytes += c.sigBytes;
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
            var u, v = this._data, g = v.words, m = v.sigBytes, F = this.blockSize, T = F * 4, O = m / T;
            c ? O = n.ceil(O) : O = n.max((O | 0) - this._minBufferSize, 0);
            var j = O * F, q = n.min(j * 4, m);
            if (j) {
              for (var R = 0; R < j; R += F)
                this._doProcessBlock(g, R);
              u = g.splice(0, j), v.sigBytes -= q;
            }
            return new S.init(u, q);
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
        i.Hasher = b.extend({
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
            b.reset.call(this), this._doReset();
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
            var u = this._doFinalize();
            return u;
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
            return function(u, v) {
              return new c.init(v).finalize(u);
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
            return function(u, v) {
              return new P.HMAC.init(c, v).finalize(u);
            };
          }
        });
        var P = C.algo = {};
        return C;
      }(Math);
      return t;
    });
  }(mr)), mr.exports;
}
(function(r, e) {
  (function(t, n) {
    r.exports = n(xr());
  })(X, function(t) {
    return function(n) {
      var o = t, p = o.lib, h = p.WordArray, x = p.Hasher, C = o.algo, i = [];
      (function() {
        for (var y = 0; y < 64; y++)
          i[y] = n.abs(n.sin(y + 1)) * 4294967296 | 0;
      })();
      var a = C.MD5 = x.extend({
        _doReset: function() {
          this._hash = new h.init([
            1732584193,
            4023233417,
            2562383102,
            271733878
          ]);
        },
        _doProcessBlock: function(y, b) {
          for (var P = 0; P < 16; P++) {
            var c = b + P, u = y[c];
            y[c] = (u << 8 | u >>> 24) & 16711935 | (u << 24 | u >>> 8) & 4278255360;
          }
          var v = this._hash.words, g = y[b + 0], m = y[b + 1], F = y[b + 2], T = y[b + 3], O = y[b + 4], j = y[b + 5], q = y[b + 6], R = y[b + 7], W = y[b + 8], D = y[b + 9], J = y[b + 10], N = y[b + 11], Q = y[b + 12], L = y[b + 13], Y = y[b + 14], K = y[b + 15], l = v[0], s = v[1], d = v[2], f = v[3];
          l = S(l, s, d, f, g, 7, i[0]), f = S(f, l, s, d, m, 12, i[1]), d = S(d, f, l, s, F, 17, i[2]), s = S(s, d, f, l, T, 22, i[3]), l = S(l, s, d, f, O, 7, i[4]), f = S(f, l, s, d, j, 12, i[5]), d = S(d, f, l, s, q, 17, i[6]), s = S(s, d, f, l, R, 22, i[7]), l = S(l, s, d, f, W, 7, i[8]), f = S(f, l, s, d, D, 12, i[9]), d = S(d, f, l, s, J, 17, i[10]), s = S(s, d, f, l, N, 22, i[11]), l = S(l, s, d, f, Q, 7, i[12]), f = S(f, l, s, d, L, 12, i[13]), d = S(d, f, l, s, Y, 17, i[14]), s = S(s, d, f, l, K, 22, i[15]), l = _(l, s, d, f, m, 5, i[16]), f = _(f, l, s, d, q, 9, i[17]), d = _(d, f, l, s, N, 14, i[18]), s = _(s, d, f, l, g, 20, i[19]), l = _(l, s, d, f, j, 5, i[20]), f = _(f, l, s, d, J, 9, i[21]), d = _(d, f, l, s, K, 14, i[22]), s = _(s, d, f, l, O, 20, i[23]), l = _(l, s, d, f, D, 5, i[24]), f = _(f, l, s, d, Y, 9, i[25]), d = _(d, f, l, s, T, 14, i[26]), s = _(s, d, f, l, W, 20, i[27]), l = _(l, s, d, f, L, 5, i[28]), f = _(f, l, s, d, F, 9, i[29]), d = _(d, f, l, s, R, 14, i[30]), s = _(s, d, f, l, Q, 20, i[31]), l = B(l, s, d, f, j, 4, i[32]), f = B(f, l, s, d, W, 11, i[33]), d = B(d, f, l, s, N, 16, i[34]), s = B(s, d, f, l, Y, 23, i[35]), l = B(l, s, d, f, m, 4, i[36]), f = B(f, l, s, d, O, 11, i[37]), d = B(d, f, l, s, R, 16, i[38]), s = B(s, d, f, l, J, 23, i[39]), l = B(l, s, d, f, L, 4, i[40]), f = B(f, l, s, d, g, 11, i[41]), d = B(d, f, l, s, T, 16, i[42]), s = B(s, d, f, l, q, 23, i[43]), l = B(l, s, d, f, D, 4, i[44]), f = B(f, l, s, d, Q, 11, i[45]), d = B(d, f, l, s, K, 16, i[46]), s = B(s, d, f, l, F, 23, i[47]), l = w(l, s, d, f, g, 6, i[48]), f = w(f, l, s, d, R, 10, i[49]), d = w(d, f, l, s, Y, 15, i[50]), s = w(s, d, f, l, j, 21, i[51]), l = w(l, s, d, f, Q, 6, i[52]), f = w(f, l, s, d, T, 10, i[53]), d = w(d, f, l, s, J, 15, i[54]), s = w(s, d, f, l, m, 21, i[55]), l = w(l, s, d, f, W, 6, i[56]), f = w(f, l, s, d, K, 10, i[57]), d = w(d, f, l, s, q, 15, i[58]), s = w(s, d, f, l, L, 21, i[59]), l = w(l, s, d, f, O, 6, i[60]), f = w(f, l, s, d, N, 10, i[61]), d = w(d, f, l, s, F, 15, i[62]), s = w(s, d, f, l, D, 21, i[63]), v[0] = v[0] + l | 0, v[1] = v[1] + s | 0, v[2] = v[2] + d | 0, v[3] = v[3] + f | 0;
        },
        _doFinalize: function() {
          var y = this._data, b = y.words, P = this._nDataBytes * 8, c = y.sigBytes * 8;
          b[c >>> 5] |= 128 << 24 - c % 32;
          var u = n.floor(P / 4294967296), v = P;
          b[(c + 64 >>> 9 << 4) + 15] = (u << 8 | u >>> 24) & 16711935 | (u << 24 | u >>> 8) & 4278255360, b[(c + 64 >>> 9 << 4) + 14] = (v << 8 | v >>> 24) & 16711935 | (v << 24 | v >>> 8) & 4278255360, y.sigBytes = (b.length + 1) * 4, this._process();
          for (var g = this._hash, m = g.words, F = 0; F < 4; F++) {
            var T = m[F];
            m[F] = (T << 8 | T >>> 24) & 16711935 | (T << 24 | T >>> 8) & 4278255360;
          }
          return g;
        },
        clone: function() {
          var y = x.clone.call(this);
          return y._hash = this._hash.clone(), y;
        }
      });
      function S(y, b, P, c, u, v, g) {
        var m = y + (b & P | ~b & c) + u + g;
        return (m << v | m >>> 32 - v) + b;
      }
      function _(y, b, P, c, u, v, g) {
        var m = y + (b & c | P & ~c) + u + g;
        return (m << v | m >>> 32 - v) + b;
      }
      function B(y, b, P, c, u, v, g) {
        var m = y + (b ^ P ^ c) + u + g;
        return (m << v | m >>> 32 - v) + b;
      }
      function w(y, b, P, c, u, v, g) {
        var m = y + (P ^ (b | ~c)) + u + g;
        return (m << v | m >>> 32 - v) + b;
      }
      o.MD5 = x._createHelper(a), o.HmacMD5 = x._createHmacHelper(a);
    }(Math), t.MD5;
  });
})(Qr);
var Re = Qr.exports;
const _r = /* @__PURE__ */ Jr(Re);
var Yr = { exports: {} }, wr = { exports: {} }, Kr;
function Zr() {
  return Kr || (Kr = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(xr());
    })(X, function(t) {
      return function(n) {
        var o = t, p = o.lib, h = p.Base, x = p.WordArray, C = o.x64 = {};
        C.Word = h.extend({
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
        }), C.WordArray = h.extend({
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
            for (var i = this.words, a = i.length, S = [], _ = 0; _ < a; _++) {
              var B = i[_];
              S.push(B.high), S.push(B.low);
            }
            return x.create(S, this.sigBytes);
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
            for (var i = h.clone.call(this), a = i.words = this.words.slice(0), S = a.length, _ = 0; _ < S; _++)
              a[_] = a[_].clone();
            return i;
          }
        });
      }(), t;
    });
  }(wr)), wr.exports;
}
var Sr = { exports: {} }, Mr;
function Ae() {
  return Mr || (Mr = 1, function(r, e) {
    (function(t, n, o) {
      r.exports = n(xr(), Zr());
    })(X, function(t) {
      return function() {
        var n = t, o = n.lib, p = o.Hasher, h = n.x64, x = h.Word, C = h.WordArray, i = n.algo;
        function a() {
          return x.create.apply(x, arguments);
        }
        var S = [
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
        ], _ = [];
        (function() {
          for (var w = 0; w < 80; w++)
            _[w] = a();
        })();
        var B = i.SHA512 = p.extend({
          _doReset: function() {
            this._hash = new C.init([
              new x.init(1779033703, 4089235720),
              new x.init(3144134277, 2227873595),
              new x.init(1013904242, 4271175723),
              new x.init(2773480762, 1595750129),
              new x.init(1359893119, 2917565137),
              new x.init(2600822924, 725511199),
              new x.init(528734635, 4215389547),
              new x.init(1541459225, 327033209)
            ]);
          },
          _doProcessBlock: function(w, y) {
            for (var b = this._hash.words, P = b[0], c = b[1], u = b[2], v = b[3], g = b[4], m = b[5], F = b[6], T = b[7], O = P.high, j = P.low, q = c.high, R = c.low, W = u.high, D = u.low, J = v.high, N = v.low, Q = g.high, L = g.low, Y = m.high, K = m.low, l = F.high, s = F.low, d = T.high, f = T.low, z = O, A = j, or = q, rr = R, ir = W, er = D, yr = J, cr = N, U = Q, E = L, pr = Y, sr = K, vr = l, fr = s, gr = d, lr = f, $ = 0; $ < 80; $++) {
              var k, V, br = _[$];
              if ($ < 16)
                V = br.high = w[y + $ * 2] | 0, k = br.low = w[y + $ * 2 + 1] | 0;
              else {
                var jr = _[$ - 15], tr = jr.high, dr = jr.low, fe = (tr >>> 1 | dr << 31) ^ (tr >>> 8 | dr << 24) ^ tr >>> 7, Rr = (dr >>> 1 | tr << 31) ^ (dr >>> 8 | tr << 24) ^ (dr >>> 7 | tr << 25), Ar = _[$ - 2], nr = Ar.high, hr = Ar.low, le = (nr >>> 19 | hr << 13) ^ (nr << 3 | hr >>> 29) ^ nr >>> 6, Er = (hr >>> 19 | nr << 13) ^ (hr << 3 | nr >>> 29) ^ (hr >>> 6 | nr << 26), Ir = _[$ - 7], de = Ir.high, he = Ir.low, kr = _[$ - 16], ue = kr.high, zr = kr.low;
                k = Rr + he, V = fe + de + (k >>> 0 < Rr >>> 0 ? 1 : 0), k = k + Er, V = V + le + (k >>> 0 < Er >>> 0 ? 1 : 0), k = k + zr, V = V + ue + (k >>> 0 < zr >>> 0 ? 1 : 0), br.high = V, br.low = k;
              }
              var xe = U & pr ^ ~U & vr, Ur = E & sr ^ ~E & fr, pe = z & or ^ z & ir ^ or & ir, ve = A & rr ^ A & er ^ rr & er, be = (z >>> 28 | A << 4) ^ (z << 30 | A >>> 2) ^ (z << 25 | A >>> 7), $r = (A >>> 28 | z << 4) ^ (A << 30 | z >>> 2) ^ (A << 25 | z >>> 7), ye = (U >>> 14 | E << 18) ^ (U >>> 18 | E << 14) ^ (U << 23 | E >>> 9), ge = (E >>> 14 | U << 18) ^ (E >>> 18 | U << 14) ^ (E << 23 | U >>> 9), qr = S[$], me = qr.high, Dr = qr.low, I = lr + ge, G = gr + ye + (I >>> 0 < lr >>> 0 ? 1 : 0), I = I + Ur, G = G + xe + (I >>> 0 < Ur >>> 0 ? 1 : 0), I = I + Dr, G = G + me + (I >>> 0 < Dr >>> 0 ? 1 : 0), I = I + k, G = G + V + (I >>> 0 < k >>> 0 ? 1 : 0), Nr = $r + ve, _e = be + pe + (Nr >>> 0 < $r >>> 0 ? 1 : 0);
              gr = vr, lr = fr, vr = pr, fr = sr, pr = U, sr = E, E = cr + I | 0, U = yr + G + (E >>> 0 < cr >>> 0 ? 1 : 0) | 0, yr = ir, cr = er, ir = or, er = rr, or = z, rr = A, A = I + Nr | 0, z = G + _e + (A >>> 0 < I >>> 0 ? 1 : 0) | 0;
            }
            j = P.low = j + A, P.high = O + z + (j >>> 0 < A >>> 0 ? 1 : 0), R = c.low = R + rr, c.high = q + or + (R >>> 0 < rr >>> 0 ? 1 : 0), D = u.low = D + er, u.high = W + ir + (D >>> 0 < er >>> 0 ? 1 : 0), N = v.low = N + cr, v.high = J + yr + (N >>> 0 < cr >>> 0 ? 1 : 0), L = g.low = L + E, g.high = Q + U + (L >>> 0 < E >>> 0 ? 1 : 0), K = m.low = K + sr, m.high = Y + pr + (K >>> 0 < sr >>> 0 ? 1 : 0), s = F.low = s + fr, F.high = l + vr + (s >>> 0 < fr >>> 0 ? 1 : 0), f = T.low = f + lr, T.high = d + gr + (f >>> 0 < lr >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var w = this._data, y = w.words, b = this._nDataBytes * 8, P = w.sigBytes * 8;
            y[P >>> 5] |= 128 << 24 - P % 32, y[(P + 128 >>> 10 << 5) + 30] = Math.floor(b / 4294967296), y[(P + 128 >>> 10 << 5) + 31] = b, w.sigBytes = y.length * 4, this._process();
            var c = this._hash.toX32();
            return c;
          },
          clone: function() {
            var w = p.clone.call(this);
            return w._hash = this._hash.clone(), w;
          },
          blockSize: 1024 / 32
        });
        n.SHA512 = p._createHelper(B), n.HmacSHA512 = p._createHmacHelper(B);
      }(), t.SHA512;
    });
  }(Sr)), Sr.exports;
}
var Pr = { exports: {} }, Xr;
function Ee() {
  return Xr || (Xr = 1, function(r, e) {
    (function(t, n) {
      r.exports = n(xr());
    })(X, function(t) {
      (function() {
        var n = t, o = n.lib, p = o.Base, h = n.enc, x = h.Utf8, C = n.algo;
        C.HMAC = p.extend({
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
            i = this._hasher = new i.init(), typeof a == "string" && (a = x.parse(a));
            var S = i.blockSize, _ = S * 4;
            a.sigBytes > _ && (a = i.finalize(a)), a.clamp();
            for (var B = this._oKey = a.clone(), w = this._iKey = a.clone(), y = B.words, b = w.words, P = 0; P < S; P++)
              y[P] ^= 1549556828, b[P] ^= 909522486;
            B.sigBytes = w.sigBytes = _, this.reset();
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
            var a = this._hasher, S = a.finalize(i);
            a.reset();
            var _ = a.finalize(this._oKey.clone().concat(S));
            return _;
          }
        });
      })();
    });
  }(Pr)), Pr.exports;
}
(function(r, e) {
  (function(t, n, o) {
    r.exports = n(xr(), Zr(), Ae(), Ee());
  })(X, function(t) {
    return t.HmacSHA512;
  });
})(Yr);
var Ie = Yr.exports;
const Fr = /* @__PURE__ */ Jr(Ie), re = "%[a-f0-9]{2}", Vr = new RegExp("(" + re + ")|([^%]+?)", "gi"), Gr = new RegExp("(" + re + ")+", "gi");
function Hr(r, e) {
  try {
    return [decodeURIComponent(r.join(""))];
  } catch {
  }
  if (r.length === 1)
    return r;
  e = e || 1;
  const t = r.slice(0, e), n = r.slice(e);
  return Array.prototype.concat.call([], Hr(t), Hr(n));
}
function ke(r) {
  try {
    return decodeURIComponent(r);
  } catch {
    let e = r.match(Vr) || [];
    for (let t = 1; t < e.length; t++)
      r = Hr(e, t).join(""), e = r.match(Vr) || [];
    return r;
  }
}
function ze(r) {
  const e = {
    "%FE%FF": "��",
    "%FF%FE": "��"
  };
  let t = Gr.exec(r);
  for (; t; ) {
    try {
      e[t[0]] = decodeURIComponent(t[0]);
    } catch {
      const o = ke(t[0]);
      o !== t[0] && (e[t[0]] = o);
    }
    t = Gr.exec(r);
  }
  e["%C2"] = "�";
  const n = Object.keys(e);
  for (const o of n)
    r = r.replace(new RegExp(o, "g"), e[o]);
  return r;
}
function Ue(r) {
  if (typeof r != "string")
    throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof r + "`");
  try {
    return decodeURIComponent(r);
  } catch {
    return ze(r);
  }
}
function ee(r, e) {
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
function $e(r, e) {
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
const qe = (r) => r == null, De = (r) => encodeURIComponent(r).replace(/[!'()*]/g, (e) => `%${e.charCodeAt(0).toString(16).toUpperCase()}`), Cr = Symbol("encodeFragmentIdentifier");
function Ne(r) {
  switch (r.arrayFormat) {
    case "index":
      return (e) => (t, n) => {
        const o = t.length;
        return n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
          ...t,
          [H(e, r), "[", o, "]"].join("")
        ] : [
          ...t,
          [H(e, r), "[", H(o, r), "]=", H(n, r)].join("")
        ];
      };
    case "bracket":
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        [H(e, r), "[]"].join("")
      ] : [
        ...t,
        [H(e, r), "[]=", H(n, r)].join("")
      ];
    case "colon-list-separator":
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        [H(e, r), ":list="].join("")
      ] : [
        ...t,
        [H(e, r), ":list=", H(n, r)].join("")
      ];
    case "comma":
    case "separator":
    case "bracket-separator": {
      const e = r.arrayFormat === "bracket-separator" ? "[]=" : "=";
      return (t) => (n, o) => o === void 0 || r.skipNull && o === null || r.skipEmptyString && o === "" ? n : (o = o === null ? "" : o, n.length === 0 ? [[H(t, r), e, H(o, r)].join("")] : [[n, H(o, r)].join(r.arrayFormatSeparator)]);
    }
    default:
      return (e) => (t, n) => n === void 0 || r.skipNull && n === null || r.skipEmptyString && n === "" ? t : n === null ? [
        ...t,
        H(e, r)
      ] : [
        ...t,
        [H(e, r), "=", H(n, r)].join("")
      ];
  }
}
function Le(r) {
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
        const p = typeof n == "string" && n.includes(r.arrayFormatSeparator), h = typeof n == "string" && !p && M(n, r).includes(r.arrayFormatSeparator);
        n = h ? M(n, r) : n;
        const x = p || h ? n.split(r.arrayFormatSeparator).map((C) => M(C, r)) : n === null ? n : M(n, r);
        o[t] = x;
      };
    case "bracket-separator":
      return (t, n, o) => {
        const p = /(\[])$/.test(t);
        if (t = t.replace(/\[]$/, ""), !p) {
          o[t] = n && M(n, r);
          return;
        }
        const h = n === null ? [] : n.split(r.arrayFormatSeparator).map((x) => M(x, r));
        if (o[t] === void 0) {
          o[t] = h;
          return;
        }
        o[t] = [...o[t], ...h];
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
function te(r) {
  if (typeof r != "string" || r.length !== 1)
    throw new TypeError("arrayFormatSeparator must be single character string");
}
function H(r, e) {
  return e.encode ? e.strict ? De(r) : encodeURIComponent(r) : r;
}
function M(r, e) {
  return e.decode ? Ue(r) : r;
}
function ne(r) {
  return Array.isArray(r) ? r.sort() : typeof r == "object" ? ne(Object.keys(r)).sort((e, t) => Number(e) - Number(t)).map((e) => r[e]) : r;
}
function ae(r) {
  const e = r.indexOf("#");
  return e !== -1 && (r = r.slice(0, e)), r;
}
function Ke(r) {
  let e = "";
  const t = r.indexOf("#");
  return t !== -1 && (e = r.slice(t)), e;
}
function Wr(r, e) {
  return e.parseNumbers && !Number.isNaN(Number(r)) && typeof r == "string" && r.trim() !== "" ? r = Number(r) : e.parseBooleans && r !== null && (r.toLowerCase() === "true" || r.toLowerCase() === "false") && (r = r.toLowerCase() === "true"), r;
}
function Tr(r) {
  r = ae(r);
  const e = r.indexOf("?");
  return e === -1 ? "" : r.slice(e + 1);
}
function Or(r, e) {
  e = {
    decode: !0,
    sort: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    parseNumbers: !1,
    parseBooleans: !1,
    ...e
  }, te(e.arrayFormatSeparator);
  const t = Le(e), n = /* @__PURE__ */ Object.create(null);
  if (typeof r != "string" || (r = r.trim().replace(/^[?#&]/, ""), !r))
    return n;
  for (const o of r.split("&")) {
    if (o === "")
      continue;
    const p = e.decode ? o.replace(/\+/g, " ") : o;
    let [h, x] = ee(p, "=");
    h === void 0 && (h = p), x = x === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(e.arrayFormat) ? x : M(x, e), t(M(h, e), x, n);
  }
  for (const [o, p] of Object.entries(n))
    if (typeof p == "object" && p !== null)
      for (const [h, x] of Object.entries(p))
        p[h] = Wr(x, e);
    else
      n[o] = Wr(p, e);
  return e.sort === !1 ? n : (e.sort === !0 ? Object.keys(n).sort() : Object.keys(n).sort(e.sort)).reduce((o, p) => {
    const h = n[p];
    return h && typeof h == "object" && !Array.isArray(h) ? o[p] = ne(h) : o[p] = h, o;
  }, /* @__PURE__ */ Object.create(null));
}
function oe(r, e) {
  if (!r)
    return "";
  e = {
    encode: !0,
    strict: !0,
    arrayFormat: "none",
    arrayFormatSeparator: ",",
    ...e
  }, te(e.arrayFormatSeparator);
  const t = (h) => e.skipNull && qe(r[h]) || e.skipEmptyString && r[h] === "", n = Ne(e), o = {};
  for (const [h, x] of Object.entries(r))
    t(h) || (o[h] = x);
  const p = Object.keys(o);
  return e.sort !== !1 && p.sort(e.sort), p.map((h) => {
    const x = r[h];
    return x === void 0 ? "" : x === null ? H(h, e) : Array.isArray(x) ? x.length === 0 && e.arrayFormat === "bracket-separator" ? H(h, e) + "[]" : x.reduce(n(h), []).join("&") : H(h, e) + "=" + H(x, e);
  }).filter((h) => h.length > 0).join("&");
}
function ie(r, e) {
  var o;
  e = {
    decode: !0,
    ...e
  };
  let [t, n] = ee(r, "#");
  return t === void 0 && (t = r), {
    url: ((o = t == null ? void 0 : t.split("?")) == null ? void 0 : o[0]) ?? "",
    query: Or(Tr(r), e),
    ...e && e.parseFragmentIdentifier && n ? { fragmentIdentifier: M(n, e) } : {}
  };
}
function ce(r, e) {
  e = {
    encode: !0,
    strict: !0,
    [Cr]: !0,
    ...e
  };
  const t = ae(r.url).split("?")[0] || "", n = Tr(r.url), o = {
    ...Or(n, { sort: !1 }),
    ...r.query
  };
  let p = oe(o, e);
  p && (p = `?${p}`);
  let h = Ke(r.url);
  if (r.fragmentIdentifier) {
    const x = new URL(t);
    x.hash = r.fragmentIdentifier, h = e[Cr] ? x.hash : `#${r.fragmentIdentifier}`;
  }
  return `${t}${p}${h}`;
}
function se(r, e, t) {
  t = {
    parseFragmentIdentifier: !0,
    [Cr]: !1,
    ...t
  };
  const { url: n, query: o, fragmentIdentifier: p } = ie(r, t);
  return ce({
    url: n,
    query: $e(o, e),
    fragmentIdentifier: p
  }, t);
}
function Me(r, e, t) {
  const n = Array.isArray(e) ? (o) => !e.includes(o) : (o, p) => !e(o, p);
  return se(r, n, t);
}
const Xe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  exclude: Me,
  extract: Tr,
  parse: Or,
  parseUrl: ie,
  pick: se,
  stringify: oe,
  stringifyUrl: ce
}, Symbol.toStringTag, { value: "Module" })), Ve = ar.dirname(Fe(new URL(import.meta.url)));
function rt(r) {
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
  };
  r != null && (r.htmlTemplatePath != null && (e.htmlTemplatePath = r.htmlTemplatePath), r.scriptTemplatePath != null && (e.scriptTemplatePath = r.scriptTemplatePath));
  const t = (h) => {
    const x = _r(Fr(h.fullPath, "")).toString();
    h.storyId = x;
    const C = h.fullPath.replace(e.root, "");
    h.storyRelativePath = C;
    const i = Pe(
      ar.join(e.root, e.storiesCache, h.storyRelativePath)
    );
    h.storyFullPath = i, e.book[x] = h;
  }, n = () => {
    const h = Ge(ar.join(e.root, e.storiesPath));
    e.book = {};
    for (let x = 0; x < h.length; x++)
      p(h[x]) && t(
        new Br({
          fullPath: h[x],
          htmlTemplatePath: r.htmlTemplatePath,
          scriptTemplatePath: r.scriptTemplatePath
        })
      );
  }, o = (h) => {
    const x = _r(Fr(h.fullPath, "")).toString();
    e.book[x] && delete e.book[x];
  }, p = (h) => {
    const x = h.split("/").pop();
    return e.bookRegex.test(x);
  };
  return {
    name: "vite-plugin-vue-example",
    // enforce: "pre",
    // resolveId(source, importer, options) {
    //     console.log('resolveId', source, importer, options)
    //     return source
    // },
    config(h, x) {
      e.command = x.command;
    },
    configResolved(h) {
      e.command == "serve" && (e.root = h.root, n());
    },
    configureServer(h) {
      h.watcher.on("add", (x) => {
        p(x) && (h.ws.send({
          type: "full-reload"
        }), t(
          new Br({
            fullPath: x,
            htmlTemplatePath: r.htmlTemplatePath,
            scriptTemplatePath: r.scriptTemplatePath
          })
        ));
      }), h.watcher.on("unlink", (x) => {
        p(x) && (h.ws.send({
          type: "full-reload"
        }), o(
          new Br({
            fullPath: x,
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
      }), h.middlewares.use((x, C, i) => {
        const a = x.headers.host ?? "", S = /^story\./.test(a), _ = /^book\./.test(a);
        let B = "";
        const w = a.match(/^story\.([a-f0-9]{32})/);
        w && (B = w[1]), h.transformIndexHtml = (y, b, P) => new Promise((c) => {
          if (S && B != "")
            c(e.book[B].getHtml());
          else if (_) {
            const u = [], v = Object.keys(e.book);
            for (let m = 0; m < v.length; m++) {
              const F = {
                storyId: _r(
                  Fr(e.book[v[m]].fullPath, "")
                ).toString(),
                file: e.book[v[m]].storyRelativePath
              };
              u.push(F);
            }
            const g = {
              book: u
            };
            b = ur.readFileSync(
              ar.join(Ve, "../client/index.html"),
              "utf-8"
            ), b = b.replace("--json-base64--", btoa(JSON.stringify(g))), b = b.replace(
              "<!-- script -->",
              '<script type="module" src="/@vite/client"><\/script>'
            ), c(
              b.replace("--json-base64--", btoa(JSON.stringify(g)))
            );
          } else
            c(b);
        }), i();
      });
    },
    transform(h, x, C) {
      if (!x.includes("story_html_script_id"))
        return {
          code: h
        };
      const i = Be(x);
      if (!i.query)
        return {
          code: h
        };
      const a = Xe.parse(i.query);
      return a.story_html_script_id ? e.book[a.story_html_script_id] ? {
        code: e.book[a.story_html_script_id].getScript()
      } : {
        code: h
      } : {
        code: h
      };
    }
  };
}
const Ge = function(r) {
  const e = [], t = [r];
  do {
    const n = t.pop(), o = ur.lstatSync(n);
    o.isDirectory() ? ur.readdirSync(n).forEach(
      (p) => t.push(ar.join(n, p))
    ) : o.isFile() && e.push(ar.normalize(n));
  } while (t.length !== 0);
  return e;
};
class Br {
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
    var e = ur.readFileSync(this.htmlTemplatePath.fullPath, "utf-8");
    return e.replace(
      this.htmlTemplatePath.replace,
      `${this.htmlTemplatePath.replace}?story_html_script_id=${this.storyId}`
    );
  }
  getScript() {
    var e = ur.readFileSync(this.scriptTemplatePath.fullPath, "utf-8");
    return e.replace(this.scriptTemplatePath.replace, this.fullPath);
  }
}
export {
  rt as default
};
