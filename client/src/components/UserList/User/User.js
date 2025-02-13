import React, { useContext, useState } from "react";
import AppContext from "../../../state/AppContext";
const User = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingPassword, setEditingPassword] = useState("");
  const [editingType, setEditingType] = useState("");
  const globalState = useContext(AppContext);
  return (
    <tr>
      {isEditing ? (
        <>
          <td>{user.email}</td>

          <td>
            <input
              type="text"
              value={editingPassword}
              onChange={(e) => setEditingPassword(e.target.value)}
            />
          </td>

          <td>
            <input
              type="text"
              value={editingType}
              onChange={(e) => setEditingType(e.target.value)}
            />
          </td>
          <td>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            <button
              onClick={() => {
                globalState.user.updateOne({
                  id: editingUserId,
                  email: user.email,
                  password: editingPassword,
                  type: editingType,
                });
                setIsEditing(false);
              }}
            >
              Save
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{user.email}</td>
          <td>{user.passwordHash}</td>
          <td>{user.type}</td>
          <td>
            <button
              onClick={() => {
                setIsEditing(true);
                setEditingUserId(user.id);
                setEditingPassword(user.passwordHash);
                setEditingType(user.type);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this user?")
                ) {
                  globalState.user.deleteOne(user.id);
                }
              }}
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default User;
