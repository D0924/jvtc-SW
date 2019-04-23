const AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
const { APP_ID, API_KEY, SECRET_KEY } = require(process.env.NODE_ENV == 'development' ? '../ocr.config.dev' : '../ocr.config')

// 新建一个对象，建议只保存一个对象调用服务接口
const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

module.exports = client;