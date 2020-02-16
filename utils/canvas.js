function e(e, a, t, i, l, r) {
    a.drawImage(e, 48, 40, 80, 80), a.drawImage("../../common/img/logomask.png", 48, 40, 80, 80);
}

function a(e, a, t, i, l, r) {
    a.save(), a.beginPath(), a.arc(l / 2 + t, r / 2 + i, l / 2, 0, 2 * Math.PI, !1), 
    a.closePath(), a.setStrokeStyle("#ffffff"), a.stroke(), a.clip(), a.drawImage(e, t, i, l, r), 
    a.restore();
}

function t(e, a) {
    2 == wx.getStorageSync("shareType") ? (a.save(), a.beginPath(), a.arc(375, 852, 56, 0, 2 * Math.PI, !1), 
    a.setStrokeStyle("#ffffff"), a.closePath(), a.stroke(), a.clip(), a.drawImage(e, 319, 795, 112, 112), 
    a.restore()) : (1 == wx.getStorageSync("shareType") ?(a.save(), a.beginPath(), 
    a.arc(375, 911, 56, 0, 2 * Math.PI, !1), a.setStrokeStyle("#ffffff"), a.closePath(), 
    a.stroke(), a.clip(), a.drawImage(e, 319, 855, 112, 112), a.restore()):4 == wx.getStorageSync("shareType") && (a.save(), a.beginPath(), 
    a.arc(375, 911, 56, 0, 2 * Math.PI, !1), a.setStrokeStyle("#ffffff"), a.closePath(), 
    a.stroke(), a.clip(), a.drawImage(e, 319, 855, 112, 112), a.restore()));
}

var i = require("./util.js");

