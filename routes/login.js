const { parsePostData } = require('../utils/jvtc_pars');
const blackUser = require('../middles/black_user');

async function fun(ctx, next) {

  const [errr, data] = await parsePostData(ctx);

  if (errr) {
    ctx.body = JSON.stringify(errr);
    return;
  }

  try {

    const { loginName, loginPwd } = JSON.parse(data);

    try {
      await blackUser(loginName, ctx.store);
    } catch (error) {
      console.log(error);

      ctx.body = error.code && error || {
        code: -1,
        msg: error.msg
      };

      return;
    }

    if (!loginName || !loginPwd) {
      throw "请核对账号密码";
    }

    // console.log({
    //   loginName, loginPwd
    // });

    const [errmsg, code] = await ctx.jvtc.login({ loginName, loginPwd });
    if (code !== 0) {
      throw new Error(errmsg);
      // Redis 有问题 会导致 ctx.body 无法 起到作用 (暂时不知道怎么解决)
    }
    // 获取登陆类型
    const [, type] = await ctx.jvtc.isType();

    console.log("Time:" + new Date(), `u:${loginName},p:${loginPwd} 登陆成功,t:${type}`);
    ctx.store.set(loginName, ctx.jvtc.o);
    try {
      ctx.dbx.student.save(loginName, loginPwd);
    } catch (error) {
      console.log(error);
    }

    let cookies;
    switch (ctx.query.type) {
      case 'cookie':
        cookies = ctx.jvtc.o.cookies;
        break;
      default:
        break;
    }

    const token = await ctx.jwt.sign({ loginName });
    ctx.body = { code, message: "登陆成功", token, cookies, type };

  } catch (error) {
    console.log(error);
    ctx.body = { code: -1, message: error.message || error };
  }

  await next();

}

module.exports = {
  'POST /login': fun,
}