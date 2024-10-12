import { useState, forwardRef } from "react";

const FormTodo = forwardRef(({ onAddTask }, ref) => {
  const [task, setTask] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!task) return;
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
        ref={ref}
      ></input>
      <button>+</button>
    </form>
  );
});

export default FormTodo;
