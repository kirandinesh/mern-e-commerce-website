import React, { useEffect, useState } from "react";
import "../CSS/shopping-view/ProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, ArrowRight, ChevronRight, StarIcon } from "lucide-react";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../features/shop/products-slice";
import { useNavigate, useParams } from "react-router-dom";
import {
  addToCart,
  fetchCartItems,
  updateCartQuantity,
} from "../../features/shop/cart-slice";
import { toastOptions } from "../../config";
import { toast } from "react-toastify";
import Footer from "../../components/shopping-view/Footer";
import { Badge, Card, CardContent } from "@mui/material";
import StarRatingComponent from "../../components/common/star-rating";
import {
  addProductReview,
  getProductReviews,
} from "../../features/shop/review-slice";
import ShopProductTile from "../../components/shopping-view/ShopProductTile";

function ShoppingProducts() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { productList } = useSelector((state) => state.shoppingProducts);

  const navigate = useNavigate();
  function handleAddReview() {
    dispatch(
      addProductReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload?.success) {
        dispatch(getProductReviews(productDetails?._id));
        toast.success("Review added successfully!", toastOptions);
        setReviewMsg("");
        setRating(0);
      } else {
        toast.error(data.payload?.message, toastOptions);
        setReviewMsg("");
        setRating(0);
      }
    });
  }

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleColorSelected(color) {
    setSelectedColor(color);
    console.log(color);
  }
  function handleAddToCart(getcurrentProductId, quantity, getTotalStock) {
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
    console.log(getcurrentProductId);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getcurrentProductId,
        quantity: quantity,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success(data?.payload?.message, toastOptions);
        setQuantity(1);
      }
    });
  }
  function handleGetProductDetails(getcurrentProductId) {
    navigate(`/shop/product/${getcurrentProductId}`);
    dispatch(fetchProductDetails(getcurrentProductId));
  }
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { productDetails, isLoading } = useSelector(
    (state) => state.shoppingProducts
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [dispatch, productId]);

  const handleQuantityChange = (amount) => {
    if (quantity + amount > 0) {
      setQuantity(quantity + amount);
    }
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getProductReviews(productDetails?._id));
    }
  }, [productDetails]);
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;
  console.log(reviews, "reviews");
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price_lowtohigh",
      })
    );
  }, []);
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div class="loader-square">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return <div>Product not found</div>;
  }
  return (
    <div className="product-page">
      <div className="product-container">
        <div className="image-gallery">
          {productDetails?.image.map((file, index) => (
            <div className="thumbnail-gallery" key={index}>
              <img src={file} alt="Detail 1" />
            </div>
          ))}
        </div>

        <div className="product-details">
          {productDetails?.totalStock === 0 ? (
            <Badge className="badge">Out Of Stock</Badge>
          ) : productDetails?.totalStock < 10 ? (
            <Badge className="badge">{`Only ${productDetails?.totalStock} left`}</Badge>
          ) : null}
          <div className="rating">
            <div className="starRating">
              <StarRatingComponent rating={averageReview} />
            </div>
            <p>{reviews.length} reviews</p>
          </div>
          <h1>{productDetails?.productTitle}</h1>

          <p className="description">{productDetails?.description}</p>
          <div className="price-section">
            <span className="discounted-price">${productDetails.price}</span>
            <span className="original-price">${productDetails.mrp}</span>
          </div>

          <div className="measurements">
            <strong>Measurements: </strong>
            {productDetails?.measurement}
          </div>

          <div className="color-options">
            <strong>Choose Color:</strong>
            <div className="color-choices">
              {productDetails.colors.map((color, index) => (
                <button
                  key={index}
                  className={`color-option ${
                    color === selectedColor ? "selected" : ""
                  }`}
                  onClick={() => handleColorSelected(color)}
                  style={{ backgroundColor: color }}
                ></button>
              ))}
            </div>
          </div>

          <div className="buttonContainer">
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <button className="wishlist">♡ Wishlist</button>
          </div>
          {productDetails?.totalStock === 0 ? (
            <button
              style={{ backgroundColor: "gray", cursor: "not-allowed" }}
              className="add-to-cart"
            >
              Out Of Stock
            </button>
          ) : (
            <button
              className="add-to-cart"
              onClick={() =>
                handleAddToCart(
                  productDetails?._id,
                  quantity,
                  productDetails?.totalStock
                )
              }
            >
              Add to Cart
            </button>
          )}

          <div className={`additional-info ${isExpanded ? "expanded" : ""}`}>
            <ChevronRight
              className={`right-arrow ${isExpanded ? "rotated" : ""}`}
              size={20}
              strokeWidth={1}
            />
            <h2 onClick={() => setIsExpanded(!isExpanded)}>Additional Info</h2>
            <div className="info-content">
              <p>
                <strong>Details:</strong>{" "}
                {productDetails?.details || "No details available."}
              </p>
              <p>
                <strong>Packaging:</strong>{" "}
                {productDetails?.packaging || "No packaging information."}
              </p>
            </div>
          </div>
          {/* review */}
          <div className={`review-info ${isReviewExpanded ? "expanded" : ""}`}>
            <ChevronRight
              className={`right-arrow ${isReviewExpanded ? "rotated" : ""}`}
              size={20}
              strokeWidth={1}
            />
            <h2 onClick={() => setIsReviewExpanded(!isReviewExpanded)}>
              Review ({reviews.length})
            </h2>
            <div className="review-content">
              <div className="main-container">
                <Card className="review-card">
                  {reviews && reviews.length > 0 ? (
                    reviews.map((reviewItem) => (
                      <CardContent className="review-card-content">
                        <div className="review-avatar">
                          <div className="user-circle">
                            {reviewItem?.userName[0].toUpperCase()}
                          </div>
                        </div>
                        <div className="review-details">
                          <div className="review-userName">
                            <h3>{reviewItem?.userName}</h3>
                          </div>
                          <div className="review-starRating">
                            <StarRatingComponent
                              className="rating"
                              rating={reviewItem?.reviewValue}
                            />
                          </div>
                          <div className="review-message">
                            <span>{reviewItem?.reviewMessage}</span>
                          </div>
                        </div>
                      </CardContent>
                    ))
                  ) : (
                    <h3>No Reviews Available</h3>
                  )}
                </Card>
              </div>

              <div className="review-button-container">
                <h3>write a review</h3>
                <div>
                  <StarRatingComponent
                    rating={rating}
                    handleRatingChange={handleRatingChange}
                  />
                </div>
                <div className="review-input-container">
                  <input
                    name="reviewMsg"
                    value={reviewMsg}
                    onChange={(e) => setReviewMsg(e.target.value)}
                    type="text"
                    placeholder="Write a review..."
                  />
                  <button
                    className="review-submit"
                    disabled={reviewMsg.trim() === ""}
                    onClick={handleAddReview}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pageBottom">
        <section className="productLike-section">
          <div className="new-arrival-header">
            <h1>You might also like</h1>
            <span onClick={() => navigate("/shop/shoplist")}>
              More Products
              <ArrowRight size={15} />{" "}
            </span>
          </div>
          <div className="arrival-product-cards">
            {productList && productList.length > 0
              ? productList.map((productItems) => (
                  <ShopProductTile
                    product={productItems}
                    key={productItems.id}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default ShoppingProducts;
