import Dropbox from "./components/Dropbox";
import FormTodo from "./components/FormTodo";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Nav from "./components/Nav";
import Stats from "./components/Stats";
import TodoList from "./components/TodoList";
import { useEffect, useReducer, createContext, useState } from "react";

const taskReducer = (tasks, action) => {
  switch (action.type) {
    case "add":
      return [...tasks, action.payload];
    case "mark":
      return tasks.map(task =>
        task.id === action.payload ? { ...task, isDone: !task.isDone } : task
      );
    case "delete":
      return tasks.filter(task => task.id !== action.payload);
    case "edit":
      return tasks.map(task =>
        task.id === action.payload.id
          ? {
              ...task,
              name: action.payload.name,
              desc: action.payload.desc,
              deadline: action.payload.deadline,
            }
          : task
      );
    case "import": {
      const newTasks = action.payload.map(task => {
        return { ...task, id: crypto.randomUUID() };
      });
      return [...tasks, ...newTasks];
    }
    default:
      throw new Error("Unknown action");
  }
};

export const TaskContext = createContext();

function App() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenStats, setIsOpenStats] = useState(false);
  const [isOpenDropbox, setIsOpenDropbox] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, dispatch] = useReducer(
    taskReducer,
    null,
    () => JSON.parse(localStorage.getItem("tasks")) ?? []
  );

  useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    [tasks]
  );

  const handleAddTask = task => {
    dispatch({ type: "add", payload: task });
  };

  const handleMarkTask = id => {
    dispatch({ type: "mark", payload: id });
  };

  const handleDeleteTask = id => {
    dispatch({ type: "delete", payload: id });
  };

  const handleEditTask = task => {
    dispatch({ type: "edit", payload: task });
  };

  const handleImportTasks = tasks => {
    dispatch({ type: "import", payload: tasks });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        onAddTask: handleAddTask,
        onMarkTask: handleMarkTask,
        onDeleteTask: handleDeleteTask,
        onEditTask: handleEditTask,
        onImportTasks: handleImportTasks,
        isOpenModal,
        setIsOpenModal,
        isOpenStats,
        setIsOpenStats,
        selectedTask,
        setSelectedTask,
        isOpenDropbox,
        setIsOpenDropbox,
      }}
    >
      <div className="wrapper">
        <Nav />
        <main>
          <Header />
          <FormTodo />
          <TodoList />
          <Modal />
          <Dropbox />
          <Stats />
        </main>
      </div>
    </TaskContext.Provider>
  );
}

export default App;
