var e = getApp(), t = (require("../../wxParse/wxParse.js"), require("../../utils/util.js"));

require("../../utils/canvas.js");

Page({
    data: {
		address:'',
		people:'',
		code:'',
		phone:'',
		id:'',
		multiArray: [],
		objectMultiArray: [],
		garr:[],
		harr:[],
		aarr:[],
		aid:'',
		aindex:'',
		bid:'',
		bindex:'',
		cid:'',
		cindex:'',
		multiIndex: [0, 0, 0]
    },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
	this.cityrebackid(e.detail.column,e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
	var garr = this.data.garr,harr = this.data.harr;
	console.log(data);
    switch (e.detail.column) {
      case 0:
		switch (data.multiIndex[0]) {
			case e.detail.value:
				data.multiArray[1] = garr[e.detail.value][0];
				data.multiArray[2] = garr[e.detail.value][1];
				break;
		}
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
			switch (data.multiIndex[0]) {
				case e.detail.value:
					switch (data.multiIndex[1]) {
						case e.detail.value:
							data.multiArray[2] = harr[e.detail.value][e.detail.value];
							break;
					}
				break;
			}
        data.multiIndex[2] = 0;
        console.log(data.multiIndex);
        break;
    }
    this.setData(data);
  },
  //通过选择胡下标返回id
  cityrebackid:function(type,index){
	  var aarr = this.data.aarr;
	  if(type == 0){
		  this.setData({
			  aid:aarr[index]['id'],
			  aindex:index,
			  bid:aarr[index]['city'][0]['id'],
			  bindex:0,
			  cid:aarr[index]['city'][0]['area'][0]['id'],
			  cindex:0
		  });
	  }else if(type == 1){
		  var aindex = this.data.aindex;
		  this.setData({
			  bid:aarr[aindex]['city'][index]['id'],
			  bindex:index,
			  cid:aarr[aindex]['city'][index]['area'][0]['id'],
			  cindex:0
		  });
	  }else if(type == 2){
		  var aindex = this.data.aindex,bindex = this.data.bindex;
		  this.setData({cid:aarr[aindex]['city'][bindex]['area'][index]['id'],cindex:index});
	  }
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
	addresstap:function(event){
		this.setData({
			address:event.detail.value
		});
	},
	phonetap:function(event){
		this.setData({
			phone:event.detail.value
		});
	},
	peopletap:function(event){
		this.setData({
			people:event.detail.value
		});
	},
	codetap:function(event){
		this.setData({
			code:event.detail.value
		});
	},
    addressDetailSave: function(b) {
		var that = this;
		// console.log(this.data.cid);return false;
		//请求
		wx.showLoading({ title: '加载中', });
		var d = {'id':b.currentTarget.dataset.id,'address':that.data.address,'people':that.data.people,'phone':that.data.phone,'code':that.data.code,'type':2,'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid,'cid':this.data.cid};
		wx.request({
			url:e.globalData.publicUrl + '/Trip/billaddress_save',
			data:d,
			method:'POST',
			header:{
				'content-type': 'application/x-www-form-urlencoded' // 默认值
			},
			success:function(res){
				//关闭提示
				wx.hideLoading();
				if(res.data.status == 1){
					wx.showToast({
					   title: '修改成功',
					   icon: 'success',
					   duration: 2000,
					   mask:true
					});
					setTimeout(function() {
						wx.redirectTo({
							url: "../addressupdate/addressupdate?id="+b.currentTarget.dataset.id
						});
					}, 2000);
				}else{
					wx.showToast({
					   title: '修改失败,请重新修改',
					   icon: 'none',
					   duration: 2000,
					   mask:true
					});
				}
			}
		});
        
    },
    onLoad: function(d) {
        this.authorization();
		//请求
		wx.showLoading({ title: '加载中'});
		var t = this;
		wx.request({
		  url: e.globalData.publicUrl + '/Trip/billaddressPlay',
		  data: { 'business_no': e.globalData.business_no, 'openid': wx.getStorageSync("user").openid ,'id':d.id},
		  method: 'POST',
		  header: {
			'content-type': 'application/x-www-form-urlencoded' //默认值
		  },
		  success:function(res){
			//将发票列表数据赋值
		    console.log(res);
			t.setData({
				address:res.data.data.address,
				people:res.data.data.people,
				code:res.data.data.code,
				phone:res.data.data.phone,
				id:res.data.data.id,
				multiArray:res.data.multiArray,
				objectMultiArray:res.data.objectMultiArray,
				aarr:res.data.aarr,
				garr:res.data.garr,
				harr:res.data.harr,
				multiIndex:res.data.multiIndex,
				aindex:res.data.aindex,
				bindex:res.data.bindex,
				cindex:res.data.cindex,
				cid:res.data.cid
			});
			//关闭提示
			wx.hideLoading();
		  }
		});
    }
});