const cheerio = require('cheerio');
const {  jvtc_post } = require('../utils/jvtc_request');
const { parsCookies } = require('../utils/jvtc_pars');


async function jvtc_fun() {

  const [e] = await this.init();
  // console.log(e,r);
  if (e) return ["初始化错误", -1];
  
  const args = {
    ...this.o.args,
    'Top1$UserName': this.loginName,
    'Top1$PassWord': this.loginPwd
  }
  args['Top1$StuLogin.x'] = ~~(Math.random() * 30);
  args['Top1$StuLogin.y'] = ~~(Math.random() * 30);

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
        // console.log(this.o);

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
