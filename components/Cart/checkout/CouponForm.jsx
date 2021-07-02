import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { applyCoupon } from "utils/api-utils";

const CouponForm = ({
  theme,
  setCouponState,
  isCouponApplied,
  unsetCouponState,
}) => {
  const { user } = useSelector((state) => state.user);
  const { cartTotal } = useSelector((state) => state.cart);

  return (
    <Formik
      initialValues={{
        code: "",
      }}
      validationSchema={Yup.object({
        code: Yup.string()
          .min(1, "Please enter a valid promo code")
          .matches(/^[a-zA-Z0-9]+$/, "Please enter a valid promo code")
          .required("Please enter a valid promo code"),
      })}
      onReset={(values, actions) => {
        actions.setSubmitting(false);
        actions.resetForm();
      }}
      onSubmit={({ code }, { setSubmitting, setFieldError }) => {
        const onSuccess = () => setSubmitting(false);
        const onError = (message) => {
          setSubmitting(false);
          setFieldError("code", message);
        };
        applyCoupon(
          user?.id,
          cartTotal,
          code,
          onSuccess,
          onError,
          setCouponState
        );
      }}
    >
      <Form className="flex space-x-3 my-8 mb-12">
        <div className="w-full relative">
          <Field
            type="text"
            placeholder="Promo Code"
            className="w-full bg-transparent pl-0 border-t-0 border-l-0 border-r-0 border border-b-2 focus:outline-none focus:ring-0 focus:border-black"
            name="code"
          />
          <ErrorMessage
            style={{ position: "absolute", fontSize: "0.8rem", color: "red" }}
            component="div"
            name="code"
          />
        </div>
        {isCouponApplied ? (
          <button
            type="reset"
            className="focus:outline-none"
            style={{
              backgroundColor: theme.orange,
              color: theme.yellow,
              borderRadius: "50rem",
              padding: "0.5rem 1rem",
            }}
          >
            Remove
          </button>
        ) : (
          <button
            type="submit"
            className="focus:outline-none"
            style={{
              backgroundColor: theme.orange,
              color: theme.yellow,
              borderRadius: "50rem",
              padding: "0.5rem 1rem",
            }}
          >
            Apply
          </button>
        )}
      </Form>
    </Formik>
  );
};

export default CouponForm;
