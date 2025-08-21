import { verifyAccessToken } from '../utils/token.js';

export function authMiddleware(req, res, next) {

    try {
        const cookie = req.cookies.accessToken
        const verifiedToken = verifyAccessToken(cookie)
        req.userId = verifiedToken.id
    
        return next()
    } catch (error) {
        res.status(401).json({
            message: "User not authorized"
        })
    }

}

