import LoginForm from "./LoginForm";
import RegisterForm from "../Register/RegisterForm";
import formStyles from "./login.module.scss";

const renderForm = (form) => {
  if (form === "login") return <LoginForm />;
  if (form === "register") return <RegisterForm />;
  return <div />;
};

const FormContainer = ({ form }) => {
  return <div className={formStyles.formContainer}>{renderForm(form)}</div>;
};

export default FormContainer;
