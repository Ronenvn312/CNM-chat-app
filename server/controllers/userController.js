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
                    http://localhost:5000/verify-email?token=${user.token}`,
            html: `
                <h1>Hello! </h1>
                <p>Cảm ơn đã đăng ký tài khoản, hay xác thực và trải nghiệm nhé! </p>
                <p>Hãy click đường link bên dưới để xác thực tài khoản </p>
                <a href="http://localhost:5000/api/auth/verify-email?token=${user.token}"> Verify your account </p>
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

module.exports.verify = async (req, res, next) => {
    try {
        const user = await User.findOne({ token: req.query.token })
        if (!user) {
            return res.json({ status: false, msg: "Token is valid. Please contact us for assistence" })
        }
        user.isVerified= true
        delete user.token
        user.save()
        return res.json({ status: true, msg: `Welcome to Alo web ${user.username}`, user })
    } catch (error) {
        console.log(error)
        return res.json({ status: false, msg: "Don't verify" })
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
        if(!user.isVerified) {
            const msg = {
                from: "datnguyen9g@gmail.com",
                to: user.email,
                subject: "Yelp Camp - verify email",
                text: `Cảm ơn đã đăng ký tài khoản tại trang web Alo
                        Hãy coppy và paste đường link sau để xác thực tài khoản .
                        http://localhost:3000/verify-email?token=${user.token}`,
                html: `
                    <h1>Hello! </h1>
                    <p>Cảm ơn đã đăng ký tài khoản, hay xác thực và trải nghiệm nhé! </p>
                    <p>Hãy click đường link bên dưới để xác thực tài khoản </p>
                    <a href="http://localhost:3000/api/auth/verify-email?token=${user.token}"> Verify your account </p>
                `
            }
            try {
                sgMail.setApiKey(config.SENDGRID_API_KEY)
                sgMail
                    .send(msg)
                return res.json({ status: true, user, isVerified: user.isVerified })
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
// module.exports.senEmailVerify = async(req, res, next)=>{
//     const {email, text,host_link } = req.body
//     sgMail.setApiKey( config.SENDGRID_API_KEY)
//     const msg = {
//       to: 'dat08082001@gmail.com', // Change to your recipient
//       from: 'datnguyen9g@gmail.com', // Change to your verified sender
//       subject: 'Alo sending for Verify Account',
//       text:  "Alo",
//       html: `<strong> Please click link address to verifed account :</strong> 
//         <a href="http://${host_link}">Verify Account</a>`,
//     }
//     sgMail
//       .send(msg)
//       .then(() => {
//         res.json("Sent email")
//       })
//       .catch((error) => {
//         res.json(error)
//       })
// }


module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports.getUserByID = async (req, res, next) => {
    const { email } = req.body

    try {
        const query = { 'email': email };
        const user = await User.findOne(query)
        if (user) {
            res.json(user)
        } else {
            res.json({})
        }

    } catch (ex) {
        next(ex)
    }

}