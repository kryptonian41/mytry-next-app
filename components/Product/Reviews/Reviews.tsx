import React, { useState, useEffect } from "react";
import reviewStyles from "./review.module.css";
import ExpandIcon from "assets/svgs/icons/expand.svg";
import { getReviews } from "api-utils";
import { useQuery } from "react-query";
import SingleReview from "./SingleReview";
import CreateReview from "./CreateReview";

const Review = ({ productId, ratingCount }) => {
  const {
    data: reviews,
    isLoading,
    isError,
  } = useQuery("reviews", () => getReviews());

  const [isFormOpen, setFormOpen] = useState(false);

  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    if (reviews)
      setProductReviews(
        reviews.filter((review) => review.product_id === productId)
      );
  }, [reviews]);

  return (
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
      {ratingCount > 0 && productReviews.length && (
        <>
          <hr />
          <div className={reviewStyles.reviewsContainer}>
            <h2>What people are saying</h2>
            <div className={reviewStyles.reviews}>
              {productReviews.map((productReview) => (
                <SingleReview
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
  );
};

export default Review;
