import React from "react";
import FilledStar from "assets/svgs/icons/rating-star-filled.svg";
import EmptyStar from "assets/svgs/icons/rating-star.svg";
import reviewStyles from "./review.module.css";

const SingleReview = ({ rating, reviewText, reviewer }) => {
  function createReviewMarkup(reviewText) {
    return { __html: reviewText };
  }

  return (
    <div className={reviewStyles.singleReviewContainer}>
      <div className={reviewStyles.starsContainer}>
        {rating
          ? Array(rating)
              .fill(" ")
              .map((_, i) => <FilledStar key={rating + 1 + i} />)
          : ""}
        {rating
          ? Array(5 - rating)
              .fill(" ")
              .map((_, i) => <EmptyStar key={rating + i} />)
          : ""}
      </div>
      <div
        className={reviewStyles.review}
        dangerouslySetInnerHTML={createReviewMarkup(reviewText)}
      />
      <p className={reviewStyles.reviewer}>{reviewer}</p>
    </div>
  );
};

export default SingleReview;
