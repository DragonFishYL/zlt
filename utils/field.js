module.exports = {
    resolveFieldData: function(e) {
        var e = JSON.parse(e);
        for (var r in e) {
            var i = e[r];
            if (4 === i.typeId || 5 === i.typeId) {
                var a = i.dictionary.split("##@@##"), n = [];
                for (r in a) {
                    var l = {};
                    l.name = a[r], l.value = a[r], n.push(l);
                }
                i.value = n;
            }
        }
        return e;
    },
    resolveFieldRequire: function(e) {
        var e = JSON.parse(e), r = [];
        for (var i in e) if ("cellphone" != e[i].english) {
            var a = {};
            a.required = e[i].required, a.english = e[i].english, a.name = e[i].name, r.push(a);
        }
        return r;
    }
};