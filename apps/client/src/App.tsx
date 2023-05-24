import { useEffect, useState } from "react";
import "./App.css";
import {
  fetchEmotionalTasks,
  fetchPhysicalTasks,
  fetchSeniors,
} from "./lib/apiClient";
import TasksList from "./components/TasksList";
import Navbar from "./components/Pages/NavBar";
import Volunteer from "./components/Pages/Volunteer";
import SplashPage from "./components/Pages/SplashPage";
import { EmotionalTask, PhysicalTask } from "./types";

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
    </>
  );
}

export default App;
