var e = getApp(), t = (require("../../wxParse/wxParse.js"), require("../../utils/util.js"));

require("../../utils/canvas.js");

Page({
    data: {
		color:{
			0:'#07c160',
			1:'#333',
			2:'#333',
			3:'#333'
		},
        billlistArr:[],
        openId: "",
        type: ""
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
    billlistToDetail: function(b) {
		console.log(b);
		var billId = b.currentTarget.dataset.id,type = b.currentTarget.dataset.type;
		if(type == 1){
			wx.navigateTo({
				url: "../billadd/billadd?id="+billId
			});
		}else{
			wx.navigateTo({
				url: "../billdetail/billdetail?id="+billId
			});
		}
        
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
	publicFunc: function(type){
		var t = this;
		wx.request({
		  url: e.globalData.publicUrl + '/Trip/billListPlay',
		  data: { 'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid,'type':type },
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' // 默认值
		  },
		  success:function(res){
			//将发票列表数据赋值
		    console.log(res);
			if(res.data.status == 1){
				t.setData({billlistArr:res.data.data,type:type});
			}else{
				t.setData({billlistArr:null,type:type});
			}
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
		colors[a-1] = '#07c160';
		this.setData({
            color:colors
        });
		this.publicFunc(a);
	},
});