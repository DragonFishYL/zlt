var t = require("../../utils/util.js"), a = getApp();

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
    trages: function(t) {
        console.log(t), this.setData({
            hidden: !0,
            industry: !1,
            opacity: "0",
            white: !1,
            area: !0,
            blue: !0,
            tragesDispay: !1,
            timeDisplay: !0,
            areaDisplay: !0
        });
    },
    time: function(t) {
        console.log(t), this.setData({
            hidden: !0,
            industry: !1,
            opacity: "0",
            blue: !1,
            white: !0,
            area: !0,
            timeDisplay: !1,
            areaDisplay: !0,
            tragesDispay: !0
        });
    },
    close: function(t) {
        this.setData({
            hidden: !1,
            industry: !0,
            areaDisplay: !0,
            timeDisplay: !0,
            tragesDispay: !0,
            opacity: "1"
        });
    },
    area: function(t) {
        console.log(t), this.setData({
            hidden: !0,
            industry: !1,
            opacity: "0",
            area: !1,
            white: !0,
            blue: !0,
            areaDisplay: !1,
            timeDisplay: !0,
            tragesDispay: !0
        });
    },
    filterExhibition: function(t) {
        var a = this;
        console.log(t);
        var e = t.target.dataset.link, i = t.target.dataset.num;
        1 == i ? a.setData({
            data1: !1
        }) : 2 == i ? a.setData({
            data2: !1
        }) : 3 == i ? a.setData({
            data3: !1
        }) : a.setData({
            data1: !0,
            data2: !0,
            data3: !0
        }), console.log("0");
        wx.request({
            url: getApp().globalData.publicUrl + "/Search/searchSeekWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                page: "0",
                link: e
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                1 == e.data.status ? (a.setData({
                    exhibitionList: e.data.exhibition,
                    twoList: e.data.trages.info,
                    timeList: e.data.yearList.info,
                    areaList: e.data.areaList.bigList,
                    hidden: !1,
                    industry: !0,
                    areaDisplay: !0,
                    timeDisplay: !0,
                    tragesDispay: !0,
                    opacity: "1",
                    bindtolower: !1,
                    filterpage: e.data.page
                }), wx.setStorageSync("link", t.target.dataset.link)) : 4 == e.data.status && (console.log("暂无数据"), 
                a.setData({
                    exhibitionList: "",
                    twoList: e.data.trages.info,
                    timeList: e.data.yearList.info,
                    areaList: e.data.areaList.bigList,
                    hidden: !1,
                    industry: !0,
                    areaDisplay: !0,
                    timeDisplay: !0,
                    tragesDispay: !0,
                    opacity: "1"
                }));
            }
        });
    },
    goPage: function(a) {
        var e = a.currentTarget.dataset.url;
        t.goPage(e);
    },
    homeGetUserInfo: function(e) {
        t.autoLogin(a, e, this, "../index/index");
    },
    exhibitonGetUserInfo: function(e) {
        t.autoLogin(a, e, this, "../exhibition/exhibition");
    },
    tripGetUserInfo: function(n) {
        t.autoLogin(e, n, this, "../trip/trip");
    },
    myshareGetUserInfo: function(e) {
        t.autoLogin(a, e, this, "../person2/person2");
    },
    details: function(t) {
        wx.setStorageSync("exhibitionId", t.currentTarget.dataset.id), wx.redirectTo({
            url: "../details/details"
        });
    },
    fiflterDownLoad: function(t) {
        console.log(2);
        var a = this, e = this.data.exhibitionList, i = wx.getStorageSync("link"), s = a.data.filterpage;
        wx.showLoading({
            title: "玩命加载中"
        });
        wx.request({
            url: getApp().globalData.publicUrl + "/Search/searchSeekWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                page: s,
                link: i
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    exhibitionList: e.concat(t.data.exhibition),
                    filterpage: t.data.page
                }), wx.hideLoading();
            }
        });
    },
    bindDownLoad: function(t) {
        console.log("1");
        var a = this;
        wx.showLoading({
            title: "玩命加载中"
        });
        var e = this.data.page, i = this.data.exhibitionList;
        wx.request({
            url: getApp().globalData.publicUrl + "/Search/searchSeekWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                page: e
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data), a.setData({
                    exhibitionList: i.concat(t.data.exhibition),
                    page: t.data.page
                }), wx.hideLoading();
            }
        });
    },
    topLoad: function(t) {
        this.setData({
            list: [],
            scrollTop: 0
        });
    },
    authorization: function() {
        var t = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(a) {
                        t.setData({
                            userInfo: a.userInfo
                        });
                    }
                });
            }
        });
    },
    scrolleight: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    scrollHeight: a.windowHeight
                });
            }
        });
    },
    onLoad: function() {
        var t = this;
        this.authorization(), this.scrolleight(), wx.showLoading({
            title: "加载中",
            mask: !0
        });
        var a = this.data.page;
        wx.request({
            url: getApp().globalData.publicUrl + "/Search/searchSeekWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                page: a
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(a) {
                console.log(a.data), t.setData({
                    exhibitionList: a.data.exhibition,
                    page: a.data.page,
                    twoList: a.data.trages.info,
                    timeList: a.data.yearList.info,
                    areaList: a.data.areaList.bigList
                }), wx.hideLoading();
            }
        });
    }
});