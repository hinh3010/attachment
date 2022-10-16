import createError from 'http-errors';
import jwt from 'jsonwebtoken';
import env from '../../env';
const {
    access_token_serret,
} = env.jwt


const verifyAccessToken = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createError.Unauthorized())
    }
    const authorization = req.headers['authorization']
    const token = authorization.split(' ')[1]
    if (!token) {
        return next(createError.Unauthorized())
    }
    jwt.verify(token, access_token_serret, (err, payload) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return next(createError.Unauthorized())
            }
            return next(createError.Unauthorized(err.message))
        }
        req.payload = payload
        next()
    })
}

const jwtMdw = { verifyAccessToken }

export default jwtMdw
