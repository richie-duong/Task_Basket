import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import axios from 'axios';
import Layout from './Layout';
import './App.css'

import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import AddTaskPage from './pages/AddTaskPage'
import EditTaskPage from './pages/EditTaskPage'
import NotFoundPage from './pages/NotFoundPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

// Referred to in creating Routes
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
    path: '/edit-task',
    element: <EditTaskPage />,
  }, {
    path: '/settings',
    element: <SettingsPage />,
  }, {
    path: '/login',
    element: <LoginPage />,
  }, {
    path: '/signup',
    element: <SignUpPage />,
  }]
}]

// Create routes
const router = createBrowserRouter(routes);

function App() {
  return (
    // Returns content from router
    <RouterProvider router={router} />
  )
}

export default App

