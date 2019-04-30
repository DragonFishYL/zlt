var t = require("../../utils/util.js"), e = getApp();

Page({
    data: {
        logs: [],
        exhibitionList: {},
        isFromSearch: !0,
        page: "0",
        filterpage: "0",
        callbackcount: "",
        searchLoading: !1,
        searchLoadingComplete: !1,
        scrollTop: 0,
        scrollHeight: 0,
        searchResult: {},
        hidden: !1,
        industry: !0,
        opacity: "1",
        blue: !0,
        white: !0,
        area: !0,
        timeDisplay: !0,
        tragesDispay: !0,
        areaDisplay: !0,
        twoList: {},
        list: {},
        targesListInfo: {},
        timeList: {},
        areaList: {},
        data1: !0,
        data2: !0,
        data3: !0,
        bindtolower: !0
    },
    filterExhibition: function(t) {},
    goPage: function(e) {
        var i = e.currentTarget.dataset.url;
        t.goPage(i);
    },
    homeGetUserInfo: function(i) {
        t.autoLogin(e, i, this, "../index/index");
    },
    exhibitonGetUserInfo: function(i) {
        t.autoLogin(e, i, this, "../exhibition/exhibition");
    },
    myshareGetUserInfo: function(i) {
        t.autoLogin(e, i, this, "../person/person");
    },
    details: function(t) {
        wx.navigateTo({
            url: "../details/details"
        });
    },
    ticket: function(t) {
        wx.setStorageSync("uname", t.currentTarget.dataset.uname), wx.setStorageSync("exhibitionId", t.currentTarget.dataset.id), 
        wx.navigateTo({
            url: "../ticket/ticket"
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
        var e = wx.getStorageSync("user").openid;
        wx.request({
            url: "https://fairso.com/Exhibition/exhibitionExaminListWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: e
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                console.log(e.data), t.setData({
                    exhibitionList: e.data.exhibition
                });
            }
        });
    }
});