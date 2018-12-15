# jvtc-SW
学工平台API接口

## 已经实现webApi接口

- [x] 登陆 /login

## 已经实现功能

- [x] 登陆 login()
- [x] 获取 学生信息 getUserinfo()
- [x] 获取 素拓活动列表 getStuActive()
- [x] 评价指定素拓活动 AppAction(素拓活动id)
- [x] 学工网首页展示信息 WorkInfo()
- [x] 获取当前ABCDEF类素拓得分 MyActionGetNum()
- [x] 宿舍卫生检查列表 StuEnlightenRoomScore()
## 未实现
- [ ] 日常请假申请
- [ ] 节假日请假申请
- [ ] 日常请假记录列表
- [ ] 节假日请假列表

- [ ] 其他待定。。。

> 项目结构

* bin 项目主要的程序 
  * jvtc.js 主程序
* utils 帮助工具 函数
* dll 功能目录
* routes 路由目录
* middles 中间件目录
* app.js 主入口 


## api 使用 

> 运行 npm run app 日志信息会输出 地址和端口 复制然后 浏览器打开
> 登陆接口 为 /login post 传入json数据 
> {"loginName":"账号", "loginPwd":"密码"}
> 返回  {"code":状态值,"message":信息}
> code:0 表示登陆成功 所有接口都是这样的 其他code会返回对应的信息

## 功能

> 功能使用方法

``` JavaScript
// 支持 es6 async/await 语法
// 引入 Jvtc
const Jvtc = require('./bin/jvtc');
// 用户登陆信息 
const formdata = {
  loginName: "账号", loginPwd: "密码"
}
// 新建一个jvtc对象 尽量保证每个人登陆都有一个 唯一的对象
const jvtc = new Jvtc();
// 登陆账号 调用login() 返回 Promise 然后传递回调或者使用async/await
// 错误信息 和 状态值 0 表示登陆成功
// const [error,stat] = await jvtc.login(formdata);
jvtc.login(formdata).then(async ([err,stat]) => {
  // 这里得到的 a 等同于 [error,stat]
  if(err) return;
  // 这里就可以获取 学生的信息
  const userinfo = await jvtc.getUserinfo()
  console.log(userinfo);
  // const StuActive = await jvtc.getStuActive()
  // console.log(StuActive);
  // const AppAction = await jvtc.AppAction(6123)
  // console.log(AppAction);
  // const WorkInfo = await jvtc.WorkInfo();
  // console.log(WorkInfo);
  // const MyActionGetNum = await jvtc.MyActionGetNum();
  // console.log(MyActionGetNum);
  // const StuEnlightenRoomScore = await jvtc.StuEnlightenRoomScore();
  // console.log(StuEnlightenRoomScore);
  
})

```
