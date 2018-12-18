const Koa = require('koa');
// const router = require('koa-router')();
const router = require('./middles/jvtcRoutes');
const Store = require('./middles/store');
const session = require('koa-session2');
const Jvtc = require('./bin/jvtc');
const localFilter = require('./Interceptor/localFilter');
global.Jvtc = Jvtc;

const port = 3214;

const app = new Koa();

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