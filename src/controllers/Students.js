const JH_Controller = require('../system/core/JH_Controller');

class Students extends JH_Controller {
	constructor() {
		super();
		this.student = this.load.Model('Student');
	}

	/* This function is to display the index view file.
	 */
	index = (req, res) => {
		res.send("Hello Kean");
	}

	/* This function is to display the profile view file.
	 */
	display_profile = (req, res) => {
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.header('Expires', '-1');
		res.header('Pragma', 'no-cache');

		if(req.session.Id) {
			this.load.View("profile", {user_data: req.session.user_data});
		}
		else {
			res.redirect('/');
		}
	}

	/*	This function is to process the login if the user is attempt to login.
	 */
	process_login = async (req, res) => {
		let result =  this.student.validate_signin_form(req);
		
		if(result === "success") {
			let user = await this.student.get_student_by_email(req.body.email);

			if(user != undefined) {
				let result = this.student.validate_signin_match(user, req.body.password);

				if(result) {
					req.session.Id = user.id;
					req.session.user_data = user;
					res.redirect('profile');
				} 
				else {
					req.session.login_password = "Invalid password, try again!";
					res.redirect('/');
				}
			}
			else {
				req.session.login_email = "The email is invalid, try again!";
				res.redirect('/');
			}
		} else {
			req.session.login_validation = result;
			res.redirect('/');
		}
	}

	/*	This function is to process the register if the user is attempt to register.
	 */
	process_register = async (req, res) => {
		let result =  this.student.validate_register_form(req);

		if(result === "success") {
			let user = await this.student.get_student_by_email(req.body.email); //test if the email is already taken

			if(user === undefined) {
				await this.student.add_user(req); //passing form data to model
				res.redirect('/');
			}
			else {
				req.session.register_email = "The email is already taken";
				res.redirect('/');
			}
		} else {
			console.log(result);
			req.session.register_validation = result;
			res.redirect('/');
		}
	}

	/*	This function is to process the logout if the user is attempt to logout.
	 */
	process_logOut = (req, res) => {
		req.session.destroy();
		res.redirect('/');
	}
}

module.exports = new Students();
