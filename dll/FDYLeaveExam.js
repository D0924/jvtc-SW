const { jvtc_post } = require('../utils/jvtc_request');
const { parsArgs, parseTeacherFDYLeaveExam } = require('../utils/jvtc_pars');
const { FDYLeaveExam } = require('../apis/api');
const { json2form } = require('../utils/utils');
async function jvtc_fun({ TermNo = '', ClassNo = '', StudentNo = '', StudentName = '', Status = 1, BtnSearch = '%B2%E9+%D1%AF' }) {

  return new Promise((resolve, reject) => {

    jvtc_post(FDYLeaveExam, { cookies: this.o.cookies, args: {} }, (err, res) => {
      const { text } = res;
      this.o.args = parsArgs(text);

      const args = {
        ...this.o.args,
        TermNo, ClassNo, StudentNo, StudentName: StudentName, Status, BtnSearch
      }
      
      jvtc_post(FDYLeaveExam, { cookies: this.o.cookies, args:json2form(args)  }, (err, res) => {
        try {
          if (!res) {
            throw err;
          }
          const { list, parameters } = parseTeacherFDYLeaveExam(res.text);

          resolve([null, { list, parameters }]);

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
