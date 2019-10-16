async function fun(ctx, next) {

  const { id, type } = ctx.query;

  try {


    const jvtcObj = ctx.jvtc;
    const [err, data_] = await jvtcObj.FDYAllLeaveExam_Edit({ id, type });
    if (err) throw err;
    ctx.body = {
      code: 0,
      message: "",
      data: {
        stat: data_,
        msg: "成功"
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
  'GET /FDYAllLeaveExam_Edit': fun
}