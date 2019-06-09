
const { jvtc_get } = require('../utlis/jvtc_request');
const { parsArgs, parsWordInfo } = require('../utlis/jvtc_pars');
const { WorkInfo } = require('../apis/api');

async function jvtc_fun() {

  return new Promise((resolve, reject) => {

    const { o } = this;

    jvtc_get(WorkInfo, o, (err, res) => {
      try {
        
        const { text } = res || {};
        o.args = parsArgs(text);

        const data = parsWordInfo(text);

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