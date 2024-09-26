import FormTodo from "./components/FormTodo";
import Header from "./components/Header";
import Nav from "./components/Nav";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) ?? []
  );

  useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    [tasks]
  );

  const handleAddTask = task => {
    setTasks(prev => [...prev, task]);
  };

  const handleMarkTask = id => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(newTasks);
  };

  const handleDeleteTask = id => {
    const newTasks = [...tasks];
    const idx = newTasks.findIndex(task => task.id === id);
    newTasks.splice(idx, 1);
    setTasks(newTasks);
  };

  return (
    <div className="wrapper">
      <Nav></Nav>
      <main>
        <Header tasks={tasks}></Header>
        <FormTodo onAddTask={handleAddTask}></FormTodo>
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
