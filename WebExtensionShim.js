var modernizr = {
  // see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
  existsLocalStorage: function () {
    var test = "test";
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  },
};
if (modernizr.existsLocalStorage()) {
  var shimStorage = localStorage;
} else {
  var shimStorage = {};
}

var chrome, browser;
chrome_new = browser = {
  i18n: {
    getAcceptLanguages: function (callback) {
      var languages = ["en-US", "en-GB", "en"];
      if (typeof callback !== "undefined") {
        callback(languages);
      }
    },
    getMessage: function (messageName, substitutions) {
      var messageObject = messagesJson[messageName];
      if (typeof messageObject == "undefined") {
        return "";
      }
      var message = messageObject["message"];
      if (typeof message == "undefined") {
        return "";
      }
      return message;
    },
    getUILanguage: function () {
      return "en-US";
    },
    detectLanguage: function (text, callback) {
      if (typeof callback !== "undefined") {
        callback("en-US");
      }
    },
  },
  storage: {
    local: {
      set: function (items, callback) {
        Object.entries(items).map((item) => (shimStorage[item[0]] = item[1]));
        if (typeof callback !== "undefined") {
          callback();
        }
      },
      get: function (keys, callback) {
        var results = {};
        if (keys == null) {
          results = shimStorage;
        } else if (typeof keys == "string") {
          value = shimStorage[keys];
          if (typeof value !== "undefined") {
            results[keys] = value;
          }
        } else if (Array.isArray(keys)) {
          for (var key in keys) {
            value = shimStorage[key];
            if (typeof value !== "undefined") {
              results[key] = value;
            }
          }
        } else if (keys instanceof Object) {
          for (var key in keys) {
            value = shimStorage[key];
            if (typeof value !== "undefined") {
              results[key] = value;
            } else {
              results[key] = keys[key];
            }
          }
        }
        callback(results);
      },
    },
    onChanged: {
      addListener: function () {},
    },
  },
  history: {
    search: function (query, callback) {
      if ("startTime" in query) {
        var result = historyItemsJson.filter(
          (item) =>
            !("lastVisitTime" in item) || item.lastVisitTime > query.startTime
        );
      } else {
        var result = historyItemsJson;
      }
      callback(result);
    },
    deleteUrl: function (details, callback) {
      if ("url" in details) {
        var itemId = historyItemsJson.find(
          (item) => "url" in item && item.url === details.url
        ).id;
        if (itemId) {
          historyItemsJson = historyItemsJson.filter(
            (item) => item.id !== itemId
          );
          visitItemsJson = visitItemsJson.filter((item) => item.id !== itemId);
        }
      }
      if (typeof callback !== "undefined") {
        callback();
      }
    },
    getVisits: function (details, callback) {
      if ("url" in details) {
        var itemId = historyItemsJson.find(
          (item) => "url" in item && item.url === details.url
        ).id;
        if (itemId) {
          var results = visitItemsJson.filter(
            (item) => "id" in item && item.id === itemId
          );
          callback(results);
        }
      }
    },
  },
  runtime: {
    getManifest: function () {
      var main = {
        background: {
          persistent: true,
          scripts: ["main.js"],
        },
        browser_action: {
          default_icon: {
            128: "res/img/line_logo_128x128_off.png",
            32: "res/img/line_logo_48x48_off.png",
            48: "res/img/line_logo_48x48_off.png",
            64: "res/img/line_logo_128x128_off.png",
            96: "res/img/line_logo_128x128_off.png",
          },
          default_title: "LINE",
        },
        default_locale: "en",
        description: "__MSG_appDescription__",
        differential_fingerprint:
          "1.11b8691655446b185df658eedd054817ae88517a279ced40d18c57628aee4be1",
        icons: {
          128: "res/img/line_logo_128x128_on.png",
          32: "res/img/line_logo_48x48_on.png",
          48: "res/img/line_logo_48x48_on.png",
          64: "res/img/line_logo_128x128_on.png",
          96: "res/img/line_logo_128x128_on.png",
        },
        key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuOql7UFiY9pkxo4aAmuN2HHlZhNT5ws6knRdxYhOACJcm1sBfB7GIIMuBwtpYSb3B3m7jbrKqX2iDdgYLxE9ZmFjYgrD6p4D4H9/4FCz/a7h66vp0onNu2PmbZOEnpZKeCgUGMDDcXk673R8tPfkBbmuzQ0rvpc1Z8hWgHo1jLtnjpkTlH4vzu9FGRQFsCuqUzJPjoPpa2rozvTPpmiO2qfcqH3FJoGJbKwXIPZ74JI8cY//o6xFDVhugveN1VqoGZA8PsVliAa5fgBqDohfiv36xkuD88BqynKNn00hGibuXrj4L6mnR+9I68dhwAiXY01gihtI6KhbekToLfoJmwIDAQAB",
        manifest_version: 2,
        name: "LINE",
        permissions: [
          "downloads",
          "storage",
          "notifications",
          "idle",
          "\u003Call_urls>",
        ],
        update_url: "https://clients2.google.com/service/update2/crx",
        version: "2.5.4",
      };

      return main;
    },
    getPackageDirectoryEntry: function (callback) {
      r = {
        isFile: false,
        isDirectory: true,
        name: "crxfs",
        fullPath: "/crxfs",
        filesystem: {
          name: "chrome-extension_ophjlpahpchlmihnnnihgmmeilfjmjjc_0:Isolated_C7048C435E514A1E8E476314FA6BDC71",
          root: {},
        },
      };
      callback(r);
    },
  },
  browserAction: {
    onClicked: {
      addListener: function (tabId, callback) {},
    },
  },
  extension: {
    getURL: function (path) {},
  },
  tabs: {
    query: function (queryInfo, callback) {},
    update: function (tabId, updateProperties, callback) {},
    create: function (createProperties, callback) {},
  },
};
