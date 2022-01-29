const config = require('./config');
const nodemailer = require("nodemailer");
const AppError= require('./appError');

const setup=async () => {
  //   let testAccount = await nodemailer.createTestAccount();

  // // create reusable transporter object using the default SMTP transport
  //  let transporter= nodemailer.createTransport({
  //   host: testAccount.smtp.host,
  //   port: testAccount.smtp.port,
  //   secure: testAccount.smtp.secure,
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass // generated ethereal password
  //   },
  //   tls: {
  //       rejectUnauthorized: false}
  // });

  // return{testAccount,transporter};

  
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL,
      pass: config.PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  return {transporter};
};


//verification mail

exports.sendMail_to_verify= async (username, email, token, next) => {
    let props=await setup();
    let info = await props.transporter.sendMail({
        from: process.env.EMAIL,
        to: email, 
        subject: "Account verification",
        html: `<h2>Hello ${username}</h2>
                <p>please verify your account by just clicking below url</p>
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
        from: process.env.EMAIL,
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

exports.sendMail_to_users=async (emailList,test) => {
    let props=await setup();
    let {hours,minutes,seconds}=test.duration;
    let info = await props.transporter.sendMail({
        from: process.env.EMAIL,
        to: emailList, 
        subject: "New Test Invitation",
        html: `<h2>Hello User</h2>
                <p>You are invited to new test ${test.name}. created by ${test.author}</p>
                <p>Test is of  ${hours}hrs, ${minutes}mins, ${seconds}secs with deadline to ${test.deadline}</p>
                <P>You can attempt the test by visiting your profile in website</p>
                <br/>
                <p>With regards</p>
                <p> Web Team</p>`,
      });
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}