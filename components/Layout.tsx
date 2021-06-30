import { useEffect, useLayoutEffect } from "react";
import Header from "./Header";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { initializeApp } from "redux-utils/actions/userActions";

const Layout = ({ children, title = null, description = null, keywords = null }) => {
  const dispatch = useDispatch();
  const { isInitializing, appInitialized } = useSelector(
    (state) => (state as any).initApp
  );

  useEffect(() => {
    if (!appInitialized) dispatch(initializeApp());
  }, []);


  return (
    <>
      {isInitializing &&
        <Loading />
      }
      <Header title={title} description={description} keywords={keywords} />
      {children}
    </>
  );
};

export default Layout;
