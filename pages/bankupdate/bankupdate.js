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
		select2:'block',
		select3:'block',
		select4:'block',
		array1: '',
		objectArray1: '',
		index1:0,
		array2: '',
		objectArray2: '',
		index2:0,
		array3: '',
		objectArray3: '',
		index3:0,
		array4: '',
		objectArray4: '',
		index4:0,
		bankarr:'',
		bankoid:'',
		bankdataid:'',
		useraccount:'',
		username:'',
		userphone:'',
		bankinfo:''
    },
    bindPickerChanges1: function (e) {
		var index = e.detail.value,object = this.data.objectArray1,value = object[index]['id'];this.setData({index1: index,index2: 0,index3: 0,index4: 0,select2:'block',select3:'none',select4:'none'});
		this.publiclevel(2,value);
    },
    bindPickerChanges2: function (e) {
		var index = e.detail.value,object = this.data.objectArray2,value = object[index]['id'];this.setData({index2: index,index3: 0,index4: 0,select3:'block',select4:'none'});
		this.publiclevel(3,value);
    },
    bindPickerChanges3: function (e) {
		var index = e.detail.value,object = this.data.objectArray3,value = object[index]['id'];this.setData({index3: index,index4: 0,select4:'block'});
		this.publiclevel(4,value);
    },
    bindPickerChanges4: function (e) {
		var index = e.detail.value,object = this.data.objectArray4,value = object[index]['id'];this.setData({index4: index,bankdataid:value});
    },
	publiclevel:function(level,pid){
		var that = this;
		wx.request({
			url: t.globalData.publicUrl + '/Trip/v3yourbank',
			data: { 'business_no': t.globalData.business_no, 'openid': wx.getStorageSync("user").openid,'level':level,'pid':pid },
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success:function(res){
				console.log(res);
				if(res.data.status == 1){
					if(level == 1){
						that.setData({
							array1:res.data.nameArr,
							objectArray1:res.data.objArr
						});
					}else if(level == 2){
						that.setData({
							array2:res.data.nameArr,
							objectArray2:res.data.objArr
						});
					}else if(level == 3){
						that.setData({
							array3:res.data.nameArr,
							objectArray3:res.data.objArr
						});
					}else if(level == 4){
						that.setData({
							array4:res.data.nameArr,
							objectArray4:res.data.objArr
						});
					}
					//关闭提示
					wx.hideLoading();
					wx.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 3000
					})
				}else{
					//关闭提示
					wx.hideLoading();
					wx.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 3000
					})
				}
			}
		});
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
    onLoad: function(d) {
        var that = this;that.authorization();that.setData({bankoid:d.id});
		wx.request({
			url: t.globalData.publicUrl + '/Trip/v3bank_add_update',
			data: { 'business_no': t.globalData.business_no, 'openid': wx.getStorageSync("user").openid,'type':5,'id':d.id },
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success:function(res){
				console.log(res);
				if(res.data.status == 1){
					that.setData({
						array1:res.data.nameArr1,
						objectArray1:res.data.objArr1,
						index1:res.data.index1,
						array2:res.data.nameArr2,
						objectArray2:res.data.objArr2,
						index2:res.data.index2,
						array3:res.data.nameArr3,
						objectArray3:res.data.objArr3,
						index3:res.data.index3,
						array4:res.data.nameArr4,
						objectArray4:res.data.objArr4,
						index4:res.data.index4,
						bankarr:res.data.data
					});
					//关闭提示
					wx.hideLoading();
					wx.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 3000
					})
				}else{
					//关闭提示
					wx.hideLoading();
					wx.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 3000
					})
				}
			}
		});
    },
	useraccount:function(d){
		this.setData({useraccount: d.detail.value});
	},
	username:function(d){
		this.setData({username: d.detail.value});
	},
	userphone:function(d){
		this.setData({userphone: d.detail.value});
	},
	bankinfo:function(d){
		this.setData({bankinfo: d.detail.value});
	},
	bankDetailAdd:function(){
		var useraccount = this.data.useraccount,
			username = this.data.username,
			userphone = this.data.userphone,
			bankinfo = this.data.bankinfo,
			bankdataid = this.data.bankdataid,
			d = {'business_no':t.globalData.business_no,'openid':wx.getStorageSync("user").openid,'useraccount':useraccount,'username':username,'userphone':userphone,'bankinfo':bankinfo,'bankdataid':bankdataid,'type':2,'id':this.data.bankoid};
		// console.log(d);return false;
		wx.request({
			url:t.globalData.publicUrl + '/Trip/v3bank_add_update',
			data:d,
			method:'POST',
			header:{
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success:function(res){
				if(res.data.status == 1){
					//关闭提示
					wx.hideLoading();
					wx.showToast({
						title: res.data.message,
						icon: 'success',
						duration: 3000
					})
					//跳转页面
					wx.navigateTo({
						url: "../bank/bank"
					});
				}else{
					//关闭提示
					wx.hideLoading();
					wx.showToast({
						title: res.data.message,
						icon: 'none',
						duration: 3000
					})
				}
			}
		});
	}
});