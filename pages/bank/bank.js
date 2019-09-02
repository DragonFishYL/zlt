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
        bankarr: ""
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
    homeGetUserInfo: function(n) {
        e.autoLogin(t, n, this, "../index/index");
    },
    exhibitonGetUserInfo: function(n) {
        e.autoLogin(t, n, this, "../exhibition/exhibition");
    },
    tripGetUserInfo: function(n) {
        e.autoLogin(t, n, this, "../trip/trip");
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
		var that = this;that.authorization();
		wx.request({
			url: t.globalData.publicUrl + '/Trip/v3bank_add_update',
			data: { 'business_no': t.globalData.business_no, 'openid': wx.getStorageSync("user").openid,'type':4 },
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success:function(res){
				console.log(res);
				if(res.data.status == 1){
					that.setData({
						bankarr:res.data.data
					});
					//关闭提示
					wx.hideLoading();
					wx.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 3000
					})
				}else{
					//关闭提示
					wx.hideLoading();
					wx.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 3000
					})
				}
			}
		});
    }
});