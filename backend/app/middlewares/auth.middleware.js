import { verifyAccessToken } from '../utils/token.js';

export function authMiddleware(req, res, next){
    const authHeader = req.header('Authorization')
    const accessToken = authHeader.split(" ")?.[1]

    if(!accessToken) {
        return res.status(401).json({
            message: "User not authorized"
        })
    }

    try {
        const verifiedToken = verifyAccessToken(accessToken)
        // console.log("verifiedToken", verifiedToken)
        req.userId = verifiedToken.id
        // console.log("req.userId", req.userId)
        return next()
    } catch (error) {
        res.status(401).json({
            message: "User not authorized"
        })
    }

}

