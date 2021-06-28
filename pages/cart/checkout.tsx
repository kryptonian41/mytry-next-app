import React from 'react'
import Layout from "components/Layout";
import Navbar from 'components/Navbar';
import Summary from 'components/Cart/Summary';
import { useSelector } from 'react-redux';
import cartStyles from 'components/Cart/cart.module.scss'
import { useTheme } from 'utils/color-map';
import * as Yup from "yup";
import { ShippingForm } from 'components/Cart/checkout/ShippingForm';
import { CheckoutButton } from 'components/Cart/checkout/CheckoutButton';


interface Props {

}

const contactInformationSchema = Yup.object({
  email: Yup.string()
    .email("please enter a vaild email id")
    .required("field is required"),
  password: Yup.string()
    .min(8, "password should be minimum 8 characters")
    .required("field is required"),
});





export const Checkout = (props: Props) => {
  const cart = useSelector((state) => (state as any).cart);
  const { cartTotal, items } = cart;
  const theme = useTheme()
  return (
    <Layout title="Place Order" description={null} keywords={null}>
      <div className={cartStyles.container} style={{
        background: '#F7FAEE'
      }}>
        <Navbar />
        <div className={cartStyles.cartContainer}>
          <div style={{
            gridColumn: '2/13'
          }}>
            <h1 className="text-5xl" style={{
              color: theme.orange
            }}>
              Shipping
            </h1>
            <div className="mt-8">
              <ShippingForm />
            </div>
          </div>
          <Summary cartTotal={cartTotal} dark buttonComponent={<CheckoutButton />} />
        </div>
      </div>
    </Layout>
  )
}




export default Checkout