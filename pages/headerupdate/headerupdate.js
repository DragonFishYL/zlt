var e = getApp(), t = (require("../../wxParse/wxParse.js"), require("../../utils/util.js"));

require("../../utils/canvas.js");

Page({
    data: {
		billheader:'',
		dutynum:'',
		address:'',
		phone:'',
		bank:'',
		account:'',
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
		index1:1,
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
		index2:1,
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
	banktap:function(event){
		this.setData({
			bank:event.detail.value
		});
	},
	accounttap:function(event){
		this.setData({
			account:event.detail.value
		});
	},
    headerDetailSave: function(b) {
		var that = this;
		if(that.data.index1 == 0){
			wx.showToast({
			   title: '请选择开票类型',
			   icon: 'none',
			   duration: 1500,
			   mask:true
			});
			return false;
		}
		
		if(that.data.index2 == 0){
			wx.showToast({
			   title: '请选择发票类型',
			   icon: 'none',
			   duration: 1500,
			   mask:true
			});
			return false;
		}
		
		//请求
		wx.showLoading({ title: '加载中', });
		var d = {'address':that.data.address,'bank':that.data.bank,'phone':that.data.phone,'account':that.data.account,'billId':b.currentTarget.dataset.id,'billheader':that.data.billheader,'dutynum':that.data.dutynum,'opentype':that.data.index1,'billtype':that.data.index2,'type':2,'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid};
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
					   title: '修改成功',
					   icon: 'success',
					   duration: 2000,
					   mask:true
					});
					setTimeout(function() {
						wx.redirectTo({
							url: "../headerupdate/headerupdate?id="+b.currentTarget.dataset.id
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
		  url: e.globalData.publicUrl + '/Trip/billheadPlay',
		  data: { 'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid ,'billId':d.id},
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' // 默认值
		  },
		  success:function(res){
			//将发票列表数据赋值
		    console.log(res);
			t.setData({
				billheader:res.data.data.billheader,
				dutynum:res.data.data.dutynum,
				addressphone:res.data.data.addressphone,
				bankaccount:res.data.data.bankaccount,
				index1:res.data.data.opentype,
				index2:res.data.data.billtype,
				id:res.data.data.id,
			});
			//关闭提示
			wx.hideLoading();
		  }
		});
    }
});