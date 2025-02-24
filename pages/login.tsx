import Login from "components/Login";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppSelector } from "redux-state/hooks";
import Layout from "../components/Layout";

const login = () => {
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const redirectRoute = (router.query.redirect as string) || "/";
    if (user) router.push(redirectRoute);
  }, [user]);

  return (
    <Layout title="Login">
      <Login />
    </Layout>
  );
};

export default login;
