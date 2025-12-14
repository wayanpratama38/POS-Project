import prisma from '../config/DBConnection.js';
import bcrypt from 'bcrypt';
import json from 'jsonwebtoken';
import HTTPError from '../utils/HTTPError.js';

export default class AuthService {
	// POST Register User
	async registerUser({fullname, username, password}) {
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
	}

	// POST Login User
	async loginUser({username, password}) {
		const userData = await prisma.user.findUnique({
			where: {username: username},
			select: {
				username: true,
				password: true,
			},
		});

		// check if user exist or password is wrong!
		if (!userData || !(await bcrypt.compare(password, userData.password))) {
			throw new HTTPError('Username dan password tidak ditemukan!', 400);
		}

		// create token
		const JWTToken = json.sign(
			{username: userData.username, password: userData.password},
			process.env.JWT_SECRET_KEY,
			{expiresIn: '1h'}
		);

		// Return user credential and token (i think after this it will just JWT Token returned)
		return {...userData, token: JWTToken};
	}
}
