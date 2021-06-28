import React from 'react'
import { useTheme } from 'utils/color-map';
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field, FormikHelpers } from "formik";
import clsx from 'clsx';
import checkoutStyles from './checkout.module.scss'
import { ContactShippingData } from 'types/commons';

interface Props {
  submitBtnRef: React.MutableRefObject<HTMLButtonElement>,
  onSubmit: ((values: ContactShippingData, formikHelpers: FormikHelpers<ContactShippingData>) => void | Promise<any>),
  initialValue?: ContactShippingData
}

const shippingAddressSchema = Yup.object({
  email: Yup.string().email().required('Email is required'),
  contactNo: Yup.number().required('Contact Number is required'),
  firstName: Yup.string()
    .required("Field is required"),
  lastName: Yup.string()
    .required("Field is required"),
  flatAddress: Yup.string()
    .max(50, 'Max length can be 200 characteres')
    .required("Field is required"),
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


export const InputField = ({ fieldProps, errorProps, containerProps = null }) => {
  const theme = useTheme()

  return <div {...containerProps} className={clsx(checkoutStyles.inputFieldWrapper, containerProps?.className)}>
    <Field
      {...fieldProps}
      style={{
        borderColor: theme.green,
        ...fieldProps.style
      }}
      className={clsx("w-full bg-transparent pl-0 border-t-0 border-l-0 border-r-0 border border-b-2 focus:outline-none focus:ring-0", fieldProps.className)}
    />
    <div className="absolute bottom-0 left-0 text-red-900">
      <ErrorMessage
        {...errorProps}
      />
    </div>
  </div>
}

export const ContactShippingForm: React.FC<Props> = ({ submitBtnRef = null, onSubmit, initialValue }) => {
  const theme = useTheme()
  return (
    <div>
      <Formik
        initialValues={initialValue || {
          city: '',
          email: '',
          contactNo: '',
          firstName: '',
          lastName: '',
          flatAddress: '',
          pincode: null,
          saveAddressAs: '',
          state: '',
          streetAddress: ''
        } as ContactShippingData}
        validationSchema={shippingAddressSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <h1 className="text-4xl" style={{
            color: theme.green
          }}>Contact Information</h1>
          <div className="grid grid-cols-2 gap-x-8 mt-8">
            <InputField fieldProps={{ type: 'email', name: 'email', placeholder: 'e-mail' }} errorProps={{ component: 'div', name: 'email' }} />
            <InputField fieldProps={{ type: 'tel', name: 'contactNo', placeholder: 'Contact No.' }} errorProps={{ component: 'div', name: 'contactNo' }} />
          </div>

          <h1 className="text-4xl mt-8" style={{
            color: theme.green
          }}>Shipping Address</h1>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-8">
            <InputField fieldProps={{ type: 'text', name: 'firstName', placeholder: 'First Name' }} errorProps={{ component: 'div', name: 'firstName' }} />
            <InputField
              fieldProps={{ type: 'text', name: 'lastName', placeholder: 'Last Name' }}
              errorProps={{ component: 'div', name: 'lastName' }} /
            >
            <InputField fieldProps={{ type: 'text', name: 'flatAddress', placeholder: 'Flat/Apt/Locality' }} errorProps={{ component: 'div', name: 'flatAddress' }} containerProps={{
              className: 'col-span-2'
            }} />
            <InputField fieldProps={{ type: 'text', name: 'streetAddress', placeholder: 'Street Address' }} errorProps={{ component: 'div', name: 'streetAddress' }} containerProps={{
              className: 'col-span-2'
            }} />
            <InputField fieldProps={{ type: 'text', name: 'city', placeholder: 'City' }} errorProps={{ component: 'div', name: 'city' }} />
            <InputField
              fieldProps={{ type: 'text', name: 'state', placeholder: 'State' }}
              errorProps={{ component: 'div', name: 'state' }} /
            >
            <InputField
              fieldProps={{ type: 'number', name: 'pincode', placeholder: 'Pincode' }}
              errorProps={{ component: 'div', name: 'pincode' }} /
            >
            <button type="submit" className="hidden" ref={submitBtnRef}>submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}


