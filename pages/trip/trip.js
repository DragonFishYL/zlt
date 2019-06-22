//index.js
//获取应用实例
const app = getApp();
var common = require('../../utils/util.js');

Page({
  data: {
    triparr: null,
    userName: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.setStorageSync("shareType", 4); //分享类型 1展位 2展会 3无,自然搜索(默认) 4行程
    //请求
    wx.showLoading({ title: '加载中', });
    var t = this;
    wx.request({
      url: app.globalData.publicUrl + '/Trip/tripList',
      data: { 'business_no': app.globalData.business_no, 'openid': this.data.openId },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        //将行程数据赋值
        t.setData({ triparr: res.data.data });
        //关闭提示
        wx.hideLoading();
      }
    });
  },
})