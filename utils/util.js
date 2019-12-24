function e(e, o) {
    var t = "";
    o && (t = "?openId=" + o.openId), wx.navigateTo({
        url: e + t
    });
}

function o(e) {
    return e.replace(/[^\u0000-\u00ff]/g, "aa").length;
}

var t = function(e) {
    return (e = e.toString())[1] ? e : "0" + e;
};

module.exports = {
    formatTime: function(e) {
        var o = e.getFullYear(), r = e.getMonth() + 1, n = e.getDate(), a = e.getHours(), c = e.getMinutes(), s = e.getSeconds();
        return [ o, r, n ].map(t).join("/") + " " + [ a, c, s ].map(t).join(":");
    },
    goPage: e,
    autoLogin: function(o, t, r, n) {
        t.detail.userInfo ? (o.globalData.userInfo = t.detail.userInfo, wx.setStorageSync("userInfo", t.detail.userInfo), 
        o.globalData.userInfo ? r.setData({
            userInfo: o.globalData.userInfo,
            hasUserInfo: !0
        }) : r.data.canIUse && (o.userInfoReadyCallback = function(e) {
            r.setData({
                userInfo: e.userInfo,
                hasUserInfo: !0
            }), wx.setStorageSync("userInfo", e.userInfo);
        }), wx.login({
            success: function(o) {
                var a = o.code, c = r.data.inviteOpenId;
                c = c || "";
                var s = r.data.source;
                s = s || "3";
                var i = r.data.zlttype;
                i = i || "";
				if(i == 4){
					var u = r.data.exhibitionId;
				}else{
					var u = wx.getStorageSync("tripid");
				}
                
                 console.log(c), console.log(s), console.log(i),console.log(u), wx.request({
                    url: "https://fairso.com/Common/zltLoginWX",
                    data: {
                        business_no: "ZhanLeTaoWeChat",
                        code: a,
                        type: "1",
                        fopenid: c,
                        source: s,
                        zlttype: i,
                        id: u
                    },
                    method: "POST",
                    header: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function(o) {
                        console.log(o.data), wx.setStorageSync("user", {
                            openid: o.data.openid,
                            status: o.data.status
                        }), r.setData({
                            userInfo: t.detail.userInfo,
                            hasUserInfo: !0,
                            openId: o.data.openid
                        });
                        var a = {
                            openId: o.data.openid
                        };
                        e(n, a);
                    }
                });
            }
        })) : wx.showModal({
            title: "提示",
            content: "非速搜需要使用您的基本资料进行登录，为确保正常使用请允许！",
            success: function(e) {}
        });
    },
    getPageOpenId: function() {
        var e = getCurrentPages(), o = e[e.length - 1], t = o.route;
        return console.log(t), o.options.openId;
    },
    getCurrentPage: function() {
        var e = getCurrentPages();
        console.log(e);
        var o = e[e.length - 1];
        return console.log(o), o;
    },
    Base64: function() {
        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        this.encode = function(t) {
            var r, n, a, c, s, i, u, d = "", f = 0;
            for (t = o(t); f < t.length; ) c = (r = t.charCodeAt(f++)) >> 2, s = (3 & r) << 4 | (n = t.charCodeAt(f++)) >> 4, 
            i = (15 & n) << 2 | (a = t.charCodeAt(f++)) >> 6, u = 63 & a, isNaN(n) ? i = u = 64 : isNaN(a) && (u = 64), 
            d = d + e.charAt(c) + e.charAt(s) + e.charAt(i) + e.charAt(u);
            return d;
        }, this.decode = function(o) {
            var r, n, a, c, s, i, u = "", d = 0;
            for (o = o.replace(/[^A-Za-z0-9\+\/\=]/g, ""); d < o.length; ) r = e.indexOf(o.charAt(d++)) << 2 | (c = e.indexOf(o.charAt(d++))) >> 4, 
            n = (15 & c) << 4 | (s = e.indexOf(o.charAt(d++))) >> 2, a = (3 & s) << 6 | (i = e.indexOf(o.charAt(d++))), 
            u += String.fromCharCode(r), 64 != s && (u += String.fromCharCode(n)), 64 != i && (u += String.fromCharCode(a));
            return u = t(u);
        };
        var o = function(e) {
            e = e.replace(/\r\n/g, "\n");
            for (var o = "", t = 0; t < e.length; t++) {
                var r = e.charCodeAt(t);
                r < 128 ? o += String.fromCharCode(r) : r > 127 && r < 2048 ? (o += String.fromCharCode(r >> 6 | 192), 
                o += String.fromCharCode(63 & r | 128)) : (o += String.fromCharCode(r >> 12 | 224), 
                o += String.fromCharCode(r >> 6 & 63 | 128), o += String.fromCharCode(63 & r | 128));
            }
            return o;
        }, t = function(e) {
            for (var o = "", t = 0, r = c1 = c2 = 0; t < e.length; ) (r = e.charCodeAt(t)) < 128 ? (o += String.fromCharCode(r), 
            t++) : r > 191 && r < 224 ? (c2 = e.charCodeAt(t + 1), o += String.fromCharCode((31 & r) << 6 | 63 & c2), 
            t += 2) : (c2 = e.charCodeAt(t + 1), c3 = e.charCodeAt(t + 2), o += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3), 
            t += 3);
            return o;
        };
    },
    getChairLength: o,
    getChairIndex: function(e, t) {
        for (var r = [], n = "", a = "", c = 0, s = 0; s < e.length; s++) (c += o(e[s])) <= t ? n += e[s] : a += e[s];
        return r.push(n), r.push(a), r;
    }
};