
const { jvtc_post } = require('../utils/jvtc_request');
const { parsArgs, parsStuEnlightenRoomScore } = require('../utils/jvtc_pars');
const { StuEnlightenRoomScore } = require('../apis/api');

async function jvtc_fun() {

  return new Promise((resolve, reject) => {

    const { o } = this;
    const args = {
      // ...this.o.args,
      __EVENTTARGET: 'GridView1',
      __EVENTARGUMENT: 'Page$3',
      __VIEWSTATEENCRYPTED: ''
    };
    jvtc_post(StuEnlightenRoomScore, { cookies: o.cookies, args }, (err, res) => {
      try {
        if (!res) {
          throw err;
        }
        const { text } = res;
        o.args = parsArgs(text);

        const data = parsStuEnlightenRoomScore(text) || [];

        resolve([null, 0, data.reverse()]);

      } catch (error) {
        reject(error);
      }
    });
  }).catch((error) => {
    return [error, null, null];
  })
}

module.exports = jvtc_fun;