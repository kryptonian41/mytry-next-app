import { useDispatch } from "react-redux";
import { logIn } from "redux-utils/actions/userActions";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import loginStyles from "./login.module.scss";

const LoginForm = () => {
  const dispatch = useDispatch();

  const validate = Yup.object({
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
        onSubmit={({ email, password }, { setSubmitting, resetForm }) => {
          const onSuccess = () => {
            setSubmitting(false);
            resetForm();
          };
          dispatch(logIn(email, password, onSuccess));
        }}
      >
        {(formik) => (
          <>
            <h1>Login</h1>
            <Form className={loginStyles.flexContainer}>
              <div>
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
                <button
                  className={loginStyles.submitBtn}
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Submit
                </button>
                <div className={loginStyles.registerLink}>
                  New user <span style={{
                    fontFamily: 'Arial'
                  }}>?</span>&nbsp;&nbsp; <Link href="/register">Register</Link>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
