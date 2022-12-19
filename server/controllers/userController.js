const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken")
const sgMail = require('@sendgrid/mail')
const config = process.env;
const crypto = require('crypto')

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password, pic } = req.body
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
            password: hashedPassword,
            pic,
            isVerified: false,
            token: crypto.randomBytes(64).toString('hex')
        })
        console.log(user)
        const msg = {
            from: "datnguyen9g@gmail.com",
            to: user.email,
            subject: "Yelp Camp - verify email",
            text: `Cảm ơn đã đăng ký tài khoản tại trang web Alo
                    Hãy coppy và paste đường link sau để xác thực tài khoản .
                    http://localhost:3000/verify-email/${user.token}`,
            html: `
                <h1>Hello! </h1>
                <p>Cảm ơn đã đăng ký tài khoản, hay xác thực và trải nghiệm nhé! </p>
                <p>Hãy click đường link bên dưới để xác thực tài khoản </p>
                <a href="http://localhost:3000/verify-email/${user.token}"> Verify your account </p>
            `
        }
        try {
            sgMail.setApiKey(config.SENDGRID_API_KEY)
            sgMail
                .send(msg)
            return res.json({ status: true, user })
        } catch (error) {
            console.log(error)
            res.json({ status: false })
        }
    } catch (ex) {
        next(ex)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const dt = new Date() // last date login
        const user = await User.findOne({ email })
        if (!user)
            return res.json({ msg: "Email dang nhap khong ton tai!", status: false })
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid)
            return res.json({ msg: "Mật khẩu không đúng!", status: false })

        const token = crypto.randomBytes(64).toString('hex')
        // save user token
        user.token = token;
        user.last_login = dt; // add last date login
        user.save()
        console.log(user)
        if (!user.isVerified) {
            const msg = {
                from: "datnguyen9g@gmail.com",
                to: user.email,
                subject: "Yelp Camp - verify email",
                text: `Cảm ơn đã đăng ký tài khoản tại trang web Alo
                        Hãy coppy và paste đường link sau để xác thực tài khoản .
                        http://localhost:3000/verify-email/${user.token}`,
                html: `
                    <h1>Hello! </h1>
                    <p>Cảm ơn đã đăng ký tài khoản, hay xác thực và trải nghiệm nhé! </p>
                    <p>Hãy click đường link bên dưới để xác thực tài khoản </p>
                    <a href="http://localhost:3000/verify-email/${user.token}"> Verify your account </p>
                `
            }
            try {
                sgMail.setApiKey(config.SENDGRID_API_KEY)
                sgMail
                    .send(msg)
                return res.json({ status: true, user })
            } catch (error) {
                console.log(error)
                res.json({ status: false })
            }
        }
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
}

module.exports.resendEmail = async (req, res) => {
    try {
        const { email } = req.body
        const dt = new Date() // last date login
        const user = await User.findOne({ email })
        if (!user)
            return res.json({ msg: "Email dang nhap khong ton tai!", status: false })

        const token = crypto.randomBytes(64).toString('hex')
        // save user token
        user.token = token;
        user.last_login = dt; // add last date login
        user.save()
        console.log(user)
        if (!user.isVerified) {
            const msg = {
                from: "datnguyen9g@gmail.com",
                to: user.email,
                subject: "Yelp Camp - verify email",
                text: `Cảm ơn đã đăng ký tài khoản tại trang web Alo
                        Hãy coppy và paste đường link sau để xác thực tài khoản .
                        http://localhost:3000/verify-email/${user.token}`,
                html: `
                    <h1>Hello! </h1>
                    <p>Cảm ơn đã đăng ký tài khoản, hay xác thực và trải nghiệm nhé! </p>
                    <p>Hãy click đường link bên dưới để xác thực tài khoản </p>
                    <a href="http://localhost:3000/verify-email/${user.token}"> Verify your account </p>
                `
            }
            try {
                sgMail.setApiKey(config.SENDGRID_API_KEY)
                sgMail
                    .send(msg)
                return res.json({ status: true, user })
            } catch (error) {
                console.log(error)
                res.json({ status: false })
            }
        }
        return res.json({ status: true, user })
    } catch (ex) {
        next(ex)
    }
}
// Get All
module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Get One
module.exports.getOneUserByEmail = async (req, res, next) => {
    let user
    try {
        user = await User.findOne({ email: req.body.email })
        if (user == null) {
            return res.status(404).json({ message: "can't find user!" })
        }
        return res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
        next(err)
    }
}
module.exports.verify = async (req, res, next) => {
    const { token } = req.body
    console.log(token)
    try {
        const user = await User.findOne({ token })
        if (!user) {
            return res.json({ status: false, msg: "Token is valid. Please contact us for assistence" })
        }
        user.isVerified = true
        delete user.token
        user.save()
        return res.json({ status: true, user: user })
    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: "Don't verify" })
    }
}
//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
module.exports.allUsers = async (req, res) => {
    const keyword = req.body.search
      ? {
          $or: [
            { username: { $regex: req.body.search, $options: "i" } },
            { email: { $regex: req.body.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.body._id } });
    res.send(users);
  };
module.exports.getUser = async (req, res, next) => {
    let user
    try {
        user = await User.findById(req.params.userId)
        if (user == null) {
            return res.status(404).json({ message: "can't find user!" })
        }
        return res.json({user})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}