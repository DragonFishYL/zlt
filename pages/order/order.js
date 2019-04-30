function e(e, t, o) {
    return t in e ? Object.defineProperty(e, t, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = o, e;
}

var t, o = require("../../utils/field.js"), o = require("../../utils/util.js"), n = 60;

getApp();

Page({
    data: (t = {
        userInfo: {},
        mobile: "",
        testMobile: !1,
        code: "",
        testCode: !1,
        isSending: !1,
        isSendingTxt: "获取验证码",
        height: "0px",
        userLogin: !1,
        canClick: !0,
        canSubmit: !0,
        exhibition: {},
        zid: "",
        total: "",
        e_area: "",
        company: "",
        _num: "3",
        userName: "",
        userPhone: "",
        gtype: "",
        dtype: "",
        discount: "",
        price: ""
    }, e(t, "total", ""), e(t, "name", ""), e(t, "area", ""), e(t, "areadanwei", ""), 
    e(t, "pricedanwei", ""), e(t, "glength", ""), e(t, "gwidth", ""), e(t, "config1", ""), 
    e(t, "config11", ""), e(t, "config12", ""), e(t, "config2", ""), e(t, "config8", ""), 
    e(t, "config9", ""), e(t, "config10", ""), e(t, "config7", ""), e(t, "config6", ""), 
    e(t, "config5", ""), e(t, "config3", ""), e(t, "config4", ""), e(t, "config14", ""), 
    e(t, "config13", ""), e(t, "openfare", ""), e(t, "payway", "1"), e(t, "sex", [ "30%", "40%", "50%" ]), 
    e(t, "selectSex", "请选择"), e(t, "pindex", 0), e(t, "merchantDispay", !0), e(t, "authName", ""), 
    e(t, "busiName", ""), e(t, "busiPhone", ""), e(t, "authEmail", ""), e(t, "busiAddress", ""), 
    e(t, "einfos", ""), e(t, "title", ""), e(t, "phone", ""), e(t, "newtotal", ""), 
    t),
    goIndexPage: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.reLaunch({
            url: t
        });
    },
    goPage: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.redirectTo({
            url: t
        });
    },
    goMyshare: function(e) {
        var t = e.currentTarget.dataset.url;
        o.goPage(t);
    },
    clickName: function(e) {
        console.log(e.target.dataset.num), "3" == e.target.dataset.num ? this.setData({
            _num: e.target.dataset.num,
            payway: "1",
            merchantDispay: !0
        }) : "5" == e.target.dataset.num && this.setData({
            _num: e.target.dataset.num,
            payway: "2",
            merchantDispay: !1
        });
    },
    testCode: function(e) {
        e.detail.value.length >= 4 && this.setData({
            code: e.detail.value,
            testCode: !0
        });
    },
    getValidCode: function(e) {
        console.log(e);
        var t = this, o = this.data.mobile, i = wx.getStorageSync("user").openid;
        if (console.log(o), /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(o)) {
            if (t.data.canClick) {
                this.setData({
                    canClick: !1
                }), console.log(o), console.log(1);
                wx.request({
                    url: "https://fairso.com/Common/zltLoginSmsWX",
                    data: {
                        business_no: "ZhanLeTaoWeChat",
                        openid: i,
                        phone: o
                    },
                    method: "POST",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        console.log(e.data), 1 == e.data.status ? wx.showToast({
                            title: "验证码发送成功",
                            icon: "none",
                            duration: 2e3,
                            success: function() {
                                var e = setInterval(function() {
                                    if (0 == --n) return clearInterval(e), t.setData({
                                        isSendingTxt: "获取验证码",
                                        isSending: !1,
                                        canClick: !0
                                    }), void (n = 60);
                                    t.setData({
                                        isSendingTxt: n + "s",
                                        isSending: !0
                                    });
                                }, 1e3);
                            }
                        }) : 6 == e.data.status && wx.showToast({
                            title: "发送次数过多，一个自然日内不超过10条",
                            icon: "none",
                            duration: 2e3,
                            success: function() {}
                        });
                    },
                    fail: function(e) {
                        console.log(e);
                    }
                });
            }
        } else wx.showModal({
            title: "提示",
            content: "请输入正确的11位手机号",
            showCancel: !1,
            confirmText: "确定",
            success: function(e) {
                e.confirm && console.log("用户点击确定");
            }
        });
    },
    testMobileLength: function(e) {
        e.detail.value.length >= 11 ? this.setData({
            testMobile: !0,
            mobile: e.detail.value
        }) : this.setData({
            testMobile: !1
        });
    },
    testForm: function(e) {
        var t = !0;
        return "" == e.phone ? (wx.showToast({
            title: "请填写手机号",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1) : "" == e.code ? (wx.showToast({
            title: "请填写验证码",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1) : "" == e.authName ? (wx.showToast({
            title: "请填写真实姓名",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1) : "" == e.busiName ? (wx.showToast({
            title: "请填写企业名称",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1) : "" == e.busiPhone ? (wx.showToast({
            title: "请填写企业电话",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1) : "" == e.authEmail ? (wx.showToast({
            title: "请填写企业邮箱",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1) : "" == e.busiAddress ? (wx.showToast({
            title: "请填写企业地址",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1) : "" == e.einfos ? (wx.showToast({
            title: "请填写参展产品",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1) : "" == e.title ? (wx.showToast({
            title: "请填写展位编号",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1) : "" == e.authEmail || /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(e.authEmail) ? t : (wx.showToast({
            title: "请输入正确的邮箱格式",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1);
    },
    formSubmit: function(e) {
        console.log(e);
        var t = this, o = !0, n = e.detail.value;
        return console.log(n), "" == n.phone || /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(n.phone) ? this.testForm(n) ? "" == n.busiPhone || /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.exec(n.busiPhone) ? void (t.data.canSubmit && (t.setData({
            canSubmit: !1
        }), wx.login({
            success: function(e) {
                if (e.code) {
                    var i = t.data.zid, a = t.data.payway;
                    console.log(a);
                    var s = t.data._num;
                    console.log(s);
                    var c = n.phone, r = n.code, u = n.authName, d = n.authEmail, g = t.data.number, h = n.busiName, w = n.busiPhone, l = n.busiAddress, x = n.einfos, f = n.title, S = wx.getStorageSync("inviteOpenId");
                    S = S || "";
                    var y = wx.getStorageSync("source");
                    y = y || "";
                    var p = wx.getStorageSync("user").openid, T = wx.getStorageSync("exhibition").total;
                    if ("1" == a) {
                        console.log(33);
                        var b = "https://fairso.com/Member/createOrderWX", m = {
                            business_no: "ZhanLeTaoWeChat",
                            openid: p,
                            payway: a,
                            gid: i,
                            gtype: "3",
                            phone: c,
                            code: r,
                            authName: u,
                            authPhone: c,
                            authEmail: d,
                            busiName: h,
                            busiPhone: w,
                            busiAddress: l,
                            einfos: x,
                            title: f,
                            gnums: g,
                            fopenid: S,
                            source: y,
                            price: T
                        };
                    }
                    wx.request({
                        url: b,
                        data: m,
                        method: "POST",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        success: function(e) {
                            if (console.log(e.data), 1 == e.data.status) wx.setStorageSync("orderId", e.data.orderid), 
                            wx.showToast({
                                title: "提交订单成功",
                                icon: "none",
                                duration: 2e3,
                                success: function() {
                                    setTimeout(function() {
                                        wx.navigateTo({
                                            url: "../orderDetail/orderDetail"
                                        });
                                    }, 2e3);
                                }
                            }); else {
                                if (9 == e.data.status) return wx.showToast({
                                    title: "验证码错误",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        return o = !1, !1;
                                    }
                                }), o = !1, !1;
                                if (12 == e.data.status) return wx.showToast({
                                    title: "验证码已失效",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        return o = !1, !1;
                                    }
                                }), o = !1, !1;
                                if (7 == e.data.status) return wx.showToast({
                                    title: "不存在验证码",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        return o = !1, !1;
                                    }
                                }), o = !1, !1;
                                if (11 == e.data.status) return wx.showToast({
                                    title: "不存在手机号",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        return o = !1, !1;
                                    }
                                }), o = !1, !1;
                                15 == e.data.status ? (wx.setStorageSync("orderId", e.data.orderid), wx.showToast({
                                    title: "已经存在订单,请前往处理",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        setTimeout(function() {
                                            wx.redirectTo({
                                                url: "../orderDetail/orderDetail"
                                            });
                                        }, 2e3);
                                    }
                                })) : 14 == e.data.status ? (wx.setStorageSync("orderId", e.data.orderid), wx.showToast({
                                    title: "创建订单失败",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        setTimeout(function() {
                                            wx.redirectTo({
                                                url: "../order/order"
                                            });
                                        }, 2e3);
                                    }
                                })) : 4 == e.data.status && (wx.setStorageSync("orderId", e.data.orderid), wx.showToast({
                                    title: "您有未支付的订单,请先处理未支付的订单",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        setTimeout(function() {
                                            wx.redirectTo({
                                                url: "../orderDetail/orderDetail"
                                            });
                                        }, 2e3);
                                    }
                                }));
                            }
                        },
                        fail: function() {
                            t.setData({
                                canSubmit: !0
                            });
                        }
                    });
                }
            }
        }))) : (wx.showToast({
            title: "请输入正确的电话格式",
            icon: "none",
            duration: 2e3,
            success: function() {
                return o = !1, !1;
            }
        }), o = !1, !1) : void t.setData({
            canSubmit: !0
        }) : (wx.showToast({
            title: "请输入正确的手机格式",
            icon: "none",
            duration: 2e3,
            success: function() {
                return o = !1, !1;
            }
        }), o = !1, !1);
    },
    authorization: function() {
        var e = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(t) {
                        e.setData({
                            userInfo: t.userInfo
                        });
                    }
                });
            }
        });
    },
    sexPickerChange: function(e) {
        var t = this.data.sex[e.detail.value];
        this.setData({
            selectSex: t
        });
    },
    exhibitionShow: function() {
        var t, o = this, n = wx.getStorageSync("exhibition").showType;
        console.log(n), wx.setNavigationBarTitle({
            title: wx.getStorageSync("exhibition").company
        }), o.setData((t = {
            exhibition: n,
            total: wx.getStorageSync("exhibition").total,
            e_area: wx.getStorageSync("exhibition").e_area,
            zid: wx.getStorageSync("exhibition").eid,
            company: wx.getStorageSync("exhibition").company,
            gtype: wx.getStorageSync("exhibition").showType.gtype
        }, e(t, "total", wx.getStorageSync("exhibition").showType.total), e(t, "price", wx.getStorageSync("exhibition").showType.newtotal), 
        e(t, "dtype", wx.getStorageSync("exhibition").showType.dtype), e(t, "discount", wx.getStorageSync("exhibition").showType.discount), 
        e(t, "name", wx.getStorageSync("exhibition").showType.name), e(t, "area", wx.getStorageSync("exhibition").showType.area), 
        e(t, "newtotal", wx.getStorageSync("exhibition").total), e(t, "glength", wx.getStorageSync("exhibition").showType.glength), 
        e(t, "gwidth", wx.getStorageSync("exhibition").showType.gwidth), e(t, "config1", wx.getStorageSync("exhibition").showType.config1), 
        e(t, "config11", wx.getStorageSync("exhibition").showType.config11), e(t, "config12", wx.getStorageSync("exhibition").showType.config12), 
        e(t, "config2", wx.getStorageSync("exhibition").showType.config2), e(t, "config8", wx.getStorageSync("exhibition").showType.config8), 
        e(t, "config9", wx.getStorageSync("exhibition").showType.config9), e(t, "config10", wx.getStorageSync("exhibition").showType.config10), 
        e(t, "config7", wx.getStorageSync("exhibition").showType.config7), e(t, "config6", wx.getStorageSync("exhibition").showType.config6), 
        e(t, "config5", wx.getStorageSync("exhibition").showType.config5), e(t, "config3", wx.getStorageSync("exhibition").showType.config3), 
        e(t, "config4", wx.getStorageSync("exhibition").showType.config4), e(t, "config14", wx.getStorageSync("exhibition").showType.config14), 
        e(t, "config13", wx.getStorageSync("exhibition").showType.config13), e(t, "areadanwei", wx.getStorageSync("exhibition").showType.areadanwei), 
        e(t, "pricedanwei", wx.getStorageSync("exhibition").showType.pricedanwei), e(t, "openfare", wx.getStorageSync("exhibition").showType.openfare), 
        t));
    },
    onLoad: function() {
        var e = this;
        this.authorization();
        var t = wx.getStorageSync("user").openid, o = wx.getStorageSync("exhibition").eid;
        console.log(o), console.log(t);
        wx.request({
            url: "https://fairso.com//Member/positionDetailNext",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: t,
                id: o
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.info(t.data), 8 == t.data.status ? wx.showToast({
                    title: "已存在未支付订单,请去支付或取消在创建订单",
                    icon: "none",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateTo({
                                url: "../details/details"
                            });
                        }, 2e3);
                    }
                }) : 1 == t.data.status ? e.setData({
                    authName: t.data.data.pname,
                    einfos: t.data.data.einfos,
                    title: t.data.data.title,
                    busiName: t.data.data.ename,
                    busiPhone: t.data.data.etel,
                    authEmail: t.data.data.pemail,
                    busiAddress: t.data.data.eaddress,
                    phone: t.data.data.ptel
                }) : 7 == t.data.status && wx.showToast({
                    title: "展会招展时间已结束",
                    icon: "none",
                    duration: 2e3,
                    success: function() {
                        setTimeout(function() {
                            wx.navigateTo({
                                url: "../details/details"
                            });
                        }, 2e3);
                    }
                }), e.exhibitionShow();
            }
        });
    }
});