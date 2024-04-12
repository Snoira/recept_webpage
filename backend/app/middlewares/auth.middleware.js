const { verifyAccessToken } = require('../utils/token.js');

// function authMiddleware(req, res, next){
//     const accessToken = req.headers['authorization']
//     if(!accessToken){
//         return res.status(401).json({error: "User not authenticated"})
//     }
//     const verifiedToken = verifyAccessToken(accessToken)
//     if(!verifiedToken){
//         return res.status(401).json({error: "User not authenticated"})
//     }
//     req.user = verifiedToken
//     next() //förslag från git, jämför sen
// }

function authMiddleware(req, res, next) {
    const token = req.header('Authorization') || ""
    const accessToken = token.split(" ")?.[1] || ""
    console.log("Access: ", accessToken)

    if (!accessToken) {
        return res.status(401).json({ error: "User not authenticated" })
    }

    try {
        const verifiedToken = verifyAccessToken(accessToken)
        req.user = verifiedToken //req.userId = verifiedToken.userId i jonathans kod
        return next()
    } catch (error) {
        console.log("Error verifying user: ", error.message)
        res.status(401).json({ message: "User not authorized" })
    }
}

module.exports = authMiddleware