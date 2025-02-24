import HamburgerCross from "assets/svgs/icons/hamburger-cross.svg";
import HamburgerIcon from "assets/svgs/icons/hamburger.svg";
import MyTryLogo from "assets/svgs/logos/main.svg";
import clsx from "clsx";
import Link from "next/link";
import router from "next/router";
import { useCallback, useState } from "react";
import { connect } from "react-redux";
import { useAppDispatch } from "redux-state/hooks";
import { authSliceActions } from "redux-state/slices/authSlice";
import { RootState } from "redux-state/store";
import { cva } from "class-variance-authority";

const navbarVariants = cva(
  "flex items-center justify-between sm:[&>a]:text-sm text-base uppercase sm:p-4 p-2",
  {
    variants: {
      color: {
        light: "text-white",
        dark: "text-green-900",
      },
    },
  }
);

const navbarButtonVariants = cva(
  "p-2 cursor-pointer no-outline flex items-center justify-center grow-0 focus:outline-none w-[40px] h-[40px]",
  {
    variants: {
      isDark: {
        true: "text-green-900",
      },
    },
  }
);

interface Props {
  color?: "light" | "dark";
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
  bgColor = "#034a38",
}) => {
  const [showNavMenu, setShowNavMenu] = useState(false);

  const handleHamburgerClick = useCallback(() => {
    setShowNavMenu((prev) => !prev);
  }, []);

  const dispatch = useAppDispatch();
  const isDark = color === "dark";

  return (
    <div className={clsx(navbarVariants({ color }), className)}>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <button
            className={clsx(navbarButtonVariants({ isDark }), {
              "bg-white": isDark && showNavMenu,
            })}
            onClick={handleHamburgerClick}
          >
            {showNavMenu ? (
              <HamburgerCross width="100%" />
            ) : (
              <HamburgerIcon width="100%" />
            )}
          </button>
          {showNavMenu && (
            <ul
              className="absolute space-y-2 pt-4 z-10 "
              style={
                color === "dark"
                  ? {
                      backgroundColor: "white",
                      padding: "1rem",
                      color: "#034a38",
                    }
                  : {
                      backgroundColor: bgColor,
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
                  <span onClick={() => router.push("/account")}>
                    My Account
                  </span>
                </li>
              )}
              {isAuthenticated && (
                <li className="whitespace-nowrap">
                  <span onClick={() => dispatch(authSliceActions.logout())}>
                    Logout
                  </span>
                </li>
              )}
            </ul>
          )}
        </div>
        <Link href="/cart">
          <span suppressHydrationWarning={true}>Cart ({itemsCount})</span>
        </Link>
        {!isAuthenticated && <Link href="/login">Log In</Link>}
      </div>

      <Link href="/">
        <MyTryLogo className="w-[50px] h-[50px]" />
      </Link>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  itemsCount: state.cart.itemsCount,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Navbar);
