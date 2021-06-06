import React, { useState } from "react";
import reviewStyles from "./review.module.css";
import FilledStar from "assets/svgs/icons/rating-star-filled.svg";
import EmptyStar from "assets/svgs/icons/rating-star.svg";

const CreateReview = () => {
  const [ratingInput, setRatingInput] = useState(0);
  const [tempRatingInput, setTempRatingInput] = useState(0);

  return (
    <div className={reviewStyles.formContainer}>
      <form>
        <label htmlFor="name">
          <p>Name</p>
          <input type="text" id="name" />
        </label>
        <label htmlFor="city">
          <p>City</p>
          <input type="text" id="city" />
        </label>
        <label htmlFor="contact">
          <p>Contact</p>
          <input type="text" id="contact" />
        </label>
        <label htmlFor="review">
          <p>Review</p>
          <input type="number" hidden id="rating" />
          <div
            className={`${reviewStyles.starsContainer} ${reviewStyles.ratingInputContainer}`}
          >
            {Array(ratingInput)
              .fill(" ")
              .map((_, i) => (
                <button
                  type="button"
                  onClick={() => {
                    setRatingInput(1 + i);
                    setTempRatingInput(1 + i);
                  }}
                  onMouseEnter={() => {
                    setRatingInput(1 + i);
                  }}
                  onMouseLeave={() => {
                    setRatingInput(tempRatingInput);
                  }}
                >
                  <FilledStar key={i} />
                </button>
              ))}
            {Array(5 - ratingInput)
              .fill(" ")
              .map((_, i) => (
                <button
                  type="button"
                  onClick={() => {
                    setRatingInput(ratingInput + 1 + i);
                    setTempRatingInput(ratingInput + 1 + i);
                  }}
                  onMouseEnter={() => {
                    setRatingInput(ratingInput + 1 + i);
                  }}
                  onMouseLeave={() => {
                    setRatingInput(tempRatingInput);
                  }}
                >
                  <EmptyStar key={ratingInput + i} />
                </button>
              ))}
          </div>
        </label>
        <textarea className={reviewStyles.reviewTextArea} id="review" />
        <button className={reviewStyles.submitBtn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateReview;
