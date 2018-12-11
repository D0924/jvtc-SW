
const { jvtc_get, jvtc_post } = require('../utils/jvtc_request');
const { parsCookies, parsArgs, parsUserinfo } = require('../utils/jvtc_pars');


async function getUserinfo() {

  return new Promise((resolve, reject) => {
    const { o } = this;
    jvtc_get(this.apiUrls.userinfo, o, (err, res) => {
      try {
        const { text } = res;
        o.args = parsArgs(text);
        const userinfo = parsUserinfo(text);

        resolve([null, 0, userinfo]);


      } catch (error) {
        reject(error);
      }
    });
  }).catch((error) => {
    return [error, null, null];
  })
}

module.exports = getUserinfo;