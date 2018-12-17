const Koa = require('koa');
// const router = require('koa-router')();
const router = require('./middles/jvtcRoutes');
const Store = require('./middles/store');
const session = require('koa-session2');
const Jvtc = require('./bin/jvtc');
global.Jvtc = Jvtc;

const app = new Koa();

app.use(session({
  store:new Store()
}))

app.use(router());


// app.use(router.routes());

// router.get('/',async (ctx,next)=>{
//   ctx.body = "123";
//   await next();
// });

const port = 3214;
app.listen(3214, () => {
  console.log(`地址：http://localhost:${port}`);
});