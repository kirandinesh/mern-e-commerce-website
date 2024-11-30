import React, { useState } from "react";
import "./css/ShopProductTile.css";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../../features/shop/products-slice";
import { toast } from "react-toastify";
import { addToCart, fetchCartItems } from "../../features/shop/cart-slice";
import { toastOptions } from "../../config";
import StarRatingComponent from "../common/star-rating";
function ShopProductTile({
  product,
  handleAddToCart,
  gridSelector,
  handleGetProductDetails,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  function handleGetProductDetails(getcurrentProductId) {
    navigate(`/shop/product/${getcurrentProductId}`);
    dispatch(fetchProductDetails(getcurrentProductId));
  }

  function handleAddToCart(getcurrentProductId, getTotalStock) {
    console.log(cartItems);
    let getCartItems = cartItems.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getcurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.warn(`only ${getQuantity} quantity can be added for this item`);
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getcurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success(data?.payload?.message, toastOptions);
      }
    });
  }

  return (
    <div
      className={`card card${gridSelector} ${isHovered ? "hover" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handleGetProductDetails(product?._id)}
    >
      <div className="imagePlaceHolder">
        {product?.totalStock === 0 ? (
          <Badge className="badge">Out Of Stock</Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="badge">{`Only ${product?.totalStock} left`}</Badge>
        ) : null}

        {product?.totalStock === 0 ? (
          <button
            style={{ backgroundColor: "gray", cursor: "not-allowed" }}
            className="addCartButton"
          >
            Out Of Stock
          </button>
        ) : (
          <button
            className="addCartButton"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product?._id, product?.totalStock);
            }}
          >
            Add to Cart
          </button>
        )}

        <img
          src={product?.image[0]}
          alt={product?.productTitle}
          className="card-image"
        />
      </div>
      <div className="card-content">
        <div className="starRating">
          <StarRatingComponent rating={product?.averageReview} />
        </div>
        <h3 className="card-title">{product?.productTitle}</h3>
        <p className="card-description">${product?.price}</p>
      </div>
    </div>
  );
}

export default ShopProductTile;
