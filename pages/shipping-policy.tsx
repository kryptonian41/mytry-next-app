import Layout from "components/Layout";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import styles from "./policy.module.scss";

const ShippingPolicy = () => {
  return (
    <Layout title="Shipping Policy">
      <div className={styles.container}>
        <Navbar />
        <section>
          <h1>Shipping Policy</h1>
        </section>
        <section>
          <p>
            The Purchaser hereby agrees upon making payment that he has read
            this shipping policy prior to purchasing / ordering on
            www.mytryshop.com
            <ol>
              <li>
                MyTry offers free shipping for order value &gt; Rs.2500/-. If
                the order value &lt; Rs2500/-, a flat charge of Rs. 50 shall be
                applicable. All process listed on website are inclusive of all
                taxes. For shipping charges, check free shipping eligibility
                before order.
              </li>
              <li>
                MyTry shall dispatch the order at the earliest and the purchaser
                should receive its product within 5 - 7 working days.
              </li>
              <li>
                MyTry will ship the product on weekday except Saturday, Sunday &
                Public holidays. Delivery of all orders will be duly done to the
                shipping address as mentioned by the purchaser at the time of
                placing the order.
              </li>
              <li>
                Payments in Cash on Delivery Charges (“COD”) will only be
                accepted if the total invoice value is between Rs 1,500 to Rs
                10,000. A minimum charge of Rs. 50 or 2.5% of the bill value
                whichever is higher will also be levied.
              </li>
              <li>
                Upon shipping, MyTry will provide tracking number to the
                purchaser of their purchase and the details of the shipping
                service via email, to enable the purchaser to track their order
                online.
              </li>
              <li>
                The purchaser can cancel order only within a period of maximum
                24 hours of placing an order by email to the mytryskin@gmail.com
                with quoting Purchase Order Number. The Acceptance of
                Cancellation shall be rights of MyTry and shall only in the
                event the order is NOT processed. The purchaser agrees that the
                MyTry reserve right to accept or deny order cancellation
                request.
              </li>
              <li>
                Delivery partners will attempt to deliver the package twice
                before it is returned back. The delivery partners will also
                contact you in best possible way to deliver. In case failure to
                attempt delivery, the Purchaser will be required to contact
                local shipping agency to rearrange delivery.
              </li>
              <li>
                This Shipping Policy shall be co terminus and co extensive with
                the terms and conditions for online transactions.
              </li>
            </ol>
          </p>
        </section>
        <Footer />
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
