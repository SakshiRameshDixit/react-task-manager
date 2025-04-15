import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import Navbar from "./components/NavBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Profile from "./components/Profile";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [tasks, setTasks] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  // Load tasks for logged-in user
  useEffect(() => {
    if (user) {
      const userTasks = localStorage.getItem(`tasks_${user}`);
      setTasks(userTasks ? JSON.parse(userTasks) : []);
    }
  }, [user]);

  // Save tasks for current user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks_${user}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser("");
    setTasks([]);
  };

  if (!user) return <Auth onLogin={setUser} />;

  if (showProfile)
    return <Profile user={user} onBack={() => setShowProfile(false)} />;

  return (
    <div className="app">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onProfile={() => setShowProfile(true)}
      />
      <TaskForm tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
