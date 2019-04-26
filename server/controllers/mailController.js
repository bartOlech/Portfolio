const nodemailer = require('nodemailer')
const conf = require('../config/config')

exports.mail = (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.msg}</p>
  `;

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: conf.login, // generated ethereal user
            pass: conf.pass  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Contact from the portfolio" olech.bartlomiej@gmail.com', // sender address
        to: conf.login, // list of receivers
        subject: 'Portfolio Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
    res.status(200).json({status: 'sended'})
}