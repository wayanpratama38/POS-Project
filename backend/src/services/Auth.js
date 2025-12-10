import prisma from '../config/DBConnection.js';
import bcrypt from 'bcrypt';
import HTTPError from '../utils/HTTPError.js';

export default class AuthService {
	// POST Register User
	async registerUser({fullname, username, password}) {
		const isUserAvailable = await prisma.user.findUnique({
			where: {username: username},
		});

		if (!isUserAvailable) {
			throw new HTTPError('Username sudah digunakan', 400);
		}

		const hashedPassword = await bcrypt.hash(password, 10);
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
				password: true,
			},
		});

		// check if user exist or password is wrong!
		if (!userData || !(await bcrypt.compare(password, userData.password))) {
			throw new HTTPError('Username dan password tidak ditemukan!', 400);
		}
	}
}
