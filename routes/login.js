const { parsePostData } = require('../utlis/jvtc_pars');

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

    const jvtc = new global.Jvtc();

    const [errmsg, code] = await jvtc.login({ loginName, loginPwd });
    // console.log(ctx.session);
    // console.log(jvtc.o,'==========')

    if (code == 0) {
      ctx.session.jvtc = jvtc.o;
      // Redis 有问题 会导致 ctx.body 无法 起到作用 (暂时不知道怎么解决)
    }

    ctx.body = { code, message: errmsg || ""};

  } catch (error) {
    console.log(error);

    ctx.body = { code: -1, message: error.message || error };
  }
  
  await next();

}

module.exports = {
  'POST /login': fun
}