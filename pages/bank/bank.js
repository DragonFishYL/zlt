var t = getApp(), e = require("../../utils/util.js"), n = require("../../wxParse/wxParse.js");

require("../../utils/canvas.js");

Page({
    data: {
        canShow: "",
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        userInfo: "",
        avatarUrl: "",
        canvasAvatarUrl: "",
        photo: "",
        canvasPhotoUrl: "",
        shareImg1: "",
        shareImg2: "",
        nickName: "",
    },
	bankadd:function(){
		wx.navigateTo({
			url:"../bankadd/bankadd"
		});
	},
	bankupdate:function(){
		wx.navigateTo({
			url:"../bankupdate/bankupdate"
		});
	},
    authorization: function() {
        var t = this;
        wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && (console.info(1), wx.getUserInfo({
                    success: function(e) {
                        console.info(2), t.setData({
                            userInfo: e.userInfo,
                            avatarUrl: e.userInfo.avatarUrl,
                            nickName: e.userInfo.nickName,
                            photo: wx.getStorageSync("avatarUrl")
                        }, function() {});
                    }
                }));
            }
        });
    },
    goPage: function(t) {
        var n = t.currentTarget.dataset.url;
        e.goPage(n);
    },
    watchTicket: function() {
        wx.navigateTo({
            url: "../watchTicket/watchTicket"
        });
    },
    goFair: function() {
        wx.navigateTo({
            url: "../out/out"
        });
    },
    goBill: function() {
        wx.navigateTo({
            url: "../bill/bill"
        });
    },
    collect: function() {
        wx.navigateTo({
            url: "../collect/collect"
        });
    },
    myshare: function() {
        wx.navigateTo({
            url: "../effect/effect"
        });
    },
    homeGetUserInfo: function(n) {
        e.autoLogin(t, n, this, "../index/index");
    },
    exhibitonGetUserInfo: function(n) {
        e.autoLogin(t, n, this, "../exhibition/exhibition");
    },
    myshareGetUserInfo: function(n) {
        e.autoLogin(t, n, this, "../person/person");
    },
    imageLoad: function(t) {
        this.setData({
            canShow: "active"
        });
    },
    onLoad: function() {
        this.authorization();
    }
});