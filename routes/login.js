const { parsePostData } = require('../utlis/jvtc_pars');

async function fun(ctx, next) {
  
  const [errr, data] = await parsePostData(ctx);

  if (errr) {
    ctx.body = JSON.stringify(errr);
    return;
  }
  // console.log(data);

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
      // console.log(ctx.session);
    }

    ctx.body = { code, message: errmsg };
  } catch (error) {
    console.log(error);
    
    ctx.body = { code: -1, message: error };
  }

  await next();

}

module.exports = {
  'POST /login': fun
}