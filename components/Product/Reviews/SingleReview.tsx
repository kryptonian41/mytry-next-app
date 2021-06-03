import React from "react";
import FilledStar from "assets/svgs/icons/rating-star-filled.svg";
import EmptyStar from "assets/svgs/icons/rating-star.svg";
import reviewStyles from "./review.module.css";

const SingleReview = ({ rating, reviewText, reviewer }) => {
  return (
    <div className={reviewStyles.singleReviewContainer}>
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
      <p className={reviewStyles.review}>{reviewText.substr(3, reviewText.length - 8)}</p>
      <p className={reviewStyles.reviewer}>{reviewer}</p>
    </div>
  );
};

export default SingleReview;
