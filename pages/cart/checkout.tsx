import cartStyles from "components/Cart/cart.module.scss";
import { CheckoutButton } from "components/Cart/checkout/CheckoutButton";
import PaymentMethodSelector from "components/Cart/checkout/PaymentMethodSelector";
import { ContactShippingForm } from "components/Cart/checkout";
import Summary from "components/Cart/Summary";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART, LOAD_USER } from "redux-utils/actions/types";
import { ContactShippingData } from "types/commons";
import { getOrderDetails } from "utils";
import { CheckoutType } from "utils/api-utils";
import { CODCheckout } from "utils/checkout";
import { useTheme } from "utils/color-map";
import CouponForm from "components/Cart/checkout/CouponForm";

interface Props { }

type ShippingFormOnSubmitFunc = (
  values: ContactShippingData,
  formikHelpers: FormikHelpers<ContactShippingData>
) => void | Promise<any>;

export const Checkout = (props: Props) => {
  const cart = useSelector((state) => (state as any).cart);
  const { user } = useSelector((state) => (state as any).user);
  const { cartTotal, items } = cart;
  const theme = useTheme();
  const router = useRouter();
  const shippingFormSubmitRef = useRef(null);
  const dispatch = useDispatch();
  const [placingOrder, setPlacingOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(CheckoutType.COD);
  const [isCouponApplied, setCouponApplied] = useState(false);
  const [couponData, setCouponData] = useState(null);

  useEffect(() => {
    if (!user) router.push("/cart");
  }, [user]);

  const checkout = useCallback<ShippingFormOnSubmitFunc>(
    async (values: ContactShippingData) => {
      setPlacingOrder(true);
      switch (paymentMethod) {
        case CheckoutType.COD: {
          const order = getOrderDetails({
            userId: user.id,
            cartItems: items,
            shippingFormValues: values,
            checkoutType: CheckoutType.COD,
            couponData,
          });
          await CODCheckout(order, (order, userDetails) => {
            dispatch({
              type: CLEAR_CART,
            });
            if (userDetails) {
              dispatch({
                type: LOAD_USER,
                payload: userDetails
              })
            }
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
        // case CheckoutType.Razorpay: {
        //   const order = getOrderDetails(
        //     user.id,
        //     items,
        //     values,
        //     CheckoutType.Razorpay,
        //     couponData
        //   );
        //   await RazorPayCheckout(order, (rzpResponse) => {
        //     dispatch({
        //       type: CLEAR_CART,
        //     });
        //     router.push({
        //       pathname: "/order/success",
        //       query: {
        //         orderId: rzpResponse.razorpay_order_id,
        //       },
        //     });
        //   });
        //   setPlacingOrder(false);
        //   break;
        // }
        default: {
          alert("Invalid checkout type selected");
          break;
        }
      }
    },
    [paymentMethod, couponData, user]
  );

  const setCouponState = (couponApplied, coupon) => {
    setCouponApplied(couponApplied);
    setCouponData(coupon);
  };

  return (
    <Layout title="Place Order" description={null} keywords={null}>
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
            isCouponApplied={isCouponApplied}
            couponData={couponData}
            buttonComponent={
              <>
                <CouponForm
                  theme={theme}
                  setCouponState={setCouponState}
                  isCouponApplied={isCouponApplied}
                />
                <div
                  className="bg-white p-6 rounded-xl"
                  style={{
                    border: `1px solid ${theme.green}`,
                  }}
                >
                  <h1
                    className="text-2xl mb-4"
                    style={{
                      color: theme.green,
                    }}
                  >
                    Payment Mode
                  </h1>
                  <div>
                    <PaymentMethodSelector
                      onChange={(paymentMode: string) =>
                        setPaymentMethod(paymentMode as CheckoutType)
                      }
                      defaultPaymentMode={paymentMethod}
                    />
                  </div>
                  <div className="w-full mt-4">
                    <CheckoutButton
                      shippingFormBtnRef={shippingFormSubmitRef}
                      loading={placingOrder}
                    />
                  </div>
                </div>
              </>
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
