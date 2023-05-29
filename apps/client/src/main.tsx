import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import React from 'react'
import Users from './components/Pages/Users.tsx'
import Volunteer from './components/Pages/Volunteer.tsx'
import ApplyToTask from './components/Pages/ApplyToTask.tsx'

import AppliedToTask from './components/Pages/AppliedToTask.tsx'
import SplashPage from './components/Pages/SplashPage.tsx'
import SignUp from './components/Pages/SignUp.tsx'

import Senior from './components/Pages/Senior.tsx'
import { UserContextProvider } from './lib/userContext.tsx'
import TaskCreated from './components/Pages/TaskCreated.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  // {
  //   path: '/home',
  //   element: <Home />,
  // },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/volunteer',
    element: <Volunteer />,
  },
  {
    path: '/tasks/:id',
    element: <ApplyToTask />,
  },
  {
    path: '/register',
    element: <SignUp />,
  },

  {
    path: '/login',
    element: <SplashPage />,
  },

  {
    path: '/senior',
    element: <Senior />,
  },
  {
    path: '/tasks/:id/response',
    element: <AppliedToTask />,
  },

  {
    path: '/senior/taskrequested',
    element: <TaskCreated />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
)
