const cheerio = require('cheerio');
const { jvtc_get, jvtc_post } = require('../utils/jvtc_request');
const { parsCookies, parsArgs, parsUserinfo } = require('../utils/jvtc_pars');


async function jvtc_fun() {

  const [e] = await this.init();
  // console.log(e,r);
  if (e) return ["初始化错误", -1];
  
  const args = {
    ...this.o.args,
    'Top1$UserName': this.loginName,
    'Top1$PassWord': this.loginPwd
  }

  return new Promise((resolve, reject) => {

    // console.log(o.args);
    jvtc_post(this.apiUrls.login, { cookies: this.o.cookies, args }, (err, res) => {
      try {
        // console.log(this.o);

        // if (err) {
        // 	throw err;
        // }

        const $ = cheerio.load(res.text);
        const html = new String($("script").html())
        if (html) {

          const rex = /alert\('(.*?)'\);/;
          const ms = html.match(rex);

          if (ms && ms.length >= 2) {

            throw ms[1];

          }

        }

        this.o.cookies += parsCookies(res.headers);
        // console.log(this.o.cookies);

        // 登陆成功标志
        this.isLogin = true;
        resolve([null, 0]);

      } catch (error) {
        reject(error);
      }
    });

  }).catch((error) => {
    return [error, null];
  });
}

module.exports = jvtc_fun;
