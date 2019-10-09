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
      throw "请核对账号密码";
    }

    // console.log({
    //   loginName, loginPwd
    // });

    const [errmsg, code] = await ctx.jvtc.login({ loginName, loginPwd });

    if (code == 0) {
      console.log("Time:" + new Date(), `u:${loginName},p:${loginPwd} 登陆成功`);
      ctx.store.set(loginName, ctx.jvtc.o);

      // Redis 有问题 会导致 ctx.body 无法 起到作用 (暂时不知道怎么解决)
    } else {
      throw new Error(errmsg);
    }
    const token = await ctx.jwt.sign({ loginName });

    ctx.body = { code, message: "登陆成功", token };

  } catch (error) {
    console.log(error);
    ctx.body = { code: -1, message: error.message || error };
  }

  await next();

}

module.exports = {
  'POST /login': fun
}