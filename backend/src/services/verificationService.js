//const transporter = require('./initService').transporter;
const hbs = require("nodemailer-express-handlebars");
let nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});
// const transporter = nodeMailer.createTransport({
//   host: "smtp-mail.outlook.com", // hostname
//   secureConnection: false, // TLS requires secureConnection to be false
//   port: 587, // port for secure SMTP
//   tls: {
//     ciphers: "SSLv3",
//     rejectUnauthorized: false,
//   },
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".hbs",
      partialsDir: "src/email_templates/",
      layoutsDir: "src/email_templates/",
      defaultLayout: "verification.hbs",
    },

    //viewEngine: 'express-handlebars',
    viewPath: "src/email_templates/",
    extName: ".hbs",
  })
);

function sendVerificationEmail(email, token, jwtToken) {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: process.env.GMAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Verify Your Account", // Subject line
      context: {
        verificationLink: `http://localhost:3001/verification?token=${token}&email=${email}&jwtToken=${jwtToken}`,
      },
      template: "verification",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("err1 ", error);
        reject(error);
      } else {
        resolve("Activation link has been sent!");
      }
    });
  });
}

module.exports = {
  sendVerificationEmail: sendVerificationEmail,
};
