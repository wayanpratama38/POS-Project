import RefreshService from '../services/Refresh.js';

const RefreshController = {
	// POST refresh token for getting new accesstoken
	postRefreshToken: async (req, res, next) => {
		// get the refresh token from cookies
		const refreshToken = req.cookies.refreshToken;

		// kinda confussed, should i verified refresh token from db or not
		try {
			// call the services
			const data = await RefreshService.postRefreshToken(refreshToken);

			// set new access and refresh token
			res.cookie('accessToken', data.accessToken, {
				httponly: true,
				maxAge: '90000',
				path: '/',
				sameSite: 'strict',
			});

			res.cookie('refreshToken', data.refreshToken, {
				httponly: true,
				maxAge: '90000',
				path: '/refresh',
				sameSite: 'strict',
			});

			return res.status(201).json({
				status: 'success',
				message: 'Berhasil membuat access dan refresh token baru',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	},
};

export default RefreshController;
