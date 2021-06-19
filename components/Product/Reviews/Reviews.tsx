import React, { useState, useEffect } from "react";
import reviewStyles from "./review.module.css";
import ExpandIcon from "assets/svgs/icons/expand.svg";
import SingleReview from "./SingleReview";
import CreateReview from "./CreateReview";

const Review = ({ ratingCount, reviews, colorScheme }) => {
  const [isFormOpen, setFormOpen] = useState(false);

  return (
    <div className={reviewStyles.outerContainer}>
      <div className={reviewStyles.container}>
        <div className={reviewStyles.heading}>
          <h2>Write a Review</h2>
          {!isFormOpen && (
            <button
              type="button"
              onClick={() => {
                setFormOpen(true);
              }}
            >
              <ExpandIcon />
            </button>
          )}
        </div>
        {isFormOpen && <CreateReview />}
        {ratingCount > 0 && reviews.length && (
          <>
            <hr />
            <div className={reviewStyles.reviewsContainer}>
              <h2 style={{ color: colorScheme.bgColor }}>
                What people are saying
              </h2>
              <div className={reviewStyles.reviews}>
                {reviews.map((productReview) => (
                  <SingleReview
                    key={productReview.id}
                    rating={productReview.rating}
                    reviewText={productReview.review}
                    reviewer={productReview.reviewer}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Review;
