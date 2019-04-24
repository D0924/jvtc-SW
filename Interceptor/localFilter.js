
const filter = function (filters_url) {
  if (!filters_url && !Array.isArray(filters_url)) throw new Error("参数错误");

  return async (ctx, next) => {
    const { url, originalUrl } = ctx;

    console.log(url, originalUrl);

    if (filters_url.indexOf(url) != -1) {
      await next();
      return;
    }
    
    const jvtc = null;

    if (!jvtc) {
      ctx.body = { code: -1, message: "请先登陆" };
      return;
    }

    await next();

  }

}

module.exports = filter;