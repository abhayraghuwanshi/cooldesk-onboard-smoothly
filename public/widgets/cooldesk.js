// CoolDesk widget runtime (v1).
// - Applies ?theme= from the query string (dark default).
// - `cooldesk.get(key, fallback)` reads config params.
// - `cooldesk.store` persists small state; falls back to memory when the iframe
//   sandbox gives an opaque origin and localStorage throws.
// - Host bridge: the embedding app sends {type:'cooldesk:init'} with a
//   MessagePort; widget identity is the port, never e.origin. Widgets on the
//   public site simply run with no host (demo mode).
(function () {
  var params = new URLSearchParams(location.search);
  document.documentElement.dataset.theme = params.get("theme") === "light" ? "light" : "dark";

  var pending = new Map();
  var seq = 0;

  window.cooldesk = {
    version: 1,
    params: params,
    get: function (key, fallback) {
      var v = params.get(key);
      return v === null || v === "" ? fallback : v;
    },
    hosted: false,
    onHost: null,
    _port: null,
    call: function (method, args) {
      var port = this._port;
      if (!port) return Promise.reject(new Error("no-host"));
      var id = ++seq;
      return new Promise(function (resolve, reject) {
        pending.set(id, { resolve: resolve, reject: reject });
        port.postMessage({ id: id, method: method, args: args || {} });
      });
    },
    store: {
      _mem: {},
      get: function (key, fallback) {
        try {
          var raw = localStorage.getItem("cd:" + key);
          return raw === null ? fallback : JSON.parse(raw);
        } catch (e) {
          return key in this._mem ? this._mem[key] : fallback;
        }
      },
      set: function (key, value) {
        try {
          localStorage.setItem("cd:" + key, JSON.stringify(value));
        } catch (e) {
          this._mem[key] = value;
        }
      },
    },
  };

  window.addEventListener("message", function (e) {
    var d = e.data;
    if (d && d.type === "cooldesk:init" && e.ports && e.ports[0]) {
      var port = e.ports[0];
      window.cooldesk._port = port;
      window.cooldesk.hosted = true;
      port.onmessage = function (ev) {
        var m = ev.data || {};
        var p = pending.get(m.id);
        if (p) {
          pending.delete(m.id);
          if (m.error) p.reject(new Error(m.error));
          else p.resolve(m.result);
        }
      };
      port.postMessage({ id: 0, method: "ready", args: { version: 1 } });
      if (typeof window.cooldesk.onHost === "function") window.cooldesk.onHost();
    }
  });
})();
