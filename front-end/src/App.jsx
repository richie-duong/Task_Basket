import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import axios from 'axios';
import Layout from './Layout';

import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import AddTaskPage from './pages/AddTaskPage'
import EditTaskPage from './pages/EditTaskPage'
import NotFoundPage from './pages/NotFoundPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [{
    path: '/',
    element: <HomePage />
  }, {
    path: '/dashboard',
    element: <DashboardPage />
  }, {
    path: '/tasks',
    element: <TasksPage />
  }, {
    path: '/add-task',
    element: <AddTaskPage />,
  }, {
    path: '/edit-task/:id',
    element: <EditTaskPage />,
  }, {
    path: '/settings',
    element: <SettingsPage />,
  }, {
    path: '/login',
    element: <LoginPage />,
  }, {
    path: '/register',
    element: <RegisterPage />,
  }]
}]

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App

