const app = getApp()
var interval = null //倒计时函数
Page({
  data: {
    items: [
      { name: '全额支付', checked: true, value: '1'},
      { name: '分期付款', checked: false, value: '2'}
    ],
    selectArray: [ {
      "id": "13",
      "text": "50%"
    }],
    selectArray2: [{
      "id": "14",
      "text": "2"
    }],
    depositRate: null,
    stageMonth: null,
    hiddenName: true,
    payway: 1,
    totalPrice: null,
    id:null,
    oid:null,
    title: null,
    setime: null,
    xprice:  null,
    xnum: null,
    xtype: null,
    ftype: null,
    linker:null,
    leastNum:'3',
    ename: null,
    eid: null,
    etype: null,
    evalue: null,
    aname: null,
    atype: 1,
    avalue: null,
    fun_id: 2,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    flag: true,//显示隐藏修改人员弹窗弹窗
    edFlag:true,
    adFlag:true,
    subphone:'',
    subcode:'',
    subname:'',
    array: ['身份证', '护照', '驾照'],
	defaultname:'护照',
    tripuser: [],
    tripusered: '',
    openid:null,
    ctuid:null,
	contract: [app.globalData.publicUrl+'/Public/Home/images/zlt_buycontract1.png',
		app.globalData.publicUrl+'/Public/Home/images/zlt_buycontract2.png'
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
  onMyEvent: function (e) {
    //通过事件接收
    var details = e.detail;
    if (details.nowName == 'depositRate'){
      details.nowText = details.nowText.replace('%','');
    }
    this.setData({
      [details.nowName]: details.nowText,
    })
  },
  //切换选项
  changePay: function (e) {
    var t = this;
    t.setData({ payway: e.detail.value })
    if (e.detail.value == '1') {
      this.setData({
        hiddenName: true
      })
    } else if (e.detail.value == '2') {
      this.setData({
        hiddenName: !this.data.hiddenName
      })
    }

  },
  onLoad: function (e) {
    var t = this;
	  //准备行程参数
    t.setData({ id: e.id,openid:wx.getStorageSync("user").openid});
    wx.showLoading({ title: '加载中', });
  	//请求展会详情数据API
    wx.request({
      url: app.globalData.publicUrl + '/Trip/viewOrder',
      data: { 'business_no': app.globalData.business_no, 'openid': t.data.openid,'tripid':t.data.id},
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

		if(r.data.oid){
			t.setData({oid:r.data.oid});
		}
        t.setData({
          title:r.data.data.title,
          xtype: xtype,
          setime: r.data.data.setime,
          ftype: r.data.data.ftype,
          xprice: r.data.data.xprice,
          totalPrice: r.data.data.xprice,
          xnum: r.data.data.xnum,
          linker: r.data.data.linker,
          tripuser: r.data.data.tripuser
        })

        //参团人员ctuid
        if (r.data.data.tripuser) {
          t.dealCtuid(r.data.data.tripuser,1);
        }
		
		//是否存在分期付款
		if(r.data.data.ftype == 1){
			t.setData({
				items:[
				  { name: '全额支付', checked: true, value: '1'},
				  { name: '分期付款', checked: false, value: '2'}
				]
			});
		}else{
			t.setData({
				items:[
				  { name: '全额支付', checked: true, value: '1'}
				]
			});
		}
		
      }
    })
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
	var t = this,d = e.detail.value;
	wx.request({
      url: app.globalData.publicUrl + '/Trip/viewUserChecked',
      data: { 'business_no': app.globalData.business_no, 'openid': t.data.openid,'d':d},
      method: 'POST',
      header: { 
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(r) {
		t.setData({
		   tripusered: r.data.userlist,
		});
		//参团人员ctuid
        t.dealCtuid(r.data.userlist,2);
	  }
	})
  },

	//获取手机号和验证码
	subphone: function (e) {
		this.setData({ subphone: e.detail.value });
	},
	subcode: function (e) {
		this.setData({ subcode: e.detail.value });
	},
	subname: function (e) {
		this.setData({ subname: e.detail.value });
	},
  //获取验证码
  getCode: function (options) {
    var that = this;
	//请求获取验证码API
    var d = {'business_no': app.globalData.business_no, 'openid': that.data.openid,'phone':that.data.subphone};
    wx.showLoading({ title: '加载中', });
	wx.request({
      url: app.globalData.publicUrl + '/Common/zltLoginSmsWX',
      data: d,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(r) {
		  wx.showToast({
			title: r.data.message,
			icon: 'none',
			duration: 2000,
			mask:true
		  });
	  }
	});
	//关闭提示
	wx.hideLoading();
	
    var currentTime = that.data.currentTime
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    this.getCode();
    var that = this
    that.setData({
      disabled: true
    })
  },
  //保存联系人
  savelinker:function(){
	  var that = this;
	//请求获取验证码API
    var d = {'business_no': app.globalData.business_no, 'openid': that.data.openid,'phone':that.data.subphone,'code':that.data.subcode,'name':that.data.subname};
    
	wx.showLoading({ title: '加载中', });
	wx.request({
      url: app.globalData.publicUrl + '/Trip/savelinker',
      data: d,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(r) {
		  //关闭提示
		  wx.hideLoading();
		  wx.showToast({
			title: r.data.message,
			icon: 'none',
			duration: 2000,
			mask:true
		  });
		  if(r.data.status == 1){
			  that.setData({linker:r.data.data});
		  }
	  }
	});
	//关闭提示
	wx.hideLoading();
  },

//修改参团人员显示弹窗
  changePer: function () {
    this.setData({ flag: false })
  },

  // //修改参团人员关闭弹窗
  sureHide: function () {
    this.setData({ flag: true })
  },
  cancelHide: function () {
    this.setData({ flag: true })
  },
  //编辑参团人员信息，姓名，证件以及号码（显示）
  editInfo: function (e) {
    this.setData({ edFlag: false });
    var that = e.currentTarget.dataset,id=that.id,name=that.name,type=that.type,val=that.val;
    this.setData({ename:name,eid:id,etype:type,evalue:val});
  },
  //执行删除参团人员
  delHide:function(){
	  var that = this,d = {'business_no': app.globalData.business_no, 'openid': that.data.openid,'id':that.data.eid,'ctype':3};
	  wx.showLoading({ title: '加载中', });
    //请求展会详情数据API
    wx.request({
      url: app.globalData.publicUrl + '/Trip/createTripUser',
      data: d,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(r) {
        //关闭提示
        wx.hideLoading();
		wx.showToast({
			title: r.data.message,
			icon: 'none',
			duration: 2000,
			mask:true
		  });
        that.setData({
          tripuser: r.data.tripuser,
          edFlag: true
        })
      }
    });
  },
  ecancelHide: function () {
    this.setData({ edFlag: true });
  },
  bindShowMsg() {
    this.setData({
      select: !this.data.select 
    }) 
  }, 
  mySelect(e) {
    var name = e.currentTarget.dataset.name, type = e.currentTarget.dataset.type;        
    this.setData({ select: false ,etype:type});
  },
  evaluebindinput:function(e){
    this.setData({evalue:e.detail.value});
  },
  enamebindinput: function (e) {
    this.setData({ ename: e.detail.value });
  },
  //编辑参团人员信息，姓名，证件以及号码（隐藏）
  deleHide: function () {
    this.setData({ edFlag: true })
  },
  saveHide: function () {
    var t = this;
    var d = { 'name': t.data.ename, 'type': t.data.etype, 'value': t.data.evalue, 'id': t.data.eid, 'ctype': 2, 'business_no': app.globalData.business_no, 'openid': t.data.openid};
    wx.showLoading({ title: '加载中', });
    //请求展会详情数据API
    wx.request({
      url: app.globalData.publicUrl + '/Trip/createTripUser',
      data: d,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(r) {
        //关闭提示
        wx.hideLoading();
        t.setData({
          tripuser: r.data.tripuser,
          edFlag: true
        })
      }
    })
  },
  //添加参团人员信息，姓名，证件以及号码（显示）
  addInfo: function (e) {
    this.setData({ adFlag: false });
  },
  acancelHide:function(){
    this.setData({ adFlag: true });
  },
  abindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },
  amySelect(e) {
    var type = e.currentTarget.dataset.type,defaultname = e.currentTarget.dataset.defaultname;
    this.setData({ select: false, atype: type,defaultname :defaultname});
  },
  avaluebindinput: function (e) {
    this.setData({ avalue: e.detail.value });
  },
  anamebindinput: function (e) {
    this.setData({ aname: e.detail.value });
  },
  addHide: function () {
    var t = this;
    var d = { 'name': t.data.aname, 'type': t.data.atype, 'value': t.data.avalue, 'ctype': 1, 'business_no': app.globalData.business_no, 'openid': t.data.openid };
    wx.showLoading({ title: '加载中', });
    //请求展会详情数据API
    wx.request({
      url: app.globalData.publicUrl + '/Trip/createTripUser',
      data: d,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(r) {
        //关闭提示
        wx.hideLoading();
        t.setData({
          tripuser: r.data.tripuser,
          adFlag: true
        })
        if (t.data.tripuser){
          t.dealCtuid(t.data.tripuser,2);
        }
      }
    })
  },
  //选择付款方式
  radioboxPayType:function(e){
    //console.log(e);
  },
  //处理参团人员ctuid
  dealCtuid:function(ctuidArr,n){
    var tripuserStr = '';
    var t = this;
    for (let i = 0; i < ctuidArr.length; i++) {
      tripuserStr += ctuidArr[i]['id'] + ',';
    }
	if(n == 2){
		var totalPrice = t.data.xprice * ctuidArr.length;
		t.setData({
		  ctuid: tripuserStr,
		  totalPrice: totalPrice.toFixed(2)
		})
	}else{
		t.setData({
		  ctuid: tripuserStr
		})
	}
    
  },
  viewOrderDetails:function(){
	  wx.navigateTo({
		 url: '../xorderDetail/xorderDetail?oid=' + this.data.oid,
	  });
  },
  //提交订单
  submitOrder: function () {
    var t = this;
	if(!t.data.payway){
		wx.showToast({
		   title: '请选择付款方式',
		   icon: 'loading',
		   duration: 1500,
		   mask:true
		});
		return false;
	}
    if (t.data.payway == 2 && (!t.data.depositRate || !t.data.stageMonth)){
		wx.showToast({
		   title: '请选择付款方式',
		   icon: 'loading',
		   duration: 1500,
		   mask:true
		});
		return false;
    }
	console.log(t.data.tripusered);
	console.log(t.data.ctuid);
	if(!t.data.tripusered){
		wx.showToast({
		   title: '请选择出团人员',
		   icon: 'loading',
		   duration: 1500,
		   mask:true
		});
		return false;
	}
    var jsonData = { 'depositRate': t.data.depositRate, 'stageMonth': t.data.stageMonth, 'payway': t.data.payway, 'totalprice': t.data.totalPrice, 'ctuid': t.data.ctuid, 'tripid': t.data.id, 'business_no': app.globalData.business_no, 'openid': t.data.openid };
    wx.showLoading({ title: '加载中', });
    //请求展会详情数据API
    wx.request({
      url: app.globalData.publicUrl + '/Trip/createOrder',
      data: jsonData,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(m) {
        //关闭提示
        wx.hideLoading();
        if (m.statusCode == 200){
          var status = m.data.status;
          if (status == 1 || status==6){
            wx.navigateTo({
              url: '../xorderDetail/xorderDetail?oid=' + m.data.oid,
            })
          }
        }
      }
    })
  },
  viewOrdercancell:function(){
	  wx.showLoading({ title: '加载中', });
	  var that = this,jsonData = {'business_no': app.globalData.business_no, 'openid': that.data.openid,'oid': that.data.oid};
	  //请求展会详情数据API
	  wx.request({
		  url: app.globalData.publicUrl + '/Trip/xorderCancell',
		  data: jsonData,
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' // 默认值
		  },
		  success(m) {
			//关闭提示
			wx.hideLoading();
			if (m.statusCode == 200){
			  var status = m.data.status;
			  if (status == 1 || status==6){
				wx.navigateTo({
				  url: '../xorderDetail/xorderDetail?oid=' + that.data.oid,
				})
			  }
			}
		  }
	  })
  }
})