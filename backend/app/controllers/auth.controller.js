import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import { generateTokens, verifyRefreshToken } from '../utils/token.js';
import { MongooseError } from "mongoose";


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
        const checkEmail = await User.findOne({ email })
        if (!!checkEmail) return res.status(400).json({ message: "This email is already in use" })

        const checkUsername = await User.findOne({ username })
        if (!!checkUsername) return res.status(400).json({ message: "this username is taken" })

        const user = await User.create(req.body)
        const tokens = generateTokens(user)

        const safeUser = {
            _id: user._id,
            email: user.email,
            username: user.username
        }

        res.cookie('accessToken', tokens.accessToken, accessTokenProperties)
        res.cookie('refreshToken', tokens.refreshToken, refreshTokenProperties)
        return res.status(201).json(safeUser)

    } catch (error) {
        if (error instanceof MongooseError) {
            //TODO: kolla in hur man hanterar errors bättre generellt och i mongoose
            console.log("Mongoose error in registerUser: ", error)
            return res.status(500).json({ message: error.message })
        }
        console.log("Error creating user: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email }).select("+password")
        if (!user) return res.status(400).json({ message: "Invalid credentials" })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" })

        const tokens = generateTokens(user)

        const safeUser = {
            _id: user._id,
            email: user.email,
            username: user.username
        }

        res.cookie('accessToken', tokens.accessToken, accessTokenProperties)
        res.cookie('refreshToken', tokens.refreshToken, refreshTokenProperties)
        return res.status(200).json(safeUser)

    } catch (error) {
        console.log("Error logging in user: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function getUser(req, res) {
    const userId = req.userId
    try {
        const user = await User.findById(userId).select("-password -createdAt -updatedAt -__v")
        if (!user) return res.status(404).json({ message: "User not found" })

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export async function refreshToken(req, res) {
    const { refreshToken } = req.cookies
    if (!refreshToken) return res.status(403).json({ message: "No refresh token provided" })

    try {
        const verifiedToken = verifyRefreshToken(refreshToken)
        if (!verifiedToken) return res.status(403).json({ message: "Invalid refresh token" })

        const userId = verifiedToken.id
        const user = await User.findById(userId).select("-password -createdAt -updatedAt -__v")
        if (!user) return res.status(404).json({ message: "User not found" })

        const tokens = generateTokens(user)

        res.cookie('accessToken', tokens.accessToken, accessTokenProperties)
        res.cookie('refreshToken', tokens.refreshToken, refreshTokenProperties)
        res.status(200).json(user)

    } catch (error) {
        console.log("Error refreshing token: ", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export async function logoutUser(req, res) {
    try {
        res.clearCookie('accessToken', accessTokenProperties)
        res.clearCookie('refreshToken', refreshTokenProperties)
        return res.sendStatus(204)
        
    } catch (error) {
        console.log("Error logging out user: ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}