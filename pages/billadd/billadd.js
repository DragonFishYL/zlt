var t = getApp(), e = (require("../../wxParse/wxParse.js"), require("../../utils/util.js"));

require("../../utils/canvas.js");

Page({
    data: {
		array1: [],
		objectArray1: [],
		index1:0,
		object1:[],
		infoid:'',
		display1:'block',
		array2: [],
		objectArray2: [],
		index2:0,
		object2:[],
		array3: [],
		objectArray3: [],
		index3:0,
		contentid:'',
		display2:'block',
		aid:'',
		oid:'',
		openid:'',
		title:'',
		signs:'',
		payway:'',
		price:'',
		billstate:'',
		name:'',
		sign:'',
		opentype:'',
		billtype:'',
		people:'',
		phone:'',
		address:''
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
    bindPickerChange: function (e) {
		var that = this.data.object1;
		console.log(e);
		console.log(that);
		this.setData({
		  index1: e.detail.value,
		  infoid: that[e.detail.value]['id'],
		  name:that[e.detail.value]['billheader'],
		  sign:that[e.detail.value]['dutynum'],
		  opentype:(that[e.detail.value]['opentype']==1?'个人':'企业'),
		  billtype:(that[e.detail.value]['billtype']==1?'增值税普通发票':'增值税专用发票')
		})
    },
    bindPickerChanges: function (e) {
		console.log(e);
		var that = this.data.object2;
		this.setData({
		  index2: e.detail.value,
		  aid: that[e.detail.value]['id'],
		  people:that[e.detail.value]['people'],
		  phone:that[e.detail.value]['phone'],
		  address:that[e.detail.value]['address']
		})
    },
    bindPickerChangess: function (e) {
		console.log(e);
		var that = this.data.objectArray3;
		this.setData({
		  index3: e.detail.value,
		  contentid: that[e.detail.value]['id']
		})
    },
    onLoad: function(d) {
		wx.showLoading({ title: '加载中', });
        this.authorization();
		var that = this;
		//准备行程参数
		that.setData({ oid: d.id, openid: wx.getStorageSync("user").openid });
		wx.request({
			url: t.globalData.publicUrl + '/Trip/OrderBillpageApi',
			data: { 'business_no': t.globalData.business_no, 'openid': that.data.openid, 'oid': that.data.oid },
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success(r) {
				if(r.data.status == 1){
					var m = r.data.data;
					that.setData({
						title:m.title,
						signs:m.sign,
						price:m.price,
						billstate:(m.billstate==1?'待索要发票':(m.billstate==2?'已索要发票':(m.billstate==3?'待开发票':'已开发票'))),
						payway:(m.payway==1?'全额付款':'分期付款'),
						array1:m.head.headname,
						objectArray1:m.head.headarr,
						object1:m.head.headinfo,
						array2:m.address.addressname,
						objectArray2:m.address.addressarr,
						object2:m.address.addressinfo,
						array3:m.address.billcontents,
						objectArray3:m.address.billcontent,
						infoid:m.head.headinfo[0]['id'],
						name:m.head.headinfo[0]['billheader'],
						sign:m.head.headinfo[0]['dutynum'],
						opentype:(m.head.headinfo[0]['opentype']==1?'个人':'企业'),
						billtype:(m.head.headinfo[0]['billtype']==1?'增值税普通发票':'增值税专用发票'),
					    aid:m.address.addressinfo[0]['id'],
					    people:m.address.addressinfo[0]['people'],
					    phone:m.address.addressinfo[0]['phone'],
					    address:m.address.addressinfo[0]['address']
					});
					var objectArray3 = that.data.objectArray3,index3 = that.data.index3;
					that.setData({
						contentid:objectArray3[index3]
					});
				}else{
					wx.showToast({
					   title: r.data.message,
					   icon: 'none',
					   duration: 1500,
					   mask:true
					});
				}
				//关闭提示
				wx.hideLoading();
			}
		});
    },
	billAdd:function(){
		var that = this,contentid = that.data.contentid;
		if(!contentid){
			wx.showToast({
			   title: '请选择发票内容',
			   icon: 'none',
			   duration: 2000,
			   mask:false
			});
			return false;
		}
		wx.showLoading({ title: '加载中', });
		var oid = that.data.oid,infoid = that.data.infoid,aid = that.data.aid,price = that.data.price,d={'oid':oid,'infoid':infoid,'aid':aid,'price':price,'business_no': t.globalData.business_no, 'openid': that.data.openid ,'contentid': contentid};
		// console.log(d);return false;
		wx.request({
			url: t.globalData.publicUrl + '/Trip/addbillAction',
			data: d,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success(r) {
				if(r.data.status == 1){
					wx.showToast({
					   title: '发票申请成功',
					   icon: 'success',
					   duration: 2000,
					   mask:true
					});
					setTimeout(function() {
						wx.redirectTo({
							url: "../billdetail/billdetail?id="+r.data.id
						});
					}, 2000);
				}else{
					wx.showToast({
					   title: r.data.message,
					   icon: 'none',
					   duration: 1500,
					   mask:true
					});
				}
				//关闭提示
				wx.hideLoading();
			}
		})
	}
});