var e = getApp(), t = (require("../../wxParse/wxParse.js"), require("../../utils/util.js"));

require("../../utils/canvas.js");

Page({
    data: {
        billlistArr:[]
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
    collect: function() {
        wx.navigateTo({
            url: "../collect/collect"
        });
    },
    onLoad: function() {
        this.authorization();
		//请求
		wx.showLoading({ title: '加载中', });
		var t = this;
		wx.request({
		  url: e.globalData.publicUrl + '/Trip/billListPlay',
		  data: { 'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid },
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' // 默认值
		  },
		  success:function(res){
			//将发票列表数据赋值
		    console.log(res);
			t.setData({billlistArr:res.data.data,});
			//关闭提示
			wx.hideLoading();
		  }
		});
    }
});