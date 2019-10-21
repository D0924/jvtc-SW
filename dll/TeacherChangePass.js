const { jvtc_get, jvtc_post } = require('../utils/jvtc_request');
const { parsArgs } = require('../utils/jvtc_pars');
const { TeacherChangePass } = require('../apis/api');
async function jvtc_fun({ OldPass, NewPass, NewPassAgin }) {
  console.log(OldPass, NewPass, NewPassAgin);

  return new Promise((resolve, reject) => {

    jvtc_get(TeacherChangePass, { cookies: this.o.cookies, args: "" }, (err, res) => {
      const { text } = res;
      this.o.args = parsArgs(text);

      const args = {
        ...this.o.args,
        OldPass,
        NewPass,
        NewPassAgin,
        __EVENTTARGET: "Save"
      }

      console.log(args);


      jvtc_post(TeacherChangePass, { cookies: this.o.cookies, args }, (err, res) => {
        try {
          if (!res) {
            throw err;
          }
          const html = res.text.substr(0, 200)

          if (html) {

            const rex = /alert\('(.*?)'\)/;
            const ms = html.match(rex);
            
            if (ms && ms.length >= 2) {

              if (ms[1].indexOf('修改成功') !== -1) {
                resolve([null, 0]);
                return;
              }
              throw ms[1];
            }

          }

          throw "未成功";

        } catch (error) {
          reject(error);
        }
      });
    });


  }).catch((error) => {
    return [error, null];
  });
}

module.exports = jvtc_fun;
