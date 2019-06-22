const app = getApp()
Page({
  data: {
    oid: null,
    openid: 123,
    orderList: [],
    trip: [],
    userList: [],
    userLength:0,
    trueprice: null,
    xtype: null,
    payway: null,
  },
  onLoad: function (e) {
    var t = this;
    //准备行程参数
    t.setData({ oid: e.oid, openid: app.globalData.openId });
    wx.showLoading({ title: '加载中', });
    wx.request({
      url: app.globalData.publicUrl + '/Trip/tripOrderDetail',
      data: { 'business_no': app.globalData.business_no, 'openid': t.data.openid, 'oid': t.data.oid },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(r) {
        //关闭提示
        wx.hideLoading();
        if (r.statusCode == 200){
          if (r.data.status == 1){
            console.log(r.data.data);
            var xtype;
            if (r.data.data.trip.xtype == 1) {
              xtype = '商务团';
            } else if (r.data.data.trip.xtype == 2) {
              xtype = '游学团';
            } else if (r.data.data.trip.xtype == 3) {
              xtype = '展会团';
            }
            t.setData({
              trip: r.data.data.trip,
              trueprice: r.data.data.trueprice,
              userList: r.data.data.user,
              xtype: xtype,
              userLength: r.data.data.user.length,
              payway: r.data.data.payway,
            })

            if (r.data.data.orderList){
              t.setData({
                orderList: r.data.data.orderList,
              })
            }
            
          }
        }
        
      }
    })
  }


})