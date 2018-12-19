const jvtcPrototype = require("../middles/jvtcPrototype.js");

class Jvtc {
	constructor({cookies,args} = {args:{}}) {

		this.o = {
			cookies: cookies,
			args: args
		};

	}

}

jvtcPrototype.init(Jvtc);

module.exports = Jvtc;




// ------------------以前的代码---------------------------




/*

const url_o = "http://xz.jvtc.jx.cn/JVTC_XG/WebSite/ClassManageWeb/ClassActive_More.html";

const o = {
	cookies: "",
	args: {}
};

function init() {

	jvtc_get(url_o, { cookies: "", args: "" }, (err, res) => {
		o.cookies = parsCookies(res.headers)

		o.args = parsArgs(res.text);

		event.emit("ok");
	});

}

module.exports.login = async function ({ loginName, loginPwd }) {


	return new Promise((resolve, reject) => {

		event.on('ok', () => {
			// console.log(o.args);

			o.args['Top1$UserName'] = loginName;
			o.args["Top1$PassWord"] = loginPwd;

			jvtc_post(url_o, o, (err, res) => {

				const $ = cheerio.load(res.text);
				const rex = /\((.*?)\)/;

				const html = new String($("script").html())

				const ms = html.match(rex);

				if (ms && ms.length > 2) {

					console.log(ms[1])
					reject(ms[1]);

				} else {

					// $("a").attr("href")
					// http://xz.jvtc.jx.cn/JVTC_XG/SystemForm/WorkInfo.aspx
					o.cookies += parsCookies(res.headers);
					console.log(o.cookies);

					resolve([null, JSON.parse(JSON.stringify(o))]);

				}

			});

		});

		init();
	}).catch((error) => {
		return [error, null];
	});
}

async function test() {
	// console.log(123);
	// console.log( module.exports.login());

	const [error, res] = await module.exports.login({
		loginName: "172052267", loginPwd: "542679"
	});
	jvtc_get("http://xz.jvtc.jx.cn/JVTC_XG/SystemForm/WorkInfo.aspx", o, (error, res) => {
		console.log(res.text);
	});

	// console.log(error, res)

}

*/
// test();