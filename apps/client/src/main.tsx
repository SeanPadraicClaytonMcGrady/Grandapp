import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <RouterProvider router={router} /> */}
    </BrowserRouter>
  </React.StrictMode>
);
