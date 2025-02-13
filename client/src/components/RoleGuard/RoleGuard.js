import React from "react";

const RoleGuard = ({ state, children, role }) => {
  if (state !== role) {
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }

  return children;
};

export default RoleGuard;
