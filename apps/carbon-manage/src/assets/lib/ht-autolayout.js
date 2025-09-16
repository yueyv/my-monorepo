!(function(e, d, o) {
  'use strict';
  var m = 'ht',
    M = m + '.layout.',
    C = e[m] || module.parent.exports.ht,
    b = null,
    H = C.Default,
    s = H.def,
    I = C.List,
    R = C.Node,
    i = C.Edge,
    w = C.Group,
    n = Math,
    k = n.floor,
    X = n.ceil,
    Y = n.sqrt,
    E = n.max,
    z = n.min,
    V = n.abs,
    u = n.cos,
    T = n.sin,
    Z = n.PI,
    G = 2 * Z,
    l = Z / 2,
    D = n.atan,
    B = n.atan2,
    x = n.random,
    Q = n.pow,
    g = Number.MAX_VALUE,
    S = Number.MIN_VALUE,
    W = 'circular',
    J = 'symmetric',
    p = 'hierarchical',
    A = 'towardnorth',
    K = 'towardsouth',
    a = 'towardeast',
    _ = 'towardwest',
    r = function() {
      throw 'Oops!';
    },
    U = function(m) {
      return W === m
        ? new gi()
        : J === m
        ? new Jj()
        : p === m
        ? new Am()
        : m === A || m === K || m === a || m === _
        ? new Gp()
        : b;
    },
    $ = function(f) {
      return f === _
        ? new h(l)
        : f === a
        ? new h(-l)
        : f === A
        ? new h(Z)
        : b;
    },
    h = function(c) {
      (this.s = T(c)), (this.c = u(c));
    };
  h.prototype.tf = function(q, f) {
    return (
      1 === arguments.length && ((f = q.y), (q = q.x)),
      {
        x: this.c * q - this.s * f,
        y: this.s * q + this.c * f,
      }
    );
  };
  var c = function(E, H) {
    (this.x = E), (this.y = H);
  };
  s(c, d, {
    equals: function(y) {
      return this === y
        ? !0
        : y instanceof c
        ? y.x === this.x && y.y === this.y
        : !1;
    },
  });
  var O = function(E, t) {
    (this.width = E), (this.height = t);
  };
  s(O, d, {});
  var v = function(w, C) {
    (this.x = w), (this.y = C);
  };
  s(v, d, {});
  var P = function() {
    var u = arguments;
    2 === u.length
      ? (P.superClass.constructor.call(
          this,
          u[1].width,
          u[1].height
        ),
        (this.x = u[0].x),
        (this.y = u[0].y))
      : (P.superClass.constructor.call(this, u[2], u[3]),
        (this.x = u[0]),
        (this.y = u[1]));
  };
  s(P, O, {});
  var y = function(I, x) {
    if (y.a2(I.x, x.x))
      (this._a = 1), (this._b = 0), (this._c = -I.x);
    else {
      this._b = -1;
      var q = (x.y - I.y) / (x.x - I.x),
        M = I.y - I.x * q;
      (this._a = q), (this._c = M);
    }
  };
  s(y, d, {
    a3: function() {
      return this._a;
    },
    a4: function() {
      return this._b;
    },
    a5: function() {
      return this._c;
    },
  }),
    (y.a6 = function(s, p) {
      if (y.a1(s.a3()) && y.a1(p.a3())) return b;
      if (y.a1(s.a4()) && y.a1(p.a4())) return b;
      if (y.a1(p.a4())) {
        var N = s;
        (s = p), (p = N);
      }
      var t,
        J,
        K = s.a3(),
        Y = s.a4(),
        x = -s.a5();
      y.a1(s.a3())
        ? ((t = p.a4()), (J = -p.a5()))
        : ((t = p.a4() - (p.a3() / s.a3()) * s.a4()),
          (J = -p.a5() - (p.a3() / s.a3()) * -s.a5()));
      var z = J / t,
        a = (x - z * Y) / K;
      return new c(a, z);
    }),
    (y.a1 = function(Y) {
      return y.a2(Y, 0);
    }),
    (y.a2 = function(I, k) {
      return V(I - k) < 1e-5;
    });
  var L = function(M) {
    if (((this._a = new Ie()), M))
      for (var D = 0; D < M.size(); D++)
        this._a.aa(M.get(D));
  };
  s(L, d, {
    c: function() {
      return this._a.ah();
    },
    d: function() {
      return this._a.ah();
    },
    a: function() {
      for (var x = new I(), V = this.c(); V.i1(); V.i2())
        x.add(V.i6(), 0);
      return new L(x);
    },
    b: function() {
      return this._a.ay();
    },
  });
  var F = function(r, q) {
    (this.x = r), (this.y = q);
  };
  s(F, d, {
    a: function(J, X) {
      (this.x = J), (this.y = X);
    },
  });
  var q = function(D, L) {
    (this.x = D || 0), (this.y = L || 0);
  };
  s(q, d, {
    b: function() {
      return new q(this.x, this.y);
    },
    a: function(i) {
      this.z = i;
    },
    c: function() {
      return this.x;
    },
    d: function() {
      return this.y;
    },
    f: function(_, Y) {
      (this.x = _), (this.y = Y);
    },
  });
  var j = function(y) {
    (this._c = new Ie()),
      y
        ? (this.ac(y.a8().b()), this.ad(y.a9().b()))
        : (this.ac(new q()), this.ad(new q()));
  };
  s(j, d, {
    a6: function() {
      return this.a5(this);
    },
    ac: function(l) {
      l.a(this), (this._a = l);
    },
    ad: function(P) {
      P.a(this), (this._b = P);
    },
    a8: function() {
      return this._a;
    },
    a9: function() {
      return this._b;
    },
    a1: function(j, K) {
      return this.a4(j, K, this.aa());
    },
    a2: function() {
      return this._c.ay();
    },
    a7: function(M) {
      return this._c.ak(M);
    },
    aa: function() {
      return 0 === this._c.ay() ? b : this._c.as();
    },
    a3: function() {
      this._c.af();
    },
    i2: function(f) {
      var G = this.a7(f);
      return G ? new c(G.x, G.y) : b;
    },
    i1: function() {
      return this.a2();
    },
    i6: function() {
      var t = this.a8();
      return new c(t.c(), t.d());
    },
    i7: function() {
      var V = this.a9();
      return new c(V.c(), V.d());
    },
    i8: function(B) {
      this.a8().f(B.x, B.y);
    },
    i9: function(j) {
      this.a9().f(j.x, j.y);
    },
    i3: function(w, T, k) {
      var B = this.a7(w);
      B && B.a(T, k);
    },
    i4: function(W, Y) {
      this.a1(W, Y);
    },
    i5: function() {
      this.a3();
    },
  });
  var t = function(l) {
    t.superClass.constructor.call(this, l);
  };
  s(t, j, {
    a5: function(B) {
      return new t(B);
    },
    a4: function(Z, Q, V) {
      var _ = new F(Z, Q);
      return this.ab(_, V), _;
    },
    ab: function(t, R) {
      this._c.an(t, this._c.al(R));
    },
  });
  var f = function() {
    if (2 === arguments.length) {
      var G = arguments[0],
        D = arguments[1];
      (this._s = !1),
        (this._w = 30),
        (this._h = 30),
        (this._x = G - this._w / 2),
        (this._y = D - this._h / 2);
    } else {
      var u = arguments[0];
      (this._s = u._s),
        (this._w = u._w),
        (this._h = u._h),
        (this._x = u._x),
        (this._y = u._y);
    }
  };
  s(f, d, {
    m3: function() {
      return this.m2(this);
    },
    m4: function() {
      return this._x + this._w / 2;
    },
    m5: function() {
      return this._y + this._h / 2;
    },
    m6: function(o, V) {
      (this._x = o - this._w / 2),
        (this._y = V - this._h / 2);
    },
    i1: function() {
      return this._x;
    },
    i2: function() {
      return this._y;
    },
    i5: function(E, g) {
      (this._x = E), (this._y = g);
    },
    i3: function() {
      return this._w;
    },
    i4: function() {
      return this._h;
    },
    i6: function(H, t) {
      var u = (this._w - H) / 2,
        m = (this._h - t) / 2;
      (this._x += u),
        (this._y += m),
        (this._w = H),
        (this._h = t);
    },
    m1: function($) {
      var n, j, v, N;
      $.width <= 0
        ? ((n = this._x),
          (j = this._x + this._w),
          (v = this._y),
          (N = this._y + this._h))
        : ((n = z(this._x, $.x)),
          (j = E(this._x + this._w, $.x + $.width)),
          (v = z(this._y, $.y)),
          (N = E(this._y + this._h, $.y + $.height))),
        ($.x = n),
        ($.y = v),
        ($.width = j - n),
        ($.height = N - v);
    },
  });
  var N = function(I) {
    I
      ? N.superClass.constructor.call(this, I)
      : N.superClass.constructor.call(this, 0, 0);
  };
  s(N, f, {
    m2: function(C) {
      return new N(C);
    },
  });
  var $m = {
      a2: function(R) {
        var B = fr.a2(gm.a(R.xa()));
        return $m.a4(R, B, $m.a3(R, B));
      },
      a3: function(t, L) {
        for (var C = t.x9(); C.i1(); C.i2())
          L.i7(C.i9(), -1);
        for (
          var B = 0, G = new vc(t.xa()), Y = t.x9();
          Y.i1();
          Y.i2()
        ) {
          var w = Y.i9();
          -1 === L.i2(w) && $m.a(w, G, L, B++);
        }
        return B;
      },
      a6: function(I) {
        for (
          var K = new Ur(), W = $m.a2(I), q = 0;
          q < W.length - 1;
          q++
        ) {
          var y = I.xo(W[q].x2(), W[q + 1].x3());
          K.aa(y);
        }
        return K;
      },
      a4: function($, h, r) {
        for (var W = [], l = 0, w = $.x9(); r > l; l++)
          W[l] = new $r();
        for (; w.i1(); w.i2()) W[h.i2(w.i9())].ae(w.i9());
        return W;
      },
      a: function(l, s, U, Z) {
        for (s.c(l), U.i7(l, Z); !s.a(); ) {
          l = s.b();
          for (var G = l.ag(); G; G = G.a8()) {
            var t = G.a3();
            -1 === U.i2(t) && (U.i7(t, Z), s.c(t));
          }
          for (var n = l.ae(); n; n = n.a7()) {
            var P = n.a2();
            -1 === U.i2(P) && (U.i7(P, Z), s.c(P));
          }
        }
      },
      a1: function(C, $, g) {
        var F = new fb($, g);
        return F.a8(C), F._i;
      },
      a5: function(H, O, P) {
        for (var _ = [], m = 0; P > m; m++) _[m] = new Ur();
        for (var n = H.xf(); n.i1(); n.i2())
          _[O.i2(n.i8())].aa(n.i8());
        return _;
      },
      a7: function(l) {
        var c = new Ur(),
          o = fr.a3(gm.b(l.xa())),
          i = fr.a4(gm.a(l.xh())),
          m = $m.a1(l, i, o),
          L = $m.a5(l, i, m);
        if (L.length > 1) {
          for (var P = new $r(), I = 0; I < L.length; I++) {
            var B = L[I],
              f = b;
            if (1 === B.ay()) {
              var h = B.c2();
              1 === h.a2().ad()
                ? (f = h.a2())
                : 1 === h.a3().ad() && (f = h.a3());
            } else {
              for (var j = B.c1(); j.i1(); j.i2()) {
                var F = j.i8();
                if (o.i4(F.a2()))
                  if (f) {
                    if (f !== F.a2()) {
                      f = b;
                      break;
                    }
                  } else f = F.a2();
                if (o.i4(F.a3()))
                  if (f) {
                    if (f !== F.a3()) {
                      f = b;
                      break;
                    }
                  } else f = F.a3();
              }
              if (f) {
                var _ = B.c2();
                f = _.a2() !== f ? _.a2() : _.a3();
              }
            }
            f && P.aa(f);
          }
          for (var e, S = P.x4(); !P.ar(); S = e)
            (e = P.x4()), c.ac(l.xo(S, e));
        }
        return c;
      },
    },
    Jl = function() {
      (this._c = 0),
        (this._d = 0),
        (this._e = 0),
        (this._b = !0),
        (this._f = !1);
    };
  s(Jl, d, {
    a6: function(H) {
      this._f = H;
    },
    a7: function(F) {
      this._b = F;
    },
    a8: function(i) {
      0 !== i.x0() && this.a9(i, i.x9().i9());
    },
    a9: function(_, L) {
      if (
        ((this._xx = _.xk()),
        (this._c = _.xl()),
        (this._d = 0),
        (this._e = 0),
        this.a0(L),
        this._b)
      )
        for (var p = _.x9(); p.i1(); p.i2()) {
          var c = p.i9();
          this._xx.i1(c) || (this.a1(c), this.a0(c));
        }
      _.xi(this._xx), _.xj(this._c);
    },
    a0: function(W) {
      var V = ++this._d;
      this._xx.z1(W, Jl._B), this.a5(W, V);
      for (
        var u = this._f ? W.ap() : W.af();
        u.i1();
        u.i2()
      ) {
        var X = u.i8();
        if (!this._c.i4(X)) {
          this._c.i7(X, !0);
          var C = X.a1(W);
          this._xx.i1(C)
            ? this.a3(X, C, !1)
            : (this.a3(X, C, !0),
              this.a0(C),
              this.a2(X, C));
        }
      }
      this.a4(W, V, ++this._e), this._xx.z1(W, Jl._C);
    },
    a5: function() {},
    a4: function() {},
    a3: function() {},
    a2: function() {},
    a1: function() {},
  }),
    (Jl._B = {}),
    (Jl._C = {});
  var ib = function(D) {
    this._a = D;
  };
  s(ib, Jl, {
    a5: function(N) {
      var X = this._a._ah.i2(N);
      this._a._ad[X].ae(N);
    },
  });
  var hi = function(_) {
    this._a = _;
  };
  s(hi, Jl, {
    a2: function(O, t) {
      var H = O.a1(t),
        X = this._a[H.al()],
        T = this._a[t.al()];
      T._a + 1 > X._a
        ? ((X._c = X._a),
          (X._b = X._d),
          (X._a = T._a + 1),
          (X._d = O))
        : T._a + 1 > X._c &&
          ((X._c = T._a + 1), (X._b = O));
    },
  });
  var Vb = function(S) {
    this._a = S;
  };
  s(Vb, Jl, {
    a3: function(s, y, v) {
      v && s.a2() === y && this._a.ac(s);
    },
  });
  var Be = function() {
    (this._a = 0), (this._c = 0);
  };
  s(Be, d, {});
  var Ld = function() {
    this._a = 0;
  };
  s(Ld, d, {
    a1: function(Y, E) {
      this._a = 0;
      for (var S = E.length - 1; S >= 0; S--) E[S] = -1;
      for (var t = Y.x9(); t.i1(); t.i2()) {
        var I = t.i9();
        if (0 === I.ak()) {
          this.a2(I, I.al(), E);
          break;
        }
      }
      for (var i = Y.x9(); i.i1(); i.i2()) {
        var v = i.i9(),
          j = v.al();
        -1 === E[j] && this.a2(v, j, E);
      }
    },
    a2: function(X, t, n) {
      n[t] = -2;
      for (var f = X.ag(); f; ) {
        var s = f.a3(),
          D = s.al();
        switch (n[D]) {
          case -1:
            this.a2(s, D, n);
          case -2:
          default:
            f = f.a8();
        }
      }
      n[t] = this._a++;
    },
  });
  var Wi = {
      a1: function(W) {
        var n = new Te();
        return n.a8(W), n._n;
      },
      a2: function(Q) {
        var t,
          i = Q.x9(),
          n = 0;
        for (i.i4(); i.i1(); i.i2())
          0 === i.i9().ak() && ((t = i.i9()), n++);
        if (1 === n) return t;
        for (n = 0, i.i4(); i.i1(); i.i2())
          0 === i.i9().ao() && ((t = i.i9()), n++);
        return 1 === n ? t : Wi.a8(Q);
      },
      a8: function(i) {
        var f = gm.a(i.x0()),
          A = fr.a2(f);
        return Wi.a6(i, A);
      },
      a6: function(h, Z) {
        var s = h.xd(),
          d = gm.d(1),
          $ = gm.a(h.x0(), -1),
          M = Wi.a4(h, s);
        Wi.a7(s, Z, d, $, -1);
        for (var x = M.c1(); x.i1(); x.i2()) h.x3(x.i8());
        return d[0];
      },
      a7: function(K, d, b, g, r) {
        for (var _ = 0, H = K.ag(); H; H = H.a8()) {
          var G = H.a3(),
            L = Wi.a7(G, d, b, g, r);
          L > r && (r = L), (_ += g[G.al()]);
        }
        for (
          var F = _ * (K._g.xa() - 1 - _), N = K.ag();
          N;
          N = N.a8()
        )
          for (var S = N.a3(), m = N.a8(); m; m = m.a8()) {
            var J = m.a3();
            F += g[S.al()] * g[J.al()];
          }
        return (
          d.i7(K, F),
          (g[K.al()] = _ + 1),
          F > r && ((r = F), (b[0] = K)),
          r
        );
      },
      a4: function(J, n) {
        var E = new Ur(),
          t = new Vb(E);
        t.a6(!1), t.a9(J, n);
        for (var d = E.c1(); d.i1(); d.i2()) J.x3(d.i8());
        return E;
      },
      a3: function(X) {
        return Wi.a4(X, Wi.a2(X));
      },
    },
    Te = function() {
      (this._n = !0), this.a6(!1);
    };
  s(Te, Jl, {
    a3: function(F, w, Z) {
      Z || (this._n = !1);
    },
    a1: function() {
      this._n = !1;
    },
  });
  var fb = function(G, Z) {
    (this._i = 0),
      (this._m = Z),
      (this._j = G),
      (this._l = !1);
  };
  s(fb, Jl, {
    a8: function(R) {
      (this._h = gm.a(R.x0())),
        (this._k = gm.a(R.x0())),
        (this._g = new vc(R.xh())),
        fb.superClass.a8.call(this, R);
    },
    a5: function(x, O) {
      this._k[x.al()] = this._h[x.al()] = O;
    },
    a3: function(b, e, W) {
      if ((this._g.c(b), !W)) {
        var N = b.a1(e);
        this._h[N.al()] = z(
          this._h[N.al()],
          this._k[e.al()]
        );
      }
    },
    a1: function() {
      this._l = !1;
    },
    a2: function(Z, A) {
      var N = Z.a1(A);
      if (this._h[A.al()] >= this._k[N.al()]) {
        for (
          ;
          this._g.d() !== Z;
          this._j.i5(this._g.b(), this._i)
        );
        this._j.i5(this._g.b(), this._i),
          this._i++,
          this._g.a()
            ? this._l
              ? this._m.i5(N, !0)
              : (this._l = !0)
            : this._m.i5(N, !0);
      }
      this._h[N.al()] = z(this._h[N.al()], this._h[A.al()]);
    },
  });
  var ui = function(v, U) {
    (this._h = !1), (this._i = v), (this._g = U);
  };
  s(ui, d, {
    z1: function(S, W) {
      S._c[this._i] = W;
    },
    i1: function($) {
      return $._c[this._i];
    },
    i5: function(O, T) {
      O._c[this._i] = T;
    },
    i4: function(X) {
      return X._c[this._i];
    },
    i7: function(z, o) {
      z._c[this._i] = o;
    },
    i2: function(w) {
      var P = w._c[this._i];
      return P ? P : 0;
    },
    i6: function(w, n) {
      w._c[this._i] = n;
    },
    i3: function(E) {
      var y = E._c[this._i];
      return y ? y : 0;
    },
    c: function() {
      return this._h;
    },
    d: function() {
      this._h = !0;
    },
  });
  var td = function(T, o) {
    (this._c = !1), (this._d = T), (this._b = o);
  };
  s(td, d, {
    i8: function(n, Y) {
      n._c[this._d] = Y;
    },
    i1: function(W) {
      return W._c[this._d];
    },
    i7: function(e, L) {
      e._c[this._d] = L;
    },
    i4: function(q) {
      var t = q._c[this._d];
      return t ? t : !1;
    },
    i5: function(H, p) {
      H._c[this._d] = p;
    },
    i2: function(Y) {
      var l = Y._c[this._d];
      return l ? l : 0;
    },
    i6: function(k, n) {
      k._c[this._d] = n;
    },
    i3: function(T) {
      var x = T._c[this._d];
      return x ? x : 0;
    },
    a: function() {
      return this._c;
    },
    b: function() {
      this._c = !0;
    },
  });
  var fo = function(m) {
    (this._bb = m), this.i4();
  };
  s(fo, d, {
    i1: function() {
      return this._aa != b;
    },
    i2: function() {
      this._aa = this._aa._a;
    },
    i3: function() {
      this._aa = this._aa._b;
    },
    i4: function() {
      this._aa = this._bb._b;
    },
    i5: function() {
      this._aa = this._bb._c;
    },
    i7: function() {
      return this._bb.ay();
    },
    i6: function() {
      return this._aa._c;
    },
  });
  var jh = function(C) {
    jh.superClass.constructor.call(this, C);
  };
  s(jh, fo, {
    i8: function() {
      return this.i6();
    },
  });
  var Ie = function(x) {
    if (((this._id = Ie.id()), (this._a = 0), x))
      for (x.i4(); x.i1(); x.i2()) this.ae(x.i6());
  };
  s(Ie, d, {
    ac: function(w) {
      var f = this.ag(w);
      return (
        this._b
          ? ((this._b._b = f),
            (f._a = this._b),
            (this._b = f))
          : (this._b = this._c = f),
        this._a++,
        f
      );
    },
    ae: function(Z) {
      var T = this.ag(Z);
      return (
        this._c
          ? ((this._c._a = T),
            (T._b = this._c),
            (this._c = T))
          : (this._b = this._c = T),
        this._a++,
        T
      );
    },
    z1: function(w) {
      (w._b = b),
        (w._a = b),
        this._c
          ? ((this._c._a = w),
            (w._b = this._c),
            (this._c = w))
          : (this._b = this._c = w),
        this._a++;
    },
    ad: function(s) {
      (s._b = b),
        (s._a = b),
        this._b
          ? ((this._b._b = s),
            (s._a = this._b),
            (this._b = s))
          : (this._b = this._c = s),
        this._a++;
    },
    aa: function(k) {
      return this.ae(k), !0;
    },
    ab: function(m) {
      for (; m.i1(); m.i2()) this.ae(m.i6());
    },
    ao: function(a, Y) {
      if (Y === this._b) return this.ac(a);
      if (Y) {
        var e = this.ag(a);
        return this.aq(e, Y), e;
      }
      return this.ae(a);
    },
    aq: function(r, S) {
      if (S)
        if (S === this._b) this.ad(r);
        else {
          if (this._c) {
            var h = S._b;
            (S._b = r), (r._a = S), (h._a = r), (r._b = h);
          } else
            (r._b = b), (r._a = b), (this._b = this._c = r);
          this._a++;
        }
      else this.ad(r);
    },
    ap: function(G, Y) {
      if (Y)
        if (Y === this._c) this.z1(G);
        else {
          if (this._b) {
            var _ = Y._a;
            (Y._a = G), (G._a = _), (_._b = G), (G._b = Y);
          } else
            (G._b = b), (G._a = b), (this._b = this._c = G);
          this._a++;
        }
      else this.z1(G);
    },
    an: function(c, P) {
      if (P === this._c) return this.ae(c);
      if (P) {
        var r = this.ag(c);
        return this.ap(r, P), r;
      }
      return this.ac(c);
    },
    ay: function() {
      return this._a;
    },
    ar: function() {
      return 0 === this._a;
    },
    af: function() {
      (this._b = this._c = b), (this._a = 0);
    },
    am: function() {
      return this._b._c;
    },
    at: function() {
      var y = this.am();
      return this.aw(this._b), y;
    },
    as: function() {
      return this._c._c;
    },
    au: function() {
      return this.aw(this._c);
    },
    ak: function(P) {
      for (var p = 0, d = this._b; d; ) {
        if (P === p) return d._c;
        (d = d._a), p++;
      }
      return b;
    },
    aj: function(j) {
      return j._a ? j._a : this._b;
    },
    ai: function(M) {
      return M._b ? M._b : this._c;
    },
    aw: function(D) {
      return (
        D !== this._b ? (D._b._a = D._a) : (this._b = D._a),
        D !== this._c ? (D._a._b = D._b) : (this._c = D._b),
        this._a--,
        D._c
      );
    },
    av: function(T) {
      return this.aw(T._aa);
    },
    ah: function() {
      return new fo(this);
    },
    al: function(L) {
      for (var P = this._b; P; ) {
        if (!P._c && !L) return P;
        if (P._c === L) return P;
        P = P._a;
      }
      return b;
    },
    a0: function() {
      for (var i = gm.d(this._a), s = 0, p = this._b; p; )
        (i[s] = p._c), (p = p._a), s++;
      return i;
    },
    ax: function() {
      for (var s = this._b; s; s = s._b) {
        var l = s._a;
        (s._a = s._b), (s._b = l);
      }
      var Q = this._b;
      (this._b = this._c), (this._c = Q);
    },
    a1: function(R) {
      var S = this.a0(),
        H = 0;
      S.sort(R);
      for (var y = this._b; y; )
        (y._c = S[H]), (y = y._a), H++;
    },
    a2: function() {
      var g = this.a0();
      g.sort(gm.c);
      for (var $ = 0, y = this._b; y; )
        (y._c = g[$]), (y = y._a), $++;
    },
    az: function(u) {
      this._b
        ? u._b &&
          ((this._c._a = u._b),
          (u._b._b = this._c),
          (this._c = u._c))
        : ((this._b = u._b), (this._c = u._c)),
        (this._a += u._a),
        (u._b = u._c = b),
        (u._a = 0);
    },
    ag: function(j) {
      return new Vq(j);
    },
  }),
    (Ie.id = (function() {
      var l = 0;
      return function() {
        return ++l;
      };
    })());
  var Ur = function(j) {
    Ur.superClass.constructor.call(this, j);
  };
  s(Ur, Ie, {
    c1: function() {
      return new jh(this);
    },
    c2: function() {
      return this.am();
    },
    c3: function() {
      return this.at();
    },
  });
  var lf = function() {
    this._c = 0;
  };
  s(lf, d, {
    a: function(R) {
      this._c++,
        (R._b = this._b),
        (R._a = b),
        this._b
          ? ((this._b._a = R), (this._b = R))
          : (this._b = this._a = R);
    },
    b: function(Q, s) {
      if (!s) return this.a(Q), void 0;
      var J = s._b;
      J ? (J._a = Q) : (this._a = Q),
        (Q._b = J),
        (Q._a = s),
        (s._b = Q),
        this._c++;
    },
    c: function(G) {
      var t = G._a,
        N = G._b;
      this._c--,
        t ? (t._b = N) : (this._b = N),
        N ? (N._a = t) : (this._a = t);
    },
  });
  var Xb = function(K, F) {
    (this._p = K), (this._j = F), (this._o = K._o[F]);
  };
  s(Xb, d, {
    i1: function() {
      return this._o != b;
    },
    i2: function() {
      this._o = this._o._k[this._j];
    },
    i3: function() {
      this._o = this._o._f[this._j];
    },
    i4: function() {
      this._o = this._p._o[this._j];
    },
    i5: function() {
      this._o = this._p._q[this._j];
    },
    i7: function() {
      return this._p._n[this._j];
    },
    i6: function() {
      return this._o;
    },
    i8: function() {
      return this._o;
    },
  });
  var Vq = function(z) {
    this._c = z;
  };
  s(Vq, d, {
    a: function() {
      return this._a;
    },
    b: function() {
      return this._b;
    },
    c: function(o) {
      this._c = o;
    },
    d: function() {
      return this._c;
    },
  });
  var js = function($, w, H, S) {
    (this._r = $),
      (this._s = w),
      (this._q = H),
      (this._p = S);
  };
  s(js, d, {
    i1: function(F) {
      return this._p[F.a5()];
    },
    i3: function(o) {
      return this._r[o.a5()];
    },
    i2: function(o) {
      return this._s[o.a5()];
    },
    i4: function(A) {
      return this._q[A.a5()];
    },
    i8: function(b, I) {
      this._p[b.a5()] = I;
    },
    i6: function(A, W) {
      this._r[A.a5()] = W;
    },
    i5: function(g, w) {
      this._s[g.a5()] = w;
    },
    i7: function(E, t) {
      this._q[E.a5()] = t;
    },
  });
  var vc = function(q) {
    (this._a = gm.d(q)), (this._b = -1);
  };
  s(vc, d, {
    d: function() {
      return this._a[this._b];
    },
    b: function() {
      return this._a[this._b--];
    },
    c: function(w) {
      this._a[++this._b] = w;
    },
    a: function() {
      return this._b < 0;
    },
  });
  var Dp = function() {};
  s(Dp, d, {
    a0: function(W) {
      this._c = gm.d(W);
    },
  });
  var Qh = function(U, L, t, $, A, g, w) {
    (this._g = 0), U.xt(this, L, t, $, A, g, w);
  };
  s(Qh, Dp, {
    a5: function() {
      return this._h._u && this._h.b1(), this._g;
    },
    a2: function() {
      return this._d;
    },
    a3: function() {
      return this._e;
    },
    a1: function(L) {
      return this._d !== L ? this._d : this._e;
    },
    a4: function() {
      for (var Z = 0; 1 >= Z; Z++)
        (this._k[Z] = b), (this._f[Z] = b);
    },
    a8: function() {
      return this._k[0];
    },
    a7: function() {
      return this._k[1];
    },
    a6: function(R, A, u, D) {
      this.a0(D),
        (this._h = R),
        (this._k = gm.d(2)),
        (this._f = gm.d(2)),
        (this._d = A),
        (this._e = u);
    },
  });
  var qk = function(H) {
    (this._j = 0), (this._h = H), this.i4();
  };
  s(qk, d, {
    i2: function() {
      (this._k = this._k._k[this._j]),
        this._k ||
          0 !== this._j ||
          ((this._k = this._h._o[1]), (this._j = 1));
    },
    i3: function() {
      (this._k = this._k._f[this._j]),
        this._k ||
          1 !== this._j ||
          ((this._k = this._h._q[0]), (this._j = 0));
    },
    i4: function() {
      (this._k = this._h._o[0]),
        this._k
          ? (this._j = 0)
          : ((this._k = this._h._o[1]), (this._j = 1));
    },
    i5: function() {
      (this._k = this._h._q[1]),
        this._k
          ? (this._j = 1)
          : ((this._k = this._h._q[0]), (this._j = 0));
    },
    i1: function() {
      return !!this._k;
    },
    i6: function() {
      return this._k;
    },
    i8: function() {
      return this._k;
    },
    i7: function() {
      return this._h.ad();
    },
  });
  var Si = function() {
    (this._a = ac._A),
      (this._b = ac._A),
      (this._c = new I());
  };
  s(Si, d, {
    i1: function() {
      return this._c.size();
    },
    i2: function(y) {
      return this._c.get(y);
    },
    i3: function(w, s, L) {
      this._c.set(w, new c(s, L));
    },
    i4: function(j, k) {
      this._c.add(new c(j, k));
    },
    i5: function() {
      this._c.clear();
    },
    i6: function() {
      return this._a;
    },
    i7: function() {
      return this._b;
    },
    i8: function(q) {
      this._a = q;
    },
    i9: function(I) {
      this._b = I;
    },
  });
  var jl = function() {
    (this._x = 0),
      (this._y = 0),
      (this._w = 0),
      (this._h = 0);
  };
  s(jl, d, {
    i5: function(Q, z) {
      (this._x = Q), (this._y = z);
    },
    i6: function(b, _) {
      (this._w = b), (this._h = _);
    },
    i4: function() {
      return this._h;
    },
    i3: function() {
      return this._w;
    },
    i1: function() {
      return this._x;
    },
    i2: function() {
      return this._y;
    },
  });
  var jc = function(l, S, r, n) {
    (this._m = l),
      (this._n = S),
      (this._l = r),
      (this._k = n);
  };
  s(jc, d, {
    i1: function(r) {
      return this._k[r.al()];
    },
    i3: function(R) {
      return this._m[R.al()];
    },
    i2: function(E) {
      return this._n[E.al()];
    },
    i4: function(o) {
      return this._l[o.al()];
    },
    z1: function(h, O) {
      this._k[h.al()] = O;
    },
    i6: function(F, q) {
      this._m[F.al()] = q;
    },
    i7: function(S, B) {
      this._n[S.al()] = B;
    },
    i5: function(H, i) {
      this._l[H.al()] = i;
    },
  });
  var Ln = function(V, S) {
    (this._b = V), (this._r = S), (this._a = []);
    for (var $ = this._b - 1; $ >= 0; $--) this._a.push($);
    this._c = new I();
  };
  s(Ln, d, {
    a1: function($) {
      var c;
      if (0 === this._a.length) {
        this.a2($, this._b, this._b + this._r);
        for (
          var Z = this._b + this._r - 1;
          Z > this._b;
          Z--
        )
          this._a.push(Z);
        (c = this._b), (this._b += this._r);
      } else c = this._a.pop();
      return c;
    },
    b: function(D) {
      var H = this.a1(D),
        U = new ui(H, this);
      return this._c.add(U), this.a4(D, H), U;
    },
    c: function(b) {
      var $ = this.a1(b),
        p = new td($, this);
      return this._c.add(p), this.a4(b, $), p;
    },
    a2: function(i, R, G) {
      for (var g = i._a; g; g = g._a) {
        var h = gm.d(G);
        gm.f(g._c, h, R), (g._c = h);
      }
    },
    a3: function($, q, g) {
      var S = gm.d(g);
      gm.f($._c, S, q), ($._c = S);
    },
    a4: function($, C) {
      for (var q = $._a; q; q = q._a) q._c[C] = b;
    },
    a5: function(A, F) {
      if (A instanceof ui) {
        var v = A;
        if (v.c()) throw '';
        v.d();
        var r = A._i;
        this._a.indexOf(r) < 0 &&
          (this.a4(F, r),
          this._a.push(r),
          this._c.remove(A));
      }
    },
    a6: function(F, q) {
      if (F instanceof td) {
        var H = F;
        if (H.a()) throw '';
        H.b();
        var $ = H._d;
        this._a.indexOf($) < 0 &&
          (this.a4(q, $),
          this._a.push($),
          this._c.remove(F));
      }
    },
  });
  var ll = function(W) {
    (this._id = Ie.id()), (this._p = 0), W.xs(this);
  };
  s(ll, Dp, {
    ad: function() {
      return this._n[0] + this._n[1];
    },
    ak: function() {
      return this._n[1];
    },
    ao: function() {
      return this._n[0];
    },
    al: function() {
      return this._g._y && this._g.c(), this._p;
    },
    ag: function() {
      return this._o[0];
    },
    ae: function() {
      return this._o[1];
    },
    af: function() {
      return new qk(this);
    },
    am: function() {
      return new Xb(this, 1);
    },
    ap: function() {
      return new Xb(this, 0);
    },
    an: function() {
      return new Wl(this);
    },
    aq: function() {
      return new Lo(this, 1);
    },
    aw: function() {
      return new Lo(this, 0);
    },
    ah: function(y) {
      for (var S = this._o[0]; S; S = S._k[0])
        if (S.a3() === y) return S;
      return b;
    },
    ai: function(f) {
      for (var h = this._o[1]; h; h = h._k[1])
        if (h.a2() === f) return h;
      return b;
    },
    aj: function(s) {
      var k = this.ah(s);
      return k || (k = this.ai(s)), k;
    },
    au: function(g) {
      this.at(g, 1, gm.d(this.ak()));
    },
    av: function(P) {
      this.at(P, 0, gm.d(this.ao()));
    },
    as: function(f, l) {
      this.a0(l),
        (this._g = f),
        (this._o = gm.d(2)),
        (this._q = gm.d(2)),
        (this._n = gm.a(2));
    },
    ab: function(w, L, y, Y, b) {
      if (!L) return this.aa(w, y, Y), void 0;
      var Z;
      if (
        ((Z = L._d === L._e ? Y : this !== L._d ? 1 : 0),
        0 === b)
      ) {
        var o = L._k[Z];
        (w._f[Y] = L),
          (w._k[Y] = o),
          (L._k[Z] = w),
          o
            ? o._d === o._e
              ? (o._f[Y] = w)
              : (o._f[this !== o._d ? 1 : 0] = w)
            : (this._q[y] = w);
      } else {
        var c = L._f[Z];
        (w._k[Y] = L),
          (w._f[Y] = c),
          (L._f[Z] = w),
          c
            ? c._d === c._e
              ? (c._k[Y] = w)
              : (c._k[this !== c._d ? 1 : 0] = w)
            : (this._o[y] = w);
      }
      this._n[y]++;
    },
    aa: function(S, L, x) {
      var p = this._q[L];
      (S._k[x] = b),
        p
          ? ((S._f[x] = p),
            p._d === p._e
              ? (p._k[x] = S)
              : (p._k[this !== p._d ? 1 : 0] = S))
          : ((this._o[L] = S), (S._f[x] = b)),
        (this._q[L] = S),
        this._n[L]++;
    },
    ar: function(Q, p, v) {
      var n, X;
      (n = Q._k[v]),
        (X = Q._f[v]),
        n
          ? (n._f[n._d !== this ? 1 : 0] = X)
          : (this._q[p] = X),
        X
          ? (X._k[X._d !== this ? 1 : 0] = n)
          : (this._o[p] = n),
        this._n[p]--;
    },
    ac: function() {
      for (var p = 0; 1 >= p; p++)
        (this._o[p] = b),
          (this._q[p] = b),
          (this._n[p] = 0);
    },
    at: function(M, A, N) {
      if (!(this._n[A] < 2)) {
        for (
          var i = this._n[A], $ = 0, l = this._o[A];
          l;
          l = l._k[A]
        )
          (N[$] = l), $++;
        gm.s(N, i, M);
        var X = 1,
          O = (this._o[A] = N[0]);
        for (O._f[A] = b; i > X; )
          (l = N[X]),
            (l._f[A] = O),
            (O._k[A] = l),
            X++,
            (O = l);
        (this._q[A] = l), (l._k[A] = b);
      }
    },
  });
  var Lo = function(Z, r) {
    Lo.superClass.constructor.call(this, Z, r),
      (this._h = 1 !== r ? 1 : 0);
  };
  s(Lo, Xb, {
    i6: function() {
      return this.i9();
    },
    i9: function() {
      return 0 !== this._h ? this._o._e : this._o._d;
    },
  });
  var Wl = function(W) {
    Wl.superClass.constructor.call(this, W);
  };
  s(Wl, qk, {
    i6: function() {
      return this._k.a1(this._h);
    },
    i9: function() {
      return this._k.a1(this._h);
    },
  });
  var Ek = function(Z) {
    Ek.superClass.constructor.call(this, Z);
  };
  s(Ek, fo, {
    i9: function() {
      return this.i6();
    },
  });
  var jn = function(X) {
    (this._o = X), (this._c = X._a);
  };
  s(jn, d, {
    i1: function() {
      return this._c != b;
    },
    i2: function() {
      this._c = this._c._a;
    },
    i3: function() {
      this._c = this._c._b;
    },
    i5: function() {
      this._c = this._o._b;
    },
    i4: function() {
      this._c = this._o._a;
    },
    i7: function() {
      return this._o._c;
    },
    i6: function() {
      return this._c;
    },
    i9: function() {
      return this._c;
    },
    i8: function() {
      return this._c;
    },
  });
  var $r = function(U) {
    if (U && U.length) {
      $r.superClass.constructor.call(this);
      for (var y = 0; y < U.length; y++) this.ae(U[y]);
    } else $r.superClass.constructor.call(this, U);
  };
  s($r, Ie, {
    x1: function() {
      return new Ek(this);
    },
    x2: function() {
      return this.am();
    },
    x3: function() {
      return this.as();
    },
    x4: function() {
      return this.at();
    },
  });
  var oi = function(c) {
    (this._d = c), oi.superClass.constructor.call(this);
  };
  s(oi, $r, {});
  var wl = function(x) {
    (this._a = x),
      (this._b = new Ur()),
      (this._c = new $r());
  };
  s(wl, d, {
    a: function() {
      for (var h = this._a.x9(); h.i1(); h.i2())
        this.e(h.i9());
    },
    b: function() {
      this.c(), this.d();
    },
    c: function() {
      for (; !this._c.ar(); ) {
        var x = this._c.x4();
        this._a.xq(x) || this.g(x);
      }
    },
    d: function() {
      for (; !this._b.ar(); ) {
        var E = this._b.c3();
        this._a.xp(E) || this.f(E);
      }
    },
    e: function(r) {
      for (var T = r.af(); T.i1(); T.i2())
        this._b.ac(T.i8()), this._a.h1(T.i8());
      this._c.ac(r), this._a.h2(r);
    },
    f: function(m) {
      this._a.u1(m);
    },
    g: function(b) {
      this._a.h3(b);
    },
  }),
    (wl.h = function(K, C) {
      for (C.i4(); C.i1(); C.i2()) {
        var g = C.i8();
        K.xq(g.a2()) || K.h3(g.a2()),
          K.xq(g.a3()) || K.h3(g.a3()),
          K.xp(g) || K.u1(g);
      }
    }),
    (wl.i = function(V, N) {
      for (N.i4(); N.i1(); N.i2()) {
        var Y = N.i8();
        V.xp(Y) && V.h1(Y),
          0 === Y.a2().ad() && V.h2(Y.a2()),
          0 === Y.a3().ad() && V.h2(Y.a3());
      }
    });
  var Jr = function() {
    var s = arguments;
    (this._g = s[0]),
      (this._f = this._g.xk()),
      (this._h = this._g.xk()),
      (this._d = new Ie()),
      (this._e = 0),
      1 !== s.length && this.a(s[1], s[2], s[3], s[4]);
  };
  s(Jr, d, {
    a: function(N, O, p, d) {
      for (
        var P = gm.d(p - O + 1), t = O, X = 0;
        p >= t;
        t++
      )
        P[t] = new oi(t);
      for (var H = this._g.x9(); H.i1(); H.i2()) {
        var y = H.i9();
        (!d || d.i4(y)) &&
          (this._f.z1(y, P[N.i2(y) - O].ac(y)), this._e++);
      }
      for (; X < P.length; X++)
        for (
          var q = P[X], h = this._d.ae(q), Z = q.x1();
          Z.i1();
          Z.i2()
        )
          this._h.z1(Z.i9(), h);
    },
    c: function() {
      this._g.xi(this._h), this._g.xi(this._f);
    },
    e: function() {
      return 0 === this._e;
    },
    g: function() {
      for (; this._d.am().ar(); this._d.at());
      this._e--;
      var j = this._d.am().x4();
      return this._h.z1(j, b), this._f.z1(j, b), j;
    },
    f: function() {
      for (; this._d.as().ar(); this._d.au());
      this._e--;
      var V = this._d.as().x4();
      return this._h.z1(V, b), this._f.z1(V, b), V;
    },
    d: function(e) {
      var c = this._f.i1(e),
        U = this._h.i1(e),
        x = U.d(),
        C = b,
        k = U.a();
      k
        ? ((C = k.d()), this._h.z1(e, k))
        : ((C = new oi(x._d + 1)),
          this._h.z1(e, this._d.ae(C))),
        x.aw(c),
        this._f.z1(e, C.ac(e));
    },
    b: function(C) {
      var t = this._f.i1(C),
        z = this._h.i1(C),
        d = z.d(),
        j = b,
        F = z.b();
      F
        ? ((j = F.d()), this._h.z1(C, F))
        : ((j = new oi(d._d - 1)),
          this._h.z1(C, this._d.ac(j))),
        d.aw(t),
        this._f.z1(C, j.ac(C));
    },
  });
  var fr = {
      a1: function(A) {
        return new jc(A, b, b, b);
      },
      a2: function(N) {
        return new jc(b, N, b, b);
      },
      a3: function(Z) {
        return new jc(b, b, Z, b);
      },
      a4: function($) {
        return new js(b, $, b, b);
      },
      a5: function(d) {
        return new js(b, b, d, b);
      },
      a6: function(t) {
        return new js(b, b, b, t);
      },
    },
    Ib = function() {
      var v = arguments;
      if (2 === v.length) {
        (this._a = new Ie()),
          (this._b = new Ie()),
          (this._c = 0);
        var o = v[0],
          O = v[1],
          G = new $d(o._j2.gj(O) / 2, 0);
        this._a.ac(G),
          (G = new $d(o._j2.gj(O) / 2, 0)),
          this._b.ac(G);
      } else
        (this._a = v[1]),
          (this._b = v[2]),
          (this._c = v[3]);
    };
  s(Ib, d, {});
  var $d = function(g, U) {
    (this._b = g), (this._a = U);
  };
  s($d, d, {});
  var Np = function() {
    (this._cx = !0),
      (this._cs = new Tc()),
      (this._ct = new qb()),
      (this._cw = new yn());
  };
  s(Np, d, {
    i5: function(p) {
      this._cx = p;
    },
    k: function() {
      var n = new $c(this);
      return (
        this._cx && (this._cs.w1(n), (n = this._cs)),
        this._cw.w1(n),
        (n = this._cw),
        this._ct.w1(n),
        (n = this._ct)
      );
    },
    i2: function(E) {
      this.k().i2(E);
    },
    i1: function(K) {
      return this.k().i1(K);
    },
  });
  var Gp = function() {
    Gp.superClass.constructor.call(this),
      (this._jv = 20),
      (this._jw = 40),
      (this._jx = function(U, W) {
        var r = U.a3(),
          u = W.a3(),
          n = r._g;
        return k(100 * (n.g5(r) - n.g5(u)));
      });
  };
  s(Gp, Np, {
    i4: function(q) {
      return Wi.a1(q);
    },
    i3: function(W) {
      if (!this.i4(W)) throw '';
      var Z = Wi.a3(W);
      if (
        ((this._j2 = W),
        (this._j3 = new Hr(W)),
        vl.c(W),
        (this._jy = W.xk()),
        !W.xb())
      ) {
        this.bu();
        var r = this._j3.c1();
        this.f(r), this.b(this._j3), this.c(this._j3);
      }
      for (var m; !Z.ar(); W.x3(m))
        (m = Z.c3()), vl.b(W.g2(m));
    },
    bu: function() {
      if (this._jx)
        for (var L = this._j2.x9(); L.i1(); L.i2())
          L.i9().av(this._jx);
    },
    c: function(z) {
      for (
        var d = this.a2(z), D = gm.a(d.length), e = 0;
        e < d.length;
        e++
      ) {
        for (
          var x = d[e], f = 0, G = x.ah();
          G.i1();
          G.i2()
        ) {
          var A = G.i6();
          f = E(f, this._j2.g9(A));
        }
        D[e] = f;
      }
      for (var u = -this._jw, Y = 0; Y < d.length; Y++) {
        u += this._jw + D[Y];
        for (var J = d[Y], c = J.ah(); c.i1(); c.i2()) {
          var F = c.i6();
          this._j2.s2(F, this._j2.g5(F), u - D[Y] / 2);
        }
      }
    },
    a2: function(b) {
      for (
        var H = gm.d(b.b()), Q = 0, i = b.b();
        i > Q;
        Q++
      )
        H[Q] = new Ie();
      return b.c1(), this.a1(b.c1(), 0, H), H;
    },
    a1: function(q, c, N) {
      N[c].ae(q);
      for (var $ = q.aw(); $.i1(); $.i2())
        this.a1($.i9(), c + 1, N);
    },
    b: function(I) {
      var W = I.c1();
      this._j2.s2(W, 0, this._j2.g6(W)), this.g(W);
    },
    g: function(r) {
      for (var C = r.aw(); C.i1(); C.i2()) {
        var e = C.i9(),
          z = this._jy.i1(e);
        this._j2.s2(
          e,
          this._j2.g5(r) + z._c,
          this._j2.g6(e)
        ),
          this.g(e);
      }
    },
    f: function(K) {
      if (this._j3.c2(K))
        return this._jy.z1(K, new Ib(this, K)), void 0;
      var B = K.aw(),
        v = B.i9();
      B.i2(), this.f(v);
      var c = this._jy.i1(v),
        y = new Ib(this, c._a, c._b, 0);
      if (!B.i1())
        return (
          y._a.ac(new $d(this._j2.gj(K) / 2, 0)),
          y._b.ac(new $d(this._j2.gj(K) / 2, 0)),
          this._jy.z1(K, y),
          void 0
        );
      for (; B.i1(); ) {
        (v = B.i9()),
          B.i2(),
          this.f(v),
          (c = this._jy.i1(v));
        for (
          var U = y._b.ah(),
            L = c._a.ah(),
            s = 2147483647,
            C = 0,
            f = 0;
          U.i1() && L.i1();

        ) {
          var E = U.i6();
          U.i2();
          var e = L.i6();
          L.i2(),
            (f += E._a),
            (C += e._a),
            (s = z(s, C - f - E._b - e._b));
        }
        (c._c = this._jv - s), (C += c._c);
        var o = c._b.am();
        if (((o._a = c._c), U.i1() && !L.i1()))
          for (var j = f - this.a3(c._b); U.i1(); j = 0) {
            var w = U.i6();
            U.i2(), c._b.ae(new $d(w._b, w._a + j));
          }
        else if (!U.i1() && L.i1()) {
          var N = this.a3(y._a);
          for (N = C - N; L.i1(); N = 0) {
            var V = L.i6();
            L.i2(), y._a.ae(new $d(V._b, V._a + N));
          }
        }
        y._b = c._b;
      }
      this._jy.z1(K, y);
      for (var Q = -c._c / 2, h = K.aw(); h.i1(); ) {
        var x = h.i9();
        h.i2();
        var a = this._jy.i1(x);
        a._c += Q;
        var t = a._b.am();
        (t._a += Q), (t = a._a.am()), (t._a += Q);
      }
      y._a.ac(new $d(this._j2.gj(K) / 2, 0)),
        y._b.ac(new $d(this._j2.gj(K) / 2, 0));
    },
    a3: function(C) {
      for (var W = 0, O = C.ah(); O.i1(); O.i2()) {
        var N = O.i6();
        W += N._a;
      }
      return W;
    },
  });
  var Hr = function(x) {
    (this._b = x), this.a();
  };
  s(Hr, d, {
    c1: function() {
      return this._a || this.a(), this._a;
    },
    b: function() {
      return this._a ? this.d(this._a) : -1;
    },
    d: function(P) {
      for (var r = 0, g = P.aw(); g.i1(); g.i2())
        r = E(r, this.d(g.i9()));
      return r + 1;
    },
    c2: function(u) {
      return 0 === u.ao();
    },
    a: function() {
      for (var c = this._b.x9(); c.i1(); c.i2())
        if (0 === c.i9().ak())
          return (this._a = c.i9()), void 0;
    },
  });
  var Ah = function(r) {
    (this._d = 0),
      (this._e = 0),
      (this._f = 0),
      (this._a = 0),
      (this._b = 0),
      (this._g = r),
      (this._c = new Ie());
  };
  s(Ah, d, {
    a: function() {
      return this._d + this._e + this._f;
    },
  });
  var Qn = function() {
    Qn.superClass.constructor.call(this),
      (this._kl = 340),
      (this._km = 360),
      (this._kk = 40),
      (this._ko = 0.5);
  };
  s(Qn, Np, {
    ic: function() {
      return this._km;
    },
    ia: function() {
      return this._kl;
    },
    i9: function() {
      return this._ko;
    },
    i3: function(A) {
      if (!Wi.a1(A)) throw '';
      this._a = A;
      var K = this.i8(),
        U = Wi.a4(A, K);
      vl.c(A), (this._kn = gm.d(A.x0()));
      for (var M = A.x9(); M.i1(); M.i2()) {
        var _ = M.i9();
        _ !== K
          ? this.aa(
              _,
              new Ah(this._kk + this.q(_.aq().i9()))
            )
          : this.aa(_, new Ah(this._kk));
      }
      this.s(K), A.s2(K, 0, 0), this.t(K);
      for (var i; !U.ar(); A.x3(i)) i = U.c3();
    },
    i4: function(j) {
      return Wi.a1(j);
    },
    i0: function(v) {
      return this._kn[v.al()];
    },
    i8: function() {
      return Wi.a2(this._a);
    },
    i7: function(y) {
      for (var x, z = this.ib(y); ; ) {
        if (((x = this.i6(y)), z >= x)) break;
        for (var K = y.aw(); K.i1(); K.i2()) {
          var O = K.i9();
          this.i0(O)._g *= 1 + this._ko;
        }
      }
      var e = (z - x) / (2 * y.ao());
      x = 0;
      for (var w = y.aw(); w.i1(); w.i2()) {
        var U = this.i0(w.i9());
        (U._d += e), (U._e += e), (x += U._d + U._e);
      }
      this.id(y);
    },
    id: function(K) {
      for (
        var F = gm.d(K.ao()), d = 0, V = K.ap();
        V.i1();

      )
        (F[d] = V.i8()), V.i2(), d++;
      var l = this;
      F.sort(function(r, d) {
        var k = r.a3(),
          j = d.a3(),
          o = l.i0(k).a() - l.i0(j).a();
        return o > 0 ? 1 : o >= 0 ? 0 : -1;
      });
      for (var z = 0; z < F.length; z++) this._a.h1(F[z]);
      for (var Z = 0; Z < F.length; Z += 2)
        this._a.u1(F[Z]);
      for (
        d = F.length - 1, 0 === d % 2 && d--;
        d > 0;
        d -= 2
      )
        this._a.u1(F[d]);
    },
    ib: function(j) {
      return 0 === j.ak()
        ? this._km
        : 2 === j.ao()
        ? z(180, this._kl)
        : this._kl;
    },
    i6: function($) {
      for (var g = 0, v = $.ap(); v.i1(); v.i2()) {
        for (
          var C,
            l = v.i8(),
            p = l.a3(),
            Q = this.i0(p),
            R = -Q._g,
            K = Q._b,
            W = Q._c,
            o = 0,
            J = o + 1,
            Y = W._b,
            T = Y.d();
          J > o;
          J = (C.y - K) / (C.x - R)
        )
          (C = T),
            (Y = W.ai(Y)),
            (T = Y.d()),
            (o = (T.y - C.y) / (T.x - C.x));
        for (
          Q._d = (180 * -D(J)) / Z,
            o = 0,
            J = o - 1,
            Y = W._b,
            T = Y.d();
          Y.a().d().x === T.x;
          T = Y.d()
        )
          Y = Y.a();
        for (var G; o > J; J = (G.y - K) / (G.x - R))
          (G = T),
            (Y = W.aj(Y)),
            (T = Y.d()),
            (o = (T.y - G.y) / (T.x - G.x));
        (Q._e = (180 * D(J)) / Z), (g += Q._d + Q._e);
      }
      return g;
    },
    aa: function(F, c) {
      this._kn[F.al()] = c;
    },
    p: function(Y) {
      var $ = this.i0(Y),
        f = new Ie(),
        S = 2 * this.q(Y);
      f.aa(new c(0, 0)),
        f.aa(new c(0, S)),
        f.aa(new c(S, S)),
        f.aa(new c(S, 0)),
        ($._c = f),
        ($._a = S / 2),
        ($._b = S / 2);
    },
    r: function(H) {
      if (0 === H.ao()) this.p(H);
      else {
        var F = this.i0(H),
          U = this.q(H),
          V = new Ie();
        V.aa(new c(-U, -U)),
          V.aa(new c(-U, U)),
          V.aa(new c(U, -U)),
          V.aa(new c(U, U));
        for (var $ = H.aw(); $.i1(); $.i2()) {
          var w = this.i0($.i9());
          V.az(w._c);
        }
        for (
          var b = ac.h(V),
            d = g,
            s = g,
            T = S,
            j = S,
            B = b.ah();
          B.i1();
          B.i2()
        ) {
          var W = B.i6();
          W.x < d && (d = W.x),
            W.x > T && (T = W.x),
            W.y < s && (s = W.y),
            W.y > j && (j = W.y);
        }
        for (var Q = new Ie(), R = b.ah(); R.i1(); R.i2()) {
          var e = R.i6();
          Q.aa(new c(e.x - d, e.y - s));
        }
        (F._c = Q), (F._a = -d), (F._b = -s);
      }
    },
    s: function(L) {
      if (0 === L.ao()) this.r(L);
      else {
        for (var U = L.aw(); U.i1(); U.i2()) this.s(U.i9());
        this.i7(L);
        for (var f = 0, R = L.aw(); R.i1(); R.i2()) {
          var X = R.i9(),
            V = this.i0(X),
            e =
              180 -
              (360 - this.ib(L)) / 2 -
              f -
              (V._e + V._f);
          (f += V.a()), (e = (e / 180) * Z);
          for (
            var v = T(e), h = u(e), B = V._c._b;
            B;
            B = B.a()
          ) {
            var N = B.d(),
              z = N.x + V._g,
              y = N.y - V._b,
              s = new c(z * h - v * y, z * v + h * y);
            B.c(s);
          }
          var j = V._a + V._g;
          (V._a = j * h), (V._b = j * v);
        }
        this.r(L);
      }
    },
    t: function(f) {
      var M = this._a.g4(f),
        p = 0;
      if (f.ak() > 0) {
        var G = f.aq().i9(),
          x = this._a.g4(G);
        p = Z + B(x.y - M.y, x.x - M.x);
      }
      for (var o = f.aw(); o.i1(); o.i2()) {
        var t = o.i9(),
          O = this.i0(t);
        if (0 !== p) {
          var $ = u(p),
            n = T(p),
            Y = O._a * $ - n * O._b,
            R = O._a * n + $ * O._b;
          (O._a = Y), (O._b = R);
        }
        this._a.s2(t, M.x + O._a, M.y + O._b), this.t(t);
      }
    },
    q: function(X) {
      return 1.41 * (E(this._a.gj(X), this._a.g9(X)) / 2);
    },
  });
  var cp = function() {};
  s(cp, d, {
    i2: function(W) {
      return W.ad();
    },
    i1: r,
    i3: r,
    i4: r,
  });
  var vq = function(f) {
    this._a = f;
  };
  s(vq, d, {
    i2: function(N) {
      for (var B = 0, p = N.an(); p.i1(); p.i2())
        this._a.i1(p.i9()) && B++;
      return B;
    },
    i4: function(T) {
      return this._a.i1(T) == b;
    },
    i1: r,
    i3: r,
  });
  var hm = function() {
    hm.superClass.constructor.call(this),
      (this._kq = !1),
      (this._kp = 90);
  };
  s(hm, Qn, {
    a: function(D, H) {
      (this._kr = H), (this._ks = D), (this._kq = !0);
    },
    i7: function(T) {
      if (!this.u(T))
        return hm.superClass.i7.call(this, T), void 0;
      for (
        var D = this.i9(),
          c = this.ib(T),
          X = (360 - c) / 2 + c,
          U = new Ur(T.ap());
        ;

      ) {
        var t,
          m,
          F = this.i6(T),
          G = U._b;
        for (F = (360 - c) / 2; G; G = G.a()) {
          var r = G.d(),
            O = r.a3(),
            J = this.i0(O),
            j = this._ks.i3(r),
            Q = j - (F + J._e);
          if (
            (Q >= 0 &&
              j + J._d >= X &&
              (Q =
                F + J.a() <= X
                  ? X - F - J.a()
                  : 2 * (X - (j + J._d))),
            (J._f = 0),
            Q >= 0)
          )
            (J._f = Q), (t = G), (m = J);
          else {
            for (
              -Q > J._d + J._e
                ? (Q = (J._d + J._e) / 2)
                : (Q /= -2),
                F -= Q,
                X >= F &&
                  F + J.a() > X &&
                  ((F += Q), (Q = F + J.a() - X), (F -= Q));
              t && Q > m._f;
              m = this.i0(t.d().a3())
            )
              if (
                ((Q -= m._f), (m._f = 0), (t = t.b()), !t)
              ) {
                m = b;
                break;
              }
            t ? (m._f -= Q) : (F += Q);
          }
          F += J.a();
        }
        if (X >= F) {
          for (
            var S = 0, i = (360 - c) / 2, _ = T.ap();
            _.i1();
            _.i2()
          ) {
            var l = _.i8(),
              w = l.a3(),
              R = this._ks.i3(l),
              M = this.i0(w),
              E = i + M._f + M._e;
            S < V(E - R) && (S = V(E - R)), (i += M.a());
          }
          if (S <= this._kp) break;
        }
        for (var h = T.aw(); h.i1(); h.i2()) {
          var K = h.i9();
          this.i0(K)._g *= 1 + D;
        }
      }
    },
    ib: function(v) {
      return this.u(v)
        ? 0 === v.ak()
          ? this.ic()
          : this.ia()
        : hm.superClass.ib.call(this, v);
    },
    u: function(L) {
      return this._kq && 0 !== L.ao()
        ? this._ks.i1(L.ag()) != b
        : !1;
    },
  });
  var Kd = function(d) {
    this._a = d;
  };
  s(Kd, d, {
    i1: function(c) {
      return this._a.i1(c);
    },
    i2: r,
    i3: r,
    i4: r,
  });
  var gf = function() {};
  s(gf, d, {
    w1: function(g) {
      this._bb = g;
    },
    w2: function() {
      return this._bb;
    },
    w4: function(x) {
      this._bb && this._bb.i2(x);
    },
    w3: function(f) {
      return this._bb ? this._bb.i1(f) : !0;
    },
  });
  var qb = function() {
    (this._cg = 45),
      (this._ce = 400),
      (this._ch = 400),
      (this._cf = 0);
  };
  s(qb, gf, {
    i1: function(O) {
      if (this.w2()) {
        for (
          var p = !0,
            H = O.xk(),
            I = $m.a3(O, H),
            P = gm.d(I),
            v = gm.d(I),
            g = 0;
          I > g;
          g++
        )
          (P[g] = new $r()), (v[g] = new Ur());
        for (var y = O.xf(); y.i1(); y.i2()) {
          var q = y.i8();
          v[H.i2(q.a2())].aa(q), O.h1(q);
        }
        for (var D = O.x9(); D.i1(); D.i2()) {
          var B = D.i9();
          P[H.i2(B)].aa(B), O.h2(D.i9());
        }
        for (var U = 0; I > U; U++) {
          for (var V = P[U].x1(); V.i1(); V.i2())
            O.h3(V.i9());
          for (var S = v[U].c1(); S.i1(); S.i2())
            O.u1(S.i8());
          p = this.w3(O);
          for (var t = v[U].c1(); t.i1(); t.i2())
            O.h1(t.i8());
          for (var Q = P[U].x1(); Q.i1(); Q.i2())
            O.h2(Q.i9());
          if (!p) break;
        }
        for (var b = 0; I > b; b++)
          for (var j = P[b].x1(); j.i1(); j.i2())
            O.h3(j.i9());
        for (var L = 0; I > L; L++)
          for (var G = v[L].c1(); G.i1(); G.i2())
            O.u1(G.i8());
        return O.xi(H), p;
      }
      return !0;
    },
    i2: function(F) {
      if (!F.xb()) {
        for (
          var H = F.xk(),
            u = $m.a3(F, H),
            E = gm.d(u),
            z = gm.d(u),
            W = gm.d(u),
            r = gm.d(u),
            B = 0;
          u > B;
          B++
        )
          (E[B] = new $r()), (z[B] = new Ur());
        for (var d = F.xf(); d.i1(); d.i2()) {
          var T = d.i8();
          z[H.i2(T.a2())].aa(T), F.h1(T);
        }
        for (var x = F.x9(); x.i1(); x.i2()) {
          var J = x.i9();
          E[H.i2(J)].aa(J), F.h2(x.i9());
        }
        for (var G = 0; u > G; G++) {
          for (var v = E[G].x1(); v.i1(); v.i2())
            F.h3(v.i9());
          for (var Y = z[G].c1(); Y.i1(); Y.i2())
            F.u1(Y.i8());
          this.w4(F);
          var g = F.g3();
          W[G] = new P(g.x, g.y, g.width, g.height);
          var S = {};
          if (((r[G] = S), this._cf > 0)) {
            var L =
                this._cg +
                X((g.width + 1) / this._cf) * this._cf,
              j =
                this._cg +
                X((g.height + 1) / this._cf) * this._cf;
            (S.x = g.x),
              (S.y = g.y),
              (S.width = L),
              (S.height = j);
          } else
            (S.x = g.x),
              (S.y = g.y),
              (S.width = g.width + this._cg),
              (S.height = g.height + this._cg);
          for (var e = z[G].c1(); e.i1(); e.i2())
            F.h1(e.i8());
          for (var p = E[G].x1(); p.i1(); p.i2())
            F.h2(p.i9());
        }
        for (var N = 0; u > N; N++)
          for (var C = E[N].x1(); C.i1(); C.i2())
            F.h3(C.i9());
        for (var I = 0; u > I; I++)
          for (var D = z[I].c1(); D.i1(); D.i2())
            F.u1(D.i8());
        if (
          (vl.a(r, b, this._ce / this._ch), this._cf <= 0)
        )
          for (var y = 0; y < r.length; y++)
            this.w5(
              F,
              E[y],
              z[y],
              new c(r[y].x, r[y].y),
              W[y]
            );
        else
          for (var w = 0; w < r.length; w++) {
            var O =
                k((r[w].x - W[w].x) / this._cf) * this._cf,
              U =
                k((r[w].y - W[w].y) / this._cf) * this._cf,
              i = W[w].x + O,
              o = W[w].y + U;
            this.w5(F, E[w], z[w], new c(i, o), W[w]);
          }
        F.xi(H);
      }
    },
    w5: function(r, w, E, g, k) {
      for (
        var t = -k.x + g.x, $ = -k.y + g.y, P = w.x1();
        P.i1();
        P.i2()
      ) {
        var a = r.ga(P.i9());
        r.s4(P.i9(), new c(a.x + t, a.y + $));
      }
      for (var H = E.c1(); H.i1(); H.i2()) {
        for (
          var o = H.i8(), X = new I(), y = r.gp(o).c();
          y.i1();
          y.i2()
        ) {
          var D = y.i6();
          X.add(new c(D.x + t, D.y + $));
        }
        r.s5(o, new L(X));
      }
    },
  });
  var yn = function() {};
  s(yn, gf, {
    i1: function(F) {
      return this.w3(F);
    },
    i2: function(E) {
      this.w7(E), this.w2() && this.w4(E), this.w6(E);
    },
    w7: function(k) {
      this.e(k), this.k(k), this.i(k);
    },
    e: function(X) {
      for (var U = X.x9(); U.i1(); U.i2()) {
        var q = X.g4(U.i9());
        X.s1(U.i9(), q);
      }
    },
    w6: function(c) {
      this.l(c), this.j(c), this.f(c);
    },
    l: function(y) {
      for (var U = y.x9(); U.i1(); U.i2()) {
        var F = y.g4(U.i9());
        y.s1(U.i9(), F);
      }
    },
    j: function(w) {
      for (var j = w.xf(); j.i1(); j.i2()) {
        var Y = w.g7(j.i8()),
          B = Y.i6();
        Y.i8(B), (B = Y.i7()), Y.i9(B);
        for (var p = 0; p < Y.i1(); p++) {
          var I = Y.i2(p);
          Y.i3(p, I.x, I.y);
        }
      }
    },
    k: function(d) {
      for (var q = d.xf(); q.i1(); q.i2()) {
        var C = d.g7(q.i8()),
          T = C.i6();
        C.i8(T), (T = C.i7()), C.i9(T);
        for (var X = 0; X < C.i1(); X++) {
          var o = C.i2(X);
          C.i3(X, o.x, o.y);
        }
      }
    },
    f: function(x) {
      this._ca &&
        (x.x1('A', this._ca),
        (this._ca = b),
        (this._b6 = b)),
        this._b8 &&
          (x.x1('B', this._b8),
          (this._b8 = b),
          (this._b9 = b));
    },
    i: function(j) {
      (this._ca = j.xc('A')),
        this._ca &&
          ((this._b6 = new Kd(this._ca)),
          j.x1('A', this._b6)),
        (this._b8 = j.xc('B')),
        this._b8 &&
          ((this._b9 = new Kd(this._b8)),
          j.x1('B', this._b9));
    },
  });
  var Tc = function() {
    (this._a = new Ur()), (this._c = 10);
  };
  s(Tc, gf, {
    i2: function(K) {
      (this._b = K.xl()),
        this.w9(K),
        this.w4(K),
        this.c(K),
        this.w8(K, this._b),
        K.xj(this._b);
    },
    i1: function(b) {
      if (this.w2()) {
        (this._b = b.xl()), this.w9(b);
        var t = this.w3(b);
        return this.c(b), b.xj(this._b), t;
      }
      return !0;
    },
    w8: function(l, t) {
      for (var H = l.xf(); H.i1(); H.i2()) {
        var a = H.i8();
        t.i1(a) && vl.g(l, a, t.i1(a), this._c);
      }
    },
    w9: function(I) {
      for (var w = I.xk(), U = I.x9(); U.i1(); U.i2()) {
        for (var L = U.i9(), v = L.af(); v.i1(); v.i2()) {
          var O = v.i8(),
            Z = O.a1(L),
            n = w.i1(Z);
          if (n !== O)
            if (n) {
              this._b.i1(n) || this._b.i8(n, new Ur());
              var q = this._b.i1(n);
              q.aa(O), this._a.ac(O), I.h1(O);
            } else w.z1(Z, O);
        }
        for (var e = L.af(); e.i1(); e.i2()) {
          var h = e.i8(),
            N = h.a1(L);
          w.z1(N, b);
        }
      }
      I.xi(w);
    },
    c: function(F) {
      for (; !this._a.ar(); F.u1(this._a.c3()));
    },
  });
  var $c = function(D) {
    this._a = D;
  };
  s($c, d, {
    i2: function(l) {
      this._a.i3(l);
    },
    i1: function(i) {
      return this._a.i4(i);
    },
  });
  var Pk = function() {
    Pk.superClass.constructor.call(this),
      (this._jo = 30),
      (this._jp = new pd()),
      (this._jt = 5);
  };
  s(Pk, Np, {
    i4: function() {
      return !0;
    },
    i3: function(m) {
      (this._ju = m), vl.c(m);
      for (
        var U = this._jp.i1(m), C = 0, M = m.x9();
        M.i1();
        M.i2()
      )
        C = E(C, this.e(M.i9()));
      C < this._jt && (C = this._jt), this.a(U, C);
    },
    a: function(y, e) {
      var w = y.i7(),
        Y = (2 * Z) / w,
        V = 0,
        F = gm.a(w),
        v = 0;
      for (y.i4(); w > v; )
        (F[v] = this.e(y.i9()) + this._jo),
          (V += F[v]),
          v++,
          y.i2();
      var L = V / w,
        N = V / G;
      e > N && (N = e), y.i4();
      for (var H = 0, P = 0; w > P; ) {
        var g = (Y / L) * F[P];
        H += g / 2;
        var M = u(H) * N,
          I = T(H) * N;
        (H += g / 2),
          this._ju.s2(y.i9(), M, I),
          P++,
          y.i2();
      }
      return N;
    },
    e: function(N) {
      var _ = this._ju.gj(N),
        v = this._ju.g9(N);
      return v >= _ ? v : _;
    },
  });
  var gi = function() {
    gi.superClass.constructor.call(this),
      (this._jm = new Pk()),
      (this._jk = new hm());
  };
  s(gi, Np, {
    i4: function() {
      return !0;
    },
    i3: function(v) {
      if (!(v.x0() < 2)) {
        (this._jn = v), vl.c(this._jn), vl.e(this._jn);
        var d = new Wc(this._jn);
        d.a1(), d.h();
        var b = new wl(this._jn);
        b.a();
        for (var k = d.x9(); k.i1(); k.i2()) {
          var A = k.i9(),
            c = d.c2(A);
          if (c.ay() > 1) {
            var p = d.d1(A);
            wl.h(this._jn, p.c1()), this._jm.i3(this._jn);
            var V = this._jn.g3();
            d.s7(A, V.width, V.height);
          } else if (1 === c.ay()) {
            var w = c.x2();
            d.s8(A, this._jn.gm(w)), this._jn.s2(w, 0, 0);
          } else d.s7(A, 1, 1);
          wl.i(this._jn, this._jn.xf());
        }
        b.b();
        var $ = this.a7(d);
        Wi.a4(d, $);
        var W = d.xk(),
          G = d.xl();
        this.a2(d, G, W),
          this.a1(d, G),
          this.a3(d, $, G),
          this._jk.a(G, W),
          this._jk.i3(d),
          this.a5(d, $, W);
        for (var x = d.x9(); x.i1(); x.i2())
          for (
            var Q = x.i9(), I = d.g4(Q), g = d.c2(Q).x1();
            g.i1();
            g.i2()
          ) {
            var N = g.i9();
            this._jn.s2(
              N,
              I.x + this._jn.g5(N),
              I.y + this._jn.g6(N)
            );
          }
      }
    },
    a7: function(V) {
      for (var m, t = -1, b = V.x9(); b.i1(); b.i2()) {
        var v = b.i9();
        V.c2(v).ay() > t && ((m = v), (t = V.c2(v).ay()));
      }
      return m;
    },
    a1: function(G, L) {
      for (
        var f = function(T, N) {
            var K = L.i3(T) - L.i3(N);
            return K > 0 ? 1 : K >= 0 ? 0 : -1;
          },
          A = G.x9();
        A.i1();
        A.i2()
      )
        A.i9().av(f);
    },
    a2: function(S, P, t) {
      for (
        var k = gm.a(this._jn.x0()), T = S.x9();
        T.i1();
        T.i2()
      )
        for (
          var F = T.i9(), w = S.c2(F), f = w.x1();
          f.i1();
          f.i2()
        )
          k[f.i9().al()] = F.al();
      this.a4(S, Wi.a2(S), k, P, t);
    },
    a3: function(V, E, i) {
      if (V.c2(E).ay() > 1) {
        for (
          var F = 0, e = 0, j = 0, L = E.ap();
          L.i1();
          L.i2()
        ) {
          var Q = L.i8(),
            $ = i.i3(Q);
          $ - F > e && ((e = $ - F), (j = (F + $) / 2)),
            (F = $);
        }
        360 - F > e && (j = (360 + F) / 2),
          this.a6(V, E, j);
        for (var D = E.ap(); D.i1(); D.i2()) {
          var n = D.i8(),
            t = i.i3(n);
          for (t -= j; 0 > t; t += 360);
          i.i6(n, t);
        }
        E.av(function(k, q) {
          var N = i.i3(k) - i.i3(q);
          return N > 0 ? 1 : N >= 0 ? 0 : -1;
        });
      }
    },
    a4: function(r, K, n, i, q) {
      for (
        var W = K.al(), s = q.i3(K), S = K.ap();
        S.i1();
        S.i2()
      ) {
        for (
          var g = S.i8(),
            e = r.b(g),
            _ = 0,
            j = 0,
            c = 0,
            J = 0,
            w = e.c1();
          w.i1();
          w.i2()
        ) {
          var d,
            v,
            M = w.i8();
          n[M.a2().al()] === W
            ? ((d = M.a2()), (v = M.a3()))
            : ((d = M.a3()), (v = M.a2())),
            (c -= this._jn.g5(d)),
            (J += this._jn.g6(d)),
            (_ -= this._jn.g5(v)),
            (j += this._jn.g6(v));
        }
        if (0 !== c || 0 !== J) {
          var f;
          for (
            f = (180 * B(J, c)) / Z - s;
            0 > f;
            f += 360
          );
          i.i6(g, f);
        }
        if (0 !== _ && 0 !== j) {
          var E = (180 * B(j, _)) / Z;
          0 > E && (E += 360), q.i6(g.a3(), E);
        }
        this.a4(r, g.a3(), n, i, q);
      }
    },
    a5: function(H, y, N) {
      for (var Y = H.g4(y), M = y.ap(); M.i1(); M.i2()) {
        var x = M.i8(),
          u = x.a3(),
          g = H.g4(u),
          J = (180 * B(g.y - Y.y, g.x - Y.x)) / Z;
        N.i1(u) && (J += N.i3(u)),
          this.a6(H, u, J),
          this.a5(H, u, N);
      }
    },
    a6: function(Q, s, P) {
      P = (P / 180) * Z;
      var $ = Q.c2(s);
      if (!($.ay() <= 1))
        for (var K = $.x1(); K.i1(); K.i2()) {
          var N = K.i9(),
            C = this._jn.g5(N),
            n = this._jn.g6(N),
            w = u(P),
            L = T(P),
            d = C * w - L * n,
            j = C * L + w * n;
          this._jn.s2(N, d, j);
        }
    },
  });
  var oe = function() {
    this._a = new Date().getTime();
  };
  s(oe, d, {
    b: function() {
      return new Date().getTime() - this._a;
    },
  });
  var ac = {
      _A: new c(0, 0),
      b: function(G, m, n) {
        return ac.c(G.x, G.y, m.x, m.y, n.x, n.y);
      },
      c: function(t, O, Z, z, H, q) {
        (Z -= t), (z -= O), (H -= t), (q -= O);
        var m = H * z - q * Z;
        return m >= 0 ? (0 >= m ? 0 : -1) : 1;
      },
      d: function(m, y, T) {
        return ac.b(m, y, T) > 0;
      },
      f: function(K, C, V) {
        return ac.b(K, C, V) < 0;
      },
      g: function(r, w, q) {
        return 0 === ac.b(r, w, q);
      },
      h: function(I) {
        return ac.i(I);
      },
      i: function(i) {
        var c = new Ie(i.ah()),
          J = new Ie();
        if ((c.a2(), c.ar())) return J;
        var I = c.at();
        for (J.ae(I); !c.ar() && I.equals(c.am()); c.at());
        if (c.ar()) return J;
        I = c.at();
        for (var r = J.ae(I), t = c.ah(); t.i1(); t.i2()) {
          var y = t.i6();
          if (!y.equals(I))
            if (
              ((I = y),
              2 === J.ay() && ac.g(J.am(), J.as(), y))
            )
              r.c(y);
            else {
              var m;
              for (
                m = r;
                !ac.f(J.ai(m).d(), m.d(), y);
                m = J.ai(m)
              );
              var $;
              for (
                $ = r;
                !ac.d(J.aj($).d(), $.d(), y);
                $ = J.aj($)
              );
              for (; $ !== J.aj(m); J.aw(J.aj(m)));
              r = J.an(y, m);
            }
        }
        return J;
      },
      j: function() {
        return ac.k(g);
      },
      k: function(s) {
        return k(x() * s);
      },
      l: function(X, F) {
        return x() * (F - X) + X;
      },
    },
    pd = function() {};
  s(pd, d, {
    i1: function(G) {
      this._b = G;
      var Q = new Ur();
      (Q = $m.a6(G)), Q.az($m.a7(G));
      for (var f = this.a1(); !Q.ar(); G.x5(Q.c3()));
      return f.x1();
    },
    a1: function() {
      if (this._b.x0() < 3) return new $r(this._b.x9());
      for (
        var n = this._b.xk(),
          X = this._b.xk(),
          W = this._b.xl(),
          e = new Jr(
            this._b,
            new cp(),
            0,
            this.a3(this._b)
          ),
          U = this._b.x0(),
          A = new Ur(),
          p = new Ur(),
          I = new wl(this._b);
        U > 3;
        U--
      ) {
        for (var m = e.g(), c = m.an(); c.i1(); c.i2())
          n.z1(c.i9(), U), X.i5(c.i9(), !1);
        for (var g = m.an(); g.i1(); g.i2())
          for (var Q = g.i9(), B = Q.ap(); B.i1(); B.i2()) {
            var M = B.i8();
            n.i2(M.a3()) === U &&
              (p.aa(M), X.i5(M.a2(), !0), X.i5(M.a3(), !0));
          }
        if (p.ay() < m.ad() - 1) {
          for (var J = b, R = m.an(); R.i1(); R.i2()) {
            var G = R.i9();
            if (n.i2(G) === U && !X.i4(G))
              if (J) {
                var Y = this._b.xo(J, G);
                W.i7(Y, !0), p.aa(Y), (J = b);
              } else J = G;
          }
          if (J)
            for (var F = m.an(); F.i1(); F.i2()) {
              var o = F.i9();
              if (o !== J && !o.aj(J)) {
                var w = this._b.xo(J, o);
                W.i7(w, !0), p.aa(w);
                break;
              }
            }
          if (p.ay() < m.ad() - 1) {
            for (
              var i, C = 2147483647, K = m.an();
              K.i1();
              K.i2()
            ) {
              var q = K.i9();
              q.ad() < C && ((i = q), (C = q.ad()));
            }
            for (var j = m.an(); j.i1(); j.i2()) {
              var N = j.i9();
              if (!i.aj(N) && i !== N) {
                var T = this._b.xo(i, N);
                if (
                  (W.i7(T, !0),
                  p.aa(T),
                  p.ay() >= m.ad() - 1)
                )
                  break;
              }
            }
          }
        }
        for (var $ = m.an(); $.i1(); $.i2()) e.b($.i9());
        for (var k = p.c1(); k.i1(); k.i2()) {
          var D = k.i8();
          W.i4(D) && (e.d(D.a2()), e.d(D.a3()));
        }
        A.az(p), I.e(m);
      }
      I.b(), e.c();
      for (var t = A.c1(); t.i1(); t.i2()) {
        var f = t.i8();
        f._h && (W.i4(f) ? this._b.x5(f) : this._b.h1(f));
      }
      var y,
        E = this.a4(this._b),
        S = new $r(),
        x = E.ak(0),
        l = E.ak(1);
      (y =
        x.a2() === l.a2() || x.a2() === l.a3()
          ? x.a3()
          : x.a2()),
        S.aa(y);
      for (var a = E.c1(); a.i1(); a.i2()) {
        var s = a.i8();
        (y = s.a1(y)), S.aa(y);
      }
      for (var u = A.c1(); u.i1(); u.i2()) {
        var V = u.i8();
        W.i4(V) || V._h || this._b.u1(V);
      }
      return (
        this._b.xi(X),
        this._b.xj(W),
        this._b.xi(n),
        this.a2(S),
        S
      );
    },
    a2: function(Z) {
      if (Z.ay() < this._b.x0()) {
        for (var Y = this._b.xk(), v = Z._b; v; v = v.a()) {
          var $ = v.d();
          Y.z1($, v);
        }
        for (
          var F = new Jr(
            this._b,
            new vq(Y),
            0,
            Z.ay(),
            new vq(Y)
          );
          !F.e();

        ) {
          for (var c = F.f(), h = c.an(); h.i1(); h.i2()) {
            var P = h.i9();
            if (Y.i1(P)) {
              var a,
                r = Y.i1(P),
                L = Z.ai(r).d();
              (a = c.aj(L) ? Z.ao(c, r) : Z.an(c, r)),
                Y.z1(c, a);
              break;
            }
          }
          for (var A = c.an(); A.i1(); A.i2()) {
            var u = A.i9();
            Y.i1(u) || F.d(u);
          }
        }
        this._b.xi(Y), F.c();
      }
    },
    a3: function(l) {
      for (var v = 0, L = l.x9(); L.i1(); L.i2())
        v = E(v, L.i9().ad());
      return v;
    },
    a4: function(F) {
      for (var D = [], i = 0, t = F.x0(); t > i; i++)
        D[i] = new Be();
      var m = new hi(D);
      m.a6(!1), m.a8(F);
      for (var P, v = -1, G = F.x9(); G.i1(); G.i2()) {
        var z = G.i9(),
          A = D[z.al()];
        A._a + A._c > v && ((v = A._a + A._c), (P = z));
      }
      for (
        var S = new Ur(), p = P, M = D[p.al()]._d;
        M;
        M = D[p.al()]._d
      )
        S.ac(M), (p = M.a1(p));
      p = P;
      for (var O = D[p.al()]._b; O; O = D[p.al()]._d)
        S.ae(O), (p = O.a1(p));
      return S;
    },
  });
  var $i = function() {
    (this._v = new lf()),
      (this._x = new lf()),
      (this._z = new Ln(3, 5)),
      (this._w = new Ln(3, 5)),
      (this._y = !1),
      (this._u = !1),
      (this._t = {});
  };
  s($i, d, {
    xm: function() {
      var s = new ll(this);
      return s;
    },
    xo: function(k, n) {
      return this.xn(k, b, n, b, 0, 0);
    },
    xn: function(l, Y, o, V, H, I) {
      return new Qh(this, l, Y, o, V, H, I);
    },
    x4: function(K) {
      this.b3(K);
    },
    b3: function(N) {
      for (var D; (D = N._o[0]); ) this.x5(D);
      for (; (D = N._o[1]); ) this.x5(D);
      this._v.c(N), (N._g = b), (this._y = !0);
    },
    x5: function(Y) {
      this.a11(Y);
    },
    a11: function(d) {
      if (d._h !== this) throw '';
      this.a12(d, d.a2(), d.a3()),
        this._x.c(d),
        (d._h = b),
        (this._u = !0);
    },
    x7: function(c) {
      (c._p = this._v._c),
        (c._g = this),
        c.ac(),
        c._c.length < this._z._b &&
          this._z.a3(c, c._c.length, this._z._b),
        this._v.a(c),
        (this._y = !0);
    },
    x8: function(o) {
      if (o._h) throw '';
      o._c.length < this._w._b &&
        this._w.a3(o, o._c.length, this._w._b),
        o._a && o._a._h === this
          ? this._x.b(o, o._a)
          : this._x.a(o),
        (o._h = this),
        o.a4(),
        this.b2(o, o.a2(), b, o.a3(), b, 0, 0),
        (this._u = !0);
    },
    xr: function(P, G, k) {
      var C = P.a2(),
        e = P.a3();
      P._h
        ? (C !== G &&
            (C.ar(P, 0, 0),
            (P._d = G),
            G.ab(P, b, 0, 0, 0)),
          e !== k &&
            (e.ar(P, 1, 1),
            (P._e = k),
            k.ab(P, b, 1, 1, 0)))
        : ((P._d = G), (P._e = k));
    },
    x3: function(d) {
      this.xr(d, d.a3(), d.a2());
    },
    h1: function(w) {
      this.a11(w);
    },
    u1: function(K) {
      this.x8(K);
    },
    h2: function(l) {
      this.x4(l);
    },
    h3: function(I) {
      this.x7(I);
    },
    xa: function() {
      return this._v._c;
    },
    x0: function() {
      return this._v._c;
    },
    xh: function() {
      return this._x._c;
    },
    xg: function() {
      return this._x._c;
    },
    xb: function() {
      return 0 === this._v._c;
    },
    xq: function(R) {
      return R._g === this;
    },
    xp: function(D) {
      return D._h === this;
    },
    xd: function() {
      return this._v._a;
    },
    x9: function() {
      return new jn(this._v);
    },
    xf: function() {
      return new jn(this._x);
    },
    x2: function(M, V) {
      var R = gm.d(this.xh());
      if (M && V)
        for (var Q = this.x9(); Q.i1(); Q.i2())
          Q.i9().at(M, 1, R), Q.i9().at(V, 0, R);
      else if (!V && M)
        for (var j = this.x9(); j.i1(); j.i2())
          j.i9().at(M, 1, R);
      else if (V && !M)
        for (var b = this.x9(); b.i1(); b.i2())
          b.i9().at(V, 0, R);
    },
    xk: function() {
      return this._z.b(this._v);
    },
    xl: function() {
      return this._w.c(this._x);
    },
    xi: function(u) {
      this._z.a5(u, this._v);
    },
    xj: function(i) {
      this._w.a6(i, this._x);
    },
    xc: function(s) {
      return this._t[s];
    },
    x1: function(T, G) {
      this._t[T] = G;
    },
    x6: function(R) {
      delete this._t[R];
    },
    b2: function(r, Y, p, j, q, I, U) {
      Y.ab(r, p, 0, 0, I), j.ab(r, q, 1, 1, U);
    },
    a12: function(q, D, J) {
      D.ar(q, 0, 0), J.ar(q, 1, 1);
    },
    c: function() {
      for (var F = 0, T = this.x9(); T.i1(); T.i2())
        T.i9()._p = F++;
      this._y = !1;
    },
    b1: function() {
      for (var R = 0, D = this.xf(); D.i1(); D.i2())
        D.i8()._g = R++;
      this._u = !1;
    },
    xs: function(R) {
      R.as(this, this._z._b),
        (R._p = this._v._c),
        this._v.a(R);
    },
    xt: function(B, y, h, Y, D, K, m) {
      B.a6(this, y, Y, this._w._b),
        (B._g = this._x._c),
        this._x.a(B),
        this.b2(B, B.a2(), h, B.a3(), D, K, m);
    },
  });
  var nc = function() {
    nc.superClass.constructor.call(this);
  };
  s(nc, $i, {
    gb: function(P) {
      return this.g1(P);
    },
    g7: function(F) {
      return this.g2(F);
    },
    g5: function(t) {
      var s = this.g1(t);
      return s.i1() + s.i3() / 2;
    },
    g6: function(T) {
      var s = this.g1(T);
      return s.i2() + s.i4() / 2;
    },
    g4: function(i) {
      return new c(this.g5(i), this.g6(i));
    },
    gi: function($) {
      return this.g1($).i1();
    },
    gh: function(N) {
      return this.g1(N).i2();
    },
    ga: function(R) {
      var A = this.g1(R);
      return new c(A.i1(), A.i2());
    },
    gj: function(Y) {
      return this.g1(Y).i3();
    },
    g9: function(j) {
      return this.g1(j).i4();
    },
    gm: function(x) {
      return new O(this.gj(x), this.g9(x));
    },
    s1: function(s, M) {
      this.s2(s, M.x, M.y);
    },
    s2: function(W, g, O) {
      var C = this.g1(W);
      C.i5(g - C.i3() / 2, O - C.i4() / 2);
    },
    s7: function(K, L, p) {
      this.g1(K).i6(L, p);
    },
    s8: function(X, b) {
      this.s7(X, b.width, b.height);
    },
    s3: function(o, A, Q) {
      this.g1(o).i5(A, Q);
    },
    s4: function(h, i) {
      this.s3(h, i.x, i.y);
    },
    gp: function(s) {
      for (
        var A = this.g2(s), U = new I(), l = 0;
        l < A.i1();
        l++
      )
        U.add(A.i2(l));
      return new L(U);
    },
    gf: function(B) {
      for (
        var H = this.g2(B), C = new Ie(), U = 0;
        U < H.i1();
        U++
      )
        C.aa(H.i2(U));
      return C;
    },
    gc: function(A) {
      var q = new I();
      q.add(this.gs(A));
      for (var r = this.gp(A).d(); r.i1(); r.i2())
        q.add(r.i6());
      return q.add(this.gl(A)), new L(q);
    },
    gd: function(b) {
      var U = new Ie();
      U.aa(this.gs(b));
      for (var J = this.gp(b).d(); J.i1(); J.i2())
        U.aa(J.i6());
      return U.aa(this.gl(b)), U;
    },
    m1: function(p, R) {
      var q = this.g2(p);
      q.i5();
      var W = R.ah(),
        O = W.i6();
      this.gx(p, O);
      var B = R.as();
      for (W.i2(); W.i6() !== B; W.i2()) {
        var z = W.i6();
        q.i4(z.x, z.y);
      }
      this.gy(p, B);
    },
    s5: function(t, c) {
      var u = this.g2(t);
      u.i5();
      for (var J = c.d(); J.i1(); J.i2()) {
        var i = J.i6();
        u.i4(i.x, i.y);
      }
    },
    s6: function(C, y) {
      var I = this.g2(C);
      I.i5();
      for (var b = y.ah(); b.i1(); b.i2()) {
        var N = b.i6();
        I.i4(N.x, N.y);
      }
    },
    m2: function(h, i, Q) {
      this.gx(h, i), this.gy(h, Q);
    },
    gn: function(F) {
      return this.g2(F).i6();
    },
    gk: function(R) {
      return this.g2(R).i7();
    },
    gt: function(n, L) {
      this.g2(n).i8(L);
    },
    gz: function(k, I) {
      this.g2(k).i9(I);
    },
    gs: function(p) {
      var d = this.g2(p).i6();
      return d
        ? new c(
            this.g5(p.a2()) + d.x,
            this.g6(p.a2()) + d.y
          )
        : this.g4(p.a2());
    },
    gl: function(C) {
      var O = this.g2(C).i7();
      return O
        ? new c(
            this.g5(C.a3()) + O.x,
            this.g6(C.a3()) + O.y
          )
        : this.g4(C.a3());
    },
    gx: function(T, x) {
      this.g2(T).i8(
        new c(x.x - this.g5(T.a2()), x.y - this.g6(T.a2()))
      );
    },
    gy: function(n, J) {
      this.g2(n).i9(
        new c(J.x - this.g5(n.a3()), J.y - this.g6(n.a3()))
      );
    },
    g8: function() {
      for (var j = new Ur(), R = this.xf(); R.i1(); R.i2())
        j.aa(R.i8());
      return j;
    },
    g3: function() {
      for (
        var j, K, Q = (j = g), U = (K = S), X = this.x9();
        X.i1();
        X.i2()
      ) {
        var h = this.ga(X.i9()),
          m = this.gm(X.i9());
        (Q = z(h.x, Q)),
          (j = z(h.y, j)),
          (U = E(h.x + m.width, U)),
          (K = E(h.y + m.height, K));
      }
      for (var s = this.xf(); s.i1(); s.i2())
        for (var B = this.gp(s.i8()).c(); B.i1(); B.i2()) {
          var F = B.i6();
          (Q = z(F.x, Q)),
            (j = z(F.y, j)),
            (U = E(F.x, U)),
            (K = E(F.y, K));
        }
      return {
        x: k(Q),
        y: k(j),
        width: k(U - Q),
        height: k(K - j),
      };
    },
  });
  var um = function() {
    um.superClass.constructor.call(this),
      this.a(new N(), new t());
  };
  s(um, nc, {
    a: function($, U) {
      (this._a3 = $), (this._a4 = U);
    },
    xo: function(v, W) {
      return this.l2(v, W, this._a4.a6());
    },
    l2: function(_, g, S) {
      return this.l1(_, b, g, b, 0, 0, S);
    },
    xn: function(J, r, F, g, _, N) {
      return this.l1(J, r, F, g, _, N, this._a4.a6());
    },
    l1: function(c, p, B, n, O, w, j) {
      var a = new Qh(this, c, p, B, n, O, w);
      return (a._l = j), a;
    },
    xm: function() {
      var G = new ll(this);
      return (G._r = this._a3.m3()), G;
    },
    g3: function() {
      for (
        var k = { x: 0, y: 0, width: -1, height: -1 },
          n = this.x9();
        n.i1();
        n.i2()
      )
        n.i9()._r.m1(k);
      return k;
    },
    g1: function(K) {
      return K._r;
    },
    g2: function(N) {
      return N._l;
    },
    g5: function(V) {
      return V._r.m4();
    },
    g6: function(h) {
      return h._r.m5();
    },
    gi: function(L) {
      return L._r.i1();
    },
    gh: function(h) {
      return h._r.i2();
    },
    gj: function(V) {
      return V._r.i3();
    },
    g9: function(d) {
      return d._r.i4();
    },
    s2: function(x, t, _) {
      x._r.m6(t, _);
    },
    s7: function(x, h, S) {
      x._r.i6(h, S);
    },
    s3: function(F, f, w) {
      F._r.i5(f, w);
    },
  });
  var _k = function() {
    _k.superClass.constructor.call(this),
      (this._ap = this.xk()),
      (this._as = this.xl());
  };
  s(_k, nc, {
    g1: function(h) {
      var I = this._ap.i1(h);
      return I || ((I = new jl()), this._ap.z1(h, I)), I;
    },
    g2: function(z) {
      var t = this._as.i1(z);
      return t || ((t = new Si()), this._as.i8(z, t)), t;
    },
  });
  var Wc = function(D) {
    Wc.superClass.constructor.call(this),
      (this._ay = D),
      (this._a0 = this.xk()),
      (this._au = this.xl());
  };
  s(Wc, _k, {
    c2: function(G) {
      var j = this._a0.i1(G);
      return j;
    },
    a2: function(J, Q) {
      this._a0.z1(J, Q);
    },
    h: function() {
      this._az || (this._az = this.xk());
      for (
        var o = gm.a(this._ay.x0() + 1),
          y = 1,
          S = this.x9();
        S.i1();

      ) {
        for (
          var x = this.c2(S.i9()), D = x.x1();
          D.i1();
          D.i2()
        ) {
          var s = D.i9();
          o[s.al()] = y;
        }
        for (var W = new Ur(), F = x.x1(); F.i1(); F.i2())
          for (
            var e = F.i9(), v = o[e.al()], R = e.ap();
            R.i1();
            R.i2()
          ) {
            var i = R.i8(),
              U = i.a3(),
              w = o[U.al()];
            w === v && W.ac(i);
          }
        this._az.z1(S.i9(), W), S.i2(), y++;
      }
    },
    d1: function(v) {
      return this._az.i1(v);
    },
    b: function(N) {
      return this._au.i1(N);
    },
    a3: function(j, M) {
      this._au.i8(j, M);
    },
    a1: function() {
      var y = this._ay.xk(),
        O = fr.a4(gm.a(this._ay.xh())),
        N = $m.a5(this._ay, O, $m.a1(this._ay, O, y));
      this.d2(y, N), this._ay.xi(y);
    },
    c1: function(h) {
      for (var m, t = -1, o = 0, c = h.length; c > o; o++) {
        var b = h[o];
        b.ay() > t && ((m = b), (t = b.ay()));
      }
      return m;
    },
    d2: function(G, o) {
      for (
        var O = this._ay.xl(),
          B = this._ay.xk(),
          D = o.length,
          L = 0;
        D > L;
        L++
      )
        for (var _ = o[L], W = _.c1(); W.i1(); W.i2())
          O.i8(W.i8(), _);
      var A = this.c1(o);
      this.a4(A, G, O, new I(), B);
      var P = {};
      D = o.length;
      for (var d = 0; D > d; d++) {
        var w = o[d];
        if (w.ay() > 1) {
          var F = this.xm();
          P[w._id] = F;
        }
      }
      for (var x = this._ay.x9(); x.i1(); x.i2()) {
        var e = x.i9();
        if (G.i4(e) && !B.i1(e)) {
          var k = this.xm();
          P[e._id] = k;
          var g = new $r();
          g.aa(e), this.a2(k, g);
        }
      }
      var f = gm.d(2),
        n = 0;
      for (D = o.length; D > n; n++) {
        var i = o[n];
        if (1 === i.ay()) {
          var J = i.c2();
          (f[0] = J.a2()), (f[1] = J.a3());
          for (var c = 0; 2 > c; c++) {
            var z = f[c];
            if (1 === z.ad()) {
              var S = this.xm();
              P[z._id] = S;
              var Z = new $r();
              Z.aa(z), this.a2(S, Z);
            }
          }
        }
      }
      for (var a = this._ay.x9(); a.i1(); a.i2()) {
        var y = a.i9();
        if (B.i1(y))
          for (
            var s = B.i1(y), Y = P[s._id], r = y.af();
            r.i1();
            r.i2()
          ) {
            var U = r.i8();
            if (O.i1(U) !== s) {
              var t = P[O.i1(U)._id];
              if (!t) {
                var C = U.a1(y),
                  v = B.i1(C);
                t = v ? P[v._id] : P[C._id];
              }
              var p,
                Q = Y.aj(t);
              Q
                ? (p = this.b(Q))
                : ((Q = this.xo(Y, t)), (p = new Ur())),
                p.aa(U),
                this.a3(Q, p);
            }
          }
        else if (G.i4(y))
          for (
            var V = P[y._id], N = y.af();
            N.i1();
            N.i2()
          ) {
            var j = N.i8(),
              X = j.a1(y),
              q = P[X._id];
            if (q) {
              var m = V.aj(q);
              if (!m) {
                var l = this.xo(V, q),
                  $ = new Ur();
                $.aa(j), this.a3(l, $);
              }
            }
          }
      }
      if (2 === this._ay.x0() && 1 === this._ay.xg()) {
        var K = this._ay.xf().i8(),
          R = P[K.a2()._id],
          T = P[K.a3()._id];
        if (T && R && !T.aj(R)) {
          var h = this.xo(R, T),
            b = new Ur();
          b.aa(K), this.a3(h, b);
        }
      }
      var E = gm.a(this._ay.x0()),
        H = 1;
      D = o.length;
      for (var u = 0; D > u; u++) {
        var M = o[u],
          Jq = P[M._id];
        if (Jq) {
          var od = this.c2(Jq);
          od || ((od = new $r()), this.a2(Jq, od));
          for (var is = M.c1(); is.i1(); is.i2()) {
            var Te = is.i8(),
              Lq = Te.a2();
            E[Lq.al()] === H ||
              (G.i4(Lq) && B.i1(Lq) !== M) ||
              ((E[Lq.al()] = H), od.aa(Lq)),
              (Lq = Te.a3()),
              E[Lq.al()] === H ||
                (G.i4(Lq) && B.i1(Lq) !== M) ||
                ((E[Lq.al()] = H), od.aa(Lq));
          }
        }
      }
      this._ay.xj(O), this._ay.xi(B);
    },
    a4: function($, d, g, L, j) {
      if (!L.contains($)) {
        L.add($);
        for (var k = [], f = $.c1(); f.i1(); f.i2()) {
          var R = f.i8();
          (k[0] = R.a2()), (k[1] = R.a3());
          for (var O = 0; 2 > O; O++) {
            var H = k[O];
            if (d.i4(H) && !j.i1(H)) {
              $.ay() > 1 && j.z1(H, $);
              for (var b = H.af(); b.i1(); b.i2())
                this.a4(g.i1(b.i8()), d, g, L, j);
            }
          }
        }
      }
    },
  });
  var ig = function(H, X, n) {
    (this._a = {}), ig.superClass.constructor.call(this);
    for (var c = new I(), l = 0, P = X.size(); P > l; l++) {
      var E = X.get(l);
      if (E instanceof i) c.add(E);
      else {
        E instanceof w && E.setExpanded(!0);
        var v = H.getNodeSize(E);
        if ((E instanceof w && E.setExpanded(!1), v)) {
          var T = this.xm(),
            j = H._repulsion;
          n !== W || E instanceof w
            ? n === W
              ? (j *= 1.1)
              : n === J && (j *= 0.9)
            : (j *= 0.6),
            n === a || n === _
              ? this.s7(T, v.height * j, v.width * j)
              : this.s7(T, v.width * j, v.height * j),
            (T.node = E),
            (this._a[E.getId()] = T);
        }
      }
    }
    for (l = 0, P = c.size(); P > l; l++) {
      var q = c.get(l),
        K = q.getSourceAgent(),
        U = q.getTargetAgent(),
        R = this._a[K.getId()],
        S = this._a[U.getId()];
      R && S && R !== S && this.xo(R, S);
    }
  };
  s(ig, um, {});
  var vl = {
      _D: new L(),
      _E: new c(0, 0),
      b: function(q) {
        if (q.i1() > 0) {
          for (var f = new I(), L = q.i1() - 1; L >= 0; L--)
            f.add(q.i2(L));
          q.i5();
          for (var K = 0, $ = f.size(); $ > K; K++) {
            var T = f.get(K);
            q.i4(T.x, T.y);
          }
        }
        var U = q.i6();
        q.i8(q.i7()), q.i9(U);
      },
      c: function(R) {
        vl.d(R, !0);
      },
      d: function(O, X) {
        if (X)
          for (var z = O.xf(); z.i1(); z.i2()) {
            var e = z.i8();
            O.gt(e, vl._E), O.gz(e, vl._E), O.s5(e, vl._D);
          }
        else
          for (var H = O.xf(); H.i1(); H.i2())
            O.s5(H.i8(), vl._D);
      },
      e: function(B) {
        for (
          var X = new c(0, 0), r = B.xf();
          r.i1();
          r.i2()
        ) {
          var H = r.i8();
          B.gt(H, X), B.gz(H, X);
        }
      },
      f: function(n, Q, i, q) {
        for (
          var w = n.gc(Q).b(),
            h = gm.d(w),
            X = 0,
            P = n.gc(Q).c();
          P.i1();
          P.i2()
        ) {
          var z = P.i6();
          (0 >= X || !z.equals(h[X - 1])) &&
            ((h[X] = new c(z.x, z.y)), X++);
        }
        if (((w = X), !(2 > w))) {
          var R = new I(),
            T = vl.i(
              new v(h[1].x - h[0].x, h[1].y - h[0].y)
            );
          (T.x *= q), (T.y *= q);
          for (
            var M = vl.h(h[0], T),
              $ = vl.h(h[1], T),
              Y = new y(M, $),
              E = 1;
            w - 1 > E;
            E++
          ) {
            var J = Y,
              H = vl.i(
                new v(
                  h[E + 1].x - h[E].x,
                  h[E + 1].y - h[E].y
                )
              );
            (H.x *= q), (H.y *= q);
            var b = vl.h(h[E], H),
              f = vl.h(h[E + 1], H);
            Y = new y(b, f);
            var m = y.a6(J, Y);
            m && R.add(new c(m.x, m.y));
          }
          var s = new v(
            h[w - 1].x - h[w - 2].x,
            h[w - 1].y - h[w - 2].y
          );
          (s = vl.i(s)), (s.x *= q), (s.y *= q);
          var S = vl.h(h[w - 1], s),
            p = new L(R);
          Q.a2() === i.a2()
            ? (n.s5(i, p), n.m2(i, M, S))
            : (n.s5(i, p.a()), n.m2(i, S, M));
        }
      },
      g: function(Y, u, i, x) {
        for (var t = x, $ = i.c1(); $.i1(); $.i2()) {
          var v = $.i8();
          vl.f(Y, u, v, t), 0 > t && (t -= x), (t = -t);
        }
      },
      a: function(z, o, m) {
        return vl.j(z, o, m, 1);
      },
      l: function(O, J, $) {
        if (!O || O.length < 1)
          return (
            J &&
              ((J.x = 0),
              (J.y = 0),
              (J.width = 0),
              (J.height = 0)),
            { width: 0, height: 0 }
          );
        for (var s = 0, v = 0, D = 0; D < O.length; D++) {
          var l = O[D];
          (s = E(s, l.width)), (v = E(v, l.height));
        }
        var B,
          F,
          n = s * v * O.length,
          m = Y(n / $),
          i = n / m,
          L = k(i / s),
          M = X(i / s),
          a = X(O.length / L),
          q = X(O.length / M);
        M * q > L * a
          ? ((B = L), (F = a))
          : ((B = M), (F = q));
        var A,
          w = 0,
          g = 0,
          o = 0,
          Z = 0;
        if (s > v)
          for (var G = 0; G < O.length; G++)
            (A = O[G]),
              (A.x = g * s),
              (A.y = w * v),
              (o = E(o, A.x + A.width)),
              (Z = E(Z, A.y + A.height)),
              ++g >= B && (w++, (g = 0));
        else
          for (var U = 0; U < O.length; U++)
            (A = O[U]),
              (A.x = g * s),
              (A.y = w * v),
              (o = E(o, A.x + A.width)),
              (Z = E(Z, A.y + A.height)),
              ++w >= F && (g++, (w = 0));
        return (
          J &&
            ((J.x = 0),
            (J.y = 0),
            (J.width = o),
            (J.height = Z)),
          { width: F, height: B }
        );
      },
      j: function(r, n, v) {
        if (!r || r.length < 1)
          return (
            n &&
              ((n.x = 0),
              (n.y = 0),
              (n.width = 0),
              (n.height = 0)),
            0
          );
        for (
          var T,
            i,
            c = (T = r[0].width),
            g = (i = r[0].height),
            K = r.length,
            V = 1;
          K > V;
          V++
        ) {
          var h = r[V].width;
          (c = z(c, h)), (T = E(T, h));
          var X = r[V].height;
          (g = z(g, X)), (i = E(i, X));
        }
        if (g / i > 0.95 && c / T > 0.95)
          return vl.l(r, n, v).width;
        for (var a = new Ie(), C = 0, G = 0; K > G; G++) {
          var B = r[G];
          a.aa(r[G]), (C = k(C + B.width * B.height));
        }
        a.a1(function(w, n) {
          var J = k(n.height) - k(w.height);
          return 0 === J ? k(n.width) - k(w.width) : J;
        });
        var O = 0,
          m = 0,
          A = k(v * Y(C / v)),
          N = A,
          e = 0,
          P = new Ie();
        do {
          var J,
            F,
            j = new Ie(),
            x = (J = F = 0);
          P.aa(j);
          for (var $ = a.ah(); $.i1(); $.i2()) {
            var l = $.i6();
            x + l.width > N && j.ay() > 0
              ? ((F = E(F, x)),
                (j = new Ie()),
                j.aa(l),
                P.aa(j),
                (x = k(l.width)))
              : (j.aa(l), (x = k(x + l.width))),
              1 === j.ay() && (J = k(J + j.am().height));
          }
          (F = E(F, x)),
            v * J > F &&
              e !== F &&
              (P.af(), (N = k(1.1 * N)), (e = F));
        } while (P.ar());
        for (var S = 0, _ = P.ah(); _.i1(); _.i2()) {
          for (
            var s = 0, d = _.i6(), p = d.ah();
            p.i1();
            p.i2()
          ) {
            var H = p.i6();
            (H.x = s), (H.y = S), (s += H.width);
          }
          (O = E(O, s)), (S += vl.k(d)), (m = E(m, S));
        }
        return (
          n &&
            ((n.x = 0),
            (n.y = 0),
            (n.width = O),
            (n.height = m)),
          P.ay()
        );
      },
      k: function(L) {
        for (var V = 0, u = L.ah(); u.i1(); u.i2())
          V = E(u.i6().height, V);
        return V;
      },
      h: function(U, i) {
        return new c(U.x + i.x, U.y + i.y);
      },
      i: function(j) {
        var I = Y(j.x * j.x + j.y * j.y);
        return new v(-j.y / I, j.x / I);
      },
    },
    Kk = function(e) {
      (this._a = e), (this._b = !1);
    };
  s(Kk, d, {
    a: function() {
      return this._b;
    },
    b: function() {
      return this._a;
    },
    c: function() {
      return 1 === this._a;
    },
    d: function() {
      return 2 === this._a;
    },
    e: function() {
      return 4 === this._a;
    },
    f: function() {
      return 8 === this._a;
    },
    g: function() {
      return 0 === this._a;
    },
  }),
    (Kk.h = function(Q, A) {
      var C = Q.xc('A');
      return C ? C.i1(A) : b;
    }),
    (Kk.i = function(M, E) {
      var s = M.xc('B');
      return s ? s.i1(E) : b;
    }),
    (Kk.j = function(Y) {
      switch (Y) {
        case 1:
          return Kk.k;
        case 2:
          return Kk.l;
      }
      return b;
    }),
    (Kk.k = new Kk(1)),
    (Kk.l = new Kk(2));
  var Jn = function(e, h, N, P, s) {
    (this._o = 0),
      (this._l = 0),
      (this._i = 0),
      (this._d = 0),
      (this._f = 0),
      (this._b = e),
      (this._a = 1e-4),
      (this._r = h),
      (this._p = 1),
      (this._e = (s.gj(e) + s.g9(e)) / 4);
    var p = 0.45 * N * Y(P);
    (this._k = ac.l(-p, p)),
      (this._h = ac.l(-p, p)),
      (this._g = ac.l(-p, p));
  };
  s(Jn, d, {});
  var mj = function() {
    (this._a = 0), (this._c = 0), (this._b = 0);
  };
  s(mj, d, {});
  var Jj = function() {
    Jj.superClass.constructor.call(this),
      (this._dj = 0),
      (this._dh = 0),
      (this._dq = 0),
      (this._dp = 0),
      (this._dt = 0),
      (this._de = 0),
      (this._d3 = 0),
      (this._dr = 0),
      (this._ed = 0),
      (this._dw = 0.65),
      (this._ea = 1),
      (this._dl = 80),
      (this._dx = 3),
      (this._d8 = !0),
      (this._eb = 3e5),
      (this._ee = 2),
      (this._di = 2),
      (this._df = 1e3);
  };
  s(Jj, Np, {
    i4: function() {
      return !0;
    },
    i3: function(O) {
      if (O && ((this._d5 = O), this.s(O))) {
        var P = new mj(),
          l = 0,
          T = k(
            this._dx * this._dz.length * this._dz.length +
              20 * this._dz.length
          );
        T = E(T, 1e4);
        var b = this._ea * this._ea * this._dz.length,
          V = this._df;
        try {
          for (; this._dj > b && T > l; l++) {
            var r = this.b(2147483647 & l);
            0 === V-- &&
              (this._dy.b() > this._eb && (l = T),
              (V = this._df)),
              this.h(r, P),
              this.d(r, P),
              this.i(r, P),
              this._d8
                ? (this.g(r, P), this.j(r, P))
                : (this.f(r, P), this.c(r, P));
            var i = Y(
              P._a * P._a + P._c * P._c + P._b * P._b
            );
            this.ac(r, P, i), this.aa(r, P, i);
          }
        } finally {
          this.r();
        }
      }
    },
    s: function(Y) {
      if (!Y || Y.xa() < 1) return !1;
      (this._d5 = Y),
        (this._dp = 1),
        (this._dy = new oe()),
        (this._dt = Y.x0()),
        (this._d2 = gm.d(this._dt)),
        (this._df = 1 + 1e5 / this._dt),
        (this._ed = 1 / (2 * this._di)),
        (this._de =
          (this._ed * this._ee) / (0.05 * this._dl)),
        (this._d3 = Q(this._dl, -1) * this._ed),
        (this._dr = Q(this._dl, 3) * this._ed),
        (this._dj = 0),
        (this._du = new mj()),
        (this._dq = E(20 * this._dl, 10));
      var u = E(0.1, z(this._dw * this._dl, this._dq)),
        O = this._dt;
      vl.c(Y), (this._dz = gm.d(O));
      for (var y = Y.x9(); y.i1(); y.i2()) {
        var o = y.i9(),
          U = new Jn(o, u, this._dl, this._dt, Y);
        (this._dz[--O] = U),
          (this._dj += U._r),
          (this._dh += U._r * U._r),
          (this._du._a += U._k),
          (this._du._c += U._h),
          (this._du._b += U._g),
          (this._d2[o.al()] = U);
      }
      return (this._d8 = !1), this._dz.length > 0;
    },
    b: function(g) {
      var n = this._dz.length,
        z = n - (g % n) - 1,
        B = ac.k(z + 1),
        _ = this._dz[B];
      return (
        (this._dz[B] = this._dz[z]), (this._dz[z] = _), _
      );
    },
    f: function(u, a) {
      for (
        var S, z, Z = (S = z = 0), q = u._b.ae();
        q;
        q = q.a7()
      ) {
        var h,
          H = this._d2[q.a2().al()],
          M = H._k - u._k,
          G = H._h - u._h,
          n = H._g - u._g,
          l = M * M + G * G + n * n,
          E = Y(l),
          f = E - (H._e + u._e);
        0 >= f ||
          ((h = (f * f * this._d3) / E),
          (Z += M * h),
          (S += G * h),
          (z += n * h));
      }
      for (var T = u._b.ag(); T; T = T.a8()) {
        var O,
          j = this._d2[T.a3().al()],
          D = j._k - u._k,
          x = j._h - u._h,
          t = j._g - u._g,
          A = D * D + x * x + t * t,
          J = Y(A),
          U = J - (j._e + u._e);
        0 >= U ||
          ((O = (U * U * this._d3) / J),
          (Z += D * O),
          (S += x * O),
          (z += t * O));
      }
      (a._a += Z), (a._c += S), (a._b += z);
    },
    g: function(q, w) {
      var b,
        o,
        V = (b = o = 0);
      this._dp++, (q._f = this._dp);
      for (var P = q._b.ae(); P; P = P.a7()) {
        var $ = this._d2[P.a2().al()];
        $._f = this._dp;
        var f = $._k - q._k,
          p = $._h - q._h,
          U = $._g - q._g,
          O = f * f + p * p + U * U,
          K = Y(O);
        if (0 !== K) {
          var W = E(1e-6, K - (q._e + $._e)),
            l = -this._ef[P.a5()] / (W * W);
          (l += W * W * this._d1[P.a5()]),
            (l /= K),
            (V += f * l),
            (b += p * l),
            (o += U * l);
        }
      }
      for (var M = q._b.ag(); M; M = M.a8()) {
        var e = this._d2[M.a3().al()];
        e._f = this._dp;
        var C = e._k - q._k,
          L = e._h - q._h,
          T = e._g - q._g,
          D = C * C + L * L + T * T,
          z = Y(D);
        if (0 !== z) {
          var u = E(1e-6, z - (q._e + e._e)),
            s = -this._ef[M.a5()] / (u * u);
          (s += u * u * this._d1[M.a5()]),
            (s /= z),
            (V += C * s),
            (b += L * s),
            (o += T * s);
        }
      }
      (w._a += V), (w._c += b), (w._b += o);
    },
    j: function(d, Q) {
      for (
        var s, W, f = (s = W = 0), u = this._dt - 1;
        u >= 0;
        u--
      ) {
        var T = this._d2[u];
        if (T._f !== d._f) {
          var J = d._k - T._k,
            y = d._h - T._h,
            c = d._g - T._g,
            _ = J * J + y * y + c * c;
          if (0 !== _) {
            var F = Y(_),
              A = E(1e-6, F - (d._e + T._e)),
              Z = this._dr / (A * A * F);
            (f += J * Z), (s += y * Z), (W += c * Z);
          }
        }
      }
      (Q._a += f), (Q._c += s), (Q._b += W);
    },
    c: function(L, p) {
      for (
        var a, O, C = (a = O = 0), I = this._dt - 1;
        I >= 0;
        I--
      ) {
        var d = this._d2[I],
          X = L._k - d._k,
          M = L._h - d._h,
          J = L._g - d._g,
          f = X * X + M * M + J * J;
        if (0 !== f) {
          var t,
            K = Y(f),
            T = K - (L._e + d._e);
          (t =
            0 >= T
              ? this._dr / (1e-8 * K)
              : this._dr / (T * T * K)),
            (C += X * t),
            (a += M * t),
            (O += J * t);
        }
      }
      (p._a += C), (p._c += a), (p._b += O);
    },
    i: function(k, s) {
      var M = this._du._b / this._dt - k._g;
      s._b += (M * this._dl * this._dt) / this._dh;
    },
    d: function(y, u) {
      if (0 !== this._de) {
        var N = this._du._a / this._dt - y._k,
          X = this._du._c / this._dt - y._h,
          V = this._du._b / this._dt - y._g;
        (u._a += N * this._de),
          (u._c += X * this._de),
          (u._b += V * this._de);
      }
    },
    h: function(q, G) {
      var n = 0.05 * (q._r + 2);
      n > 0 &&
        ((G._a = ac.l(-n, n)),
        (G._c = ac.l(-n, n)),
        (G._b = ac.l(-n, n)));
    },
    ac: function(f, d, A) {
      if (0 !== A && 0 !== f._a) {
        var W = d._a * f._o + d._c * f._l + d._b * f._i,
          n = W / (A * f._a);
        (this._dh -= f._r * f._r),
          (this._dj -= f._r),
          (f._r += f._p * n > 0 ? 0.45 * n : 0.15 * n),
          f._r > this._dq
            ? (f._r = this._dq)
            : f._r < 0.1 && (f._r = 0.1),
          (this._dj += f._r),
          (this._dh += f._r * f._r),
          (f._p = n);
      }
    },
    aa: function(N, D, r) {
      if (r > 0) {
        var Y = N._r / r,
          t = D._a * Y,
          O = D._c * Y,
          V = D._b * Y;
        (N._k += t),
          (N._h += O),
          (N._g += V),
          (this._du._a += t),
          (this._du._c += O),
          (this._du._b += V),
          (N._a = r),
          (N._o = D._a),
          (N._l = D._c),
          (N._i = D._b);
      }
    },
    r: function() {
      for (var m = this._d2.length - 1; m >= 0; m--) {
        var z = this._d2[m];
        this._d5.s2(z._b, z._k, z._h);
      }
    },
  });
  var Zr = function(b, e) {
    (this._e = b), (this._f = e), (this._c = {});
  };
  s(Zr, d, {
    r: function() {
      for (var n in this._c) {
        var B = this._c[n];
        B.g.setExpanded(B.b);
      }
    },
    p: function() {
      for (
        var T = new I(),
          O = new I(),
          c = new I(),
          V = 0,
          Y = this._f.size();
        Y > V;
        V++
      ) {
        var Z = this._f.get(V);
        if (Z instanceof i) Z.isLooped() || T.add(Z);
        else if (Z instanceof R) {
          if (Z.getParent() instanceof w) {
            Z instanceof w || O.add(Z);
            continue;
          }
          T.add(Z), Z instanceof w && (c.add(Z), this.l(Z));
        }
      }
      return (
        O.each(function(S) {
          for (var D = !0, R = 0; R < c.size(); R++)
            if (S.isDescendantOf(c.get(R))) {
              D = !1;
              break;
            }
          D && T.add(S);
        }),
        T
      );
    },
    l: function(X) {
      if (!this._c[X.getId()]) {
        var g = this._e.getType(X),
          o = U(g);
        if (o) {
          (this._c[X.getId()] = {
            g: X,
            b: X.isExpanded(),
          }),
            X.setExpanded(!0);
          for (
            var x,
              z = new I(),
              q = X.getChildren(),
              l = 0,
              S = q.size();
            S > l;
            l++
          )
            if (
              ((x = q.get(l)),
              x instanceof w &&
                (this.l(x), x.setExpanded(!1)),
              x instanceof i || z.contains(x) || z.add(x),
              x instanceof R)
            ) {
              var J = x.getEdges();
              if (J)
                for (var A = 0, m = J.size(); m > A; A++) {
                  var f = J.get(A);
                  z.contains(f) || z.add(f);
                }
            }
          var h = new ig(this._e, z, g);
          try {
            o.i2(h);
            var e = $(g);
            for (var K in h._a) {
              var y = h._a[K],
                p = h.g4(y);
              y.node.p(e ? e.tf(p) : p);
            }
          } catch (D) {}
          X.eachChild(function(X) {
            X instanceof w && X.setExpanded(!0);
          });
        }
      }
    },
  });
  var $j = function() {};
  s($j, d, {
    i1: function(X, k, T) {
      var V = this.a1(X, k);
      return this.a2(X, k, T), V;
    },
    a1: function(z, t) {
      var $ = $j.i4(z);
      $.ax();
      for (var Z = 0, R = $.x1(); R.i1(); R.i2())
        t.i7(R.i9(), -1);
      for (var n = $.x1(); n.i1(); n.i2()) {
        for (
          var o = n.i9(), r = -1, e = o.aq();
          e.i1();
          e.i2()
        )
          r = E(r, t.i2(e.i9()));
        t.i7(o, r + 1), (Z = E(Z, r + 1));
      }
      return Z + 1;
    },
    a2: function(Q, w, N) {
      N.az($j.i3(Q, w));
    },
  }),
    ($j.i3 = function(e, j) {
      for (var B = new Ur(), A = e.xf(); A.i1(); A.i2()) {
        var W = A.i8();
        j.i2(W.a2()) > j.i2(W.a3()) && (e.x3(W), B.ac(W));
      }
      return B;
    }),
    ($j.i4 = function(l) {
      var Q = gm.a(l.xa());
      return new Ld().a1(l, Q), $j.i2(l, Q);
    }),
    ($j.i2 = function(x, Y) {
      for (
        var b = gm.d(x.x0()), S = x.x9();
        S.i1();
        S.i2()
      ) {
        var t = S.i9(),
          h = t.al();
        b[Y[h]] = t;
      }
      return new $r(b);
    });
  var Sb = function() {
    Sb.superClass.constructor.call(this), this.c0();
  };
  s(Sb, Ur, {
    c0: function() {
      (this._bc = 1), (this._bd = 0);
    },
  });
  var Qg = function() {
    (this._m1 = 20),
      (this._m2 = 60),
      (this._m3 = 5),
      (this._m4 = 0);
  };
  s(Qg, d, {
    i4: function(x) {
      this._m3 = x;
    },
    i5: function(n) {
      this._m4 = n;
    },
    i3: function(S) {
      this._m1 = S;
    },
    i6: function(m) {
      this._m2 = m;
    },
    i2: function(L) {
      this._m5 = L;
    },
    t1: function() {
      return this._m2;
    },
    a1: function(v, A) {
      for (var b = gm.d(A.length), j = 0; j < A.length; j++)
        b[j] = A[j].x1();
      this.a2(v, b);
    },
    a2: function(X, C) {
      for (
        var j = gm.a(C.length), Q = 0, A = 0;
        A < C.length;
        A++
      ) {
        var $ = 0,
          h = C[A];
        for (h.i4(); h.i1(); h.i2()) $ = E($, X.g9(h.i9()));
        for (j[A] = $, h.i4(); h.i1(); h.i2()) {
          var v = (j[A] - X.g9(h.i9())) / 2;
          X.s4(h.i9(), new c(X.gi(h.i9()), Q + v));
        }
        (Q += j[A] + this.t1()), h.i4();
      }
    },
    i1: function(n, r, d) {
      (this._m6 = n), this.t2(r, d);
    },
  });
  var pq = function() {
    pq.superClass.constructor.call(this);
  };
  s(pq, Qg, {
    t2: function(j) {
      var M = this._m6;
      (this._a = M.xc('D')),
        (this._h = M.xc('C')),
        this.a1(M, j),
        this.tg(M, j),
        this.tf(j, fr.a5(this._e), this._m5, this._l),
        this.tb(M, this._f[0]),
        this.ta(j),
        this.th(M, this._f[0], j),
        this.b(j),
        this.tb(M, this._f[1]),
        this.ta(j),
        this.th(M, this._f[1], j),
        this.b(j),
        this.a11(this._f[1]),
        this.a12(j),
        this.tb(M, this._f[2]),
        this.ta(j),
        this.th(M, this._f[2], j),
        this.b(j),
        this.tb(M, this._f[3]),
        this.ta(j),
        this.th(M, this._f[3], j),
        this.b(j),
        this.a11(this._f[3]),
        this.a12(j),
        this.tc(M),
        this.tj();
    },
    a11: function(n) {
      for (var w = 0; w < n.length; w++) n[w] = -n[w];
    },
    b: function(t) {
      for (var e = 0; e < t.length; e++) {
        var S = t[e];
        S.ax();
      }
      for (var _ = 0; _ < t.length; _++)
        for (var f, P = 0, g = t[_].x1(); g.i1(); g.i2()) {
          var m = g.i9(),
            j = m.al();
          (this._l[j] = P++),
            (this._b[j] = f),
            (this._k[j] = b),
            f && (this._k[f.al()] = m),
            (f = m);
        }
      var i = this._a;
      (this._a = this._h), (this._h = i);
      for (var J = this._m6.xf(); J.i1(); J.i2()) {
        var N = J.i8(),
          O = this._m6.gn(N);
        this._m6.gt(N, new c(-O.x, O.y));
        var X = this._m6.gk(N);
        this._m6.gz(N, new c(-X.x, X.y));
      }
      var w = this._l,
        U = function(D, L) {
          return !D && L
            ? 1
            : D && !L
            ? -1
            : D || L
            ? w[D.a2().al()] - w[L.a2().al()]
            : 0;
        },
        Z = function(y, E) {
          return !y && E
            ? 1
            : y && !E
            ? -1
            : y || E
            ? w[y.a3().al()]
            : 0;
        };
      this._m6.x2(U, Z);
    },
    a12: function(Y) {
      for (var A = this._m6.xf(); A.i1(); A.i2()) {
        var q = A.i8();
        this._m6.x3(q);
        var J = this._m6.gn(q),
          N = this._m6.gk(q);
        this._m6.gz(q, J), this._m6.gt(q, N);
      }
      for (
        var Q = new Ie(), c = 0, X = 0;
        c < Y.length;
        c++
      )
        Q.ae(Y[c]);
      for (; X < Y.length; X++) Y[X] = Q.au();
      var g = this._l,
        H = function(L, l) {
          return !L && l
            ? 1
            : L && !l
            ? -1
            : L || l
            ? g[L.a2().al()] - g[l.a2().al()]
            : 0;
        },
        t = function(A, s) {
          return !A && s
            ? 1
            : A && !s
            ? -1
            : A || s
            ? g[A.a3().al()]
            : 0;
        };
      this._m6.x2(H, t);
    },
    tg: function(z, $) {
      var n = z.x0(),
        t = z.xg(),
        h = 0;
      for (
        this._l = gm.a(n),
          this._b = gm.d(n),
          this._k = gm.d(n),
          this._m = gm.d(n),
          this._i = gm.d(n),
          this._o = gm.d(n),
          this._f = gm.e(4, n),
          this._c = gm.a(n),
          this._g = gm.a(n),
          this._j = gm.a(n),
          this._d = gm.b(n),
          this._e = gm.b(t);
        h < $.length;
        h++
      )
        for (var V, e = 0, Y = $[h].x1(); Y.i1(); Y.i2()) {
          var x = Y.i9(),
            Z = x.al();
          (this._l[Z] = e++),
            (this._b[Z] = V),
            (this._k[Z] = b),
            V && (this._k[V.al()] = x),
            (V = x);
        }
      var P = this._l,
        X = function(b, T) {
          return !b && T
            ? 1
            : b && !T
            ? -1
            : b || T
            ? P[b.a2().al()] - P[T.a2().al()]
            : 0;
        },
        A = function(Y, _) {
          return !Y && _
            ? 1
            : Y && !_
            ? -1
            : Y || _
            ? P[Y.a3().al()]
            : 0;
        };
      z.x2(X, A);
    },
    tb: function(E, M) {
      for (var O = E.x9(); O.i1(); O.i2()) {
        var K = O.i9(),
          t = K.al();
        (this._m[t] = K),
          (this._i[t] = K),
          (M[t] = g),
          (this._o[t] = K),
          (this._c[t] = g),
          (this._d[t] = !1),
          (this._j[t] = this._g[t] = 0);
      }
    },
    ta: function(W) {
      for (var s = 1; s < W.length; s++)
        for (var j = -1, C = W[s]._b; C; C = C.a()) {
          var d = C.d(),
            G = d.al(),
            u = d.ak();
          if (0 !== u) {
            for (
              var L = k((u + 1) / 2),
                p = X((u + 1) / 2),
                F = 1,
                i = d.ae(),
                l = !1;
              L > F;
              i = i.a7()
            )
              F++;
            for (; p >= F && !l; F++) {
              var Y = this._m6.g2(i),
                x = i.a2(),
                g = x.al();
              this._i[G] === d &&
                !this._e[i.a5()] &&
                j < this._l[g] &&
                ((j = this._l[g]),
                (this._i[g] = d),
                (this._m[G] = this._m[g]),
                (this._i[G] = this._m[G]),
                (l = !0),
                (this._j[g] = Y.i6().x),
                (this._g[G] = Y.i7().x)),
                (i = i.a7());
            }
          }
        }
    },
    th: function(s, i, S) {
      for (var T = s.x9(); T.i1(); T.i2()) {
        var x = T.i9(),
          y = x.al();
        this._m[y] === x && this.td(s, x, i);
      }
      for (var L = 0; L < S.length; L++) {
        var Z = S[L].x1();
        if (Z.i1()) {
          var r = S[L].x1().i9(),
            d = r.al();
          this._o[this._m[d].al()] === r &&
            this.tk(s, r, i);
        }
      }
      for (var O = s.x9(); O.i1(); O.i2()) {
        var I = O.i9(),
          a = I.al(),
          u = this._c[this._o[this._m[a].al()].al()];
        g > u && (i[a] += u);
      }
    },
    td: function(Z, L, i) {
      var P = L.al();
      if (i[P] === g) {
        i[P] = 0;
        var y = L,
          C = 0;
        do {
          var $ = y.al();
          if (
            ($ !== P && (C -= this._g[$]), this._l[$] > 0)
          ) {
            var Q = this._b[$],
              I = this._m[this._b[$].al()],
              p = I.al();
            this.td(Z, I, i),
              this._o[P] === L && (this._o[P] = this._o[p]),
              this._o[P] === this._o[p] &&
                (i[P] = E(
                  i[P],
                  i[Q.al()] + this.ti(Z, Q, y) - C
                ));
          }
          (C += this._j[$]), (y = this._i[$]);
        } while (y !== L);
        (C = 0), (y = L);
        do {
          var h = y.al();
          h !== P && (C -= this._g[h]),
            (i[h] = i[P] + C),
            (C += this._j[h]),
            (y = this._i[h]);
        } while (y !== L);
      }
    },
    tk: function(b, t, w) {
      var Z = t.al();
      if (!this._d[Z]) {
        this._d[Z] = !0;
        var n = t;
        do {
          var m = n.al(),
            K = this._k[m];
          if (K) {
            var c = K.al(),
              B = this._o[this._m[c].al()];
            if (B !== this._o[Z]) {
              var P = w[c] - w[Z] - this.ti(b, n, K);
              this._c[B.al()] !== g &&
                (P += this._c[B.al()]),
                (this._c[this._o[Z].al()] = z(
                  this._c[this._o[Z].al()],
                  P
                ));
            } else this.tk(b, this._m[c], w);
          }
          n = this._i[m];
        } while (n !== t);
      }
    },
    tc: function(H) {
      for (
        var w = gm.a(4), R = gm.a(4), y = H.x9();
        y.i1();
        y.i2()
      ) {
        var F = y.i9().al();
        (R[0] += this._f[0][F]),
          (R[1] += this._f[1][F]),
          (R[2] += this._f[2][F]),
          (R[3] += this._f[3][F]);
      }
      (R[0] /= H.xa()),
        (R[1] /= H.xa()),
        (R[2] /= H.xa()),
        (R[3] /= H.xa());
      for (var e = H.x9(); e.i1(); e.i2()) {
        var b = e.i9(),
          V = b.al(),
          A = H.g4(b);
        (w[0] = this._f[0][V] - R[0]),
          (w[1] = this._f[1][V] - R[1]),
          (w[2] = this._f[2][V] - R[2]),
          (w[3] = this._f[3][V] - R[3]),
          w.sort(gm.n),
          H.s1(b, new c((w[1] + w[2]) / 2, A.y));
      }
    },
    ti: function(Y, U, j) {
      var G,
        W = Y.gj(U),
        r = Y.gj(j);
      return (
        (G =
          W > 1 && r > 1
            ? this._m1 + (W + r) / 2
            : this._m3 + (W + r) / 2),
        this._l[U.al()] < this._l[j.al()]
          ? (this._a && (G += this._a.i3(j)),
            this._h && (G += this._h.i3(U)))
          : (this._a && (G += this._a.i3(U)),
            this._h && (G += this._h.i3(j))),
        G
      );
    },
    tj: function() {
      this._l = this._b = this._k = this._e = this._m = this._i = this._f = this._c = this._o = this._d = this._j = this._g = b;
    },
    tf: function(q, f, k, n) {
      for (var L = q.length, e = 2; L - 1 > e; e++)
        for (
          var A = -1,
            c = 0,
            z = 0,
            y = q[e].x1(),
            d = q[e].x1();
          d.i1();
          d.i2()
        ) {
          var x,
            N = d.i9(),
            C = !1;
          if (
            (1 === N.ak() &&
              ((x = N.ae().a2()),
              k.i1(x) && k.i1(N) && (C = !0)),
            z === q[e].ay() - 1 || C)
          ) {
            for (
              var P = C ? n[x.al()] : q[e - 1].ay();
              z >= c;
              c++
            ) {
              for (
                var r = y.i9(), a = r.am();
                a.i1();
                a.i2()
              ) {
                var j = a.i8(),
                  R = n[j.a2().al()];
                (A > R || R > P) && f.i7(a.i8(), !0);
              }
              y.i2();
            }
            A = P;
          }
          z++;
        }
    },
  });
  var Bm = function(Y, o) {
    (this._b = 20),
      (this._a = o),
      (this._d = Y),
      (this._f = {});
  };
  s(Bm, d, {
    a3: function(j) {
      this._b = j;
    },
    a4: function(n, z, H, X, g) {
      if (this.a2(n)) {
        var j = this.b2(n);
        (j._o = z), (j._m = g), (j._n = X), (j._f = H);
      }
    },
    b2: function(S) {
      var e = this._f[S._id];
      return e || ((e = new yj()), (this._f[S._id] = e)), e;
    },
    a2: function(k) {
      return !!this._f[k._id];
    },
    c: function() {
      for (
        var a = fr.a1(gm.a(this._d.xa())),
          u = fr.a1(gm.a(this._d.xa())),
          m = this._d.x9();
        m.i1();
        m.i2()
      ) {
        var A = m.i9();
        if (this.a2(A)) {
          var D = this.b2(A);
          a.i6(A, this._b * (D.c() - 1)),
            u.i6(A, this._b * (D.b() - 1));
        }
      }
      this._d.x1('D', a), this._d.x1('C', u);
    },
    g: function() {
      this._d.x6('D'), this._d.x6('C');
    },
    f: function() {
      for (var x = this._d.x9(); x.i1(); x.i2()) {
        var C = x.i9();
        if (this.a2(C)) {
          var z = this._d.gi(C),
            A = this._d.gh(C),
            F = this._d.gj(C),
            Y = this._d.g9(C),
            t = this.b2(C),
            L = t._q.ay() + t._b.ay() + t._f,
            m = t._d.ay() + t._g.ay() + t._o,
            s = t._i.ay() + t._l.ay() + t._n,
            M = t._h.ay() + t._k.ay() + t._m,
            i = this._a.a7(F, L),
            O = this._a.a7(F, m),
            H = this._a.a7(Y, M),
            Q = this._a.a7(Y, s);
          t.a2(
            this._a.a8(F, L, i),
            this._a.a8(F, m, O),
            this._a.a8(Y, M, H),
            this._a.a8(Y, s, Q)
          );
          for (var l = t._j.c1(); l.i1(); l.i2()) {
            var $ = l.i8(),
              W = this.a1($),
              B = this.b1($),
              o = new Ie();
            W.b() === B.b()
              ? (W.c()
                  ? (o.aa(
                      new c(z + t._g._bd * O + t._c, A)
                    ),
                    o.aa(
                      new c(
                        z + t._g._bd * O + t._c,
                        A - this._b
                      )
                    ),
                    t._g._bd++,
                    o.aa(
                      new c(
                        z + t._g._bd * O + t._c,
                        A - this._b
                      )
                    ),
                    o.aa(new c(z + t._g._bd * O + t._c, A)),
                    t._g._bd++,
                    (t._g._bc = E(t._g._bc, 2)))
                  : W.d()
                  ? (o.aa(
                      new c(z + t._b._bd * i + t._p, A + Y)
                    ),
                    o.aa(
                      new c(
                        z + t._b._bd * i + t._p,
                        A + Y + this._b
                      )
                    ),
                    t._b._bd++,
                    o.aa(
                      new c(
                        z + t._b._bd * i + t._p,
                        A + Y + this._b
                      )
                    ),
                    o.aa(
                      new c(z + t._b._bd * i + t._p, A + Y)
                    ),
                    t._b._bd++,
                    (t._b._bc = E(t._b._bc, 2)))
                  : W.f()
                  ? (o.aa(
                      new c(z, A + t._i._bd * Q + t._a)
                    ),
                    o.aa(
                      new c(
                        z - this._b,
                        A + t._i._bd * Q + t._a
                      )
                    ),
                    t._i._bd++,
                    o.aa(
                      new c(
                        z - this._b,
                        A + t._i._bd * Q + t._a
                      )
                    ),
                    o.aa(new c(z, A + t._i._bd * Q + t._a)),
                    t._i._bd++,
                    (t._i._bc = E(t._i._bc, 2)))
                  : W.e() &&
                    (o.aa(
                      new c(z + F, A + t._h._bd * H + t._e)
                    ),
                    o.aa(
                      new c(
                        z + F + this._b,
                        A + t._h._bd * H + t._e
                      )
                    ),
                    t._h._bd++,
                    o.aa(
                      new c(
                        z + F + this._b,
                        A + t._h._bd * H + t._e
                      )
                    ),
                    o.aa(
                      new c(z + F, A + t._h._bd * H + t._e)
                    ),
                    t._h._bd++,
                    (t._h._bc = E(t._h._bc, 2))),
                this._d.m1($, o))
              : W.c() || B.c()
              ? W.e() || B.e()
                ? (o.aa(
                    new c(z + F - t._d._bd * O - t._c, A)
                  ),
                  o.aa(
                    new c(
                      z + F - t._d._bd * O - t._c,
                      A - this._b * t._d._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z + F + this._b * t._h._bc,
                      A - this._b * t._d._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z + F + this._b * t._h._bc,
                      A + t._h._bd * H + t._e
                    )
                  ),
                  o.aa(
                    new c(z + F, A + t._h._bd * H + t._e)
                  ),
                  t._d._bd++,
                  t._d._bc++,
                  t._h._bd++,
                  t._h._bc++,
                  B.c() && o.ax(),
                  this._d.m1($, o))
                : W.f() || B.f()
                ? (o.aa(new c(z + t._g._bd * O + t._c, A)),
                  o.aa(
                    new c(
                      z + t._g._bd * O + t._c,
                      A - this._b * t._g._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z - this._b * t._i._bc,
                      A - this._b * t._g._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z - this._b * t._i._bc,
                      A + t._i._bd * Q + t._a
                    )
                  ),
                  o.aa(new c(z, A + t._i._bd * Q + t._a)),
                  t._g._bd++,
                  t._g._bc++,
                  t._i._bd++,
                  t._i._bc++,
                  B.c() && o.ax(),
                  this._d.m1($, o))
                : (W.d() || B.d()) &&
                  (o.aa(
                    new c(z + F - t._d._bd * O - t._c, A)
                  ),
                  o.aa(
                    new c(
                      z + F - t._d._bd * O - t._c,
                      A - this._b * t._d._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z + F + this._b * t.b(),
                      A - this._b * t._d._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z + F + this._b * t.b(),
                      A + Y + this._b * t._q._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z + F - t._q._bd * i - t._p,
                      A + Y + this._b * t._q._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z + F - t._q._bd * i - t._p,
                      A + Y
                    )
                  ),
                  t._d._bd++,
                  t._d._bc++,
                  t._k._bc++,
                  t._h._bc++,
                  t._q._bc++,
                  t._q._bd++,
                  B.c() && o.ax(),
                  this._d.m1($, o))
              : W.d() || B.d()
              ? W.e() || B.e()
                ? (o.aa(
                    new c(
                      z + F - t._q._bd * i - t._p,
                      A + Y
                    )
                  ),
                  o.aa(
                    new c(
                      z + F - t._q._bd * i - t._p,
                      A + Y + this._b * t._q._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z + F + this._b * t._k._bc,
                      A + Y + this._b * t._q._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z + F + this._b * t._k._bc,
                      A + Y - t._k._bd * H - t._e
                    )
                  ),
                  o.aa(
                    new c(
                      z + F,
                      A + Y - t._k._bd * H - t._e
                    )
                  ),
                  t._q._bd++,
                  t._q._bc++,
                  t._k._bd++,
                  t._k._bc++,
                  B.d() && o.ax(),
                  this._d.m1($, o))
                : (W.f() || B.f()) &&
                  (o.aa(
                    new c(z + t._b._bd * i + t._p, A + Y)
                  ),
                  o.aa(
                    new c(
                      z + t._b._bd * i + t._p,
                      A + Y + this._b * t._b._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z - this._b * t._l._bc,
                      A + Y + this._b * t._b._bc
                    )
                  ),
                  o.aa(
                    new c(
                      z - this._b * t._l._bc,
                      A + Y - t._l._bd * Q - t._a
                    )
                  ),
                  o.aa(
                    new c(z, A + Y - t._l._bd * Q - t._a)
                  ),
                  t._b._bd++,
                  t._b._bc++,
                  t._l._bd++,
                  t._l._bc++,
                  B.d() && o.ax(),
                  this._d.m1($, o))
              : (o.aa(
                  new c(z, A + Y - t._l._bd * Q - t._a)
                ),
                o.aa(
                  new c(
                    z - this._b * t._l._bc,
                    A + Y - t._l._bd * Q - t._a
                  )
                ),
                o.aa(
                  new c(
                    z - this._b * t._l._bc,
                    A + Y + this._b * t.a1()
                  )
                ),
                o.aa(
                  new c(
                    z + F + this._b * t._k._bc,
                    A + Y + this._b * t.a1()
                  )
                ),
                o.aa(
                  new c(
                    z + F + this._b * t._k._bc,
                    A + Y - t._k._bd * H - t._e
                  )
                ),
                o.aa(
                  new c(z + F, A + Y - t._k._bd * H - t._e)
                ),
                t._l._bd++,
                t._l._bc++,
                t._b._bc++,
                t._q._bc++,
                t._k._bc++,
                t._k._bd++,
                B.f() && o.ax(),
                this._d.m1($, o));
          }
        }
      }
    },
    a5: function(q, u) {
      for (var w = 0; w < q.length; w++)
        for (
          var Q = q[w], F = u[w], R = Q.x1();
          R.i1();
          R.i2()
        ) {
          var a = R.i9();
          if (this.a2(a)) {
            var A = this.b2(a);
            (F._g = E(F._g, this._b * (A.d() - 1))),
              (F._j = E(F._j, this._b * (A.a1() - 1)));
          }
        }
    },
    a1: function(F) {
      var C,
        K = this._d.xc('A');
      if ((K && (C = K.i1(F)), !C || C.g())) {
        var D = this._d.xc('B');
        if (!D) return Kk.j(1);
        var u = D.i1(F);
        if (!u || u.g()) return Kk.j(1);
        if (u.c()) return Kk.j(8);
        if (u.f()) return Kk.j(1);
        if (u.d()) return Kk.j(4);
        if (u.e()) return Kk.j(2);
      }
      return C;
    },
    b1: function(Z) {
      var t,
        k = this._d.xc('B');
      if ((k && (t = k.i1(Z)), !t || t.g())) {
        var v = this._d.xc('A');
        if (!v) return Kk.j(8);
        var U = v.i1(Z);
        if (!U || U.g()) return Kk.j(8);
        if (U.c()) return Kk.j(8);
        if (U.f()) return Kk.j(1);
        if (U.d()) return Kk.j(4);
        if (U.e()) return Kk.j(2);
      }
      return t;
    },
  });
  var yj = function() {
    (this._o = 0),
      (this._f = 0),
      (this._n = 0),
      (this._m = 0),
      (this._c = 0),
      (this._p = 0),
      (this._e = 0),
      (this._a = 0),
      (this._j = new Ur()),
      (this._g = new Sb()),
      (this._d = new Sb()),
      (this._b = new Sb()),
      (this._q = new Sb()),
      (this._h = new Sb()),
      (this._k = new Sb()),
      (this._i = new Sb()),
      (this._l = new Sb());
  };
  s(yj, d, {
    a1: function() {
      return E(this._q._bc, this._b._bc);
    },
    d: function() {
      return E(this._d._bc, this._g._bc);
    },
    b: function() {
      return E(this._k._bc, this._h._bc);
    },
    c: function() {
      return E(this._l._bc, this._i._bc);
    },
    a2: function(B, Z, H, y) {
      (this._c = Z),
        (this._a = y),
        (this._p = B),
        (this._e = H),
        this._g.c0(),
        this._d.c0(),
        this._b.c0(),
        this._q.c0(),
        this._k.c0(),
        this._h.c0(),
        this._l.c0(),
        this._i.c0();
    },
  });
  var dq = function(V, N, S, m) {
    (this._k = 20),
      (this._r = 0.5),
      (this._d = V),
      (this._c = N),
      (this._j = S),
      (this._m = m),
      (this._i = V.xc('A') != b || V.xc('B') != b),
      (this._t = new wo(V, N, S, m)),
      (this._b = new Bm(V, this));
  };
  s(dq, d, {
    a6: function(h) {
      (this._k = h), this._t.a1(h), this._b.a3(h);
    },
    g1: function() {
      return this._k;
    },
    a9: function(c) {
      return this.c1(), c;
    },
    a5: function(K) {
      return this.a1(), K;
    },
    b3: function(S) {
      return this.c1(), (S = this.c4(S)), this._b.c(), S;
    },
    g2: function(q) {
      return this._b.g(), q;
    },
    e2: function(O) {
      (O = this.f(O)), this._b.f();
    },
    e1: function() {
      this._t.d(),
        this._n && this._d.xi(this._n),
        this.a1(),
        (this._d = b);
    },
    a1: function() {
      this._i &&
        (this._q &&
          (this._d.x1('A', this._q), (this._q = b)),
        this._p &&
          (this._d.x1('B', this._p), (this._p = b)),
        this._h && (this._d.xj(this._h), (this._h = b)),
        this._l && (this._d.xj(this._l), (this._l = b)));
    },
    c1: function() {
      if (this._i) {
        this._h || (this._h = this._d.xl()),
          this._l || (this._l = this._d.xl());
        for (var E = this._d.xf(); E.i1(); E.i2()) {
          var m = E.i8(),
            g = this._j.i1(m.a2()),
            c = this._j.i1(m.a3());
          if (g && !c) {
            var O = this._j.i1(m.a2());
            this._m.i4(O)
              ? this._l.i8(m, Kk.h(this._d, O))
              : this._l.i8(m, Kk.i(this._d, O));
          } else if (!g && c) {
            var X = this._j.i1(m.a3());
            this._m.i4(X)
              ? this._h.i8(m, Kk.i(this._d, X))
              : this._h.i8(m, Kk.h(this._d, X));
          } else
            g ||
              c ||
              (this._m.i4(m)
                ? (this._h.i8(m, Kk.i(this._d, m)),
                  this._l.i8(m, Kk.h(this._d, m)))
                : (this._h.i8(m, Kk.h(this._d, m)),
                  this._l.i8(m, Kk.i(this._d, m))));
        }
        (this._q = this._d.xc('A')),
          (this._p = this._d.xc('B')),
          this._d.x1('A', this._h),
          this._d.x1('B', this._l);
      }
    },
    c4: function(o) {
      (this._n = this._d.xk()),
        (this._a = this._d.xl()),
        (this._g = this._d.xl());
      for (
        var C = new Ur(),
          w = new Ur(),
          K = new Ur(),
          u = new Ur(),
          v = new Ur(),
          D = new Ur(),
          N = new Ur(),
          G = new Ur(),
          h = new Ur(),
          m = this._d.xk(),
          e = 0;
        e < o.length;
        e++
      )
        for (var U = 0, x = o[e].x1(); x.i1(); )
          m.i6(x.i9(), U), x.i2(), U++;
      for (
        var $ = function(I, F) {
            var $ = m.i3(I.a3()) - m.i3(F.a3());
            return 0 >= $ ? ($ >= 0 ? 0 : -1) : 1;
          },
          a = function(l, v) {
            var d = m.i3(l.a2()) - m.i3(v.a2());
            return 0 >= d ? (d >= 0 ? 0 : -1) : 1;
          },
          i = 0;
        i < o.length;
        i++
      )
        for (var I = o[i], g = I._b; g; g = g.a()) {
          var P = g.d(),
            L = 0;
          P.av($),
            P.au(a),
            C.af(),
            w.af(),
            K.af(),
            u.af(),
            v.af(),
            D.af(),
            N.af(),
            G.af(),
            h.af();
          for (var Z = P.ap(); Z.i1(); ) {
            var O = Z.i8(),
              d = this.b1(O);
            !d || d.d() || d.g()
              ? K.aa(O)
              : d.e()
              ? C.aa(O)
              : d.f()
              ? (w.aa(O), h.aa(O))
              : d.c() && (G.aa(O), h.aa(O)),
              Z.i2(),
              L++;
          }
          L = 0;
          for (var l = P.am(); l.i1(); ) {
            var n = l.i8(),
              s = this.a2(n);
            !s || s.c() || s.g()
              ? u.aa(n)
              : s.e()
              ? C.aa(n)
              : s.f()
              ? (w.aa(n), h.aa(n))
              : s.d() && (D.aa(n), h.aa(n)),
              l.i2(),
              L++;
          }
          var j = m.i3(P);
          if (!h.ar())
            for (
              var q = 0.1 / h.ay(), X = j - 0.4;
              !h.ar();
              X += q
            ) {
              var V = h.c3();
              if (V.a2() === P) {
                var R = this._d.xm();
                this._n.z1(R, V.a2()),
                  this._d.s7(R, 1, 1),
                  this._c.z1(R, this._c.i1(P)),
                  m.i6(R, X),
                  this._a.i8(V, this._d.gn(V)),
                  this._d.gt(V, ac._A),
                  this._d.xr(V, R, V.a3()),
                  I.ao(R, g);
              } else {
                var f = this._d.xm();
                this._n.z1(f, V.a3()),
                  this._d.s7(f, 1, 1),
                  this._c.z1(f, this._c.i1(P)),
                  m.i6(f, X),
                  this._g.i8(V, this._d.gk(V)),
                  this._d.gz(V, ac._A),
                  this._d.xr(V, V.a2(), f),
                  I.ao(f, g);
              }
            }
          if (!C.ar())
            for (
              var t = 0.1 / C.ay(), M = j + 0.1;
              !C.ar();
              M += t
            ) {
              var H = C.c3();
              if (H.a2() === P) {
                var r = this._d.xm();
                this._n.z1(r, H.a2()),
                  this._d.s7(r, 1, 1),
                  this._c.z1(r, this._c.i1(P)),
                  m.i6(r, M),
                  this._a.i8(H, this._d.gn(H)),
                  this._d.gt(H, ac._A),
                  this._d.xr(H, r, H.a3()),
                  (g = I.an(r, g));
              } else {
                var k = this._d.xm();
                this._n.z1(k, H.a3()),
                  this._d.s7(k, 1, 1),
                  this._c.z1(k, this._c.i1(P)),
                  m.i6(k, M),
                  this._g.i8(H, this._d.gk(H)),
                  this._d.gz(H, ac._A),
                  this._d.xr(H, H.a2(), k),
                  (g = I.an(k, g));
              }
            }
          var J = dq._z;
          this._b.a2(P) && (J = this._b.b2(P));
          var B =
            J._b.ay() +
            D.ay() +
            P.ao() +
            v.ay() +
            J._q.ay();
          if (B > 0)
            for (
              var S = this._d.g9(P) / 2,
                p = this._d.gj(P),
                T = this.a7(p, B),
                Y =
                  -0.5 * p +
                  this.a8(this._d.gj(P), B, T) +
                  T * (J._b.ay() + D.ay()),
                E = P.ap();
              E.i1();
              E.i2()
            ) {
              var b = E.i8();
              this.c2(b) ||
                this._j.i1(b.a2()) ||
                (this._d.g2(b).i8(new c(Y, S)), (Y += T));
            }
          var z = this._t.a3(P),
            F = 0,
            y = 0,
            Q = 0,
            A = 0;
          if (
            (z &&
              ((F = z._e.ay()),
              (y = z._c.ay()),
              (Q = z._b.ay()),
              (A = z._d.ay())),
            (B =
              J._g.ay() +
              F +
              G.ay() +
              P.ak() +
              N.ay() +
              y +
              J._d.ay()),
            B > 0)
          ) {
            for (
              var _ = this._d.gj(P),
                W = this.a7(_, B),
                wr = this.a8(_, B, W),
                Zq =
                  -0.5 * _ +
                  wr +
                  W * (J._g.ay() + F + G.ay()),
                Cs = -this._d.g9(P) / 2,
                le = P.am();
              le.i1();
              le.i2()
            ) {
              var Fi = le.i8();
              this.d1(Fi) ||
                this._j.i1(Fi.a3()) ||
                (this._d.g2(Fi).i9(new c(Zq, Cs)),
                (Zq += W));
            }
            if (z) {
              for (
                var Eh =
                    -0.5 * _ +
                    wr +
                    W *
                      (J._g.ay() + G.ay() + z._e.ay() - 1),
                  Rh = z._e.c1();
                Rh.i1();
                Rh.i2()
              ) {
                var Mg = Rh.i8();
                this._d.u1(Mg),
                  Mg.a2() !== P || this.c2(Mg)
                    ? this.d1(Mg) ||
                      (this._d
                        .g2(Rh.i8())
                        .i9(new c(Eh, Cs)),
                      (Eh -= W))
                    : (this._d
                        .g2(Rh.i8())
                        .i8(new c(Eh, Cs)),
                      (Eh -= W)),
                  this._d.h1(Mg);
              }
              Eh = 0.5 * _ - wr - W * (J._d.ay() + N.ay());
              for (var ln = z._c.c1(); ln.i1(); ln.i2()) {
                var eg = ln.i8();
                this._d.u1(eg),
                  eg.a2() !== P || this.c2(eg)
                    ? this.d1(eg) ||
                      (this._d
                        .g2(ln.i8())
                        .i9(new c(Eh, Cs)),
                      (Eh -= W))
                    : (this._d
                        .g2(ln.i8())
                        .i8(new c(Eh, Cs)),
                      (Eh -= W)),
                  this._d.h1(eg);
              }
            }
          }
          this._b.a2(P) &&
            this._b.a4(
              P,
              F + G.ay() + P.ak() + N.ay() + y,
              D.ay() + P.ao() + v.ay(),
              Q + w.ay(),
              A + C.ay()
            );
        }
      return this._d.xi(m), o;
    },
    a7: function(u, p) {
      return 1 >= p ? 0 : u / (p - 1 + 2 * this._r);
    },
    a8: function(k, D, K) {
      return 1 >= D ? 0.5 * k : 0.5 * (k - K * (D - 1));
    },
    f: function(J) {
      var $ = this.g1(),
        s = 0;
      for (this._f = this._d.xk(); s < J.length; s++)
        for (var u = J[s], N = u._b; N; ) {
          var A = N.d(),
            y = this._n.i1(A);
          if (y || this._t.b2(A)) N = N.a();
          else {
            var L = new $r(),
              q = new $r(),
              X = new $r(),
              _ = new $r(),
              o = new $r(),
              R = new $r(),
              C = new Ur(),
              m = new Ur(),
              f = new cr(L, q, X, _, o, R, C, m);
            this._f.z1(A, f), C.ab(A.am()), m.ab(A.ap());
            for (
              var T = N.b();
              T && this._n.i1(T.d()) === A;
              T = T.b()
            ) {
              var l = T.d(),
                Z = this.c3(l);
              Z.f()
                ? q.ac(l)
                : Z.c()
                ? _.ac(l)
                : Z.d() && R.ac(l);
            }
            for (
              var F = N.a();
              F && this._n.i1(F.d()) === A;
              F = F.a()
            ) {
              var i = F.d(),
                B = this.c3(i);
              B.e()
                ? L.aa(i)
                : B.c()
                ? X.aa(i)
                : B.d() && o.aa(i);
            }
            N = F;
          }
        }
      for (
        var I = this.d2(J), O = 0, g = 0;
        g < J.length;
        g++
      ) {
        var G = I[g];
        g > 0 &&
          (O += I[g - 1]._j + I[g - 1]._h + I[g - 1]._b),
          (O += G._g + G._f + G._a + G._d);
        for (var d = J[g].x1(); d.i1(); d.i2()) {
          var S = d.i9();
          this._d.s3(S, this._d.gi(S), this._d.gh(S) + O);
        }
        (G._c += O), (G._i += O);
      }
      for (var W = 0; W < J.length; W++)
        for (var z = J[W], P = z.x1(); P.i1(); P.i2()) {
          var h = P.i9();
          this._n.i1(h) && z.av(P);
        }
      for (
        var x = this,
          k = function(K, f) {
            return x.a3(K)
              ? x.a3(f)
                ? x._d.gi(K) >= x._d.gi(f)
                  ? -1
                  : 1
                : 1
              : x.a3(f)
              ? -1
              : x._d.gi(K) >= x._d.gi(f)
              ? 1
              : -1;
          },
          V = function(h, W) {
            return x.a3(h)
              ? x.a3(W)
                ? x._d.gi(h) >= x._d.gi(W)
                  ? 1
                  : -1
                : 1
              : x.a3(W)
              ? -1
              : x._d.gi(h) >= x._d.gi(W)
              ? -1
              : 1;
          },
          Q = 0;
        Q < J.length;
        Q++
      )
        for (var e = I[Q], v = J[Q].x1(); v.i1(); v.i2()) {
          var U = v.i9();
          if (!this._t.b2(U)) {
            var r = this._f.i1(U),
              w = r._d,
              p = r._a,
              M = r._b,
              n = r._h,
              K = r._f,
              t = r._c,
              E = r._g,
              j = r._e,
              H = 0,
              D = 0,
              a = 0,
              Y = 0,
              Re = U.ao(),
              he = U.ak(),
              Vk = this._d.gi(U),
              Ml = this._d.gh(U),
              lc = this._d.gj(U),
              Ie = this._d.g9(U),
              ol = this._t.a3(U),
              xl = dq._z;
            if (
              (this._b.a2(U) && (xl = this._b.b2(U)), ol)
            ) {
              if (
                ((H = ol._d.ay()),
                (D = ol._b.ay()),
                (a = ol._e.ay()),
                (Y = ol._c.ay()),
                H > 0)
              )
                for (
                  var Hm =
                      xl._h.ay() + w.ay() + H + xl._k.ay(),
                    Db = this.a7(Ie, Hm),
                    Of = this.a8(Ie, Hm, Db),
                    sf =
                      Ml +
                      Of +
                      Db * (xl._h.ay() + this.a4(w)),
                    ym = ol._d.c1();
                  ym.i1();
                  ym.i2()
                ) {
                  var Jh = ym.i8();
                  this._d.u1(Jh),
                    Jh.a2() === U
                      ? this.c2(Jh) ||
                        this._d.gx(Jh, new c(Vk + lc, sf))
                      : (this.d1(Jh),
                        this._d.gy(Jh, new c(Vk + lc, sf))),
                    (sf += Db),
                    this._d.h1(Jh);
                }
              if (D > 0)
                for (
                  var Yc =
                      xl._i.ay() + p.ay() + D + xl._l.ay(),
                    Kj = this.a7(Ie, Yc),
                    Qp = this.a8(Ie, Yc, Kj),
                    eh =
                      Ml +
                      Qp +
                      Kj * (xl._i.ay() + this.a4(p)),
                    Cm = ol._b.c1();
                  Cm.i1();
                  Cm.i2()
                ) {
                  var _l = Cm.i8();
                  this._d.u1(_l),
                    _l.a2() === U
                      ? this.c2(_l) ||
                        this._d.gx(_l, new c(Vk, eh))
                      : this.d1(_l) ||
                        this._d.gy(_l, new c(Vk, eh)),
                    (eh += Kj),
                    this._d.h1(_l);
                }
            }
            if (w.ay() > 0) {
              w.a1(k);
              for (
                var cf =
                    xl._h.ay() + w.ay() + H + xl._k.ay(),
                  Jb = this.a7(Ie, cf),
                  $f = this.a8(Ie, cf, Jb),
                  me = Ml + $f + Jb * xl._h.ay(),
                  To = !0;
                !w.ar();

              ) {
                var Yi = w.x4();
                if (this.a3(Yi)) {
                  To && ((To = !1), (me += Jb * H));
                  var to = Yi.ag(),
                    be = this._d.gd(to),
                    ng = be.at();
                  if (
                    (be.ac(new c(ng.x, e.b())), this.c2(to))
                  ) {
                    var Hf = this._a.i1(to);
                    be.ac(
                      new c(ng.x, Hf.y + this._d.g6(U))
                    ),
                      be.ac(
                        new c(
                          Hf.x + this._d.g5(U),
                          Hf.y + this._d.g6(U)
                        )
                      );
                  } else
                    be.ac(new c(ng.x, me)),
                      be.ac(new c(Vk + lc, me));
                  this._d.xr(to, U, to.a3()),
                    this._d.m1(to, be);
                } else {
                  var Qf = Yi.ae(),
                    Af = this._d.gd(Qf),
                    mp = Af.au();
                  if (
                    (Af.ae(new c(mp.x, e.a())), this.d1(Qf))
                  ) {
                    var Cr = this._g.i1(Qf);
                    Af.ae(
                      new c(mp.x, Cr.y + this._d.g6(U))
                    ),
                      Af.ae(
                        new c(
                          Cr.x + this._d.g5(U),
                          Cr.y + this._d.g6(U)
                        )
                      );
                  } else
                    Af.ae(new c(mp.x, me)),
                      Af.ae(new c(Vk + lc, me));
                  this._d.xr(Qf, Qf.a2(), U),
                    this._d.m1(Qf, Af);
                }
                this._d.x4(Yi), (me += Jb);
              }
            }
            if (p.ay() > 0) {
              p.a1(V);
              for (
                var wm =
                    xl._i.ay() + p.ay() + D + xl._l.ay(),
                  gk = this.a7(Ie, wm),
                  Bg = this.a8(Ie, wm, gk),
                  wn = Ml + Bg + gk * xl._i.ay(),
                  ys = !0;
                !p.ar();

              ) {
                var vi = p.x4();
                if (this.a3(vi)) {
                  ys && ((ys = !1), (wn += gk * D));
                  var Hg = vi.ag(),
                    ze = this._d.gd(Hg),
                    zc = ze.at();
                  if (
                    (ze.ac(new c(zc.x, e.b())), this.c2(Hg))
                  ) {
                    var hc = this._a.i1(Hg);
                    ze.ac(
                      new c(zc.x, hc.y + this._d.g6(U))
                    ),
                      ze.ac(
                        new c(
                          hc.x + this._d.g5(U),
                          hc.y + this._d.g6(U)
                        )
                      );
                  } else
                    ze.ac(new c(zc.x, wn)),
                      ze.ac(new c(Vk, wn));
                  this._d.xr(Hg, U, Hg.a3()),
                    this._d.m1(Hg, ze);
                } else {
                  var Vn = vi.ae(),
                    Fm = this._d.gd(Vn),
                    pf = Fm.au();
                  if (
                    (Fm.ae(new c(pf.x, e.a())), this.d1(Vn))
                  ) {
                    var Hc = this._g.i1(Vn);
                    Fm.ae(
                      new c(pf.x, Hc.y + this._d.g6(U))
                    ),
                      Fm.ae(
                        new c(
                          Hc.x + this._d.g5(U),
                          Hc.y + this._d.g6(U)
                        )
                      );
                  } else
                    Fm.ae(new c(pf.x, wn)),
                      Fm.ae(new c(Vk, wn));
                  this._d.xr(Vn, Vn.a2(), U),
                    this._d.m1(Vn, Fm);
                }
                this._d.x4(vi), (wn += gk);
              }
            }
            var Kb =
              xl._g.ay() +
              xl._d.ay() +
              he +
              n.ay() +
              M.ay() +
              a +
              Y;
            lc = this._d.gj(U);
            var cj = this.a7(lc, Kb),
              Xq = this.a8(lc, Kb, cj);
            Kb =
              xl._b.ay() +
              xl._q.ay() +
              Re +
              t.ay() +
              K.ay();
            var Bc = this.a7(lc, Kb),
              cp = this.a8(lc, Kb, Bc);
            if (n.ay() > 0)
              for (
                var Ki,
                  Zi = cj,
                  Eo = $,
                  fn =
                    this._d.gi(U) +
                    Xq +
                    Zi * (xl._g.ay() + n.ay() - 1),
                  Gl = this._d.gh(U),
                  Am = e._c - e._g - n.ay() * Eo;
                !n.ar();
                this._d.x4(Ki)
              ) {
                Ki = n.x4();
                var Ke = Ki.ag(),
                  ae = this._d.gd(Ke),
                  ln = ae.at();
                if (
                  (ae.ac(new c(ln.x, e.b())),
                  ae.ac(new c(ln.x, Am)),
                  this.c2(Ke))
                ) {
                  var Rg = this._a.i1(Ke);
                  ae.ac(new c(Rg.x + this._d.g5(U), Am)),
                    ae.ac(
                      new c(
                        Rg.x + this._d.g5(U),
                        Rg.y + this._d.g6(U)
                      )
                    );
                } else
                  ae.ac(new c(fn, Am)),
                    ae.ac(new c(fn, Gl)),
                    (fn -= Zi);
                (Am += Eo),
                  this._d.xr(Ke, U, Ke.a3()),
                  this._d.m1(Ke, ae);
              }
            if (M.ay() > 0)
              for (
                var Kk,
                  Xl = cj,
                  Ig = $,
                  wc =
                    this._d.gi(U) +
                    this._d.gj(U) -
                    Xq -
                    Xl * xl._d.ay(),
                  xc = this._d.gh(U),
                  Ug = e._c - e._g - Ig;
                !M.ar();
                this._d.x4(Kk)
              ) {
                Kk = M.x4();
                var tk = Kk.ag(),
                  dp = this._d.gd(tk),
                  qi = dp.at();
                if (
                  (dp.ac(new c(qi.x, e.b())),
                  dp.ac(new c(qi.x, Ug)),
                  this.c2(tk))
                ) {
                  var ob = this._a.i1(tk);
                  dp.ac(new c(ob.x + this._d.g5(U), Ug)),
                    dp.ac(
                      new c(
                        ob.x + this._d.g5(U),
                        ob.y + this._d.g6(U)
                      )
                    );
                } else
                  dp.ac(new c(wc, Ug)),
                    dp.ac(new c(wc, xc)),
                    (wc -= Xl);
                (Ug -= Ig),
                  this._d.xr(tk, U, tk.a3()),
                  this._d.m1(tk, dp);
              }
            if (t.ay() > 0)
              for (
                var On,
                  ui = Bc,
                  ti = $,
                  xh =
                    this._d.gi(U) +
                    cp +
                    ui * (xl._b.ay() + t.ay() - 1),
                  re = this._d.gh(U) + this._d.g9(U),
                  Xh = re + t.ay() * ti;
                !t.ar();
                this._d.x4(On)
              ) {
                On = t.x4();
                var Qq = On.ae(),
                  fm = this._d.gd(Qq),
                  Xf = fm.au();
                if (
                  (fm.ae(new c(Xf.x, e.a())),
                  fm.ae(new c(Xf.x, Xh)),
                  this.d1(Qq))
                ) {
                  var Zk = this._g.i1(Qq);
                  fm.ae(new c(Zk.x + this._d.g5(U), Xh)),
                    fm.ae(
                      new c(
                        Zk.x + this._d.g5(U),
                        Zk.y + this._d.g6(U)
                      )
                    );
                } else
                  fm.ae(new c(xh, Xh)),
                    fm.ae(new c(xh, re)),
                    (xh -= ui);
                (Xh -= ti),
                  this._d.xr(Qq, Qq.a2(), U),
                  this._d.m1(Qq, fm);
              }
            if (K.ay() > 0)
              for (
                var dm,
                  Ve = Bc,
                  kc = $,
                  eo =
                    this._d.gi(U) +
                    this._d.gj(U) -
                    cp -
                    Bc * xl._q.ay(),
                  Ab = this._d.gh(U) + this._d.g9(U),
                  kn = Ab + kc;
                !K.ar();
                this._d.x4(dm)
              ) {
                dm = K.x4();
                var Li = dm.ae(),
                  ap = this._d.gd(Li),
                  Sd = ap.au();
                if (
                  (ap.ae(new c(Sd.x, e.a())),
                  ap.ae(new c(Sd.x, kn)),
                  this.d1(Li))
                ) {
                  var al = this._g.i1(Li);
                  ap.ae(new c(al.x + this._d.g5(U), kn)),
                    ap.ae(
                      new c(
                        al.x + this._d.g5(U),
                        al.y + this._d.g6(U)
                      )
                    );
                } else
                  ap.ae(new c(eo, kn)),
                    ap.ae(new c(eo, Ab)),
                    (eo -= Ve);
                (kn += kc),
                  this._d.xr(Li, Li.a2(), U),
                  this._d.m1(Li, ap);
              }
            for (; !j.ar(); ) {
              var Qk = j.c3(),
                $n = this._d.gl(Qk);
              e.a() + 12 < $n.y &&
                this._d.g7(Qk).i4($n.x, e.a());
            }
            for (; !E.ar(); ) {
              var Hj = E.c3(),
                ms = this._d.gs(Hj);
              if (e.b() - 12 > ms.y) {
                var Pi = this._d.gf(Hj);
                Pi.ac(new c(ms.x, e.b())),
                  this._d.s6(Hj, Pi);
              }
            }
          }
        }
      for (var sm = 0; sm < J.length; sm++)
        for (var Uc = J[sm], sc = Uc._b; sc; sc = sc.a()) {
          var Je = sc.d(),
            bs = this._t.a3(Je);
          bs &&
            bs._a != b &&
            (this._d.x4(bs._a), Uc.aw(sc.b()));
        }
      return (
        this._d.xi(this._f),
        this._d.xj(this._a),
        this._d.xj(this._g),
        J
      );
    },
    c3: function(Q) {
      return this.a3(Q) ? this.b1(Q.ag()) : this.a2(Q.ae());
    },
    b1: function(s) {
      return this._h ? this._h.i1(s) : dq.s;
    },
    a2: function(M) {
      return this._l ? this._l.i1(M) : dq.u;
    },
    c2: function(v) {
      if (v) {
        var r = this.b1(v);
        return r != b && r.a();
      }
      return !1;
    },
    d1: function(v) {
      if (v) {
        var p = this.a2(v);
        return p != b && p.a();
      }
      return !1;
    },
    a3: function(i) {
      return 1 === i.ao();
    },
    b2: function(D) {
      return 1 === D.ak();
    },
    a4: function(G) {
      for (var u = 0, t = G._b; t; t = t.a())
        this.b2(t.d()) && u++;
      return u;
    },
    d2: function(p) {
      for (
        var e = this._k, f = gm.d(p.length + 1), O = 0;
        O < p.length;
        O++
      ) {
        var P = p[O],
          c = new en();
        (f[O] = c), (c._c = g), (c._i = S);
        for (var x = P.x1(); x.i1(); x.i2()) {
          var j = x.i9(),
            q = this._d.gb(j);
          (c._c = z(c._c, q.i2())),
            (c._i = E(c._i, q.i2() + q.i4()));
        }
      }
      this._b.a5(p, f);
      for (var b = 0; b < p.length; b++)
        for (var k = f[b], G = p[b].x1(); G.i1(); G.i2()) {
          var M = G.i9(),
            d = this._f.i1(M);
          d &&
            ((k._h = E(
              k._h,
              E(d._f.ay() * e, d._c.ay() * e)
            )),
            (k._f = E(
              k._f,
              E(d._b.ay() * e, d._h.ay() * e)
            )));
        }
      return f;
    },
  }),
    (dq.s = Kk.j(2)),
    (dq.u = Kk.j(1)),
    (dq._z = new yj());
  var Yb = function() {
    (this._af = 0), (this._b = 0);
  };
  s(Yb, d, {
    ib: function(b) {
      this._af = b;
    },
    ia: function(L, c, M) {
      this.a6(L, c, M), this.b2(!1);
      var p = this.g();
      if (this.o() && p > 0) {
        for (
          var z = this.r(), d = 0;
          20 > d && p > 0 && this.o();
          d++
        ) {
          this.b2(!0);
          var B = this.g();
          p > B && (this.a7(z), (p = B));
        }
        this.b3(z), this.b1();
      }
      return this.c();
    },
    a6: function(I, C, z) {
      (this._b = new Date().getTime()),
        (this._ac = I),
        (this._ah = C);
      var D = this;
      (this._p = function(o, N) {
        var w = D._n[o.al()] - D._n[N.al()];
        return w > 0 ? 1 : w >= 0 ? 0 : -1;
      }),
        (this._ad = gm.d(z));
      for (var x = 0; x < this._ad.length; x++)
        this._ad[x] = new $r();
      (this._ab = gm.a(this._ac.x0())),
        (this._f = gm.d(this._ac.x0())),
        (this._n = gm.a(this._ac.x0() + 1));
      var c = this._ab;
      (this._o = function(k, y) {
        if (!k && y) return 1;
        if (k && !y) return -1;
        if (!k && !y) return 0;
        var s = k,
          $ = y,
          n = s._h,
          C = s.a2(),
          Z = $.a2(),
          Q = c[C.al()] - c[Z.al()];
        if (0 === Q) {
          var _ = Yb.b(Kk.h(n, s), n.gn(s)),
            K = Yb.b(Kk.h(n, $), n.gn($)),
            q = _ - K;
          if (0 === q) {
            var i = c[s.a3().al()] - c[$.a3().al()];
            return 0 === i
              ? Yb.a(Kk.i(n, s), n.gk(s)) -
                  Yb.a(Kk.i(n, $), n.gk($))
              : i;
          }
          return q;
        }
        return Q;
      }),
        (this._l = function($, O) {
          if (!$ && O) return 1;
          if ($ && !O) return -1;
          if (!$ && !O) return 0;
          var L = $,
            k = O,
            C = L._h,
            x = L.a3(),
            r = k.a3(),
            Z = c[x.al()] - c[r.al()];
          if (0 === Z) {
            var v =
              Yb.a(Kk.i(C, L), C.gk(L)) -
              Yb.a(Kk.i(C, k), C.gk(k));
            if (0 === v) {
              var X = c[L.a2().al()] - c[k.a2().al()];
              return 0 === X
                ? Yb.b(Kk.h(C, L), C.gn(L)) -
                    Yb.b(Kk.h(C, k), C.gn(k))
                : X;
            }
            return v;
          }
          return Z;
        }),
        (this._z = function(J, A) {
          if (!J && A) return 1;
          if (J && !A) return -1;
          if (!J && !A) return 0;
          var w = J,
            n = A,
            $ = w._h;
          return (
            Yb.b(Kk.h($, w), $.gn(w)) -
            Yb.b(Kk.h($, n), $.gn(n))
          );
        }),
        (this._e = function(V, h) {
          if (!V && h) return 1;
          if (V && !h) return -1;
          if (!V && !h) return 0;
          var j = V,
            t = h,
            x = j._h;
          return (
            Yb.a(Kk.i(x, j), x.gk(j)) -
            Yb.a(Kk.i(x, t), x.gk(t))
          );
        }),
        this._ac.x2(this._e, this._z);
    },
    c: function() {
      (this._ah = b),
        (this._aa = b),
        (this._f = b),
        (this._n = b),
        (this._p = b),
        (this._o = b),
        (this._l = b),
        (this._ac = b);
      var Q = this._ad;
      return (this._ad = b), Q;
    },
    o: function() {
      var d = new Date().getTime() - this._b;
      return d <= this._af;
    },
    m: function() {
      for (
        var c = this,
          F = function(K, s) {
            return (
              X(c._n[K.a3().al()]) - X(c._n[s.a3().al()])
            );
          },
          d = this._ac.x9();
        d.i1();
        d.i2()
      ) {
        for (var B = d.i9().aw(); B.i1(); B.i2())
          this._n[B.i9().al()] = ac.j();
        d.i9().av(F);
      }
    },
    b2: function(a) {
      for (var B = 0; B < this._ad.length; B++)
        this._ad[B].af();
      if (a) {
        this.m();
        for (var Y = 0, T = this._ab.length; T > Y; Y++)
          this._ab[Y] = 0;
        this._ac.x2(b, this._z);
      }
      var Q = this._ac.xm();
      this._ah.i7(Q, 0);
      for (var P = this._ac.x9(); P.i1(); P.i2())
        0 === P.i9().ak() &&
          P.i9() !== Q &&
          this._ac.xo(Q, P.i9());
      var k = new ib(this);
      k.a6(!0),
        k.a9(this._ac, Q),
        this._ad[0].at(),
        this._ac.x4(Q),
        this.d();
    },
    a1: function() {
      this._ac.x2(this._o, this._l);
      for (var Y = 0, f = 1; f < this._ad.length; f++) {
        var A = this.a2(this._ad[f - 1], this._ad[f]);
        Y += A;
      }
      return Y;
    },
    a2: function(K, y) {
      var e = K.ah(),
        B = y.ah(),
        q = new Ie(),
        G = new Ie(),
        r = 0;
      for (
        this._aa = gm.d(this._ac.x0());
        e.i1() && B.i1();
        B.i2()
      )
        (r += this.a8(e.i6(), q, G, !0)),
          (r += this.a8(B.i6(), G, q, !1)),
          e.i2();
      for (; e.i1(); e.i2()) r += this.a8(e.i6(), q, G, !0);
      for (; B.i1(); B.i2()) r += this.a8(B.i6(), G, q, !1);
      return r;
    },
    a8: function(n, E, H, Y) {
      var c = 0,
        U = 0,
        B = 0;
      if (this._aa[n.al()])
        for (
          var e = this._aa[n.al()].a(), f = E._b;
          f !== e;
          f = f.a()
        ) {
          var g = f._c;
          g === n ? (c++, (B += U), E.aw(f)) : U++;
        }
      var $ = c * H.ay() + B;
      if (Y)
        for (var q = n.ag(); q; q = q.a8()) {
          var K = q.a3();
          this._ab[K.al()] >= this._ab[n.al()] &&
            (this._aa[K.al()] = H.ae(K));
        }
      else
        for (var v = n.ae(); v; v = v.a7()) {
          var J = v.a2();
          this._ab[J.al()] > this._ab[n.al()] &&
            (this._aa[J.al()] = H.ae(J));
        }
      return $;
    },
    g: function() {
      for (
        var m = this.r(), C = this.a1(), x = !0, f = 0;
        3 > f && this.o() && C > 0;

      ) {
        var E = this.k();
        C > E ? (this.a7(m), (C = E)) : f++, (x = !x);
      }
      if ((this.b3(m), this.b1(), C > 0)) {
        for (var c = 1, o = 0; 1 === c && C > 0; o++) {
          this.e(), this.i();
          var _ = this.a1();
          C > _ ? ((c = 1), this.a7(m)) : (c = -1), (C = _);
        }
        this.b3(m), this.b1();
      }
      return C;
    },
    e: function() {
      for (
        var W = this.l(),
          u = this.r(),
          w = gm.d(this._ac.x0()),
          K = this._ad.length - 1;
        K >= 0;
        K--
      )
        for (var S = this._ad[K].ah(); S.i1(); S.i2()) {
          var x = S.i6();
          if (1 === x.ak() && 1 === x.ao()) {
            var L = W.i1(x.ag());
            if (L && !w[L.al()])
              for (
                var t = this.a4(x, L),
                  Z = L.al(),
                  y = (w[Z] = gm.d(t + 1)),
                  E = y.length - 1;
                E >= 0;
                E--
              )
                y[E] = new Ie();
          }
        }
      for (var f = 0; f < this._ad.length; f++)
        for (var V = this._ad[f].ah(); V.i1(); V.i2()) {
          var P = V.i6();
          if (1 === P.ak() && 1 === P.ao()) {
            var i = W.i1(P.ag());
            if (i) {
              var c = i.al(),
                N = this.a4(P, i) - 1;
              w[c][N].ae(P.ae());
            }
          } else
            for (var p = P.ae(); p; p = p.a7()) {
              var Y = W.i1(p);
              Y && w[Y.al()][this.a4(P, Y) - 1].ae(p);
            }
        }
      for (var C = this._ac.x9(); C.i1(); C.i2()) {
        var G = C.i9();
        if (w[G.al()])
          for (var k = G.ag(); k; k = k.a8()) {
            var b = W.i1(k);
            if (b)
              for (var $ = w[b.al()]; $[0].ay() > 0; ) {
                for (var g, U = 0; ; ) {
                  g = $[U].am();
                  var v = g.a3();
                  if (1 !== v.ak() || 1 !== v.ao()) break;
                  U++;
                }
                var l = $[U].at().a3();
                U--, (l = g.a2()), (g = $[U].at());
                for (var D = g.a3(); U >= 0; )
                  if (
                    (u[l.al()] !== u[D.al()] &&
                      (this._ab[l.al()] = u[D.al()]),
                    (l = l.ae().a2()),
                    --U >= 0)
                  ) {
                    var Q = $[U].at();
                    D = Q.a3();
                  }
              }
          }
      }
      this.b1(), this._ac.xj(W);
    },
    i: function() {
      for (
        var i = this.f(),
          Y = this.r(),
          O = gm.d(this._ac.x0()),
          K = 0;
        K < this._ad.length;
        K++
      )
        for (var W = this._ad[K].ah(); W.i1(); W.i2()) {
          var h = W.i6();
          if (1 === h.ak() && 1 === h.ao()) {
            var n = i.i1(h.ae());
            if (n && !O[n.al()])
              for (
                var d = this.a4(n, h),
                  j = (O[n.al()] = gm.d(d + 1)),
                  x = j.length - 1;
                x >= 0;
                x--
              )
                j[x] = new Ie();
          }
        }
      for (var g = this._ad.length - 1; g >= 0; g--)
        for (var z = this._ad[g].ah(); z.i1(); z.i2()) {
          var m = z.i6();
          if (1 === m.ak() && 1 === m.ao()) {
            var t = i.i1(m.ae());
            t && O[t.al()][this.a4(t, m) - 1].ae(m.ag());
          } else
            for (var b = m.ag(); b; b = b.a8()) {
              var H = i.i1(b);
              H && O[H.al()][this.a4(H, m) - 1].ae(b);
            }
        }
      for (var A = this._ac.x9(); A.i1(); A.i2()) {
        var u = A.i9();
        if (O[u.al()])
          for (var o = u.ae(); o; o = o.a7()) {
            var U = i.i1(o);
            if (U)
              for (var J = O[U.al()]; J[0].ay() > 0; ) {
                for (var D, B = 0; ; ) {
                  D = J[B].am();
                  var k = D.a2();
                  if (1 !== k.ak() || 1 !== k.ao()) break;
                  B++;
                }
                var G = J[B].at().a2();
                B--, (G = D.a3()), (D = J[B].at());
                for (var s = D.a2(); B >= 0; )
                  if (
                    (Y[G.al()] !== Y[s.al()] &&
                      (this._ab[G.al()] = Y[s.al()]),
                    (G = G.ag().a3()),
                    --B >= 0)
                  ) {
                    var q = J[B].at();
                    s = q.a2();
                  }
              }
          }
      }
      this.b1(), this._ac.xj(i);
    },
    a4: function(O, g) {
      return this._ah.i2(O) - this._ah.i2(g);
    },
    l: function() {
      for (
        var U = fr.a6(gm.d(this._ac.xg())),
          u = this._ac.x9();
        u.i1();
        u.i2()
      ) {
        var g = u.i9();
        if (g.ao() > 1) {
          for (var G = 0, Q = g.ag(); Q; Q = Q.a8()) {
            var R = Q.a3();
            1 === R.ak() && 1 === R.ao() && G++;
          }
          if (G > 1)
            for (var v = g.ag(); v; v = v.a8()) {
              var n = v,
                A = n.a3();
              if (1 === A.ak() && 1 === A.ao()) {
                for (
                  ;
                  1 === A.ak() && 1 === A.ao();
                  A = n.a3()
                )
                  U.i8(n, g), (n = A.ag());
                U.i8(n, g);
              }
            }
        }
      }
      return U;
    },
    f: function() {
      for (
        var B = fr.a6(gm.d(this._ac.xg())),
          y = this._ac.x9();
        y.i1();
        y.i2()
      ) {
        var E = y.i9();
        if (E.ak() > 1) {
          for (var l = 0, I = E.ae(); I; I = I.a7()) {
            var G = I.a2();
            1 === G.ak() && 1 === G.ao() && l++;
          }
          if (l > 1)
            for (var O = E.ae(); O; O = O.a7()) {
              var e = O,
                A = e.a2();
              if (1 === A.ak() && 1 === A.ao()) {
                for (
                  ;
                  1 === A.ak() && 1 === A.ao();
                  A = e.a2()
                )
                  B.i8(e, E), (e = A.ae());
                B.i8(e, E);
              }
            }
        }
      }
      return B;
    },
    k: function() {
      for (var q = 1; q < this._ad.length; q++) {
        for (
          var p = this._ad[q], R = p.ah();
          R.i1();
          R.i2()
        ) {
          var K = R.i6();
          (this._n[K.al()] = this.a5(
            K,
            p.ay(),
            K.am(),
            this._ad[q - 1].ay()
          )),
            (this._n[K.al()] +=
              this._ab[K.al()] /
              (3 * this._ad[q - 1].ay()));
        }
        this.a3(p, this._p);
      }
      return this.a1();
    },
    a5: function(y, L, U, b) {
      var s = 0;
      if (0 === U.i7()) s = (b * this._ab[y.al()]) / L;
      else {
        for (; U.i1(); U.i2()) {
          var N = U.i8();
          s +=
            N.a2() === y
              ? this._ab[N.a3().al()]
              : this._ab[N.a2().al()];
        }
        s /= U.i7();
      }
      return s;
    },
    a7: function(X) {
      gm.f(this._ab, X, X.length);
    },
    b3: function(A) {
      gm.f(A, this._ab, A.length);
    },
    r: function() {
      var w = gm.a(this._ab.length);
      return this.a7(w), w;
    },
    d: function() {
      for (var J = 0; J < this._ad.length; J++)
        for (var z = 0, c = this._ad[J].ah(); c.i1(); )
          (this._ab[c.i6().al()] = z), c.i2(), z++;
    },
    b1: function() {
      for (var D = 0; D < this._ad.length; D++) {
        for (var C = this._ad[D], Q = C._b; Q; Q = Q.a()) {
          var L = Q.d();
          this._f[this._ab[L.al()]] = L;
        }
        for (var m = 0, l = C._b; l; )
          l.c(this._f[m]), (l = l.a()), m++;
      }
    },
    a3: function(I, W) {
      for (var $ = I.ah(), S = 0; S < I.ay(); $.i2())
        (this._f[S] = $.i6()), S++;
      gm.s(this._f, I.ay(), W);
      for (var R = 0, e = I._b; e; )
        e.c(this._f[R]),
          (this._ab[this._f[R].al()] = R),
          (e = e.a()),
          R++;
    },
  }),
    (Yb.b = function(P, D) {
      if (!P) return 0;
      var p = P.a() ? k(D.x) : 0,
        s = P.a() ? k(D.y) : 0;
      return P.e()
        ? 1e4 - s
        : P.f()
        ? -1e4 + s
        : P.c()
        ? -2e4 - p
        : p;
    }),
    (Yb.a = function(h, Y) {
      if (!h) return 0;
      var X = h.a() ? k(Y.x) : 0,
        w = h.a() ? k(Y.y) : 0;
      return h.e()
        ? 1e4 + w
        : h.f()
        ? -1e4 - w
        : h.d()
        ? -2e4 - X
        : X;
    });
  var Am = function() {
    Am.superClass.constructor.call(this),
      (this._i6 = 0),
      (this._i3 = 2147483647),
      (this._i0 = 60),
      (this._iz = 20),
      (this._i2 = 20),
      (this._i4 = 20),
      this.i5(!1),
      (this._i7 = new $j()),
      (this._i1 = new Yb()),
      (this._i8 = new pq());
  };
  s(Am, Np, {
    j2: function() {
      return this._i2;
    },
    i4: function() {
      return !0;
    },
    i3: function(o) {
      (this._i6 = new Date().getTime()), vl.d(o, !1);
      var k = o.xk(),
        s = o.xk(),
        D = o.xl(),
        O = new Ur(),
        r = new dq(o, k, s, D);
      r.a6(this.j2()),
        this._i8.i3(this._iz),
        this._i8.i6(this._i0),
        this._i8.i4(this._i2),
        this._i8.i5(this._i4),
        this._i8.i2(s);
      for (
        var N = this._i7.i1(o, k, O), $ = O.c1();
        $.i1();
        $.i2()
      ) {
        var K = $.i8();
        D.i7(K, !0);
        var S = o.gn(K);
        o.gt(K, o.gk(K)), o.gz(K, S);
      }
      this.a2(o, k, s), (N = r.a9(N));
      var P = this.j1(o, k, N);
      (P = r.a5(P)),
        (P = r.b3(P)),
        this._i8.i1(o, P, k),
        (P = r.g2(P)),
        r.e2(P),
        this.b(o, s),
        this.w(o),
        this.a1(o, O),
        r.e1(),
        o.xj(D),
        o.xi(s),
        o.xi(k);
    },
    j1: function(q, R, T) {
      if (this._i1 instanceof Yb) {
        var $ = this._i1,
          n = new Date().getTime() - this._i6;
        $.ib(this._i3 - n);
      }
      var V = this._i1.ia(q, R, T);
      return V;
    },
    a1: function(d, r) {
      for (var q = r.c1(); q.i1(); q.i2()) {
        var k = q.i8(),
          I = d.gs(k),
          R = d.gl(k);
        d.x3(k);
        var Q = d.gp(k);
        d.s5(k, Q.a()), d.gy(k, I), d.gx(k, R);
      }
    },
    b: function(y, J) {
      for (var g = y.x9(); g.i1(); g.i2()) {
        var x = g.i9(),
          A = J.i1(x);
        if (A && !y.xp(A)) {
          for (
            var a = x
              .am()
              .i8()
              .a2();
            J.i1(a);
            a = x
              .am()
              .i8()
              .a2()
          )
            x = a;
          y.u1(A);
          for (
            var o = x.ae(), r = new Ie();
            J.i1(o.a3());
            o = o.a3().ag()
          ) {
            var k = y.gs(o);
            r.aa(k), r.az(y.gf(o));
            var F = y.gl(o);
            F.equals(k) || r.aa(F);
          }
          var T = y.gs(o);
          r.aa(T), r.az(y.gf(o));
          var d = y.gl(o);
          d.equals(T) || r.aa(d), y.m1(A, r);
        }
      }
      for (var u = y.x9(); u.i1(); u.i2())
        J.i1(u.i9()) && y.x4(u.i9());
    },
    w: function(g) {
      for (var t = g.xf(); t.i1(); t.i2()) {
        var G = t.i8(),
          C = g.g2(G);
        if (C.i1() > 0) {
          var B = new I(),
            l = g.gc(G),
            y = l.c(),
            p = y.i6();
          y.i2();
          var U = p.x,
            h = p.y;
          if (y.i1()) {
            var D = y.i6(),
              q = D.x,
              A = D.y;
            for (y.i2(); y.i1(); y.i2()) {
              var x = y.i6(),
                w = x.x,
                M = x.y,
                d = ((U - w) * (A - M)) / (h - M) + w;
              V(d - q) >= 1 && (B.add(D), (U = q), (h = A)),
                (D = x),
                (q = w),
                (A = M);
            }
          }
          B.size() < C.i1() && g.s5(G, new L(B));
        }
      }
    },
    a2: function(Z, V, k) {
      var J = Z.g8().c1();
      for (J.i5(); J.i1(); J.i3()) {
        var w = J.i8().a2(),
          S = J.i8().a3(),
          W = V.i2(S) - V.i2(w);
        if (W > 1) {
          for (var z, m, L = w; W > 1; W--)
            (z = Z.xm()),
              Z.s7(z, 1, 1),
              Z.s4(z, ac._A),
              (m = Z.xo(L, z)),
              L === w && Z.gt(m, Z.gn(J.i8())),
              V.i7(z, V.i2(L) + 1),
              k.z1(z, J.i8()),
              (L = z);
          (m = Z.xo(z, S)),
            Z.gz(m, Z.gk(J.i8())),
            Z.h1(J.i8());
        }
      }
    },
  });
  var wo = function(A, W, O, t) {
    (this._i = 20),
      (this._j = A),
      (this._g = W),
      (this._a = O),
      (this._h = t);
  };
  s(wo, d, {
    a1: function(e) {
      this._i = e;
    },
    b2: function(A) {
      return this._e ? this._e.i4(A) : !1;
    },
    a3: function(R) {
      return this._f ? this._f.i1(R) : b;
    },
    d: function() {
      this._j.xi(this._f), this._j.xi(this._e);
    },
  });
  var en = function() {
    (this._c = 0),
      (this._i = 0),
      (this._g = 0),
      (this._j = 0),
      (this._f = 0),
      (this._h = 0),
      (this._d = 0),
      (this._e = 0),
      (this._a = 0),
      (this._b = 0);
  };
  s(en, d, {
    a: function() {
      return this._c - this._g - this._f - this._a;
    },
    b: function() {
      return this._i + this._j + this._h + this._b;
    },
  });
  var Zi = function() {
    (this._d = new Ur()),
      (this._b = new Ur()),
      (this._c = new Ur()),
      (this._e = new Ur());
  };
  s(Zi, d, {});
  var cr = function(c, G, C, z, g, d, H, x) {
    (this._d = c),
      (this._a = G),
      (this._b = C),
      (this._h = z),
      (this._f = g),
      (this._c = d),
      (this._e = H),
      (this._g = x);
  };
  s(cr, d, {});
  var gm = {
    a: function(p, P) {
      for (var s = [], z = 0; p > z; z++) s[z] = P || 0;
      return s;
    },
    b: function(o) {
      for (var x = [], E = 0; o > E; E++) x[E] = !1;
      return x;
    },
    c: function(U, X) {
      if (U instanceof c)
        return U.x < X.x
          ? -1
          : U.x > X.x
          ? 1
          : U.y < X.y
          ? -1
          : U.y <= X.y
          ? 0
          : 1;
      if (U instanceof O)
        return X.width > U.width
          ? -1
          : X.width < U.width
          ? 1
          : X.height > U.height
          ? -1
          : X.height >= U.height
          ? 0
          : 1;
      if (U instanceof P)
        return U.x < X.x
          ? -1
          : U.x > X.x
          ? 1
          : U.y < X.y
          ? -1
          : U.y > X.y
          ? 1
          : X.width > U.width
          ? -1
          : X.width < U.width
          ? 1
          : X.height > U.height
          ? -1
          : X.height >= U.height
          ? 0
          : 1;
      throw '';
    },
    d: function(f) {
      for (var G = [], $ = 0; f > $; $++) G[$] = b;
      return G;
    },
    e: function(F, P) {
      for (var t = [], U = 0; F > U; U++) t[U] = gm.a(P);
      return t;
    },
    f: function(j, h, k) {
      for (var q = 0; k > q; q++) h[q] = j[q];
    },
    s: function(L, S, I) {
      var O = [];
      gm.f(L, O, S), O.sort(I), gm.f(O, L, S);
    },
    n: function(I, j) {
      return I - j;
    },
  };
  (C.layout.AutoLayout = function(J, d) {
    J instanceof C.DataModel
      ? (this.dm = J)
      : (this.gv = J),
      (this.options = d || {});
  }),
    s(M + 'AutoLayout', d, {
      _repulsion: 1,
      _type: b,
      _offsetX: b,
      _offsetY: b,
      _xf: 0,
      _yf: 0,
      _animate: !0,
      _frames: b,
      _interval: b,
      _duration: b,
      _easing: b,
      isAnimate: function() {
        return this._animate;
      },
      setAnimate: function(T) {
        this._animate = T;
      },
      getFrames: function() {
        return this._frames;
      },
      setFrames: function(H) {
        this._frames = H;
      },
      getInterval: function() {
        return this._interval;
      },
      setInterval: function(f) {
        this._interval = f;
      },
      getDuration: function() {
        return this._duration;
      },
      setDuration: function($) {
        this._duration = $;
      },
      getEasing: function() {
        return this._easing;
      },
      setEasing: function(l) {
        this._easing = l;
      },
      getRepulsion: function() {
        return this._repulsion;
      },
      setRepulsion: function(S) {
        this._repulsion = S;
      },
      getOffsetX: function() {
        return this._offsetX;
      },
      setOffsetX: function(T) {
        this._offsetX = T;
      },
      getOffsetY: function() {
        return this._offsetY;
      },
      setOffsetY: function(R) {
        this._offsetY = R;
      },
      getNodeSize: function($) {
        var C,
          g = this.gv;
        $.getChildrenRect &&
          ((C = $.getChildrenRect()), C && H.grow(C, 15)),
          !C &&
            g &&
            g.getDataUIBounds &&
            (C = g.getDataUIBounds($)),
          C || ((C = $.getRect()), H.grow(C, 15));
        var j, M, T;
        return (
          (j = $.s('autolayout.gap')),
          (M = $.s('autolayout.hgap')),
          (T = $.s('autolayout.vgap')),
          j !== o || M !== o || T !== o
            ? ((M = (M || 0) + (j || 0)),
              (T = (T || 0) + (j || 0)))
            : ((j = this.options.gap || 0),
              (M = j + (this.options.hgap || 0)),
              (T = j + (this.options.vgap || 0))),
          M && ((C.x -= M), (C.width = C.width + 2 * M)),
          T && ((C.y -= T), (C.height = C.height + 2 * T)),
          C
        );
      },
      isLayoutable: function(p) {
        var l = this.gv;
        return l && !l.isVisible(p)
          ? !1
          : p.s('layoutable') === !1
          ? !1
          : p instanceof i
          ? p.getSourceAgent() &&
            p.getTargetAgent() &&
            !p.isLooped()
            ? !0
            : !1
          : p instanceof R
          ? p.getHost()
            ? !1
            : l
            ? l.isMovable(p)
            : !0
          : !1;
      },
      getType: function() {
        return this._type;
      },
      getLayoutDatas: function() {
        var U,
          c = this,
          Z = c.gv,
          v = c.dm,
          n = !1,
          V = new I();
        return (
          Z
            ? Z.sm().size() > 1
              ? ((n = !0), (U = Z.sm().getSelection()))
              : (U = Z.dm().getDatas())
            : v.sm().size() > 1
            ? ((n = !0), (U = v.sm().getSelection()))
            : (U = v.getDatas()),
          (c._xf = c._yf = g),
          U.each(function(z) {
            if (
              c.isLayoutable(z) &&
              (V.add(z), n && z instanceof R)
            ) {
              var C = z.p();
              C.x < c._xf && (c._xf = C.x),
                C.y < c._yf && (c._yf = C.y);
            }
          }),
          n ||
            ((c._xf = c._offsetX == b ? 50 : c._offsetX),
            (c._yf = c._offsetY == b ? 50 : c._offsetY)),
          V
        );
      },
      getLayoutResult: function(g) {
        var e = {};
        return this.layoutImpl(g, b, e), e;
      },
      layout: function(S, m) {
        return this.layoutImpl(S, m);
      },
      layoutImpl: function(x, j, m) {
        this._type = x;
        var v = this,
          t = {},
          r = U(x),
          T = v.getLayoutDatas(),
          w = new Zr(v, T);
        if (!r) return !1;
        T = w.p();
        var I = new ig(v, T, x);
        try {
          r.i2(I);
        } catch (X) {
          return w.r(), j && j(), !1;
        }
        var L,
          f,
          F,
          R,
          i = I._a;
        for (L in i)
          (f = i[L]),
            (R = I.g4(f)),
            (t[L] = { x: R.x + v._xf, y: R.y + v._yf });
        if (x === a || x === _ || x === A) {
          var d,
            D = $(x),
            u = g,
            C = g,
            Q = 2 * v._repulsion;
          for (L in t)
            (f = i[L]),
              (F = t[L]),
              (R = D.tf(F)),
              (F.x = R.x),
              (F.y = R.y),
              x === a || x === _
                ? ((d = R.x - I.g9(f) / Q),
                  u > d && (u = d),
                  (d = R.y - I.gj(f) / Q),
                  C > d && (C = d))
                : ((d = R.x - I.gj(f) / Q),
                  u > d && (u = d),
                  (d = R.y - I.g9(f) / Q),
                  C > d && (C = d));
          for (L in t)
            (f = i[L]),
              (F = t[L]),
              (F.x = F.x - u + v._xf),
              (F.y = F.y - C + v._yf);
        }
        if (!m && v._animate) {
          var M = v.gv,
            S = {};
          for (L in t) S[L] = i[L].node.p();
          M && (M._autoLayouting = 1),
            H.startAnim({
              duration: v._duration,
              frames: v._frames,
              interval: v._interval,
              easing: v._easing,
              finishFunc: function() {
                w.r(),
                  j && j(),
                  M &&
                    (delete M._autoLayouting,
                    M.onAutoLayoutEnded());
              },
              action: function(T) {
                for (L in t) {
                  var C = S[L],
                    A = t[L];
                  i[L].node.p(
                    C.x + (A.x - C.x) * T,
                    C.y + (A.y - C.y) * T
                  );
                }
              },
            });
        } else {
          for (L in t)
            (f = i[L]),
              (F = t[L]),
              m ? (m[f.node.getId()] = F) : f.node.p(F);
          w.r(), j && j();
        }
        return !0;
      },
    });
})(
  'undefined' != typeof global
    ? global
    : 'undefined' != typeof self
    ? self
    : 'undefined' != typeof window
    ? window
    : (0, eval)('this'),
  Object
);
