async function fun(ctx, next) {
  ctx.type = "html";
  ctx.body = `详情请查阅 <a href="https://github.com/jvtc/jvtc-SW">github</a>: https://github.com/jvtc/jvtc-SW`;
}

module.exports = {
  'GET /': fun
}