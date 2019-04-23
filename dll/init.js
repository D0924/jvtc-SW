
const { jvtc_get } = require('../utlis/jvtc_request');
const { parsCookies, parsArgs } = require('../utlis/jvtc_pars');
const { init } = require('../apis/api');

async function jvtc_fun() {

  return new Promise((resolve, reject) => {
    jvtc_get(init, { cookies: "", args: "" }, (err, res) => {
      try {
        const { o } = this;
        
        o.cookies = parsCookies(res.headers)

        o.args = parsArgs(res.text);
        // console.log(o.args);
        
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

module.exports = jvtc_fun;