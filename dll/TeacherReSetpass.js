
const { jvtc_post } = require('../utils/jvtc_request');
const { parsArgs, parseTeacherReSetpass } = require('../utils/jvtc_pars');
const { TeacherReSetpass } = require('../apis/api');

async function jvtc_fun(StudentNo) {

  return new Promise((resolve, reject) => {

    const { o } = this;

    jvtc_post(TeacherReSetpass, {
      cookies: o.cookies,
      args: {
        ...o.args
      },
    }, (err, res) => {

      try {

        if (!res) {
          throw err;
        }

        const { text } = res;
        o.args = parsArgs(text);

        jvtc_post(TeacherReSetpass, {
          cookies: o.cookies,
          args: {
            ...o.args,
            StudentNo,
            BtnStudent: '%D6%D8%D6%C3%C3%DC%C2%EB'
          },
        }, (err, res) => {
          try {
            if (!res) {
              throw err;
            }
            const { text } = res;
            console.log(text);

            const data = parseTeacherReSetpass(text);
            resolve([null, 0, data]);
          } catch (error) {
            reject(error);
          }
        });

      } catch (error) {
        reject(error);
      }
    });
  }).catch((error) => {
    return [error, null, null];
  })
}

module.exports = jvtc_fun;