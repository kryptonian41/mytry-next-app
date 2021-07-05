import Login from "components/Login";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

const login = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useLayoutEffect(() => {
    const redirectRoute = router.query.redirect || '/'
    if (user) router.push(redirectRoute);
  }, [user]);

  return (
    <Layout title="Login" description={null} keywords={null}>
      <Login />
    </Layout>
  );
};

export default login;
