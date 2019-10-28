const Bmob = require('hydrogen-js-sdk');


class Student {

  constructor() {
    this.table = Bmob.Query('student')
  }
  async save(sid, spass) {
    try {
      const table = this.table;
      table.equalTo("sid", "==", sid);
      const res = await table.find();
      const data = res[0];
      if (data) {
        table.set('id', data.objectId) //需要修改的objectId
      }
      table.set("sid", sid);
      table.set("spass", spass);
      await table.save();
    } catch (error) {
      console.log("ApiCount => ", error);
    }
  }
}

class ApiCount {

  constructor() {
    this.table = Bmob.Query('ApiCount')
  }
  async save(path) {
    try {
      this.table.set("path", path)
      await this.table.save();
    } catch (error) {
      console.log("ApiCount => ", error);
    }
  }
}

class Msg {

  constructor() {
    this.table = Bmob.Query('msg')
  }
  async save(msg) {
    try {
      this.table.set("msg", msg)
      await this.table.save();
    } catch (error) {
      console.log("ApiCount => ", error);
    }
  }
}


function init(secretKey, securityCode) {
  Bmob.initialize(secretKey, securityCode);
  return {
    ApiCount,
    Student,
    Msg
  }
}

module.exports = init;