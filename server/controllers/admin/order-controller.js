const Order = require("../../models/Orders");

const getAllOrdersOfAllUser = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders Found",
      });
    }
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "unable to get all orders",
    });
  }
};
const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not Found",
      });
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "unable to get all orders",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "order not Found",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "orderStatus is updated successfully ",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "unable to get all orders",
    });
  }
};

module.exports = {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
