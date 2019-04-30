var e = getApp(), t = (require("../../wxParse/wxParse.js"), require("../../utils/util.js")), n = void 0;

Page({
    data: {
        indicatorDots: !0,
        vertical: !1,
        autoplay: !1,
        circular: !0,
        interval: 5e3,
        duration: 400,
        previousMargin: 0,
        nextMargin: 0,
        hasUserInfo: !1,
        indicatorColor: "#3399ff",
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        exPosition: {},
        ZLTBanner: "",
        ZLTPhone: "",
        company: "",
        index: "0",
        imgArr: [],
        inviteOpenId: "",
        exhibitionId: "",
        source: "",
        zlttype: "",
        openId: "",
        isOverTime: ""
    },
    immediatelySignUp: function() {
        wx.navigateTo({
            url: "../sign/sign"
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
    getData: function() {
        var e = this, t = e.data.inviteOpenId;
        t = t || "";
        var n = e.data.source;
        n = n || "3";
        var a = e.data.zlttype;
        a = a || "";
        var o = e.data.exhibitionId;
        o = o || "", wx.login({
            success: function(i) {
                var r = i.code;
                wx.request({
                    url: "https://fairso.com/Common/zltLoginWX",
                    data: {
                        business_no: "ZhanLeTaoWeChat",
                        code: r,
                        type: "1",
                        fopenid: t,
                        source: n,
                        zlttype: a,
                        id: o
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
        var e = this, t = e.data.userInfo.nickName, n = e.data.userInfo.avatarUrl, a = e.data.userInfo.gender, o = e.data.openId;
        wx.request({
            url: "https://fairso.com/Common/zltLoginWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: o,
                type: "2",
                nickname: t,
                headimgurl: n,
                gender: a
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
    goShare: function(e) {
        var t = this;
        wx.setStorageSync("zid", t.data.exPosition[t.data.index].id), wx.setStorageSync("shareType", 1), 
        wx.navigateTo({
            url: "../share/share"
        });
    },
    callPhone: function(e) {
        var t = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    goPage: function(e) {
        var n = e.currentTarget.dataset.url;
        t.goPage(n);
    },
    pidImg: function(e) {
        var t = this, n = !0, a = e.currentTarget.dataset.pidimg;
        if ("https://fairso.com" == a) return wx.showToast({
            title: "暂时没有展位图",
            icon: "none",
            duration: 2e3,
            success: function() {
                return n = !1, !1;
            }
        }), n = !1, !1;
        var o = [];
        o.push(e.currentTarget.dataset.pidimg), t.setData({
            imgArr: o
        }), wx.previewImage({
            current: e.currentTarget.dataset.pidimg,
            urls: t.data.imgArr,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    sidImg: function(e) {
        var t = this, n = !0, a = e.currentTarget.dataset.sidimg;
        if ("https://fairso.com" == a) return wx.showToast({
            title: "暂时没有搭建图",
            icon: "none",
            duration: 2e3,
            success: function() {
                return n = !1, !1;
            }
        }), n = !1, !1;
        var o = [];
        o.push(e.currentTarget.dataset.sidimg), t.setData({
            imgArr: o
        }), wx.previewImage({
            current: e.currentTarget.dataset.sidimg,
            urls: t.data.imgArr,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    onSlideChangeEnd: function(e) {
        this.setData({
            index: e.detail.current
        });
    },
    getScene: function(e) {
        var t = this;
        return n = new Promise(function(n, a) {
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
                    return t.setData({
                        inviteOpenId: n.fopenid,
                        exhibitionId: n.id,
                        source: n.source,
                        zlttype: n.zlttyepe
                    }, function() {
                        n.fopenid && n.fopenid;
                        wx.setStorageSync("inviteOpenId", n.fopenid), wx.setStorageSync("exhibitionId", n.id), 
                        wx.setStorageSync("source", n.source), wx.setStorageSync("zlttype", n.zlttype), 
                        t.getVote();
                    }), Promise.resolve(e.data.data);
                }
            });
        });
    },
    onShow: function() {
        var e = this, n = t.getCurrentPage().options, a = n.fopenid, o = decodeURIComponent(n.scene);
        if ("undefined" !== o) this.getScene(o); else "undefined" == a ? e.getVote() : n.fopenid ? e.setData({
            inviteOpenId: n.fopenid,
            exhibitionId: n.id,
            source: n.source,
            zlttype: n.zlttype
        }, function() {
            n.fopenid && n.fopenid;
            wx.setStorageSync("inviteOpenId", n.fopenid), wx.setStorageSync("exhibitionId", n.id), 
            wx.setStorageSync("source", n.source), wx.setStorageSync("zlttype", n.zlttype), 
            e.getVote();
        }) : wx.getStorageSync("exhibitionId") && e.getVote();
    },
    getVote: function() {
        var e = this;
        this.authorization();
        var t = wx.getStorageSync("exhibitionId");
        wx.getStorageSync("user").openid;
        wx.request({
            url: "https://fairso.com/Exhibition/positionDetailWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                id: t
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.info(t.data), 1 == t.data.status && e.setData({
                    exPosition: t.data.list,
                    ZLTBanner: t.data.ZLTBanner,
                    ZLTPhone: t.data.ZLTPhone,
                    isOverTime: t.data.isOverTime
                });
            }
        });
    },
    onLoad: function(e) {},
    getUserInfo: function(t) {
        e.globalData.userInfo = t.detail.userInfo, this.setData({
            userInfo: t.detail.userInfo,
            hasUserInfo: !0
        });
    },
    shareGetUserInfo: function(n) {
        var a = this;
        wx.setStorageSync("zid", a.data.exPosition[a.data.index].id), wx.setStorageSync("shareType", 1);
        t.autoLogin(e, n, this, "../share/share");
    },
    serviceGetUserInfo: function(n) {
        t.autoLogin(e, n, this, "../service/service");
    },
    buyGetUserInfo: function(n) {
        t.autoLogin(e, n, this, "../buy/buy");
    }
});