import React from 'react'
import { useTheme } from 'utils/color-map';
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import clsx from 'clsx';
import checkoutStyles from './checkout.module.scss'

interface Props {

}

const shippingAddressSchema = Yup.object({
  firstName: Yup.string()
    .required("Field is required"),
  lastName: Yup.string()
    .required("Field is required"),
  flatAddress: Yup.string()
    .required("Field is required").max(50, 'Max length can be 200 characteres'),
  streetAddress: Yup.string()
    .required("Field is required").max(200, 'Max length can be 200 characteres'),
  city: Yup.string()
    .required("Field is required"),
  state: Yup.string()
    .required("Field is required"),
  pincode: Yup.number()
    .required("Field is required"),
  saveAddressAs: Yup.string()
});

export const ShippingForm = (props: Props) => {
  const theme = useTheme()
  return (
    <div>
      <h1 className="text-4xl" style={{
        color: theme.green
      }}>Shipping Address</h1>

      <div className="grid grid-cols-2 gap-x-8 gap-y-8 mt-8">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={shippingAddressSchema}
          onSubmit={({ email, password }, { setSubmitting, resetForm }) => {

          }}
        >
          <>
            <InputField fieldProps={{ type: 'text', name: 'firstName', placeHolder: 'First Name' }} errorProps={{ component: 'div', name: 'firstName' }} />
            <InputField
              fieldProps={{ type: 'text', name: 'lastName', placeHolder: 'Last Name' }}
              errorProps={{ component: 'div', name: 'lastName' }} /
            >
            <InputField fieldProps={{ type: 'text', name: 'flatAddress', placeHolder: 'Flat/Apt/Locality' }} errorProps={{ component: 'div', name: 'flatAddress' }} containerProps={{
              className: 'col-span-2'
            }} />
            <InputField fieldProps={{ type: 'text', name: 'streetAddress', placeHolder: 'Street Address' }} errorProps={{ component: 'div', name: 'streetAddress' }} containerProps={{
              className: 'col-span-2'
            }} />
            <InputField fieldProps={{ type: 'text', name: 'city', placeHolder: 'City' }} errorProps={{ component: 'div', name: 'city' }} />
            <InputField
              fieldProps={{ type: 'text', name: 'state', placeHolder: 'State' }}
              errorProps={{ component: 'div', name: 'state' }} /
            >
            <InputField
              fieldProps={{ type: 'number', name: 'pincode', placeHolder: 'Pincode' }}
              errorProps={{ component: 'div', name: 'pincode' }} /
            >
          </>
        </Formik>
      </div>
    </div>
  )
}


const InputField = ({ fieldProps, errorProps, containerProps = null }) => {
  const theme = useTheme()

  return <div {...containerProps} className={clsx(checkoutStyles.inputFieldWrapper, containerProps?.className)}>
    <Field
      {...fieldProps}
      style={{
        borderColor: theme.green,
        ...fieldProps.style
      }}
      className={clsx("w-full bg-transparent pl-0 border-t-0 border-l-0 border-r-0 border border-b-2", fieldProps.className)}
    />
    <div className="absolute bottom-0 left-0 text-red-900">
      <ErrorMessage
        {...errorProps}
      />
    </div>
  </div>
}