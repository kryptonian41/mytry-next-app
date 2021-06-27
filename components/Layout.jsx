import Loading from "./Loading";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return <>{isAuthenticated ? <Loading /> : children}</>;
};

export default Layout;
