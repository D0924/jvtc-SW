module.exports = async function (loginName, store) {

  const key = loginName + '_black';
  const userLoginNum = (await store.get(key)) || { num: 0, time: 0 };

  if (userLoginNum.num >= 20) {
    throw {
      code: -1,
      msg: "兄弟，登陆这么多次不累吗，服务器好累的"
    }
  }

  // 10秒的登陆间隙
  if (userLoginNum.time + 5000 > Date.now()) {
    throw {
      code: -1,
      msg: "登陆频繁，5秒后再试试吧"
    }
  }
  await store.set(key, { num: userLoginNum.num + 1, time: Date.now() });
}