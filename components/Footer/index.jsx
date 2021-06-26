import footerStyles from "./footer.module.scss";
import Logo from "assets/svgs/logos/footer-logo.svg";

const index = () => {
  return (
    <footer className={footerStyles.footerContainer}>
      <h3>For daily goodness</h3>
      <form>
          <input type="text" placeholder="EMAIL" />
          <br />
          <button type="submit">subscribe</button>
      </form>
      <div className={footerStyles.logoContainer}>
        <Logo />
      </div>
    </footer>
  );
};

export default index;
