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
import SignUp from "./components/Pages/SignUp.tsx";
import {
  fetchEmotionalTasks,
  fetchPhysicalTasks,
  fetchSeniors,
} from "./lib/apiClient.tsx";
import Senior from "./components/Pages/Senior.tsx";

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
    path: "/register",
    element: <SignUp />,
  },

  {
    path: "/login",
    element: <SplashPage />,
  },

  {
    path: "/senior",
    element: <Senior />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
