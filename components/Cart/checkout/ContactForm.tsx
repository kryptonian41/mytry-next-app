import React from "react";
import { useTheme } from "utils/color-map";
import { InputField } from "./InputField";

export const ContactForm = () => {
  const theme = useTheme();
  return <>
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
          type: "email",
          name: "email",
          placeholder: "e-mail",
        }}
        errorProps={{ component: "div", name: "email" }} />
      <InputField
        fieldProps={{
          type: "tel",
          name: "contactNo",
          placeholder: "Contact No.",
        }}
        errorProps={{ component: "div", name: "contactNo" }} />
    </div>
  </>;
};
