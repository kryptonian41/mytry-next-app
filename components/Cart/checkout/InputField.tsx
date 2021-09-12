import React from "react";
import { useTheme } from "utils/color-map";
import { ErrorMessage, Field } from "formik";
import clsx from "clsx";
import checkoutStyles from "./checkout.module.scss";

interface InputFieldProps {
  fieldProps?: any,
  containerProps?: any,
  errorProps?: any,
}

export const InputField: React.FC<InputFieldProps> = ({
  fieldProps = {}, errorProps = {}, containerProps = {},
}) => {
  const theme = useTheme();
  return (
    <div
      {...containerProps}
      className={clsx(
        checkoutStyles.inputFieldWrapper,
        containerProps?.className
      )}
    >
      <Field
        {...fieldProps}
        style={{
          borderColor: theme.green,
          ...fieldProps.style,
        }}
        className={clsx(
          "w-full bg-transparent pl-0 border-t-0 border-l-0 border-r-0 border border-b-2 focus:outline-none focus:ring-0",
          fieldProps.className
        )} />
      <div className="absolute bottom-0 left-0 text-red-900">
        <ErrorMessage {...errorProps} />
      </div>
    </div>
  );
};
