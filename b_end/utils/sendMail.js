import nodeMailer from "nodemailer";
const email = "ankodiaalex@gmail.com";
const pass = "gzpe lcbi xedw rywl";

const sendEmail = async (mess) => {
  console.log(`File=>  sendMail.js => Line number: 6     `);
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: pass,
    },
  });

  const mailOptions = {
    from: '"My Company" <my@company.com>',
    template: "email",
    to: email,
    subject: mess.subject,
    text: mess.message, // plain text body

    // html: "<b>Hello world?</b>", // html body
    context: {
      name: "Naveem",
      company: "my company",
    },
  };
  console.log(
    "file: sendMail.js:28 ~ sendEmail ~ mailOptions.mess.message:",
    mailOptions.text,
    mess.message
  );

  await transporter.sendMail(mailOptions);
};

// Example usage
// const userEmail = "example@gmail.com";
// const userPassword = "yourPassword";
// const currentUser = { name: "John Doe" };

export default sendEmail;
