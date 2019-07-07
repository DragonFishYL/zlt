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
    bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
		  index1: e.detail.value
		})
    },
    bindPickerChanges: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
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
    addressDetailSave: function(b) {
		var that = this;
		//请求
		wx.showLoading({ title: '加载中', });
		var d = {'id':b.currentTarget.dataset.id,'address':that.data.address,'people':that.data.people,'phone':that.data.phone,'code':that.data.code,'type':2,'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid};
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
					   title: '修改成功',
					   icon: 'success',
					   duration: 2000,
					   mask:true
					});
					setTimeout(function() {
						wx.redirectTo({
							url: "../addressupdate/addressupdate?id="+b.currentTarget.dataset.id
						});
					}, 2000);
				}else{
					wx.showToast({
					   title: '修改失败,请重新修改',
					   icon: 'none',
					   duration: 2000,
					   mask:true
					});
				}
			}
		});
        
    },
    onLoad: function(d) {
        this.authorization();
		//请求
		wx.showLoading({ title: '加载中', });
		var t = this;
		wx.request({
		  url: e.globalData.publicUrl + '/Trip/billaddressPlay',
		  data: { 'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid ,'id':d.id},
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' // 默认值
		  },
		  success:function(res){
			//将发票列表数据赋值
		    console.log(res);
			t.setData({
				address:res.data.data.address,
				people:res.data.data.people,
				code:res.data.data.code,
				phone:res.data.data.phone,
				id:res.data.data.id
			});
			//关闭提示
			wx.hideLoading();
		  }
		});
    }
});