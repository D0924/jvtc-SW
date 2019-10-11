const { parsePostData } = require('../utils/jvtc_pars');

async function fun(ctx, next) {

  const [errr, data] = await parsePostData(ctx);

  if (errr) {
    ctx.body = JSON.stringify(errr);
    return;
  }

  try {

    const ids = JSON.parse(data);

    if (!Array.isArray(ids)) {
      throw "参数错误";
    }

    

    const jvtcObj = ctx.jvtc;

    const errApp = [];

    for (const iterator of ids) {

      const { id } = iterator;

      if (!parseInt(id)) {
        throw "参数错误，只能是数字";
      }

      try {

        const [errmsg, code] = await jvtcObj.AppAction(id);
        if (errmsg && code != 0) {
          throw errmsg;
        }

      } catch (error) {
        errApp.push({
          errormsg: error.message,
          id
        });
      }
    }

    ctx.body = {
      code: 0, message: "评论完成", details: {
        errornum: errApp.length,
        errorlist: errApp
      }
    };

  } catch (error) {
    console.log(error);

    ctx.body = { code: -1, message: error.message || error };
  }
  // ctx.body = "123";
  // await next();

}

module.exports = {
  'POST /AppAction': fun
}