import HamburgerIcon from "assets/svgs/icons/hamburger.svg";
import HamburgerCross from "assets/svgs/icons/hamburger-cross.svg";
import MyTryLogo from "assets/svgs/logos/main.svg";
import clsx from "clsx";
import Link from "next/link";
import { useCallback, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { LOGOUT_USER } from "redux-utils/actions/types";
import styles from "./style.module.scss";
import router from "next/router";

interface Props {
  color?: string;
  itemsCount: number;
  className?: string;
  isAuthenticated: boolean;
  bgColor?: string;
}

const Navbar: React.FC<Props> = ({
  color = "dark",
  itemsCount,
  className,
  isAuthenticated,
  bgColor = null,
}) => {

  const [showNavMenu, setShowNavMenu] = useState(false);

  const handleHamburgerClick = useCallback(() => {
    setShowNavMenu((prev) => !prev);
  }, []);


  const dispatach = useDispatch();

  return (
    <div
      style={{ height: "4rem" }}
      className={clsx(
        styles["navbar"],
        "py-6 px-8 flex items-start justify-between",
        {
          "text-white": color === "light",
          "text-green-900": color === "dark",
        },
        className
      )}
    >
      <div className="space-x-6 flex items-center flex-wrap">
        <div className="cursor-pointer relative">
          <button className={clsx(styles.hamburger, 'no-outline')} onClick={handleHamburgerClick}>
            {showNavMenu ? <HamburgerCross /> : <HamburgerIcon />}
          </button>
          {showNavMenu && (
            <ul
              className="absolute space-y-2 pt-4 z-10"
              style={
                color === "dark"
                  ? {
                    backgroundColor: "transparent",
                    padding: "1rem",
                    color: "#034a38",
                  }
                  : {
                    backgroundColor: bgColor || "#034a38",
                    padding: "1rem",
                    color: "#fff",
                  }
              }
            >
              <li className="whitespace-nowrap">
                <Link href="/products">Products</Link>
              </li>
              <li className="whitespace-nowrap">
                <Link href="/about">About Us</Link>
              </li>
              <li className="whitespace-nowrap">
                <Link href="/contact">Contact Us</Link>
              </li>
              {isAuthenticated && (
                <li className="whitespace-nowrap">
                  <span onClick={() => router.push('/account')}>
                    My Account
                  </span>
                </li>
              )}
              {isAuthenticated && (
                <li className="whitespace-nowrap">
                  <span onClick={() => dispatach({ type: LOGOUT_USER })}>
                    Logout
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>
        <Link href="/cart">
          <a>
            <span suppressHydrationWarning={true}>Cart ({itemsCount})</span>
          </a>
        </Link>
        {!isAuthenticated && <Link href="/login">Log In</Link>}
        {/* {!mobileView && (
          <>
            <Link href="/products">Products</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            {isAuthenticated ? (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => dispatach({ type: LOGOUT_USER })}
              >
                Logout
              </span>
            ) : (
              <Link href="/login">Log In</Link>
            )}
          </>
        )} */}
      </div>

      <Link href="/">
        <a className={styles.mytryLogo}>
          <MyTryLogo />
        </a>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  itemsCount: state.cart.itemsCount,
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
