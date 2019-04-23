var AipOcrClient = require("baidu-aip-sdk").ocr;
var fs = require('fs');
var superagent = require('superagent');
var images = require("images");

// 设置APPID/AK/SK
var APP_ID = "APP_ID";
var API_KEY = "API_KEY";
var SECRET_KEY = "SECRET_KEY";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

(async () => {

  try {
    const res = await superagent.get('http://xz.jvtc.jx.cn/JVTC_XG/default3.html');

    var a = images(res.body).encode("jpg", { operation: 100 });

    client.generalBasic(a.toString("base64")).then(function (result) {
     const words_result = result['words_result']
      console.log(words_result && words_result.length && words_result[0].words);

    }).catch(function (err) {
      // 如果发生网络错误
      console.log(err);
    });
  } catch (err) {
    console.error(err);
  }

})();

