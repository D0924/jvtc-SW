var iconv = require('iconv-lite');

function encode(str, charset) {

  var buf = iconv.encode(str, charset);
  var encodeStr = '';
  var ch = '';
  for (var i = 0; i < buf.length; i++) {
    ch = buf[i].toString('16');
    if (ch.length === 1) {
      ch = '0' + ch;
    }
    encodeStr += '%' + ch;
  }
  encodeStr = encodeStr.toUpperCase();
  return encodeStr;
}
console.log(encode('查 询','gb2312'));
