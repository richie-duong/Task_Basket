import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import getAuthHeaders from "../utils/getAuthHeaders";

export default function AddTaskPage() {
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskLocation, setTaskLocation] = useState("");
  const [locationName, setLocationName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const navigate = useNavigate();

  async function addTask() {
    if (taskLocation === "Other" && !locationName) {
      alert("Please enter a location name.");
      return;
    }

    const taskData = {
      taskName,
      taskStartDate,
      taskDeadline,
      taskLocation: taskLocation === "Other" ? locationName : taskLocation,
      taskDescription,
    };

    const config = await getAuthHeaders();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-task`,
        taskData,
        config
      );

      console.log(response.data);

      alert("Task added successfully!");

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  function clearForm() {
    setTaskName("");
    setTaskStartDate("");
    setTaskDeadline("");
    setTaskLocation("");
    setLocationName("");
    setTaskDescription("");
  }

  return (
    <>
      <title>Task Basket | Add Task</title>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body p-4">
                <button
                  className="btn btn-outline-secondary mb-3"
                  onClick={() => navigate(-1)}
                >
                  ← Back
                </button>

                <h1 className="mb-4 text-center">Add Task</h1>

                <div className="mb-3">
                  <label htmlFor="task-name" className="form-label">
                    Task Name
                  </label>

                  <input
                    type="text"
                    id="task-name"
                    className="form-control"
                    placeholder="Enter task name"
                    value={taskName}
                    onChange={(event) => setTaskName(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="task-start-date" className="form-label">
                    Start Date / Time
                  </label>

                  <input
                    type="datetime-local"
                    id="task-start-date"
                    className="form-control"
                    value={taskStartDate}
                    onChange={(event) => setTaskStartDate(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="task-deadline" className="form-label">
                    Deadline
                  </label>

                  <input
                    type="datetime-local"
                    id="task-deadline"
                    className="form-control"
                    value={taskDeadline}
                    onChange={(event) => setTaskDeadline(event.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Task Location</label>

                  <select
                    className="form-select"
                    value={taskLocation}
                    onChange={(event) => setTaskLocation(event.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select your task location
                    </option>

                    <option value="Home">Home</option>

                    <option value="Online">Online</option>

                    <option value="Other">Other</option>
                  </select>
                </div>

                {taskLocation === "Other" ? (
                  <div className="mb-3">
                    <label htmlFor="other-task-name" className="form-label">
                      Custom Location
                    </label>

                    <input
                      type="text"
                      id="other-task-name"
                      className="form-control"
                      placeholder="Enter location name"
                      value={locationName}
                      onChange={(event) => setLocationName(event.target.value)}
                    />
                  </div>
                ) : null}

                <div className="mb-4">
                  <label className="form-label">Description</label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter task description"
                    value={taskDescription}
                    onChange={(event) => setTaskDescription(event.target.value)}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button className="btn btn-primary w-100" onClick={addTask}>
                    Submit Task
                  </button>

                  <button
                    className="btn btn-outline-secondary w-100"
                    onClick={clearForm}
                  >
                    Clear
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
