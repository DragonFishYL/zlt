var t = require("../../utils/field.js"), t = require("../../utils/util.js"), e = 60;

getApp();

Page({
    data: {
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
        color: "#339AFE",
        bname: "",
        choose: [ "企业", "个人" ],
        person: !0,
        company: !0
    },
    goIndexPage: function(t) {
        var e = t.currentTarget.dataset.url;
        wx.reLaunch({
            url: e
        });
    },
    goPage: function(t) {
        var e = t.currentTarget.dataset.url;
        wx.redirectTo({
            url: e
        });
    },
    goMyshare: function(e) {
        var n = e.currentTarget.dataset.url;
        t.goPage(n);
    },
    radioChange: function(t) {
        "企业" == t.detail.value ? this.setData({
            company: !1
        }) : "个人" == t.detail.value && this.setData({
            company: !0
        });
    },
    testCode: function(t) {
        t.detail.value.length >= 4 && this.setData({
            code: t.detail.value,
            testCode: !0
        });
    },
    getValidCode: function(t) {
        var n = this, o = this.data.mobile, s = wx.getStorageSync("user").openid;
        if (console.log(o), /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(o)) {
            if (n.data.canClick) {
                this.setData({
                    canClick: !1
                }), console.log(o);
                var i = "https://fairso.com/Common/zltLoginSmsWX?business_no=ZhanLeTaoWeChat&openid=" + s + "&phone=" + o;
                wx.request({
                    url: i,
                    success: function(t) {
                        console.log(t.data), 1 == t.data.status ? wx.showToast({
                            title: "验证码发送成功",
                            icon: "none",
                            duration: 2e3,
                            success: function() {
                                var t = setInterval(function() {
                                    if (0 == --e) return clearInterval(t), n.setData({
                                        isSendingTxt: "获取验证码",
                                        isSending: !1,
                                        canClick: !0
                                    }), void (e = 60);
                                    n.setData({
                                        isSendingTxt: e + "s",
                                        isSending: !0
                                    });
                                }, 1e3);
                            }
                        }) : 5 == t.data.status && wx.showToast({
                            title: "发送次数过多，一个自然日内不超过10条",
                            icon: "none",
                            duration: 2e3,
                            success: function() {
                                return status = !1, !1;
                            }
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    }
                });
            }
        } else wx.showModal({
            title: "提示",
            content: "请输入正确的11位手机号",
            showCancel: !1,
            confirmText: "确定",
            success: function(t) {
                t.confirm && console.log("用户点击确定");
            }
        });
    },
    testMobileLength: function(t) {
        t.detail.value.length >= 11 ? this.setData({
            testMobile: !0,
            mobile: t.detail.value
        }) : this.setData({
            testMobile: !1
        });
    },
    testForm: function(t) {
        var e = !0;
        if ("" == t.phone) return wx.showToast({
            title: "请填写手机号",
            icon: "none",
            duration: 2e3,
            success: function() {
                return e = !1, !1;
            }
        }), e = !1, !1;
        if ("" == t.code) return wx.showToast({
            title: "请填写验证码",
            icon: "none",
            duration: 2e3,
            success: function() {
                return e = !1, !1;
            }
        }), e = !1, !1;
        if ("" == t.company) return wx.showToast({
            title: "请选择身份性质",
            icon: "none",
            duration: 2e3,
            success: function() {
                return e = !1, !1;
            }
        }), e = !1, !1;
        if ("" == t.uname) return wx.showToast({
            title: "请填写联系人",
            icon: "none",
            duration: 2e3,
            success: function() {
                return e = !1, !1;
            }
        }), e = !1, !1;
        if ("" == t.cause) return wx.showToast({
            title: "请选择参展原因",
            icon: "none",
            duration: 2e3,
            success: function() {
                return e = !1, !1;
            }
        }), e = !1, !1;
        if ("企业" == t.company) {
            if ("" == t.bname) return wx.showToast({
                title: "请填写企业名称",
                icon: "none",
                duration: 2e3,
                success: function() {
                    return e = !1, !1;
                }
            }), e = !1, !1;
            if ("" == t.job) return wx.showToast({
                title: "请选择职位",
                icon: "none",
                duration: 2e3,
                success: function() {
                    return e = !1, !1;
                }
            }), e = !1, !1;
        }
        return e;
    },
    formSubmit: function(t) {
        var e = wx.getStorageSync("inviteOpenId");
        e = e || "";
        var n = wx.getStorageSync("source");
        n = n || "", console.log(t);
        var o = this, s = !0, i = t.detail.value;
        console.log(i), this.testForm(i) ? o.data.canSubmit && (o.setData({
            canSubmit: !1
        }), wx.login({
            success: function(t) {
                if (t.code) {
                    var a = wx.getStorageSync("exhibitionId"), u = i.phone, c = i.code, r = i.bname, l = i.uname, d = i.job, f = i.cause, h = wx.getStorageSync("user").openid;
                    if ("企业" == i.company) g = {
                        business_no: "ZhanLeTaoWeChat",
                        openid: h,
                        id: a,
                        phone: u,
                        code: c,
                        uname: l,
                        bname: r,
                        job: d,
                        cause: f,
                        fopenid: e,
                        source: n
                    }; else var g = {
                        business_no: "ZhanLeTaoWeChat",
                        openid: h,
                        id: a,
                        phone: u,
                        code: c,
                        uname: l,
                        cause: f,
                        fopenid: e,
                        source: n
                    };
                    wx.request({
                        url: "https://fairso.com/Exhibition/customerSignUpWX",
                        data: g,
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function(t) {
                            if (console.log(t.data), 1 == t.data.status) wx.setStorageSync("uname", l), wx.showToast({
                                title: "报名成功",
                                icon: "none",
                                duration: 2e3,
                                success: function() {
                                    setTimeout(function() {
                                        wx.redirectTo({
                                            url: "../ticket/ticket"
                                        });
                                    }, 2e3);
                                }
                            }); else {
                                if (9 == t.data.status) return wx.showToast({
                                    title: "验证码错误",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        return s = !1, !1;
                                    }
                                }), s = !1, !1;
                                if (8 == t.data.status) return wx.showToast({
                                    title: "验证码已失效",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        return s = !1, !1;
                                    }
                                }), s = !1, !1;
                                if (7 == t.data.status) return wx.showToast({
                                    title: "不存在验证码",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        return s = !1, !1;
                                    }
                                }), s = !1, !1;
                                if (6 == t.data.status) return wx.showToast({
                                    title: "不存在手机号",
                                    icon: "none",
                                    duration: 2e3,
                                    success: function() {
                                        return s = !1, !1;
                                    }
                                }), s = !1, !1;
                            }
                        },
                        fail: function() {
                            o.setData({
                                canSubmit: !0
                            });
                        }
                    });
                }
            }
        })) : o.setData({
            canSubmit: !0
        });
    },
    authorization: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        t.setData({
                            userInfo: e.userInfo
                        });
                    }
                });
            }
        });
    },
    onLoad: function() {
        this.authorization();
    }
});