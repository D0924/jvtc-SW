
const cheerio = require('cheerio');

function parsArgs(html) {
  const args = {};
  const $ = cheerio.load(html);
  const __VIEWSTATE = $('input[name=__VIEWSTATE]').val()
  const __VIEWSTATEGENERATOR = $('input[name=__VIEWSTATEGENERATOR]').val()
  const __EVENTVALIDATION = $('input[name=__EVENTVALIDATION]').val()
  const __VIEWSTATEENCRYPTED = $('input[name=__VIEWSTATEENCRYPTED]').val()
  const __EVENTTARGET = $('input[name=__EVENTTARGET]').val()
  const __EVENTARGUMENT = $('input[name=__EVENTARGUMENT]').val()

  args.__VIEWSTATE = __VIEWSTATE || '';
  args.__VIEWSTATEGENERATOR = __VIEWSTATEGENERATOR || '';
  args.__EVENTVALIDATION = __EVENTVALIDATION || '';
  args.__VIEWSTATEENCRYPTED = __VIEWSTATEENCRYPTED || '';
  args.__EVENTTARGET = __EVENTTARGET || '';
  args.__EVENTARGUMENT = __EVENTARGUMENT || '';


  return args;
}

function parsCookies(headers) {
  // console.log(headers);

  let cookies = "";
  let endC = {};
  if (!headers['set-cookie']) {
    throw new Error("学工网处理出现问题，请重试！");
  }
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
      BankNo: null,
      OneCard: null,
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


function parsStuActive(html) {

  const $ = cheerio.load(html), data = [

  ];
  /*
   {
      id:null,
      name:null,
      unit:null,
      date:null,
      type:null,
      score:null,
      stat:null
    }
  */

  $('[class="white"] tr').not('.whitehead').each((i, v) => {
    const $td = $(v).children('td')

    if (!$td.children('a') || !$td.children('a').attr('href')) {
      return;
    }
    // MyAction_View.aspx?Id=6123

    try {

      const id = $td
        .children('a')
        .eq(0)
        .attr('href')
        .split('=')[1]
        ,
        name = $td
          .children('a')
          .eq(0)
          .text()
        ,
        unit = $($td.get(1)).text()
        ,
        date = $($td.get(2)).text()
        ,
        type = $($td.get(3)).text()
        ,
        score = $($td.get(6)).text()
        ,
        stat = $($td.get(7)).text()
        ,
        one = {
          id,
          name,
          unit,
          date,
          type,
          score,
          stat
        }
      data.push(one)

    } catch (error) {
      // 不处理
    }

  });

  return data;
}

function parsWordInfo(html) {

  const $ = cheerio.load(html), data = {
    absence: null,
    truant: null,
    study: null,
    Illegal: null,
    Failing: null,
    grade: null,
    score: null,
    flunk: null,
    dorm: null
  };

  /*
   {
      id:null,
      name:null,
      unit:null,
      date:null,
      type:null,
      score:null,
      stat:null
    }
  */
  if (/本人所带班级/.test(html)) {
    // console.log(123);
  }

  const $style = $('span.STYLE1');
  if (!$style || !$style.length) {
    throw "错误";
  }
  let i = 0;
  for (const key in data) {

    try {
      data[key] = $($style.get(i++)).text();
    } catch (error) {
      data[key] = "0";
    }

  }

  return data;
}

function parsMyActionGetNum(html) {

  const $ = cheerio.load(html), data = {
    CountA1: null,
    CountB1: null,
    CountC1: null,
    CountD1: null,
    CountE1: null,
    CountF1: null,
    SunCount1: null,
    Status: null
  };

  const $style = $('tr');

  const keys = Object.keys(data);

  keys.forEach(key => {
    try {
      data[key] = $style.find(`span#${key}`).text();
    } catch (error) {

    }
  });


  return data;
}

function parsStuEnlightenRoomScore(html) {

  const $ = cheerio.load(html), data = [

  ];
  // console.log(html);
  // console.log( $('[class="white"] tr'));

  $('[class="white"] tr').not('.whitehead').each((i, v) => {
    const $td = $(v).children('td')

    // MyAction_View.aspx?Id=6123
    // console.log($($td.get(0)).text());
    if ($td.length < 5) {
      return;
    }
    try {
      const dorm = $($td.get(0)).text().replace(/[\s\n\r\t]/g, "")
        ,
        score = $($td.get(3)).text().replace(/[\s\n\r\t]/g, "")
        ,
        grade = $($td.get(4)).text().replace(/[\s\n\r\t]/g, "") || "安全"
        ,
        source = $($td.get(5)).text().replace(/[\s\n\r\t]/g, "")
        ,
        time = $($td.get(6)).text().replace(/[\s\n\r\t]/g, "")
        ,
        week = $($td.get(7)).text().replace(/[\s\n\r\t]/g, "")
        ,
        one = {
          dorm,
          score,
          grade,
          source,
          time,
          week
        }
      data.push(one)

    } catch (error) {
      // 不处理
      // console.log(error);

    }

  });

  return data;
}

function parsePostData(ctx) {

  return new Promise((resolve, reject) => {
    try {
      let postdata = "";
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener("end", function () {
        resolve([null, postdata])
      })
    } catch (err) {
      reject(err)
    }
  }).catch((err) => {
    return [err, null];
  })
}


/**
 * 解析（节假）表格专用
 */
function parseTeacherArgs({ html, keys = [], additionalCB, fromIndex = 0, optionsKeys = [] }) {

  const $ = cheerio.load(html);
  const optionsKey = optionsKeys;

  const parameters = [
    ...(new Array(optionsKey.length).join().split(',').map(() => []))
  ];
  const list = [];
  const trs = $('[class="white"] tr').not('.whitehead');

  optionsKey.forEach((item, index) => {
    const p = parameters[index];
    $(`[name="${item}"]`).children('option').each((index, item) => {
      const text = $(item).text(),
        val = $(item).val();
      if (!text || !val) {
        return;
      }
      p.push({
        text,
        val
      });
    });
  });
  // 获取内容
  console.log(trs.text());

  if (trs.eq(0).text().trim().indexOf('未找到相关数据') === -1) {
    trs.each((index, item) => {
      const tds = $(item).children('td');
      const stuMap = {};
      if (additionalCB) {
        const { key, value } = additionalCB(tds);
        stuMap[key] = value;
      }
      keys.forEach((item, index) => {
        stuMap[item] = (tds.eq(index + fromIndex).text());
      });
      // console.log(stuMap);

      list.push(stuMap);
    });
  }
  return {
    parameters,
    list
  }
}

// 老师相关

function parseTeacherInfo(html) {

  const $ = cheerio.load(html), userinfo = {
    basicsinfo: {
      UserID: null,
      XGH: null,
      UserName: null,
      Polity: null,
      UserType: null,
      IsMarriage_0: null,
      SchoolArea: null,
      Unit: null,
      Sex: null,
      Nation: null
    },
  };

  for (const key in userinfo) {
    const info = userinfo[key];
    // 获取基本资料
    for (const key in info) {
      info[key] = $('#Body table .TableBlack tr').find(`[name="PersonInfo1$${key}"]`).val();
    }

  }
  return userinfo;
}

function parseTeacherReSetpass(html) {

  const rex = /<script>alert\(\'学生(.*?)密码重置成功,请牢记！\'\)<\/script>/;
  const rexErr = /<script>alert\(\'(.*?)\'\)<\/script>/;

  return {
    type: rex.test(html), msg: html.match(rexErr)[1]
  };
}

function parseTeacherFDYAllLeaveExam(html) {
  const optionsKeys = ['TermNo', 'ClassNo', 'Status'];
  const keys = [
    'stu_id',
    'name',
    'sex',
    'date', 'x_date', 'reason', 'location', 'class',
    'period', 'stat'];

  const resData = parseTeacherArgs({
    optionsKeys,
    html,
    keys,
    additionalCB(tds) {
      return {
        key: 'id',
        value: (tds.eq(0).children('a').eq(0).attr('href').match(/Id=([0-9]+)/)[1])
      };
    }
  });

  return resData;

}

function parsFDYAllLeaveExam_EditForm(html) {
  const $ = cheerio.load(html);
  const postData = {};
  // 审批 获取 post数据
  $('[name*=AllLeave1]').each((index, item) => {
    if ($(item).attr('type') === 'radio') return;
    postData[$(item).attr('name')] = $(item).val() || '';
  });
  $('[name*=FDYExam1]').each((index, item) => {
    if ($(item).attr('type') === 'radio') return;
    postData[$(item).attr('name')] = $(item).val() || '';
  });
  $('input:radio:checked').each((index, item) => {
    postData[$(item).attr('name')] = $(item).val() || '';
  });
  return postData;
}

function parseTeacherFDYAllLeaveExamStat(html) {
  const rexErr = /<script>alert\('操作成功!'\);<\/script>/;
  try {
    if (rexErr.test(html)) {
      return {
        stat: 1
      };
    }
    throw new Error(html.match(/<script>alert\('(.*?)'\);<\/script>/) && html.match(/<script>alert\('(.*?)'\);<\/script>/).length && html.match(/<script>alert\('(.*?)'\);<\/script>/)[1]);
  } catch (error) {
    return { error: error };
  }
}


function parseTeacherFDYLeaveExam(html) {
  const rexErr = /<script>alert\('操作成功(.*?)'\);<\/script>/;
  if (rexErr.test(html)) {
    return {
      stat: 1
    };
  }

  const optionsKeys = ['OrderId', 'ClassNo', 'Status'];
  const keys = [
    'stu_id', 'name', 'sex',
    'date', 'x_date', 'reason', 'location', 'class',
    'stat', 'period'
  ];
  const resData = parseTeacherArgs({
    optionsKeys,
    html,
    keys,
    fromIndex: 1,
    additionalCB(tds) {
      return {
        key: 'id',
        value: (tds.eq(0).children('input[name*=GridView]').attr('name'))
      };
    }
  });
  return resData;
}


function parseTeacherFDYDisAllLeave(html) {
  const rexErr = /<script>alert\('操作成功！'\);<\/script>/;
  if (rexErr.test(html)) {
    return {
      stat: 1
    };
  }

  const optionsKeys = ['TermNo', 'ClassNo', 'LeaveType'];
  const keys = [
    'stu_id', 'name', 'sex',
    'date', 'x_date', 'type', 'location', 'class', 'term'
  ];

  const resData = parseTeacherArgs({
    optionsKeys,
    html,
    keys,
    fromIndex: 2,
    additionalCB(tds) {
      return {
        key: 'id',
        value: (tds.eq(0).children('input[name*=GridView]').attr('name'))
      };
    }
  });

  return resData;
}


function parseTeacherFDYDisLeave(html) {
  const rexErr = /<script>alert\('操作成功！'\);<\/script>/;
  if (rexErr.test(html)) {
    return {
      stat: 1
    };
  }

  const optionsKeys = ['TermNo', 'ClassNo', 'Status'];
  const keys = [
    'stu_id', 'name', 'sex',
    'date', 'x_date', 'reason', 'location', 'class',
  ];

  const resData = parseTeacherArgs({
    optionsKeys,
    html,
    keys,
    fromIndex: 2,
    additionalCB(tds) {
      return {
        key: 'id',
        value: (tds.eq(0).children('input[name*=GridView]').attr('name'))
      };
    }
  });

  return resData;

}



module.exports = {
  parsCookies,
  parsArgs,
  parsUserinfo,
  parsStuActive,
  parsWordInfo,
  parsMyActionGetNum,
  parsStuEnlightenRoomScore,
  parsePostData,
  // 老师相关
  parseTeacherInfo,
  parseTeacherReSetpass,
  parseTeacherFDYAllLeaveExam,
  parsFDYAllLeaveExam_EditForm,
  parseTeacherFDYAllLeaveExamStat,
  parseTeacherFDYLeaveExam,
  parseTeacherFDYDisAllLeave,
  parseTeacherFDYDisLeave
}