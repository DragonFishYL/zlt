var e = getApp(), t = require("../../utils/util.js"), n = (require("../../wxParse/wxParse.js"), 
void 0), o = void 0;

Page({
    data: {
        banner: {},
        userInfo: null,
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        canShowTab: !1,
        eventStatus: null,
        canShow: "",
        newStatus: !1,
        indicatorDots: !1,
        vertical: !1,
        autoplay: !0,
        circular: !0,
        interval: 5e3,
        duration: 400,
        previousMargin: 0,
        nextMargin: 0,
        items: [],
        event: {},
        exhibitionNew: {},
        searchLoading: !1,
        openId: "",
        status: "",
        inviteOpenId: "",
        exhibitionId: "",
        source: "",
        zlttype: ""
    },
    immediatelySignUp: function() {
        wx.navigateTo({
            url: "../index/index"
        });
    },
    searchOpacity: function() {
        wx.navigateTo({
            url: "../search/search"
        });
    },
    goPage: function(e) {
        var n = e.currentTarget.dataset.url;
        t.goPage(n);
    },
    details: function(e) {
        wx.setStorageSync("exhibitionId", e.currentTarget.dataset.id), wx.navigateTo({
            url: "../details/details"
        });
    },
    authorization: function() {
        var t = this;
        wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && (e.globalData.userInfo ? (t.setData({
                    userInfo: e.globalData.userInfo,
                    hasUserInfo: !0
                }), t.getData()) : t.data.canIUse && (e.userInfoReadyCallback = function(e) {
                    t.setData({
                        userInfo: e.userInfo,
                        hasUserInfo: !0
                    }), t.getData(), wx.setStorageSync("userInfo", e.userInfo);
                }));
            }
        });
    },
    getScene: function(e) {
        var t = this;
        return n = new Promise(function(n, o) {
            wx.request({
                url: "https://fairso.com/Exhibition/exhibitionEnjoySceneWX ",
                data: {
                    business_no: "ZhanLeTaoWeChat",
                    scene: e
                },
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(e) {
                    var n = e.data.parames;
                    return console.log(n), t.setData({
                        inviteOpenId: n.fopenid,
                        exhibitionId: n.id,
                        source: n.source,
                        zlttype: n.zlttyepe
                    }, function() {
                        n.fopenid && n.fopenid;
                        wx.setStorageSync("inviteOpenId", n.fopenid), wx.setStorageSync("exhibitionId", n.id), 
                        wx.setStorageSync("source", n.source), wx.setStorageSync("zlttype", n.zlttyepe), 
                        t.getVote();
                    }), Promise.resolve(e.data.data);
                }
            });
        });
    },
    onShow: function() {
        var e = this, n = t.getCurrentPage().options, o = n.fopenid, a = decodeURIComponent(n.scene);
        if (console.log("scene场景值:" + a), "undefined" !== a) {
            console.log(11);
            this.getScene(a);
        } else "undefined" !== o ? e.getVote() : n.fopenid ? e.setData({
            inviteOpenId: n.fopenid,
            exhibitionId: n.id,
            source: n.source,
            zlttype: n.zlttype
        }, function() {
            n.fopenid && n.fopenid;
            wx.setStorageSync("inviteOpenId", n.fopenid), wx.setStorageSync("exhibitionId", n.id), 
            wx.setStorageSync("source", n.source), wx.setStorageSync("zlttype", n.zlttype), 
            e.getVote();
        }) : e.getVote();
    },
    getData: function() {
        var e = this, t = e.data.inviteOpenId;
        t = t || "";
        var n = e.data.source;
        n = n || "3";
        var o = e.data.zlttype;
        o = o || "3";
        var a = e.data.exhibitionId;
        a = a || "", wx.login({
            success: function(i) {
                var s = i.code;
                wx.request({
                    url: "https://fairso.com/Common/zltLoginWX",
                    data: {
                        business_no: "ZhanLeTaoWeChat",
                        code: s,
                        type: "1",
                        fopenid: t,
                        source: n,
                        zlttype: o,
                        id: a
                    },
                    method: "POST",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        console.log(t.data), wx.setStorageSync("user", {
                            openid: t.data.openid,
                            status: t.data.status
                        }), e.setData({
                            openId: t.data.openid
                        }), e.loginWx();
                    }
                });
            }
        });
    },
    loginWx: function() {
        var e = this, t = e.data.userInfo.nickName, n = e.data.userInfo.avatarUrl, o = e.data.userInfo.gender, a = e.data.openId;
        wx.request({
            url: "https://fairso.com/Common/zltLoginWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: a,
                type: "2",
                nickname: t,
                headimgurl: n,
                gender: o
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var t = e.data.headimgurl;
                wx.setStorageSync("avatarUrl", t);
            }
        });
    },
    getVote: function() {
        var e = this;
        o = new Promise(function(t, n) {
            wx.login({
                success: function(t) {
                    wx.showLoading({
                        title: "加载中",
                        mask: !0
                    }), wx.request({
                        url: "https://fairso.com/Index/indexWX",
                        data: {
                            business_no: "ZhanLeTaoWeChat"
                        },
                        method: "POST",
                        header: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        success: function(t) {
                            return console.log(t.data), "" != t.data.exhibitionNew.Parea || t.data.exhibitionNew.Parea, 
                            e.setData({
                                items: t.data.exhibitionCountArr,
                                banner: t.data.exhibitionView,
                                canShowTab: !0,
                                event: t.data.exhibitionView,
                                exhibitionNew: t.data.exhibitionNew
                            }, function() {
                                wx.hideLoading();
                            }), e.authorization(), Promise.resolve(t);
                        },
                        fail: function() {
                            wx.hideLoading();
                        }
                    });
                }
            });
        });
    },
    onLoad: function() {},
    homeGetUserInfo: function(n) {
        t.autoLogin(e, n, this, "../index/index");
    },
    exhibitonGetUserInfo: function(n) {
        t.autoLogin(e, n, this, "../exhibition/exhibition");
    },
    personGetUserInfo: function(n) {
        t.autoLogin(e, n, this, "../person/person");
    },
    ticketGetUserInfo: function(n) {
        t.autoLogin(e, n, this, "../ticket/ticket");
    },
    searchUserInfo: function(n) {
        t.autoLogin(e, n, this, "../search/search");
    }
});