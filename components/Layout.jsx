import { useEffect } from "react";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { initializeApp } from "redux-utils/actions/userActions";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const { isInitializing, appInitialized } = useSelector(
    (state) => state.initApp
  );

  useEffect(() => {
    if (!appInitialized) dispatch(initializeApp());
  }, []);

  return <>{isInitializing ? <Loading /> : children}</>;
};

export default Layout;
