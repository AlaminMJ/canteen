import nodemailer from "nodemailer";

const mail = {
  async sandMail({ from, to, subject, html }) {
    try {
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        html: "<b>test otp</b>", // html body
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default mail;
