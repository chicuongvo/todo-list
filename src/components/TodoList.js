import { useContext, useState } from "react";
import { TaskContext } from "../App";

import EditIcon from "../assets/EditIcon";
import DeleteIcon from "../assets/DeleteIcon";

function sortTasks(tasks, sortBy) {
  console.log(tasks, sortBy);
  return [...tasks].sort((a, b) => {
    const parseDate = dateStr => {
      const [time, dayMonthYear] = dateStr.split(" ");
      const [day, month, year] = dayMonthYear.split("/");
      return new Date(`${year}-${month}-${day}T${time}:00`);
    };

    const dateA = parseDate(a.deadline);
    const dateB = parseDate(b.deadline);
    if (sortBy === "date") {
      return dateB - dateA;
    }

    if (sortBy === "isDone") {
      if (a.isDone === b.isDone) return dateB - dateA;
      return a.isDone - b.isDone;
    }

    if (sortBy === "default") {
      return 0;
    }

    return 0;
  });
}

export default function TodoList() {
  const { tasks } = useContext(TaskContext);
  const [sortBy, setSortBy] = useState("default");

  const displayTasks = sortTasks(tasks, sortBy);

  // useEffect(() => {
  //   sortedTask = sortTasks(tasks, sortBy);
  // })

  return (
    <div>
      <div className="sort-option">
        <label>Sort by:</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="isDone">Status</option>
          <option value="date">Date</option>
        </select>
      </div>
      <ul className="todo-list">
        {displayTasks.map(task => (
          <TaskItem key={task.id} task={task}></TaskItem>
        ))}
      </ul>
    </div>
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
