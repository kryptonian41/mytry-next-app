import { useState } from "react";
import Navbar from "components/Navbar";
import { useDispatch } from "react-redux";
import { registerUser } from "../actions/userActions";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const register = () => {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  if (user) router.push("/account");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { firstName, lastName, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(firstName, lastName, email, password));
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <br />
        <br />
        <input
          style={{ border: "1px solid black", padding: "5px" }}
          type="submit"
          value="Register"
        />
      </form>
    </div>
  );
};

export default register;
