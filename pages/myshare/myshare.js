var e = require("../../utils/util.js"), i = getApp();

Page({
    data: {
        userLogin: i.globalData.userLogin,
        userInfo: {},
        photo: "",
        canvasPhotoUrl: "",
        title: "",
        sameTrade: "",
        inviteRanking: "",
        invitAttentionCount: 0,
        shareRanking: "",
        canzhanfriend: "",
        canzhanNo: "",
        byInviteUser: null,
        userHeadPicUrl: "",
        inviteUser: [],
        isExamine: "",
        isMore: !1,
        isJoin: !1,
        color: "#3399ff",
        uname: "",
        soonInvite: "",
        soonUser: "",
        exhibitionUser: ""
    },
    goIndexPage: function(e) {
        var i = e.currentTarget.dataset.url;
        wx.reLaunch({
            url: i
        });
    },
    goPage: function(e) {
        var i = e.currentTarget.dataset.url;
        wx.redirectTo({
            url: i
        });
    },
    goMyshare: function(i) {
        wx.setStorageSync("isMyshare", i.currentTarget.dataset.index);
        var n = i.currentTarget.dataset.url;
        e.goPage(n);
    },
    authorization: function() {
        var e = this;
        wx.getSetting({
            success: function(i) {
                i.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(i) {
                        e.setData({
                            userInfo: i.userInfo
                        });
                    }
                });
            }
        });
    },
    goShare: function(e) {
        wx.setStorageSync("shareType", 2), wx.redirectTo({
            url: "../share/share"
        });
    },
    onLoad: function() {
        var e = this;
        this.authorization();
        var i = wx.getStorageSync("user").openid, n = wx.getStorageSync("exhibitionId");
        wx.request({
            url: "https://fairso.com/Exhibition/myInfuluenceWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: i,
                id: n
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(i) {
                if (console.log(i.data), 1 == i.data.status) {
                    if (i.data.exhibition.uname && i.data.exhibition.headimg) n = i.data.exhibition; else var n = null;
                    var t = [];
                    for (var a in i.data.my_exhibition_view.info) {
                        var o = i.data.my_exhibition_view.info[a];
                        console.log(i.data.my_exhibition_view.info[a].headimg), "undefined" != i.data.my_exhibition_view.info[a].headimg && (console.log(o), 
                        t.push(o), console.log(t));
                    }
                    t.length > 7 && (e.setData({
                        isMore: !0
                    }), t = t.slice(0, 7));
                    var r = [];
                    for (var a in i.data.my_exhibition_enjoy.info) {
                        var s = i.data.my_exhibition_enjoy.info[a];
                        console.log(i.data.my_exhibition_enjoy.info[a].headimg), "undefined" != i.data.my_exhibition_enjoy.info[a].headimg && r.push(s);
                    }
                    r.length > 7 && (e.setData({
                        isJoin: !0
                    }), r = r.slice(0, 7)), e.setData({
                        title: i.data.exhibition.ename,
                        invitAttentionCount: i.data.my_public_influence.pnum,
                        shareRanking: i.data.my_public_influence.sort,
                        sameTrade: i.data.my_exhibition_view.num,
                        inviteRanking: i.data.my_exhibition_view.sort,
                        canzhanfriend: i.data.my_exhibition_enjoy.num,
                        canzhanNo: i.data.my_exhibition_enjoy.sort,
                        byInviteUser: n,
                        uname: i.data.exhibition.uname,
                        inviteUser: t,
                        isExamine: i.data.exhibition.isExamine,
                        exhibitionUser: r,
                        soonUser: i.data.my_exhibition_enjoying.num,
                        soonInvite: i.data.my_exhibition_enjoying.info
                    });
                } else wx.showToast({
                    title: "数据请求错误，请稍后",
                    icon: "none",
                    duration: 2e3,
                    success: function() {
                        return !1;
                    }
                });
            }
        });
    }
});