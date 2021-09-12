import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { ContactShippingData } from "types/commons";
import { isShippingMetaEmpty, userHasShippingMeta } from "utils/api-utils/shipping-address";
import { AddressList } from "./AddressList";
import { SaveForLaterBtn, ShippingForm } from "./ShippingForm";
import { ContactForm } from "./ContactForm";

interface Props {
  submitBtnRef: React.MutableRefObject<HTMLButtonElement>;
  onSubmit: (
    values: ContactShippingData,
    formikHelpers: FormikHelpers<ContactShippingData>
  ) => void | Promise<any>;
  initialValue?: ContactShippingData;
}

const shippingAddressSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  contactNo: Yup.number().required("Contact Number is required"),
  firstName: Yup.string().required("Field is required"),
  lastName: Yup.string().required("Field is required"),
  flatAddress: Yup.string()
    .max(50, "Max length can be 50 characteres")
    .required("Field is required"),
  streetAddress: Yup.string()
    .required("Field is required")
    .max(200, "Max length can be 200 characteres"),
  city: Yup.string().required("Field is required"),
  state: Yup.string().required("Field is required"),
  pincode: Yup.number().required("Field is required"),
  saveAddressAs: Yup.string(),
  saveAddress: Yup.bool(),
  shipping_address_id: Yup.string()
});

export const ContactShippingForm: React.FC<Props> = ({
  submitBtnRef = null,
  onSubmit,
  initialValue,
}) => {
  const { user } = useSelector((state) => (state as any).user);
  const userHasSavedAddresses = useMemo(() => {
    if (user) return !isShippingMetaEmpty(user)
    return null
  }, [user])
  const [showAddressForm, setShowAddressForm] = useState(!userHasSavedAddresses)

  return (
    <div>
      <Formik
        initialValues={
          initialValue || {
            email: user ? (user as any).email : "",
            contactNo: "",
            firstName: user ? (user as any).first_name : "",
            lastName: user ? (user as any).last_name : "",
            flatAddress: "",
            streetAddress: "",
            city: "",
            state: "",
            pincode: "",
            saveAddressAs: "",
            saveAddress: false,
            shipping_address_id: ''
          }
        }
        validationSchema={shippingAddressSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <ContactForm />
          {userHasSavedAddresses && !showAddressForm ?
            <>
              <AddressList onSelect={() => setShowAddressForm(true)} />
              <div className="mt-8">
                <button onClick={() => setShowAddressForm(true)} className="uppercase btn px-8 py-3">Add New Addresss</button>
              </div>
            </>
            : <>
              <ShippingForm />
              <button className="btn py-2 mt-4 px-12 text-sm no-outline uppercase" onClick={(e) => {
                e.preventDefault()
                setShowAddressForm(false)
              }}>
                Use Saved Address
              </button>
            </>}
          <div className="mt-4">
            <button type="submit" className="hidden" ref={submitBtnRef}>
              submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

