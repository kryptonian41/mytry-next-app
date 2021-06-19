import Navbar from "components/Navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const account = () => {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  if (!user) router.push("/login");

  return (
    <div>
      <Navbar />
      <h1>Hello, {user?.name}</h1>
    </div>
  );
};

export default account;
