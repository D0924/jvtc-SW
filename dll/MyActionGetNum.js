
const { jvtc_get } = require('../utils/jvtc_request');
const { parsArgs, parsMyActionGetNum } = require('../utils/jvtc_pars');
const { MyActionGetNum } = require('../apis/api');

async function jvtc_fun() {

  return new Promise((resolve, reject) => {

    const { o } = this;

    jvtc_get(MyActionGetNum, o, (err, res) => {
      try {
        const { text } = res;
        o.args = parsArgs(text);

        const data = parsMyActionGetNum(text);

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