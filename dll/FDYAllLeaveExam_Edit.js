const { jvtc_get, jvtc_post } = require('../utils/jvtc_request');
const { parsArgs, parsFDYAllLeaveExam_EditForm, parseTeacherFDYAllLeaveExamStat } = require('../utils/jvtc_pars');
const { FDYAllLeaveExam_Edit } = require('../apis/api');
const { json2form } = require('../utils/utils');
async function jvtc_fun({ id, type }) {

  return new Promise((resolve, reject) => {

    jvtc_get(FDYAllLeaveExam_Edit + id, { cookies: this.o.cookies }, (err, res) => {
      if (!res) {
        return reject(err);
      }
      const { text } = res;
      this.o.args = parsArgs(text);
      const form = parsFDYAllLeaveExam_EditForm(text);
      let typsObj = {
        'SPTJ.x': (Math.random() * 30) | 0,
        'SPTJ.y': (Math.random() * 30) | 0,
      };
      if (type == 2) {
        
        typsObj = {
          'SPJJ.x': (Math.random() * 30) | 0,
          'SPJJ.y': (Math.random() * 30) | 0,
        }
      }
      const args = {
        ...this.o.args,
        ...form,
        ...typsObj
      }

      jvtc_post(FDYAllLeaveExam_Edit + id, { cookies: this.o.cookies, args: json2form(args) }, (err, res) => {
        try {
          if (!res) {
            throw err;
          }
          // console.log(res.text);

          const { stat, error } = parseTeacherFDYAllLeaveExamStat(res.text);
          if (error) {
            return reject(error);
          }

          resolve([null, stat]);

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
