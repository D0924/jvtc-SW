const { parsePostData } = require('../utlis/jvtc_pars');

async function fun(ctx, next) {

  let n = ctx.session.aa || 0;
  ctx.session.aa = ++n;
  console.log(ctx.session.aa);

  try {
    
    const { jvtc } = ctx.session;
    // console.log(ctx.session);
    // console.log(jvtc);
    
    if (!jvtc) {
      throw "未登录";
    }
    
    const [error, code, data] = await new global.Jvtc(jvtc).getUserinfo();
    // console.log("===++");

    if (!error && code === 0) {
      ctx.body = { code, message: error, data }
      
      return;
    }

    throw error;

  } catch (error) {
    console.log(error);
    
    ctx.body = { code: -1, message: error };
  }

  await next();
}

module.exports = {
  'GET /user_info': fun
}