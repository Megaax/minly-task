import * as jwt from 'jsonwebtoken';

const generateToken = async (payload: any): Promise<string> => {
  const token: string = await jwt.sign(
    payload,
    process.env.JWT_SECRET_KEY || '',
    { expiresIn: '30m' }
  );

  return token;
}

export default generateToken;