const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
console.log('\033[40;36m路由加载中\033[0m');

const cwd = process.cwd();
const route_dir = path.join(cwd, 'routes');
const jvtc_dll = fs.readdirSync(route_dir);

jvtc_dll.forEach(dllname => {
  const route = require(path.join(route_dir, dllname));
  for (const key in route) {
    if (route.hasOwnProperty(key)) {

      const fun = route[key];

      const [method, url] = key.split(" ")

      switch (method) {
        case "GET":
          router.get(url, fun);
          break;
        case "POST":
          router.post(url, fun);
          break;
        default:
          break;
      }

    }
  }
});
console.log('\033[40;36m路由完成\033[0m');

module.exports = function () {
  return router.routes();
}