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
		commisions1:'block',
		commisions2:'block',
		commisions3:'block',
        commisionarr: [],
		color:{
			0:'#07c160',
			1:'#333',
			2:'#333',
			3:'#333'
		},
		onelist:'',
		twolist:'',
		title1:'最新待领取',
		title2:'最新领取记录',
        openId: ""
    },
	commisionsaction:function(d){
		var id = d.target.dataset.id,that = this;
		console.log(id);
		wx.request({
		  url: t.globalData.publicUrl + '/Trip/foreastRedWX',
		  data: { 'business_no': t.globalData.business_no, 'openid': wx.getStorageSync("user").openid,'id':id},
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' // 默认值
		  },
		  success:function(res){
			console.log(res);  
			if(res.data.status == 1){
				var scenes = wx.getLaunchOptionsSync()//获取场景代码
				if (scenes.scene == 1036 || scenes.scene == 1017 || scenes.scene == 1089 || scenes.scene == 1047 || scenes.scene == 1011 || scenes.scene == 1025 || scenes.scene == 1124){
				// if (scenes.scene >= 1001 && scenes.scene <= 1104){
					//that.getredpacket()
					var data = res.data.data;console.log(data);
					wx.sendBizRedPacket({
						timeStamp: data.timeStamp, // 支付签名时间戳，
						nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
						package: data.package, //扩展字段，由商户传入
						signType: data.signType, // 签名方式，
						paySign: data.paySign, // 支付签名
						success:function(res){
							console.log(res);
							wx.request({
							  url: t.globalData.publicUrl + '/Trip/updateredWX',
							  data: { 'id':id},
							  method: 'POST',
							  header: {
								'content-type': 'application/x-www-form-urlencoded' // 默认值
							  },
							  success:function(res){
								console.log(res);  
								wx.showToast({
									title: "领取成功",
									icon: "success",
									duration: 2e3,
									success: function() {
										setTimeout(function() {
											//that.onload();//更新当前页面
											wx.redirectTo({
												url: "../redpackage/redpackage"
											});
										}, 2e3);
									}
								}); 
								
							  }	
							})
							
						},
						fail:function(res){
							console.log(res);
						},
						complete:function(res){
							console.log(res);
						}
					})
				}
			}
		  }
		});
	},
	commisionsdetail:function(d){
		wx.navigateTo({
			url:"../commisionsdetail/commisionsdetail?id="+d.target.dataset.id
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
	publicFunc:function(type){//1全部 2已支付 3未支付 4已取消
		var that = this;
		wx.request({
		  url: t.globalData.publicUrl + '/Trip/v3redpackagelist',
		  data: { 'business_no': t.globalData.business_no, 'openid': wx.getStorageSync("user").openid,'type':type},
		  method: 'POST',
		  header: {
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
				if(type == 1){
					//将行程数据赋值
					that.setData({
						one:res.data.data.one,
						two:res.data.data.two,
						three:res.data.data.three,
						onelist:res.data.data.onelist,
						twolist:res.data.data.twolist,
						title1:'最新待领取',
						title2:'最新领取记录',
						commisions1:'block',
						commisions2:'block',
						commisions3:'block'
					});
				}else if(type == 2){
					//将行程数据赋值
					that.setData({
						onelist:res.data.data.onelist,
						commisions1:'none',
						commisions2:'block',
						title1:'所有待领取红包',
						commisions3:'none',
					});
				}else if(type == 3){
					//将行程数据赋值
					that.setData({
						twolist:res.data.data.onelist,
						commisions1:'none',
						commisions2:'none',
						title2:'所有领取中红包',
						commisions3:'block',
					});
				}else if(type == 4){
					//将行程数据赋值
					that.setData({
						twolist:res.data.data.onelist,
						commisions1:'none',
						commisions2:'none',
						title2:'所有已领取红包',
						commisions3:'block',
					});
				}
			}else{
				wx.showToast({
					title: res.data.message,
					icon: 'none',
					duration: 3000
				})
			}
		  }
		});
	},
	ordermodel:function(o){
		console.log(o);
        var a = o.currentTarget.dataset.type,colors=this.data.color;
		//请求
		wx.showLoading({ title: '加载中', });
		colors[0] = '#333';
		colors[1] = '#333';
		colors[2] = '#333';
		colors[3] = '#333';
		colors[a-1] = '#07c160';
		this.setData({
            color:colors
        });
		this.publicFunc(a);
	},
    goPage: function(t) {
        var n = t.currentTarget.dataset.url;
        e.goPage(n);
    },
    homeGetUserInfo: function(n) {
        e.autoLogin(t, n, this, "../index/index");
    },
    exhibitonGetUserInfo: function(n) {
        e.autoLogin(t, n, this, "../exhibition/exhibition");
    },
	tripGetUserInfo: function(n) {
		t.autoLogin(e, n, this, "../trip/trip");
	},
    personGetUserInfo: function(n) {
        e.autoLogin(t, n, this, "../person2/person2");
    },
    imageLoad: function(t) {
        this.setData({
            canShow: "active"
        });
    },
    onLoad: function() {
		wx.showLoading({ title: '加载中', });
        this.authorization();
		this.publicFunc(1);
    }
});