import React, { useState } from "react";
import reviewStyles from "./review.module.css";
import ExpandIcon from "../../assets/svgs/icons/expand.svg";

const Review = () => {
  const [isFormOpen, setFormOpen] = useState(false);

  return (
    <div className={reviewStyles.container}>
      <div className={reviewStyles.heading}>
        <h2>Write a Review</h2>
        {/* {!isFormOpen && ( */}
          <button
            type="button"
            onClick={() => {
              setFormOpen(true);
            }}
          >
            <ExpandIcon />
          </button>
        {/* )} */}
      </div>
      {isFormOpen && <div>Form</div>}
      <hr />
      <div className={reviewStyles.reviewsContainer} >
          <h2>What people are saying</h2>
          <div className={reviewStyles.reviews}>
              Existing reviews
          </div>
      </div>
    </div>
  );
};

export default Review;
