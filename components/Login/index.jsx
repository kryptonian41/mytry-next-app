import Navbar from "components/Navbar";
import FormContainer from "./FormContainer";
import loginStyles from "./login.module.scss";

const index = () => {
  return (
    <div className={loginStyles.loginContainer}>
      <Navbar color="light" />
      <FormContainer form="login" />
    </div>
  );
};

export default index;
