const { parsePostData } = require('../utils/jvtc_pars');

async function fun(ctx, next) {

  try {

    const [error, code, data] = await ctx.jvtc.getStuActive();

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