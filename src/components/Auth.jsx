import React, { useState } from "react";

function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isSignup) {
      if (users.find((u) => u.username === username)) {
        setError("User already exists!");
        return;
      }
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", username);
      onLogin(username);
    } else {
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      if (user) {
        localStorage.setItem("user", username);
        onLogin(username);
      } else {
        setError("Invalid credentials!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      <p style={{ marginTop: "1rem" }}>
        {isSignup ? "Already have an account?" : "New here?"}
        <button
          type="button"
          onClick={toggleMode}
          style={{ marginLeft: "0.5rem" }}
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </form>
  );
}

export default Auth;
