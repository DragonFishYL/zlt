getApp();

Page({
    data: {
        title: "",
        userInfo: {},
        photo: "",
        canvasPhotoUrl: "",
        sameTrade: "",
        inviteUser: [],
        byInviteUser: null,
        color: "#3399ff"
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
    onLoad: function() {
        var e = this;
        this.authorization();
        var i = wx.getStorageSync("user").openid, t = wx.getStorageSync("exhibitionId"), n = wx.getStorageSync("isMyshare");
        wx.request({
            url: "https://fairso.com/Exhibition/myInfuluenceWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: i,
                id: t
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(i) {
                if (1 == n) {
                    var t = i.data.my_exhibition_view.num, a = i.data.my_exhibition_view.info.slice(0);
                    for (var o in a) a[o].headimg && (a[o].headimg = a[o].headimg.replace(/.jpg/g, "_c.png"));
                } else if (2 == n) {
                    var t = i.data.my_exhibition_enjoy.num, a = i.data.my_exhibition_enjoy.info.slice(0);
                    for (var s in a) a[s].headimg && (a[s].headimg = a[s].headimg.replace(/.jpg/g, "_c.png"));
                }
                e.setData({
                    sameTrade: t,
                    inviteUser: a,
                    byInviteUser: i.data.exhibition ? i.data.exhibition : null,
                    title: i.data.exhibition.ename
                }, function() {
                    console.log(e);
                });
            }
        });
    }
});