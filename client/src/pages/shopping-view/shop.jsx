import React, { useEffect, useState } from "react";
import "../CSS/shopping-view/Shop.css";
import Productfilter from "../../components/shopping-view/filter";
import GridContainer from "../../components/shopping-view/ShopinngGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "../../features/shop/products-slice";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { filterOptions } from "../../config";
import Footer from "../../components/shopping-view/Footer";
import { ChevronRight } from "lucide-react";
import shopBannerImg from "../../assets/home-page/shop_banner.png";
function createSearchParamsHelper(filterParams, sort) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  if (sort) {
    queryParams.push(`sortBy=${encodeURIComponent(sort)}`);
  }

  return queryParams.join("&");
}

function Shop() {
  const { productList, isLoading } = useSelector(
    (state) => state.shoppingProducts
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState(() => {
    return JSON.parse(sessionStorage.getItem("filters")) || {};
  });
  const [sort, setSort] = useState("price_lowtohigh");

  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilter(getSectionId, getCurrentOption) {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (getSectionId === "price") {
        const selectedPrice = filterOptions.price.find(
          (item) => item.label === getCurrentOption
        );
        newFilters.price =
          selectedPrice.label === "All Prices"
            ? [0, Infinity]
            : [selectedPrice.min, selectedPrice.max];
      } else if (getSectionId === "category") {
        newFilters.category =
          getCurrentOption === "All Products" ? [] : [getCurrentOption];
      }
      sessionStorage.setItem("filters", JSON.stringify(newFilters));
      return newFilters;
    });
  }

  useEffect(() => {
    const storedFilters = JSON.parse(sessionStorage.getItem("filters"));
    if (storedFilters) {
      setFilters(storedFilters);
    }
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters, sort);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters, sort]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
    );
  }, [dispatch, filters, sort]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shopping-main-container">
      <div className="pageHeader">
        <div className="pageImageHolder">
          <img src={shopBannerImg} alt="" />
          <div className="pageImageHolder-title">
            <div className="to-linkContainer">
              <button onClick={() => navigate("/shop/home")}>Home</button>
              <ChevronRight size={15} />
              <button>shop</button>
            </div>
            <h1>Shop Page</h1>
            <p>Let’s design the place you always imagined.</p>
          </div>
        </div>
      </div>
      <div className="shop-product-grid">
        <div className="shop-toolbar">
          <Productfilter
            sort={sort}
            setSort={setSort}
            filters={filters}
            handleFilter={handleFilter}
            setFilters={setFilters}
          />
        </div>
        <div className="product-grid">
          <GridContainer productList={productList} />
        </div>
      </div>
      <div className="pageBottom">
        <Footer />
      </div>
    </div>
  );
}

export default Shop;
