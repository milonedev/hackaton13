import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const JWT_TOKEN = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({ msg: 'Acceso denegado, token no proporcionado.' })
        }

        const decoded = jwt.verify(token, JWT_TOKEN)

        if (!decoded) {
            return res.status(401).json({ msg: 'Acceso denegado, token no valido.' })
        }

        return next();
    } catch (error) {
        return res.status(401).json('Error al validar el token')
    }

}

export const validateUser = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({ msg: 'Acceso denegado, token no proporcionado.' })
        }

        const decoded = jwt.verify(token, JWT_TOKEN)

        if (!decoded) {
            return res.status(401).json({ msg: 'Acceso denegado, token no valido.' })
        }

        if(decoded.role !== 'admin') {
            return res.status(401).json({ msg: 'Acceso denegado, end point disponle solo para usuarios adminsitradores' })
        }

        return next();
    } catch (error) {
        return res.status(401).json('Error al validar el token')
    }
}