var e = getApp(), t = (require("../../wxParse/wxParse.js"), require("../../utils/util.js"));

require("../../utils/canvas.js");

Page({
    data: {
		address:'',
		people:'',
		code:'',
		phone:'',
		id:''
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
	addresstap:function(event){
		this.setData({
			address:event.detail.value
		});
	},
	phonetap:function(event){
		this.setData({
			phone:event.detail.value
		});
	},
	peopletap:function(event){
		this.setData({
			people:event.detail.value
		});
	},
	codetap:function(event){
		this.setData({
			code:event.detail.value
		});
	},
    addressDetailAdd: function(b) {
		var that = this;
		
		if(that.data.people == ''){
			wx.showToast({
			   title: '请输入收件人',
			   icon: 'none',
			   duration: 1500,
			   mask:true
			});
			return false;
		}
		if(that.data.phone == ''){
			wx.showToast({
			   title: '请输入联系电话',
			   icon: 'none',
			   duration: 1500,
			   mask:true
			});
			return false;
		}
		if(that.data.address == ''){
			wx.showToast({
			   title: '请输入详细地址',
			   icon: 'none',
			   duration: 1500,
			   mask:true
			});
			return false;
		}
		//请求
		wx.showLoading({ title: '加载中', });
		var d = {'address':that.data.address,'people':that.data.people,'phone':that.data.phone,'code':that.data.code,'type':1,'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid};
		wx.request({
			url:e.globalData.publicUrl + '/Trip/billaddress_save',
			data:d,
			method:'POST',
			header:{
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success:function(res){
				//关闭提示
				wx.hideLoading();
				if(res.data.status == 1){
					wx.showToast({
					   title: '创建成功',
					   icon: 'success',
					   duration: 2000,
					   mask:true
					});
					setTimeout(function() {
						wx.redirectTo({
							url: "../addresslist/addresslist"
						});
					}, 2000);
				}else{
					wx.showToast({
					   title: '创建失败,请重新创建',
					   icon: 'none',
					   duration: 2000,
					   mask:true
					});
				}
			}
		});
        
    },
    onLoad: function() {
		//请求
		wx.showLoading({ title: '加载中', });
        this.authorization();
		//关闭提示
		wx.hideLoading();
    }
});