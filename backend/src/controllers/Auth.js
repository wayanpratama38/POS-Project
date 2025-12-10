import {RegisterValidator, LoginValidator} from '../validator/Auth.js';
import AuthService from '../services/Auth.js';

export default class AuthController {
	constructor() {
		// Binding all the controller
		this.registerUser = this.registerUser.bind(this);
		this.loginUser = this.loginUser.bind(this);
		this.service = new AuthService();
	}

	// POST Register User
	async registerUser(req, res, next) {
		// Get request body
		const {fullname, username, password} = req.body;

		try {
			// Validate user input
			const validatedData = RegisterValidator.parse({
				fullname,
				username,
				password,
			});

			// Use AuthService
			const data = await this.service.registerUser({...validatedData});

			// Send response
			return res.status(201).json({
				status: 'success',
				message: 'Berhasil membuat akun baru',
				data: {...data},
			});
		} catch (err) {
			next(err);
		}
	}

	// POST Login User
	async loginUser(req, res, next) {
		// Get request body
		const {username, password} = req.body;

		try {
			// Validate user input
			const validatedData = LoginValidator.parse({username, password});

			// Use AuthService.loginUser()
			await this.service.loginUser({...validatedData});

			return res.status(200).json({
				status: 'success',
				message: 'Berhasil login',
			});
		} catch (err) {
			next(err);
		}
	}
}
