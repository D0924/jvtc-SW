# 学工平台API接口

## 线上API地址

[http://api.ncgame.cc/jvtc/*](http://api.ncgame.cc/jvtc/*)

### `更新记录`
> 2019-04-23     
>   1.更换登陆接口(原来接口以被废除)  
>   2.加入百度ocr 进行验证码识别 (成功率还行)
> 2019-04-26    
>   将在 5月中旬左右 更换验证方式 届时 会使用jwt 目前 已完成开发 
>   你可以 切换到 dev 分支 提前 clone 下来体验
> 2019-10-12  
>   准备开始接入老师端  

## 已经实现WEBAPI接口 列表

```http

1. POST /AppAction   // 素拓活动评价
  // 传入 [{"id":素拓活动id}]

2. GET /     // 首页

3. POST /login    // 学工网登陆
  // 传入 {"loginName":"学号", "loginPwd":"密码"}

4. GET /MyActionGetNum // 获取当前各类素拓分
  
6. GET /getStuActive  //获取素拓活动列表

7. GET /StuEnlightenRoomScore // 查寝列表

8. GET /user_info   //个人信息

9. GET /WorkInfo    // 首页 本学期 个人信息简介

```

<!-- - [x] 登陆 /login -->

## 已经实现功能

- [x] 登陆 login()
- [x] 获取 学生信息 getUserinfo()
- [x] 获取 素拓活动列表 getStuActive()
- [x] 评价指定素拓活动 AppAction(素拓活动id)
- [x] 学工网首页展示信息 WorkInfo()
- [x] 获取当前ABCDEF类素拓得分 MyActionGetNum()
- [x] 宿舍卫生检查列表 StuEnlightenRoomScore()
- [x] 老师信息获取
- [x] 学生密码重置 

## 未实现

- [ ] 请假审批、销假
- [ ] 困难学生认定
- [ ] 综测德育分数录入

- [ ] 日常请假申请
- [ ] 节假日请假申请
- [ ] 日常请假记录列表
- [ ] 节假日请假列表

- [ ] 其他待定。。。


> ## 项目结构

* bin 项目主要的程序 
  * jvtc.js 主程序
* utils 帮助工具 函数
* dll 功能目录
* routes 路由目录
* middles 中间件目录
* logs 日志
* app.js 主入口 

## 初始化 

1. 将项目 “下载” 到本地 
2. 运行 `npm i` 下载依赖

## api 使用 

> ### 运行 npm run serve 日志信息会输出 地址和端口 复制然后 浏览器打开
> * 登陆接口 为 /login post 传入json数据 
> * {"loginName":"账号", "loginPwd":"密码"}
> * 返回  {"code":状态值,"message":信息}
> * code:0 表示登陆成功 所有接口都是这样的 其他code会返回对应的信息
