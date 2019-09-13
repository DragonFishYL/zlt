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
        twolist: "",
        bankinfo: "",
        approvalinfo: "",
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
    onLoad: function(d) {
		wx.showLoading({ title: '加载中', });
        var that = this;that.authorization();that.setData({commisionid:d.id});
		wx.request({
		  url: t.globalData.publicUrl + '/Trip/v3commisionlist',
		  data: { 'business_no': t.globalData.business_no, 'openid': wx.getStorageSync("user").openid,'type':5,'id':d.id},
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
					twolist:res.data.twolist,
					bankinfo:res.data.bankinfo,
					approvalinfo:res.data.approvalinfo
				});
			}else{
				wx.showToast({
					title: res.data.message,
					icon: 'none',
					duration: 3000
				})
			}
		  }
		})
    },
});