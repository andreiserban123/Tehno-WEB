import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../state/AppContext";
import "./UserList.css";
import { useNavigate } from "react-router-dom";
import User from "./User";

const UserList = () => {
  const globalState = useContext(AppContext);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    globalState.user.getAll();
    const subscription = globalState.user.emitter.addListener(
      "GET_USERS_SUCCESS",
      () => {
        setUsers(globalState.user.list);
      }
    );
    return () => {
      console.log("UserList: Unsubscribing from GET_USERS_SUCCESS");
      subscription.remove();
    };
  }, [globalState.user]);

  return (
    <div className="user-list">
      <h1>User List</h1>

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return <User user={user} key={user.id} />;
          })}
        </tbody>
      </table>

      <div className="footer">
        <button onClick={() => navigate(`/dashboard/users/new`)}>
          Create USER
        </button>
      </div>
    </div>
  );
};

export default UserList;
