import React, { useState, useEffect } from "react";
import reviewStyles from "./review.module.css";
import ExpandIcon from "assets/svgs/icons/expand.svg";
import SingleReview from "./SingleReview";
import CreateReview from "./CreateReview";

const Review = ({ ratingCount, reviews, colorScheme }) => {
  const [isFormOpen, setFormOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 640) setFormOpen(true);
  }, []);

  return (
    <div className={reviewStyles.outerContainer}>
      <div
        style={{ backgroundColor: colorScheme.panelColor }}
        className={reviewStyles.createReviewContainer}
      >
        <div className={reviewStyles.createReviewContent}>
          <div className={reviewStyles.heading}>
            <h2 style={{ color: colorScheme.bgColor }}>Write a Review</h2>
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
          {isFormOpen && <CreateReview colorScheme={colorScheme} />}
        </div>
      </div>
      <div className={reviewStyles.container}>
        {ratingCount > 0 && reviews.length && (
          <>
            {/* <hr /> */}
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
