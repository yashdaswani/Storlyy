const User = require("../models/User");
const emailService = require("../services/emailService");

exports.submitForm = async (req, res) => {
  const { name, dob, email, phoneNumber } = req.body;

  if (!name || !dob || !email || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(409).json({ message: "Phone number already exists." });
    }

    const dobDate = new Date(dob);
    const day = dobDate.getDate();
    const month = dobDate.getMonth() + 1;
    const year = dobDate.getFullYear();

    const newUser = await User.create({
      name,
      email,
      phoneNumber,
      dob: `${day}/${month}/${year}`,
    });
    console.log(`New user created ${newUser}`);
    emailService.sendConfirmationEmail(name, email, dob, phoneNumber);
    return res.status(200).json({
      message: `A confirmation mail has been sent to your email address`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

exports.getAllUserforms = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
