var t = getApp(), e = (require("../../wxParse/wxParse.js"), require("../../utils/util.js"));

require("../../utils/canvas.js");

Page({
    data: {
        canShow: "",
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        avatarUrl: "",
        canvasAvatarUrl: "",
        photo: "",
        canvasPhotoUrl: "",
        shareImg1: "",
        shareImg2: "",
        nickName: ""
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
            url: "../billlist/billlist"
        });
    },
    watchTicketHead: function() {
        wx.navigateTo({
            url: "../headerlist/headerlist"
        });
    },
    watchTicketAddress: function() {
        wx.navigateTo({
            url: "../addresslist/addresslist"
        });
    },
    onLoad: function() {
        this.authorization();
    }
});