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
		array2: [],
		objectArray2: [],
		index2:0,
		bankinfoid:'',
		commisionid:'',
		remark:'',
		displaybankinfo:'none',
		contract: [t.globalData.publicUrl+'/Public/Home/images/zlt_commisions_20191222120226.png',
			t.globalData.publicUrl+'/Public/Home/images/zlt_commisions_20191222120257.png'
		],
		buycontractpagestatus:'none',
    },
  agreeA: function(){
	  this.setData({buycontractpagestatus:'block'});
  },
  buycontractpageb: function(){
	  this.setData({buycontractpagestatus:'none'});
  },
	previewImage: function (e) {
		var current = e.target.dataset.src;
		wx.previewImage({
		  current: current, // 当前显示图片的http链接  
		  urls: this.data.contract // 需要预览的图片http链接列表  
		})
	  }, 
    bindPickerChanges: function (e) {
		var objectArray2 = this.data.objectArray2;
		this.setData({
		  index2: e.detail.value,
		  bankinfoid: objectArray2[e.detail.value]['id'],
		  displaybankinfo: 'block'
		})
    },
	bankadd:function(){
		wx.navigateTo({
			url:"../bankadd/bankadd"
		});
	},
	remark:function(e){
		this.setData({
		  remark: e.detail.value
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
					objectArray2:res.data.bankarr,
					array2:res.data.bankindexarr
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
	approvalbtn:function(){
		var that = this,bankinfoid = that.data.bankinfoid,commisionid = that.data.commisionid,remark = that.data.remark;wx.showLoading({ title: '请求中', });
		wx.request({
		  url: t.globalData.publicUrl + '/Trip/v3commisionlist',
		  data: { 'business_no': t.globalData.business_no, 'openid': wx.getStorageSync("user").openid,'type':6,'id':commisionid,'bankinfoid':bankinfoid,'remark':remark},
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' // 默认值
		  },
		  success:function(res){
				wx.hideLoading();//关闭提示
				if(res.data.status == 1){
					wx.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 3000
					});
					//跳转页面
					wx.navigateTo({
						url: "../commisionsdetail/commisionsdetail?id="+commisionid
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
	}
});