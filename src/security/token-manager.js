import jwt from 'jsonwebtoken';
import InvariantError from '../exceptions/invariant-error.js';

const TokenManager = {
  generateAccessToken: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN_KEY),
  generateRefreshToken: (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN_KEY),
  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      return artifacts;
    } catch {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

TokenManager.verify = (accessToken, secret) => {
  try {
    const payload = jwt.verify(accessToken, secret);
    return payload;
  } catch (error) {
    console.log(error);
    throw new InvariantError('Access token tidak valid');
  }
};

export default TokenManager;