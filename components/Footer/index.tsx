import footerStyles from "./footer.module.scss";
import Logo from "assets/svgs/logos/footer-logo.svg";
import Link from "next/link";

const index = () => {
  return (
    <footer>
      <div className={footerStyles.footerContainer}>
        <h3>For daily goodness</h3>
        <form>
          <input type="text" placeholder="EMAIL" />
          <br />
          <button type="submit">subscribe</button>
        </form>
        <div className={footerStyles.logoContainer}>
          <Logo />
        </div>
      </div>
      <div className={footerStyles.linksContainer}>
        <Link href="/terms-and-conditions">Terms & Conditions</Link>
        <span className={footerStyles.linkDivider}>|</span>
        <Link href="/privacy-policy">Privacy Policy</Link>
        <span className={footerStyles.linkDivider}>|</span>
        <Link href="/shipping-policy">Shipping Policy</Link>
        <span className={footerStyles.linkDivider}>|</span>
        <Link href="/returns-and-refund-policy">Returns and Refund</Link>
      </div>
    </footer>
  );
};

export default index;
