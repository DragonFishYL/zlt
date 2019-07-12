App({
    onLaunch: function() {
        var o = this;
        wx.getSetting({
            success: function(n) {
                n.authSetting["scope.userInfo"] ? wx.getUserInfo({
                    success: function(n) {
                        console.info(n), console.log("用户已授权"), o.globalData.userInfo = n.userInfo, o.userInfoReadyCallback && o.userInfoReadyCallback(n);
                    }
                }) : !1 === n.authSetting["scope.userInfo"] ? console.info("授权被拒") : wx.getUserInfo({
                    success: function(n) {
                        console.info("没有授权"), console.log(n), o.setUserInfoAndNext(n);
                    },
                    fail: function(o) {
                        console.log(o);
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        host: "",
        appId: "wx94bfc7e77f7d67c3",
        business_no: "ZhanLeTaoWeChat",
		publicUrl: 'https://web.srfairs.com',
        openId: ""
    }
});