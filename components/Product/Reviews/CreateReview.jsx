import React, { useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createReview } from "actions/productActions";
import reviewStyles from "./review.module.css";
import FilledStar from "assets/svgs/icons/rating-star-filled-form.svg";
import EmptyStar from "assets/svgs/icons/rating-star-form.svg";

const CreateReview = ({ productId, colorScheme }) => {
  const [ratingInput, setRatingInput] = useState(0);
  const [tempRatingInput, setTempRatingInput] = useState(0);

  const dispatch = useDispatch();

  const validate = Yup.object({
    fullName: Yup.string()
      .min(1, "field is required")
      .required("field is required"),
    email: Yup.string()
      .email("please enter a vaild email id")
      .required("field is required"),
    rating: Yup.number()
      .min(1, "field is required")
      .max(5)
      .required("field is required"),
    review: Yup.string()
      .min(1, "field is required")
      .required("field is required"),
  });

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        rating: ratingInput,
        review: "",
      }}
      validationSchema={validate}
      onSubmit={(
        { fullName, email, rating, review },
        { setSubmitting, resetForm }
      ) => {
        const data = {
          product_id: productId,
          review,
          reviewer: fullName,
          reviewer_email: email,
          rating,
        };
        const onSuccess = () => {
          resetForm();
          setRatingInput(0);
        };
        dispatch(createReview(data, onSuccess));
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <div className={reviewStyles.formContainer}>
          <Form style={{ color: colorScheme.bgColor }}>
            <label htmlFor="name">
              <p>Name</p>
              <Field
                type="text"
                id="name"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                className={
                  formik.touched.fullName && formik.errors.fullName
                    ? reviewStyles.errorField
                    : ""
                }
              />
            </label>
            <ErrorMessage
              component="div"
              className={reviewStyles.errorMessage}
              name="fullName"
            />
            {/* <label htmlFor="city">
            <p>City</p>
            <input type="text" id="city" />
          </label> */}
            <label htmlFor="email">
              <p>E-mail</p>
              <Field
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={
                  formik.touched.email && formik.errors.email
                    ? reviewStyles.errorField
                    : ""
                }
              />
            </label>
            <ErrorMessage
              component="div"
              className={reviewStyles.errorMessage}
              name="email"
            />
            <label htmlFor="review">
              <p>Review</p>
              <Field
                type="number"
                value={formik.values.rating}
                hidden
                id="rating"
                name="rating"
                onChange={formik.handleChange}
              />
              <div
                className={`${reviewStyles.starsContainer} ${reviewStyles.ratingInputContainer}`}
              >
                {Array(ratingInput)
                  .fill(" ")
                  .map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setRatingInput(1 + i);
                        formik.setFieldValue("rating", ratingInput);
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
                      key={i + 5}
                      type="button"
                      onClick={() => {
                        setRatingInput(ratingInput + 1 + i);
                        formik.setFieldValue("rating", ratingInput);
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
            <ErrorMessage
              component="div"
              className={reviewStyles.errorMessage}
              name="rating"
            />
            <Field
              as="textarea"
              className={`${reviewStyles.reviewTextArea} ${
                formik.touched.review && formik.errors.review
                  ? reviewStyles.errorField
                  : ""
              } `}
              id="review"
              name="review"
              value={formik.values.review}
              onChange={formik.handleChange}
            />
            <ErrorMessage
              component="div"
              className={reviewStyles.errorMessage}
              name="review"
            />
            <button
              style={{ backgroundColor: colorScheme.bgColor }}
              className={reviewStyles.submitBtn}
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default CreateReview;
