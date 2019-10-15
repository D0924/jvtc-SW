const { jvtc_post } = require('../utils/jvtc_request');
const { parsArgs, parseTeacherFDYAllLeaveExam } = require('../utils/jvtc_pars');
const { FDYAllLeaveExam } = require('../apis/api');
const Iconv = require('iconv').Iconv;
const iconv = new Iconv('UTF-8', 'gb2312');

async function jvtc_fun({ TermNo = '', ClassNo = '', StudentNo = '', StudentName = '', Status = 1, BtnSearch = '%B2%E9+%D1%AF' }) {

  return new Promise((resolve, reject) => {

    jvtc_post(FDYAllLeaveExam, { cookies: this.o.cookies, args: {} }, (err, res) => {
      const { text } = res;
      this.o.args = parsArgs(text);

      const args = {
        ...this.o.args,
        TermNo, ClassNo, StudentNo, StudentName: encodeURI(iconv.convert(StudentName).toString()), Status, BtnSearch
      }

      jvtc_post(FDYAllLeaveExam, { cookies: this.o.cookies, args }, (err, res) => {
        try {
          if (!res) {
            throw err;
          }

          const { list, parameters } = parseTeacherFDYAllLeaveExam(res.text);

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
