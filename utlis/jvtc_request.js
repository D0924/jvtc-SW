
const superagent = require('superagent');
const charset = require("superagent-charset");
// const nocache = require('superagent-no-cache');
charset(superagent); //设置字符

function jvtc_post(url, { cookies, args }, fn) {
	superagent.post(url)
		.timeout(5 * 1000)
		.set('Cookie', cookies)
		// // 
		.type("form")
		// .use(nocache)
		.buffer(true)
		.charset()
		.redirects(0)
		.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36")
		.set("Referer", "http://xz.jvtc.jx.cn/JVTC_XG/UserLogin.html")
		.set('Content-Type', "application/x-www-form-urlencoded")
		.send(args)
		.end(fn)
}

function jvtc_get(url, { cookies, args } = {}, fn) {
	// console.log(cookies);

	superagent.get(url)
		.set('Cookie', cookies)
		.timeout(5 * 1000)
		// // 
		// .type("form")
		// .use(nocache)
		.buffer(true)
		.charset()
		// .redirects(0)
		.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36")
		.set("Referer", "http://xz.jvtc.jx.cn/JVTC_XG/UserLogin.html")
		// .set('Content-Type', "application/x-www-form-urlencoded")
		// .send(args)
		.end(fn)
}

module.exports = {
	jvtc_get,
	jvtc_post
}