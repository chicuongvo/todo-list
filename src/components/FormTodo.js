import { useState, forwardRef, useContext } from "react";
import { TaskContext } from "../App";

const FormTodo = forwardRef((_, ref) => {
  const [task, setTask] = useState("");
  const { onAddTask } = useContext(TaskContext);

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
      />
      <button>+</button>
    </form>
  );
});

export default FormTodo;
