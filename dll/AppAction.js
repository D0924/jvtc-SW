const cheerio = require('cheerio');
const { jvtc_get, jvtc_post } = require('../utlis/jvtc_request');
const { parsArgs } = require('../utlis/jvtc_pars');
const { AppAction } = require('../apis/api');


async function jvtc_fun(id) {


  return new Promise((resolve, reject) => {

    jvtc_get(AppAction + id, { cookies: this.o.cookies, args: "" }, (err, res) => {
      const { text } = res;
      this.o.args = parsArgs(text);

      const args = {
        ...this.o.args,
        AdviceNum: 100,
        __EVENTTARGET: "BtnOk",
        AdviceThing: ""
      }
      //

      jvtc_post(AppAction + id, { cookies: this.o.cookies, args }, (err, res) => {
        try {

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
