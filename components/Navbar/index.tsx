import HamburgerIcon from "assets/svgs/icons/hamburger.svg";
import MyTryLogo from "assets/svgs/logos/main.svg";
import styles from "./style.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { connect } from "react-redux";

interface Props {
  color?: string;
  itemsCount: number;
}

const numberofItemsInCart = 0;

const Navbar: React.FC<Props> = ({ color = "dark", itemsCount }) => {
  return (
    <div
      className={clsx("p-4 px-8 flex items-start space-x-4 justify-between", {
        "text-white": color === "light",
        "text-green-900": color === "dark",
      })}
    >
      <div className="space-x-6 flex items-center">
        <HamburgerIcon />
        <Link href="/cart">
          <a>
            <span>Cart ({itemsCount})</span>
          </a>
        </Link>
        <span>Account</span>
        <Link href="/products">Products</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/register">Register</Link>
      </div>

      <div>
        <Link href="/">
          <MyTryLogo className={clsx(styles["mytry-logo"], "cursor-pointer")} />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  itemsCount: state.cart.itemsCount,
});

export default connect(mapStateToProps)(Navbar);
