var iconv = require('iconv-lite');
function encode(str, charset = 'gb2312') {

  var buf = iconv.encode(str, charset);
  var encodeStr = '';
  var ch = '';
  for (var i = 0; i < buf.length; i++) {
    ch = buf[i].toString('16');
    if (ch.length === 1) {
      ch = '0' + ch;
    }
    encodeStr += ch === '20' ? '+' : '%' + ch;
  }
  encodeStr = encodeStr.toUpperCase();

  return encodeStr;
}
exports.encode = encode;

exports.json2form = function (obj) {
  let str = '';
  
  Object.keys(obj).forEach(key => {
    const val =/[\u4e00-\u9fa5]/.test(obj[key])? encode(obj[key]): encodeURIComponent(obj[key]);
    const endStr = encodeURIComponent(key) + "=" + val + "&";
    str += endStr;
  });
  console.log(str);
  
  return str;
}