import React, { useState, useEffect } from "react";

function Profile({ user, setUser, onBack }) {
  const [username, setUsername] = useState(user);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const current = users.find((u) => u.username === user);
    if (current) setPassword(current.password);
  }, [user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === user ? { username, password } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", username);

    setUser(username);
    setMessage("Profile updated!");

    setTimeout(() => {
      onBack();
    }, 1000);
  };

  return (
    <div className="profile">
      <h2>Edit Profile</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleUpdate}>Save</button>
        <button onClick={onBack} style={{ marginLeft: "1rem", background: "#ccc", color: "#333" }}>
          Go Back
        </button>
      </div>
      {message && <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}

export default Profile;
