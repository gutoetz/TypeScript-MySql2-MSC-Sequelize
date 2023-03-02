import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import HttpException from './http.exception';

dotenv.config();

const secret = process.env.JWT_SECRET || 'secret';

const createToken = (username: string, id: number) => jwt.sign(
  { username, id },
  secret,
  { expiresIn: '7d', algorithm: 'HS256' },
);

const authenticatToken = async (token: string | undefined) => {
  if (!token) {
    const error = 'Token not found';
    throw new HttpException(401, error);
  }
  try {
    const decryptedData = jwt.verify(token, secret) as JwtPayload;
    return (decryptedData);
  } catch (err) {
    const error = 'Invalid token';
    throw new HttpException(401, error);
  }
};

export { createToken, authenticatToken };
