const Koa = require('koa');
// const router = require('koa-router')();
const router = require('./middles/jvtcRoutes');
const Store = require('./middles/store');
const session = require('koa-session2');
const KoaCors = require('koa-cors');

const Jvtc = require('./bin/jvtc');
const localFilter = require('./Interceptor/localFilter');


global.Jvtc = Jvtc;

const port = 3214;

const app = new Koa();

app.use(KoaCors({
  origin: function (ctx) {
    // if (ctx.url === '/test') {
    //   return "*"; // 允许来自所有域名请求
    // }
    console.log("来源：",ctx.header.origin);

    return ctx.header.origin || ctx.origin; // 这样就能只允许 http:/ / localhost: 8080 这个域名的请求了
  },

}));

app.use(session({
  key: "JVTC",
  maxAge: 2 * 60 * 60 * 1000, //两个小时过期
  store: new Store()
}))

const filters_url = ['/', '/login'];

app.use(localFilter(filters_url));
app.use(router());

app.use(ctx => {
  ctx.session.refresh();
})

app.listen(3214, () => {
  console.log(`地址：http://localhost:${port}`);
});