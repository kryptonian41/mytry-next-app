import React, { useCallback } from "react";
import { useTheme } from "utils/color-map";
import { InputField } from "./InputField";
import clsx from "clsx";
import checkoutStyles from "./checkout.module.scss";
import { useFormikContext } from "formik";
import { ContactShippingData } from "types/commons";

export const ShippingForm = () => {
  const theme = useTheme();
  const { values } = useFormikContext<ContactShippingData>()

  return <>
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
          type: "text",
          name: "firstName",
          placeholder: "First Name",
        }}
        errorProps={{ component: "div", name: "firstName" }} />
      <InputField
        fieldProps={{
          type: "text",
          name: "lastName",
          placeholder: "Last Name",
        }}
        errorProps={{ component: "div", name: "lastName" }} />
      <InputField
        fieldProps={{
          type: "text",
          name: "flatAddress",
          placeholder: "Flat/Apt/Locality",
        }}
        errorProps={{ component: "div", name: "flatAddress" }}
        containerProps={{
          className: "col-span-2",
        }} />
      <InputField
        fieldProps={{
          type: "text",
          name: "streetAddress",
          placeholder: "Street Address",
        }}
        errorProps={{ component: "div", name: "streetAddress" }}
        containerProps={{
          className: "col-span-2",
        }} />
      <InputField
        fieldProps={{ type: "text", name: "city", placeholder: "City" }}
        errorProps={{ component: "div", name: "city" }} />
      <InputField
        fieldProps={{ type: "text", name: "state", placeholder: "State" }}
        errorProps={{ component: "div", name: "state" }} />
      <InputField
        fieldProps={{
          type: "number",
          name: "pincode",
          placeholder: "Pincode",
        }}
        errorProps={{ component: "div", name: "pincode" }} />
      {values.saveAddress && <InputField
        fieldProps={{
          type: "text",
          name: "saveAddressAs",
          placeholder: "Save Address As",
        }}
        errorProps={{ component: "div", name: "pincode" }} />}
      <div className="col-span-2">
        <SaveForLaterBtn />
      </div>
    </div>
  </>;
};



export const SaveForLaterBtn = () => {
  const theme = useTheme()
  const { values, setFieldValue } = useFormikContext<ContactShippingData>()

  const handleClick = useCallback((e) => {
    e.preventDefault()
    setFieldValue('saveAddress', !values.saveAddress, false)
  }, [setFieldValue, values])

  return <button
    className={clsx('py-2 px-20 text-sm no-outline', checkoutStyles['saveForLaterBtn'])}
    onClick={handleClick}
    style={{
      backgroundColor: theme.orange,
      color: theme.yellow,
      borderRadius: 50
    }}
  >
    <span
      className={clsx(checkoutStyles['radio'], {
        [checkoutStyles['selected']]: values.saveAddress
      })}
      style={{
        borderColor: theme.yellow
      }}
    ></span>
    SAVE FOR LATER
  </button>
}