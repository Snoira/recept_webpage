const bcrypt = require('bcrypt');
const User = require('../models/user.model.js');
const { generateToken } = require('../utils/token.js');

async function registerUser(req, res){
    try {
        const { email, password, firstname, lastname } = req.body
        const user = new User({
            email,
            password,
            firstname,
            lastname
        })
        const newUser = await user.save()
        const tokens = generateToken(newUser)
        console.log("User created: ", newUser)
        console.log("Tokens: ", tokens)
        res.status(201).json(tokens)
    } catch(error){
        res.status(400).json({error: error.message})
        console.log("Error creating user: ", error.message)
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

async function loginUser(req, res){
    try {
        const { email, password } = req.body
        const user = await User.findOne({email}).select("+password") //.select(["+password"]) i jonathans kod
        if(!user){
            return res.status(404).json({error: "User not found"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({error: "Invalid credentials"})
        }
        const tokens = generateToken(user)
        console.log("User logged in: ", user)
        console.log("Tokens: ", tokens)
        res.status(200).json(tokens)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

async function getUsers(req, res){
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(error){
        res.status(500).json({error: error.message})
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
    getUsers
}