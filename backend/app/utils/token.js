const jwt = require('jsonwebtoken');

function generateTokens(user){
    const accessToken = jwt.sign(
        {id: user.id},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1h'} //12h i jonathans kod
    )
    const refreshToken =  jwt.sign(
        {id: user.id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'} //28d i jonathans kod
    )
    return{
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

function verifyAccessToken(token){
    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) //const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { if(err) return res.sendStatus(403) req.user = user next() }
    console.log("verify token", verifiedToken)
    return verifiedToken
}

function verifyRefreshToken(token){
    const verifiedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    console.log("verify token", verifiedToken)
    return verifiedToken
}

module.exports = {
    generateTokens,
    verifyAccessToken,
    verifyRefreshToken
}