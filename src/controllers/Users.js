const JH_Controller 	= require('../system/core/JH_Controller');
const asyncHandler 		= require('express-async-handler');
const generateToken 	= require('../utils/generateTokens.js');
const validator 		= require('validator');

class Users extends JH_Controller {
	constructor() {
		super();
		this.user = this.load.Model('User');
	}

	/* This function is to display the index view file.
	 */
	index = (req, res) => {
		res.send("Welcome to users API");
	}

	/*	This function is to process the login if the user is attempt to login.
	 */
	process_login = asyncHandler(async (req, res) => {
		try {
			const { email, password } = req.body;

			const user = await this.user.findOne({ email });

			if(!user) {
				res.status(404);
				throw new Error(`The email is invalid, try again!`);
			} else {
				const passwordResult = await user.matchPassword(password, user.password);

				if(passwordResult) {
					generateToken(res, user._id);

					res.status(200).json({
						full_name: user.full_name,
						email: user.email,
						phone_number: user.phone_number,
						created_at: user.createdAt
					});
				} else {
					res.status(403);
					throw new Error(`Invalid password, try again!`);
				}
			}
		} catch (error) {
			res.status(500);
			throw new Error(error.message);
		}
	});

	/*	This function is to process the register if the user is attempt to register.
	 */
	process_register = asyncHandler(async (req, res) => {
        try {
			const { full_name, email, phone_number, password, confirm_password } = req.body;

			const userExists = await this.user.findOne({ email });

			if(userExists) {
				res.status(400);
				throw new Error("User already exists.");
			}
			
			if(!validator.equals(password, confirm_password)) {
				res.status(401);
				throw new Error("Password and confirm password doesn't match!");
			}

			const user = await this.user.create({
				full_name,
				email,
				phone_number,
				password,
			});

			if(user) {
				generateToken(res, user._id);
				res.status(200).json({ message: 'User successfully registered!' });
			} else {
				res.status(401);
				throw new Error("Invalid user data.");
			}
        } catch(error) {
            res.status(500);
			throw new Error(error.message);
        }
	});

	/*	This function is to process the logout if the user is attempt to logout.
	 */
	process_logOut = asyncHandler((req, res) => {
  		const token = req.cookies.jwt;

		if (!token) 
		{
			res.status(401);
			throw new Error('Unauthorized');
		}

		res.cookie('jwt', '', {
			httpOnly: true,
			expires: new Date(0),
		});
		res.status(200).json({ message: 'Logged out successfully' });
	});

	/* This function is when the user has token and can able to access, otherwise will not.
	 */
	getUserProfile = asyncHandler(async (req, res) => {
		const user = req.user;
	  
		if (user) {
		  res.json(user);
		} else {
		  res.status(404);
		  throw new Error('User not found');
		}
	});
}

module.exports = new Users();
