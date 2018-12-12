const cheerio = require('cheerio');
const { jvtc_get, jvtc_post } = require('../utils/jvtc_request');
const { parsCookies, parsArgs, parsUserinfo } = require('../utils/jvtc_pars');


async function jvtc_fun(id) {


  return new Promise((resolve, reject) => {
    // console.log(this.o);

    // console.log(this.apiUrls.AppAction + id,this.o.cookies);

    jvtc_get(this.apiUrls.AppAction + id, { cookies: this.o.cookies, args: "" }, (err, res) => {
      const { text } = res;
      this.o.args = parsArgs(text);

      const args = {
        ...this.o.args,
        AdviceNum: 100,
        __EVENTTARGET: "BtnOk",
        AdviceThing: ""
      }
      //

      jvtc_post(this.apiUrls.AppAction + id, { cookies: this.o.cookies, args }, (err, res) => {
        try {
          // console.log(this.o);

          // if (err) {
          // 	throw err;
          // }
          // console.log(res.text);

          const $ = cheerio.load(res.text);

          const html = new String($("script").html())

          if (html) {

            const rex = /alert\('(.*?)'\);/;
            const ms = html.match(rex);

            if (ms && ms.length >= 2) {

              if (ms[1] == '操作成功') {
                resolve([null, 0]);
                return;
              }

              throw ms[1];

            }

          }

          throw "未成功";

        } catch (error) {
          reject(error);
        }
      });
    });


  }).catch((error) => {
    return [error, null];
  });
}

module.exports = jvtc_fun;
