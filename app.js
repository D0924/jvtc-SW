const Koa = require('koa');
// const router = require('koa-router')();
const router = require('./middles/jvtcRoutes');
const session = require('koa-session');


const app = new Koa();
app.keys = ['some secret hurr'];
const CONFIG = {
   key: 'session',   //cookie key (default is koa:sess)
   maxAge: 86400000,  // cookie的过期时间 maxAge in ms (default is 1 days)
   overwrite: true,  //是否可以overwrite    (默认default true)
   httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
   signed: true,   //签名默认true
   rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
   renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));

// app.use(router.routes());

// router.get('/',async (ctx,next)=>{
//   ctx.body = "123";
//   await next();
// });

app.use(router());
const port = 3214;
app.listen(3214, () => {
  console.log(`地址：http://localhost:${port}`);
});