const jvtcPrototype = require("../middles/jvtcPrototype.js");
class Jvtc {
	constructor({ cookies, args } = { args: {} }) {

		this.o = {
			cookies,
			args
		};

	}

}

jvtcPrototype.init(Jvtc);

module.exports = function () {

	return async (ctx, next) => {

		const authorization = ctx.header['authorization'];

		const token = authorization && authorization.split(' ') && authorization.split(' ')[1] || null;
		let o = {};
		if (token) {

			const { loginName } = await ctx.jwt.getPayload(token);

			o = await ctx.store.get(loginName) || o;
			 
		}
		
		if(o !== null){
			ctx.jvtc = new Jvtc(o);

			await next();
		}else{
			ctx.throw(401);
		}
		
		
	}
};