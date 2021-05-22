const catchAsync = require('./catchAsync');
const config = require('./config');
const nodemailer = require("nodemailer");

exports.sendMail_to_verify= catchAsync(async (username, email, token) => {

    let info = await config.transporter.sendMail({
        from: config.acc_user,
        to: email, 
        subject: "Account verification",
        html: `<h2>Hello ${username}</h2>
                <p>please verify your account by just clicking bwlow url</p>
                <a href="http://localhost:3000/user/verifyUser?token=${token}">Click Here</a>
                <br>
                <p>With regards</p>
                <p>Web Team</p>`,
      });

      //console.log(info);
    
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});

exports.sendMail_to_change_pass= catchAsync(async (email, token) => {

    let info = await config.transporter.sendMail({
        from: config.acc_user,
        to: email, 
        subject: "Change password",
        html: `<h2>Hello User</h2>
                <p><a href="http://localhost:3000/user/redirects?token=${token}">Click Here</a> to change your password!!!</p>
                <p>With regards</p>
                <p> Web Team</p>`,
      });
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});