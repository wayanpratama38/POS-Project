import prisma from '../config/DBConnection.js';
import bcrypt from 'bcrypt';
import HTTPError from '../utils/HTTPError.js';
import {JWTUtils} from '../utils/JWTutils.js';

// Helper for set refresh token in database
async function setRefreshToken(token) {
	await prisma.refreshToken.create({
		data: {refresh_token: token},
	});
}

export const AuthService = {
	// POST Register User
	registerUser: async ({fullname, username, password}) => {
		// Check username if available
		const isUserAvailable = await prisma.user.findUnique({
			where: {username: username},
		});

		// throw new error if username already taken
		if (isUserAvailable) {
			throw new HTTPError('Username sudah digunakan', 400);
		}

		// hashed password
		const hashedPassword = await bcrypt.hash(password, 10);
		// create new user
		const newUser = await prisma.user.create({
			data: {
				username: username,
				fullname: fullname,
				password: hashedPassword,
			},
			select: {
				id: true,
				fullname: true,
				username: true,
			},
		});

		return {...newUser};
	},

	// POST Login User
	loginUser: async ({username, password}) => {
		const userData = await prisma.user.findUnique({
			where: {username: username},
			select: {
				username: true,
				id: true,
				password: true,
			},
		});

		// check if user exist or password is wrong!
		if (!userData || !(await bcrypt.compare(password, userData.password))) {
			throw new HTTPError('Username dan password tidak ditemukan!', 400);
		}

		// create token
		const payload = {username: userData.username, id: userData.id};
		const accessToken = JWTUtils.createAccessToken(payload);
		const refreshToken = JWTUtils.createRefreshToken(payload);
		await setRefreshToken(refreshToken);

		// Return user credential and token (i think after this it will just JWT Token returned)
		return {...userData, accessToken: accessToken, refreshToken: refreshToken};
	},

	// GET Check user availabilty
	isUserAvailable: async (id) => {
		const data = await prisma.user.findUnique({
			where: {id: id},
		});
		if (!data) {
			throw new HTTPError('User tidak ditemukan', 401);
		}
		return true;
	},

	// POST User logout
	logoutUser: async (refreshToken) => {
		await prisma.refreshToken.delete({
			where: {refresh_token: refreshToken},
		});
	},
};
