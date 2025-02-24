import ExpandIcon from "assets/svgs/icons/expand.svg";
import { useEffect, useState } from "react";
import { useAppSelector } from "redux-state/hooks";
import CreateReview, { type ColorScheme } from "./CreateReview";
import reviewStyles from "./review.module.css";
import SingleReview from "./SingleReview";

const Review = ({
  productId,
  colorScheme,
}: {
  productId: string;
  colorScheme: ColorScheme;
}) => {
  const [isFormOpen, setFormOpen] = useState(false);

  const { reviews } = useAppSelector((state) => state.product);

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
          {isFormOpen && (
            <CreateReview productId={productId} colorScheme={colorScheme} />
          )}
        </div>
      </div>
      <div className={reviewStyles.container}>
        {reviews?.length > 0 && (
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
