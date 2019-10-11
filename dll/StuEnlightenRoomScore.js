
const { jvtc_get } = require('../utils/jvtc_request');
const {  parsArgs, parsStuEnlightenRoomScore} = require('../utils/jvtc_pars');
const { StuEnlightenRoomScore } = require('../apis/api');

async function jvtc_fun() {

  return new Promise((resolve, reject) => {

    const { o } = this;

    jvtc_get(StuEnlightenRoomScore, o, (err, res) => {
      try {
        const { text } = res;
        o.args = parsArgs(text);
        
        const data = parsStuEnlightenRoomScore(text);

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