async function fun(ctx, next) {

  try {
    const { StudentNo } = ctx.query;
    if (!StudentNo || !/^1[0-9]+$/.test(StudentNo)) {
      throw new Error('参数错误');
    }
    const [error, code, data] = await ctx.jvtc.TeacherReSetpass(StudentNo);

    if (!error && code === 0) {
      ctx.body = { code, message: error, data }

      return;
    }

    throw error;

  } catch (error) {
    
    ctx.body = { code: -1, message: error && error.message || error };
  }

  await next();
}

module.exports = {
  'GET /TeacherReSetpass': fun
}