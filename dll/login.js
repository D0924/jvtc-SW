const cheerio = require('cheerio');
const { jvtc_post, jvtc_get } = require('../utlis/jvtc_request');
const { parsCookies } = require('../utlis/jvtc_pars');
const { login, img_code } = require('../apis/api');
const ocrClient = require('../bin/OcrClient');
const gm = require('gm')
const superagent = require('superagent');

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

  //  原接口
  // const args = {
  //   ...this.o.args,
  //   'Top1$UserName': loginName,
  //   'Top1$PassWord': loginPwd
  // }
  // args['Top1$StuLogin.x'] = ~~(Math.random() * 30);
  // args['Top1$StuLogin.y'] = ~~(Math.random() * 30);

  return new Promise(async (resolve, reject) => {

    const res = await superagent.get(img_code)
      .set('Cookie', this.o.cookies);

    gm(res.body).toBuffer('jpg', (err, buffer) => {
      if(err) throw err;

      ocrClient.generalBasic(buffer.toString("base64")).then((result) => {

        const words_result = result['words_result'];
        const code = words_result && words_result.length && words_result[0].words;

        if (!code || code.length != 5 || String(parseInt(code)).length != 5) {
          throw new Error("识别错误");
        }

        // 新接口
        const args = {
          ...this.o.args,
          'UserName': loginName,
          'UserPass': loginPwd,
          "CheckCode": parseInt(code)
        }

        args['Btn_OK.x'] = ~~(Math.random() * 30 + 10);
        args['Btn_OK.y'] = ~~(Math.random() * 30 + 10);

        // console.log(o.args);
        jvtc_post(login, { cookies: this.o.cookies, args }, (err, res) => {
          try {
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
            // 登陆成功标志
            // this.isLogin = true;
            resolve([null, 0]);

          } catch (error) {
            console.log(error);
            reject(error);
          }
        });

      }).catch(function (err) {
        // 如果发生网络错误
        console.log(err);
        reject(err);
      });
    });

  }).catch((error) => {
    return [error, null];
  });
}

module.exports = jvtc_fun;
