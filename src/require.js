'use strict';


const klass = require('./klass');
const util = require('./util');
const log = require('./log');


const assert = util.assert;


module.exports = klass({
  init: function(loader) {
    this.loader = loader;
    this.aliasCache = {};
  },


  require: function(depends, callback) {
    depends = util.isArray(depends) ? depends : [depends];

    const module = {
      proxy: true,
      id: '____require' + util.guid(),
      depends: depends,
      factory: function() {
        return arguments;
      }
    };

    load(this, module, function() {
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

  const loadlist = module.loadlist || (module.loadlist = []);
  loadlist.push(callback);
  if (loadlist.length > 1) {
    log.debug('module is in loading: ' + module.id);
    return;
  }

  loadDepends(self, module, function() {
    compile(self, module, function() {
      log.debug(module.id + ' is loaded');
      module.loadtimes = loadlist.length;
      delete module.loadlist;
      util.each(loadlist, function(index, fn) {
        fn();
      });
    });
  });
}
//~ load


function loadDepends(self, module, callback) {
  const loader = self.loader;
  const modules = loader.modules;
  const aliasCache = self.aliasCache;

  const depends = module.depends;
  if (depends.length === 0) {
    return callback();
  }

  const adepends = module.adepends = depends.slice(0);
  log.debug('load depends: ', adepends);

  const works = util.map(depends, function(index, id) {
    return function(fn) {
      const aid = aliasCache[id] || loader.trigger('alias', id);
      if (aid && id !== aid) {
        log.debug('alias ' + id + ' -> ' + aid);
        id = aid;
        aliasCache[id] = id;
        adepends[index] = id;
      }

      const o = modules[id];
      const cb = function(lo) {
        load(self, lo, fn);
      };

      o ? cb(o) : loadAsync(self, id, cb);
    };
  });

  util.when(works, callback);
}
//~ loadDepends


function compile(self, module, callback) {
  const loader = self.loader;
  const modules = loader.modules;

  loader.trigger('compile', module);

  let factory = module.factory;
  if (typeof factory === 'function') {
    const depends = module.adepends;
    const proxy = { id: module.id, exports: {} };
    const list = [];

    depends && depends.length &&
    util.each(depends, function(index, id) {
      const o = modules[id];
      assert((o && ('exports' in o)), 'module should already loaded: ' + id);
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
  }

  module.exports = factory;
  callback();
}
//~ compile


const requestList = {};

function loadAsync(self, id, callback) {
  const loader = self.loader;
  const modules = loader.modules;

  const url = loader.trigger('resolve', id);
  if (!url) {
    loader.trigger('error', new Error('can not resolve module: ' + id));
    return;
  }

  log.debug('resolve ' + id + ' -> ' + url);

  const list = requestList[id] || (requestList[id] = []);

  const cb = function() {
    const o = modules[id];
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

  const options = {
    id: id,
    url: url,
    namespace: loader.namespace
  };

  log.debug('try request...: ' + url);
  loader.trigger('request', options, function() {
    delete requestList[id];
    util.each(list, function(index, fn) {
      fn();
    });
  });
}
//~ loadAsync
