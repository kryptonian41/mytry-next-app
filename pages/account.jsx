import { useEffect } from "react";
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
    <div>
      <Navbar /> {user && <p>Hello, {user.name}</p>}
    </div>
  );
};

export default account;
