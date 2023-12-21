class Http_Middleware {
	constructor() {
		this.http = {
			request: "",
			response: "",
		};
	}

	get_http = (req, res, next) => {
		this.http.request = req;
		this.http.response = res;
		next();
	};
}

module.exports = new Http_Middleware();
