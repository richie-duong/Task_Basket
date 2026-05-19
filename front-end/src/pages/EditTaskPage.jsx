import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import getAuthHeaders from "../utils/getAuthHeaders";


export default function EditTaskPage() {
  const { id } = useParams();

  const [taskName, setTaskName] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskLocation, setTaskLocation] = useState("");
  const [locationName, setLocationName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTask() {

      const config = await getAuthHeaders();

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/edit-task/${id}`, 
          config
        );

        const task = response.data;

        setTaskName(task.taskName || "");
        setTaskStartDate(task.taskStartDate || "");
        setTaskDeadline(task.taskDeadline || "");
        setTaskLocation(task.taskLocation || "");
        setTaskDescription(task.taskDescription || "");
      } catch (error) {
        console.log(error);
      }
    }

    fetchTask();
  }, [id]);

  async function updateTask() {
    
    const config = await getAuthHeaders();

    if (taskLocation === "Other" && !locationName) {
      alert("Please enter a location name.");

      return;
    }

    const updatedTask = {
      taskName,
      taskStartDate,
      taskDeadline,
      taskLocation: taskLocation === "Other" ? locationName : taskLocation,
      taskDescription,
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/edit-task/${id}`, updatedTask, config);

      alert("Task updated successfully!");

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const config = await getAuthHeaders();
      await axios.delete(`${import.meta.env.VITE_API_URL}/edit-task/${id}`, config);
      alert("Task deleted successfully!");

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <title>Task Basket | Edit Task</title>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body p-4">
                <button
                  className="btn btn-outline-secondary mb-3"
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  ← Back
                </button>

                <h1 className="mb-4 text-center">Edit Task</h1>

                <div className="mb-3">
                  <label className="form-label">Task Name</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={(event) => {
                      setTaskName(event.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Start Date</label>

                  <input
                    type="datetime-local"
                    className="form-control"
                    value={taskStartDate}
                    onChange={(event) => {
                      setTaskStartDate(event.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Deadline</label>

                  <input
                    type="datetime-local"
                    className="form-control"
                    value={taskDeadline}
                    onChange={(event) => {
                      setTaskDeadline(event.target.value);
                    }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Task Location</label>

                  <select
                    className="form-select"
                    value={taskLocation}
                    onChange={(event) => {
                      setTaskLocation(event.target.value);
                    }}
                  >
                    <option value="" disabled hidden>
                      Select your task location
                    </option>

                    <option value="Home">Home</option>

                    <option value="Online">Online</option>

                    <option value="Other">Other</option>
                  </select>
                </div>

                {taskLocation === "Other" && (
                  <div className="mb-3">
                    <label className="form-label">Custom Location</label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter location name"
                      value={locationName}
                      onChange={(event) => {
                        setLocationName(event.target.value);
                      }}
                    />
                  </div>
                )}

                <div className="mb-4">
                  <label className="form-label">Description</label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter task description"
                    value={taskDescription}
                    onChange={(event) => {
                      setTaskDescription(event.target.value);
                    }}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    className="btn btn-primary w-100"
                    onClick={updateTask}
                  >
                    Save Changes
                  </button>

                  <button className="btn btn-danger w-100" onClick={deleteTask}>
                    Delete Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
