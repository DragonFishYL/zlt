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
        zhishuimg: t.globalData.publicUrl + '/Public/Home/images/20190908zhishu.png',
        paimingimg: t.globalData.publicUrl + '/Public/Home/images/20190908paiming.png',
		voice:""
    },
	voicedetails:function(res){
		var type = res.currentTarget.dataset.type,oid = res.currentTarget.dataset.id;
		if(type == 1){
			wx.setStorageSync("exhibitionId", oid),wx.navigateTo({
				url:"../details/details"
			});
		}else{
			wx.navigateTo({
				url:"../detail/detail?id="+oid
			});
		}
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
    imageLoad: function(t) {
        this.setData({
            canShow: "active"
        });
    },
    onLoad: function(d) {
        this.authorization();
		wx.showLoading({title:'加载中'});
		var that = this;
		wx.request({
			url: t.globalData.publicUrl + '/Trip/v3myshare2',
			data: { 'business_no': t.globalData.business_no, 'openid': wx.getStorageSync("user").openid ,'oid':d.oid},
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