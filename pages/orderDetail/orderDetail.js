var e = require("../../utils/field.js"), e = require("../../utils/util.js");

getApp();

Page({
    data: {
        userInfo: {},
        mobile: "",
        testMobile: !1,
        code: "",
        testCode: !1,
        isSending: !1,
        height: "0px",
        userLogin: !1,
        canClick: !0,
        canSubmit: !0,
        zid: "",
        total: "",
        number: "",
        _num: "3",
        company: "",
        addressName: "",
        address: "",
        time: "",
        orderSign: "",
        price: "",
        type: "",
        businessName: "",
        state: "",
        userName: "",
        userPhone: "",
        merchantDispay: !1
    },
    goIndexPage: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.reLaunch({
            url: t
        });
    },
    goPage: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.redirectTo({
            url: t
        });
    },
    goMyshare: function(t) {
        var a = t.currentTarget.dataset.url;
        e.goPage(a);
    },
    pay: function() {
        var e = this, t = wx.getStorageSync("orderId"), a = wx.getStorageSync("user").openid;
        wx.request({
            url: getApp().globalData.publicUrl + "/Common/foreastOnlineWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: a,
                id: t
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                if (console.log(t.data), 1 == t.data.status) {
                    wx.setNavigationBarTitle({
                        title: e.data.company
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
                                            url: "../orderDetail/orderDetail?oid="+t
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
        var t = wx.getStorageSync("orderId"), a = wx.getStorageSync("user").openid;
        wx.request({
            url: getApp().globalData.publicUrl + "/Common/nomallWePayWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: a,
                id: t
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(1), console.log(t.data), 1 == t.data.status && (wx.setNavigationBarTitle({
                    title: e.data.company
                }), e.setData({
                    merchantDispay: !0,
                    state: t.data.orderInfo.statecode
                }));
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
    onLoad: function(d) {
        var e = this;
		wx.setStorageSync("orderId",d.oid);
        this.authorization();
        var t = wx.getStorageSync("orderId"), a = wx.getStorageSync("user").openid;
        wx.request({
            url: getApp().globalData.publicUrl + "/Member/orderDetailCheckWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: a,
                id: t
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log(t.data), wx.setNavigationBarTitle({
                    title: t.data.exhibition.name
                }), e.setData({
                    company: t.data.exhibition.name,
                    addressName: t.data.exhibition.zgName,
                    address: t.data.exhibition.address,
                    time: t.data.exhibition.setTime,
                    orderSign: t.data.orderInfo.sign,
                    price: t.data.orderInfo.price,
                    type: t.data.orderInfo.gtype,
                    state: t.data.orderInfo.statecode,
                    businessName: t.data.business.buinessName,
                    userName: t.data.business.userName,
                    userPhone: t.data.business.userPhone
                });
            }
        });
    }
});