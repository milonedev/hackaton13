import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const JWT_TOKEN = process.env.JWT_SECRET;

export const generateToken = (user) => {

    const token = jwt.sign(
        user,
        JWT_TOKEN
    )
    return token;
}
