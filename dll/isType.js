
async function jvtc_fun() {

  return new Promise(async (resolve, reject) => {
    let type = 0;
    const [error, code, text] = await this.getNavigation();
    if (error) throw error;

    if (code !== 0) {
      reject(error);
    }
    const regT = /教师个人平台/;
    const regC = /班主任/;
    if (regT.test(text)) {
      type = 1;
      if (regC.test(text)) {
        type = 2;
      }
    }
    console.log(type);
    
    resolve([null, type]);
  }).catch((error) => {
    return [error, null, null];
  })
}

module.exports = jvtc_fun;