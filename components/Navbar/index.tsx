import HamburgerIcon from "assets/svgs/icons/hamburger.svg";
import MyTryLogo from "assets/svgs/logos/main.svg";
import styles from "./style.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { connect, useDispatch } from "react-redux";
import { LOGOUT_USER } from "redux-utils/actions/types";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";

interface Props {
  color?: string;
  itemsCount: number;
  className?: string;
  isAuthenticated: boolean;
}

const Navbar: React.FC<Props> = ({
  color = "dark",
  itemsCount,
  className,
  isAuthenticated,
}) => {
  // const [mobileView, setMobileView] = useState(() => {
  //   if (typeof window !== "undefined")
  //     return window.matchMedia("(max-width: 640px)").matches;
  //   return null;
  // });
  // const mobileViewRef = useRef(mobileView);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const handleHamburgerClick = useCallback(() => {
    setShowNavMenu((prev) => !prev);
  }, []);

  // useEffect(() => {
  //   window
  //     .matchMedia("(max-width: 640px)")
  //     .addEventListener("change", ({ matches }) => {
  //       if (matches === mobileViewRef.current) return;
  //       mobileViewRef.current = matches;
  //       setMobileView(matches);
  //     });
  // }, []);

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
          <button onClick={handleHamburgerClick}>
            <HamburgerIcon />
          </button>
          {showNavMenu && (
            <ul
              className="absolute space-y-2 pt-4 z-10"
              style={
                color === "dark"
                  ? {
                      backgroundColor: "#fff",
                      padding: "1rem",
                      color: "#034a38",
                    }
                  : {
                      backgroundColor: "#034a38",
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
              <li className="whitespace-nowrap">
                {isAuthenticated && (
                  <span onClick={() => dispatach({ type: LOGOUT_USER })}>
                    Logout
                  </span>
                )}
              </li>
            </ul>
          )}
        </div>
        <Link href="/cart">
          <a>
            <span>Cart ({itemsCount})</span>
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
