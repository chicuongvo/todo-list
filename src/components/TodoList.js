import { useState, useRef, useEffect, useContext } from "react";
import { TaskContext } from "../App";

import EditIcon from "../assets/EditIcon";
import DoneIcon from "../assets/DoneIcon";
import DeleteIcon from "../assets/DeleteIcon";

export default function TodoList() {
  const { tasks } = useContext(TaskContext);

  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TaskItem key={task.id} {...task}></TaskItem>
      ))}
    </ul>
  );
}

function TaskItem({ id, desc, isDone }) {
  const { onMarkTask, onDeleteTask, onEditTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(desc);
  const inputEl = useRef(null);

  useEffect(
    function () {
      if (isEditing) inputEl.current.focus();
    },
    [isEditing]
  );

  const handleSubmit = e => {
    e.preventDefault();
    setIsEditing(false);
    onEditTask({ desc: task, id, isDone });
  };

  const handleEditClick = () => {
    setIsEditing(prev => !prev);
  };

  const handleDoneClick = () => {
    setIsEditing(false);
    onEditTask({ desc: task, id, isDone });
  };

  return (
    <li className={`task ${isDone ? "task--done" : ""}`}>
      <div className="radio" onClick={() => onMarkTask(id)}></div>
      {isEditing ? (
        <>
          <form className="task-form" value={task} onSubmit={handleSubmit}>
            <input
              className="task-input"
              type="text"
              value={task}
              onChange={e => setTask(e.target.value)}
              ref={inputEl}
            />
          </form>
          <DoneIcon onClick={handleDoneClick} />
        </>
      ) : (
        <>
          <p>{desc}</p>
          <EditIcon onClick={handleEditClick} />
        </>
      )}
      <DeleteIcon onClick={() => onDeleteTask(id)} />
    </li>
  );
}
