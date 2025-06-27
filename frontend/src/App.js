import React, { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import TaskFormComponent from "./components/TaskFormComponent";
import { API_BASE_URL } from "./config";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch(API_BASE_URL);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container-lg py-4 mb-5">
      {/* Add a heading here */}
      <h1 className="mb-4 text-center text-primary">Task Manager App</h1>

      <div className="card p-4 shadow-sm">
        <TaskFormComponent refreshTasks={fetchTasks} />
        <TaskList tasks={tasks} refreshTasks={fetchTasks} />

      </div>
    </div>
  );
}

export default App;