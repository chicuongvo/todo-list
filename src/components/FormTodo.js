import { useState } from "react";

export default function FormTodo({ onAddTask }) {
  const [task, setTask] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newTask = { desc: task, id, isDone: false };
    onAddTask(newTask);
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        placeholder="Enter your task"
        onChange={e => setTask(e.target.value)}
      ></input>
      <button>+</button>
    </form>
  );
}
