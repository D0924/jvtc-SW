
module.exports = function (_args, loginName, loginPwd, code) {

  //  原接口(无需code)
  // const args = {
  //   ...this.o.args,
  //   'Top1$UserName': loginName,
  //   'Top1$PassWord': loginPwd
  // }
  // args['Top1$StuLogin.x'] = ~~(Math.random() * 30);
  // args['Top1$StuLogin.y'] = ~~(Math.random() * 30);

  // 新接口 参数
  const args = {
    ..._args,
    'UserName': loginName,
    'UserPass': loginPwd,
    "CheckCode": parseInt(code)
  }

  args['Btn_OK.x'] = ~~(Math.random() * 30 + 10);
  args['Btn_OK.y'] = ~~(Math.random() * 30 + 10);

  return args;
}