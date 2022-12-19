const sgMail = require('@sendgrid/mail')
const config = process.env;

module.exports.senEmailVerify = async(req, res, next)=>{
    const {email, text,host_link } = req.body
    sgMail.setApiKey( config.SENDGRID_API_KEY)
    const msg = {
      to: 'dat08082001@gmail.com', // Change to your recipient
      from: 'datnguyen9g@gmail.com', // Change to your verified sender
      subject: 'Alo sending for Verify Account',
      text:  "Alo",
      html: `<strong> Please click link address to verifed account :</strong> 
        <a href="http://${host_link}">Verify Account</a>`,
    }
    sgMail
      .send(msg)
      .then(() => {
        res.json("Sent email")
      })
      .catch((error) => {
        res.json(error)
      })
}
