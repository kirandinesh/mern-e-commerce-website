import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSearchResults,
  resetSearchResults,
} from "../../../features/shop/search-slice";
import ShopProductTile from "../ShopProductTile";

function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const dispatch = useDispatch();

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults(keyword));
    }
  }, [keyword]);

  return (
    <div className="searchPage-container">
      {/* Search Box */}
      <div className="search-box">
        <input
          type="search"
          value={keyword}
          name="keyword"
          placeholder="Search for products..."
          className="search-input"
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* Search Results */}

      {!searchResults.length ? (
        <p className="search-result-message">No Product Found</p>
      ) : null}
      <div className="search-result-container">
        {searchResults.map((item, index) => (
          <ShopProductTile key={index} product={item} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
