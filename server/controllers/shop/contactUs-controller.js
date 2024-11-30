const ContactUs = require("../../models/ContactUs.model");

const addNewMessage = async (req, res) => {
  try {
    const { userId, name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    const newlyCreatedMessage = new ContactUs({
      userId,
      name,
      email,
      message,
    });

    await newlyCreatedMessage.save();

    res.status(201).json({
      success: true,
      data: newlyCreatedMessage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Unable to add contact message.",
    });
  }
};

const getAllInboxMessage = async (req, res) => {
  try {
    const inboxMessage = await ContactUs.find({});
    res.status(200).json({
      success: true,
      data: inboxMessage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addNewMessage, getAllInboxMessage };
