(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/tslib/tslib.es6.mjs
  var tslib_es6_exports = {};
  __export(tslib_es6_exports, {
    __addDisposableResource: () => __addDisposableResource,
    __assign: () => __assign,
    __asyncDelegator: () => __asyncDelegator,
    __asyncGenerator: () => __asyncGenerator,
    __asyncValues: () => __asyncValues,
    __await: () => __await,
    __awaiter: () => __awaiter,
    __classPrivateFieldGet: () => __classPrivateFieldGet,
    __classPrivateFieldIn: () => __classPrivateFieldIn,
    __classPrivateFieldSet: () => __classPrivateFieldSet,
    __createBinding: () => __createBinding,
    __decorate: () => __decorate,
    __disposeResources: () => __disposeResources,
    __esDecorate: () => __esDecorate,
    __exportStar: () => __exportStar,
    __extends: () => __extends,
    __generator: () => __generator,
    __importDefault: () => __importDefault,
    __importStar: () => __importStar,
    __makeTemplateObject: () => __makeTemplateObject,
    __metadata: () => __metadata,
    __param: () => __param,
    __propKey: () => __propKey,
    __read: () => __read,
    __rest: () => __rest,
    __rewriteRelativeImportExtension: () => __rewriteRelativeImportExtension,
    __runInitializers: () => __runInitializers,
    __setFunctionName: () => __setFunctionName,
    __spread: () => __spread,
    __spreadArray: () => __spreadArray,
    __spreadArrays: () => __spreadArrays,
    __values: () => __values,
    default: () => tslib_es6_default
  });
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }
  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  }
  function __param(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  }
  function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
      if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
      return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function(f) {
        if (done) throw new TypeError("Cannot add initializers after decoration has completed");
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
        if (result === void 0) continue;
        if (result === null || typeof result !== "object") throw new TypeError("Object expected");
        if (_ = accept(result.get)) descriptor.get = _;
        if (_ = accept(result.set)) descriptor.set = _;
        if (_ = accept(result.init)) initializers.unshift(_);
      } else if (_ = accept(result)) {
        if (kind === "field") initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  }
  function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
  }
  function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
  }
  function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
  }
  function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  }
  function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  }
  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function awaitReturn(f) {
      return function(v) {
        return Promise.resolve(v).then(f, reject);
      };
    }
    function verb(n, f) {
      if (g[n]) {
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
        if (f) i[n] = f(i[n]);
      }
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  }
  function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
      throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
      return this;
    }, i;
    function verb(n, f) {
      i[n] = o[n] ? function(v) {
        return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
      } : f;
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }
  function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  }
  function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
  }
  function __importDefault(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  }
  function __classPrivateFieldGet(receiver, state2, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state2 === "function" ? receiver !== state2 || !f : !state2.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state2.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state2, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state2 === "function" ? receiver !== state2 || !f : !state2.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state2.set(receiver, value), value;
  }
  function __classPrivateFieldIn(state2, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state2 === "function" ? receiver === state2 : state2.has(receiver);
  }
  function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
      if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
      var dispose, inner;
      if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
      }
      if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
        if (async) inner = dispose;
      }
      if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
      if (inner) dispose = function() {
        try {
          inner.call(this);
        } catch (e) {
          return Promise.reject(e);
        }
      };
      env.stack.push({ value, dispose, async });
    } else if (async) {
      env.stack.push({ async: true });
    }
    return value;
  }
  function __disposeResources(env) {
    function fail(e) {
      env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r, s = 0;
    function next() {
      while (r = env.stack.pop()) {
        try {
          if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
          if (r.dispose) {
            var result = r.dispose.call(r.value);
            if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  }
  function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
        return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
      });
    }
    return path;
  }
  var extendStatics, __assign, __createBinding, __setModuleDefault, ownKeys, _SuppressedError, tslib_es6_default;
  var init_tslib_es6 = __esm({
    "node_modules/tslib/tslib.es6.mjs"() {
      extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      };
      __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };
      tslib_es6_default = {
        __extends,
        __assign,
        __rest,
        __decorate,
        __param,
        __esDecorate,
        __runInitializers,
        __propKey,
        __setFunctionName,
        __metadata,
        __awaiter,
        __generator,
        __createBinding,
        __exportStar,
        __values,
        __read,
        __spread,
        __spreadArrays,
        __spreadArray,
        __await,
        __asyncGenerator,
        __asyncDelegator,
        __asyncValues,
        __makeTemplateObject,
        __importStar,
        __importDefault,
        __classPrivateFieldGet,
        __classPrivateFieldSet,
        __classPrivateFieldIn,
        __addDisposableResource,
        __disposeResources,
        __rewriteRelativeImportExtension
      };
    }
  });

  // node_modules/@forge/bridge/out/router/targets.js
  var require_targets = __commonJS({
    "node_modules/@forge/bridge/out/router/targets.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.NavigationTarget = void 0;
      exports.NavigationTarget = {
        ContentView: "contentView",
        ContentEdit: "contentEdit",
        ContentList: "contentList",
        SpaceView: "spaceView",
        Module: "module",
        UserProfile: "userProfile",
        Dashboard: "dashboard",
        Issue: "issue",
        ProjectSettingsDetails: "projectSettingsDetails"
      };
    }
  });

  // node_modules/@forge/bridge/out/errors.js
  var require_errors = __commonJS({
    "node_modules/@forge/bridge/out/errors.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BridgeAPIError = void 0;
      var BridgeAPIError = class extends Error {
      };
      exports.BridgeAPIError = BridgeAPIError;
    }
  });

  // node_modules/@forge/bridge/out/bridge.js
  var require_bridge = __commonJS({
    "node_modules/@forge/bridge/out/bridge.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getCallBridge = void 0;
      var errors_1 = require_errors();
      function isBridgeAvailable(bridge) {
        return !!(bridge === null || bridge === void 0 ? void 0 : bridge.callBridge);
      }
      var getCallBridge = () => {
        if (!isBridgeAvailable(window.__bridge)) {
          throw new errors_1.BridgeAPIError(`
      Unable to establish a connection with the Custom UI bridge.
      If you are trying to run your app locally, Forge apps only work in the context of Atlassian products. Refer to https://go.atlassian.com/forge-tunneling-with-custom-ui for how to tunnel when using a local development server.
    `);
        }
        return window.__bridge.callBridge;
      };
      exports.getCallBridge = getCallBridge;
    }
  });

  // node_modules/@forge/bridge/out/utils/index.js
  var require_utils = __commonJS({
    "node_modules/@forge/bridge/out/utils/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.withRateLimiter = void 0;
      var errors_1 = require_errors();
      var withRateLimiter = (wrappedFn, maxOps, intervalInMs, exceededErrorMessage) => {
        let start = Date.now();
        let numOps = 0;
        return async (...args) => {
          const now = Date.now();
          const elapsed = now - start;
          if (elapsed > intervalInMs) {
            start = now;
            numOps = 0;
          }
          if (numOps >= maxOps) {
            throw new errors_1.BridgeAPIError(exceededErrorMessage || "Too many invocations.");
          }
          numOps = numOps + 1;
          return wrappedFn(...args);
        };
      };
      exports.withRateLimiter = withRateLimiter;
    }
  });

  // node_modules/@forge/bridge/out/invoke/invoke.js
  var require_invoke = __commonJS({
    "node_modules/@forge/bridge/out/invoke/invoke.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.invoke = void 0;
      var bridge_1 = require_bridge();
      var errors_1 = require_errors();
      var utils_1 = require_utils();
      var callBridge = (0, bridge_1.getCallBridge)();
      var validatePayload = (payload) => {
        if (!payload)
          return;
        if (Object.values(payload).some((val) => typeof val === "function")) {
          throw new errors_1.BridgeAPIError("Passing functions as part of the payload is not supported!");
        }
      };
      var _invoke = (functionKey, payload) => {
        if (typeof functionKey !== "string") {
          throw new errors_1.BridgeAPIError("functionKey must be a string!");
        }
        validatePayload(payload);
        return callBridge("invoke", { functionKey, payload });
      };
      exports.invoke = (0, utils_1.withRateLimiter)(_invoke, 500, 1e3 * 25, "Resolver calls are rate limited at 500req/25s");
    }
  });

  // node_modules/@forge/bridge/out/invoke/index.js
  var require_invoke2 = __commonJS({
    "node_modules/@forge/bridge/out/invoke/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      tslib_1.__exportStar(require_invoke(), exports);
    }
  });

  // node_modules/@forge/bridge/out/invoke-remote/invoke-remote.js
  var require_invoke_remote = __commonJS({
    "node_modules/@forge/bridge/out/invoke-remote/invoke-remote.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.invokeRemote = void 0;
      var bridge_1 = require_bridge();
      var errors_1 = require_errors();
      var utils_1 = require_utils();
      var MAX_NUM_OPERATIONS = 500;
      var OPERATION_INTERVAL_MS = 1e3 * 25;
      var callBridge = (0, bridge_1.getCallBridge)();
      var validatePayload = (payload) => {
        if (!payload)
          return;
        if (Object.values(payload).some((val) => typeof val === "function")) {
          throw new errors_1.BridgeAPIError("Passing functions as part of the payload is not supported!");
        }
      };
      var _invokeRemote = async (input) => {
        var _a;
        validatePayload(input);
        const { success, payload, error } = (_a = await callBridge("invoke", input)) !== null && _a !== void 0 ? _a : {};
        const response = { ...success ? payload : error };
        if (response && response.headers) {
          for (const header in response.headers) {
            if (Array.isArray(response.headers[header])) {
              response.headers[header] = response.headers[header].join(",");
            }
          }
        }
        return response;
      };
      exports.invokeRemote = (0, utils_1.withRateLimiter)(_invokeRemote, MAX_NUM_OPERATIONS, OPERATION_INTERVAL_MS, "Remote invocation calls are rate limited at 500req/25s");
    }
  });

  // node_modules/@forge/bridge/out/invoke-remote/index.js
  var require_invoke_remote2 = __commonJS({
    "node_modules/@forge/bridge/out/invoke-remote/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      tslib_1.__exportStar(require_invoke_remote(), exports);
    }
  });

  // node_modules/@forge/bridge/out/view/submit.js
  var require_submit = __commonJS({
    "node_modules/@forge/bridge/out/view/submit.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.submit = void 0;
      var bridge_1 = require_bridge();
      var errors_1 = require_errors();
      var callBridge = (0, bridge_1.getCallBridge)();
      var submit = async (payload) => {
        const success = await callBridge("submit", payload);
        if (success === false) {
          throw new errors_1.BridgeAPIError("this resource's view is not submittable.");
        }
      };
      exports.submit = submit;
    }
  });

  // node_modules/@forge/bridge/out/view/close.js
  var require_close = __commonJS({
    "node_modules/@forge/bridge/out/view/close.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.close = void 0;
      var bridge_1 = require_bridge();
      var errors_1 = require_errors();
      var callBridge = (0, bridge_1.getCallBridge)();
      var close = async (payload) => {
        try {
          const success = await callBridge("close", payload);
          if (success === false) {
            throw new errors_1.BridgeAPIError("this resource's view is not closable.");
          }
        } catch (e) {
          throw new errors_1.BridgeAPIError("this resource's view is not closable.");
        }
      };
      exports.close = close;
    }
  });

  // node_modules/@forge/bridge/out/view/refresh.js
  var require_refresh = __commonJS({
    "node_modules/@forge/bridge/out/view/refresh.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.refresh = void 0;
      var bridge_1 = require_bridge();
      var errors_1 = require_errors();
      var callBridge = (0, bridge_1.getCallBridge)();
      var refresh = async (payload) => {
        const success = await callBridge("refresh", payload);
        if (success === false) {
          throw new errors_1.BridgeAPIError("this resource's view is not refreshable.");
        }
      };
      exports.refresh = refresh;
    }
  });

  // node_modules/@forge/bridge/out/view/createHistory.js
  var require_createHistory = __commonJS({
    "node_modules/@forge/bridge/out/view/createHistory.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createHistory = void 0;
      var bridge_1 = require_bridge();
      var callBridge = (0, bridge_1.getCallBridge)();
      var createHistory = async () => {
        const history = await callBridge("createHistory");
        history.listen((location) => {
          history.location = location;
        });
        return history;
      };
      exports.createHistory = createHistory;
    }
  });

  // node_modules/@forge/i18n/out/constants.js
  var require_constants = __commonJS({
    "node_modules/@forge/i18n/out/constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FORGE_SUPPORTED_LOCALE_CODES = exports.I18N_BUNDLE_FOLDER_NAME = exports.I18N_INFO_FILE_NAME = void 0;
      exports.I18N_INFO_FILE_NAME = "i18n-info.json";
      exports.I18N_BUNDLE_FOLDER_NAME = "__LOCALES__";
      exports.FORGE_SUPPORTED_LOCALE_CODES = [
        "zh-CN",
        "zh-TW",
        "cs-CZ",
        "da-DK",
        "nl-NL",
        "en-US",
        "en-GB",
        "et-EE",
        "fi-FI",
        "fr-FR",
        "de-DE",
        "hu-HU",
        "is-IS",
        "it-IT",
        "ja-JP",
        "ko-KR",
        "no-NO",
        "pl-PL",
        "pt-BR",
        "pt-PT",
        "ro-RO",
        "ru-RU",
        "sk-SK",
        "tr-TR",
        "es-ES",
        "sv-SE"
      ];
    }
  });

  // node_modules/@forge/i18n/out/translationsGetter.js
  var require_translationsGetter = __commonJS({
    "node_modules/@forge/i18n/out/translationsGetter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TranslationsGetter = exports.TranslationGetterError = void 0;
      var pushIfNotExists = (array, item) => {
        if (!array.includes(item)) {
          array.push(item);
        }
      };
      var TranslationGetterError = class extends Error {
        constructor(message) {
          super(message);
          this.name = "TranslationGetterError";
        }
      };
      exports.TranslationGetterError = TranslationGetterError;
      var TranslationsGetter = class {
        resourcesAccessor;
        i18nInfoConfig = null;
        translationResources = /* @__PURE__ */ new Map();
        constructor(resourcesAccessor) {
          this.resourcesAccessor = resourcesAccessor;
        }
        async getTranslations(locale, options = { fallback: true }) {
          const i18nInfoConfig = await this.getI18nInfoConfig();
          const { fallback } = options;
          if (!fallback) {
            let translationResource;
            if (i18nInfoConfig.locales.includes(locale)) {
              translationResource = await this.getTranslationResource(locale);
            }
            return {
              translations: translationResource ?? null,
              locale
            };
          }
          for (const targetLocale of this.getLocaleLookupOrder(locale, i18nInfoConfig)) {
            const translationResource = await this.getTranslationResource(targetLocale);
            if (translationResource) {
              return {
                translations: translationResource,
                locale: targetLocale
              };
            }
          }
          return {
            translations: null,
            locale
          };
        }
        async getTranslationsByLocaleLookupOrder(locale) {
          const i18nInfoConfig = await this.getI18nInfoConfig();
          const lookupOrder = this.getLocaleLookupOrder(locale, i18nInfoConfig);
          return await Promise.all(lookupOrder.map(async (targetLocale) => {
            const translationResource = await this.getTranslationResource(targetLocale);
            return {
              locale: targetLocale,
              translations: translationResource
            };
          }));
        }
        reset() {
          this.i18nInfoConfig = null;
          this.translationResources.clear();
        }
        async getTranslationResource(locale) {
          let resource = this.translationResources.get(locale);
          if (!resource) {
            try {
              resource = await this.resourcesAccessor.getTranslationResource(locale);
              this.translationResources.set(locale, resource);
            } catch (error) {
              if (error instanceof TranslationGetterError) {
                throw error;
              }
              throw new TranslationGetterError(`Failed to get translation resource for locale: ${locale}`);
            }
          }
          return resource;
        }
        async getI18nInfoConfig() {
          if (!this.i18nInfoConfig) {
            try {
              this.i18nInfoConfig = await this.resourcesAccessor.getI18nInfoConfig();
            } catch (error) {
              if (error instanceof TranslationGetterError) {
                throw error;
              }
              throw new TranslationGetterError("Failed to get i18n info config");
            }
          }
          return this.i18nInfoConfig;
        }
        getLocaleLookupOrder(locale, config) {
          const { locales, fallback } = config;
          const lookupOrder = [locale];
          const fallbackLocales = fallback[locale];
          if (fallbackLocales && Array.isArray(fallbackLocales) && fallbackLocales.length > 0) {
            lookupOrder.push(...fallbackLocales);
          }
          pushIfNotExists(lookupOrder, config.fallback.default);
          return lookupOrder.filter((locale2) => locales.includes(locale2));
        }
      };
      exports.TranslationsGetter = TranslationsGetter;
    }
  });

  // node_modules/lodash/isArray.js
  var require_isArray = __commonJS({
    "node_modules/lodash/isArray.js"(exports, module) {
      var isArray = Array.isArray;
      module.exports = isArray;
    }
  });

  // node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS({
    "node_modules/lodash/_freeGlobal.js"(exports, module) {
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      module.exports = freeGlobal;
    }
  });

  // node_modules/lodash/_root.js
  var require_root = __commonJS({
    "node_modules/lodash/_root.js"(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root2 = freeGlobal || freeSelf || Function("return this")();
      module.exports = root2;
    }
  });

  // node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS({
    "node_modules/lodash/_Symbol.js"(exports, module) {
      var root2 = require_root();
      var Symbol2 = root2.Symbol;
      module.exports = Symbol2;
    }
  });

  // node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS({
    "node_modules/lodash/_getRawTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      module.exports = getRawTag;
    }
  });

  // node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS({
    "node_modules/lodash/_objectToString.js"(exports, module) {
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      module.exports = objectToString;
    }
  });

  // node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS({
    "node_modules/lodash/_baseGetTag.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var getRawTag = require_getRawTag();
      var objectToString = require_objectToString();
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      module.exports = baseGetTag;
    }
  });

  // node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS({
    "node_modules/lodash/isObjectLike.js"(exports, module) {
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      module.exports = isObjectLike;
    }
  });

  // node_modules/lodash/isSymbol.js
  var require_isSymbol = __commonJS({
    "node_modules/lodash/isSymbol.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      module.exports = isSymbol;
    }
  });

  // node_modules/lodash/_isKey.js
  var require_isKey = __commonJS({
    "node_modules/lodash/_isKey.js"(exports, module) {
      var isArray = require_isArray();
      var isSymbol = require_isSymbol();
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
      var reIsPlainProp = /^\w*$/;
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      module.exports = isKey;
    }
  });

  // node_modules/lodash/isObject.js
  var require_isObject = __commonJS({
    "node_modules/lodash/isObject.js"(exports, module) {
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      module.exports = isObject;
    }
  });

  // node_modules/lodash/isFunction.js
  var require_isFunction = __commonJS({
    "node_modules/lodash/isFunction.js"(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObject = require_isObject();
      var asyncTag = "[object AsyncFunction]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      module.exports = isFunction;
    }
  });

  // node_modules/lodash/_coreJsData.js
  var require_coreJsData = __commonJS({
    "node_modules/lodash/_coreJsData.js"(exports, module) {
      var root2 = require_root();
      var coreJsData = root2["__core-js_shared__"];
      module.exports = coreJsData;
    }
  });

  // node_modules/lodash/_isMasked.js
  var require_isMasked = __commonJS({
    "node_modules/lodash/_isMasked.js"(exports, module) {
      var coreJsData = require_coreJsData();
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      module.exports = isMasked;
    }
  });

  // node_modules/lodash/_toSource.js
  var require_toSource = __commonJS({
    "node_modules/lodash/_toSource.js"(exports, module) {
      var funcProto = Function.prototype;
      var funcToString = funcProto.toString;
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      module.exports = toSource;
    }
  });

  // node_modules/lodash/_baseIsNative.js
  var require_baseIsNative = __commonJS({
    "node_modules/lodash/_baseIsNative.js"(exports, module) {
      var isFunction = require_isFunction();
      var isMasked = require_isMasked();
      var isObject = require_isObject();
      var toSource = require_toSource();
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var reIsNative = RegExp(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      module.exports = baseIsNative;
    }
  });

  // node_modules/lodash/_getValue.js
  var require_getValue = __commonJS({
    "node_modules/lodash/_getValue.js"(exports, module) {
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      module.exports = getValue;
    }
  });

  // node_modules/lodash/_getNative.js
  var require_getNative = __commonJS({
    "node_modules/lodash/_getNative.js"(exports, module) {
      var baseIsNative = require_baseIsNative();
      var getValue = require_getValue();
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      module.exports = getNative;
    }
  });

  // node_modules/lodash/_nativeCreate.js
  var require_nativeCreate = __commonJS({
    "node_modules/lodash/_nativeCreate.js"(exports, module) {
      var getNative = require_getNative();
      var nativeCreate = getNative(Object, "create");
      module.exports = nativeCreate;
    }
  });

  // node_modules/lodash/_hashClear.js
  var require_hashClear = __commonJS({
    "node_modules/lodash/_hashClear.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      module.exports = hashClear;
    }
  });

  // node_modules/lodash/_hashDelete.js
  var require_hashDelete = __commonJS({
    "node_modules/lodash/_hashDelete.js"(exports, module) {
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      module.exports = hashDelete;
    }
  });

  // node_modules/lodash/_hashGet.js
  var require_hashGet = __commonJS({
    "node_modules/lodash/_hashGet.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      module.exports = hashGet;
    }
  });

  // node_modules/lodash/_hashHas.js
  var require_hashHas = __commonJS({
    "node_modules/lodash/_hashHas.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      module.exports = hashHas;
    }
  });

  // node_modules/lodash/_hashSet.js
  var require_hashSet = __commonJS({
    "node_modules/lodash/_hashSet.js"(exports, module) {
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      module.exports = hashSet;
    }
  });

  // node_modules/lodash/_Hash.js
  var require_Hash = __commonJS({
    "node_modules/lodash/_Hash.js"(exports, module) {
      var hashClear = require_hashClear();
      var hashDelete = require_hashDelete();
      var hashGet = require_hashGet();
      var hashHas = require_hashHas();
      var hashSet = require_hashSet();
      function Hash(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      module.exports = Hash;
    }
  });

  // node_modules/lodash/_listCacheClear.js
  var require_listCacheClear = __commonJS({
    "node_modules/lodash/_listCacheClear.js"(exports, module) {
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      module.exports = listCacheClear;
    }
  });

  // node_modules/lodash/eq.js
  var require_eq = __commonJS({
    "node_modules/lodash/eq.js"(exports, module) {
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      module.exports = eq;
    }
  });

  // node_modules/lodash/_assocIndexOf.js
  var require_assocIndexOf = __commonJS({
    "node_modules/lodash/_assocIndexOf.js"(exports, module) {
      var eq = require_eq();
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      module.exports = assocIndexOf;
    }
  });

  // node_modules/lodash/_listCacheDelete.js
  var require_listCacheDelete = __commonJS({
    "node_modules/lodash/_listCacheDelete.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      var arrayProto = Array.prototype;
      var splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index, 1);
        }
        --this.size;
        return true;
      }
      module.exports = listCacheDelete;
    }
  });

  // node_modules/lodash/_listCacheGet.js
  var require_listCacheGet = __commonJS({
    "node_modules/lodash/_listCacheGet.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? void 0 : data[index][1];
      }
      module.exports = listCacheGet;
    }
  });

  // node_modules/lodash/_listCacheHas.js
  var require_listCacheHas = __commonJS({
    "node_modules/lodash/_listCacheHas.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      module.exports = listCacheHas;
    }
  });

  // node_modules/lodash/_listCacheSet.js
  var require_listCacheSet = __commonJS({
    "node_modules/lodash/_listCacheSet.js"(exports, module) {
      var assocIndexOf = require_assocIndexOf();
      function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index][1] = value;
        }
        return this;
      }
      module.exports = listCacheSet;
    }
  });

  // node_modules/lodash/_ListCache.js
  var require_ListCache = __commonJS({
    "node_modules/lodash/_ListCache.js"(exports, module) {
      var listCacheClear = require_listCacheClear();
      var listCacheDelete = require_listCacheDelete();
      var listCacheGet = require_listCacheGet();
      var listCacheHas = require_listCacheHas();
      var listCacheSet = require_listCacheSet();
      function ListCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      module.exports = ListCache;
    }
  });

  // node_modules/lodash/_Map.js
  var require_Map = __commonJS({
    "node_modules/lodash/_Map.js"(exports, module) {
      var getNative = require_getNative();
      var root2 = require_root();
      var Map2 = getNative(root2, "Map");
      module.exports = Map2;
    }
  });

  // node_modules/lodash/_mapCacheClear.js
  var require_mapCacheClear = __commonJS({
    "node_modules/lodash/_mapCacheClear.js"(exports, module) {
      var Hash = require_Hash();
      var ListCache = require_ListCache();
      var Map2 = require_Map();
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      module.exports = mapCacheClear;
    }
  });

  // node_modules/lodash/_isKeyable.js
  var require_isKeyable = __commonJS({
    "node_modules/lodash/_isKeyable.js"(exports, module) {
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      module.exports = isKeyable;
    }
  });

  // node_modules/lodash/_getMapData.js
  var require_getMapData = __commonJS({
    "node_modules/lodash/_getMapData.js"(exports, module) {
      var isKeyable = require_isKeyable();
      function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      module.exports = getMapData;
    }
  });

  // node_modules/lodash/_mapCacheDelete.js
  var require_mapCacheDelete = __commonJS({
    "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheDelete(key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      module.exports = mapCacheDelete;
    }
  });

  // node_modules/lodash/_mapCacheGet.js
  var require_mapCacheGet = __commonJS({
    "node_modules/lodash/_mapCacheGet.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      module.exports = mapCacheGet;
    }
  });

  // node_modules/lodash/_mapCacheHas.js
  var require_mapCacheHas = __commonJS({
    "node_modules/lodash/_mapCacheHas.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      module.exports = mapCacheHas;
    }
  });

  // node_modules/lodash/_mapCacheSet.js
  var require_mapCacheSet = __commonJS({
    "node_modules/lodash/_mapCacheSet.js"(exports, module) {
      var getMapData = require_getMapData();
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      }
      module.exports = mapCacheSet;
    }
  });

  // node_modules/lodash/_MapCache.js
  var require_MapCache = __commonJS({
    "node_modules/lodash/_MapCache.js"(exports, module) {
      var mapCacheClear = require_mapCacheClear();
      var mapCacheDelete = require_mapCacheDelete();
      var mapCacheGet = require_mapCacheGet();
      var mapCacheHas = require_mapCacheHas();
      var mapCacheSet = require_mapCacheSet();
      function MapCache(entries) {
        var index = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index < length) {
          var entry = entries[index];
          this.set(entry[0], entry[1]);
        }
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      module.exports = MapCache;
    }
  });

  // node_modules/lodash/memoize.js
  var require_memoize = __commonJS({
    "node_modules/lodash/memoize.js"(exports, module) {
      var MapCache = require_MapCache();
      var FUNC_ERROR_TEXT = "Expected a function";
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
          if (cache.has(key)) {
            return cache.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache.set(key, result) || cache;
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      module.exports = memoize;
    }
  });

  // node_modules/lodash/_memoizeCapped.js
  var require_memoizeCapped = __commonJS({
    "node_modules/lodash/_memoizeCapped.js"(exports, module) {
      var memoize = require_memoize();
      var MAX_MEMOIZE_SIZE = 500;
      function memoizeCapped(func) {
        var result = memoize(func, function(key) {
          if (cache.size === MAX_MEMOIZE_SIZE) {
            cache.clear();
          }
          return key;
        });
        var cache = result.cache;
        return result;
      }
      module.exports = memoizeCapped;
    }
  });

  // node_modules/lodash/_stringToPath.js
  var require_stringToPath = __commonJS({
    "node_modules/lodash/_stringToPath.js"(exports, module) {
      var memoizeCapped = require_memoizeCapped();
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = memoizeCapped(function(string) {
        var result = [];
        if (string.charCodeAt(0) === 46) {
          result.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result;
      });
      module.exports = stringToPath;
    }
  });

  // node_modules/lodash/_arrayMap.js
  var require_arrayMap = __commonJS({
    "node_modules/lodash/_arrayMap.js"(exports, module) {
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      module.exports = arrayMap;
    }
  });

  // node_modules/lodash/_baseToString.js
  var require_baseToString = __commonJS({
    "node_modules/lodash/_baseToString.js"(exports, module) {
      var Symbol2 = require_Symbol();
      var arrayMap = require_arrayMap();
      var isArray = require_isArray();
      var isSymbol = require_isSymbol();
      var INFINITY = 1 / 0;
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      module.exports = baseToString;
    }
  });

  // node_modules/lodash/toString.js
  var require_toString = __commonJS({
    "node_modules/lodash/toString.js"(exports, module) {
      var baseToString = require_baseToString();
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      module.exports = toString;
    }
  });

  // node_modules/lodash/_castPath.js
  var require_castPath = __commonJS({
    "node_modules/lodash/_castPath.js"(exports, module) {
      var isArray = require_isArray();
      var isKey = require_isKey();
      var stringToPath = require_stringToPath();
      var toString = require_toString();
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      module.exports = castPath;
    }
  });

  // node_modules/lodash/_toKey.js
  var require_toKey = __commonJS({
    "node_modules/lodash/_toKey.js"(exports, module) {
      var isSymbol = require_isSymbol();
      var INFINITY = 1 / 0;
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      module.exports = toKey;
    }
  });

  // node_modules/lodash/_baseGet.js
  var require_baseGet = __commonJS({
    "node_modules/lodash/_baseGet.js"(exports, module) {
      var castPath = require_castPath();
      var toKey = require_toKey();
      function baseGet(object, path) {
        path = castPath(path, object);
        var index = 0, length = path.length;
        while (object != null && index < length) {
          object = object[toKey(path[index++])];
        }
        return index && index == length ? object : void 0;
      }
      module.exports = baseGet;
    }
  });

  // node_modules/lodash/get.js
  var require_get = __commonJS({
    "node_modules/lodash/get.js"(exports, module) {
      var baseGet = require_baseGet();
      function get(object, path, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path);
        return result === void 0 ? defaultValue : result;
      }
      module.exports = get;
    }
  });

  // node_modules/@forge/i18n/out/translationValueGetter.js
  var require_translationValueGetter = __commonJS({
    "node_modules/@forge/i18n/out/translationValueGetter.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getTranslationValueFromContent = exports.getTranslationValue = void 0;
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var get_1 = tslib_1.__importDefault(require_get());
      var getTranslationValue = (translationLookup, i18nKey, locale) => {
        const translation = translationLookup[locale];
        if (!translation) {
          return null;
        }
        return (0, exports.getTranslationValueFromContent)(translation, i18nKey);
      };
      exports.getTranslationValue = getTranslationValue;
      var getTranslationValueFromContent = (translationContent, i18nKey) => {
        let translationValue = translationContent[i18nKey];
        if (!translationValue) {
          const keyTokens = i18nKey.split(".");
          if (keyTokens.length > 1) {
            translationValue = (0, get_1.default)(translationContent, keyTokens, null);
          }
        }
        return typeof translationValue === "string" ? translationValue : null;
      };
      exports.getTranslationValueFromContent = getTranslationValueFromContent;
    }
  });

  // node_modules/@forge/i18n/out/translator.js
  var require_translator = __commonJS({
    "node_modules/@forge/i18n/out/translator.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Translator = void 0;
      var translationValueGetter_1 = require_translationValueGetter();
      var Translator = class {
        locale;
        translationsGetter;
        localeLookupOrderedTranslations = null;
        cache = /* @__PURE__ */ new Map();
        constructor(locale, translationsGetter) {
          this.locale = locale;
          this.translationsGetter = translationsGetter;
        }
        async init() {
          this.localeLookupOrderedTranslations = await this.translationsGetter.getTranslationsByLocaleLookupOrder(this.locale);
        }
        translate(i18nKey) {
          if (!this.localeLookupOrderedTranslations) {
            throw new Error("TranslationLookup not initialized");
          }
          let result = this.cache.get(i18nKey);
          if (result === void 0) {
            for (const { translations } of this.localeLookupOrderedTranslations) {
              const translationValue = (0, translationValueGetter_1.getTranslationValueFromContent)(translations, i18nKey);
              if (translationValue !== null) {
                result = translationValue;
                break;
              }
            }
            result = result ?? null;
            this.cache.set(i18nKey, result);
          }
          return result;
        }
      };
      exports.Translator = Translator;
    }
  });

  // node_modules/@forge/i18n/out/ensureLocale.js
  var require_ensureLocale = __commonJS({
    "node_modules/@forge/i18n/out/ensureLocale.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ensureLocale = void 0;
      var constants_1 = require_constants();
      var forgeSupportedLocaleCodesSet = new Set(constants_1.FORGE_SUPPORTED_LOCALE_CODES);
      var localeFallbacks = {
        "en-UK": "en-GB",
        "nb-NO": "no-NO"
      };
      var languageToLocaleCodeMap = constants_1.FORGE_SUPPORTED_LOCALE_CODES.reduce((agg, code) => {
        const [lng] = code.split("-");
        if (!agg[lng]) {
          agg[lng] = code;
        }
        return agg;
      }, {
        nb: "no-NO",
        pt: "pt-PT"
      });
      var ensureLocale = (rawLocale) => {
        const locale = rawLocale.replace("_", "-");
        if (forgeSupportedLocaleCodesSet.has(locale)) {
          return locale;
        }
        return languageToLocaleCodeMap[locale] ?? localeFallbacks[locale] ?? null;
      };
      exports.ensureLocale = ensureLocale;
    }
  });

  // node_modules/@forge/i18n/out/moduleI18nHelper.js
  var require_moduleI18nHelper = __commonJS({
    "node_modules/@forge/i18n/out/moduleI18nHelper.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.extractI18nPropertiesFromModules = exports.extractI18nKeysFromModules = exports.getI18nSupportedModuleEntries = void 0;
      var isObject = (value) => {
        return typeof value === "object" && value !== null && !Array.isArray(value);
      };
      var isI18nValue = (value) => {
        return typeof value?.i18n === "string";
      };
      var isConnectModuleKey = (moduleKey) => moduleKey.startsWith("connect-");
      var isCoreModuleKey = (moduleKey) => moduleKey.startsWith("core:");
      var getI18nKeysFromObject = (obj) => {
        const visited = /* @__PURE__ */ new Set();
        const visit = (value, i18nPath) => {
          if (!isObject(value) || visited.has(value)) {
            return [];
          }
          visited.add(value);
          return Object.entries(value).flatMap(([propKey, propValue]) => {
            const currentPath = [...i18nPath, propKey];
            if (isI18nValue(propValue)) {
              return [{ propertyPath: currentPath, key: propValue.i18n }];
            } else if (Array.isArray(propValue)) {
              return propValue.flatMap((item) => visit(item, currentPath));
            }
            return visit(propValue, currentPath);
          });
        };
        return visit(obj, []);
      };
      var getI18nSupportedModuleEntries = (modules) => {
        return Object.entries(modules).flatMap(([moduleKey, moduleEntries]) => {
          if (!isConnectModuleKey(moduleKey) && !isCoreModuleKey(moduleKey) && moduleEntries && Array.isArray(moduleEntries) && moduleEntries.length > 0) {
            return moduleEntries.map((moduleEntry) => [moduleEntry, moduleKey]);
          }
          return [];
        });
      };
      exports.getI18nSupportedModuleEntries = getI18nSupportedModuleEntries;
      var extractI18nKeysFromModules = (modules) => {
        const i18nKeys = /* @__PURE__ */ new Set();
        for (const moduleEntry of (0, exports.getI18nSupportedModuleEntries)(modules)) {
          const i18nKeysForEntryValue = getI18nKeysFromObject(moduleEntry[0]);
          for (const { key } of i18nKeysForEntryValue) {
            i18nKeys.add(key);
          }
        }
        return i18nKeys.size > 0 ? Array.from(i18nKeys) : [];
      };
      exports.extractI18nKeysFromModules = extractI18nKeysFromModules;
      var extractI18nPropertiesFromModules = (modules) => {
        const moduleI18nProperties = [];
        for (const moduleEntry of (0, exports.getI18nSupportedModuleEntries)(modules)) {
          const i18nKeysForEntryValue = getI18nKeysFromObject(moduleEntry[0]);
          for (const i18nObj of i18nKeysForEntryValue) {
            moduleI18nProperties.push({ moduleName: moduleEntry[1], ...i18nObj });
          }
        }
        return moduleI18nProperties;
      };
      exports.extractI18nPropertiesFromModules = extractI18nPropertiesFromModules;
    }
  });

  // node_modules/@forge/i18n/out/types.js
  var require_types = __commonJS({
    "node_modules/@forge/i18n/out/types.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // node_modules/@forge/i18n/out/index.js
  var require_out = __commonJS({
    "node_modules/@forge/i18n/out/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getI18nSupportedModuleEntries = exports.extractI18nPropertiesFromModules = exports.extractI18nKeysFromModules = exports.getTranslationValue = void 0;
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      tslib_1.__exportStar(require_constants(), exports);
      tslib_1.__exportStar(require_translationsGetter(), exports);
      tslib_1.__exportStar(require_translator(), exports);
      tslib_1.__exportStar(require_ensureLocale(), exports);
      var translationValueGetter_1 = require_translationValueGetter();
      Object.defineProperty(exports, "getTranslationValue", { enumerable: true, get: function() {
        return translationValueGetter_1.getTranslationValue;
      } });
      var moduleI18nHelper_1 = require_moduleI18nHelper();
      Object.defineProperty(exports, "extractI18nKeysFromModules", { enumerable: true, get: function() {
        return moduleI18nHelper_1.extractI18nKeysFromModules;
      } });
      Object.defineProperty(exports, "extractI18nPropertiesFromModules", { enumerable: true, get: function() {
        return moduleI18nHelper_1.extractI18nPropertiesFromModules;
      } });
      Object.defineProperty(exports, "getI18nSupportedModuleEntries", { enumerable: true, get: function() {
        return moduleI18nHelper_1.getI18nSupportedModuleEntries;
      } });
      tslib_1.__exportStar(require_types(), exports);
    }
  });

  // node_modules/@forge/bridge/out/view/getContext.js
  var require_getContext = __commonJS({
    "node_modules/@forge/bridge/out/view/getContext.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getContext = void 0;
      var bridge_1 = require_bridge();
      var i18n_1 = require_out();
      var callBridge = (0, bridge_1.getCallBridge)();
      var getContext = async () => {
        var _a;
        const context = await callBridge("getContext");
        const locale = context === null || context === void 0 ? void 0 : context.locale;
        if (locale) {
          context.locale = (_a = (0, i18n_1.ensureLocale)(locale)) !== null && _a !== void 0 ? _a : locale;
        }
        return context;
      };
      exports.getContext = getContext;
    }
  });

  // node_modules/@forge/bridge/out/view/changeWindowTitle.js
  var require_changeWindowTitle = __commonJS({
    "node_modules/@forge/bridge/out/view/changeWindowTitle.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.changeWindowTitle = void 0;
      var bridge_1 = require_bridge();
      var errors_1 = require_errors();
      var callBridge = (0, bridge_1.getCallBridge)();
      var changeWindowTitle = async (title) => {
        try {
          await callBridge("changeWindowTitle", title);
        } catch (e) {
          throw new errors_1.BridgeAPIError("the window title wasn't changed due to error.");
        }
      };
      exports.changeWindowTitle = changeWindowTitle;
    }
  });

  // node_modules/@forge/bridge/out/view/theme.js
  var require_theme = __commonJS({
    "node_modules/@forge/bridge/out/view/theme.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.theme = void 0;
      var bridge_1 = require_bridge();
      var callBridge = (0, bridge_1.getCallBridge)();
      exports.theme = {
        enable: () => callBridge("enableTheming")
      };
    }
  });

  // node_modules/@forge/bridge/out/view/view.js
  var require_view = __commonJS({
    "node_modules/@forge/bridge/out/view/view.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.view = void 0;
      var submit_1 = require_submit();
      var close_1 = require_close();
      var refresh_1 = require_refresh();
      var createHistory_1 = require_createHistory();
      var getContext_1 = require_getContext();
      var changeWindowTitle_1 = require_changeWindowTitle();
      var theme_1 = require_theme();
      exports.view = {
        submit: submit_1.submit,
        close: close_1.close,
        refresh: refresh_1.refresh,
        createHistory: createHistory_1.createHistory,
        getContext: getContext_1.getContext,
        theme: theme_1.theme,
        changeWindowTitle: changeWindowTitle_1.changeWindowTitle
      };
    }
  });

  // node_modules/@forge/bridge/out/view/index.js
  var require_view2 = __commonJS({
    "node_modules/@forge/bridge/out/view/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      tslib_1.__exportStar(require_view(), exports);
    }
  });

  // node_modules/@forge/bridge/out/router/router.js
  var require_router = __commonJS({
    "node_modules/@forge/bridge/out/router/router.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.router = void 0;
      var bridge_1 = require_bridge();
      var callBridge = (0, bridge_1.getCallBridge)();
      var navigate = async (location) => {
        if (typeof location === "string") {
          return callBridge("navigate", { url: location, type: "same-tab" });
        } else {
          if (!(location === null || location === void 0 ? void 0 : location.target)) {
            throw new Error("target is required for navigation");
          }
          return callBridge("navigate", { ...location, type: "same-tab" });
        }
      };
      var open = async (location) => {
        if (typeof location === "string") {
          return callBridge("navigate", { url: location, type: "new-tab" });
        } else {
          if (!(location === null || location === void 0 ? void 0 : location.target)) {
            throw new Error("target is required for navigation");
          }
          return callBridge("navigate", { ...location, type: "new-tab" });
        }
      };
      var reload = async () => callBridge("reload");
      exports.router = {
        navigate,
        open,
        reload
      };
    }
  });

  // node_modules/@forge/bridge/out/router/index.js
  var require_router2 = __commonJS({
    "node_modules/@forge/bridge/out/router/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      tslib_1.__exportStar(require_router(), exports);
    }
  });

  // node_modules/@forge/bridge/out/modal/modal.js
  var require_modal = __commonJS({
    "node_modules/@forge/bridge/out/modal/modal.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Modal = void 0;
      var bridge_1 = require_bridge();
      var errors_1 = require_errors();
      var callBridge = (0, bridge_1.getCallBridge)();
      var noop = () => {
      };
      var Modal = class {
        constructor(opts) {
          var _a, _b;
          this.resource = (opts === null || opts === void 0 ? void 0 : opts.resource) || null;
          this.onClose = (opts === null || opts === void 0 ? void 0 : opts.onClose) || noop;
          this.size = (opts === null || opts === void 0 ? void 0 : opts.size) || "medium";
          this.context = (opts === null || opts === void 0 ? void 0 : opts.context) || {};
          this.closeOnEscape = (_a = opts === null || opts === void 0 ? void 0 : opts.closeOnEscape) !== null && _a !== void 0 ? _a : true;
          this.closeOnOverlayClick = (_b = opts === null || opts === void 0 ? void 0 : opts.closeOnOverlayClick) !== null && _b !== void 0 ? _b : true;
        }
        async open() {
          try {
            const success = await callBridge("openModal", {
              resource: this.resource,
              onClose: this.onClose,
              size: this.size,
              context: this.context,
              closeOnEscape: this.closeOnEscape,
              closeOnOverlayClick: this.closeOnOverlayClick
            });
            if (success === false) {
              throw new errors_1.BridgeAPIError("Unable to open modal.");
            }
          } catch (err) {
            throw new errors_1.BridgeAPIError("Unable to open modal.");
          }
        }
      };
      exports.Modal = Modal;
    }
  });

  // node_modules/@forge/bridge/out/modal/index.js
  var require_modal2 = __commonJS({
    "node_modules/@forge/bridge/out/modal/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      tslib_1.__exportStar(require_modal(), exports);
    }
  });

  // node_modules/@forge/bridge/out/utils/blobParser.js
  var require_blobParser = __commonJS({
    "node_modules/@forge/bridge/out/utils/blobParser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.blobToBase64 = exports.base64ToBlob = void 0;
      var base64ToBlob = (b64string, mimeType) => {
        if (!b64string) {
          return null;
        }
        const base64Data = b64string.includes(";base64") ? b64string.split(",")[1] : b64string;
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
      };
      exports.base64ToBlob = base64ToBlob;
      var blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      };
      exports.blobToBase64 = blobToBase64;
    }
  });

  // node_modules/@forge/bridge/out/fetch/fetch.js
  var require_fetch = __commonJS({
    "node_modules/@forge/bridge/out/fetch/fetch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.productFetchApi = void 0;
      var blobParser_1 = require_blobParser();
      var parseFormData = async (form) => {
        const parsed = {};
        for (const [key, value] of form.entries()) {
          if (key === "file") {
            const fileName = value.name;
            const fileType = value.type;
            parsed["file"] = await (0, blobParser_1.blobToBase64)(value);
            parsed["__fileName"] = fileName;
            parsed["__fileType"] = fileType;
          } else {
            parsed[key] = value;
          }
        }
        return JSON.stringify(parsed);
      };
      var parseRequest = async (init) => {
        const isFormData = (init === null || init === void 0 ? void 0 : init.body) instanceof FormData ? true : false;
        const requestBody = isFormData ? await parseFormData(init === null || init === void 0 ? void 0 : init.body) : init === null || init === void 0 ? void 0 : init.body;
        const req = new Request("", { body: requestBody, method: init === null || init === void 0 ? void 0 : init.method, headers: init === null || init === void 0 ? void 0 : init.headers });
        const headers = Object.fromEntries(req.headers.entries());
        const body = req.method !== "GET" ? await req.text() : null;
        return {
          body,
          headers: new Headers(headers),
          isMultipartFormData: isFormData
        };
      };
      var productFetchApi = (callBridge) => {
        const fetch2 = async (product, restPath, init) => {
          const { body: requestBody, headers: requestHeaders, isMultipartFormData } = await parseRequest(init);
          if (!requestHeaders.has("X-Atlassian-Token")) {
            requestHeaders.set("X-Atlassian-Token", "no-check");
          }
          const fetchPayload = {
            product,
            restPath,
            fetchRequestInit: {
              ...init,
              body: requestBody,
              headers: [...requestHeaders.entries()]
            },
            isMultipartFormData
          };
          const { body, headers, statusText, status, isAttachment } = await callBridge("fetchProduct", fetchPayload);
          const responseBody = isAttachment ? (0, blobParser_1.base64ToBlob)(body, headers["content-type"]) : body;
          return new Response(responseBody || null, { headers, status, statusText });
        };
        return {
          requestConfluence: (restPath, fetchOptions) => fetch2("confluence", restPath, fetchOptions),
          requestJira: (restPath, fetchOptions) => fetch2("jira", restPath, fetchOptions),
          requestBitbucket: (restPath, fetchOptions) => fetch2("bitbucket", restPath, fetchOptions)
        };
      };
      exports.productFetchApi = productFetchApi;
    }
  });

  // node_modules/@forge/bridge/out/fetch/index.js
  var require_fetch2 = __commonJS({
    "node_modules/@forge/bridge/out/fetch/index.js"(exports) {
      "use strict";
      var _a;
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.requestBitbucket = exports.requestJira = exports.requestConfluence = void 0;
      var bridge_1 = require_bridge();
      var fetch_1 = require_fetch();
      _a = (0, fetch_1.productFetchApi)((0, bridge_1.getCallBridge)()), exports.requestConfluence = _a.requestConfluence, exports.requestJira = _a.requestJira, exports.requestBitbucket = _a.requestBitbucket;
    }
  });

  // node_modules/@forge/bridge/out/flag/flag.js
  var require_flag = __commonJS({
    "node_modules/@forge/bridge/out/flag/flag.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.showFlag = void 0;
      var bridge_1 = require_bridge();
      var errors_1 = require_errors();
      var callBridge = (0, bridge_1.getCallBridge)();
      var showFlag = (options) => {
        var _a;
        if (!options.id) {
          throw new errors_1.BridgeAPIError('"id" must be defined in flag options');
        }
        const result = callBridge("showFlag", {
          ...options,
          type: (_a = options.type) !== null && _a !== void 0 ? _a : "info"
        });
        return {
          close: async () => {
            await result;
            return callBridge("closeFlag", { id: options.id });
          }
        };
      };
      exports.showFlag = showFlag;
    }
  });

  // node_modules/@forge/bridge/out/flag/index.js
  var require_flag2 = __commonJS({
    "node_modules/@forge/bridge/out/flag/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.showFlag = void 0;
      var flag_1 = require_flag();
      Object.defineProperty(exports, "showFlag", { enumerable: true, get: function() {
        return flag_1.showFlag;
      } });
    }
  });

  // node_modules/@forge/bridge/out/events/events.js
  var require_events = __commonJS({
    "node_modules/@forge/bridge/out/events/events.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.events = void 0;
      var bridge_1 = require_bridge();
      var callBridge = (0, bridge_1.getCallBridge)();
      var emit = (event, payload) => {
        return callBridge("emit", { event, payload });
      };
      var on = (event, callback) => {
        return callBridge("on", { event, callback });
      };
      exports.events = {
        emit,
        on
      };
    }
  });

  // node_modules/@forge/bridge/out/events/index.js
  var require_events2 = __commonJS({
    "node_modules/@forge/bridge/out/events/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      tslib_1.__exportStar(require_events(), exports);
    }
  });

  // node_modules/@forge/bridge/out/i18n/index.js
  var require_i18n = __commonJS({
    "node_modules/@forge/bridge/out/i18n/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createTranslationFunction = exports.getTranslations = exports.resetTranslationsCache = void 0;
      var i18n_1 = require_out();
      var view_1 = require_view2();
      var frontendResourcesAccessor = {
        getI18nInfoConfig: async () => {
          const resp = await fetch(`./${i18n_1.I18N_BUNDLE_FOLDER_NAME}/${i18n_1.I18N_INFO_FILE_NAME}`);
          if (!resp.ok) {
            throw new Error("Failed to get i18n info config: " + resp.statusText);
          }
          const info = await resp.json();
          return info.config;
        },
        getTranslationResource: async (locale) => {
          const resp = await fetch(`./${i18n_1.I18N_BUNDLE_FOLDER_NAME}/${locale}.json`);
          if (!resp.ok) {
            throw new Error(`Failed to get translation resource for locale: ${locale}`);
          }
          return resp.json();
        }
      };
      var translationsGetter = new i18n_1.TranslationsGetter(frontendResourcesAccessor);
      var resetTranslationsCache = () => {
        translationsGetter.reset();
      };
      exports.resetTranslationsCache = resetTranslationsCache;
      var getTranslations = async (locale = null, options = {
        fallback: true
      }) => {
        let targetLocale = locale;
        if (!targetLocale) {
          const context = await view_1.view.getContext();
          targetLocale = context.locale;
        }
        return await translationsGetter.getTranslations(targetLocale, options);
      };
      exports.getTranslations = getTranslations;
      var createTranslationFunction = async (locale = null) => {
        let targetLocale = locale;
        if (!targetLocale) {
          const context = await view_1.view.getContext();
          targetLocale = context.locale;
        }
        const translator = new i18n_1.Translator(targetLocale, translationsGetter);
        await translator.init();
        return (i18nKey, defaultValue) => {
          var _a, _b;
          return (_b = (_a = translator.translate(i18nKey)) !== null && _a !== void 0 ? _a : defaultValue) !== null && _b !== void 0 ? _b : i18nKey;
        };
      };
      exports.createTranslationFunction = createTranslationFunction;
    }
  });

  // node_modules/@forge/bridge/out/index.js
  var require_out2 = __commonJS({
    "node_modules/@forge/bridge/out/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.i18n = exports.NavigationTarget = void 0;
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var targets_1 = require_targets();
      Object.defineProperty(exports, "NavigationTarget", { enumerable: true, get: function() {
        return targets_1.NavigationTarget;
      } });
      tslib_1.__exportStar(require_invoke2(), exports);
      tslib_1.__exportStar(require_invoke_remote2(), exports);
      tslib_1.__exportStar(require_view2(), exports);
      tslib_1.__exportStar(require_router2(), exports);
      tslib_1.__exportStar(require_modal2(), exports);
      tslib_1.__exportStar(require_fetch2(), exports);
      tslib_1.__exportStar(require_flag2(), exports);
      tslib_1.__exportStar(require_events2(), exports);
      exports.i18n = tslib_1.__importStar(require_i18n());
    }
  });

  // src/app.js
  var import_bridge = __toESM(require_out2());
  function openIssue(key) {
    if (!key) return;
    import_bridge.router.open(`/browse/${key}`);
  }
  var ZOOM = {
    week: { w: 34, label: "\uC8FC" },
    month: { w: 12, label: "\uAC1C\uC6D4" },
    quarter: { w: 5, label: "\uBD84\uAE30" }
  };
  var pad = (n) => String(n).padStart(2, "0");
  var fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  var parse = (s) => {
    const [y, m, d] = s.split("-").map(Number);
    return new Date(y, m - 1, d);
  };
  var addDays = (d, n) => {
    const c = new Date(d);
    c.setDate(c.getDate() + n);
    return c;
  };
  var dayDiff = (a, b) => Math.round((parse(b) - parse(a)) / 864e5);
  var todayStr = () => fmt(/* @__PURE__ */ new Date());
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  var state = {
    projectKey: null,
    filters: [],
    assignees: [],
    // 프로젝트 배정 가능 사용자 [{id, name}]
    selectedFilterId: "",
    customJql: "",
    zoom: "week",
    zoomScale: 1,
    // 확대/축소 배율 (+/- 버튼, 0.4~4)
    view: "tree",
    // 그룹화: flat | assignee | epic | tree | priority | type | label | duebucket
    sorts: [{ key: "duedate", dir: "asc" }],
    // 다단계 정렬(위에서부터 우선)
    sortOpen: false,
    // 정렬 패널 열림
    assigneeIds: [],
    // 선택된 담당자 accountId 배열
    includeUnassigned: false,
    // '할당되지 않음' 포함 여부
    statusCats: [],
    // 상태 범주 필터 (빈 배열=전체). 'new'|'indeterminate'|'done'
    priorityFilter: [],
    // 우선순위 이름 배열(빈=전체)
    typeFilter: [],
    // 이슈유형 이름 배열(빈=전체)
    labelFilter: [],
    // 라벨 배열(빈=전체)
    overdueOnly: false,
    // 지연(마감 지남 & 미완료)만
    mineOnly: false,
    // 내 이슈만
    myAccountId: null,
    // 현재 사용자 accountId
    advOpen: false,
    // 고급 필터 패널 열림 상태
    layout: "gantt",
    // gantt | table
    showVersions: true,
    // 버전(마일스톤) 수직선 표시
    versions: [],
    // 프로젝트 버전 [{name, releaseDate, released}]
    presets: {},
    // 보기 프리셋 { name: config }
    tableColW: {},
    // 표 뷰 컬럼 너비 오버라이드 { colKey: px }
    title: "\uB2F9\uC2E0\uC758 \uD0C0\uC784\uB77C\uC778",
    collapsed: {},
    // { epicKey: true } 접힘 상태
    data: null,
    // 마지막 로드 결과 { issues, startFieldId, rangeStart, totalDays }
    holidays: {},
    custom: {},
    colors: {},
    // { issueKey: '#hex' } 사용자 지정 이슈 색상
    licensed: true
    // 라이선스 보유 여부(읽기 허용/쓰기 차단 게이트). undefined(개발/미등록)는 true로 간주
  };
  var LISTING_URL = "https://marketplace.atlassian.com/";
  var root = () => document.getElementById("root");
  var colW = () => Math.max(2, Math.round(ZOOM[state.zoom].w * state.zoomScale));
  var ZOOM_MIN = 0.4;
  var ZOOM_MAX = 4;
  async function main() {
    try {
      const context = await import_bridge.view.getContext();
      state.projectKey = context?.extension?.project?.key || context?.extension?.project?.id;
      state.myAccountId = context?.accountId || null;
      state.licensed = !context?.license || context.license.active === true;
      const [{ filters }, { title }, asg, col, ver, pre] = await Promise.all([
        (0, import_bridge.invoke)("listFilters"),
        (0, import_bridge.invoke)("getTitle"),
        (0, import_bridge.invoke)("listAssignees", { projectKey: state.projectKey }),
        (0, import_bridge.invoke)("getIssueColors"),
        (0, import_bridge.invoke)("listVersions", { projectKey: state.projectKey }),
        (0, import_bridge.invoke)("getPresets")
      ]);
      state.filters = filters || [];
      state.title = title || "\uB2F9\uC2E0\uC758 \uD0C0\uC784\uB77C\uC778";
      state.assignees = asg && asg.assignees || [];
      state.colors = col && col.colors || {};
      state.versions = ver && ver.versions || [];
      state.presets = pre && pre.presets || {};
      await loadAll();
    } catch (e) {
      root().innerHTML = `<div class="error">\uC624\uB958: ${e.message || e}</div>`;
    }
  }
  var loadingEl = null;
  function showLoading() {
    if (loadingEl) return;
    loadingEl = el("div", "load-overlay");
    loadingEl.appendChild(el("div", "load-spinner"));
    document.body.appendChild(loadingEl);
  }
  function hideLoading() {
    if (loadingEl) {
      loadingEl.remove();
      loadingEl = null;
    }
  }
  async function loadAll() {
    showLoading();
    try {
      await loadAllInner();
    } finally {
      hideLoading();
    }
  }
  async function loadAllInner() {
    let jql = state.customJql.trim();
    if (!jql && state.selectedFilterId) {
      jql = `filter = ${state.selectedFilterId}`;
    }
    const { issues, startFieldId, truncated, error: issueErr } = await (0, import_bridge.invoke)("getIssues", {
      projectKey: state.projectKey,
      jql: jql || void 0,
      assignees: state.assigneeIds,
      includeUnassigned: state.includeUnassigned
    });
    if (issueErr) throw new Error(issueErr);
    if (!issues || issues.length === 0) {
      state.data = { issues: [], startFieldId, truncated: false };
      render();
      return;
    }
    let min = null, max = null;
    for (const it of issues) {
      const s = it.start || it.due;
      const e = it.due || it.start;
      if (!s || !e) continue;
      if (!min || s < min) min = s;
      if (!max || e > max) max = e;
    }
    const today = todayStr();
    if (today < min) min = today;
    if (today > max) max = today;
    const rangeStart = fmt(addDays(parse(min), -7));
    const rangeEnd = fmt(addDays(parse(max), 7));
    const totalDays = dayDiff(rangeStart, rangeEnd) + 1;
    const fromYear = Number(rangeStart.slice(0, 4));
    const toYear = Number(rangeEnd.slice(0, 4));
    state.data = { issues, startFieldId, rangeStart, totalDays, truncated: !!truncated };
    const { holidays, custom, error: holErr } = await (0, import_bridge.invoke)("getHolidays", { fromYear, toYear });
    if (holErr) console.warn("\uD734\uC77C \uC870\uD68C \uACBD\uACE0:", holErr);
    state.holidays = holidays || {};
    state.custom = custom || {};
    render(true);
  }
  function collectAssignees() {
    const issues = state.data && state.data.issues || [];
    const map = /* @__PURE__ */ new Map();
    let unassigned = false;
    for (const it of issues) {
      if (it.assigneeId) map.set(it.assigneeId, it.assigneeName || it.assigneeId);
      else unassigned = true;
    }
    const list = [...map.entries()].map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
    if (unassigned) list.push({ id: "__unassigned__", name: "\uBBF8\uC9C0\uC815" });
    return list;
  }
  function assigneeLabel() {
    const n = state.assigneeIds.length + (state.includeUnassigned ? 1 : 0);
    if (n === 0) return "\uB2F4\uB2F9\uC790: \uC804\uCCB4";
    if (state.assigneeIds.length === 1 && !state.includeUnassigned) {
      const a = state.assignees.find((x) => x.id === state.assigneeIds[0]);
      return `\uB2F4\uB2F9\uC790: ${a ? a.name : "1\uBA85"}`;
    }
    if (state.assigneeIds.length === 0 && state.includeUnassigned) return "\uB2F4\uB2F9\uC790: \uD560\uB2F9\uB418\uC9C0 \uC54A\uC74C";
    return `\uB2F4\uB2F9\uC790: ${n}\uBA85`;
  }
  function renderAssigneePicker() {
    const wrap = el("div", "asg-wrap");
    const btn = el("button", "asg-btn");
    btn.appendChild(el("span", "asg-btn-label", assigneeLabel()));
    btn.appendChild(el("span", "asg-caret", "\u25BE"));
    wrap.appendChild(btn);
    const pop = el("div", "asg-pop");
    pop.style.display = "none";
    wrap.appendChild(pop);
    const search = el("input", "asg-search");
    search.type = "text";
    search.placeholder = "\uB2F4\uB2F9\uC790 \uAC80\uC0C9";
    pop.appendChild(search);
    const list = el("div", "asg-list");
    pop.appendChild(list);
    const selIds = new Set(state.assigneeIds);
    let selUn = state.includeUnassigned;
    const users = state.assignees.length ? state.assignees : collectAssignees().filter((a) => a.id !== "__unassigned__");
    const checkRow = (checked, label, onToggle) => {
      const row = el("label", "asg-row");
      const cb = el("input");
      cb.type = "checkbox";
      cb.checked = checked;
      cb.onchange = () => onToggle(cb.checked);
      row.appendChild(cb);
      row.appendChild(el("span", "asg-name", label));
      return row;
    };
    const buildList = () => {
      list.innerHTML = "";
      const q = search.value.trim().toLowerCase();
      if (!q || "\uD560\uB2F9\uB418\uC9C0 \uC54A\uC74C".includes(q) || "unassigned".includes(q)) {
        list.appendChild(checkRow(selUn, "\uD560\uB2F9\uB418\uC9C0 \uC54A\uC74C", (v) => {
          selUn = v;
        }));
      }
      let shown = 0;
      for (const a of users) {
        if (q && !a.name.toLowerCase().includes(q)) continue;
        list.appendChild(checkRow(selIds.has(a.id), a.name, (v) => {
          v ? selIds.add(a.id) : selIds.delete(a.id);
        }));
        if (++shown >= 100) break;
      }
      if (shown === 0 && q) list.appendChild(el("div", "asg-empty", "\uAC80\uC0C9 \uACB0\uACFC \uC5C6\uC74C"));
    };
    search.oninput = buildList;
    buildList();
    const foot = el("div", "asg-foot");
    const clearBtn = el("button", "asg-clear", "\uC120\uD0DD \uC9C0\uC6B0\uAE30");
    clearBtn.onclick = () => {
      selIds.clear();
      selUn = false;
      buildList();
    };
    const applyBtn = el("button", "asg-apply primary", "\uC801\uC6A9");
    foot.append(clearBtn, applyBtn);
    pop.appendChild(foot);
    const apply = async () => {
      const newIds = [...selIds];
      const changed = selUn !== state.includeUnassigned || newIds.length !== state.assigneeIds.length || newIds.some((id) => !state.assigneeIds.includes(id));
      closePop();
      if (!changed) return;
      state.assigneeIds = newIds;
      state.includeUnassigned = selUn;
      try {
        await loadAll();
      } catch (e) {
        showError(e);
      }
    };
    applyBtn.onclick = apply;
    const onDocDown = (ev) => {
      if (!wrap.contains(ev.target)) closePop();
    };
    function openPop() {
      pop.style.display = "block";
      document.addEventListener("mousedown", onDocDown);
      setTimeout(() => search.focus(), 0);
    }
    function closePop() {
      pop.style.display = "none";
      document.removeEventListener("mousedown", onDocDown);
    }
    btn.onclick = () => {
      pop.style.display === "none" ? openPop() : closePop();
    };
    return wrap;
  }
  var STATUS_CATS = [
    { key: "new", label: "\uD574\uC57C \uD560 \uC77C" },
    { key: "indeterminate", label: "\uC9C4\uD589 \uC911" },
    { key: "done", label: "\uC644\uB8CC" }
  ];
  function statusFiltered(issues) {
    const today = todayStr();
    return issues.filter((it) => {
      if (state.statusCats.length && !state.statusCats.includes(it.statusCategory)) return false;
      if (state.priorityFilter.length && !state.priorityFilter.includes(it.priority)) return false;
      if (state.typeFilter.length && !state.typeFilter.includes(it.type)) return false;
      if (state.labelFilter.length && !(it.labels || []).some((l) => state.labelFilter.includes(l))) return false;
      if (state.overdueOnly && !(it.due && it.due < today && it.statusCategory !== "done")) return false;
      if (state.mineOnly && it.assigneeId !== state.myAccountId) return false;
      return true;
    });
  }
  var PRIORITY_RANK = { Highest: 5, High: 4, Medium: 3, Low: 2, Lowest: 1 };
  var SORT_FIELDS = [
    ["duedate", "\uB9C8\uAC10\uC77C"],
    ["start", "\uC2DC\uC791\uC77C"],
    ["priority", "\uC6B0\uC120\uC21C\uC704"],
    ["created", "\uC0DD\uC131\uC77C"],
    ["key", "\uD0A4"]
  ];
  function sortVal(it, key) {
    switch (key) {
      case "start":
        return it.start || it.due || "";
      case "created":
        return it.created || "";
      case "key":
        return it.key;
      case "priority":
        return PRIORITY_RANK[it.priority] || 0;
      case "duedate":
      default:
        return it.due || it.start || "";
    }
  }
  function sortIssues(issues) {
    const sorts = state.sorts.length ? state.sorts : [{ key: "duedate", dir: "asc" }];
    return [...issues].sort((a, b) => {
      for (const s of sorts) {
        const dir = s.dir === "desc" ? -1 : 1;
        const va = sortVal(a, s.key), vb = sortVal(b, s.key);
        if (va < vb) return -1 * dir;
        if (va > vb) return 1 * dir;
      }
      return 0;
    });
  }
  function groupByField(issues, keyFn, nameFn, prefix, noneLabel) {
    const map = /* @__PURE__ */ new Map();
    for (const it of issues) {
      const k = keyFn(it) || "__none__";
      if (!map.has(k)) map.set(k, { id: `${prefix}:${k}`, name: k === "__none__" ? noneLabel : nameFn(it), issues: [] });
      map.get(k).issues.push(it);
    }
    return [...map.values()];
  }
  function groupByPriority(issues) {
    const g = groupByField(issues, (it) => it.priority, (it) => it.priority, "pri", "\uC6B0\uC120\uC21C\uC704 \uC5C6\uC74C");
    return g.sort((a, b) => (PRIORITY_RANK[b.name] || 0) - (PRIORITY_RANK[a.name] || 0));
  }
  function groupByType(issues) {
    return groupByField(issues, (it) => it.type, (it) => it.type, "type", "\uC720\uD615 \uC5C6\uC74C").sort((a, b) => a.name.localeCompare(b.name));
  }
  function groupByLabel(issues) {
    const map = /* @__PURE__ */ new Map();
    for (const it of issues) {
      const labels = it.labels && it.labels.length ? it.labels : ["__none__"];
      for (const l of labels) {
        if (!map.has(l)) map.set(l, { id: `lbl:${l}`, name: l === "__none__" ? "\uB77C\uBCA8 \uC5C6\uC74C" : l, issues: [] });
        map.get(l).issues.push(it);
      }
    }
    return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
  }
  function groupByDueBucket(issues) {
    const today = parse(todayStr());
    const endOfWeek = addDays(today, 7 - (today.getDay() || 7) + 1);
    const buckets = [
      { id: "due:overdue", name: "\uC9C0\uC5F0", issues: [], test: (it) => it.due && it.statusCategory !== "done" && parse(it.due) < today },
      { id: "due:today", name: "\uC624\uB298", issues: [], test: (it) => it.due === todayStr() },
      { id: "due:week", name: "\uC774\uBC88 \uC8FC", issues: [], test: (it) => it.due && parse(it.due) > today && parse(it.due) <= endOfWeek },
      { id: "due:later", name: "\uC774\uD6C4", issues: [], test: (it) => it.due && parse(it.due) > endOfWeek },
      { id: "due:none", name: "\uB9C8\uAC10\uC77C \uC5C6\uC74C", issues: [], test: () => true }
    ];
    for (const it of issues) {
      const b = buckets.find((x) => x.test(it));
      (b || buckets[buckets.length - 1]).issues.push(it);
    }
    return buckets.filter((b) => b.issues.length).map(({ id, name, issues: issues2 }) => ({ id, name, issues: issues2 }));
  }
  function renderStatusPicker() {
    const wrap = el("div", "asg-wrap");
    const btn = el("button", "asg-btn");
    const n = state.statusCats.length;
    const label = n === 0 ? "\uC0C1\uD0DC \uBC94\uC8FC: \uC804\uCCB4" : n === 1 ? `\uC0C1\uD0DC: ${(STATUS_CATS.find((c) => c.key === state.statusCats[0]) || {}).label}` : `\uC0C1\uD0DC: ${n}\uAC1C`;
    btn.appendChild(el("span", "asg-btn-label", label));
    btn.appendChild(el("span", "asg-caret", "\u25BE"));
    wrap.appendChild(btn);
    const pop = el("div", "asg-pop");
    pop.style.display = "none";
    wrap.appendChild(pop);
    const list = el("div", "asg-list");
    const sel = new Set(state.statusCats);
    for (const c of STATUS_CATS) {
      const row = el("label", "asg-row");
      const cb = el("input");
      cb.type = "checkbox";
      cb.checked = sel.has(c.key);
      cb.onchange = () => {
        cb.checked ? sel.add(c.key) : sel.delete(c.key);
      };
      row.appendChild(cb);
      const badge = el("span", "st-badge st-" + c.key, c.label);
      row.appendChild(badge);
      list.appendChild(row);
    }
    pop.appendChild(list);
    const foot = el("div", "asg-foot");
    const clearBtn = el("button", "asg-clear", "\uC120\uD0DD \uC9C0\uC6B0\uAE30");
    clearBtn.onclick = () => {
      sel.clear();
      for (const r of list.querySelectorAll("input")) r.checked = false;
    };
    const applyBtn = el("button", "asg-apply primary", "\uC801\uC6A9");
    foot.append(clearBtn, applyBtn);
    pop.appendChild(foot);
    const onDocDown = (ev) => {
      if (!wrap.contains(ev.target)) closePop();
    };
    function closePop() {
      pop.style.display = "none";
      document.removeEventListener("mousedown", onDocDown);
    }
    function openPop() {
      pop.style.display = "block";
      document.addEventListener("mousedown", onDocDown);
    }
    applyBtn.onclick = () => {
      const next = STATUS_CATS.map((c) => c.key).filter((k) => sel.has(k));
      closePop();
      const changed = next.length !== state.statusCats.length || next.some((k) => !state.statusCats.includes(k));
      if (!changed) return;
      state.statusCats = next;
      render();
    };
    btn.onclick = () => {
      pop.style.display === "none" ? openPop() : closePop();
    };
    return wrap;
  }
  function dayMeta(dateStr) {
    const dow = parse(dateStr).getDay();
    const isWeekend = dow === 0 || dow === 6;
    const holidayName = state.holidays[dateStr];
    return { isWeekend, holidayName, dow };
  }
  function renderToolbar() {
    const toolbar = el("div", "toolbar");
    const left = el("div", "tb-group tb-left");
    const right = el("div", "tb-group tb-right");
    toolbar.append(left, right);
    const titleEl = el("strong", "page-title", state.title);
    titleEl.title = "\uD074\uB9AD\uD558\uC5EC \uC81C\uBAA9 \uD3B8\uC9D1";
    titleEl.onclick = () => startEditTitle(titleEl);
    left.appendChild(titleEl);
    const sel = el("select");
    sel.appendChild(new Option("\uD504\uB85C\uC81D\uD2B8 \uC804\uCCB4", ""));
    for (const f of state.filters) {
      const opt = new Option(f.name, String(f.id));
      if (String(f.id) === String(state.selectedFilterId)) opt.selected = true;
      sel.appendChild(opt);
    }
    sel.onchange = async () => {
      state.selectedFilterId = sel.value;
      state.customJql = "";
      state.assigneeIds = [];
      state.includeUnassigned = false;
      state.statusCats = [];
      try {
        await loadAll();
      } catch (e) {
        showError(e);
      }
    };
    left.appendChild(sel);
    const jqlInput = el("textarea");
    jqlInput.className = "jql";
    jqlInput.rows = 1;
    jqlInput.placeholder = "JQL \uC9C1\uC811 \uC785\uB825 (Enter \uC2E4\uD589, Shift+Enter \uC904\uBC14\uAFC8)";
    jqlInput.value = state.customJql;
    const autoGrow = () => {
      const lines = jqlInput.value.split("\n");
      const longest = lines.reduce((a, b) => b.length > a.length ? b : a, "");
      const ch = Math.max(longest.length, jqlInput.placeholder.length);
      const w = Math.min(720, Math.max(240, ch * 7.3 + 24));
      jqlInput.style.width = w + "px";
      jqlInput.style.height = "auto";
      jqlInput.style.height = jqlInput.scrollHeight + "px";
    };
    jqlInput.oninput = () => {
      state.customJql = jqlInput.value;
      autoGrow();
    };
    jqlInput.onkeydown = async (ev) => {
      if (ev.key === "Enter" && !ev.shiftKey) {
        ev.preventDefault();
        state.customJql = jqlInput.value;
        state.selectedFilterId = "";
        state.assigneeIds = [];
        state.includeUnassigned = false;
        try {
          await loadAll();
        } catch (e) {
          showError(e);
        }
      }
    };
    left.appendChild(jqlInput);
    setTimeout(autoGrow, 0);
    const saveFilterBtn = el("button", null, "\uD544\uD130 \uC800\uC7A5");
    saveFilterBtn.id = "save-filter-btn";
    saveFilterBtn.title = "\uD604\uC7AC JQL\uC744 Jira \uC800\uC7A5 \uD544\uD130\uB85C \uB9CC\uB4E4\uAE30";
    left.appendChild(saveFilterBtn);
    left.appendChild(renderAssigneePicker());
    left.appendChild(renderStatusPicker());
    const advN = state.priorityFilter.length + state.typeFilter.length + state.labelFilter.length + (state.overdueOnly ? 1 : 0) + (state.mineOnly ? 1 : 0);
    const advBtn = el("button", "tb-adv" + (advN ? " active" : ""), advN ? `\uACE0\uAE09 \uD544\uD130 (${advN})` : "\uACE0\uAE09 \uD544\uD130");
    advBtn.onclick = () => {
      state.advOpen = !state.advOpen;
      render();
    };
    left.appendChild(advBtn);
    const d = state.data;
    if (d && d.issues) {
      const total = d.issues.length;
      const sh = statusFiltered(d.issues);
      const doneN = sh.filter((i) => i.statusCategory === "done").length;
      const donePct = sh.length ? Math.round(doneN / sh.length * 100) : 0;
      const tdy = todayStr();
      const overdueN = sh.filter((i) => i.due && i.due < tdy && i.statusCategory !== "done").length;
      const cntText = (sh.length === total ? `${total}\uAC74` : `${sh.length}/${total}\uAC74`) + ` \xB7 \uC644\uB8CC ${donePct}%` + (overdueN ? ` \xB7 \uC9C0\uC5F0 ${overdueN}` : "");
      const cnt = el("div", "tb-count", cntText);
      if (d.truncated) {
        const w = el("span", "tb-warn", " \u26A0 1000+");
        w.title = "\uC774\uC288\uAC00 1000\uAC74\uC744 \uCD08\uACFC\uD574 \uC77C\uBD80\uB9CC \uD45C\uC2DC\uB429\uB2C8\uB2E4. JQL/\uD544\uD130\uB85C \uBC94\uC704\uB97C \uC881\uD600 \uC8FC\uC138\uC694.";
        cnt.appendChild(w);
      }
      left.appendChild(cnt);
    }
    if (state.customJql || state.selectedFilterId || state.assigneeIds.length || state.includeUnassigned || state.statusCats.length) {
      const resetBtn = el("button", "tb-reset", "\uD544\uD130 \uCD08\uAE30\uD654");
      resetBtn.onclick = async () => {
        state.customJql = "";
        state.selectedFilterId = "";
        state.assigneeIds = [];
        state.includeUnassigned = false;
        state.statusCats = [];
        try {
          await loadAll();
        } catch (e) {
          showError(e);
        }
      };
      left.appendChild(resetBtn);
    }
    const gantt = state.layout === "gantt";
    const layoutBtn = el("button", null, gantt ? "\uD45C \uBCF4\uAE30" : "\uAC04\uD2B8 \uBCF4\uAE30");
    layoutBtn.title = "\uAC04\uD2B8 \u2194 \uD45C \uC804\uD658";
    layoutBtn.onclick = () => {
      state.layout = gantt ? "table" : "gantt";
      render(true);
    };
    right.appendChild(layoutBtn);
    if (gantt) {
      const viewSel = el("select");
      viewSel.title = "\uADF8\uB8F9\uD654 \uAE30\uC900";
      for (const [val, label] of [
        ["flat", "\uADF8\uB8F9: \uC5C6\uC74C"],
        ["assignee", "\uADF8\uB8F9: \uB2F4\uB2F9\uC790"],
        ["epic", "\uADF8\uB8F9: \uC5D0\uD53D"],
        ["tree", "\uADF8\uB8F9: \uD558\uC704 \uC791\uC5C5"],
        ["priority", "\uADF8\uB8F9: \uC6B0\uC120\uC21C\uC704"],
        ["type", "\uADF8\uB8F9: \uC720\uD615"],
        ["label", "\uADF8\uB8F9: \uB77C\uBCA8"],
        ["duebucket", "\uADF8\uB8F9: \uB9C8\uAC10 \uC2DC\uAE30"]
      ]) {
        const opt = new Option(label, val);
        if (state.view === val) opt.selected = true;
        viewSel.appendChild(opt);
      }
      viewSel.onchange = () => {
        state.view = viewSel.value;
        render();
      };
      right.appendChild(viewSel);
    }
    const sortBtn = el(
      "button",
      state.sortOpen ? "active" : null,
      `\uC815\uB82C (${state.sorts.length})`
    );
    sortBtn.title = "\uB2E4\uB2E8\uACC4 \uC815\uB82C (\uC704\uC5D0\uC11C\uBD80\uD130 \uC6B0\uC120 \uC801\uC6A9)";
    sortBtn.onclick = () => {
      state.sortOpen = !state.sortOpen;
      render();
    };
    right.appendChild(sortBtn);
    if (gantt) {
      const zoomBox = el("div", "zoom");
      for (const k of ["week", "month", "quarter"]) {
        const b = el("button", "zoom-btn" + (state.zoom === k ? " active" : ""), ZOOM[k].label);
        b.onclick = () => {
          state.zoom = k;
          state.zoomScale = 1;
          render(true);
        };
        zoomBox.appendChild(b);
      }
      right.appendChild(zoomBox);
      const todayBtn = el("button", null, "\uC624\uB298");
      todayBtn.onclick = () => scrollToToday();
      right.appendChild(todayBtn);
      if (state.versions.length) {
        const verBtn = el("button", state.showVersions ? "active" : null, "\u{1F3C1} \uBC84\uC804");
        verBtn.title = "\uBC84\uC804(\uB9B4\uB9AC\uC2A4) \uC218\uC9C1\uC120 \uD45C\uC2DC/\uC228\uAE40";
        verBtn.onclick = () => {
          state.showVersions = !state.showVersions;
          render(true);
        };
        right.appendChild(verBtn);
      }
    }
    const presetBtn = el("button", null, "\uD504\uB9AC\uC14B");
    presetBtn.id = "preset-btn";
    right.appendChild(presetBtn);
    const manageBtn = el("button", null, "\uD734\uC77C \uAD00\uB9AC");
    manageBtn.id = "manage-btn";
    right.appendChild(manageBtn);
    if (gantt) {
      const legend = el("div", "legend");
      legend.innerHTML = '<span><span class="swatch" style="background:var(--holiday)"></span>\uACF5\uD734\uC77C/\uD734\uC77C</span><span><span class="swatch" style="background:var(--weekend)"></span>\uC8FC\uB9D0</span><span><span class="swatch" style="background:var(--bar-new)"></span>\uD560 \uC77C</span><span><span class="swatch" style="background:var(--bar)"></span>\uC9C4\uD589 \uC911</span><span><span class="swatch" style="background:var(--bar-done)"></span>\uC644\uB8CC</span><span><span class="swatch" style="background:#36b37e;width:3px"></span>\uC624\uB298</span>';
      right.appendChild(legend);
    }
    return toolbar;
  }
  function startEditTitle(titleEl) {
    if (!ensureLicensed()) return;
    const input = el("input", "title-edit");
    input.type = "text";
    input.value = state.title;
    titleEl.replaceWith(input);
    input.focus();
    input.select();
    const commit = async () => {
      const v = input.value.trim() || "\uB2F9\uC2E0\uC758 \uD0C0\uC784\uB77C\uC778";
      const { title } = await (0, import_bridge.invoke)("setTitle", { title: v });
      state.title = title;
      render();
    };
    input.onkeydown = (ev) => {
      if (ev.key === "Enter") commit();
      if (ev.key === "Escape") render();
    };
    input.onblur = commit;
  }
  function showError(e) {
    root().appendChild(el("div", "error", `\uC624\uB958: ${e.message || e}`));
  }
  var toastEl = null;
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = el("div", "toast");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 3500);
  }
  function ensureLicensed() {
    if (state.licensed) return true;
    toast("\u{1F512} \uC720\uB8CC \uB77C\uC774\uC120\uC2A4\uAC00 \uD544\uC694\uD55C \uAE30\uB2A5\uC785\uB2C8\uB2E4. Marketplace\uC5D0\uC11C \uAD6C\uB3C5\uD574 \uC8FC\uC138\uC694.");
    return false;
  }
  function renderLicenseBanner() {
    const b = el("div", "license-banner");
    b.append(el("span", "license-banner-icon", "\u{1F512}"));
    b.append(el(
      "span",
      "license-banner-text",
      "\uC77D\uAE30 \uC804\uC6A9 \uBAA8\uB4DC \u2014 \uB0A0\uC9DC \uBCC0\uACBD\xB7\uC0C9\uC0C1\xB7\uACF5\uD734\uC77C/\uD544\uD130/\uD504\uB9AC\uC14B \uC800\uC7A5\xB7\uC81C\uBAA9 \uBCC0\uACBD \uB4F1 \uD3B8\uC9D1 \uAE30\uB2A5\uC740 \uC720\uB8CC \uB77C\uC774\uC120\uC2A4\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4."
    ));
    const btn = el("button", "license-banner-btn", "Marketplace\uC5D0\uC11C \uAD6C\uB3C5");
    btn.onclick = () => import_bridge.router.open(LISTING_URL);
    b.append(btn);
    return b;
  }
  function renderManagePanel() {
    const panel = el("div", "manage");
    const form = el("div", "manage-form");
    const dateInput = el("input");
    dateInput.type = "date";
    const nameInput = el("input");
    nameInput.type = "text";
    nameInput.placeholder = "\uD734\uC77C\uBA85 (\uC608: \uD68C\uC0AC \uCC3D\uB9BD\uC77C)";
    const addBtn = el("button", "primary", "\uCD94\uAC00");
    const msg = el("span", "manage-msg");
    addBtn.onclick = async () => {
      if (!ensureLicensed()) return;
      const date = dateInput.value;
      if (!date) {
        msg.textContent = "\uB0A0\uC9DC\uB97C \uC120\uD0DD\uD558\uC138\uC694.";
        return;
      }
      addBtn.disabled = true;
      const { error } = await (0, import_bridge.invoke)("addCustomHoliday", { date, name: nameInput.value });
      addBtn.disabled = false;
      if (error) {
        msg.textContent = error;
        return;
      }
      nameInput.value = "";
      await loadAll();
    };
    form.append(dateInput, nameInput, addBtn, msg);
    panel.appendChild(el("div", "manage-title", "\uC218\uB3D9 \uCD94\uAC00 \uD734\uC77C"));
    panel.appendChild(form);
    const entries = Object.entries(state.custom).sort((a, b) => a[0].localeCompare(b[0]));
    if (entries.length === 0) {
      panel.appendChild(el("div", "manage-empty", "\uCD94\uAC00\uB41C \uD734\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."));
    } else {
      const list = el("div", "manage-list");
      for (const [date, name] of entries) {
        const item = el("div", "manage-item");
        item.appendChild(el("span", "mi-date", date));
        item.appendChild(el("span", "mi-name", name));
        const del = el("button", "mi-del", "\uC0AD\uC81C");
        del.onclick = async () => {
          if (!ensureLicensed()) return;
          del.disabled = true;
          await (0, import_bridge.invoke)("removeCustomHoliday", { date });
          await loadAll();
        };
        item.appendChild(del);
        list.appendChild(item);
      }
      panel.appendChild(list);
    }
    return panel;
  }
  function currentJql() {
    if (state.customJql.trim()) return state.customJql.trim();
    if (state.selectedFilterId) {
      const f = state.filters.find((x) => String(x.id) === String(state.selectedFilterId));
      return f && f.jql || `filter = ${state.selectedFilterId}`;
    }
    return "";
  }
  var STATUS_CAT_ID = { new: 2, indeterminate: 4, done: 3 };
  function effectiveJqlForSave() {
    let jql = currentJql();
    if (!jql) return "";
    const inList = state.assigneeIds.map((a) => `"${a}"`).join(", ");
    if (inList && state.includeUnassigned) jql += ` AND (assignee in (${inList}) OR assignee is EMPTY)`;
    else if (inList) jql += ` AND assignee in (${inList})`;
    else if (state.includeUnassigned) jql += " AND assignee is EMPTY";
    if (state.statusCats.length) {
      const ids = state.statusCats.map((k) => STATUS_CAT_ID[k]).filter(Boolean);
      if (ids.length) jql += ` AND statusCategory in (${ids.join(", ")})`;
    }
    return jql;
  }
  function renderSaveFilterPanel() {
    const panel = el("div", "manage");
    panel.appendChild(el("div", "manage-title", "\uD604\uC7AC JQL\uC744 \uD544\uD130\uB85C \uC800\uC7A5"));
    const jql = effectiveJqlForSave();
    if (!jql) {
      panel.appendChild(el("div", "manage-empty", "\uC800\uC7A5\uD560 JQL\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. JQL\uC744 \uC9C1\uC811 \uC785\uB825\uD55C \uB4A4 \uC800\uC7A5\uD558\uC138\uC694."));
      return panel;
    }
    if (state.assigneeIds.length || state.includeUnassigned || state.statusCats.length) {
      panel.appendChild(el("div", "sf-note", "\u203B \uD604\uC7AC \uB2F4\uB2F9\uC790\xB7\uC0C1\uD0DC \uBC94\uC8FC \uD544\uD130\uAC00 JQL\uC5D0 \uD3EC\uD568\uB418\uC5B4 \uC800\uC7A5\uB429\uB2C8\uB2E4."));
    }
    panel.appendChild(el("div", "sf-jql", jql));
    const form = el("div", "manage-form");
    const nameInput = el("input");
    nameInput.type = "text";
    nameInput.placeholder = "\uD544\uD130 \uC774\uB984";
    const globalWrap = el("label", "sf-global");
    const globalChk = el("input");
    globalChk.type = "checkbox";
    globalWrap.appendChild(globalChk);
    globalWrap.appendChild(document.createTextNode(" \uC804\uC5ED \uACF5\uC720(\uBAA8\uB4E0 \uC0AC\uC6A9\uC790)"));
    const saveBtn = el("button", "primary", "\uC800\uC7A5");
    const msg = el("span", "manage-msg");
    saveBtn.onclick = async () => {
      if (!ensureLicensed()) return;
      const name = nameInput.value.trim();
      if (!name) {
        msg.textContent = "\uD544\uD130 \uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694.";
        return;
      }
      saveBtn.disabled = true;
      msg.textContent = "\uC800\uC7A5 \uC911\u2026";
      const { filter, error } = await (0, import_bridge.invoke)("saveFilter", {
        name,
        jql,
        global: globalChk.checked
      });
      saveBtn.disabled = false;
      if (error) {
        msg.textContent = error;
        return;
      }
      state.filters = [...state.filters, filter].sort((a, b) => a.name.localeCompare(b.name));
      state.selectedFilterId = String(filter.id);
      state.customJql = "";
      state.assigneeIds = [];
      state.includeUnassigned = false;
      state.statusCats = [];
      msg.textContent = "\uC800\uC7A5\uB428!";
      try {
        await loadAll();
      } catch (e) {
        showError(e);
      }
    };
    form.append(nameInput, globalWrap, saveBtn, msg);
    panel.appendChild(form);
    return panel;
  }
  var PRESET_KEYS = [
    "view",
    "sorts",
    "zoom",
    "zoomScale",
    "layout",
    "showVersions",
    "statusCats",
    "priorityFilter",
    "typeFilter",
    "labelFilter",
    "overdueOnly",
    "mineOnly",
    "assigneeIds",
    "includeUnassigned",
    "selectedFilterId",
    "customJql"
  ];
  function captureConfig() {
    const c = {};
    for (const k of PRESET_KEYS) c[k] = JSON.parse(JSON.stringify(state[k]));
    return c;
  }
  async function applyConfig(cfg) {
    for (const k of PRESET_KEYS) if (k in cfg) state[k] = cfg[k];
    try {
      await loadAll();
    } catch (e) {
      showError(e);
    }
  }
  function renderPresetPanel() {
    const panel = el("div", "manage");
    panel.appendChild(el("div", "manage-title", "\uBCF4\uAE30 \uD504\uB9AC\uC14B (\uADF8\uB8F9\xB7\uC815\uB82C\xB7\uD544\uD130\xB7\uC90C \uD55C \uC138\uD2B8)"));
    const form = el("div", "manage-form");
    const nameInput = el("input");
    nameInput.type = "text";
    nameInput.placeholder = "\uD504\uB9AC\uC14B \uC774\uB984";
    const saveBtn = el("button", "primary", "\uD604\uC7AC \uBCF4\uAE30 \uC800\uC7A5");
    const msg = el("span", "manage-msg");
    saveBtn.onclick = async () => {
      if (!ensureLicensed()) return;
      const name = nameInput.value.trim();
      if (!name) {
        msg.textContent = "\uC774\uB984\uC744 \uC785\uB825\uD558\uC138\uC694.";
        return;
      }
      saveBtn.disabled = true;
      const { presets, error } = await (0, import_bridge.invoke)("savePreset", { name, config: captureConfig() });
      saveBtn.disabled = false;
      if (error) {
        msg.textContent = error;
        return;
      }
      state.presets = presets || state.presets;
      nameInput.value = "";
      render();
    };
    form.append(nameInput, saveBtn, msg);
    panel.appendChild(form);
    const names = Object.keys(state.presets).sort((a, b) => a.localeCompare(b));
    if (!names.length) {
      panel.appendChild(el("div", "manage-empty", "\uC800\uC7A5\uB41C \uD504\uB9AC\uC14B\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."));
    } else {
      const list = el("div", "manage-list");
      for (const n of names) {
        const item = el("div", "manage-item");
        const nameEl = el("span", "mi-name", n);
        nameEl.style.cursor = "pointer";
        nameEl.onclick = () => applyConfig(state.presets[n]);
        item.appendChild(nameEl);
        const apply = el("button", "mi-del", "\uC801\uC6A9");
        apply.onclick = () => applyConfig(state.presets[n]);
        const del = el("button", "mi-del", "\uC0AD\uC81C");
        del.onclick = async () => {
          if (!ensureLicensed()) return;
          del.disabled = true;
          const { presets } = await (0, import_bridge.invoke)("deletePreset", { name: n });
          state.presets = presets || {};
          render();
        };
        item.append(apply, del);
        list.appendChild(item);
      }
      panel.appendChild(list);
    }
    return panel;
  }
  function renderSortPanel() {
    const panel = el("div", "manage");
    panel.appendChild(el("div", "manage-title", "\uC815\uB82C (\uC704\uC5D0\uC11C\uBD80\uD130 \uC6B0\uC120 \uC801\uC6A9)"));
    state.sorts.forEach((s, idx) => {
      const row = el("div", "sort-row");
      row.appendChild(el("span", "sort-idx", `${idx + 1}.`));
      const sel = el("select");
      for (const [val, label] of SORT_FIELDS) {
        const opt = new Option(label, val);
        if (s.key === val) opt.selected = true;
        sel.appendChild(opt);
      }
      sel.onchange = () => {
        state.sorts[idx].key = sel.value;
        render();
      };
      row.appendChild(sel);
      const dir = el("button", "sort-dir", s.dir === "asc" ? "\u2191 \uC624\uB984" : "\u2193 \uB0B4\uB9BC");
      dir.onclick = () => {
        state.sorts[idx].dir = s.dir === "asc" ? "desc" : "asc";
        render();
      };
      row.appendChild(dir);
      const up = el("button", "mi-del", "\u25B2");
      up.disabled = idx === 0;
      up.onclick = () => {
        const a = state.sorts;
        [a[idx - 1], a[idx]] = [a[idx], a[idx - 1]];
        render();
      };
      const down = el("button", "mi-del", "\u25BC");
      down.disabled = idx === state.sorts.length - 1;
      down.onclick = () => {
        const a = state.sorts;
        [a[idx + 1], a[idx]] = [a[idx], a[idx + 1]];
        render();
      };
      row.append(up, down);
      if (state.sorts.length > 1) {
        const rm = el("button", "mi-del", "\xD7");
        rm.onclick = () => {
          state.sorts.splice(idx, 1);
          render();
        };
        row.appendChild(rm);
      }
      panel.appendChild(row);
    });
    const addBtn = el("button", "primary", "+ \uC815\uB82C \uAE30\uC900 \uCD94\uAC00");
    addBtn.onclick = () => {
      const used = new Set(state.sorts.map((s) => s.key));
      const next = (SORT_FIELDS.find(([v]) => !used.has(v)) || SORT_FIELDS[0])[0];
      state.sorts.push({ key: next, dir: "asc" });
      render();
    };
    panel.appendChild(addBtn);
    return panel;
  }
  function renderAdvancedFilterPanel() {
    const panel = el("div", "manage");
    panel.appendChild(el("div", "manage-title", "\uACE0\uAE09 \uD544\uD130"));
    const issues = state.data && state.data.issues || [];
    const checkGroup = (title, values, selArr, onToggle) => {
      if (!values.length) return;
      const sec2 = el("div", "adv-sec");
      sec2.appendChild(el("div", "adv-sec-title", title));
      const wrap2 = el("div", "adv-chips");
      for (const v of values) {
        const lab = el("label", "adv-chip" + (selArr.includes(v) ? " on" : ""));
        const cb = el("input");
        cb.type = "checkbox";
        cb.checked = selArr.includes(v);
        cb.onchange = () => onToggle(v, cb.checked);
        lab.append(cb, document.createTextNode(" " + v));
        wrap2.appendChild(lab);
      }
      sec2.appendChild(wrap2);
      panel.appendChild(sec2);
    };
    const uniq = (arr) => [...new Set(arr)].sort((a, b) => String(a).localeCompare(String(b)));
    const priorities = uniq(issues.map((i) => i.priority).filter(Boolean));
    const types = uniq(issues.map((i) => i.type).filter(Boolean));
    const labels = uniq(issues.flatMap((i) => i.labels || []));
    const toggle = (arrName) => (v, on) => {
      const arr = state[arrName];
      state[arrName] = on ? [...arr, v] : arr.filter((x) => x !== v);
      render();
    };
    checkGroup("\uC6B0\uC120\uC21C\uC704", priorities, state.priorityFilter, toggle("priorityFilter"));
    checkGroup("\uC720\uD615", types, state.typeFilter, toggle("typeFilter"));
    checkGroup("\uB77C\uBCA8", labels, state.labelFilter, toggle("labelFilter"));
    const sec = el("div", "adv-sec");
    const mk = (label, key) => {
      const lab = el("label", "adv-chip" + (state[key] ? " on" : ""));
      const cb = el("input");
      cb.type = "checkbox";
      cb.checked = state[key];
      cb.onchange = () => {
        state[key] = cb.checked;
        render();
      };
      lab.append(cb, document.createTextNode(" " + label));
      return lab;
    };
    const wrap = el("div", "adv-chips");
    wrap.append(mk("\uC9C0\uC5F0\uB9CC (\uB9C8\uAC10 \uC9C0\uB0A8\xB7\uBBF8\uC644\uB8CC)", "overdueOnly"), mk("\uB0B4 \uC774\uC288\uB9CC", "mineOnly"));
    sec.appendChild(wrap);
    panel.appendChild(sec);
    const resetBtn = el("button", "tb-reset", "\uACE0\uAE09 \uD544\uD130 \uCD08\uAE30\uD654");
    resetBtn.onclick = () => {
      state.priorityFilter = [];
      state.typeFilter = [];
      state.labelFilter = [];
      state.overdueOnly = false;
      state.mineOnly = false;
      render();
    };
    panel.appendChild(resetBtn);
    return panel;
  }
  var TABLE_COLS = [
    { key: "color", label: "", w: 28, fixed: true, cell: (it) => {
      const d = el("span", "tbl-dot");
      d.style.background = state.colors[it.key] || statusColor(it);
      return d;
    } },
    { key: "key", label: "\uD0A4", w: 90, cell: (it) => {
      const e = el("span", "link", it.key);
      e.style.cursor = "pointer";
      e.onclick = () => openIssue(it.key);
      return e;
    } },
    { key: "summary", label: "\uC694\uC57D", w: 300, text: (it) => it.summary || "" },
    { key: "type", label: "\uC720\uD615", w: 90, text: (it) => it.type || "" },
    { key: "status", label: "\uC0C1\uD0DC", w: 100, text: (it) => it.status || "" },
    { key: "assignee", label: "\uB2F4\uB2F9\uC790", w: 120, text: (it) => it.assigneeName || "\uBBF8\uC9C0\uC815" },
    { key: "priority", label: "\uC6B0\uC120\uC21C\uC704", w: 90, text: (it) => it.priority || "" },
    { key: "start", label: "\uC2DC\uC791", w: 110, text: (it) => it.start || "" },
    { key: "due", label: "\uB9C8\uAC10", w: 110, text: (it) => it.due || "", overdue: true },
    { key: "progress", label: "\uC9C4\uCC99\uB3C4", w: 80, text: (it) => it.progress != null ? `${it.progress}%` : "" }
  ];
  function renderTable(issues) {
    const wrap = el("div", "table-wrap");
    const tbl = el("table", "issue-table");
    const colW2 = (c) => state.tableColW[c.key] || c.w;
    tbl.style.width = TABLE_COLS.reduce((s, c) => s + colW2(c), 0) + "px";
    const cg = el("colgroup");
    const colEls = {};
    for (const c of TABLE_COLS) {
      const col = document.createElement("col");
      col.style.width = colW2(c) + "px";
      colEls[c.key] = col;
      cg.appendChild(col);
    }
    tbl.appendChild(cg);
    const thead = el("thead");
    const htr = el("tr");
    for (const c of TABLE_COLS) {
      const th = el("th", null, c.label);
      if (!c.fixed) {
        const grip = el("span", "col-resize");
        grip.onmousedown = (downEv) => {
          downEv.preventDefault();
          const startX = downEv.clientX;
          const startW = colW2(c);
          const move = (ev) => {
            const nw = Math.max(40, startW + (ev.clientX - startX));
            state.tableColW[c.key] = nw;
            colEls[c.key].style.width = nw + "px";
            tbl.style.width = TABLE_COLS.reduce((s, x) => s + colW2(x), 0) + "px";
          };
          const up = () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
          };
          document.addEventListener("mousemove", move);
          document.addEventListener("mouseup", up);
        };
        th.appendChild(grip);
      }
      htr.appendChild(th);
    }
    thead.appendChild(htr);
    tbl.appendChild(thead);
    const today = todayStr();
    const tbody = el("tbody");
    for (const it of issues) {
      const tr = el("tr");
      const overdue = it.due && it.due < today && it.statusCategory !== "done";
      for (const c of TABLE_COLS) {
        const td = el("td", c.overdue && overdue ? "tbl-overdue" : null);
        if (c.cell) td.appendChild(c.cell(it));
        else td.textContent = c.text(it);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    tbl.appendChild(tbody);
    wrap.appendChild(tbl);
    return wrap;
  }
  function renderZoomFloat() {
    const box = el("div", "zoom-float");
    const setScale = (s) => {
      state.zoomScale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, s));
      render(true);
    };
    const outBtn = el("button", "zoom-btn", "\u2212");
    outBtn.title = "\uCD95\uC18C";
    outBtn.onclick = () => setScale(state.zoomScale / 1.25);
    const inBtn = el("button", "zoom-btn", "+");
    inBtn.title = "\uD655\uB300";
    inBtn.onclick = () => setScale(state.zoomScale * 1.25);
    box.append(outBtn, inBtn);
    return box;
  }
  function render(restoreScroll) {
    const prevScroll = restoreScroll ? null : document.querySelector(".timeline-wrap")?.scrollLeft;
    root().innerHTML = "";
    root().appendChild(renderToolbar());
    if (!state.licensed) root().appendChild(renderLicenseBanner());
    const panel = renderManagePanel();
    panel.style.display = "none";
    document.getElementById("manage-btn").onclick = () => {
      panel.style.display = panel.style.display === "none" ? "block" : "none";
    };
    root().appendChild(panel);
    let sfPanel = renderSaveFilterPanel();
    sfPanel.style.display = "none";
    root().appendChild(sfPanel);
    document.getElementById("save-filter-btn").onclick = () => {
      if (sfPanel.style.display !== "none") {
        sfPanel.style.display = "none";
        return;
      }
      const fresh = renderSaveFilterPanel();
      sfPanel.replaceWith(fresh);
      sfPanel = fresh;
      sfPanel.style.display = "block";
    };
    const prPanel = renderPresetPanel();
    prPanel.style.display = "none";
    root().appendChild(prPanel);
    document.getElementById("preset-btn").onclick = () => {
      prPanel.style.display = prPanel.style.display === "none" ? "block" : "none";
    };
    if (state.sortOpen) root().appendChild(renderSortPanel());
    if (state.advOpen) root().appendChild(renderAdvancedFilterPanel());
    const d = state.data;
    if (!d || !d.issues || d.issues.length === 0) {
      const meta = d && d.startFieldId ? `\uC2DC\uC791\uC77C \uD544\uB4DC: ${d.startFieldId}` : "";
      const who = state.assigneeIds.length || state.includeUnassigned ? "\uC120\uD0DD\uD55C \uB2F4\uB2F9\uC790\uC758 " : "";
      root().appendChild(el("div", "empty", `${who}\uC870\uAC74\uC5D0 \uB9DE\uACE0 \uB9C8\uAC10\uC77C(duedate)\uC774 \uC124\uC815\uB41C \uC774\uC288\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. ${meta}`));
      return;
    }
    const shown = sortIssues(statusFiltered(d.issues));
    if (shown.length === 0) {
      root().appendChild(el("div", "empty", "\uC120\uD0DD\uD55C \uD544\uD130 \uC870\uAC74\uC5D0 \uD574\uB2F9\uD558\uB294 \uC774\uC288\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."));
      return;
    }
    if (state.layout === "table") {
      root().appendChild(renderTable(shown));
      return;
    }
    const area = el("div", "timeline-area");
    area.appendChild(renderTimeline({ ...d, issues: shown }));
    area.appendChild(renderZoomFloat());
    root().appendChild(area);
    if (prevScroll != null) {
      const w = document.querySelector(".timeline-wrap");
      if (w) w.scrollLeft = prevScroll;
    } else {
      scrollToToday();
    }
  }
  function groupByEpic(issues) {
    const map = /* @__PURE__ */ new Map();
    for (const it of issues) {
      const k = it.epicKey || "__none__";
      if (!map.has(k)) {
        map.set(k, { id: `epic:${k}`, name: it.epicName || (it.epicKey ? it.epicKey : "\uC5D0\uD53D \uC5C6\uC74C"), issues: [] });
      }
      map.get(k).issues.push(it);
    }
    return [...map.values()];
  }
  function groupByAssignee(issues) {
    const map = /* @__PURE__ */ new Map();
    for (const it of issues) {
      const k = it.assigneeId || "__none__";
      if (!map.has(k)) {
        map.set(k, { id: `asg:${k}`, name: it.assigneeName || "\uBBF8\uC9C0\uC815", issues: [] });
      }
      map.get(k).issues.push(it);
    }
    return [...map.values()].sort(
      (a, b) => a.name === "\uBBF8\uC9C0\uC815" ? 1 : b.name === "\uBBF8\uC9C0\uC815" ? -1 : a.name.localeCompare(b.name)
    );
  }
  function barClass(it) {
    if (it.statusCategory === "done") return "bar done";
    if (it.statusCategory === "new") return "bar new";
    return "bar";
  }
  function issueTooltipBase(it) {
    const tip = [`${it.key}${it.summary ? " \xB7 " + it.summary : ""}`];
    if (it.type) tip.push(`\u2022 \uC720\uD615: ${it.type}`);
    tip.push(`\u2022 \uC0C1\uD0DC: ${it.status || "-"}`);
    tip.push(`\u2022 \uB2F4\uB2F9\uC790: ${it.assigneeName || "\uBBF8\uC9C0\uC815"}`);
    if (it.start || it.due) tip.push(`\u2022 \uAE30\uAC04: ${it.start || it.due} ~ ${it.due || it.start}`);
    if (it.blockedBy && it.blockedBy.length) tip.push(`\u2022 \u{1F517} \uCC28\uB2E8 \uC694\uC18C: ${it.blockedBy.join(", ")}`);
    return tip;
  }
  function statusColor(it) {
    return it.statusCategory === "done" ? "#36b37e" : it.statusCategory === "new" ? "#8993a4" : "#4c9aff";
  }
  async function applyIssueColor(key, color) {
    if (!ensureLicensed()) return;
    try {
      const r = await (0, import_bridge.invoke)("setIssueColor", { key, color: color || "" });
      if (r && r.error) {
        showError(new Error(r.error));
        return;
      }
      state.colors = r && r.colors || state.colors;
      render();
    } catch (e) {
      showError(e);
    }
  }
  function makeColorControl(it) {
    const wrap = el("span", "row-color");
    const cur = state.colors[it.key];
    const inp = el("input", "color-input");
    inp.type = "color";
    inp.value = cur || statusColor(it);
    inp.title = "\uC774\uC288 \uC0C9\uC0C1 \uC9C0\uC815";
    inp.onclick = (ev) => ev.stopPropagation();
    inp.onchange = () => applyIssueColor(it.key, inp.value);
    wrap.appendChild(inp);
    if (cur) {
      const reset = el("button", "color-reset", "\xD7");
      reset.title = "\uAE30\uBCF8\uC0C9\uC73C\uB85C \uB418\uB3CC\uB9AC\uAE30";
      reset.onclick = (ev) => {
        ev.stopPropagation();
        applyIssueColor(it.key, null);
      };
      wrap.appendChild(reset);
    }
    return wrap;
  }
  function renderTimeline({ issues, rangeStart, totalDays }) {
    const W = colW();
    const wrap = el("div", "timeline-wrap");
    const tl = el("div", "timeline");
    tl.style.setProperty("--col-w", `${W}px`);
    const days = [];
    for (let i = 0; i < totalDays; i++) days.push(fmt(addDays(parse(rangeStart), i)));
    const headRow = el("div", "head-row");
    headRow.appendChild(el("div", "head-label"));
    const headDays = el("div", "head-days");
    let prevMonth = null;
    days.forEach((ds, i) => {
      const d = parse(ds);
      const { isWeekend, holidayName } = dayMeta(ds);
      const cell = el("div", "day-head" + (holidayName ? " holiday" : isWeekend ? " weekend" : ""));
      if (holidayName) cell.title = holidayName;
      if (state.zoom === "week") {
        const dow = ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"][d.getDay()];
        cell.appendChild(el("div", "dow", dow));
        cell.appendChild(el("div", "dom", String(d.getDate())));
      } else if (state.zoom === "month") {
        if (d.getDay() === 1) cell.appendChild(el("div", "dom", String(d.getDate())));
      }
      const mk = d.getMonth();
      if (mk !== prevMonth) {
        const mh = el("div", "month-head", `${d.getFullYear()}.${pad(mk + 1)}`);
        mh.style.left = `${i * W}px`;
        headDays.appendChild(mh);
        prevMonth = mk;
      }
      headDays.appendChild(cell);
    });
    headRow.appendChild(headDays);
    tl.appendChild(headRow);
    const rows = el("div", "rows");
    const bg = el("div", "bg-cols");
    days.forEach((ds) => {
      const { isWeekend, holidayName } = dayMeta(ds);
      bg.appendChild(el("div", "bg-col" + (holidayName ? " holiday" : isWeekend ? " weekend" : "")));
    });
    rows.appendChild(bg);
    const today = todayStr();
    const tOff = dayDiff(rangeStart, today);
    if (tOff >= 0 && tOff < totalDays) {
      const line = el("div", "today-line");
      line.style.left = `${tOff * W}px`;
      rows.appendChild(line);
    }
    if (state.showVersions) {
      for (const v of state.versions) {
        const off = dayDiff(rangeStart, v.releaseDate);
        if (off < 0 || off >= totalDays) continue;
        const vline = el("div", "ver-line");
        vline.style.left = `${off * W}px`;
        vline.title = `\u{1F3C1} ${v.name} (${v.releaseDate})`;
        vline.appendChild(el("div", "ver-tag", `\u{1F3C1} ${v.name}`));
        rows.appendChild(vline);
      }
    }
    const trackW = days.length * W;
    function makeIssueRow(it, depth, opts) {
      opts = opts || {};
      const row = el("div", "row");
      const label = el("div", "row-label issue-label clickable");
      label.style.paddingLeft = `${8 + depth * 18}px`;
      for (let dpt = 1; dpt <= depth; dpt++) {
        const guide = el("span", "row-guide" + (dpt === depth && opts.last ? " last" : ""));
        guide.style.left = `${8 + (dpt - 1) * 18 + 7}px`;
        label.appendChild(guide);
      }
      if (opts.caret) {
        const c = el("span", "caret", opts.collapsed ? "\u25B6" : "\u25BC");
        c.onclick = (ev) => {
          ev.stopPropagation();
          opts.onToggle();
        };
        label.appendChild(c);
      }
      label.appendChild(makeColorControl(it));
      if (it.assigneeAvatar) {
        const av = el("img", "row-avatar");
        av.src = it.assigneeAvatar;
        av.alt = it.assigneeName || "";
        av.title = it.assigneeName || "";
        label.appendChild(av);
      }
      label.appendChild(el("span", "key", it.key));
      label.appendChild(el("span", "sum link", it.summary || ""));
      if (it.blockedBy && it.blockedBy.length) {
        const blk = el("span", "row-blocked", "\u{1F517}");
        blk.title = `\uCC28\uB2E8 \uC694\uC18C: ${it.blockedBy.join(", ")}`;
        label.appendChild(blk);
      }
      label.title = issueTooltipBase(it).concat("\u2022 \uD074\uB9AD: \uC774\uC288 \uC5F4\uAE30").join("\n");
      label.onclick = () => openIssue(it.key);
      const goBtn = el("button", "row-goto", "\u{1F4C5}");
      goBtn.title = "\uC774 \uC774\uC288 \uB0A0\uC9DC\uB85C \uC774\uB3D9";
      goBtn.onclick = (ev) => {
        ev.stopPropagation();
        scrollToDate(it.start || it.due);
      };
      label.appendChild(goBtn);
      row.appendChild(label);
      const track = el("div", "row-track");
      track.style.width = `${trackW}px`;
      const s = it.start && it.start >= rangeStart ? it.start : it.due;
      const e = it.due || it.start;
      if (s && e) {
        const offset = Math.max(0, dayDiff(rangeStart, s));
        const span = Math.max(1, dayDiff(s, e) + 1);
        const overdue = it.due && it.due < todayStr() && it.statusCategory !== "done";
        const bar = el("div", barClass(it) + (overdue ? " overdue" : "") + " clickable");
        bar.style.left = `${offset * W + 1}px`;
        bar.style.width = `${span * W - 2}px`;
        if (typeof it.progress === "number" && it.progress > 0) {
          const pf = el("div", "bar-prog");
          pf.style.width = `${Math.min(100, it.progress)}%`;
          bar.appendChild(pf);
        }
        const lab = el("span", "bar-label", it.summary || it.key);
        if (it.assigneeName) lab.appendChild(el("span", "bar-asg", " \xB7 " + it.assigneeName));
        bar.appendChild(lab);
        if (state.colors[it.key]) {
          const c = state.colors[it.key];
          bar.style.background = c;
          const lc = c.toLowerCase();
          if (lc === "#ffffff" || lc === "#fff") bar.style.color = "#172b4d";
          else if (lc === "#000000" || lc === "#000") bar.style.color = "#fff";
        }
        const tip = issueTooltipBase(it);
        if (typeof it.progress === "number") tip.push(`\u2022 \uC9C4\uCC99\uB3C4: ${it.progress}%`);
        if (overdue) tip.push("\u2022 \u26A0 \uC9C0\uC5F0\uB428");
        tip.push("\u2022 \uD074\uB9AD: \uC774\uC288 \uC5F4\uAE30 \xB7 \uB4DC\uB798\uADF8: \uC591\uB05D=\uAE30\uAC04, \uAC00\uC6B4\uB370=\uC774\uB3D9");
        bar.title = tip.join("\n");
        const hL = el("div", "bar-handle left");
        const hR = el("div", "bar-handle right");
        bar.appendChild(hL);
        bar.appendChild(hR);
        attachDrag(bar, hL, hR, it, W);
        track.appendChild(bar);
      }
      row.appendChild(track);
      rows.appendChild(row);
    }
    if (state.view === "flat") {
      issues.forEach((it) => makeIssueRow(it, 0));
    } else if (state.view === "tree") {
      const byKey = new Map(issues.map((i) => [i.key, i]));
      const childMap = /* @__PURE__ */ new Map();
      const roots = [];
      for (const it of issues) {
        const pk = it.epicKey;
        if (pk && byKey.has(pk)) {
          if (!childMap.has(pk)) childMap.set(pk, []);
          childMap.get(pk).push(it);
        } else {
          roots.push(it);
        }
      }
      const walk = (it, depth) => {
        const kids = childMap.get(it.key) || [];
        const collapsed = !!state.collapsed[it.key];
        makeIssueRow(it, depth, kids.length ? {
          caret: true,
          collapsed,
          onToggle: () => {
            state.collapsed[it.key] = !collapsed;
            render();
          }
        } : {});
        if (!collapsed) for (const k of kids) walk(k, depth + 1);
      };
      roots.forEach((r) => walk(r, 0));
    } else {
      const groups = state.view === "assignee" ? groupByAssignee(issues) : state.view === "priority" ? groupByPriority(issues) : state.view === "type" ? groupByType(issues) : state.view === "label" ? groupByLabel(issues) : state.view === "duebucket" ? groupByDueBucket(issues) : groupByEpic(issues);
      for (const g of groups) {
        const isCollapsed = !!state.collapsed[g.id];
        const grow = el("div", "row group-row");
        const glabel = el("div", "row-label group-label");
        glabel.appendChild(el("span", "caret", isCollapsed ? "\u25B6" : "\u25BC"));
        glabel.appendChild(el("span", "epic-name", g.name));
        glabel.appendChild(el("span", "epic-count", `(${g.issues.length})`));
        const doneN = g.issues.filter((it) => it.statusCategory === "done").length;
        const pct = Math.round(doneN / g.issues.length * 100);
        const prog = el("span", "grp-prog");
        prog.title = `\uC644\uB8CC ${doneN}/${g.issues.length} (${pct}%)`;
        const fill = el("span", "grp-prog-fill");
        fill.style.width = `${pct}%`;
        prog.appendChild(fill);
        glabel.appendChild(prog);
        glabel.onclick = () => {
          state.collapsed[g.id] = !state.collapsed[g.id];
          render();
        };
        grow.appendChild(glabel);
        const gtrack = el("div", "row-track");
        gtrack.style.width = `${trackW}px`;
        grow.appendChild(gtrack);
        rows.appendChild(grow);
        if (isCollapsed) continue;
        g.issues.forEach((it) => makeIssueRow(it, 1));
      }
    }
    tl.appendChild(rows);
    wrap.appendChild(tl);
    return wrap;
  }
  function attachDrag(bar, hL, hR, it, W) {
    const s0 = it.start && it.start >= state.data.rangeStart ? it.start : it.due;
    const e0 = it.due || it.start;
    if (!s0 || !e0) return;
    const start = (mode) => (downEv) => {
      downEv.preventDefault();
      downEv.stopPropagation();
      const startX = downEv.clientX;
      const baseLeft = parseFloat(bar.style.left) || 0;
      const baseWidth = parseFloat(bar.style.width) || W;
      let moved = false;
      let dDays = 0;
      bar.classList.add("dragging");
      const move = (ev) => {
        const dx = ev.clientX - startX;
        dDays = Math.round(dx / W);
        if (Math.abs(dx) > 3) moved = true;
        if (mode === "move") {
          bar.style.left = `${baseLeft + dDays * W}px`;
        } else if (mode === "left") {
          const nl = baseLeft + dDays * W;
          const nw = baseWidth - dDays * W;
          if (nw >= W) {
            bar.style.left = `${nl}px`;
            bar.style.width = `${nw}px`;
          }
        } else {
          const nw = baseWidth + dDays * W;
          if (nw >= W) bar.style.width = `${nw}px`;
        }
      };
      const up = async () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        bar.classList.remove("dragging");
        if (!moved || dDays === 0) {
          bar.style.left = `${baseLeft}px`;
          bar.style.width = `${baseWidth}px`;
          if (!moved) openIssue(it.key);
          return;
        }
        if (!ensureLicensed()) {
          bar.style.left = `${baseLeft}px`;
          bar.style.width = `${baseWidth}px`;
          return;
        }
        let nStart = s0, nDue = e0;
        if (mode === "move") {
          nStart = fmt(addDays(parse(s0), dDays));
          nDue = fmt(addDays(parse(e0), dDays));
        } else if (mode === "left") {
          nStart = fmt(addDays(parse(s0), dDays));
          if (nStart > nDue) nStart = nDue;
        } else {
          nDue = fmt(addDays(parse(e0), dDays));
          if (nDue < nStart) nDue = nStart;
        }
        await commitDates(it, nStart, nDue);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    hL.addEventListener("mousedown", start("left"));
    hR.addEventListener("mousedown", start("right"));
    bar.addEventListener("mousedown", start("move"));
  }
  async function commitDates(it, nStart, nDue) {
    const startFieldId = state.data && state.data.startFieldId;
    try {
      const r = await (0, import_bridge.invoke)("updateIssueDates", {
        key: it.key,
        start: nStart,
        due: nDue,
        startFieldId
      });
      if (r && r.error) {
        showError(new Error(r.error));
        return;
      }
      it.start = nStart;
      it.due = nDue;
      render();
      if (nStart !== nDue && !startFieldId) {
        showError(new Error("\uC2DC\uC791\uC77C \uD544\uB4DC\uAC00 \uC5C6\uC5B4 \uB9C8\uAC10\uC77C\uB9CC \uBC18\uC601\uB410\uC2B5\uB2C8\uB2E4."));
      }
    } catch (e) {
      showError(e);
    }
  }
  function scrollToToday() {
    scrollToDate(todayStr());
  }
  function scrollToDate(dateStr) {
    const wrap = document.querySelector(".timeline-wrap");
    const d = state.data;
    if (!wrap || !d || !d.rangeStart || !dateStr) return;
    const off = dayDiff(d.rangeStart, dateStr);
    const x = off * colW() - wrap.clientWidth / 2;
    wrap.scrollLeft = Math.max(0, x);
  }
  main();
})();
