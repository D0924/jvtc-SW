
const { jvtc_get, jvtc_post } = require('../utils/jvtc_request');
const { parsCookies, parsArgs, parsUserinfo } = require('../utils/jvtc_pars');

async function init() {

  return new Promise((resolve, reject) => {
    jvtc_get(this.apiUrls.init, { cookies: "", args: "" }, (err, res) => {
      try {
        const { o } = this;
        o.cookies = parsCookies(res.headers)

        o.args = parsArgs(res.text);
        if (o.cookies && o.args) {
          resolve([null, 0]);
        } else {
          throw "失败";
        }
      } catch (error) {
        reject(error);
      }
    });
  }).catch((error) => {
    return [error, null];
  })

}

module.exports = init;