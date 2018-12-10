const cheerio = require('cheerio');

const { jvtc_get, jvtc_post } = require('../utils/jvtc_request');
const { parsCookies, parsArgs, parsUserinfo } = require('../utils/jvtc_pars');

class Jvtc {
	constructor({ loginName, loginPwd }) {

		this.loginName = loginName;
		this.loginPwd = loginPwd;
		this.apiUrls = {
			login: "http://xz.jvtc.jx.cn/JVTC_XG/WebSite/ClassManageWeb/ClassActive_More.html",
			init: "http://xz.jvtc.jx.cn/JVTC_XG/WebSite/ClassManageWeb/ClassActive_More.html",
			userinfo: "http://xz.jvtc.jx.cn/JVTC_XG/SystemForm/Class/MyStudent.aspx"
		};

		this.o = {
			cookies: "",
			args: {}
		};

		this.isLogin = false;

	}

	async init() {

		return new Promise((resolve, reject) => {
			jvtc_get(this.apiUrls.init, { cookies: "", args: "" }, (err, res) => {
				try {
					const { o } = this;
					o.cookies = parsCookies(res.headers)

					o.args = parsArgs(res.text);
					if (o.cookies && o.args) {
						resolve([null, 0]);
					} else {
						throw "失败";
					}
				} catch (error) {
					reject(error);
				}
			});
		}).catch((error) => {
			return [error, null];
		})

	}

	async login() {

		const [e] = await this.init();
		// console.log(e,r);
		if (e) return ["初始化错误", -1];

		this.o.args['Top1$UserName'] = this.loginName;
		this.o.args["Top1$PassWord"] = this.loginPwd;
		return new Promise((resolve, reject) => {

			// console.log(o.args);
			jvtc_post(this.apiUrls.login, this.o, (err, res) => {
				try {
					// console.log(this.o);

					// if (err) {
					// 	throw err;
					// }

					const $ = cheerio.load(res.text);
					const html = new String($("script").html())
					if (html) {

						const rex = /alert\('(.*?)'\);/;
						const ms = html.match(rex);

						if (ms && ms.length >= 2) {
							
							throw ms[1];
							
						}

					}

					this.o.cookies += parsCookies(res.headers);
					// console.log(this.o.cookies);

					// 登陆成功标志
					this.isLogin = true;
					resolve([null, 0]);

				} catch (error) {
					reject(error);
				}
			});

		}).catch((error) => {
			return [error, null];
		});
	}

	async getUserinfo() {

		return new Promise((resolve, reject) => {
			const { o } = this;
			jvtc_get(this.apiUrls.userinfo, o, (err, res) => {
				try {
					const { text } = res;
					o.args = parsArgs(text);
					const userinfo = parsUserinfo(text);

					resolve([null, 0, userinfo]);


				} catch (error) {
					reject(error);
				}
			});
		}).catch((error) => {
			return [error, null, null];
		})


	}


}

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