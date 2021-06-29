import { useEffect, useLayoutEffect } from "react";
import Header from "./Header";
import Loading from "./Loading";
import { useSelector, useDispatch } from "react-redux";
import { initializeApp } from "redux-utils/actions/userActions";

const Layout = ({ children, title, description, keywords }) => {
  const dispatch = useDispatch();
  const { isInitializing, appInitialized } = useSelector(
    (state) => (state as any).initApp
  );
  console.log("🚀 ~ file: Layout.tsx ~ line 10 ~ Layout ~ isInitializing", isInitializing)
  useEffect(() => {
    if (!appInitialized) dispatch(initializeApp());
  }, [appInitialized, dispatch]);


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
