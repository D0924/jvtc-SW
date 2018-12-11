/**
 * Jvtc 中间件
 */
const fs = require('fs');
const path = require('path');
console.log('\033[40;32m加载对象中\033[0m');

const cwd = process.cwd();
const jvtc_dll = fs.readdirSync(path.join(cwd, 'dll'));
const dlls = {};

jvtc_dll.forEach(dllname => {
  dlls[dllname.substring(0, dllname.indexOf('.'))] = require(path.join(cwd, 'dll', dllname));
});

console.log('\033[40;32m加载对象完成\033[0m');
function init(Jvtc) {

  console.log('\033[40;32m加载初始化对象中\033[0m');

  Object.assign(Jvtc.prototype, {
    ...dlls
  })

  console.log('\033[40;32m加载初始化对象完成\033[0m');


}

module.exports = { init };