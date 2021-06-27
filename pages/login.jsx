import { useEffect } from "react";
import Login from "components/Login";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const login = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return <Login />;
};

export default login;
