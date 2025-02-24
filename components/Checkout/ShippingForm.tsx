import { Form, Formik, type FormikConfig } from 'formik'
import type React from 'react'
import { useAppSelector } from 'redux-state/hooks'
import { useTheme } from 'utils/hooks/useTheme'
import { InputField } from 'components/Form/InputField'
import {
  type OrderShippingAddressData,
  orderShippingAddressSchema,
} from 'utils/data-validators/orderShippingAddress'

interface OrderShippingFormProps {
  submitBtnRef: React.MutableRefObject<HTMLButtonElement>
  onSubmit: FormikConfig<OrderShippingAddressData>['onSubmit']
  initialValue?: Partial<OrderShippingAddressData>
}

export const OrderShippingForm: React.FunctionComponent<
  OrderShippingFormProps
> = ({ submitBtnRef = null, onSubmit, initialValue }) => {
  const theme = useTheme()
  const user = useAppSelector((state) => state.auth.user)
  return (
    <div>
      <Formik<OrderShippingAddressData>
        initialValues={{
          city: '',
          email: user ? (user as any).email : '',
          contactNo: 0,
          firstName: user ? (user as any).first_name : '',
          lastName: user ? (user as any).last_name : '',
          flatAddress: '',
          saveAddressAs: '',
          state: '',
          streetAddress: '',
          pincode: 0,
          ...initialValue,
        }}
        validationSchema={orderShippingAddressSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <h1
            className="text-4xl"
            style={{
              color: theme.green,
            }}
          >
            Contact Information
          </h1>
          <div className="grid grid-cols-2 gap-x-8 mt-8">
            <InputField
              fieldProps={{
                type: 'email',
                name: 'email',
                placeholder: 'e-mail',
              }}
            />
            <InputField
              fieldProps={{
                type: 'tel',
                name: 'contactNo',
                placeholder: 'Contact No.',
              }}
            />
          </div>

          <h1
            className="text-4xl mt-8"
            style={{
              color: theme.green,
            }}
          >
            Shipping Address
          </h1>

          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-8">
            <InputField
              fieldProps={{
                type: 'text',
                name: 'firstName',
                placeholder: 'First Name',
              }}
            />
            <InputField
              fieldProps={{
                type: 'text',
                name: 'lastName',
                placeholder: 'Last Name',
              }}
            />
            <InputField
              fieldProps={{
                type: 'text',
                name: 'flatAddress',
                placeholder: 'Flat/Apt/Locality',
              }}
              containerProps={{
                className: 'col-span-2',
              }}
            />
            <InputField
              fieldProps={{
                type: 'text',
                name: 'streetAddress',
                placeholder: 'Street Address',
              }}
              containerProps={{
                className: 'col-span-2',
              }}
            />
            <InputField
              fieldProps={{ type: 'text', name: 'city', placeholder: 'City' }}
            />
            <InputField
              fieldProps={{ type: 'text', name: 'state', placeholder: 'State' }}
            />
            <InputField
              fieldProps={{
                type: 'number',
                name: 'pincode',
                placeholder: 'Pincode',
              }}
            />
            <button type="submit" className="hidden" ref={submitBtnRef} />
          </div>
        </Form>
      </Formik>
    </div>
  )
}
