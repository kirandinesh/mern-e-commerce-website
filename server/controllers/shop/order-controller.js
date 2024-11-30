const paypal = require("../../helpers/paypal");
const Order = require("../../models/Orders");
const Cart = require("../../models/Cart.model");
const Product = require("../../models/Product.model");
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.CLIENT_BASE_URL}/shop/payment-processing`,
        cancel_url: `${process.env.CLIENT_BASE_URL}/shop/checkout/details`,
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.productTitle,
              sku: item.productId,
              price: item.price.toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.error("Error while creating PayPal payment:", error);
        return res.status(500).json({
          success: false,
          message: "Error while creating PayPal payment",
          error,
        });
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderDate,
          orderUpdateDate,
          paymentId,
          payerId,
          cartId,
        });
        await newlyCreatedOrder.save();
        const approvalURL = paymentInfo.links.find(
          (link) => link.rel === "approval_url"
        ).href;
        return res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (err) {
    console.error("Error in createOrder:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: false,
        message: "order cannot be not Found",
      });
    }
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);
      if (!product) {
        res.status(404).json({
          success: false,
          message: `not enough stock for this product ${product.productTitle}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCardId = order.cartId;
    await Cart.findByIdAndDelete(getCardId);
    res.status(200).json({
      success: true,
      message: "Order Confirmed",
      data: order,
    });
    await order.save();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Some Error Occured",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });
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
const getOrderDetails = async (req, res) => {
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

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
