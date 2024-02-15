const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "yashdaswani2504@gmail.com",
    pass: "qokt grpg ibod ppzu",
  },
});

exports.sendConfirmationEmail = (name, email, dob, phoneNumber) => {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: "yashdaswani2504@gmail.com",
      to: email,
      subject: "Form Submission Confirmation",
      text: `Dear ${name}, Thank you for submitting the form. Your details: Name: ${name}, DOB: ${dob}, Email: ${email}, Phone Number: ${phoneNumber}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve();
      }
    });
  });
};
