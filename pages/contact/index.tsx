import { useTheme } from "utils/color-map";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import styles from "./styles.module.scss";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { submitContactUsForm } from "utils/api-utils";
import { InputField } from "components/Cart/checkout/InputField";

export const ProductPage = () => {
  const theme = useTheme();

  const inputField = (type, name) => (
    <InputField
      fieldProps={{
        type,
        name,
        className: "block w-full border-0 border-b",
      }}
      errorProps={{ component: "div", name }}
    />
  );

  const contactUsFormSchema = Yup.object({
    name: Yup.string().required("Field is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    phone: Yup.number(),
    msg: Yup.string().required("Field is required"),
  });

  return (
    <Layout title="Contact Us" description={null} keywords={null}>
      <div
        className={styles.root}
        style={{
          backgroundColor: theme.green,
        }}
      >
        <div className={styles.hero}>
          <Navbar color="light" className="z-10" />
          <div className={clsx(styles["hero-contact-wrapper"], "z-0")}>
            <div
              className={clsx(
                "mt-8 sm:mt-0 py-6 pt-16 sm:pt-6 pl-6 pr-12 sm:pr-0 sm:pl-12 order-2 sm:order-none",
                styles["hero-contact-info"]
              )}
              style={{
                backgroundColor: theme.orange,
              }}
            >
              <p className="text-white uppercase sm:text-2xl mb-4">
                General Inquiries
              </p>
              <p className="text-white uppercase sm:text-lg mb-1">
                Contact No.
              </p>
              <p
                className="uppercase sm:text-xl mb-4"
                style={{
                  color: theme.yellow,
                }}
              >
                +91 6359 874 699
              </p>
              <p className="text-white uppercase sm:text-lg mb-1">Address</p>
              <p
                className="uppercase sm:text-xl"
                style={{
                  color: theme.yellow,
                }}
              >
                703-4 C Tower Happy Residency
                <br />
                Opp. Safal Square Vesu
                <br />
                Surat - 395007
                <br />
                Gujarat
                <br />
                India
              </p>
            </div>

            <div
              className={clsx(
                "bg-white px-8 sm:px-16 py-12 order-1 sm:order-none",
                styles["hero-contact-form"]
              )}
            >
              <p
                className="uppercase text-xl sm:text-3xl mb-6"
                style={{
                  color: theme.green,
                }}
              >
                get in touch
              </p>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  msg: "",
                }}
                validationSchema={contactUsFormSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  submitContactUsForm(
                    values,
                    () => {
                      setSubmitting(false);
                      resetForm();
                    },
                    () => {
                      setSubmitting(false);
                    }
                  );
                }}
              >
                {(props) => (
                  <Form>
                    <div className="flex items-end mb-3">
                      <p
                        style={{
                          color: theme.green,
                        }}
                        className="uppercase sm:text-lg leading-none pb-7"
                      >
                        Name
                      </p>
                      <div className="flex-1 pl-8">
                        {inputField("text", "name")}
                      </div>
                    </div>
                    <div className="flex items-end mb-3">
                      <p
                        style={{
                          color: theme.green,
                        }}
                        className="uppercase sm:text-lg leading-none pb-7"
                      >
                        Email
                      </p>
                      <div className="flex-1 pl-8">
                        {inputField("text", "email")}
                      </div>
                    </div>
                    <div className="flex items-end mb-6">
                      <p
                        style={{
                          color: theme.green,
                        }}
                        className="uppercase sm:text-lg leading-none pb-7"
                      >
                        Phone
                      </p>
                      <div className="flex-1 pl-8">
                        {inputField("tel", "phone")}
                      </div>
                    </div>
                    <div className="flex items-end flex-wrap mb-6">
                      <p
                        style={{
                          color: theme.green,
                        }}
                        className="uppercase sm:text-lg pn-7"
                      >
                        Message
                      </p>
                      <div className="w-full">{inputField("text", "msg")}</div>
                    </div>

                    <div className="text-right">
                      <button
                        type="submit"
                        style={{
                          backgroundColor: theme.orange,
                          color: theme.yellow,
                        }}
                        className="px-4 py-1 rounded-full"
                        disabled={props.isSubmitting}
                      >
                        submit
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
