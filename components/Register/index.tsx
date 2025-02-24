import React from "react";
import Navbar from "components/Navbar";
import FormContainer from "../Login/FormContainer";
import loginStyles from "../Login/login.module.scss";

const index = () => (
  <div className={loginStyles.loginContainer}>
    <Navbar color="light" />
    <FormContainer form="register" />
  </div>
);

export default index;
