getApp(), require("../../utils/util.js"), require("../../wxParse/wxParse.js");

Page({
    data: {
        logs: [],
        searchList: {},
        keywords: "",
        isFromSearch: !0,
        page: "0",
        callbackcount: "",
        scrollTop: 0,
        scrollHeight: 0,
        searchResult: {}
    },
    searchOpacity: function() {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    bindDownLoad: function(e) {
        console.log(e);
        var t = this, a = this.data.keywords, s = this.data.page, o = this.data.searchResult;
        wx.request({
            url: "https://fairso.com/Search/searchWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                keywords: a,
                page: s
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                t.setData({
                    keywords: wx.getStorageSync("keywords"),
                    searchList: o.concat(e.data.exhibition),
                    page: e.data.page,
                    searchResult: wx.getStorageSync("exhibitionPage").concat(e.data.exhibition)
                }), wx.setStorageSync("page", e.data.page);
            }
        });
    },
    onPullDownRefresh: function() {
        console.log(3), this.onLoad();
    },
    details: function(e) {
        wx.setStorageSync("exhibitionId", e.currentTarget.dataset.id), wx.navigateTo({
            url: "../details/details"
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
        this.authorization(), wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    keywords: wx.getStorageSync("keywords"),
                    searchList: wx.getStorageSync("exhibitionPage"),
                    page: wx.getStorageSync("page"),
                    searchResult: wx.getStorageSync("exhibitionPage"),
                    scrollHeight: t.windowHeight
                });
            }
        });
    }
});