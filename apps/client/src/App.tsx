import { useEffect, useState } from "react";
import "./App.css";
import NewTaskForm from "./components/CreateTask";
import { fetchEmotionalTasks, fetchPhysicalTasks } from "./lib/apiClient";
import TasksList from "./components/TasksList";

function App() {
  const [emotionalTasks, setEmotionalTasks] = useState([])
  const [physicalTasks, setPhysicalTasks] = useState([])

  const reloadEmotionalTasks = () => {
    fetchEmotionalTasks().then((emotionalTasks) => setEmotionalTasks(emotionalTasks))
  }
  const reloadPhysicalTasks = () => {
    fetchPhysicalTasks().then((physicalTasks) => setPhysicalTasks(physicalTasks))
  }
  useEffect(() => {
    reloadEmotionalTasks()
    reloadPhysicalTasks()
  }, [])

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-slate-50" >
        <div className="bg-white rounded-lg" >
          <NewTaskForm onEmotionalTaskCreated={() => reloadEmotionalTasks()}
            onPhysicalTaskCreated={() => reloadPhysicalTasks()}
          />
        </div>
        <div>
          <TasksList emotionalTasks={emotionalTasks} physicalTasks={physicalTasks} />
        </div>
      </div>
    </>
  );
}

export default App;
