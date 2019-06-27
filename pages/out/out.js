require("../../utils/util.js");
var e = getApp();

Page({
    data: {
        logs: [],
        orderarr: [],
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
		wx.request({
		  url: e.globalData.publicUrl + '/Trip/orderlistWX',
		  data: { 'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid },
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
    }
});