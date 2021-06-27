import Logo from "assets/svgs/logos/loading-logo.svg";
import loadingStyles from "./loading.module.scss";

const index = () => {
  return (
    <div className={loadingStyles.loadingContainer}>
      <Logo />
    </div>
  );
};

export default index;
