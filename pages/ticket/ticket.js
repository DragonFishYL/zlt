var e = require("../../utils/util.js"), t = require("../../utils/canvas.js"), a = getApp();

Page({
    data: {
        userLogin: a.globalData.userLogin,
        height: "0px",
        name: "",
        phone: "",
        title: "",
        eventTime: "",
        setTime: "",
        address: "",
        qrcode: "",
        barcode: "",
        canShow: !0,
        country: "",
        province: "",
        city: "",
        color: "#339AFE"
    },
    saveTicket: function(e) {
        var t = null;
        wx.getSystemInfo({
            success: function(e) {
                t = e.pixelRatio;
            }
        }), wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 750,
            height: 1108,
            destWidth: 750 * t,
            destHeight: 1108 * t,
            canvasId: "shareImg",
            success: function(e) {
                console.log(e.tempFilePath);
                var t = e.tempFilePath;
                wx.getSetting({
                    success: function(e) {
                        console.log(e), console.log(e.authSetting["scope.writePhotosAlbum"]), 0 == e.authSetting["scope.writePhotosAlbum"] ? wx.openSetting({
                            success: function(e) {}
                        }) : wx.saveImageToPhotosAlbum({
                            filePath: t,
                            success: function(e) {
                                wx.showModal({
                                    content: "保存电子票成功，请到相册查看",
                                    showCancel: !1,
                                    confirmText: "好的",
                                    confirmColor: "#333",
                                    success: function(e) {
                                        console.log(e);
                                    }
                                });
                            }
                        });
                    }
                });
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    getHeight: function() {
        var e = wx.getSystemInfoSync().windowHeight, t = (wx.getSystemInfoSync().windowWidth, 
        wx.getSystemInfoSync().screenWidth, wx.getSystemInfoSync().screenHeight, e - 69);
        t > 580 && (t = 580), this.setData({
            height: t + "px"
        });
    },
    goIndexPage: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.reLaunch({
            url: t
        });
    },
    goPage: function(t) {
        var a = t.currentTarget.dataset.url;
        e.goPage(a);
    },
    goShare: function(e) {
        wx.setStorageSync("shareType", 2), wx.navigateTo({
            url: "../share/share"
        });
    },
    drawTicket: function() {
        var e = wx.createCanvasContext("shareImg");
        e.drawImage("../../common/img/canvas_share.jpg", 0, 0, 750, 1108), t.drawInfomation(e, this.data);
    },
    getData: function() {
        var e = this, t = wx.getStorageSync("exhibitionId"), a = wx.getStorageSync("user").openid;
        wx.showLoading({
            title: "加载中",
            mask: !0
        }), wx.request({
            url: "https://fairso.com/Exhibition/customerSignUpedWX",
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
                console.log(t.data), e.setData({
                    name: t.data.user.uname,
                    phone: t.data.user.uphone,
                    title: t.data.exhibition.name,
                    setTime: t.data.exhibition.setTime,
                    address: t.data.exhibition.zgName,
                    qrcode: t.data.signUp.signUpImage,
                    barcode: t.data.signUp.signUpCode,
                    canShow: !0
                }, function() {
                    console.log(t.data.numUrl), e.drawTicket(), wx.hideLoading();
                });
            }
        });
    },
    onLoad: function(e) {
        this.getHeight(), this.getData();
    }
});