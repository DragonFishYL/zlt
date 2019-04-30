getApp(), require("../../utils/util.js"), require("../../wxParse/wxParse.js");

Page({
    data: {
        logs: [],
        searchList: {},
        keywords: "",
        isFromSearch: !0,
        page: "0",
        callbackcount: "",
        searchLoading: !1,
        searchLoadingComplete: !1,
        scrollTop: 0,
        scrollHeight: 0,
        searchResult: {},
        exhibition: {},
        bindtolower: !0,
        num1: "0",
        num: "0",
        management_good: !1,
        check: !0,
        items: {}
    },
    details: function(e) {
        wx.setStorageSync("exhibitionId", e.currentTarget.dataset.id), wx.redirectTo({
            url: "../details/details"
        });
    },
    delateDisplay: function() {
        this.setData({
            num1: "1",
            bindtolower: !1,
            management_good: !0,
            num: "1"
        });
    },
    cancelDelate: function() {
        console.log(1), this.setData({
            num1: "0",
            bindtolower: !0,
            management_good: !1,
            num: "0"
        });
    },
    formSubmit: function(e) {
        console.log(e);
        for (var o = e.detail.value.choose, t = "", n = 0; n < o.length; n++) t += o[n] + ",";
        console.log(t);
        var i = wx.getStorageSync("user").openid;
        console.log(i), wx.showModal({
            content: "确认删除收藏展会吗？",
            cancelColor: "#0076FF",
            confirmColor: "#0076FF",
            success: function(e) {
                if (e.confirm) {
                    console.log("用户点击确定");
                    wx.request({
                        url: "https://fairso.com/Exhibition/collectDeleteWX",
                        data: {
                            business_no: "ZhanLeTaoWeChat",
                            openid: i,
                            collectids: t
                        },
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "POST",
                        success: function(e) {
                            wx.redirectTo({
                                url: "../collect/collect"
                            });
                        }
                    });
                }
            }
        });
    },
    onPullDownRefresh: function() {
        console.log(3), this.onLoad();
    },
    authorization: function() {
        var e = this;
        wx.getSetting({
            success: function(o) {
                o.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(o) {
                        e.setData({
                            userInfo: o.userInfo
                        });
                    }
                });
            }
        });
    },
    onLoad: function() {
        var e = this, o = wx.getStorageSync("user").openid;
        console.log(o);
        wx.request({
            url: "https://fairso.com//Exhibition/exhibitionCollectListWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: o
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(o) {
                console.info(o.data), e.setData({
                    exhibition: o.data.exhibition,
                    bindtolower: !0,
                    num1: e.data.num1,
                    items: o.data.exhibition
                });
            }
        }), this.authorization();
    }
});