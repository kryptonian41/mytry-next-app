import cartStyles from "components/Cart/cart.module.scss";
import { CheckoutButton } from "components/Cart/checkout/CheckoutButton";
import { ContactShippingForm } from "components/Cart/checkout/ShippingForm";
import Summary from "components/Cart/Summary";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART } from "redux-utils/actions/types";
import { ContactShippingData, User } from "types/commons";
import { getOrderDetails } from "utils";
import { CheckoutType } from "utils/api-utils";
import { CODCheckout, RazorPayCheckout } from "utils/checkout";
import { useTheme } from "utils/color-map";
interface Props {}

export const Checkout = (props: Props) => {
  const cart = useSelector((state) => (state as any).cart);
  const { user } = useSelector((state) => (state as any).user);
  const { cartTotal, items } = cart;
  const theme = useTheme();
  const router = useRouter();
  const shippingFormSubmitRef = useRef(null);
  const dispatch = useDispatch();
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    if (!user) router.push("/cart");
  }, [user]);

  const checkout: (
    values: ContactShippingData,
    formikHelpers: FormikHelpers<ContactShippingData>
  ) => void | Promise<any> = async (values: ContactShippingData) => {
    setPlacingOrder(true);

    switch (CheckoutType.COD as CheckoutType) {
      case CheckoutType.COD: {
        const order = getOrderDetails(items, values, CheckoutType.COD);
        await CODCheckout(order, (order) => {
          dispatch({
            type: CLEAR_CART,
          });
          router.push({
            pathname: "/order/success",
            query: {
              orderId: order.id,
            },
          });
          setPlacingOrder(false);
        });
        break;
      }
      case CheckoutType.Razorpay: {
        const order = getOrderDetails(items, values, CheckoutType.Razorpay);
        await RazorPayCheckout(order, (rzpResponse) => {
          dispatch({
            type: CLEAR_CART,
          });
          router.push({
            pathname: "/order/success",
            query: {
              orderId: rzpResponse.razorpay_order_id,
            },
          });
        });
        setPlacingOrder(false);
        break;
      }
      default: {
        alert("Invalid checkout type selected");
        break;
      }
    }
  };

  return (
    <Layout title="Place Order" description={null} keywords={null}>
      {/* <Head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head> */}

      <div
        className={cartStyles.container}
        style={{
          background: "#F7FAEE",
        }}
      >
        <Navbar />
        <div className={cartStyles.cartContainer}>
          <div
            style={{
              gridColumn: "2/13",
            }}
          >
            <h1
              className="text-5xl"
              style={{
                color: theme.orange,
              }}
            >
              Shipping
            </h1>
            <div className="mt-8">
              <ContactShippingForm
                submitBtnRef={shippingFormSubmitRef}
                onSubmit={checkout}
              />
            </div>
          </div>
          <Summary
            cartTotal={cartTotal}
            dark
            buttonComponent={
              <CheckoutButton
                shippingFormBtnRef={shippingFormSubmitRef}
                loading={placingOrder}
              />
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
