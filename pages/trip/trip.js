//index.js
//获取应用实例
var e = getApp(), t = require("../../utils/util.js"), n = (require("../../wxParse/wxParse.js"),
  void 0), o = void 0;

Page({
  data: {
    triparr: [],
    userInfo: '',
    hasUserInfo: !1,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    inviteOpenId: '',
    source: '',
    zlttype: '',
    openId: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
	this.authorization();
    wx.setStorageSync("shareType", 4); //分享类型 1展位 2展会 3无,自然搜索(默认) 4行程
    //请求
    wx.showLoading({ title: '加载中', });
    var t = this;
    wx.request({
      url: e.globalData.publicUrl + '/Trip/tripList',
      data: { 'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success:function(res){
        //将行程数据赋值
       t.setData({triparr:res.data.data});
        //关闭提示
        wx.hideLoading();
      }
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
        n = n || 4;
        var i = e.data.id;
        i = i || "", console.log(t), console.log(a), console.log(n), wx.login({
            success: function(o) {
                var s = o.code;
                wx.request({
                    url: "https://fairso.com/Common/zltLoginWX",
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
                    }
                });
            }
        });
    },
    loginWx: function() {
        var e = this, t = e.data.userInfo.nickName, a = e.data.userInfo.avatarUrl, n = e.data.userInfo.gender, i = e.data.openId, o = "https://fairso.com/Common/zltLoginWX?business_no=ZhanLeTaoWeChat&openid=" + i + "&type=2&nickname=" + t + "&headimgurl=" + a + "&gender=" + n;
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
    goPage: function(e) {
        var a = e.currentTarget.dataset.url;
        t.goPage(a);
    },
	homeGetUserInfo: function(n) {
		t.autoLogin(e, n, this, "../index/index");
	},
	exhibitonGetUserInfo: function(n) {
		t.autoLogin(e, n, this, "../exhibition/exhibition");
	},
	tripGetUserInfo: function(n) {
		t.autoLogin(e, n, this, "../trip/trip");
	},
	personGetUserInfo: function(n) {
		t.autoLogin(e, n, this, "../person2/person2");
	},
})