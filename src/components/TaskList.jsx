// import React from "react";

// function TaskList({ tasks, setTasks }) {
//   const toggleTask = (id) => {
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, done: !task.done } : task
//       )
//     );
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter((task) => task.id !== id));
//   };

//   return (
//     <ul className="task-list">
//       {tasks.map((task) => (
//         <li key={task.id} className={task.done ? "done" : ""}>
//           <span onClick={() => toggleTask(task.id)}>{task.text}</span>
//           <button onClick={() => deleteTask(task.id)}>❌</button>
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default TaskList;
import React, { useState } from "react";

function TaskList({ tasks, setTasks }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id, field, value) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, [field]: value } : task
    ));
  };

  const filteredTasks = tasks
    .filter(task =>
      filter === "completed" ? task.completed :
      filter === "uncompleted" ? !task.completed : true
    )
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="task-list">
      <div className="task-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>

      {filteredTasks.map(task => (
        <div key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
          <input
            type="text"
            value={task.title}
            onChange={(e) => updateTask(task.id, "title", e.target.value)}
          />
          <textarea
            value={task.description}
            onChange={(e) => updateTask(task.id, "description", e.target.value)}
          />
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => updateTask(task.id, "dueDate", e.target.value)}
          />
          <button onClick={() => toggleCompletion(task.id)}>
            {task.completed ? "Mark Incomplete" : "Complete"}
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
