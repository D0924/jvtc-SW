const { parsePostData } = require('../utils/jvtc_pars');

async function fun(ctx, next) {

  const [errr, data] = await parsePostData(ctx);

  if (errr) {
    ctx.body = JSON.stringify(errr);
    return;
  }

  try {

    const parameter = data && JSON.parse(data) || {};

    const jvtcObj = ctx.jvtc;
    const [err, data_] = await jvtcObj.FDYDisLeave(parameter);
    if(err) throw err;
    ctx.body = {
      code: 0,
      message: "",
      data: data_
    };

  } catch (error) {
    console.log(error);

    ctx.body = { code: -1, message: error.message || error };
  }

}

module.exports = {
  'POST /FDYDisLeave': fun
}