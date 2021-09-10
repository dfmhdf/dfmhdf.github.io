! function (e) {
	var t = {};

	function n(r) {
		if (t[r]) return t[r].exports;
		var a = t[r] = {
			i: r,
			l: !1,
			exports: {}
		};
		return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports
	}
	n.m = e, n.c = t, n.d = function (e, t, r) {
		n.o(e, t) || Object.defineProperty(e, t, {
			enumerable: !0,
			get: r
		})
	}, n.r = function (e) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}, n.t = function (e, t) {
		if (1 & t && (e = n(e)), 8 & t) return e;
		if (4 & t && "object" == typeof e && e && e.__esModule) return e;
		var r = Object.create(null);
		if (n.r(r), Object.defineProperty(r, "default", {
				enumerable: !0,
				value: e
			}), 2 & t && "string" != typeof e)
			for (var a in e) n.d(r, a, function (t) {
				return e[t]
			}.bind(null, a));
		return r
	}, n.n = function (e) {
		var t = e && e.__esModule ? function () {
			return e.default
		} : function () {
			return e
		};
		return n.d(t, "a", t), t
	}, n.o = function (e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, n.p = "/", n(n.s = 3)
}([function (e, t, n) {
	! function (e) {
		"use strict";

		function t() {
			return "undefined" != typeof window
		}

		function n() {
			return location.protocol + "//" + location.host
		}

		function r() {
			if (!t()) return !1;
			var e = document.referrer || "",
				r = n();
			return e.substr(0, r.length) === r
		}

		function a() {
			return t() ? {
				type: "locale",
				value: function () {
					var e = void 0 !== navigator.languages ? navigator.languages[0] : navigator.language;
					return '"' === e[0] && (e = e.substr(1)), e.length > 0 && '"' === e[e.length - 1] && (e = e.substr(0, e.length - 1)), e && 5 === e.length && "-" === e[2] ? e.substr(0, 3) + e.substr(3).toLocaleUpperCase() : e
				}() || "<none>"
			} : {
				type: "locale",
				value: "<not-in-browser>"
			}
		}

		function o() {
			return t() ? {
				type: "screen-type",
				value: (e = window.innerWidth, e <= 414 ? "XS" : e <= 800 ? "S" : e <= 1200 ? "M" : e <= 1600 ? "L" : "XL")
			} : {
				type: "screen-type",
				value: "<not-in-browser>"
			};
			var e
		}

		function i() {
			return t() ? r() ? {
				type: "referrer",
				value: "<none>"
			} : {
				type: "referrer",
				value: document.referrer || "<none>"
			} : {
				type: "referrer",
				value: "<not-in-browser>"
			}
		}

		function s(e, n) {
			if (void 0 === e && (e = !1), void 0 === n && (n = !1), !t()) return {
				type: "path",
				value: "<not-in-browser>"
			};
			var r = window.location.pathname,
				a = window.location.hash,
				o = window.location.search;
			return e && n ? r += a : e ? r += a.substr(0, a.length - o.length) : n && (r += o), {
				type: "path",
				value: r
			}
		}

		function u(e, t) {
			return {
				type: "transition",
				value: e + "  ->  " + t
			}
		}

		function c(e, t) {
			return void 0 === t && (t = ""), e < 5e3 ? {
				type: "duration-interval",
				value: t + "< 5s"
			} : e < 15e3 ? {
				type: "duration-interval",
				value: t + "< 15s"
			} : e < 3e4 ? {
				type: "duration-interval",
				value: t + "< 30s"
			} : e < 6e4 ? {
				type: "duration-interval",
				value: t + "< 1m"
			} : e < 3e5 ? {
				type: "duration-interval",
				value: t + "< 5m"
			} : {
				type: "duration-interval",
				value: t + "> 5m"
			}
		}
		var l = Object.freeze({
				__proto__: null,
				locale: a,
				screenType: o,
				referrer: i,
				path: s,
				transition: u,
				durationInterval: c
			}),
			d = {},
			h = function () {
				function e(e, t) {
					void 0 === t && (t = d), this.projectId = e, this.options = t, this.uniques = {}, this.trackPageData = null, this.trackPageChange = this.trackPageChange.bind(this), this.trackLastPageTimeSpent = this.trackLastPageTimeSpent.bind(this)
				}
				return e.prototype.track = function (e) {
					if (this.options.disabled || !t()) return Promise.resolve();
					if (e.unique) {
						var n = JSON.stringify(e);
						if (this.uniques[n]) return Promise.resolve();
						this.uniques[n] = !0
					}
					var r = {
						id: e.id,
						projectId: this.projectId,
						ignoreErrors: this.options.ignoreErrors || !1
					};
					e.remove && (r.remove = !0), e.parameters && (r.parameters = e.parameters), e.update && (r.update = !0);
					var a = new XMLHttpRequest;
					a.open("post", "https://getinsights.io/app/tics", !0), a.setRequestHeader("Content-Type", "application/json"), a.send(JSON.stringify(r))
				}, e.prototype.trackPages = function (e) {
					if (!t()) return {
						stop: function () {}
					};
					if (this.trackPageData) return this.trackPageData.result;
					var n = setInterval(this.trackPageChange, 2e3),
						r = e || {},
						a = r.hash,
						o = void 0 !== a && a,
						i = r.search,
						u = void 0 !== i && i;
					return this.trackPageData = {
						hash: o,
						search: u,
						path: s(o, u).value,
						isOnFirstPage: !0,
						time: Date.now(),
						result: {
							stop: function () {
								clearInterval(n)
							}
						}
					}, this.trackSinglePage(!0, this.trackPageData.path), window.addEventListener("unload", this.trackLastPageTimeSpent), this.trackPageData.result
				}, e.prototype.getPreviousPage = function (e) {
					var t = this.trackPageData && this.trackPageData.path;
					return !e && t ? t : r() ? document.referrer.replace(n(), "") : document.referrer
				}, e.prototype.trackPageChange = function () {
					if (this.trackPageData) {
						var e = this.trackPageData,
							t = s(e.hash, e.search).value;
						t !== this.trackPageData.path && this.trackSinglePage(!1, t)
					}
				}, e.prototype.trackSinglePage = function (e, t) {
					if (this.trackPageData) {
						this.trackPageData.isOnFirstPage = e && !r();
						var n = this.trackPageData,
							s = n.time,
							l = n.isOnFirstPage,
							d = {
								path: t
							};
						l && (d.uniqueViews = t, d.referrer = i(), d.locale = a(), d.screenType = o());
						var h = this.getPreviousPage(e);
						if (h && h !== t && (d.transitions = u(h, t), !l)) {
							var f = Date.now();
							this.trackPageData.time = f, d.duration = c(f - s, h + " - ")
						}
						this.trackPageData.path = t, this.track({
							id: "page-views",
							parameters: d
						})
					}
				}, e.prototype.trackLastPageTimeSpent = function () {
					var e = this.trackPageData && this.trackPageData.time;
					if (e && "function" == typeof navigator.sendBeacon && !this.options.disabled && this.trackPageData) {
						var t = this.trackPageData,
							r = t.isOnFirstPage,
							a = t.path,
							o = {};
						o.duration = c(Date.now() - e, a + " - ");
						var i = document.activeElement && document.activeElement.href || "",
							s = n();
						i ? "/" !== i[0] && i.substr(0, s.length) !== n() && (o.transitions = u(a, i)) : o.bounces = r ? "Yes" : "No", navigator.sendBeacon = navigator.sendBeacon || function (e, t) {
							var n = new XMLHttpRequest;
							n.open("post", e, !1), n.send(t)
						}, navigator.sendBeacon("https://getinsights.io/app/tics", JSON.stringify({
							id: "page-views",
							projectId: this.projectId,
							parameters: o,
							ignoreErrors: this.options.ignoreErrors || !1,
							update: !0
						}))
					}
				}, e
			}();
		e.DEFAULT_APP = null, e.App = h, e.init = function (n, r) {
			if (!t() || e.DEFAULT_APP) throw new Error("Already initialized!");
			return e.DEFAULT_APP = new h(n, r), e.DEFAULT_APP
		}, e.parameters = l, e.track = function (n) {
			e.DEFAULT_APP && t() && e.DEFAULT_APP.track(n)
		}, e.trackPages = function (n) {
			return e.DEFAULT_APP && t() ? e.DEFAULT_APP.trackPages(n) : {
				stop: function () {}
			}
		}, Object.defineProperty(e, "__esModule", {
			value: !0
		})
	}(t)
}, function (e, t, n) {
	"use strict";
	(function (e) {
		n.d(t, "a", (function () {
			return a
		}));
		var r = n(2);

		function a(e) {
			const t = (t, n, a) => {
					Object(r.a)(t, {
						hashMode: !1,
						trackLocalhost: !1,
						url: location.href,
						domain: location.hostname,
						referrer: document.referrer || null,
						deviceWidth: window.innerWidth,
						apiHost: "https://plausible.io",
						...e,
						...a
					}, n)
				},
				n = (e, n) => {
					t("pageview", n, e)
				};
			return {
				trackEvent: t,
				trackPageview: n,
				enableAutoPageviews: () => {
					const t = () => n(),
						r = history.pushState;
					return r && (history.pushState = function (e, n, a) {
							r.apply(this, [e, n, a]), t()
						}, addEventListener("popstate", t)), e && e.hashMode && addEventListener("hashchange", t), n(),
						function () {
							r && (history.pushState = r, removeEventListener("popstate", t)), e && e.hashMode && removeEventListener("hashchange", t)
						}
				},
				enableAutoOutboundTracking: (e = document, n = {
					subtree: !0,
					childList: !0,
					attributes: !0,
					attributeFilter: ["href"]
				}) => {
					function r(e) {
						t("Outbound Link: Click", {
							props: {
								url: this.href
							}
						}), setTimeout(() => {
							location.href = this.href
						}, 150), e.preventDefault()
					}
					const a = new Set;

					function o(e) {
						e instanceof HTMLAnchorElement ? e.host !== location.host && (e.addEventListener("click", r), a.add(e)) : "querySelectorAll" in e && e.querySelectorAll("a").forEach(o)
					}

					function i(e) {
						e instanceof HTMLAnchorElement ? (e.removeEventListener("click", r), a.delete(e)) : "querySelectorAll" in e && e.querySelectorAll("a").forEach(i)
					}
					const s = new MutationObserver(e => {
						e.forEach(e => {
							"attributes" === e.type ? (i(e.target), o(e.target)) : "childList" === e.type && (e.addedNodes.forEach(o), e.removedNodes.forEach(i))
						})
					});
					return e.querySelectorAll("a").forEach(o), s.observe(e, n),
						function () {
							a.forEach(e => {
								e.removeEventListener("click", r)
							}), a.clear(), s.disconnect()
						}
				}
			}
		}
	}).call(this, n(4))
}, function (e, t, n) {
	"use strict";

	function r(e, t, n) {
		const r = /^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*:)*?:?0*1$/.test(location.hostname) || "file:" === location.protocol;
		if (!t.trackLocalhost && r) return console.warn("[Plausible] Ignoring event because website is running locally");
		const a = {
				n: e,
				u: t.url,
				d: t.domain,
				r: t.referrer,
				w: t.deviceWidth,
				h: t.hashMode ? 1 : 0,
				p: n && n.props ? JSON.stringify(n.props) : void 0
			},
			o = new XMLHttpRequest;
		o.open("POST", t.apiHost + "/api/event", !0), o.setRequestHeader("Content-Type", "text/plain"), o.send(JSON.stringify(a)), o.onreadystatechange = () => {
			4 === o.readyState && n && n.callback && n.callback()
		}
	}
	n.d(t, "a", (function () {
		return r
	}))
}, function (e, t, n) {
	n(5), e.exports = n(6)
}, function (e, t) {
	var n, r, a = e.exports = {};

	function o() {
		throw new Error("setTimeout has not been defined")
	}

	function i() {
		throw new Error("clearTimeout has not been defined")
	}

	function s(e) {
		if (n === setTimeout) return setTimeout(e, 0);
		if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(e, 0);
		try {
			return n(e, 0)
		} catch (t) {
			try {
				return n.call(null, e, 0)
			} catch (t) {
				return n.call(this, e, 0)
			}
		}
	}! function () {
		try {
			n = "function" == typeof setTimeout ? setTimeout : o
		} catch (e) {
			n = o
		}
		try {
			r = "function" == typeof clearTimeout ? clearTimeout : i
		} catch (e) {
			r = i
		}
	}();
	var u, c = [],
		l = !1,
		d = -1;

	function h() {
		l && u && (l = !1, u.length ? c = u.concat(c) : d = -1, c.length && f())
	}

	function f() {
		if (!l) {
			var e = s(h);
			l = !0;
			for (var t = c.length; t;) {
				for (u = c, c = []; ++d < t;) u && u[d].run();
				d = -1, t = c.length
			}
			u = null, l = !1,
				function (e) {
					if (r === clearTimeout) return clearTimeout(e);
					if ((r === i || !r) && clearTimeout) return r = clearTimeout, clearTimeout(e);
					try {
						r(e)
					} catch (t) {
						try {
							return r.call(null, e)
						} catch (t) {
							return r.call(this, e)
						}
					}
				}(e)
		}
	}

	function p(e, t) {
		this.fun = e, this.array = t
	}

	function g() {}
	a.nextTick = function (e) {
		var t = new Array(arguments.length - 1);
		if (arguments.length > 1)
			for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
		c.push(new p(e, t)), 1 !== c.length || l || s(f)
	}, p.prototype.run = function () {
		this.fun.apply(null, this.array)
	}, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = g, a.addListener = g, a.once = g, a.off = g, a.removeListener = g, a.removeAllListeners = g, a.emit = g, a.prependListener = g, a.prependOnceListener = g, a.listeners = function (e) {
		return []
	}, a.binding = function (e) {
		throw new Error("process.binding is not supported")
	}, a.cwd = function () {
		return "/"
	}, a.chdir = function (e) {
		throw new Error("process.chdir is not supported")
	}, a.umask = function () {
		return 0
	}
}, function (e, t, n) {
	"use strict";
	n.r(t);
	var r, a = {
			body: document.querySelector("body"),
			wrapper: document.getElementById("wrapper"),
			header: document.getElementById("header"),
			nav: document.getElementById("nav"),
			hero: document.getElementById("hero"),
			main: document.getElementById("main"),
			containerCentre: document.getElementById("container-centre"),
			containerRight: document.getElementById("container-right"),
			preFooter: document.getElementById("pre-footer"),
			footer: document.getElementById("footer"),
			mobileNav: document.getElementById("mobile-nav"),
			mobileNavToggle: document.getElementById("mobile-nav-toggle"),
			carouselSlide: function (e) {
				return document.getElementById("carousel-slide-" + e)
			},
			carouselButton: function (e) {
				return document.getElementById("carousel-button-" + e)
			}
		},
		o = (a.mobileNavToggle.addEventListener("click", (function () {
			this.classList.toggle("menu-toggle-active"), a.mobileNav.classList.toggle("menu-visible"), "false" === this.getAttribute("aria-expanded") ? this.setAttribute("aria-expanded", "true") : this.setAttribute("aria-expanded", "false")
		})), function () {
			var e = a.wrapper.querySelectorAll("[data-lazy]");
			if (e.length > 0) {
				var t = new IntersectionObserver((function (e, t) {
					e.forEach((function (e) {
						var n, r;
						e.isIntersecting && (n = e.target, r = n.dataset.lazy, n.src = r, n.classList.add("loaded"), t.unobserve(e.target))
					}))
				}), {
					threshold: .5
				});
				e.forEach((function (e) {
					t.observe(e)
				}))
			}
		}(), n(0)),
		i = n(1).a;
	Object(o.init)("gQGyFfOw2oqddzfj"), Object(o.trackPages)(), (r = i({
		domain: "pps-lab.github.io"
	})).enableAutoPageviews(), r.enableAutoOutboundTracking()
}, function (e, t) {}]);
