const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const { generateTokens } = require('../utils/token.js');

async function registerUser(req, res) {
    const {email, username} = req.body
    try {
        const checkEmail =  await User.find({email})
        if(!checkEmail) return res.status(400).json({ error: "Account already registered with email" })
        
        const checkUsername = await User.find({username}) 
        if(!checkUsername) return res.status(400).json({error: "Username taken"})

        const newUser = await User.create(req.body)
        if (!newUser) return res.status(400).json({ error: "User not created" })

        const tokens = generateTokens(newUser)
        if(!tokens) return res.status(400).json({ error: "Tokens not generated" })

        const account = {
            newUser,
            tokens
        }

        res.status(201).json(account)

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

async function loginUser(req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email }).select("+password") //.select(["+password"]) i jonathans kod
        if (!user) return res.status(404).json({ error: "User not found" })//404 eller 400? "Invalid credentials" för att göra en säkrare errorhantering
    
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" })
        
        const tokens = generateTokens(user)
        if(!tokens) return res.status(400).json({ error: "Tokens not generated" })

        const account = {
            user,
            tokens
        }

        res.status(200).json(account)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

async function getUser(req, res) {
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

module.exports = {
    registerUser,
    loginUser,
    getUser
}