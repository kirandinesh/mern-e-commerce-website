import React, { Fragment, useContext, useEffect, useState } from "react";
import { filterOptions, sortOptions } from "../../config";
import { ChevronRight } from "lucide-react";
import gridSelector1 from "../../assets/icons/3x3-gap-fill.svg";
import gridSelector2 from "../../assets/icons/gridselector2.svg";
import gridSelector3 from "../../assets/icons/gridselector3.svg";
import gridSelector4 from "../../assets/icons/gridselector4.svg";
import "./css/filter.css";
import ShopProductContext from "../../context/ShopProductContext";

function Productfilter({ sort, setSort, filters, handleFilter, setFilters }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => {
    return parseInt(sessionStorage.getItem("activeIndex")) || 0;
  });

  const { gridSelector, setGridSelector } = useContext(ShopProductContext);

  useEffect(() => {
    sessionStorage.setItem("activeIndex", activeIndex);
  }, [activeIndex]);

  const handleSelectorClick = (index) => {
    setGridSelector(index);
    setActiveIndex(index);
    sessionStorage.setItem("gridSelector", index);
  };

  const getSelectedValue = (keyItems) => {
    if (!filters) return "All Products";

    if (keyItems === "price") {
      const selectedPrice = filterOptions.price.find(
        (item) =>
          filters.price &&
          filters.price[0] === item.min &&
          filters.price[1] === item.max
      );
      return selectedPrice ? selectedPrice.label : "All Prices";
    }

    if (keyItems === "category") {
      return filters.category && filters.category.length
        ? filters.category[0]
        : "All Products";
    }

    return "";
  };

  return (
    <div className="filterToolbar">
      <div className="filter-left-container">
        {Object.keys(filterOptions).map((keyItems) => (
          <Fragment key={keyItems}>
            <div className="filter-left">
              <h3>{keyItems}</h3>
              <select
                onChange={(event) => handleFilter(keyItems, event.target.value)}
                value={getSelectedValue(keyItems)}
              >
                {filterOptions[keyItems].map((item) => (
                  <option key={item.id} value={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </Fragment>
        ))}
      </div>
      <div className="filter-right-container">
        <div
          className={`sortby ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen && (
            <ul className="sortMenu">
              {sortOptions.map((item) => (
                <li
                  className={`sortList ${sort === item.value ? "active" : ""}`}
                  key={item.id}
                  onClick={() => setSort(item.value)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}
          <h3>Sort by</h3>
          <ChevronRight className="arrowIcon" strokeWidth={1.5} />
        </div>
        <div className="grid-selector">
          {[gridSelector1, gridSelector2, gridSelector3, gridSelector4].map(
            (icon, index) => (
              <div
                key={index}
                className={`selector ${activeIndex === index ? "hover" : ""}`}
                onClick={() => handleSelectorClick(index)}
              >
                <img src={icon} alt={`Grid Selector ${index + 1}`} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Productfilter;
