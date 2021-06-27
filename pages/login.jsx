import { useEffect } from "react";
import Login from "components/Login";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const login = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <Layout>
      <Login />
    </Layout>
  );
};

export default login;
