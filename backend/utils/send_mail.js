const config = require('./config');
const nodemailer = require("nodemailer");

exports.setup=async () => {
    let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  config.transporter= nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false}
  });

  return{testAccount,transporter};
};


//verification mail

exports.sendMail_to_verify= async (username, email, token) => {
    let props=await setup();
    let info = await props.transporter.sendMail({
        from: props.acc_user,
        to: email, 
        subject: "Account verification",
        html: `<h2>Hello ${username}</h2>
                <p>please verify your account by just clicking bwlow url</p>
                <a href="${config.baseUrl}/user/verifyUser?token=${token}">Click Here</a>
                <br>
                <p>With regards</p>
                <p>Web Team</p>`,
      });
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

exports.sendMail_to_change_pass=async (email, token) => {
    let props=await setup();
    let info = await props.transporter.sendMail({
        from: props.acc_user,
        to: email, 
        subject: "Change password",
        html: `<h2>Hello User</h2>
                <p><a href="${config.clientUrl}/forgotPswd?token=${token}">Click Here</a> to change your password!!!</p>
                <br/>
                <p>With regards</p>
                <p> Web Team</p>`,
      });
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

exports.sendMail_to_users=async (email,test) => {
    let props=await setup();
    let info = await props.transporter.sendMail({
        from: props.acc_user,
        to: email, 
        subject: "Change password",
        html: `<h2>Hello User</h2>
                <p>You are invited to new test ${test.name}. created by ${test.author}</p>
                <p>Test is of  ${test.duration} hours with deadline to ${test.deadline}</p>
                <P>You can attempt the test by visiting your profile in website</p>
                <br/>
                <p>With regards</p>
                <p> Web Team</p>`,
      });
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}