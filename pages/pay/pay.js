const app = getApp()
var interval = null //倒计时函数
Page({
  data: {
    items: [
      { name: '全额支付', checked: true, value: '1'},
      { name: '分期付款', checked: false, value: '2'}
    ],
    selectArray: [{
      "id": "10",
      "text": "20%",
    }, {
      "id": "11",
      "text": "30%"
    }, {
      "id": "12",
      "text": "40%"
    }, {
      "id": "13",
      "text": "50%"
    }],
    selectArray2: [{
      "id": "14",
      "text": "3"
    }, {
      "id": "15",
      "text": "6"
    }, {
      "id": "16",
      "text": "9"
    }, {
      "id": "17",
      "text": "12"
    }],
    depositRate: null,
    stageMonth: null,
    hiddenName: true,
    payway: 1,
    totalPrice: null,
    id:null,
    title: null,
    setime: null,
    xprice:  null,
    xnum: null,
    xtype: null,
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
    array: ['身份证', '护照', '驾照'],
    tripuser: [],
    openid:null,
    ctuid:null,
  },
  onLoad: function (options) {
    //控制我的变量名初始值以及切换的值
    hiddenName: (options.hiddenName == "true" ? true : false)
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
    t.setData({ id: e.id,openid:app.globalData.openId });
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

        t.setData({
          title:r.data.data.title,
          xtype: xtype,
          setime: r.data.data.setime,
          xprice: r.data.data.xprice,
          xnum: r.data.data.xnum,
          linker: r.data.data.linker,
          tripuser: r.data.data.tripuser
        })

        //参团人员ctuid
        if (r.data.data.tripuser) {
          t.dealCtuid(r.data.data.tripuser);
        }
      }
    })
  },
  checkboxChange(e) {
    //console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  //获取验证码
  getCode: function (options) {
    var that = this;
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
    var type = e.currentTarget.dataset.type;
    this.setData({ select: false, atype: type });
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
          t.dealCtuid(t.data.tripuser);
        }
      }
    })
  },
  //选择付款方式
  radioboxPayType:function(e){
    //console.log(e);
  },
  //处理参团人员ctuid
  dealCtuid:function(ctuidArr){
    var tripuserStr = '';
    var t = this;
    for (let i = 0; i < ctuidArr.length; i++) {
      tripuserStr += ctuidArr[i]['id'] + ',';
    }
    var totalPrice = t.data.xprice * ctuidArr.length;
    t.setData({
      ctuid: tripuserStr,
      totalPrice: totalPrice.toFixed(2)
    })
  },
  //提交订单
  submitOrder: function () {
    var t = this;
    if (t.data.payway == 2 && (!t.data.depositRate || !t.data.stageMonth)){
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
  
})