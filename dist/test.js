var xloader =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(7);
	__webpack_require__(9);
	__webpack_require__(12);
	__webpack_require__(14);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var util = __webpack_require__(2);

	describe('util', function () {
	  it('isArray', function () {
	    var isArray = util.__test.isArray;
	    isArray([1, 2, 3]).should.be.true();
	    isArray('123').should.be.false();
	    isArray(arguments).should.be.false();
	  });

	  it('extend', function () {
	    var o = util.extend({ a: 1, b: 2, d: 'd' }, { b: 3, c: 4, d: null, e: undefined, f: 0 });
	    o.should.be.eql({ a: 1, b: 3, c: 4, d: 'd', f: 0 });
	  });

	  it('each', function () {
	    var list = [1, 2, 3, 4];
	    var s = 0;
	    util.each(list, function (index, value) {
	      s += value;
	    });
	    s.should.be.equal(10);

	    var o = { a: 1, b: 2, c: 3 };
	    s = '';
	    util.each(o, function (k, v) {
	      s += k + '=' + v + ';';
	    });

	    s.should.be.equal('a=1;b=2;c=3;');
	  });

	  it('map', function () {
	    var list = [1, 2, 3, 4, 5];
	    list = util.map(list, function (i, v) {
	      if (i > 1) {
	        return v * 2;
	      }
	      return undefined;
	    });

	    list.should.be.eql([6, 8, 10]);
	  });

	  it('proxy', function () {
	    var o = {
	      m: function m() {
	        return this.n;
	      },
	      n: 100
	    };
	    var fn = util.proxy(o, 'm');
	    fn().should.be.equal(100);
	  });

	  it('assert', function () {
	    (function () {
	      util.assert(true, 'assert true');
	    }).should.not.throw();

	    (function () {
	      util.assert(false, 'assert false');
	    }).should.throw();
	  });

	  it('guid', function () {
	    var now = util.guid();
	    now.should.be.type('number');
	    (util.guid() - now).should.be.equal(1);
	  });

	  it('dirname', function () {
	    util.dirname('lang/core').should.be.equal('lang');
	    util.dirname('hello/abcd/').should.be.equal('hello');
	    util.dirname('hi').should.be.equal('');
	  });

	  it('join', function () {
	    util.join('aaa/bbb/ccc', '.././.././zzz').should.be.equal('aaa/zzz');
	    util.join('aaa', 'bbb').should.be.equal('aaa/bbb');
	  });

	  it('isBrowser', function () {
	    if (global.window && global.document) {
	      util.isBrowser.should.be.true();
	    } else {
	      util.isBrowser.should.be.false();
	    }
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var toString = Object.prototype.toString;
	var guid = 1;

	exports.isArray = Array.isArray ? Array.isArray : isArray;

	exports.__test = {
	  isArray: isArray
	};

	function isArray(o) {
	  return toString.call(o) === '[object Array]';
	}

	exports.extend = function (des, src) {
	  for (var k in src) {
	    var v = src[k];
	    if (v !== null && v !== undefined) {
	      des[k] = v;
	    }
	  }
	  return des;
	};

	exports.each = function (iter, fn) {
	  var len = iter.length;
	  var isArrayLike = len === 0 || typeof len === 'number' && len > 0 && len - 1 in iter;

	  if (isArrayLike) {
	    for (var i = 0; i < len; i++) {
	      fn(i, iter[i]);
	    }
	  } else {
	    for (var k in iter) {
	      fn(k, iter[k]);
	    }
	  }
	};

	exports.map = function (list, fn) {
	  var ret = [];
	  for (var i = 0, c = list.length; i < c; i++) {
	    var v = fn(i, list[i]);
	    v !== undefined && ret.push(v);
	  }
	  return ret;
	};

	exports.proxy = function (o, name) {
	  var fn = o[name];
	  return function () {
	    return fn.apply(o, arguments);
	  };
	};

	exports.assert = function (test, message) {
	  if (!test) {
	    throw new Error('AssertFailError: ' + message);
	  }
	};

	exports.guid = function () {
	  return guid++;
	};

	var rParent = /([-\w]+\/\.\.\/)/g;
	var rCurrent = /([^.])\.\//g;

	exports.join = function (parent, path) {
	  path = parent + '/' + path;
	  path = path.replace(rCurrent, '$1');
	  while (rParent.test(path)) {
	    path = path.replace(rParent, '');
	  }
	  return path;
	};

	var rLastSlash = /\/$/;
	exports.dirname = function (path) {
	  path = path.replace(rLastSlash, '');
	  var pos = path.lastIndexOf('/');
	  return pos === -1 ? '' : path.substr(0, pos);
	};

	exports.isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var sinon = __webpack_require__(5);
	var log = __webpack_require__(6);

	/* global beforeEach, afterEach */

	describe('log', function () {
	  beforeEach(function () {
	    this.lastLevel = log.level;
	    sinon.spy(log, 'handler');
	  });

	  afterEach(function () {
	    log.level = this.lastLevel;
	    log.handler.restore();
	  });

	  it('default log level', function () {
	    if (process.env.DEBUG === 'xloader') {
	      // eslint-disable-line
	      log.level.should.be.equal('debug');
	    } else {
	      log.level.should.be.equal('warn');
	    }
	  });

	  it('test on log.level=info', function () {
	    log.level = 'info';

	    log.info('hello');
	    log.handler.called.should.be.true();

	    log.handler.reset();

	    log.warn('world');
	    log.handler.called.should.be.true();

	    log.handler.reset();

	    log.debug('my');
	    log.handler.called.should.be.false();

	    log.handler.reset();

	    log.error('some error');
	    log.handler.called.should.be.true();
	  });

	  it('test on log.level=warn', function () {
	    log.level = 'warn';

	    log.debug('hello');
	    log.handler.called.should.be.false();

	    log.handler.reset();

	    log.warn('world');
	    log.handler.called.should.be.true();

	    log.handler.reset();

	    log.info('loader');
	    log.handler.called.should.be.false();

	    log.handler.reset();

	    log.error('some error');
	    log.handler.called.should.be.true();
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = sinon;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/* eslint no-console: 0 */

	var util = __webpack_require__(2);

	var LEVEL = { none: 0, error: 1, warn: 2, info: 3, debug: 4 };

	module.exports = log;

	var slice = [].slice;

	function log(type, args) {
	  if (log.isEnabled(type)) {
	    args = slice.call(args, 0);
	    args[0] = '[loader] ' + args[0];
	    log.handler(type, args);
	  }
	}

	log.level = 'warn';
	log.isEnabled = function (type) {
	  return LEVEL[type] <= LEVEL[log.level];
	};

	util.each(LEVEL, function (type) {
	  log[type] = function () {
	    log(type, arguments);
	  };
	});

	log.handler = typeof console !== 'undefined' ? function (type, args) {
	  if (console[type]) {
	    console[type].apply(console, args);
	  }
	} : function () {};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Event = __webpack_require__(8);

	describe('event', function () {
	  var event = new Event();

	  it('支持事件基本操作', function () {
	    var s = 0;

	    var fn1 = function fn1(n) {
	      s += n;
	    };

	    var fn2 = function fn2(a, b) {
	      s *= a + b;
	    };

	    event.on('test', fn1);
	    event.on('test', fn2);

	    event.trigger('test', 3, 4);
	    s.should.be.equal(21);

	    event.off('test', fn1);
	    event.trigger('test', 5, 2);
	    s.should.be.equal(147);

	    event.off('test', fn2);
	    event.trigger('test', 3, 6);
	    s.should.be.equal(147);

	    // 关闭不存在在的事件也不会报错
	    event.off('notexist', fn1);
	  });

	  it('事件支持返回值, 如果有返回值(非null或非undefined)，则退出事件循环', function () {
	    var s = 0;
	    event.on('click', function () {
	      s += 1;
	      return 'hello';
	    });
	    event.on('click', function () {
	      s += 1;
	    });

	    var ret = event.trigger('click');
	    ret.should.be.equal('hello');
	    s.should.be.equal(1);
	  });

	  it('让普通对象有事件能力', function () {
	    var o = {
	      set: function set(name, value) {
	        this[name] = value;
	        this.trigger('set', name, value);
	      }
	    };

	    new Event(o); // eslint-disable-line

	    var data = null;

	    o.on('set', function (name, value) {
	      this.dirty = true;
	      data = [name, value];
	    });

	    o.set('version', '2.3');

	    o.version.should.be.equal('2.3');
	    o.dirty.should.be.true();

	    data.should.be.eql(['version', '2.3']);
	  });
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var log = __webpack_require__(6);

	var slice = [].slice;

	module.exports = function (target) {
	  var cache = {};

	  target = target || {};

	  target.on = function (name, fn) {
	    log.debug('event.on: ' + name, fn);
	    var list = cache[name] || (cache[name] = []);
	    list.push(fn);
	  };

	  target.trigger = function (name) {
	    var list = cache[name];
	    if (list) {
	      var params = arguments.length > 1 ? slice.call(arguments, 1) : [];
	      log.debug('event.trigger: ' + name, params);
	      for (var i = 0, c = list.length; i < c; i++) {
	        var result = list[i].apply(target, params);
	        if (result !== null && result !== undefined) {
	          return result;
	        }
	      }
	    }
	  };

	  target.off = function (name, fn) {
	    log.debug('event.off: ' + name, fn);

	    var list = cache[name];
	    if (list) {
	      for (var i = list.length - 1; i >= 0; i--) {
	        if (list[i] === fn) {
	          list.splice(i, 1);
	        }
	      }
	      if (!list.length) {
	        delete cache[name];
	      }
	    }
	  };

	  return target;
	};
	//~

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Config = __webpack_require__(10);

	describe('config', function () {
	  it('设置和获取配置', function () {
	    var config = new Config();

	    config.set('root', '/xloader');
	    config.get('root').should.be.equal('/xloader');

	    config.get('alias').should.be.eql([]);

	    config.set('alias', { a: 'b' });
	    config.get('alias').should.be.eql([{ a: 'b' }]);

	    config.set('alias', { other: 'other' });
	    config.get('alias').should.be.eql([{ a: 'b' }, { other: 'other' }]);

	    config.get('resolve').should.be.eql([]);
	  });
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var klass = __webpack_require__(11);
	var log = __webpack_require__(6);

	var listFields = { alias: true, resolve: true };

	module.exports = klass({
	  init: function init() {
	    this.cache = {};
	  },

	  get: function get(name) {
	    var cache = this.cache;
	    return listFields[name] ? cache[name] || [] : cache[name];
	  },

	  set: function set(name, value) {
	    log.debug('set config: ' + name, value);
	    var cache = this.cache;
	    if (listFields[name]) {
	      cache[name] = cache[name] || [];
	      cache[name].push(value);
	    } else {
	      cache[name] = value;
	    }
	  }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(2);

	module.exports = function (proto) {
	  var klass = function klass() {
	    var init = this.init;
	    return init && init.apply(this, arguments);
	  };

	  proto && util.extend(klass.prototype, proto);

	  return klass;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var sinon = __webpack_require__(5);

	var Define = __webpack_require__(13);
	var log = __webpack_require__(6);

	describe('define', function () {
	  var loader = { modules: {}, trigger: function trigger() {} };
	  var mods = loader.modules;
	  var x = new Define(loader);
	  var fn = function fn() {};

	  it('define(id, depends, factory)', function () {
	    x.define('a', ['b', 'c', 'd'], fn);
	    mods.a.should.be.eql({
	      id: 'a',
	      depends: ['b', 'c', 'd'],
	      factory: fn,
	      anonymous: false
	    });
	  });

	  it('define(id, factory)', function () {
	    x.define('b', fn);
	    mods.b.should.be.eql({
	      id: 'b',
	      depends: [],
	      factory: fn,
	      anonymous: false
	    });
	  });

	  it('define(a, depends)', function () {
	    x.define('c', ['b', 'c', 'd']);
	    mods.c.should.be.eql({
	      id: 'c',
	      depends: ['b', 'c', 'd'],
	      factory: undefined,
	      anonymous: false
	    });
	  });

	  it('define(depends, factory)', function () {
	    var o = x.define(['b', 'c', 'd'], fn);
	    /^____anonymous\d+$/.test(o.id).should.be.true();
	    o.anonymous.should.be.true();
	  });

	  it('define(fn)', function () {
	    var o = x.define(fn);
	    o.factory.should.be.equal(fn);
	    o.anonymous.should.be.true();
	  });

	  it('可以响应define事件', function () {
	    sinon.spy(loader, 'trigger');

	    x.define('test/a', ['a', 'b'], function () {});
	    var o = mods['test/a'];

	    loader.trigger.args[0].should.be.eql(['define', o]);
	  });

	  it('重复define模块会警告', function () {
	    sinon.spy(log, 'warn');

	    x.define('test/hello', 'hello world');
	    x.define('test/hello', 'hello world');
	    log.warn.called.should.be.true();
	    log.warn.restore();
	  });
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var util = __webpack_require__(2);
	var log = __webpack_require__(6);
	var klass = __webpack_require__(11);

	module.exports = klass({
	  init: function init(loader) {
	    this.loader = loader;
	  },

	  define: function define(id, depends, factory) {
	    var loader = this.loader;
	    var modules = loader.modules;

	    var module = regular(id, depends, factory);
	    id = module.id;

	    if (modules[id]) {
	      log.warn('module already defined, ignore: ' + id);
	      return modules[id];
	    }

	    log.debug('define module: ' + id, module);
	    modules[id] = module;

	    loader.trigger('define', module);

	    return module;
	  }
	});

	/**
	 * define(id, depends, factory)
	 * define(id, factory{not array})
	 * define(id, depends{array})
	 * define(depends{array}, factory)
	 * define(factory{function})
	 */
	var assert = util.assert;
	var isArray = util.isArray;
	var EMPTY = [];

	function regular(id, depends, factory) {
	  if (factory === undefined && !isArray(depends)) {
	    factory = depends;
	    depends = EMPTY;
	  }

	  if (typeof id === 'function') {
	    factory = id;
	    depends = EMPTY;
	    id = null;
	  } else if (isArray(id)) {
	    depends = id;
	    id = null;
	  }

	  assert(isArray(depends), 'arguments error, depends should be an array');

	  var anonymous = !id;
	  id = id || '____anonymous' + util.guid();

	  return { id: id, depends: depends, factory: factory, anonymous: anonymous };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var sinon = __webpack_require__(5);

	var Event = __webpack_require__(8);
	var Define = __webpack_require__(13);
	var Require = __webpack_require__(15);

	/* eslint max-nested-callbacks: [2, 4] */

	describe('require', function () {
	  it('使用require载入已定义的模块', function (done) {
	    var loader = create();
	    loader.define('a', ['b', 'c'], function (b, c) {
	      return [b, c];
	    });

	    loader.define('b', 'module b');
	    loader.define('c', 'module c');

	    loader.require(['a'], function (a) {
	      a.should.be.eql(['module b', 'module c']);
	      done();
	    });
	  });

	  it('相对路径', function (done) {
	    var loader = create();
	    loader.define('lib/util/a', ['./b', '../core/c', '../d'], function (b, c, d) {
	      return [b, c, d];
	    });

	    loader.define('lib/util/b', 'module b');
	    loader.define('lib/core/c', 'module c');
	    loader.define('lib/d', 'module d');

	    loader.require('lib/util/a', function (a) {
	      a.should.be.eql(['module b', 'module c', 'module d']);
	      done();
	    });
	  });

	  describe('使用require载入异步模块', function () {
	    var loader = create();
	    stub(loader);

	    it('最简单场景', function (done) {
	      loader.require(['simple'], function (simple) {
	        simple.should.be.equal('/assets/simple.js');
	        done();
	      });
	    });

	    it('有依赖的模块加载', function (done) {
	      loader.define('a', ['b', 'c'], 'module a');
	      loader.define('b', ['c', 'd', 'e'], 'module b');
	      // c, d, e is async
	      loader.require(['d', 'e', 'a', 'c', 'b'], function (d, e, a, c) {
	        // eslint-disable-line
	        a.should.be.equal('module a');
	        c.should.be.equal('/assets/c.js');
	        e.should.be.equal('/assets/e.js');
	        done();
	      });
	    });

	    function testForError(name, error, done) {
	      var fn = sinon.spy();
	      loader.on('error', fn);
	      loader.require(name);
	      setTimeout(function () {
	        fn.args[0].should.match(error);
	        loader.off('error', fn);
	        done();
	      }, 500); // should > 300ms, see stub
	    }

	    it('异常情况: not resolved', function (done) {
	      testForError('not-resolved', /can not resolve module: not-resolved/, done);
	    });

	    it('异常情况: not find module', function (done) {
	      testForError('not-exists', /can not find module: not-exists/, done);
	    });
	  });

	  it('compile error', function (done) {
	    var loader = create();
	    var fn = sinon.spy();
	    loader.on('error', fn);

	    loader.define('test', function () {
	      throw new Error('some error happen');
	    });

	    loader.require('test', function (test) {
	      (test === null).should.be.true();
	      fn.args[0].should.match(/some error happen/);
	      done();
	    });
	  });

	  it('介入compile流程', function () {
	    var loader = create();

	    loader.on('compile', function (module) {
	      if (module.factory === 'a') {
	        module.factory = 'b';
	      }
	    });

	    loader.define('compile/a', 'a');
	    loader.require(['compile/a'], function (a) {
	      a.should.be.equal('b');
	    });
	  });
	});

	function create() {
	  var loader = { modules: {} };
	  new Event(loader); // eslint-disable-line

	  var d = new Define(loader);
	  var r = new Require(loader);

	  loader.define = d.define.bind(d);
	  loader.require = r.require.bind(r);

	  return loader;
	}

	function stub(loader) {
	  loader.on('resolve', function (id) {
	    if (id === 'not-resolved') {
	      return null;
	    }
	    return '/assets/' + id + '.js';
	  });

	  loader.on('request', function (options, cb) {
	    var id = options.id;
	    setTimeout(function () {
	      if (id === 'not-exists') {
	        cb();
	        return;
	      }

	      loader.define(id, function () {
	        return options.url;
	      });

	      cb();
	    }, 300);
	  });
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var klass = __webpack_require__(11);
	var util = __webpack_require__(2);
	var log = __webpack_require__(6);

	var assert = util.assert;

	module.exports = klass({
	  init: function init(loader) {
	    this.loader = loader;
	    this.aliasCache = {};
	  },

	  require: function require(depends, callback) {
	    depends = util.isArray(depends) ? depends : [depends];

	    var module = {
	      proxy: true,
	      id: '____require' + util.guid(),
	      depends: depends,
	      factory: function factory() {
	        return arguments;
	      }
	    };

	    load(this, module, function () {
	      callback && callback.apply(null, module.exports);
	    });

	    return module.exports && module.exports[0];
	  }
	});

	function load(self, module, callback) {
	  log.debug('try init: ' + module.id);

	  if (module.loadtimes > 0) {
	    module.loadtimes++;
	    log.debug(module.id + ' is loaded ' + module.loadtimes + ' times');
	    callback();
	    return;
	  }

	  var loadlist = module.loadlist || (module.loadlist = []);
	  loadlist.push(callback);
	  if (loadlist.length > 1) {
	    log.debug('module is in loading: ' + module.id);
	    return;
	  }

	  loadDepends(self, module, function () {
	    compile(self, module, function () {
	      log.debug(module.id + ' is loaded');
	      module.loadtimes = loadlist.length;
	      delete module.loadlist;
	      util.each(loadlist, function (index, fn) {
	        fn();
	      });
	    });
	  });
	}
	//~ load

	var rRelative = /^\.\.?\//;

	function loadDepends(self, module, callback) {
	  var loader = self.loader;
	  var modules = loader.modules;

	  var depends = module.depends;
	  if (depends.length === 0) {
	    return callback();
	  }

	  var adepends = module.adepends = [];
	  var rpath = util.dirname(module.id);
	  util.each(depends, function (index, id) {
	    adepends[index] = rRelative.test(id) ? util.join(rpath, id) : id;
	  });

	  log.debug('try load depends: ', adepends);

	  // 并行加载依赖模块
	  var n = adepends.length;
	  var count = 0;

	  var aliasCache = self.aliasCache;

	  util.each(adepends, function (index, id) {
	    var aid = aliasCache[id] || loader.trigger('alias', id);
	    if (aid && id !== aid) {
	      log.debug('alias ' + id + ' -> ' + aid);
	      id = aid;
	      aliasCache[id] = id;
	      adepends[index] = id;
	    }

	    var called = false;
	    var cb = function cb() {
	      // istanbul ignore if
	      if (called) {
	        log.error('depend already loaded: ' + id);
	        return;
	      }
	      called = true;
	      count++;
	      count >= n && callback();
	    };

	    // 依赖的模块不需要异步加载
	    var o = modules[id];
	    if (o) {
	      load(self, o, cb);
	      return;
	    }

	    // 依赖的模块是异步加载
	    loadAsync(self, id, function (lo) {
	      load(self, lo, cb);
	    });
	  });
	}
	//~ loadDepends

	function compile(self, module, callback) {
	  var loader = self.loader;
	  var modules = loader.modules;

	  loader.trigger('compile', module);

	  var factory = module.factory;
	  if (typeof factory === 'function') {
	    (function () {
	      var depends = module.adepends;
	      var proxy = { id: module.id, exports: {} };
	      var list = [];

	      depends && depends.length && util.each(depends, function (index, id) {
	        var o = modules[id];
	        assert(o && 'exports' in o, 'module should already loaded: ' + id);
	        if (o.exports && typeof o.exports.$compile === 'function') {
	          list[index] = o.exports.$compile(proxy, module);
	        } else {
	          list[index] = o.exports;
	        }
	      });

	      try {
	        log.debug('compile ' + module.id, module);
	        factory = factory.apply(null, list);
	        if (factory === undefined) {
	          factory = proxy.exports;
	        }
	      } catch (e) {
	        factory = null;
	        loader.trigger('error', e);
	      }
	    })();
	  }

	  module.exports = factory;
	  callback();
	}
	//~ compile

	var requestList = {};

	function loadAsync(self, id, callback) {
	  var loader = self.loader;
	  var modules = loader.modules;

	  var url = loader.trigger('resolve', id);
	  if (!url) {
	    loader.trigger('error', new Error('can not resolve module: ' + id));
	    return;
	  }

	  log.debug('resolve ' + id + ' -> ' + url);

	  var list = requestList[id] || (requestList[id] = []);

	  var cb = function cb() {
	    var o = modules[id];
	    if (!o) {
	      loader.trigger('error', new Error('can not find module: ' + id));
	      return;
	    }

	    o.async = true;
	    o.url = url;
	    callback(o);
	  };

	  list.push(cb);
	  if (list.length > 1) {
	    return;
	  }

	  var options = {
	    id: id,
	    url: url,
	    namespace: loader.namespace
	  };

	  log.debug('try request...: ' + url);
	  loader.trigger('request', options, function () {
	    delete requestList[id];
	    util.each(list, function (index, fn) {
	      fn();
	    });
	  });
	}
	//~ loadAsync

/***/ }
/******/ ]);