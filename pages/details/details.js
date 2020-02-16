var e = getApp(), t = require("../../utils/util.js"), a = (require("../../wxParse/wxParse.js"), 
void 0);

Page({
    data: {
        merchantDispay: !0,
        commentDispay: !0,
        introduceDispay: !0,
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        moreExPositions: {},
        exhibitionName: "",
        exhibitioncollect: "",
        exhibitionThumbnail: "",
        exhibitionTime: "",
        average: "",
        positionCount: "",
        minPrice: "",
        pricedanwei: "",
        areadanwei: "",
        stime: "",
        address: "",
        pid: "",
        chosts: {},
        exPosition: {},
        exPosition_biao: {},
        exPosition_guang: {},
        describe: "",
        range: "",
        previousreview: "",
        height: "342rpx",
        zhanpin: "342rpx",
        shichang: "342rpx",
        jieshao: "显示全部",
        fenlei: "显示全部",
        fenxi: "显示全部",
        inviteOpenId: "",
        exhibitionId: "",
        source: "",
        zlttype: "",
        openId: "",
        isExamine: "",
        isOverTime: "",
        uname: "",
        phone: "",
        bonus: "",
        minarea: "",
		redpackageimagestate:'none',
		redpackageid:null,
        redpackageimage: e.globalData.publicUrl + "/Public/Home/images/20200211redtoperoson.png"
    },
    viewDetail: function(e) {
        wx.redirectTo({
            url: "../view/view"
        });
    },
    fenlei: function(e) {
        var t = this;
        "显示全部" == e.currentTarget.dataset.name ? t.setData({
            fenlei: "收起",
            zhanpin: ""
        }) : t.setData({
            fenlei: "显示全部",
            zhanpin: "342rpx"
        });
    },
    fenxi: function(e) {
        var t = this;
        "显示全部" == e.currentTarget.dataset.name ? t.setData({
            fenxi: "收起",
            shichang: ""
        }) : t.setData({
            fenxi: "显示全部",
            shichang: "342rpx"
        });
    },
    jieshao: function(e) {
        var t = this;
        "显示全部" == e.currentTarget.dataset.name ? t.setData({
            jieshao: "收起",
            height: ""
        }) : t.setData({
            jieshao: "显示全部",
            height: "342rpx"
        });
    },
    merchant: function(e) {
        this.setData({
            merchantDispay: !1,
            introduceDispay: !0,
            commentDispay: !0
        });
    },
    introduce: function(e) {
        this.setData({
            merchantDispay: !0,
            introduceDispay: !1,
            commentDispay: !0
        });
    },
    comment: function(e) {
        this.setData({
            merchantDispay: !0,
            introduceDispay: !0,
            commentDispay: !1
        });
    },
    authorization: function() {
        var t = this;
        console.log(2), wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? e.globalData.userInfo ? (t.setData({
                    userInfo: e.globalData.userInfo,
                    hasUserInfo: !0
                }), t.getData()) : t.data.canIUse && (e.userInfoReadyCallback = function(e) {
                    t.setData({
                        userInfo: e.userInfo,
                        hasUserInfo: !0
                    }), t.getData(), wx.setStorageSync("userInfo", e.userInfo);
                }) : console.log(3);
            }
        });
    },
    getData: function() {
        var e = this;
        console.log(1);
        var t = e.data.inviteOpenId;
        t = t || "";
        var a = e.data.source;
        a = a || "3";
        var n = e.data.zlttype;
        n = n || "";
        var i = e.data.exhibitionId;
        i = i || "", console.log(t), console.log(a), console.log(n), wx.login({
            success: function(o) {
                var s = o.code;
                wx.request({
                    url: getApp().globalData.publicUrl + "/Common/zltLoginWX",
                    data: {
                        business_no: "ZhanLeTaoWeChat",
                        code: s,
                        type: "1",
                        fopenid: t,
                        source: a,
                        zlttype: n,
                        id: i
                    },
                    method: "POST",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(t) {
                        console.log(t.data), wx.setStorageSync("user", {
                            openid: t.data.openid,
                            status: t.data.status
                        }), e.setData({
                            openId: t.data.openid
                        }), e.loginWx();
						if(t.data.isred == 1){
							e.setData({
								redpackageimagestate: 'block'
							})
						}else if(t.data.isred == 3){
							e.setData({
								redpackageimage: getApp().globalData.publicUrl + "/Public/Home/images/20200211205447redpackageover.png",
								redpackageimagestate: 'block'
							})
						}else{
							e.setData({
								redpackageimage: getApp().globalData.publicUrl + "/Public/Home/images/20200211205447redpackagepublic.png",
								redpackageimagestate: 'block'
							})
						}
                    }
                });
            }
        });
    },
    loginWx: function() {
        var e = this, t = e.data.userInfo.nickName, a = e.data.userInfo.avatarUrl, n = e.data.userInfo.gender, i = e.data.openId, o = getApp().globalData.publicUrl + "/Common/zltLoginWX?business_no=ZhanLeTaoWeChat&openid=" + i + "&type=2&nickname=" + t + "&headimgurl=" + a + "&gender=" + n;
        wx.request({
            url: o,
            data: {
                business_no: "ZhanLeTaoWeChat",
                openid: i,
                type: "2",
                nickname: t,
                headimgurl: a,
                gender: n
            },
            method: "POST",
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(e) {
                var t = e.data.headimgurl;
                wx.setStorageSync("avatarUrl", t);
            }
        });
    },
    details: function(e) {
        wx.setStorageSync("exhibitionId", e.currentTarget.dataset.id), wx.redirectTo({
            url: "../details/details"
        });
    },
    goShare: function(e) {
        wx.setStorageSync("shareType", 2), wx.navigateTo({
            url: "../share/share"
        });
    },
    goTicket: function(e) {
        var t = this;
        1 == t.data.isExamine && (wx.setStorageSync("uname", t.data.uname), wx.navigateTo({
            url: "../ticket/ticket"
        }));
    },
    collect: function() {
        var e = this, t = wx.getStorageSync("exhibitionId"), a = wx.getStorageSync("user").openid, n = getApp().globalData.publicUrl + "/Exhibition/exhiCollectWX?business_no=ZhanLeTaoWeChat&openid=" + a + "&id=" + t;
        wx.request({
            url: n,
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
                1 == t.data.status ? wx.showToast({
                    title: "收藏成功",
                    icon: "none",
                    duration: 2e3,
                    success: function() {
                        e.setData({
                            exhibitioncollect: t.data.status
                        });
                    }
                }) : 8 == t.data.status && wx.showToast({
                    title: "取消收藏成功",
                    icon: "none",
                    duration: 2e3,
                    success: function() {
                        e.setData({
                            exhibitioncollect: t.data.status
                        });
                    }
                });
            }
        });
    },
    goPage: function(e) {
        var a = e.currentTarget.dataset.url;
        t.goPage(a);
    },
    goIndex: function() {
        wx.navigateTo({
            url: "../index/index"
        });
    },
    callPhone: function(e) {
        var t = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t,
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    },
    getScene: function(e) {
        var t = this;
        return a = new Promise(function(a, n) {
            wx.request({
                url: getApp().globalData.publicUrl + "/Exhibition/exhibitionEnjoySceneWX ",
                data: {
                    business_no: "ZhanLeTaoWeChat",
                    scene: e
                },
                method: "POST",
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success: function(e) {
                    var a = e.data.parames;
                    return console.log(a), t.setData({
                        inviteOpenId: a.fopenid,
                        exhibitionId: a.id,
                        source: a.source,
                        zlttype: a.zlttyepe
                    }, function() {
                        a.fopenid && a.fopenid;
                        wx.setStorageSync("inviteOpenId", a.fopenid), wx.setStorageSync("exhibitionId", a.id), 
                        wx.setStorageSync("source", a.source), wx.setStorageSync("zlttype", a.zlttyepe), 
                        t.getVote();
                    }), Promise.resolve(e.data.data);
                }
            });
        });
    },
    onShow: function() {
        var e = this, a = t.getCurrentPage().options;
        console.log(a);console.log(111111);
        var n = a.fopenid, i = decodeURIComponent(a.scene);
        if (console.log("scene场景值:" + i), "undefined" !== i) this.getScene(i); else "undefined" == n ? (console.log(22), 
        e.getVote()) : a.fopenid ? (console.log(33), e.setData({
            inviteOpenId: a.fopenid,
            exhibitionId: a.id,
            source: a.source,
            zlttype: a.zlttype
        }, function() {
            console.log(44);
            a.fopenid && a.fopenid;
            wx.setStorageSync("inviteOpenId", a.fopenid), wx.setStorageSync("exhibitionId", a.id), 
            wx.setStorageSync("source", a.source), wx.setStorageSync("zlttype", a.zlttype), 
            e.getVote();
        })) : wx.getStorageSync("exhibitionId") && e.getVote();
    },
    getVote: function(e) {
        var t = this;
        this.authorization();
        var a = wx.getStorageSync("exhibitionId"), n = wx.getStorageSync("user").openid;
        wx.login({
            success: function(e) {
                wx.showLoading({
                    title: "加载中",
                    mask: !0
                }), wx.request({
                    url: getApp().globalData.publicUrl + "/Exhibition/exhibitionDetailWX",
                    data: {
                        business_no: "ZhanLeTaoWeChat",
                        openid: n,
                        id: a
                    },
                    method: "POST",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(e) {
                        console.log(e.data);
                        e.data.examine;
                        var a = "";
                        if (1 == e.data.examine.isExamine && (console.log(1), a = e.data.examine.uname), 
                        e.data.data.longtime < 0) n = "已开展"; else if (0 == e.data.data.longtime) n = "开展中"; else var n = e.data.data.longtime + "天";
                        if (null != e.data.describe && "" != e.data.describe) i = e.data.describe.replace(/<br\/>/g, "\n"); else var i = "";
                        if (null != e.data.range && "" != e.data.range) o = e.data.range.replace(/<br\/>/g, "\n"); else var o = "";
                        if (null != e.data.previousreview && "" != e.data.previousreview) s = e.data.previousreview.replace(/<br\/>/g, "\n"); else var s = "";
                        if (null == e.data.exPosition.biaozhan && null == e.data.exPosition.guangdi) {
                            console.log(2);
                            var r = !0, c = !1;
                        } else {
                            console.log(1);
                            var r = !1, c = !0;
                        }
                        console.log(e.data.exPosition.biaozhan), t.setData({
                            merchantDispay: r,
                            introduceDispay: c,
                            moreExPositions: e.data.moreExPositions,
                            exhibitionName: e.data.data.name,
                            exhibitionThumbnail: e.data.data.thumbnail,
                            average: e.data.data.average,
                            positionCount: e.data.data.positionCount,
                            minPrice: e.data.data.minPrice,
                            minarea: e.data.data.minarea,
                            stime: e.data.exhibition_basic.info.stime,
                            address: e.data.exhibition_basic.address,
                            pid: e.data.exhibition_basic.info.pid,
                            chosts: e.data.exhibition_basic.chosts,
                            exPosition_biao: e.data.exPosition.biaozhan,
                            exPosition_guang: e.data.exPosition.guangdi,
                            describe: i,
                            range: o,
                            previousreview: s,
                            exhibitionTime: n,
                            exhibitioncollect: e.data.iscollect,
                            isExamine: e.data.examine.isExamine,
                            isOverTime: e.data.isOverTime,
                            uname: a,
                            phone: e.data.ZLTPhone,
                            bonus: e.data.bonus,
                            pricedanwei: e.data.data.pricedanwei,
                            areadanwei: e.data.data.areadanwei
                        }, function() {
                            wx.hideLoading();
                        });
                    },
                    fail: function() {
                        wx.hideLoading();
                    }
                });
            }
        });
    },
    onLoad: function(e) {
        console.log(e);
        var t = decodeURIComponent(e.scene);
        console.log(t);
    },
    shareGetUserInfo: function(a) {
        wx.setStorageSync("shareType", 2);
        t.autoLogin(e, a, this, "../share/share");
    },
    serviceGetUserInfo: function(a) {
        t.autoLogin(e, a, this, "../service/service");
    },
    collectGetUserInfo: function(a) {
        t.autoLogin(e, a, this, "../details/details");
    },
    signUpGetUserInfo: function(a) {
        t.autoLogin(e, a, this, "../signUp/signUp");
    },
    ticketGetUserInfo: function(a) {
        if (1 == that.data.isExamine) {
            wx.setStorageSync("uname", that.data.uname);
            t.autoLogin(e, a, this, "../ticket/ticket");
        }
    },
    buyGetUserInfo: function(a) {
        t.autoLogin(e, a, this, "../buy/buy");
    },
	redpackageimagestate:function(){
		this.setData({
			redpackageimagestate:'none',
		});
	},
	redpackageimage:function(){
		wx.navigateTo({
            url: "../redpackage/redpackage"
        })
	}
});