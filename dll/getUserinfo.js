
const { jvtc_get } = require('../utils/jvtc_request');
const { parsArgs, parsUserinfo } = require('../utils/jvtc_pars');
const { userinfo } = require('../apis/api');


async function jvtc_fun() {

  return new Promise((resolve, reject) => {
    const { o } = this;
    jvtc_get(userinfo, o, (err, res) => {
      try {
        if(!res){
          throw err;
        }
        const { text } = res;
        o.args = parsArgs(text);
        const data = parsUserinfo(text);

        resolve([null, 0, data]);
        
      } catch (error) {
        reject(error);
      }
    });
  }).catch((error) => {
    return [error, null, null];
  })
}

module.exports = jvtc_fun;