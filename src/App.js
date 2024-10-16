import FormTodo from "./components/FormTodo";
import Header from "./components/Header";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
import { useEffect, useRef, useReducer } from "react";

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
          ? { ...task, desc: action.payload.desc }
          : task
      );
    default:
      throw new Error("Unknown action");
  }
};

function App() {
  const [tasks, dispatch] = useReducer(
    taskReducer,
    null,
    () => JSON.parse(localStorage.getItem("tasks")) ?? []
  );

  const inputEl = useRef(null);

  useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    [tasks]
  );

  useEffect(
    function () {
      inputEl.current.focus();
    },
    [inputEl]
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

  return (
    <div className="wrapper">
      <Nav></Nav>
      <main>
        <Header tasks={tasks}></Header>
        <FormTodo onAddTask={handleAddTask} ref={inputEl}></FormTodo>
        <TodoList
          tasks={tasks}
          onMarkTask={handleMarkTask}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        ></TodoList>
      </main>
    </div>
  );
}

export default App;
