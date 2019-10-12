
const { jvtc_get } = require('../utils/jvtc_request');
const { parsArgs } = require('../utils/jvtc_pars');
const { Navigation } = require('../apis/api');


async function jvtc_fun() {

  return new Promise((resolve, reject) => {
    const { o } = this;
    jvtc_get(Navigation, o, (err, res) => {
      try {
        if(!res){
          throw err;
        }
        const { text } = res;
        o.args = parsArgs(text);

        resolve([null, 0, text]);
        
      } catch (error) {
        reject(error);
      }
    });
  }).catch((error) => {
    return [error, null, null];
  })
}

module.exports = jvtc_fun;