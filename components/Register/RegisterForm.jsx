import { useDispatch } from "react-redux";
import { registerUser } from "actions/userActions";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import loginStyles from "../Login/login.module.scss";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const validate = Yup.object({
    firstName: Yup.string()
      .min(1, "field is required")
      .required("field is required"),
    lastName: Yup.string()
      .min(1, "field is required")
      .required("field is required"),
    email: Yup.string()
      .email("please enter a vaild email id")
      .required("field is required"),
    password: Yup.string()
      .min(8, "password should be minimum 8 characters")
      .required("field is required"),
  });

  return (
    <div className={loginStyles.loginFormContainer}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={(
          { firstName, lastName, email, password },
          { setSubmitting, resetForm }
        ) => {
          dispatch(registerUser(firstName, lastName, email, password));
          setSubmitting(false);
          resetForm();
        }}
      >
        {(formik) => (
          <>
            <h1>Registration</h1>
            <Form className={loginStyles.flexContainer}>
              <div>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.firstName && formik.errors.firstName
                      ? loginStyles.errorField
                      : ""
                  }
                />
                <ErrorMessage
                  component="div"
                  className={loginStyles.errorMessage}
                  name="firstName"
                />
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.lastName && formik.errors.lastName
                      ? loginStyles.errorField
                      : ""
                  }
                />
                <ErrorMessage
                  component="div"
                  className={loginStyles.errorMessage}
                  name="lastName"
                />
                <Field
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.email && formik.errors.email
                      ? loginStyles.errorField
                      : ""
                  }
                />
                <ErrorMessage
                  component="div"
                  className={loginStyles.errorMessage}
                  name="email"
                />
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.password && formik.errors.password
                      ? loginStyles.errorField
                      : ""
                  }
                />
                <ErrorMessage
                  component="div"
                  className={loginStyles.errorMessage}
                  name="password"
                />
              </div>
              <div className={loginStyles.formOptions}>
                <button className={loginStyles.submitBtn} type="submit">
                  Submit
                </button>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
