import prisma from '../config/DBConnection.js';
import HTTPError from '../utils/HTTPError.js';
import {JWTUtils} from '../utils/JWTutils.js';

// verified requested refresh token with DB version of refresh token
const verifiedDBRefreshToken = async (refreshToken) => {
	const data = await prisma.refreshToken.findUnique({
		where: {refresh_token: refreshToken},
	});
	return !data ? false : true;
};

const RefreshService = {
	// POST get current refreshToken and generate accessToken
	postRefreshToken: async (refreshToken) => {
		// check if refresh token available in db first
		const isDBVerified = await verifiedDBRefreshToken(refreshToken);
		if (!isDBVerified) {
			throw new HTTPError('Refresh token tidak ditemukan', 404);
		}

		// verified using JWTUtils
		const isVerified = JWTUtils.verifyRefreshToken(refreshToken);
		if (!isVerified) {
			throw new HTTPError('Session expired', 401);
		}

		// get id and username, and create payload
		const payload = {id: isVerified.id, username: isVerified.username};
		const newAccessToken = JWTUtils.createAccessToken(payload); // create access token
		const newRefreshToken = JWTUtils.createRefreshToken(payload); // create refresh token

		// Update old refresh token with the new refresh token
		await prisma.refreshToken.update({
			where: {refresh_token: refreshToken},
			data: {refresh_token: newRefreshToken},
		});

		// return newly refresh and access token
		return {refreshToken: newRefreshToken, accessToken: newAccessToken};
	},
};

export default RefreshService;
