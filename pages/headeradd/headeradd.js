var e = getApp(), t = (require("../../wxParse/wxParse.js"), require("../../utils/util.js"));

require("../../utils/canvas.js");

Page({
    data: {
		billheader:'',
		dutynum:'',
		array1: ['--请选择--','个人', '企业'],
		objectArray1: [
		  {
			id: 0,
			name: '--请选择--'
		  },
		  {
			id: 1,
			name: '个人'
		  },
		  {
			id: 2,
			name: '企业'
		  }
		],
		index1:0,
		array2: ['--请选择--','增值税普通发票'],
		objectArray2: [
		  {
			id: 0,
			name: '--请选择--'
		  },
		  {
			id: 1,
			name: '增值税普通发票'
		  }
		],
		index2:0
    },
    bindPickerChange: function (e) {
		this.setData({
		  index1: e.detail.value
		})
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
	billheadtap:function(event){
		this.setData({
			billheader:event.detail.value
		});
	},
	billdutynumtap:function(event){
		this.setData({
			dutynum:event.detail.value
		});
	},
    headerDetailAdd: function() {
		var that = this;
		// console.log(1);
		if(that.data.index1 == 0){
			wx.showToast({
			   title: '请选择开票类型',
			   icon: 'loading',
			   duration: 1500,
			   mask:true
			});
			return false;
		}
		
		if(that.data.index2 == 0){
			wx.showToast({
			   title: '请选择发票类型',
			   icon: 'loading',
			   duration: 1500,
			   mask:true
			});
			return false;
		}
		
		//请求
		wx.showLoading({ title: '加载中', });
		var d = {'billheader':that.data.billheader,'dutynum':that.data.dutynum,'opentype':that.data.index1,'billtype':that.data.index2,'type':1,'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid};
		wx.request({
			url:e.globalData.publicUrl + '/Trip/billhead_save',
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
					   title: '保存成功',
					   icon: 'success',
					   duration: 2000,
					   mask:true
					});
					setTimeout(function() {
						wx.redirectTo({
							url: "../headerlist/headerlist"
						});
					}, 2000);
				}else{
					wx.showToast({
					   title: '修改失败',
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