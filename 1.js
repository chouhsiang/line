var n = null,
  s = 0;
chrome.runtime.getPackageDirectoryEntry(function (r) {
  r.getDirectory(I.nAyxvsPNQz(), {}, function (r) {
    r.createReader().readEntries(function (r) {
      for (
        var o = t.after(r[CckiCTS], function () {
            if (null === n && 0 === s) i(), e();
            else {
              var t = new FileReader();
              if (
                ((t.onerror = function (t) {}),
                (t.onload = function (t) {
                  I.UMboJDqRSV(t.target[suWoFuz], s) && (i(), e());
                }),
                !n)
              )
                return;
              t.readAsText(n);
            }
          }),
          a = 0,
          c = r[CckiCTS];
        a < c;
        a++
      )
        r[a].isFile &&
        !1 === r[a].isDirectory &&
        "string" == typeof r[a].name &&
        r[a].name.endsWith(".js")
          ? r[a][KtImzjU](function (t) {
              t.size < 32 ? ((n = t), i(), o()) : ((s += t.size), o());
            })
          : (i(), o());
    });
  });
});
