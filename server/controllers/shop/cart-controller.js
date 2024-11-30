const Cart = require("../../models/Cart.model");
const Product = require("../../models/Product.model");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided. Please ensure all fields are correct.",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[findCurrentProductIndex].quantity += quantity;
    }

    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
      message: "Product successfully added to the cart.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while adding the product to the cart. Please try again later.",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image productTitle price",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "No cart found for the specified user.",
      });
    }

    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );
    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      productId: item.productId._id,
      image: item.productId.image,
      productTitle: item.productId.productTitle,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
      message: "Cart items fetched successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while fetching the cart items. Please try again later.",
    });
  }
};

const updateCartItemsQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid data provided. Please ensure quantity is greater than 0.",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the specified user.",
      });
    }

    const findCurrentProductIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart.",
      });
    }

    cart.items[findCurrentProductIndex].quantity = quantity;
    await cart.save();

    await cart.populate({
      path: "items.productId",
      select: "image productTitle price",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      productTitle: item.productId ? item.productId.productTitle : null,
      price: item.productId ? item.productId.price : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
      message: "Cart updated successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while updating the cart. Please try again later.",
    });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid data provided. Please provide both userId and productId.",
      });
    }

    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "image productTitle price",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for the specified user.",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId._id.toString() !== productId
    );

    await cart.save();
    await cart.populate({
      path: "items.productId",
      select: "image productTitle price",
    });

    const populateCartItems = cart.items.map((item) => ({
      productId: item.productId ? item.productId._id : null,
      image: item.productId ? item.productId.image : null,
      productTitle: item.productId ? item.productId.productTitle : null,
      price: item.productId ? item.productId.price : null,
      quantity: item.quantity,
    }));

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
      message: "Product successfully removed from the cart.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while removing the product from the cart. Please try again later.",
    });
  }
};

module.exports = {
  addToCart,
  fetchCartItems,
  updateCartItemsQuantity,
  deleteCartItems,
};
