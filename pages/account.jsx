import { useEffect } from "react";
import Layout from "../components/Layout";
import Navbar from "components/Navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const account = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  return (
    <Layout title="Account" description={null} keywords={null}>
      <div>
        <Navbar /> {user && <p>Hello, {user.email}</p>}
      </div>
    </Layout>
  );
};

export default account;
