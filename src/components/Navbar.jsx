import React from "react";

function Navbar({ user, onLogout, onProfile }) {
  return (
    <div className="navbar">
      <h2>Task Manager</h2>
      <div>
        Welcome, <strong>{user}</strong>!
        <button onClick={onProfile} style={{ margin: "0 1rem" }}>
          Profile
        </button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
