import React, { useEffect, useState } from "react";
import "../CSS/shopping-view/ShoppingHome.css";
import bannerOne from "../../assets/home-page/image1.jpg";
import bannerTwo from "../../assets/home-page/image2.jpg";
import bannerThree from "../../assets/home-page/image3.jpg";
import categoryImg1 from "../../assets/home-page/categoryIMG1.png";
import categoryImg2 from "../../assets/home-page/categoryIMG2.png";
import categoryImg3 from "../../assets/home-page/categoryIMG3.png";
import bottonImageBanner from "../../assets/home-page/bottomImageBanner.png";
import {
  ArrowRight,
  ArrowLeft,
  Truck,
  Banknote,
  LockKeyhole,
  Phone,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "../../features/shop/products-slice";
import ShopProductTile from "../../components/shopping-view/ShopProductTile";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/shopping-view/Footer";
import { addToCart, fetchCartItems } from "../../features/shop/cart-slice";
import { toastOptions } from "../../config";
import { toast } from "react-toastify";

function ShoppingHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shoppingProducts);
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0);
  const categoriesSection = [
    { id: 1, label: "Living Room", categoryImg: categoryImg1 },
    { id: 2, label: "Bedroom", categoryImg: categoryImg2 },
    { id: 3, label: "Kitchen", categoryImg: categoryImg3 },
  ];

  const serviceProvided = [
    {
      serviceName: "Free Shipping",
      icon: <Truck size={48} />,
      serviceText: "Order above $200",
    },
    {
      serviceName: "Money-back",
      icon: <Banknote className="service-icon" size={48} />,
      serviceText: "30 days guarantee",
    },
    {
      serviceName: "Secure Payments",
      icon: <LockKeyhole className="service-icon" size={48} />,
      serviceText: "Secured by Stripe",
    },
    {
      serviceName: "24/7 Support",
      icon: <Phone className="service-icon" size={48} />,
      serviceText: "Phone and Email support",
    },
  ];

  function handleNavigateToListPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.label],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/shoplist`);
  }
  function handleGetProductDetails(getcurrentProductId) {
    navigate(`/shop/product/${getcurrentProductId}`);
    dispatch(fetchProductDetails(getcurrentProductId));
  }
  function handleAddToCart(getcurrentProductId, getTotalStock) {
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
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success(data?.payload?.message, toastOptions);
      }
    });
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price_lowtohigh",
      })
    );
  }, []);

  console.log(productList, "homePage");

  return (
    <div>
      {/* Image Slider Section */}
      <div className="image-slider">
        <div className="image-carousel">
          {slides.map((slide, index) => (
            <img
              className={`sliderImages ${
                index === currentSlide ? "active" : ""
              }`}
              src={slide}
              key={index}
              alt={`Slide ${index + 1}`}
            />
          ))}
          <button
            className="arrowRight"
            onClick={() =>
              setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
            }
          >
            <ArrowRight />
          </button>
          <button
            className="arrowLeft"
            onClick={() =>
              setCurrentSlide(
                (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
              )
            }
          >
            <ArrowLeft />
          </button>
        </div>
      </div>
      {/* Home Header Section */}
      <section className="homeHeader-section">
        <h1>
          Simply Unique/ <br />
          Simply Better.
        </h1>
        <p>
          3legant is a gift & decorations store based in HCMC, <br />
          Vietnam. Est since 2019.
        </p>
      </section>

      {/* Category Section */}
      <section className="category-section">
        {categoriesSection.map((item) => (
          <div className="category" key={item.id}>
            <img
              className="category-img"
              src={item.categoryImg}
              alt={item.label}
            />
            <div
              className="category-title"
              onClick={() =>
                handleNavigateToListPage(item, "category", navigate)
              }
            >
              <h1>{item.label}</h1>
              <span>Shop now</span>
            </div>
          </div>
        ))}
      </section>
      {/* New Arrival Section */}
      <section className="new-arrival-section">
        <div className="new-arrival-header">
          <h1>
            New <br /> Arrivals
          </h1>
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

      {/* //service-section */}
      <section className="service-section">
        {serviceProvided.map((item, index) => (
          <div className="service-section-card" key={index}>
            <div className="service-icon">{item.icon}</div>
            <h3>{item.serviceName}</h3>
            <p>{item.serviceText}</p>
          </div>
        ))}
      </section>
      {/* //home-section-bottom-banner */}
      <section className="home-section-bottom-banner">
        <div className="image-banner">
          <img src={bottonImageBanner} alt="" />
        </div>
        <div className="banner-details">
          <p>SALE UP TO 35% OFF</p>
          <h1>
            HUNDREDS of <br />
            New lower prices!
          </h1>
          <h3>
            It’s more affordable than ever to give every <br />
            room in your home a stylish makeover
          </h3>
          <div className="shop-now-div">
            <span>
              Shop Now
              <ArrowRight size={20} />{" "}
            </span>
          </div>
        </div>
      </section>

      {/* //footer */}
      <Footer />
    </div>
  );
}

export default ShoppingHome;
