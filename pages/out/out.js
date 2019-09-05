var e = getApp(), t = require("../../utils/util.js"), n = (require("../../wxParse/wxParse.js"));

Page({
    data: {
        logs: [],
        orderarr: [],
		color:{
			0:'#07c160',
			1:'#333',
			2:'#333',
			3:'#333'
		},
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
		//请求
		wx.showLoading({ title: '加载中', });
		t.publicFunc(1);
    },
	publicFunc:function(type){//1全部 2已支付 3未支付 4已取消
		var t = this;
		wx.request({
		  url: e.globalData.publicUrl + '/Trip/orderlistWX',
		  data: { 'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid,'type':type},
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' // 默认值
		  },
		  success:function(res){
			//将行程数据赋值
		   t.setData({orderarr:res.data.data});
			//关闭提示
			wx.hideLoading();
		  }
		});
	},
	ordermodel:function(o){
		console.log(o);
        var a = o.currentTarget.dataset.type,colors=this.data.color;
		//请求
		wx.showLoading({ title: '加载中', });
		colors[0] = '#333';
		colors[1] = '#333';
		colors[2] = '#333';
		colors[3] = '#333';
		colors[a-1] = '#07c160';
		this.setData({
            color:colors
        });
		this.publicFunc(a);
	},
    goPage: function(e) {
        var a = e.currentTarget.dataset.url;
        t.goPage(a);
    },
	homeGetUserInfo: function(n) {
		t.autoLogin(e, n, this, "../index/index");
	},
	exhibitonGetUserInfo: function(n) {
		t.autoLogin(e, n, this, "../exhibition/exhibition");
	},
	tripGetUserInfo: function(n) {
		t.autoLogin(e, n, this, "../trip/trip");
	},
	personGetUserInfo: function(n) {
		t.autoLogin(e, n, this, "../person2/person2");
	},
});