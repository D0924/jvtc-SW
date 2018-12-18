const { parsePostData } = require('../utlis/jvtc_pars');

async function fun(ctx, next) {

  try {
    
    const { jvtc } = ctx.session;
    // console.log(ctx.session);
    // console.log(jvtc);
    
    if (!jvtc) {
      throw "登录超时";
    }
    
    const [error, code, data] = await new global.Jvtc(jvtc).getStuActive();
    // console.log("===++");

    if (!error && code === 0) {
      ctx.body = { code, message: error, data }
      
      return;
    }

    throw error;

  } catch (error) {
    console.log(error);
    ctx.body = { code: -1, message: error.message || error };
  }

  await next();
}

module.exports = {
  'GET /getStuActive': fun
}