import HamburgerIcon from "assets/svgs/icons/hamburger.svg";
import MyTryLogo from "assets/svgs/logos/main.svg";
import styles from "./style.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { connect } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";

interface Props {
  color?: string;
  itemsCount: number;
  className?: string;
}

const Navbar: React.FC<Props> = ({ color = "dark", itemsCount, className }) => {
  const [mobileView, setMobileView] = useState(() => {
    if (typeof window !== "undefined")
      return window.matchMedia("(max-width: 640px)").matches;
    return null;
  });
  const mobileViewRef = useRef(mobileView);
  const [showNavMenu, setShowNavMenu] = useState(false);

  const handleHamburgerClick = useCallback(() => {
    setShowNavMenu((prev) => !prev);
  }, []);

  useLayoutEffect(() => {
    window
      .matchMedia("(max-width: 640px)")
      .addEventListener("change", ({ matches }) => {
        if (matches === mobileViewRef.current) return;
        mobileViewRef.current = matches;
        setMobileView(matches);
      });
  }, []);

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
          {mobileView && showNavMenu && (
            <ul className="absolute space-y-2 pt-4 z-10">
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
                <Link href="/login">Log In</Link>
              </li>
              <li className="whitespace-nowrap">
                <Link href="/register">Register</Link>
              </li>
            </ul>
          )}
        </div>
        <Link href="/cart">
          <a>
            <span>Cart ({itemsCount})</span>
          </a>
        </Link>
        <Link href="/account">Account</Link>
        {!mobileView && (
          <>
            <Link href="/products">Products</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/login">Log In</Link>
            <Link href="/register">Register</Link>
          </>
        )}
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
});

export default connect(mapStateToProps)(Navbar);
