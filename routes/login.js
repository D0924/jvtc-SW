const { parsePostData } = require('../utils/jvtc_pars');

const Jvtc = require('../bin/jvtc');

async function fun(ctx, next) {

  const [errr, data] = await parsePostData(ctx);

  if (errr) {
    ctx.body = JSON.stringify(errr);
    return;
  }

  try {

    const { loginName, loginPwd } = JSON.parse(data);

    if (!loginName || !loginPwd) {
      throw "账号密码不规范";
    }

    const jvtc = new Jvtc();
    const [errmsg, code] = await jvtc.login({ loginName, loginPwd });
    if (code == 0) {
      ctx.session.jvtc = jvtc;
    }
    ctx.body = { code, message: errmsg };
  } catch (error) {
    ctx.body = { code: -1, message: error };
  }

}

module.exports = {
  'POST /login': fun
}