var e = getApp();

require("../../wxParse/wxParse.js");

Page({
    data: {
        motto: "非速搜",
        form: {
            title: "非速搜展会网",
            clickNum: "客服电话:010-56264887",
            person: "当前没有客服在线，请留言"
        },
        userInfo: "",
        hasUserInfo: !1,
        userLogin: !1,
        canSubmit: !0,
        canIUse: wx.canIUse("button.open-type.getUserInfo")
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
    testForm: function(e) {
        var t = !0;
        if (console.log(e), "" == e.message) return wx.showToast({
            title: "请填写留言内容",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1;
        if ("" == e.phone) return wx.showToast({
            title: "请填写手机号",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1;
        if ("" != e.email) {
            if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(e.email)) return wx.showToast({
                title: "请输入正确的邮箱格式",
                icon: "none",
                duration: 2e3,
                success: function() {
                    return t = !1, !1;
                }
            }), t = !1, !1;
        } else if ("" != e.phone && !/^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/.test(e.phone)) return wx.showToast({
            title: "请输入正确的11位手机号码",
            icon: "none",
            duration: 2e3,
            success: function() {
                return t = !1, !1;
            }
        }), t = !1, !1;
        return t;
    },
    formSubmit: function(e) {
        console.log(e);
        var t = this, n = e.detail.value;
        n.photo = t.data.photo, n.sex = "请选择" != t.data.selectSex ? t.data.selectSex : "", 
        n.country = "请选择" != t.data.selectCountry ? t.data.selectCountry : "", n.province = "请选择" != t.data.selectProvince ? t.data.selectProvince : "", 
        n.city = "请选择" != t.data.selectCity ? t.data.selectCity : "", this.testForm(n) ? t.data.canSubmit && (t.setData({
            canSubmit: !1
        }), wx.login({
            success: function(e) {
                if (e.code) {
                    var o = n.message, s = n.name, a = n.phone, i = n.email, c = n.address, r = wx.getStorageSync("user").openid;
                    wx.request({
                        url: getApp().globalData.publicUrl + "/Exhibition/leaveMessageWX",
                        data: {
                            business_no: "ZhanLeTaoWeChat",
                            openid: r,
                            message: o,
                            name: s,
                            phone: a,
                            email: i,
                            address: c
                        },
                        method: "POST",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        success: function(e) {
                            console.log(e.data), wx.showToast({
                                title: "留言成功",
                                icon: "none",
                                duration: 2e3,
                                success: function() {
                                    setTimeout(function() {
                                        wx.redirectTo({
                                            url: "../details/details"
                                        });
                                    }, 2e3);
                                }
                            });
                        },
                        fail: function() {
                            t.setData({
                                canSubmit: !0
                            });
                        }
                    });
                }
            }
        })) : t.setData({
            canSubmit: !0
        });
    },
    onLoad: function() {
        this.authorization(), this.setData({});
    },
    getUserInfo: function(t) {
        console.log(t), e.globalData.userInfo = t.detail.userInfo, this.setData({
            userInfo: t.detail.userInfo,
            hasUserInfo: !0
        });
    }
});