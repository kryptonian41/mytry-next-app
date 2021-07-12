import Layout from "components/Layout";
import Link from "next/link";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./policy.module.scss";

const ReturnsRefundPolicy = () => {
  return (
    <Layout title="Returns & Refund Policy" description={null} keywords={null}>
      <div className={styles.container}>
        <Navbar />
        <section>
          <h1>Returns Policy</h1>
        </section>
        <section>
          <h2>Order cancellation</h2>
          <p>
            Any time before processed for dispatch. The refund amount will be
            credited back into same payment method within 7 to 10 working days.
            There is no order cancellation changes. For order cancellation,
            please
            <Link href="/contact">contact us</Link>
          </p>
        </section>
        <section>
          <h2>Product Returns</h2>
          <p>
            Hygiene of our customer is top priority. We do not accept product
            returns. However, subject to certain exceptions including but not
            limited to delivered wrong product, damaged in shipping or
            workmanship error, within 7 days from date of delivery, return may
            be processed. Acceptance of return / replacement / refund is
            discretion of MyTry.
          </p>
        </section>
        <section>
          <h2>Returned products shall be:</h2>
          <p>
            <ul>
              <li>unused and not tampered with seals.</li>
              <li>
                With all tags, hygiene liners, including any hang tags,
                attached.
              </li>
              <li>With original packaging </li>
            </ul>
          </p>
        </section>
        <section>
          <h2>Steps for return or replacement:</h2>
          <p>
            <ol>
              <li>
                Email, call or message on contact us page for return or
                replacement with evidences.
              </li>
              <li>
                We arrange for a return pick-up within 5 to 7 days or you can
                send us the package via preferred courier partner.
              </li>
              <li>
                Once return pick-up is done and the product has reached us, we
                can Exchange the product in below mentioned exchange types.
                <ul>
                  <li>Piece to Piece replacement</li>
                  <li>
                    Exchanged product in for a different product category/same
                    product category.
                  </li>
                  <li>Credit note of invoicing amount excluding discount</li>
                </ul>
              </li>
            </ol>
          </p>
        </section>
        <section>
          <h1>Refund Policy</h1>
          <p>
            Refund to customers are provided in very rare instances such as
            damaged product and workmanship related issues. Refunds shall only
            be provided in the form of credit note (not transferable / not
            exchangeable) with one year expiry equivalent to the invoiced price
            (excluding of discount and promotional offer) less shipping charges
            of the item purchased. Refunds will be processed within
            approximately 7 to 10 working days after we receive your return.
          </p>
        </section>
        <Footer />
      </div>
    </Layout>
  );
};

export default ReturnsRefundPolicy;
