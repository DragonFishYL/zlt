function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = require("../../utils/util.js");

getApp();

Page({
    data: (t = {
        indicatorDots: !0,
        vertical: !1,
        autoplay: !1,
        circular: !0,
        interval: 5e3,
        duration: 400,
        previousMargin: 0,
        nextMargin: 0,
        hasUserInfo: !1,
        indicatorColor: "#3399ff",
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        guangdi: {},
        biaozhan: {},
        company: "",
        index: "0",
        imgArr: [],
        userName: "",
        userPhone: "",
        bname: !1,
        gname: !0,
        _num: "0",
        num1: "0",
        num: "0",
        _num1: "0",
        showView: !0,
        showType: {},
        Number: "1",
        price: !0,
        area: !0,
        total: "",
        e_area: "",
        zid: ""
    }, a(t, "index", "0"), a(t, "ZLTBanner", ""), t),
    goIndexPage: function(a) {
        var t = a.currentTarget.dataset.url;
        wx.reLaunch({
            url: t
        });
    },
    goPage: function(a) {
        var t = a.currentTarget.dataset.url;
        wx.redirectTo({
            url: t
        });
    },
    bindMinus: function(a) {
        var t = this;
        console.log(a.target.dataset.price);
        var e = t.data.Number;
        e > 1 && e--, console.log(e);
        var n = Number(e) * a.target.dataset.price, r = Number(e) * a.target.dataset.area;
        console.log(n), this.setData({
            Number: e,
            price: !1,
            area: !1,
            total: n,
            e_area: r
        });
    },
    bindPlus: function(a) {
        var t = this;
        console.log(a.target.dataset.price);
        var e = t.data.Number;
        e++;
        var n = Number(e) * a.target.dataset.price, r = Number(e) * a.target.dataset.area;
        console.log(n), this.setData({
            Number: e,
            price: !1,
            area: !1,
            total: n,
            e_area: r
        });
    },
    goMyshare: function(a) {
        var t = a.currentTarget.dataset.url;
        e.goPage(t);
    },
    formSubmit: function(a) {
        var t = this; //console.log(t.data.Number);return false;
        if (console.log(t.data.showType[t.data._num1].area), t.data.e_area) e = t.data.e_area; else var e = t.data.showType[t.data._num1].area;
        if (t.data.total) r = n = parseInt(t.data.total); else var n = parseInt(t.data.showType[t.data._num1].newtotal), r = n;
        wx.setStorageSync("exhibition", {
            showType: t.data.showType[t.data._num1],
            Number: t.data.Number,
            eid: t.data.zid,
            total: r,
            e_area: e,
            company: t.data.company
        }), wx.redirectTo({
            url: "../order/order"
        });
    },
    authorization: function() {
        var a = this;
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(t) {
                        a.setData({
                            userInfo: t.userInfo
                        });
                    }
                });
            }
        });
    },
    clickNum1: function(a) {
        var t = this;
        console.log(a.target.dataset.num), this.setData({
            showType: t.data.biaozhan,
            _num: a.target.dataset.num,
            _num1: a.target.dataset.num,
            num: a.target.dataset.num,
            price: !0,
            area: !0,
            Number: "1"
        });
    },
    clickNum2: function(a) {
        var t = this;
        console.log(a.target.dataset.num), this.setData({
            showType: t.data.guangdi,
            _num: a.target.dataset.num,
            _num1: a.target.dataset.num - 1,
            num: a.target.dataset.num - 1,
            num1: "0",
            price: !0,
            area: !0,
            Number: "1"
        });
    },
    clickName: function(a) {
        console.log(a.target.dataset.num), this.setData({
            _num1: a.target.dataset.num,
            num1: a.target.dataset.num,
            zid: a.target.dataset.id,
            price: !0,
            area: !0,
            Number: "1"
        });
    },
    radioName: function(a) {
        console.log(a);
    },
    onLoad: function() {
        var a = this, t = wx.getStorageSync("exhibitionId");
        wx.getStorageSync("user").openid;
        this.authorization();
        wx.request({
            url: getApp().globalData.publicUrl + "/Exhibition/positionOrderWX",
            data: {
                business_no: "ZhanLeTaoWeChat",
                id: t
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.info(t.data), a.setData({
                    guangdi: t.data.guangdi,
                    showType: t.data.biaozhan,
                    biaozhan: t.data.biaozhan,
                    ZLTBanner: t.data.ZLTBanner,
                    zid: t.data.biaozhan[a.data.index].id
                });
            }
        });
    }
});