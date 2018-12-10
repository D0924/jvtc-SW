const Jvtc = require('./bin/jvtc');

const formdata = {
	loginName: "172052267", loginPwd: "542679"
}

const jvtc = new Jvtc(formdata);

jvtc.login().then((a)=>{

	console.log(a);
	

	// jvtc_get("http://xz.jvtc.jx.cn/JVTC_XG/SystemForm/WorkInfo.aspx", jvtc.o, (error, res) => {
	// 		console.log(res.text);
	// });

});