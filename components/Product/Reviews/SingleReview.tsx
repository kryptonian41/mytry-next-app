import React from "react";
import FilledStar from "assets/svgs/icons/rating-star-filled.svg";
import EmptyStar from "assets/svgs/icons/rating-star.svg";
import reviewStyles from "./review.module.css";

const SingleReview = ({ rating, reviewText }) => {
  return (
    <div>
      <div className={reviewStyles.starsContainer}>
        {rating
          ? Array(rating)
              .fill(" ")
              .map((_, i) => <FilledStar />)
          : ""}
        {rating
          ? Array(5 - rating)
              .fill(" ")
              .map((_, i) => <EmptyStar />)
          : ""}
      </div>
      {reviewText.substr(3, reviewText.length - 8)}
    </div>
  );
};

export default SingleReview;
