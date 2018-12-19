const cheerio = require('cheerio');
const { jvtc_post } = require('../utlis/jvtc_request');
const { parsCookies } = require('../utlis/jvtc_pars');
const { login } = require('../apis/api');


async function jvtc_fun({ loginName, loginPwd }) {
  // console.log(this.init , "----");
// 简单过滤一下账号密码
  if (!/^([1-9][0-9]+)$/.test(loginName) || !/^([^'"]+)$/.test(loginPwd)) {
    return ["传入的参数错误", -1];
  }

  const [e] = await this.init();
  // console.log(e,r);
  // console.log(e);

  if (e) return ["初始化错误", -1];

  const args = {
    ...this.o.args,
    'Top1$UserName': loginName,
    'Top1$PassWord': loginPwd
  }
  args['Top1$StuLogin.x'] = ~~(Math.random() * 30);
  args['Top1$StuLogin.y'] = ~~(Math.random() * 30);

  return new Promise((resolve, reject) => {

    // console.log(o.args);
    jvtc_post(login, { cookies: this.o.cookies, args }, (err, res) => {
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
        // this.isLogin = true;
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
