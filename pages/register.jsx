import { useEffect } from "react";
import Layout from "../components/Layout";
import Register from "components/Register";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const register = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return (
    <Layout>
      <Register />
    </Layout>
  );
};

export default register;
