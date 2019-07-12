getApp(), require("../../utils/util.js"), require("../../wxParse/wxParse.js");

Page({
    data: {
        logs: [],
        searchInput: "",
        newStatus: !1,
        page: "0",
        items: [],
        config: {
            tipsshow1: "none",
            tipsshow2: "none"
        },
        result: ""
    },
    goSearchPage: function(e) {
        var t = this, a = t.data.searchInput, s = wx.getStorageSync("user").openid, o = t.data.page;
        console.log(a), console.log(s), console.log(o);
        wx.request({
            url: getApp().globalData.publicUrl + "/Search/searchWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: s,
                keywords: a,
                page: o
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e.data), 1 == e.data.status ? (wx.navigateTo({
                    url: "../search_list/search_list"
                }), wx.setStorageSync("keywords", e.data.keywords), wx.setStorageSync("exhibitionPage", e.data.exhibition), 
                wx.setStorageSync("page", e.data.page)) : 6 == e.data.status && t.setData({
                    config: {
                        tipsshow1: "",
                        tipsshow2: ""
                    },
                    result: e.data.message
                });
            }
        });
    },
    goSearchlogPage: function(e) {
        var t = this, a = e.target.dataset.search, s = wx.getStorageSync("user").openid, o = t.data.page;
        console.log(a), console.log(s), console.log(o);
        wx.request({
            url: getApp().globalData.publicUrl + "/Search/searchWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: s,
                keywords: a,
                page: o
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e.data), 1 == e.data.status ? (wx.navigateTo({
                    url: "../search_list/search_list"
                }), wx.setStorageSync("keywords", e.data.keywords), wx.setStorageSync("exhibitionPage", e.data.exhibition), 
                wx.setStorageSync("page", e.data.page)) : 6 == e.data.status && t.setData({
                    config: {
                        tipsshow1: "",
                        tipsshow2: ""
                    },
                    result: e.data.message
                });
            }
        });
    },
    clearSearch: function(e) {
        var t = this, a = wx.getStorageSync("user").openid;
        wx.request({
            url: getApp().globalData.publicUrl + "/Search/delSearchWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: a
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e.data), t.setData({
                    newStatus: !0,
                    items: []
                });
            }
        });
    },
    testExhibition: function(e) {
        this.setData({
            searchInput: e.detail.value
        });
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
    onLoad: function() {
        var e = this;
        this.authorization();
        var t = wx.getStorageSync("user").openid;
        wx.request({
            url: getApp().globalData.publicUrl + "/Search/logSearchWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: t
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data), e.setData({
                    items: t.data.log
                });
            }
        });
    }
});