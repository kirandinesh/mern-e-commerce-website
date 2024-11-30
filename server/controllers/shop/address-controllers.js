const Address = require("../../models/Address");

const addAddress = async (req, res) => {
  try {
    const {
      userId,
      first,
      last,
      email,
      country,
      state,
      address,
      city,
      pincode,
      phone,
      notes,
    } = req.body;
    if (
      !userId ||
      !first ||
      !last ||
      !email ||
      !address ||
      !city ||
      !pincode ||
      !phone ||
      !notes ||
      !state ||
      !country
    ) {
      return res.status(400).json({
        sucess: false,
        message: "invalid data provided",
      });
    }
    const newlyCreatedAddress = new Address({
      userId,
      first,
      last,
      email,
      address,
      country,
      state,
      city,
      pincode,
      notes,
      phone,
    });

    await newlyCreatedAddress.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
      message: "Address added Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error while adding",
    });
  }
};
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(500).json({
        success: false,
        message: "userId is required",
      });
    }
    const addressList = await Address.find({ userId });
    res.status(201).json({
      success: true,
      data: addressList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error while adding",
    });
  }
};
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;
    if (!userId || !addressId) {
      return res.status(500).json({
        success: false,
        message: "userId and addressId is required",
      });
    }
    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );
    if (!address) {
      return res.status(404).json({
        sucess: false,
        message: "Address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error while adding",
    });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    if (!userId || !addressId) {
      return res.status(500).json({
        success: false,
        message: "userId and addressId is required",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    if (!address) {
      return res.status(404).json({
        sucess: false,
        message: "Address not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error while adding",
    });
  }
};

module.exports = {
  addAddress,
  fetchAllAddress,
  deleteAddress,
  editAddress,
};
