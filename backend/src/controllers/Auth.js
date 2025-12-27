import {RegisterValidator, LoginValidator} from '../validator/Auth.js';
import {AuthService} from '../services/Auth.js';

export const AuthController = {
	// POST Register User
	registerUser: async (req, res, next) => {
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
			const data = await AuthService.registerUser({...validatedData});

			// Send response
			return res.status(201).json({
				status: 'success',
				message: 'Berhasil membuat akun baru',
				data: {...data},
			});
		} catch (err) {
			next(err);
		}
	},

	// POST Login User
	loginUser: async (req, res, next) => {
		// Get request body
		const {username, password} = req.body;

		try {
			// Validate user input
			const validatedData = LoginValidator.parse({username, password});

			// Use AuthService.loginUser()
			const data = await AuthService.loginUser({...validatedData});

			res.cookie('accessToken', data.accessToken, {
				httponly: true,
				maxAge: 15 * 60 * 1000,
				path: '/',
				sameSite: 'strict',
			});

			res.cookie('refreshToken', data.refreshToken, {
				httponly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				path: '/',
				sameSite: 'strict',
			});

			return res.status(200).json({
				status: 'success',
				message: 'Berhasil login',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	},

	// POST logout from system
	logoutUser: async (req, res, next) => {
		const refreshToken = req.cookies.refreshToken;

		try {
			// call service for logout user
			await AuthService.logoutUser(refreshToken);

			// clear cookie
			res.clearCookie('accessToken');
			res.clearCookie('refreshToken');

			// send json response
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil logout',
			});
		} catch (err) {
			next(err);
		}
	},
};
