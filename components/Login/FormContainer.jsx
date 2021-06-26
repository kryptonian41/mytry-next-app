import LoginForm from "./LoginForm";
import formStyles from "./login.module.scss";

const renderForm = (form) => {
  if (form === "login") return <LoginForm />;
  return <div />;
};

const FormContainer = ({ form }) => {
  return <div className={formStyles.formContainer}>{renderForm(form)}</div>;
};

export default FormContainer;
