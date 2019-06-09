
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
    if($td.length < 5){
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

module.exports = {
  parsCookies,
  parsArgs,
  parsUserinfo,
  parsStuActive,
  parsWordInfo,
  parsMyActionGetNum,
  parsStuEnlightenRoomScore,
  parsePostData
}