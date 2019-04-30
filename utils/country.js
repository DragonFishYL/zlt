function t(t) {
    var a = [];
    for (var n in t) {
        var e = t[n].search(/\|/), o = t[n].substring(0, e);
        a.push(o);
    }
    return a;
}

var a = getApp();

module.exports = {
    getCountryData: function() {
        return new Promise(function(n, e) {
            var o = a.globalData.host + "/area/country";
            wx.request({
                url: o,
                success: function(a) {
                    if (a.data.success) return n(t(a.data.datas));
                },
                fail: function(t) {}
            });
        });
    },
    getProvinceData: function() {
        return new Promise(function(n, e) {
            var o = a.globalData.host + "/area/province";
            wx.request({
                url: o,
                success: function(a) {
                    if (a.data.success) return n(t(a.data.datas));
                },
                fail: function(t) {}
            });
        });
    },
    getCityData: function(n) {
        return console.log("马上请求城市接口"), new Promise(function(e, o) {
            var r = a.globalData.host + "/area/city?name=" + encodeURI(n);
            wx.request({
                url: r,
                success: function(a) {
                    if (console.log("城市数据原始状态"), console.log(a), a.data.success) return e(t(a.data.datas));
                },
                fail: function(t) {
                    console.log("错误信息"), console.log(t);
                }
            });
        });
    }
};