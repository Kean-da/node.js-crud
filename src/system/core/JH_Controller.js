const http = require("../middlewares/Http_Middleware").http;

class JH_Controller {
	constructor() {
		this.load = {
			View: (name, data = {}) => {
				http.response.render(name, { ...data });
			},
			Model: (name) => {
				return require(`../../models/${name}`);
			},
		};
	}
}

module.exports = JH_Controller;
