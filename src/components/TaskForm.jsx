// import React, { useState } from "react";

// function TaskForm({ tasks, setTasks }) {
//   const [task, setTask] = useState("");

//   const addTask = (e) => {
//     e.preventDefault();
//     if (task.trim()) {
//       setTasks([...tasks, { id: Date.now(), text: task, done: false }]);
//       setTask("");
//     }
//   };

//   return (
//     <form onSubmit={addTask} className="task-form">
//       <input
//         placeholder="Add a new task"
//         value={task}
//         onChange={(e) => setTask(e.target.value)}
//       />
//       <button>Add</button>
//     </form>
//   );
// }

// export default TaskForm;
import React, { useState } from "react";

function TaskForm({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
