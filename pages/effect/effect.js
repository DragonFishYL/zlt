var t = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        logs: [],
        exhibitionList: {},
        isFromSearch: !0,
        page: "0",
        filterpage: "0",
        callbackcount: "",
        opacity: "1"
    },
    goPage: function(e) {
        var n = e.currentTarget.dataset.url;
        t.goPage(n);
    },
    homeGetUserInfo: function(n) {
        t.autoLogin(e, n, this, "../index/index");
    },
    exhibitonGetUserInfo: function(n) {
        t.autoLogin(e, n, this, "../exhibition/exhibition");
    },
    myshareGetUserInfo: function(n) {
        t.autoLogin(e, n, this, "../person/person");
    },
    myshare: function(t) {
        wx.setStorageSync("uname", t.currentTarget.dataset.uname), wx.setStorageSync("exhibitionId", t.currentTarget.dataset.id), 
        wx.navigateTo({
            url: "../myshare/myshare"
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
        var t = this;
        this.authorization();
        var e = !0, n = wx.getStorageSync("user").openid;
        wx.request({
            url: getApp().globalData.publicUrl + "/Exhibition/myInfuluenceEnjoyWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: n
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(n) {
                if (console.log(n.data), 1 != n.data.status) return wx.showToast({
                    title: "数据请求错误，请稍后",
                    icon: "none",
                    duration: 2e3,
                    success: function() {
                        return e = !1, !1;
                    }
                }), e = !1, !1;
                t.setData({
                    exhibitionList: n.data.exhibition
                });
            }
        });
    }
});