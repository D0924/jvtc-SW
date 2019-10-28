const bmob = require('../bin/bmob');
const config = require('../config/bmob.config');


module.exports = function (options = {}) {
  const { ApiCount, Student, Msg } = bmob(config.secretKey, config.securityCode);
  const apiCount = new ApiCount();
  const student = new Student();
  const msg = new Msg();
  return async (ctx, next) => {
    ctx.dbx = {
      apiCount,
      student,
      msg
    }
    await next();
  };
}