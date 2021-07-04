import { useTheme } from "utils/color-map";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import styles from "./styles.module.scss";
import clsx from "clsx";

export const ProductPage = () => {
  const theme = useTheme();
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
              <p className="text-white uppercase sm:text-lg mb-1">
                Address
              </p>
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

              <div className="flex items-end mb-3">
                <p
                  style={{
                    color: theme.green,
                  }}
                  className="uppercase sm:text-lg leading-none"
                >
                  Name
                </p>
                <div className="flex-1 pl-8">
                  <input
                    type="text"
                    className="block w-full border-0 border-b"
                    style={{
                      borderBottomColor: theme.green,
                    }}
                  />
                </div>
              </div>
              <div className="flex items-end mb-3">
                <p
                  style={{
                    color: theme.green,
                  }}
                  className="uppercase sm:text-lg leading-none"
                >
                  Email
                </p>
                <div className="flex-1 pl-8">
                  <input
                    type="text"
                    className="block w-full border-0 border-b"
                    style={{
                      borderBottomColor: theme.green,
                    }}
                  />
                </div>
              </div>
              <div className="flex items-end mb-6">
                <p
                  style={{
                    color: theme.green,
                  }}
                  className="uppercase sm:text-lg leading-none"
                >
                  Phone
                </p>
                <div className="flex-1 pl-8">
                  <input
                    type="text"
                    className="block w-full border-0 border-b"
                    style={{
                      borderBottomColor: theme.green,
                    }}
                  />
                </div>
              </div>
              <div className="flex items-end flex-wrap mb-6">
                <p
                  style={{
                    color: theme.green,
                  }}
                  className="uppercase sm:text-lg"
                >
                  Message
                </p>
                <div className="w-full">
                  <input
                    type="text"
                    className="block w-full border-0 border-b"
                    style={{
                      borderBottomColor: theme.green,
                    }}
                  />
                </div>
              </div>

              <div className="text-right">
                <button
                  style={{
                    backgroundColor: theme.orange,
                    color: theme.yellow,
                  }}
                  className="px-4 py-1 rounded-full"
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
