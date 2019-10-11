const ocrClient = require('../bin/OcrClient');
const jvtc_code = require('../utils/jvtc_code');
const jvtc_cookies = require('../utils/jvtc_cookies');
const jvtc_args = require('../utils/jvtc_args');

async function jvtc_fun({ loginName, loginPwd }) {
  // 简单过滤一下账号密码
  if (!/^([1-9][0-9]+)$/.test(loginName) || !/^([^'"]+)$/.test(loginPwd)) {
    return ["传入的参数错误", -1];
  }

  const [e] = await this.init();

  if (e) return ["初始化错误，重试几次后无反应请联系相关人员", -1];

  return new Promise(async (resolve, reject) => {

    const cookies = this.o.cookies;
    // 标志
    let i = 3, flag = false;
    let code = '00000';
    // 识别三次
    do {
      try {
        // 获取验证码的buffer对象
        const buffer = await jvtc_code(cookies);
        // 识别
        const result = await ocrClient.generalBasic(buffer.toString("base64"));
        const words_result = result['words_result'];
        // 验证
        code = words_result && words_result.length && words_result[0].words;
        if (code && code.length == 5 && String(parseInt(code)).length == 5) {
          console.log("Time:" + new Date(), `CODE: 识别 ${ 4 - i } 次成功`);
          i = 0;
        }
      } catch{
        // 不处理
      } finally {
        i--;
      }
    } while (i > 0);
    // 获取参数列表
    const args = jvtc_args(this.o.args, loginName, loginPwd, code);

    // 登陆并获取之后的cookie
    const [err, data] = await jvtc_cookies(cookies, args);

    if (err) {
      throw new Error(err);
    }
    // 绑定状态
    this.o.cookies += data;
    // 响应状态
    resolve([null, 0]);

  }).catch((error) => {
    return [error, null];
  });
}

module.exports = jvtc_fun;
