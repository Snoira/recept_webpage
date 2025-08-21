import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateTokens, verifyRefreshToken } from '../utils/token.js';


const accessTokenProperties = {
    httpOnly: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
};
const refreshTokenProperties = {
    httpOnly: true,
    maxAge: 24 * 3600 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
};

export async function registerUser(req, res) {
    const { email, username } = req.body
    try {
        const checkEmail = await User.find({ email })
        if (!checkEmail) return res.status(400).json({ error: "Account already registered with email" })

        const checkUsername = await User.find({ username })
        if (!checkUsername) return res.status(400).json({ error: "Username taken" })

        const user = await User.create(req.body)
        if (!user) return res.status(400).json({ error: "User not created" })

        const tokens = generateTokens(user)
        if (!tokens) return res.status(400).json({ error: "Tokens not generated" })

        const safeUser = {
            _id: user._id,
            email: user.email,
            username: user.username
        }

        res.cookie('accessToken', tokens.accessToken, accessTokenProperties)
        res.cookie('refreshToken', tokens.refreshToken, refreshTokenProperties)
        res.status(201).json(safeUser)

    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log("Error creating user: ", error.message)
        // registerErrorHandler(error, res, _user?.email) i jonathans kod, kolla utils etc.
    }
}

// async function registerUser(req, res){ //jonathans kod
//     const _user = req.body
//     try {
//         const user = await User.create(_user)
//         const token = generateAccessAndRefreshToken(user)
//         res.json(token)
//     } catch (error) {
//         registerErrorHandler(error, res, _user?.email)
//     }
// }

export async function loginUser(req, res) {
    const { email, password } = req.body
    try {
        console.log("LOGGING IN")
        const user = await User.findOne({ email }).select("+password") //.select(["+password"]) i jonathans kod
        if (!user) return res.status(404).json({ error: "User not found" })//404 eller 400? "Invalid credentials" för att göra en säkrare errorhantering

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" })

        const tokens = generateTokens(user)
        if (!tokens) return res.status(400).json({ error: "Tokens not generated" })

        const safeUser = {
            _id: user._id,
            email: user.email,
            username: user.username
        }

        res.cookie('accessToken', tokens.accessToken, accessTokenProperties)
        res.cookie('refreshToken', tokens.refreshToken, refreshTokenProperties)
        res.status(200).json(safeUser)

    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export async function getUser(req, res) {
    const userId = req.userId
    try {
        const users = await User.findById(userId)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// jonathans kod
// async function loginUser(req, res) {
//     const {
//         email,
//         password
//     } = req.body
//     try {
//         const user = await User.findOne({
//             email
//         }).select(["+password"])

//         if(!user) {
//             throw new Error("Credentials missing")
//         }
//         const isPasswordTheSame = await bcrypt.compare(password, user.password)
//         if(!isPasswordTheSame) {
//             throw new Error("Credentials missing")
//         }
//         const token = generateAccessAndRefreshToken(user)
//         res.json(token)

//     } catch (error) {
//         res.status(404).json({
//             message: error.message
//         })
//     }
// }

export async function refreshToken(req, res) {
    const { refreshToken } = req.cookies
    if (!refreshToken) return res.status(403).json({ error: "No refresh token provided" })

    try {
        const verifiedToken = verifyRefreshToken(refreshToken)
        if (!verifiedToken) return res.status(403).json({ error: "Invalid refresh token" })
        console.log("verify token", verifiedToken.id)

        const userId = verifiedToken.id
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ error: "User not found" })

        const tokens = generateTokens(user)
        if (!tokens) return res.status(400).json({ error: "Tokens not generated" })

        const safeUser = {
            _id: user._id,
            email: user.email,
            username: user.username
        }

        res.cookie('accessToken', tokens.accessToken, accessTokenProperties)
        res.cookie('refreshToken', tokens.refreshToken, refreshTokenProperties)
        res.status(200).json(safeUser)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function logoutUser(req, res) {
    res.clearCookie('accessToken', accessTokenProperties)
    res.clearCookie('refreshToken', refreshTokenProperties)
    res.status(200).json({ message: "Logged out successfully" })
}