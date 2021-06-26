import { useEffect } from "react";
import Register from "components/Register";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const register = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return <Register />;
};

export default register;
