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
        person: "",
        voice: "",
        order: "",
        comissions: "",
        ico: ""
    },
	myeffect:function(){
		wx.navigateTo({
			url:"../effect2/effect2"
		});
	},
	mycommisions:function(){
		wx.navigateTo({
			url:"../commisions/commisions"
		});
	},
	mybank:function(){
		wx.navigateTo({
			url:"../bank/bank"
		});
	},
    watchBill: function() {
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
    tripGetUserInfo: function(n) {
        e.autoLogin(t, n, this, "../trip/trip");
    },
    imageLoad: function(t) {
        this.setData({
            canShow: "active"
        });
    },
    onLoad: function() {
		wx.setNavigationBarTitle({
		  title: '个人中心' 
		})
        this.authorization();
		wx.showLoading({title:'加载中'});
		var that = this;
		wx.request({
			url: t.globalData.publicUrl + '/Trip/v3person',
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
						person:res.data.person,
						voice:res.data.voice,
						order:res.data.order,
						comissions:res.data.comissions,
						ico:res.data.ico
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