const bmob = require('../bin/bmob');
const config = require('../config/bmob.config');


module.exports = function (options = {}) {
  const { ApiCount, Student } = bmob(config.secretKey, config.securityCode);
  const apiCount = new ApiCount();
  const student = new Student();
  return async (ctx, next) => {
    ctx.dbx = {
      apiCount,
       student
    }
    await next();
  };
}