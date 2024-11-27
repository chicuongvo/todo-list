import { useContext } from "react";
import { TaskContext } from "../App";

import EditIcon from "../assets/EditIcon";
import DeleteIcon from "../assets/DeleteIcon";

export default function TodoList() {
  const { tasks } = useContext(TaskContext);

  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task}></TaskItem>
      ))}
    </ul>
  );
}

function TaskItem({ task }) {
  const { onMarkTask, onDeleteTask, setIsOpenModal, setSelectedTask } =
    useContext(TaskContext);

  const handleEditClick = task => {
    setIsOpenModal(true);
    setSelectedTask(task);
  };

  return (
    <li className={`task ${task.isDone ? "task--done" : ""}`}>
      <div className="radio" onClick={() => onMarkTask(task.id)}></div>
      <p className="task-name">{task.name}</p>
      <p className="deadline">{task.deadline}</p>
      <EditIcon onClick={() => handleEditClick(task)} />
      <DeleteIcon onClick={() => onDeleteTask(task.id)} />
    </li>
  );
}
