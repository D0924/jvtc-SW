const { jvtc_post } = require('../utils/jvtc_request');
const { parsArgs, parseTeacherFDYDisAllLeave } = require('../utils/jvtc_pars');
const { FDYDisAllLeave } = require('../apis/api');
const { json2form } = require('../utils/utils');
async function jvtc_fun({ ids = [], TermNo = '', ClassNo = '', LeaveType = '', StudentNo = '', StudentName = '', BtnSearch = '%B2%E9+%D1%AF' }) {

  return new Promise((resolve, reject) => {

    jvtc_post(FDYDisAllLeave, { cookies: this.o.cookies, args: {} }, (err, res) => {
      const { text } = res;
      this.o.args = parsArgs(text);
      const ids_ = {};
      // 条目id
      ids.forEach(item => {
        ids_[item] = 'no';
      });

      const args = {
        ...this.o.args,
        TermNo, ClassNo, StudentNo, StudentName: StudentName, LeaveType, BtnSearch,
        ...ids_,

      };
      if (ids.length) {
        args['JTSP'] = '批量审批通过'
      }

      jvtc_post(FDYDisAllLeave, { cookies: this.o.cookies, args: json2form(args) }, (err, res) => {
        try {
          if (!res) {
            throw err;
          }
          const { list, parameters, stat } = parseTeacherFDYDisAllLeave(res.text);
          if (stat === 1) {
            return resolve([null, { stat: 1, msg: '操作成功' }]);
          }
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
