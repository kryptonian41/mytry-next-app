import * as Yup from 'yup'

export const orderShippingAddressSchema = Yup.object({
  email: Yup.string().email().required('Email is required'),
  contactNo: Yup.number().required('Contact Number is required'),
  firstName: Yup.string().required('Field is required'),
  lastName: Yup.string().required('Field is required'),
  flatAddress: Yup.string()
    .max(50, 'Max length can be 200 characteres')
    .required('Field is required'),
  streetAddress: Yup.string()
    .required('Field is required')
    .max(200, 'Max length can be 200 characteres'),
  city: Yup.string().required('Field is required'),
  state: Yup.string().required('Field is required'),
  pincode: Yup.number().required('Field is required'),
  saveAddressAs: Yup.string(),
})

export type OrderShippingAddressData = Yup.InferType<
  typeof orderShippingAddressSchema
>
