import { StarIcon } from "lucide-react";
import React from "react";
import "./css/StarRatingComponent.css";
function StarRatingComponent({ rating, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star) => (
    <button
      className={`star-button ${star <= rating ? "active-style" : ""}`}
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`star-icon ${star <= rating ? "active-star-yellow" : ""}`}
      />
    </button>
  ));
}

export default StarRatingComponent;
