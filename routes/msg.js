const { parsePostData } = require('../utils/jvtc_pars');

async function fun(ctx, next) {

  const [errr, data] = await parsePostData(ctx);

  if (errr) {
    ctx.body = JSON.stringify(errr);
    return;
  }

  try {

    const { msg } = JSON.parse(data);
    ctx.dbx.msg.save(msg);
    ctx.body = {
      code: 0, message: "完成"
    };
  } catch (error) {
    console.log(error);
    ctx.body = { code: -1, message: error.message || error };
  }
  // ctx.body = "123";
  // await next();

}

module.exports = {
  'POST /msg': fun
}