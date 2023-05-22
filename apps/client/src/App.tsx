import { useEffect, useState } from "react";
import "./App.css";
import NewTaskForm from "./components/NewTaskForm";
import {
  fetchEmotionalTasks,
  fetchPhysicalTasks,
  fetchSeniors,
} from "./lib/apiClient";
import TasksList from "./components/TasksList";
import Navbar from "./components/Navbar/NavBar";
import Volunteer from "./components/Pages/Volunteer";
import SplashPage from "./components/Pages/SplashPage";

function App() {
  const [emotionalTasks, setEmotionalTasks] = useState([]);
  const [physicalTasks, setPhysicalTasks] = useState([]);
  const [seniors, setSeniors] = useState([]);

  const reloadEmotionalTasks = () => {
    fetchEmotionalTasks().then((emotionalTasks) =>
      setEmotionalTasks(emotionalTasks)
    );
  };
  const reloadPhysicalTasks = () => {
    fetchPhysicalTasks().then((physicalTasks) =>
      setPhysicalTasks(physicalTasks)
    );
  };
  const reloadSeniors = () => {
    fetchSeniors().then((seniors) => setSeniors(seniors));
  };
  useEffect(() => {
    reloadEmotionalTasks();
    reloadPhysicalTasks();
    reloadSeniors();
  }, []);

  return (
    <>
      <Navbar />
      <SplashPage />
      {/* <Volunteer /> */}
      {/* <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <div className="bg-white rounded-lg" >
          <NewTaskForm onEmotionalTaskCreated={() => reloadEmotionalTasks()}
            onPhysicalTaskCreated={() => reloadPhysicalTasks()}
          />
        </div>
        <div>
          <TasksList emotionalTasks={emotionalTasks} physicalTasks={physicalTasks} seniors={seniors} />
        </div>
      </div> */}
    </>
  );
}

export default App;
