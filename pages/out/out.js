require("../../utils/util.js");

Page({
    data: {
        logs: [],
        openId: ""
    },
    authorization: function() {
        var t = this;
        wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] && (console.info(1), wx.getUserInfo({
                    success: function(n) {
                        console.info(2), t.setData({
                            userInfo: n.userInfo,
                            avatarUrl: n.userInfo.avatarUrl,
                            nickName: n.userInfo.nickName,
                            photo: wx.getStorageSync("avatarUrl")
                        }, function() {});
                    }
                }));
            }
        });
    },
    onLoad: function() {
        var t = this;
        t.authorization();
        var n = wx.getStorageSync("user").openid;
        t.setData({
            openId: n
        });
    }
});