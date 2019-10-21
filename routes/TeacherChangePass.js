const { parsePostData } = require('../utils/jvtc_pars');

async function fun(ctx, next) {

  const [errr, data] = await parsePostData(ctx);

  if (errr) {
    ctx.body = JSON.stringify(errr);
    return;
  }

  try {

    const dataObj = JSON.parse(data);

    const jvtcObj = ctx.jvtc;

    const [err, res] = await jvtcObj.TeacherChangePass(dataObj);
    if (err) {
      throw err;
    }
    ctx.body = {
      code: res, message: "修改成功"
    };

  } catch (error) {
    console.log(error);

    ctx.body = { code: -1, message: error.message || error };
  }
  // ctx.body = "123";
  // await next();

}

module.exports = {
  'POST /TeacherChangePass': fun
}