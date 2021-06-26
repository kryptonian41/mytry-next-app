import Navbar from "components/Navbar";
import FormContainer from "./FormContainer";
import LoginForm from "./LoginForm";
import loginStyles from "./login.module.scss";

const index = () => {
  return (
    <div className={loginStyles.loginContainer}>
      <Navbar color="light" />
      <FormContainer form="login" />
      {/* <LoginForm /> */}
    </div>
  );
};

export default index;
