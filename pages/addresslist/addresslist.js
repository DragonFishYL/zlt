var e = getApp(), t = (require("../../wxParse/wxParse.js"), require("../../utils/util.js"));

require("../../utils/canvas.js");

Page({
    data: {
        addresslistArr:[]
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
    addresslistToDetail: function(b) {
		console.log(b);
		var id = b.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../addressupdate/addressupdate?id="+id
        });
    },
    addressDetailAdd: function() {
        wx.navigateTo({
            url: "../addressadd/addressadd"
        });
    },
	addresslistDelete:function(b){
		var that=this,d = {'id':b.currentTarget.dataset.id,'type':3,'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid};;
		wx.showModal({
			title:'删除提示',
			content:'是否删除这条消息',
			confirmText:'确认删除',
			cancelText:'再想想',
			success:function(r){
				if(r.confirm){
					//执行删除操作
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
								   title: '删除成功',
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
								   title: '删除失败',
								   icon: 'none',
								   duration: 2000,
								   mask:true
								});
							}
						}
					});
				}
				if(r.cancel){
					wx.showToast({
					   title: '取消删除',
					   icon: 'none',
					   duration: 2000,
					   mask:true
					});
				}
			}
		});
	},
    onLoad: function() {
        this.authorization();
		//请求
		wx.showLoading({ title: '加载中', });
		var t = this;
		wx.request({
		  url: e.globalData.publicUrl + '/Trip/billaddressList',
		  data: { 'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid },
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' // 默认值
		  },
		  success:function(res){
			//将发票列表数据赋值
		    console.log(res);
			t.setData({addresslistArr:res.data.data,});
			//关闭提示
			wx.hideLoading();
		  }
		});
    }
});