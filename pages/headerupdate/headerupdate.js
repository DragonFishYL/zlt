var e = getApp(), t = (require("../../wxParse/wxParse.js"), require("../../utils/util.js"));

require("../../utils/canvas.js");

Page({
    data: {
		billheader:'',
		array1: ['--请选择--','个人', '企业'],
		objectArray1: [
		  {
			id: 0,
			name: '--请选择--'
		  },
		  {
			id: 1,
			name: '个人'
		  },
		  {
			id: 2,
			name: '企业'
		  }
		],
		index1:1,
		array2: ['--请选择--','增值税普通发票'],
		objectArray2: [
		  {
			id: 0,
			name: '--请选择--'
		  },
		  {
			id: 1,
			name: '增值税普通发票'
		  }
		],
		index2:1,
		id:''
    },
    bindPickerChange: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
		  index1: e.detail.value
		})
    },
    bindPickerChanges: function (e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
		  index2: e.detail.value
		})
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
    goPage: function(t) {
        var n = t.currentTarget.dataset.url;
        e.goPage(n);
    },
    headerDetailSave: function(b) {
		console.log(b);
		var billId = b.currentTarget.dataset.id;
        
    },
    onLoad: function(d) {
        this.authorization();
		//请求
		wx.showLoading({ title: '加载中', });
		var t = this;
		wx.request({
		  url: e.globalData.publicUrl + '/Trip/billheadPlay',
		  data: { 'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid ,'billId':d.id},
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' // 默认值
		  },
		  success:function(res){
			//将发票列表数据赋值
		    console.log(res);
			t.setData({
				billheader:res.data.data.billheader,
				index1:res.data.data.opentype,
				index2:res.data.data.billtype,
				id:res.data.data.id,
			});
			//关闭提示
			wx.hideLoading();
		  }
		});
    }
});