var e = getApp(), a = (require("../../utils/util.js"), require("../../utils/canvas.js"));

Page({
    data: {
        userInfo: {},
        height: "0px",
        avatarUrl: "",
        canvasAvatarUrl: "",
        photo: "",
        canvasPhotoUrl: "",
        nickName: "",
        banner: "",
        wxBanner: "",
        company: "",
        title: "",
        address: "",
        qrcode: "",
        shareImg1: "",
        shareImg2: "",
        shareImg3: "",
        canShow: "",
        tripid: "",
        eventTime: "",
        setTime: "",
        zgName: "",
        color: "#3399ff",
        timePath: "",
        addressPath: "",
        Parea: "",
        area: "",
        dtype: "",
        companyName: "",
        hidden: !0,
        gtype: "",
        shareType: "",
        uname: "",
        ZLTPhone: "",
        discount: "",
        bonus: "",
        xbonus: "",
        commitions: "",
        pricedanwei: "",
        areadanwei: "",
        commission: "",
		contract: [e.globalData.publicUrl+'/Public/Home/images/zlt_enjoycontract1.png',
			e.globalData.publicUrl+'/Public/Home/images/zlt_enjoycontract2.png',
			e.globalData.publicUrl+'/Public/Home/images/zlt_enjoycontract3.png'
		],
		buycontractpagestatus:'none',
    },
    agreeA: function(){
	  this.setData({buycontractpagestatus:'block'});
    },
    buycontractpageb: function(){
	  this.setData({buycontractpagestatus:'none'});
    },
	previewImage: function (e) {
		var current = e.target.dataset.src;
		wx.previewImage({
		  current: current, // 当前显示图片的http链接  
		  urls: this.data.contract // 需要预览的图片http链接列表  
		})
	  }, 
    getHeight: function() {
        var e = wx.getSystemInfoSync().windowHeight;
        wx.getSystemInfoSync().windowWidth, wx.getSystemInfoSync().screenWidth, wx.getSystemInfoSync().screenHeight;
        this.setData({
            height: e - 103 - 18 + "px"
        });
    },
    onShareAppMessage: function(e) {
        var a = this,t = wx.getStorageSync("user").openid, i = (4 == a.data.shareType?a.data.tripid:wx.getStorageSync("exhibitionId"));
        if (1 == a.data.shareType) n = "/pages/view/view?business_no=ZhanLeTaoWeChat&fopenid=" + t + "&id=" + i + "&source=1&zlttype=1"; else if (2 == a.data.shareType) var n = "/pages/details/details?business_no=ZhanLeTaoWeChat&fopenid=" + t + "&id=" + i + "&source=1&zlttype=2"; else if (4 == a.data.shareType) var n = "/pages/detail/detail?business_no=ZhanLeTaoWeChat&fopenid=" + t + "&id=" + i + "&source=1&zlttype=4";
        return e.from,console.log(e), console.log(n), {
            title: a.data.company,
            path: n,
            imageUrl: a.data.shareImg1,
            success: function(e) {
				console.log('余龙');
			}
        };
    },
    drawImage1: function() {
        var t = this, i = this, n = i.data.banner;
        console.log(1), console.log(n);
        var o = new Promise(function(e, a) {
            console.log(2), wx.getImageInfo({
                src: n,
                complete: function(a) {
                    console.log(a.path), i.setData({
                        wxBanner: a.path
                    }), e(a);
                }
            });
        });
        Promise.all([ o ]).then(function(n) {
            var o = wx.createCanvasContext("shareImg1", t);
            a.drawFriendImageInfo(e, i, o, t.data, n);
        }).catch(function(e) {
            console.log(e);
        });
    },
    tabShareImg1: function() {
        var e = this;
        e.drawImage2(), wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 750,
            height: 600,
            destWidth: 750,
            destHeight: 600,
            canvasId: "shareImg1",
            success: function(a) {
                console.log(a.tempFilePath), e.setData({
                    shareImg1: a.tempFilePath
                }, function() {
                    wx.hideLoading();
                }), console.log("分享好友图片" + e.data.shareImg1);
            },
            fail: function(e) {
                console.log(e);
            }
        });
    },
    drawImage2: function() {
        var e = this, t = new Promise(function(e, a) {
            wx.getImageInfo({
                src: "../../common/img/logomask.png",
                complete: function(a) {
                    e(a);
                }
            });
        });
        Promise.all([ t ]).then(function(t) {
            if (2 == wx.getStorageSync("shareType")) {
                var i = wx.createCanvasContext("shareImg2", e);
                i.drawImage("../../common/img/quanShare.jpg", 0, 0, 750, 1002), a.drawQuenImageInfo(i, e.data, t);
            } else if (1 == wx.getStorageSync("shareType")) {
                var n = wx.createCanvasContext("shareImg3", e);
                n.drawImage("../../common/img/quanShare.jpg", 0, 0, 750, 1102), a.drawQuenImageInfo(n, e.data, t);
            } else if (4 == wx.getStorageSync("shareType")) {
                var n = wx.createCanvasContext("shareImg4", e);
                n.drawImage("../../common/img/quanShare.jpg", 0, 0, 750, 1102), a.drawQuenImageInfo(n, e.data, t);
            }
        });
    },
    tabShareImg2: function(e) {
        var a = this;
        a.drawImage2();
        var t = null;
        wx.getSystemInfo({
            success: function(e) {
                t = e.pixelRatio;
            }
        }), console.log(a.data.shareType), 2 == wx.getStorageSync("shareType") ? wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 750,
            height: 1002,
            destWidth: 750 * t,
            destHeight: 1002 * t,
            canvasId: "shareImg2",
            quality: 1,
            success: function(e) {
                var t = e.tempFilePath;
                a.setData({
                    shareImg2: t
                }), wx.getSetting({
                    success: function(e) {
                        0 == e.authSetting["scope.writePhotosAlbum"] ? wx.openSetting({
                            success: function(e) {}
                        }) : wx.saveImageToPhotosAlbum({
                            filePath: t,
                            success: function(e) {
                                wx.showModal({
                                    content: "图片已保存到相册，赶紧晒一下吧~",
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
        }, this) : (1 == wx.getStorageSync("shareType") && console.log(2)?wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 750,
            height: 1102,
            destWidth: 750 * t,
            destHeight: 1102 * t,
            canvasId: "shareImg3",
            quality: 1,
            success: function(e) {
                var t = e.tempFilePath;
                a.setData({
                    shareImg3: t
                }), wx.getSetting({
                    success: function(e) {
                        0 == e.authSetting["scope.writePhotosAlbum"] ? wx.openSetting({
                            success: function(e) {}
                        }) : wx.saveImageToPhotosAlbum({
                            filePath: t,
                            success: function(e) {
                                wx.showModal({
                                    content: "图片已保存到相册，赶紧晒一下吧~",
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
        }, this): 4 == wx.getStorageSync("shareType") && (console.log(2), wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 750,
            height: 1102,
            destWidth: 750 * t,
            destHeight: 1102 * t,
            canvasId: "shareImg4",
            quality: 1,
            success: function(e) {
                var t = e.tempFilePath;
                a.setData({
                    shareImg4: t
                }), wx.getSetting({
                    success: function(e) {
                        0 == e.authSetting["scope.writePhotosAlbum"] ? wx.openSetting({
                            success: function(e) {}
                        }) : wx.saveImageToPhotosAlbum({
                            filePath: t,
                            success: function(e) {
                                wx.showModal({
                                    content: "图片已保存到相册，赶紧晒一下吧~",
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
        }, this)));
    },
    authorization: function() {
        var e = this;
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(a) {
                        e.setData({
                            userInfo: a.userInfo,
                            avatarUrl: a.userInfo.avatarUrl,
                            nickName: a.userInfo.nickName,
                            photo: wx.getStorageSync("avatarUrl")
                        }, function() {
                            e.drawImage1();
                        });
                    }
                });
            }
        });
    },
    imageLoad: function(e) {
        this.setData({
            canShow: "active"
        });
    },
    onLoad: function(e) {
        var a = this, t = wx.getStorageSync("shareType"), i = wx.getStorageSync("user").openid;
		t == 4?a.setData({tripid:e.id}):null;
	  if (wx.showLoading({
            title: "加载中",
            mask: !0
        }), 1 == t) var n = wx.getStorageSync("zid"), o = getApp().globalData.publicUrl + "/Exhibition/exhibitionEnjoyWX?business_no=ZhanLeTaoWeChat&openid=" + i + "&type=" + t + "&zid=" + n; else if (2 == t) var s = wx.getStorageSync("exhibitionId")?wx.getStorageSync("exhibitionId"):e.id, o = getApp().globalData.publicUrl + "/Exhibition/exhibitionEnjoyWX?business_no=ZhanLeTaoWeChat&openid=" + i + "&type=" + t + "&eid=" + s;else if (4 == t) var s = e.id, o = getApp().globalData.publicUrl + "/Exhibition/exhibitionEnjoyWX?business_no=ZhanLeTaoWeChat&openid=" + i + "&type=" + t + "&xid=" + s;
        wx.request({
            url: o,
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
				wx.setStorageSync('scene',e.data.weiCode.scene); //保存小程序码场景值
                console.log(t),console.log(e.data), wx.setNavigationBarTitle({
                    title: (4 == t ?e.data.newData.title:e.data.exhibition.name)
                }), 1 == e.data.status && (1 == t ? a.setData({
                    company: e.data.exhibition.name,
                    banner: e.data.exhibition.thumbnail,
                    title: e.data.exhibition.name,
                    setTime: e.data.exhibition.setTime,
                    zgName: e.data.exhibition.zgName,
                    Parea: e.data.exhibition.Parea,
                    dtype: e.data.exhibition.dtype,
                    areadanwei: e.data.position.areadanwei,
                    pricedanwei: e.data.position.pricedanwei,
                    area: e.data.position.area,
                    companyName: e.data.busiInfo.name,
                    gtype: e.data.position.gtype,
                    discount: e.data.exhibition.discount,
                    bonus: e.data.exhibition.bonus,
                    xbonus: e.data.exhibition.xbonus,
                    hidden: !1,
                    shareType: t,
                    uname: e.data.busiInfo.uname,
                    ZLTPhone: e.data.position.ZLTPhone,
                    qrcode: e.data.weiCode.weiImg,
                    commission: e.data.position.commission
                }, function() {
                    a.authorization();
                }) : 2 == t ? a.setData({
                    company: e.data.exhibition.name,
                    banner: e.data.exhibition.thumbnail,
                    title: e.data.exhibition.name,
                    setTime: e.data.exhibition.setTime,
                    zgName: e.data.exhibition.zgName,
                    Parea: e.data.exhibition.Parea,
                    area: e.data.exhibition.area,
                    dtype: e.data.exhibition.dtype,
                    discount: e.data.exhibition.discount,
                    bonus: e.data.exhibition.bonus,
                    xbonus: e.data.exhibition.xbonus,
                    areadanwei: e.data.exhibition.areadanwei,
                    pricedanwei: e.data.exhibition.pricedanwei,
                    hidden: !0,
                    shareType: t,
                    qrcode: e.data.weiCode.weiImg,
                    commission: e.data.exhibition.commission
                }, function() {
                    a.authorization();
                }) : 4 == t && a.setData({
                    company: e.data.newData.title,
                    banner: e.data.newData.thumbnail,
                    setTime: e.data.newData.setime,
                    Parea: e.data.newData.xprice,
                    area: e.data.newData.xnum,
                    dtype: e.data.newData.xtype,
                    bonus: e.data.newData.bonus,
                    commitions: e.data.newData.commitions,
                    hidden: !0,
                    shareType: t,
                    qrcode: e.data.weiCode.weiImg,
                }, function() {
                    a.authorization();
                }));
				wx.hideLoading();
            },
            fail: function() {
                wx.hideLoading();
            }
        }), this.getHeight();
    }
});