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
		voice:''
    },
	myshare:function(d){ 
		// console.log(d);return false;
		var type = d.currentTarget.dataset.type,oid = d.currentTarget.dataset.id;
		wx.navigateTo({
			url:"../myshare2/myshare2?oid="+oid
		});
	},
    bindPickerChanges: function (e) {
		this.setData({
		  index2: e.detail.value
		})
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
    onLoad: function() {
        this.authorization();
		wx.showLoading({title:'加载中'});
		var that = this;
		wx.request({
			url: t.globalData.publicUrl + '/Trip/v3voice',
			data: { 'business_no': t.globalData.business_no, 'openid': wx.getStorageSync("user").openid },
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success:function(res){
				//关闭提示
				wx.hideLoading();
				if(res.data.status == 1){
					wx.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 3000
					})
					that.setData({
						voice:res.data.voice,
					});
				}else{
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