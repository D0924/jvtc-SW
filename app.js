const Koa = require('koa');
const jwt = require('koa-jwt');
const router = require('./middles/router');
const redisStore = require('./middles/store');
const jvtc_jwt = require('./middles/jvtc_jwt');
const KoaCors = require('koa2-cors');
const logger = require('koa-logger');

const Jvtc = require('./bin/jvtc');
const { SECRET_OR_PRIVATE_KEY, FILTERS_URL, PORT } = require(process.env.NODE_ENV == 'development' ? './ocr.config.dev' : './ocr.config')

const app = new Koa();
app.use(logger());
app.use(KoaCors({
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  origin: function (ctx) {
    // if (ctx.url === '/test') {
    //   return "*"; // 允许来自所有域名请求
    // }
    const origin = ctx.header.origin || ctx.origin;
    // console.log("Time:" + new Date(), "来源:", origin);
    return origin; // 这样就能只允许 http:/ / localhost: 8080 这个域名的请求了
  },
}));

app.use(async (ctx, next) => {
  await next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        code: ctx.status,
        msg: "身份验证失败"
      };
    } else {
      ctx.body = {
        code: err.status,
        msg: ctx.body && ctx.body.message || err.message || err
      };
    }
  });
});

app.use(jwt({ secret: SECRET_OR_PRIVATE_KEY }).unless({ path: FILTERS_URL }));

app.use(redisStore());

app.use(jvtc_jwt(SECRET_OR_PRIVATE_KEY));

app.use(Jvtc());

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`地址：http://localhost:${PORT}`);
});