module.exports = {
    drawInfomation: function(e, a) {
        console.log(a);
        var t = a.name + " (" + a.phone + ")", i = a.title, l = a.setTime, r = a.address, n = a.barcode, o = a.qrcode;
        if (e.setFontSize(26), e.fillText(t, 52, 70), e.fillText(i, 52, 158), e.drawImage("../../common/img/time2.png", 50, 220, 40, 40), 
        e.fillText(l, 108, 250), e.drawImage("../../common/img/place2.png", 50, 312, 40, 40), 
        r.length > 22) {
            var f = r.substring(0, 22), s = r.substring(22);
            e.fillText(f, 108, 338), e.fillText(s, 108, 378);
        } else e.fillText(r, 108, 338);
        e.fillText(n, 190, 550), wx.getImageInfo({
            src: o,
            complete: function(a) {
                console.log(a), e.rect(204, 605, 343, 343), e.setStrokeStyle("#bebebe"), e.drawImage(a.path, 205, 606, 342, 342), 
                e.stroke(), e.draw();
            }
        });
    },
    drawFriendImageInfo: function(e, t, l, r, n) {
        l.setFillStyle("#ffffff"), l.fillRect(0, 0, 750, 600), l.setFillStyle("#000000");
        r.title;
        var o = r.setTime, f = r.zgName, s = r.nickName + "邀请您一起参加",p=r.shareType;
        if (i.getChairLength(s) > 30) {
            var c = (d = i.getChairIndex(s, 30))[0], g = d[1];
            l.setFontSize(40), l.fillText(c, 118, 35), l.fillText(g, 118, 74);
        } else l.setFontSize(40), l.fillText(s, 118, 42);
		if(p == 4){
			var m = r.company,price = r.Parea+'元/人  起',dis = '点击得红包,最高'+r.bonus+'元';
			if (l.setFontSize(31), i.getChairLength(m) > 40) {
				var d = i.getChairIndex(m, 40), p = d[0], w = d[1];
				l.fillText(p, 118, 80), l.fillText(w, 118, 115);
			} else l.fillText(m, 118, 100);
			l.fillText(o, 25, 150), l.setFontSize(50),l.setFillStyle("red"),l.fillText(price, 25, 210), l.drawImage(n[0].path, 0, 230, 750, 250);
			l.setFillStyle('orange'),l.fillRect(0, 490, 750, 100),l.setFontSize(50),l.setFillStyle("#fff"), l.fillText(dis,25,555);
		}else{
		   // null == r.pricedanwei && (r.pricedanwei = "元"), null == r.areadanwei && (r.areadanwei = "m²");
			// var m = r.company;
			// if (l.setFontSize(31), i.getChairLength(m) > 40) {
				// var d = i.getChairIndex(m, 40), p = d[0], w = d[1];
				// l.fillText(p, 118, 80), l.fillText(w, 118, 115);
			// } else l.fillText(m, 118, 100);
			// if (l.drawImage(n[0].path, 0, 122, 750, 330), l.setFontSize(30), l.drawImage("../../common/img/time2.png", 25, 460, 40, 40), 
			// l.fillText(o, 75, 490), l.drawImage("../../common/img/place2.png", 25, 500, 40, 40), 
			// l.fillText(f, 75, 530), 0 != r.Parea && 0 != r.area) {
				// var h = r.Parea + r.pricedanwei + "/" + r.area + r.areadanwei + "起        " + r.dtype + r.discount;
				// l.setFontSize(50), l.setFillStyle("#fc6709"), l.fillText(h, 25, 590);
			// }
			var m = r.company,price = r.Parea+'元/'+ r.area + r.areadanwei+'起',dis = '点击得红包,最高'+r.bonus+'元',discount = r.dtype + r.discount;
			if (l.setFontSize(31), i.getChairLength(m) > 40) {
				var d = i.getChairIndex(m, 40), p = d[0], w = d[1];
				l.fillText(p, 118, 80), l.fillText(w, 118, 115);
			} else l.fillText(m, 118, 100);
			l.fillText(o, 25, 150), l.setFontSize(50),l.setFillStyle("red"),l.fillText(price, 25, 210),l.fillText(discount, 500, 210), l.drawImage(n[0].path, 0, 230, 750, 250);
			l.setFillStyle('orange'),l.fillRect(0, 490, 750, 100),l.setFontSize(50),l.setFillStyle("#fff"),l.fillText(dis,25,555);
        }
        if (r.avatarUrl) x = r.avatarUrl; else var x = r.photo;
        wx.getImageInfo({
            src: x,
            complete: function(e) {
                console.log(e), a(e.path, l, 0, 0, 110, 110), r.avatarUrl ? t.setData({
                    canvasAvatarUrl: e.path
                }, function() {
                    l.draw(!1, t.tabShareImg1);
                }) : t.setData({
                    canvasPhotoUrl: e.path
                }, function() {
                    l.draw(!1, t.tabShareImg1);
                });
            }
        });
    },
    drawQuenImageInfo: function(a, l, r) {
		console.log(l.shareType);
        if (l.avatarUrl) n = l.canvasAvatarUrl; else var n = l.canvasPhotoUrl;
        null == l.pricedanwei && (l.pricedanwei = "元"), null == l.areadanwei && (l.areadanwei = "m²"), 
        null != l.dtype && void 0 != l.dtype && "暂无优惠" != l.dtype || (console.log(66766), 
        l.dtype = "", console.log(l.dtype)), null != l.discount && void 0 != l.discount || (console.log(66766), 
        l.discount = "", console.log(l.discount));
        var o = l.nickName + "邀请您一起参加", f = l.setTime, s = l.zgName;
        if (a.setFontSize(30), a.fillText(o, 138, 60), a.setFontSize(30), a.drawImage("../../common/img/time2.png", 48, 507, 40, 40), 
        a.fillText(f, 105, 540),  
        s.length > 20) {
            var c = s.substring(0, 20), g = s.substring(20);
            a.fillText(c, 105, 582), a.fillText(g, 105, 622);
        } else a.fillText(s, 105, 592);
        var m = l.company;
        if (a.setFontSize(31), i.getChairLength(m) > 35) {
            var d = i.getChairIndex(m, 35), p = d[0], w = d[1];
            a.fillText(p, 138, 95), a.fillText(w, 138, 130);
        } else a.fillText(m, 138, 115);
        if (1 == l.shareType) {
            a.drawImage("../../common/img/place2.png", 48, 560, 40, 40),a.drawImage(l.wxBanner, 48, 147, 655, 344);
            var h = l.ZLTPhone;
            if (a.setFontSize(30), a.fillText(h, 48, 640), 0 != l.Parea && "0" != l.area) {
                var x = l.gtype + l.Parea + l.pricedanwei + "/" + l.area + l.areadanwei + "起        " + l.dtype + l.discount;
                a.setFontSize(30), a.setFillStyle("#fc6709"), a.fillText(x, 48, 685);
            }
            a.moveTo(48, 730), a.lineTo(725, 730), a.lineWidth = 1, a.strokeStyle = "#f1f1f1", 
            a.stroke(), I = l.qrcode, wx.getImageInfo({
                src: I,
                complete: function(i) {
                    a.drawImage(i.path, 244, 778, 262, 262), t(n, a), e(n, a, 48, 30, 80, 80), a.draw();
                }
            });
        } else if (2 == l.shareType) {
			a.drawImage("../../common/img/place2.png", 48, 560, 40, 40);
            if (a.drawImage(l.wxBanner, 48, 147, 655, 344), a.moveTo(48, 690), a.lineTo(695, 690), 
            a.lineWidth = 1, a.strokeStyle = "#f1f1f1", a.stroke(), 0 != l.Parea && "0" != l.area) {
                var T = l.Parea + l.pricedanwei + "/" + l.area + l.areadanwei + "起        " + l.dtype + l.discount;
                a.setFontSize(30), a.setFillStyle("#fc6709"), a.fillText(T, 48, 645);
            }
            var I = l.qrcode;
            wx.getImageInfo({
                src: I,
                complete: function(i) {
                    a.drawImage(i.path, 244, 720, 262, 262), t(n, a), e(n, a, 48, 30, 80, 80), a.draw();
                }
            });
        }else if (4 == l.shareType) {
            if (a.drawImage(l.wxBanner, 48, 147, 655, 344), a.moveTo(48, 735), a.lineTo(755, 735), 
            a.lineWidth = 1, a.strokeStyle = "#f1f1f1", a.stroke(), 0 != l.Parea && "0" != l.area) {
                var T = l.Parea + "元/人起   "+l.area+"人起开团";
                a.setFontSize(30), a.setFillStyle("#fc6709"), a.fillText(T, 48, 600);
				var dis = '点击得红包,最高'+ l.discount +'元';
				a.setFillStyle('orange'),a.fillRect(22, 640, 703, 100),a.setFontSize(30),a.setFillStyle("#fff"),a.fillText(dis,180,700);
            }
            var I = l.qrcode;
            wx.getImageInfo({
                src: I,
                complete: function(i) {
                    a.drawImage(i.path, 244, 780, 262, 262), t(n, a), e(n, a, 48, 30, 80, 80), a.draw();
                }
            });
        }
    }
};