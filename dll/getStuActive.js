
const { jvtc_get } = require('../utils/jvtc_request');
const {  parsArgs, parsStuActive} = require('../utils/jvtc_pars');
const { StuActive } = require('../apis/api');

async function jvtc_fun() {

  return new Promise((resolve, reject) => {

    const { o } = this;

    jvtc_get(StuActive, o, (err, res) => {
      try {
        const { text } = res;
        o.args = parsArgs(text);
        
        const data = parsStuActive(text);

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