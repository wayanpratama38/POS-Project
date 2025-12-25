import jwt from 'jsonwebtoken';

export const JWTUtils = {
  // create access token 
  createAccessToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '15m' })
  },

  // create refresh token
  createRefreshToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' })
  },

  // verify access token
  verifyAccesToken: (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY)
  },

  // verify refresh token
  verifyRefreshToken: (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY)
  }
};
