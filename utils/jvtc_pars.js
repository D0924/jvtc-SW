
const cheerio = require('cheerio');

function parsArgs(html) {
  const args = {};
  const $ = cheerio.load(html);
  const __VIEWSTATE = $('input[name=__VIEWSTATE]').val()
  const __VIEWSTATEGENERATOR = $('input[name=__VIEWSTATEGENERATOR]').val()
  const __EVENTVALIDATION = $('input[name=__EVENTVALIDATION]').val()

  args.__VIEWSTATE = __VIEWSTATE;
  args.__VIEWSTATEGENERATOR = __VIEWSTATEGENERATOR;
  args.__EVENTVALIDATION = __EVENTVALIDATION;

  args['Top1$StuLogin.x'] = ~~(Math.random() * 30);
  args['Top1$StuLogin.y'] = ~~(Math.random() * 30);

  return args;
}

function parsCookies(headers) {
  // console.log(headers);

  let cookies = "";
  let endC = {};
  headers['set-cookie'].forEach((item) => {

    endC[(item.split(";")[0] + ";").split("=")[0]] = (item.split(";")[0] + ";").split("=")[1]
  })
  for (const iterator in endC) {
    cookies += iterator + "=" + endC[iterator];
  }
  return cookies;
}

function parsUserinfo(html) {

  const $ = cheerio.load(html), userinfo = {
    basicsinfo: {
      StudentName: null,
      StudentNo: null,
      Campus: null,
      BirthDay: null,
      National: null,
      Polity: null,
      NativePlace: null,
      InTime: null,
      WHCD: null,
      RXCJ: null,
      KL: null,
      IdCard: null,
      GetType1: null,
      BankName: null,
      BankNo: null
    },
    contactinfo: {
      MoveTel: null,
      Email: null,
      QQCard: null,
      WXH: null
    },
    homeinfo: {
      FatherName: null,
      MotherName: null,
      FatherTel: null,
      MotherTel: null,
    },
    schoolinfo: {
      SpeType: null,
      InStatus: null,
      CollegeNo: null,
      SpecialtyNo: null,
      Grade: null,
      ClassNo: null,
      BedNo: null
    }
  };

  for (const key in userinfo) {
    const info = userinfo[key];
    // 获取基本资料
    for (const key in info) {
      info[key] = $(`[name$='${key}'] [selected="selected"]`).text() || $(`[name$='${key}']`).val() || $(`[id$='${key}']`).text();
    }

  }
  return userinfo;
}






module.exports = {
  parsCookies,
  parsArgs,
  parsUserinfo
}