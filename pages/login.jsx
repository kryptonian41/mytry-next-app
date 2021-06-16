import { useState } from "react";
import Navbar from "components/Navbar";
import { useDispatch } from "react-redux";
import { logIn } from "../actions/userActions";

const login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(logIn(email, password));
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={(e) => onSubmit(e)}>
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
        <input style={{border: '1px solid black', padding: '5px'}} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default login;
