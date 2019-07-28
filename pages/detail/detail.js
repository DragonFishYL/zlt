var e = getApp(), t = require("../../utils/util.js"), n = (require("../../wxParse/wxParse.js"), 
void 0), o = void 0;
Page({
  data: {
    authSetting:'',
	userInfo:'',
	hasUserInfo:!1,
    id:'',
    oid:'',
    openid:'',
    title: '',
    xtype:'',
    exhibitionObj: {},
    thumbnail: '',
    setime: '',
    xprice: '',
    xnum: '',
    bonus: '',
    special: '',
    focus: '',
    reairplean: '',
    rehotel: '',
    fee: '',
    notfee: '',
    triparrange: {},
    inviteOpenId: '',
    source: '',
    zlttype: '',
    canIUse: '',
    status: ''
  },
  onLoad: function (d) {
	console.log(e);
	var t = decodeURIComponent(e.scene);
    this.authorization();
	var n = wx.getStorageSync("user").openid;
	wx.setStorageSync("tripid",d.id);
    //判断是否授权
    this.setData({ authSetting: e.globalData.authSetting?e.globalData.authSetting:wx.getStorageSync("user").openid, id: d.id });
    wx.showLoading({ title: '加载中', });
    //请求展会详情数据API
    var t = this;
    wx.request({
      url: e.globalData.publicUrl + '/Trip/tripDetail',
      data: { 'business_no': e.globalData.business_no, 'openid': n,'tripid':this.data.id},
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(r) {
        //关闭提示
        wx.hideLoading();
        var xtype = null;
        if (r.data.data.xtype == 1){
          xtype = '商务团';
        } else if (r.data.data.xtype == 2) {
          xtype = '游学团';
        } else if (r.data.data.xtype == 3) {
          xtype = '展会团';
        }
        t.setData({
          title:r.data.data.title,
          xtype: xtype,
          exhibitionObj: r.data.data.exhibition,
          thumbnail: r.data.data.thumbnail,
          setime: r.data.data.setime,
          xprice: r.data.data.xprice,
          xnum: r.data.data.xnum,
          bonus: r.data.data.bonus,
          special: r.data.data.special,
          focus: r.data.data.focus,
          reairplean: r.data.data.reairplean,
          rehotel: r.data.data.rehotel,
          fee: r.data.data.fee,
          notfee: r.data.data.notfee,
          triparrange: r.data.data.triparrange
        })
      }
    })
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
                        tripid: a.id,
                        source: a.source,
                        zlttype: a.zlttyepe
                    }, function() {
                        a.fopenid && a.fopenid;
                        wx.setStorageSync("inviteOpenId", a.fopenid), wx.setStorageSync("tripid", a.id), 
                        wx.setStorageSync("source", a.source), wx.setStorageSync("zlttype", a.zlttyepe), 
                        t.getVote();
                    }), Promise.resolve(e.data.data);
                }
            });
        });
    },
    getVote: function(e) {
        var t = this;
        this.authorization();
        var a = wx.getStorageSync("tripid"), n = wx.getStorageSync("user").openid;
        wx.login({
            success: function(e) {
                
            }
        });
    },
  onShow: function() {
	var e = this, a = t.getCurrentPage().options;
	console.log(a);
	var n = a.fopenid, i = decodeURIComponent(a.scene);
	if (console.log("scene场景值:" + i), "undefined" !== i) this.getScene(i); else "undefined" == n ? (console.log(22), 
	e.getVote()) : a.fopenid ? (console.log(33), e.setData({
		inviteOpenId: a.fopenid,
		tripid: a.id,
		source: a.source,
		zlttype: a.zlttype
	}, function() {
		console.log(44);
		a.fopenid && a.fopenid;
		wx.setStorageSync("inviteOpenId", a.fopenid), wx.setStorageSync("tripid", a.id), 
		wx.setStorageSync("source", a.source), wx.setStorageSync("zlttype", a.zlttype), 
		e.getVote();
	})) : wx.getStorageSync("tripid") && e.getVote();
  },
  bindGetUserInfo:function(b){
    console.log(b);
    var t = this;
    //开始弹出框授权    
    wx.getUserInfo({
      scope: 'scope.userInfo',
      success(s) {
        // 用户已经同意小程序使用用户信息功能，后续调用 wx.login 接口不会弹窗询问
        //判断是否登录
        wx.login({
          success(res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: e.globalData.publicUrl + '/Common/zltLoginWX',
                data: {
                  code: res.code,
                  business_no: e.globalData.business_no,
                  type: 1,
                  source: 3,
                  zlttype: 4,
                  id: t.data.id,
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
                },
                success(r) {
                  console.log(r);
                  //更新globalData的oppenId
                  e.globalData.openId = r.data.openid;
                  wx.setStorageSync('openid', r.data.openid);
                  //跳转至下单页面
                  wx.navigateTo({
                    url: '../pay/pay?id='+t.data.id,
                  })
                },
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
      },
      fail(f){

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
        n = n || "4";
        var i = e.data.id;
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
    goPage: function(e) {
        var a = e.currentTarget.dataset.url;
        t.goPage(a);
    },
  toexhibition:function(){
    //跳转至展会详情页面
	wx.setStorageSync("exhibitionId", this.data.exhibitionObj.id), wx.redirectTo({
		url: "../details/details"
	});
  },
  viewTripOrder:function(){
    //跳转至下单页面
    wx.navigateTo({
      url: '../pay/pay?id=' + this.data.id,
    })
  },
  sendfriend:function(){
    //跳转至分享页面
    wx.navigateTo({
      url: '../share/share?id=' + this.data.id,
    })
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
		t.autoLogin(e, n, this, "../person/person");
	},
	ticketGetUserInfo: function(n) {
		t.autoLogin(e, n, this, "../ticket/ticket");
	},
	searchUserInfo: function(n) {
		t.autoLogin(e, n, this, "../search/search");
	}
})