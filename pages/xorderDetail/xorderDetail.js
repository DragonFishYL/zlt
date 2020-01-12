const app = getApp()
Page({
  data: {
    oid: '',
    sid: '',
    billId: '',
    openid: 123,
    orderList: [],
    trip: [],
    userList: [],
    userLength:0,
    trueprice: '',
    xtype: '',
    userInfo: '',
	state: "",
	paytime: "",
	ctime: "",
	statecode: "",
	backimage: "",
	backimages: "",
	billstate: "",
	merchantDispay: !1,
    payway: ''
  },
  pay: function(m) {
     var e = this,ee = this,p=e.data.payway, t = wx.getStorageSync("orderId"), a = wx.getStorageSync("user").openid;
	 if(p == 1){ var sid = e.data.oid; }else if(p == 2){ var sid = m.target.dataset.sid; }
	 wx.setStorageSync("orderId",sid);wx.setStorageSync("payway",p);
	 wx.request({
	   url: "https://fairso.com/trip/foreastWePayWX",
	   data: {
			business_no: "ZhanLeTaoWeChat",
			openid: a,
			payway: p,
			oid: sid,
			sid: sid
	   },
	   method: "POST",
	   header: {
			"Content-Type": "application/x-www-form-urlencoded"
	   },
	   success: function(t) {
		   // console.log(123);
		   // console.log(t);
		   // return false;
			if (console.log(t.data), 1 == t.data.status) {
				wx.setNavigationBarTitle({
					title: e.data.trip.title
				});
				var a = t.data.data;
				wx.requestPayment({
					timeStamp: a.timeStamp,
					nonceStr: a.nonceStr,
					package: a.package,
					signType: a.signType,
					paySign: a.paySign,
					success: function(t) {
						wx.showToast({
							title: "支付成功",
							icon: "success",
							duration: 2e3,
							success: function() {
								setTimeout(function() {
									e.successPay();
								}, 2e3);
							}
						});
					},
					fail: function(e) {
						wx.showToast({
							title: "支付失败",
							icon: "none",
							duration: 2e3,
							success: function() {
								setTimeout(function() {
									wx.redirectTo({
										url: "../xorderDetail/xorderDetail?oid="+ee.data.oid
									});
								}, 2e3);
							}
						});
					}
				});
			}else{
				e.foreastPay(a,p,sid);
			}
		}
     });
  },
  foreastPay: function(a,p,sid) {
	var e = this,ee = this;
	wx.request({
	   url: "https://fairso.com/trip/foreastOnlineWX",
	   data: {
			business_no: "ZhanLeTaoWeChat",
			openid: a,
			payway: p,
			oid: sid,
			sid: sid
	   },
	   method: "POST",
	   header: {
			"Content-Type": "application/x-www-form-urlencoded"
	   },
	   success: function(t) {
			if (console.log(t.data), 1 == t.data.status) {
				wx.setNavigationBarTitle({
					title: e.data.trip.title
				});
				var a = t.data.data;
				wx.requestPayment({
					timeStamp: a.timeStamp,
					nonceStr: a.nonceStr,
					package: a.package,
					signType: a.signType,
					paySign: a.paySign,
					success: function(t) {
						wx.showToast({
							title: "支付成功",
							icon: "success",
							duration: 2e3,
							success: function() {
								setTimeout(function() {
									e.successPay();
								}, 2e3);
							}
						});
					},
					fail: function(e) {
						wx.showToast({
							title: "支付失败",
							icon: "none",
							duration: 2e3,
							success: function() {
								setTimeout(function() {
									wx.redirectTo({
										url: "../xorderDetail/xorderDetail?oid="+ee.data.oid
									});
								}, 2e3);
							}
						});
					}
				});
			}
		}
     });
  },
  successPay: function() {
        var e = this;
        console.log(2);
        var t = wx.getStorageSync("orderId"),p = wx.getStorageSync("payway"), a = wx.getStorageSync("user").openid;
        wx.request({
            url: "https://fairso.com/trip/nomallWePayWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: a,
                payway: p,
                oid: t,
                sid: t
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(1), console.log(t.data), 1 == t.data.status && (wx.setNavigationBarTitle({
                    title: e.data.trip.title
                }), e.setData({
                    merchantDispay: !0
                }));
				setTimeout(function() {
					wx.redirectTo({
						url: "../xorderDetail/xorderDetail?oid="+e.data.oid
					});
				}, 2e3);
            }
        });
  },
  authorization: function() {
	var e = this;
	wx.getSetting({
		success: function(t) {
			t.authSetting["scope.userInfo"] && wx.getUserInfo({
				success: function(t) {
					e.setData({
						userInfo: t.userInfo
					});
				}
			});
		}
	});
  },
  onLoad: function (e) {
    var t = this;
    this.authorization();
    //准备行程参数
    t.setData({ oid: e.oid, openid: wx.getStorageSync("user").openid });
    wx.showLoading({ title: '加载中', });
    wx.request({
      url: app.globalData.publicUrl + '/Trip/tripOrderDetail',
      data: { 'business_no': app.globalData.business_no, 'openid': t.data.openid, 'oid': t.data.oid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(r) {
        //关闭提示
        wx.hideLoading();
        if (r.statusCode == 200){
          if (r.data.status == 1){
            console.log(r.data.data);
            var xtype;
            if (r.data.data.trip.xtype == 1) {
              xtype = '商务团';
            } else if (r.data.data.trip.xtype == 2) {
              xtype = '游学团';
            } else if (r.data.data.trip.xtype == 3) {
              xtype = '展会团';
            }
            t.setData({
              trip: r.data.data.trip,
              trueprice: r.data.data.trueprice,
              userList: r.data.data.user,
              xtype: xtype,
              userLength: r.data.data.user.length,
              payway: r.data.data.payway,
              paytime: r.data.data.paytime,
              ctime: r.data.data.ctime,
              statecode: r.data.data.statecode,
              backimage: r.data.data.backimage,
              backimages: r.data.data.backimages,
              billstate: r.data.data.billstate,
              billId: r.data.data.billId
            })

            if (r.data.data.orderList){
              t.setData({
                orderList: r.data.data.orderList,
              })
            }
            
          }
        }
        
      }
    })
  },
  billAdd:function(){
	  var oid = this.data.oid;
        wx.navigateTo({
            url: "../billadd/billadd?id="+oid
        });
  },
  billDetail:function(){
	  var billId = this.data.billId;
        wx.navigateTo({
            url: "../billdetail/billdetail?id="+billId
        });
  }

})