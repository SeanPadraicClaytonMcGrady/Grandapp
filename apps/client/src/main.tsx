import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Home from "./components/Pages/Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Profile from "./components/Pages/Profile.tsx";
import Users from "./components/Pages/Users.tsx";
import Volunteer from "./components/Pages/Volunteer.tsx";
import ApplyToTask from "./components/Pages/ApplyToTask.tsx";
import NewTaskForm from "./components/NewTaskForm.tsx";
import TasksList from "./components/TasksList.tsx";
import { EmotionalTask, PhysicalTask } from "./types.ts";
import AppliedToTask from "./components/Pages/AppliedToTask.tsx";
import SplashPage from "./components/Pages/SplashPage.tsx";
import {
  fetchEmotionalTasks,
  fetchPhysicalTasks,
  fetchSeniors,
} from "./lib/apiClient.tsx";

// const [emotionalTasks, setEmotionalTasks] = useState([]);
// const [physicalTasks, setPhysicalTasks] = useState([]);
// const [seniors, setSeniors] = useState([]);

// const reloadEmotionalTasks = () => {
//   fetchEmotionalTasks().then((emotionalTasks) =>
//     setEmotionalTasks(emotionalTasks)
//   );
// };
// const reloadPhysicalTasks = () => {
//   fetchPhysicalTasks().then((physicalTasks) => setPhysicalTasks(physicalTasks));
// };
// const reloadSeniors = () => {
//   fetchSeniors().then((seniors) => setSeniors(seniors));
// };
// useEffect(() => {
//   reloadEmotionalTasks();
//   reloadPhysicalTasks();
//   reloadSeniors();
// }, []);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/volunteer",
    element: <Volunteer />,
  },
  {
    path: "/tasks/:id",
    element: <ApplyToTask />,
  },
  {
    path: "/emotionalTasks",
    element: (
      <NewTaskForm
        onEmotionalTaskCreated={() => {}}
        onPhysicalTaskCreated={() => {}}
      />
    ),
  },
  {
    path: "/tasks/:id/applied",
    element: <AppliedToTask />,
  },
  {
    path: "/login",
    element: <SplashPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
