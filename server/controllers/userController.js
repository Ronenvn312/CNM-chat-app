const User = require('../model/userModel')
const bcrypt = require('bcrypt')

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
        delete user.password
        return res.json({ status: true, user })
    } catch(ex) {
        next(ex)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        const user = await User.findOne({ username })
        if (!user)
            return res.json({ msg: "Tên đăng nhập hoặc mật khẩu không đúng!", status: false })
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid)
            return res.json({ msg: "Tên đăng nhập hoặc mật khẩu không đúng!", status: false })
        delete user.password
        
        return res.json({ status: true, user })
    } catch(ex) {
        next(ex)
    }
}