const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken")

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const usernnameCheck = await User.findOne({ username })
        if (usernnameCheck)
            return res.json({ msg: "Username already used", status: false })
        const emailCheck = await User.findOne({ email })
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            email,
            username,
            password: hashedPassword
        })
        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;
        delete user.password
        console.log(user)
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const dt = new Date() // last date login
        const user = await User.findOne({ username })
        if (!user)
            return res.json({ msg: "Tên đăng nhập hoặc mật khẩu không đúng!", status: false })
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid)
            return res.json({ msg: "Tên đăng nhập hoặc mật khẩu không đúng!", status: false })

        const token = jwt.sign(
            { user_id: user._id, email: user.email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;
        user.last_login = dt; // add last date login
        delete user.password
        
        return res.json({ status: true, user })
    } catch (ex) {
        console.log(ex)
        next(ex)
    }
}
module.exports.getAllUsers = async (req, res,next ) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}