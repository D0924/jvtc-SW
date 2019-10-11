const { img_code } = require('../apis/api');
const gm = require('gm')
const superagent = require('superagent');
// code处理识别
module.exports = async function (cookies) {
  const res = await superagent.get(img_code)
    .set('Cookie', cookies);

  return new Promise((resolve, reject) => {
    gm(res.body).toBuffer('jpg', (err, buffer) => {
      err && reject(err) || resolve(buffer);
    });
  });
};