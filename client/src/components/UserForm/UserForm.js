import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../state/AppContext";
const UserForm = () => {
  const globalState = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("regular");
  const navigate = useNavigate();
  useEffect(() => {
    globalState.user.emitter.removeAllListeners("GET_USERS_SUCCESS");
    globalState.user.emitter.addListener("GET_USERS_SUCCESS", () => {
      navigate("/dashboard/users");
    });
  });

  const handleLoginClick = () => {
    console.log(email, password);
    globalState.user.createOne({ email, password, type });
  };
  return (
    <div className="login-form">
      <div className="form-container">
        <h1>Create new user</h1>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="regular">Regular</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleLoginClick}>Create a new user</button>
      </div>
    </div>
  );
};

export default UserForm;
