import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

import Home from "./components/Pages/Home.tsx";
import Profile from "./components/Pages/Profile.tsx";
import Users from "./components/Pages/Users.tsx";
import Volunteer from "./components/Pages/Volunteer.tsx";
import ApplyToTask from "./components/Pages/ApplyToTask.tsx";
import SplashPage from "./components/Pages/SplashPage.tsx";
import SignUp from "./components/Pages/SignUp.tsx";
import Senior from "./components/Pages/Senior.tsx";
import { UserContextProvider } from "./lib/userContext.tsx";

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
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
