import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import formatDate from "../FormatDate";

import getAuthHeaders from "../utils/getAuthHeaders";


export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();

  async function fetchTasks() {
    try {
      const config = await getAuthHeaders();
      const response = await axios.get(`${import.meta.env.VITE_API_URL}:3000/tasks`, config);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  // COMPLETE TASK
  async function completeTask(taskId) {
    try {
      const config = await getAuthHeaders();
      await axios.put(`${import.meta.env.VITE_API_URL}:3000/complete-task/${taskId}`, 
        {},
        config);

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  // UNDO COMPLETED TASK
  async function uncompleteTask(taskId) {
    try {
      const config = await getAuthHeaders();
      await axios.put(`${import.meta.env.VITE_API_URL}/uncomplete-task/${taskId}`,
        {},
        config);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  }

  function getLocationBadgeClass(location) {
    if (location === "Home") {
      return "bg-primary";
    }

    if (location === "Online") {
      return "bg-success";
    }

    return "bg-secondary";
  }

  // VARIABLE: TODAY'S DATE
  const currentDate = new Date();

  // TASK FILTER: COMPLETED TASKS
  const completedTasks = tasks.filter((task) => {
    return task.taskCompleted === true;
  });

  // TASK FILTER: UPCOMING TASKS
  const upcomingTasks = tasks.filter((task) => {
    return (
      new Date(task.taskDeadline) >= currentDate && task.taskCompleted !== true
    );
  });

  // TASK FILTER: OVERDUE TASKS
  const overdueTasks = tasks.filter((task) => {
    return (
      new Date(task.taskDeadline) < currentDate && task.taskCompleted !== true
    );
  });

  // TASK FILTER: TASKS DUE TODAY
  const tasksDueToday = upcomingTasks.filter((task) => {
    const deadline = new Date(task.taskDeadline);

    return deadline.toDateString() === currentDate.toDateString();
  });

  // TASK FILTER: FUTURE TASKS
  const futureTasks = upcomingTasks.filter((task) => {
    const deadline = new Date(task.taskDeadline);

    return deadline.toDateString() !== currentDate.toDateString();
  });

  // RENDER TASKS TABLE
  function renderTaskTable(taskList, isCompletedSection = false) {
    return (
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: "20%" }}>Deadline</th>
              <th style={{ width: "20%" }}>Start Date</th>
              <th style={{ width: "40%" }}>Task Name</th>
              <th style={{ width: "10%" }}>Location</th>
              <th className="text-end" style={{ width: "10%" }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {taskList.map((task) => (
              <tr
                key={task._id}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedTask(task);
                }}
              >
                <td
                  className={
                    isCompletedSection
                      ? "text-decoration-line-through text-muted"
                      : ""
                  }
                >
                  {formatDate(task.taskDeadline)}
                </td>

                <td
                  className={
                    isCompletedSection
                      ? "text-decoration-line-through text-muted"
                      : ""
                  }
                >
                  {formatDate(task.taskStartDate)}
                </td>

                <td
                  className={
                    isCompletedSection
                      ? "fw-semibold text-decoration-line-through text-muted"
                      : "fw-semibold"
                  }
                >
                  {task.taskName}
                </td>

                <td>
                  <span className={`badge ${getLocationBadgeClass(task.taskLocation)}`}>
                    <i className="bi bi-geo-alt-fill me-1"></i>
                    {task.taskLocation}
                  </span>
                </td>

                <td className="text-end">
                  <div className="d-flex justify-content-end gap-2">
                    {!isCompletedSection ? (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={(event) => {
                            event.stopPropagation();
                            completeTask(task._id);
                          }}
                        >
                          <i className="bi bi-check-lg"></i>
                        </button>

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/edit-task/${task._id}`);
                          }}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={(event) => {
                            event.stopPropagation();
                            uncompleteTask(task._id);
                          }}
                        >
                          <i className="bi bi-arrow-counterclockwise"></i>
                        </button>

                        <button
                          className="btn btn-warning btn-sm"
                          onClick={(event) => {
                            event.stopPropagation();
                            navigate(`/edit-task/${task._id}`);
                          }}
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // RENDER CARD CONTAINERS
  return (
    <>
      <title>Task Basket | My Tasks</title>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">My Tasks</h1>

          <Link to="/add-task" className="btn btn-primary">
            <i className="bi bi-plus-lg me-2"></i>
            Add Task
          </Link>
        </div>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "upcoming" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("upcoming");
              }}
            >
              Upcoming Tasks ({tasksDueToday.length + futureTasks.length})
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "overdue" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("overdue");
              }}
            >
              Overdue Tasks ({overdueTasks.length})
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "completed" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("completed");
              }}
            >
              Completed Tasks ({completedTasks.length})
            </button>
          </li>
        </ul>

        <div className="card shadow-sm">
          <div className="card-body">
            {activeTab === "upcoming" ? (
              <>
                <div className="card border-0 bg-light mb-4">
                  <div className="card-body">
                    <h3 className="mb-3">Due Today</h3>

                    {tasksDueToday.length > 0 ? (
                      renderTaskTable(tasksDueToday)
                    ) : (
                      <p className="text-muted mb-0">
                        You have no tasks due today.
                      </p>
                    )}
                  </div>
                </div>

                <div className="card border-0 bg-light">
                  <div className="card-body">
                    <h3 className="mb-3">Other Upcoming Tasks</h3>

                    {futureTasks.length > 0 ? (
                      renderTaskTable(futureTasks)
                    ) : (
                      <p className="text-muted mb-0">
                        You have no future tasks.
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : null}

            {activeTab === "overdue" ? (
              <div className="card border-0 bg-light">
                <div className="card-body">
                  <h3 className="mb-3">Overdue Tasks</h3>

                  {overdueTasks.length > 0 ? (
                    renderTaskTable(overdueTasks)
                  ) : (
                    <p className="text-muted mb-0">No overdue tasks.</p>
                  )}
                </div>
              </div>
            ) : null}

            {activeTab === "completed" ? (
              <div className="card border-0 bg-light">
                <div className="card-body">
                  <h3 className="mb-3">Completed Tasks</h3>

                  {completedTasks.length > 0 ? (
                    renderTaskTable(completedTasks, true)
                  ) : (
                    <p className="text-muted mb-0">No completed tasks.</p>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {selectedTask ? (
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedTask.taskName}</h5>

                  <button
                    className="btn-close"
                    onClick={() => {
                      setSelectedTask(null);
                    }}
                  />
                </div>

                <div className="modal-body">
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {formatDate(selectedTask.taskDeadline)}
                  </p>

                  <p>
                    <strong>Start Date:</strong>{" "}
                    {formatDate(selectedTask.taskStartDate)}
                  </p>

                  <p>
                    <strong>Location:</strong> {selectedTask.taskLocation}
                  </p>

                  <hr />

                  <p>{selectedTask.taskDescription}</p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setSelectedTask(null);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
