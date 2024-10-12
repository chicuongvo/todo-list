import { type } from "@testing-library/user-event/dist/type";
import FormTodo from "./components/FormTodo";
import Header from "./components/Header";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
import { useEffect, useState, useRef, useReducer } from "react";

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
      inputEl.current.focus();
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
        ></TodoList>
      </main>
    </div>
  );
}

export default App;
