import React, { useContext, useEffect, useState } from "react";
import ShopProductTile from "./ShopProductTile";
import "./css/ShoppingGrid.css";
import ShopProductContext from "../../context/ShopProductContext";

function GridContainer({ productList }) {
  const { gridSelector, setGridSelector } = useContext(ShopProductContext);
  const [noOfElements, setnoOfElements] = useState(12);

  const slice = productList.slice(0, noOfElements);
  function loadMore() {
    setnoOfElements(noOfElements + noOfElements);
  }

  useEffect(() => {
    const savedGridSelector = sessionStorage.getItem("gridSelector");
    if (savedGridSelector !== null) {
      setGridSelector(Number(savedGridSelector));
    }
  }, [setGridSelector]);

  const renderGrid = (className) => (
    <div className={`main-${className}`}>
      <div className={className}>
        {slice.map((product) => (
          <ShopProductTile
            gridSelector={gridSelector}
            key={product._id}
            product={product}
          />
        ))}
      </div>
      <button className="loadMoreButton" onClick={loadMore}>
        Show more
      </button>
    </div>
  );

  return (
    <>
      {gridSelector === 0 && renderGrid("grid-container")}
      {gridSelector === 1 && renderGrid("grid-container-2")}
      {gridSelector === 2 && renderGrid("grid-container-3")}
      {gridSelector === 3 && renderGrid("grid-container-4")}
    </>
  );
}

export default GridContainer;
