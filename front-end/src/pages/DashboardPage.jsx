import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import formatDate from "../FormatDate";

import getAuthHeaders from "../utils/getAuthHeaders";
import { useId } from "react";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [weather, setWeather] = useState(null);

  async function fetchTasks() {
    const config = await getAuthHeaders();

    try {
      const response = await axios.get("http://localhost:3000/tasks", config);

      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchWeather() {
    try {
      const config = await getAuthHeaders();
      const response = await axios.get(
        "http://localhost:3000/weather",

        config,
      );

      setWeather(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTasks();
    fetchWeather();
  }, []);

  const currentDate = new Date();

  // COMPLETED TASKS
  const completedTasks = tasks.filter((task) => {
    return task.taskCompleted === true;
  });

  // UPCOMING TASKS
  const upcomingTasks = tasks.filter((task) => {
    return (
      new Date(task.taskDeadline) >= currentDate && task.taskCompleted !== true
    );
  });

  // OVERDUE TASKS
  const overdueTasks = tasks.filter((task) => {
    return (
      new Date(task.taskDeadline) < currentDate && task.taskCompleted !== true
    );
  });

  // TASKS DUE TODAY
  const tasksDueToday = upcomingTasks.filter((task) => {
    const deadline = new Date(task.taskDeadline);

    return deadline.toDateString() === currentDate.toDateString();
  });

  const inProgressTasks = upcomingTasks.filter((task) => {
    const startDate = new Date(task.taskStartDate);
    const deadline = new Date(task.taskDeadline);
    const isDueToday = deadline.toDateString() === currentDate.toDateString();

    return !isDueToday;
  });

  const weatherAlert = weather?.alerts?.alert?.[0];

  // Testing Purposes: Alert Banner
  /*const weatherAlert = {
    headline:
      "Tornado Warning",
    desc:
      "Seek shelter immediately. Outdoor conditions may be dangerous.",
    severity:
      "Severe"
  };*/

  async function completeTask(taskId) {
    try {
      const config = await getAuthHeaders();
      await axios.put(
        `http://localhost:3000/complete-task/${taskId}`,
        {},
        config,
      );

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

  return (
    <>
      <title>Task Basket | Overview</title>

      <div className="container py-4">
        <div className="mb-4">
          <h2 className="fw-bold display-6">Welcome back!</h2>
        </div>

        <div className="card shadow-sm border-0 rounded-4">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-semibold mb-0">
                Today is{" "}
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>

              <div className="d-flex gap-2">
                <Link to="/add-task" className="btn btn-primary btn-sm px-4">
                  <i className="bi bi-plus-lg me-2"></i>
                  Add Task
                </Link>

                <Link to="/tasks" className="btn btn-outline-dark btn-sm px-4">
                  <i className="bi bi-list-task me-2"></i>
                  View All Tasks
                </Link>
              </div>
            </div>

            {weatherAlert ? (
              <div className="alert alert-danger shadow-sm mb-4">
                <div className="d-flex align-items-start gap-3">
                  <i
                    className="bi bi-exclamation-triangle-fill"
                    style={{
                      fontSize: "2rem",
                    }}
                  ></i>

                  <div>
                    <h4 className="fw-bold mb-2">{weatherAlert.headline}</h4>

                    <p className="mb-2">{weatherAlert.desc}</p>

                    <p className="mb-2 fw-semibold">
                      This weather alert may affect your tasks due today.
                      Consider rescheduling outdoor or travel-related
                      activities.
                    </p>

                    <small className="fw-semibold">
                      Severity: {weatherAlert.severity}
                    </small>
                  </div>
                </div>
              </div>
            ) : null}

            {overdueTasks.length > 0 ? (
              <div className="card border-0 bg-warning-subtle border border-warning shadow-sm mb-4">
                <div className="card-body py-4">
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <i className="bi bi-hourglass-split text-warning fs-1"></i>
                      </div>

                      <div>
                        <h4 className="text-warning-emphasis fw-bold mb-1">
                          Overdue Task(s) Alert
                        </h4>

                        <p className="mb-0 text-dark">
                          You currently have{" "}
                          <b>{overdueTasks.length} overdue tasks</b> requiring
                          attention.
                        </p>
                      </div>
                    </div>

                    <div>
                      <Link to="/tasks" className="btn btn-warning">
                        View Overdue Tasks
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="row g-4">
              <div className="col-lg-5">
                <div className="card border-0 bg-light mb-4">
                  <div className="card-body p-4">
                    <h4 className="fw-bold mb-4">Current Weather Forecast</h4>
                    {weather ? (
                      <div className="card shadow-sm border-0 rounded-4 mb-4">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 className="fw-bold mb-1">
                                {weather.location.name}
                              </h4>

                              <p className="text-muted mb-2">
                                {weather.current.condition.text}
                              </p>

                              <h2 className="fw-bold">
                                {weather.current.temp_c}°C
                              </h2>

                              <p className="mb-0 small text-muted">
                                Feels like {weather.current.feelslike_c}°C
                              </p>
                            </div>

                            <div>
                              <img
                                src={weather.current.condition.icon}
                                alt="Weather Icon"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                }}
                              />
                            </div>
                          </div>
                          <p className="mb-0 text-muted py-3">
                            <Link to="/settings">
                              If this location is incorrect, click here.
                            </Link>
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="card border-0 bg-light">
                  <div className="card-body p-4">
                    <h4 className="fw-bold mb-4">Current Traffic</h4>

                    <div
                      className="bg-secondary-subtle rounded-3 mb-3 d-flex justify-content-center align-items-center"
                      style={{
                        height: "75px",
                      }}
                    >
                      <i className="bi bi-sign-turn-right fs-1 text-secondary"></i>
                    </div>

                    <p className="mb-0 text-muted">
                      Traffic integration coming soon!
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="mb-4">
                  <h3 className="fw-bold mb-3">
                    Due Today ({tasksDueToday.length})
                  </h3>

                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      {tasksDueToday.length > 0 ? (
                        tasksDueToday.slice(0, 5).map((task) => (
                          <div
                            key={task._id}
                            className="d-flex justify-content-between align-items-center py-3 border-bottom"
                          >
                            <div>
                              <div className="fw-semibold mb-1">
                                {task.taskName}
                              </div>

                              <div className="d-flex align-items-center gap-2 flex-wrap">
                                <small className="text-muted">
                                  Due: {formatDate(task.taskDeadline)}
                                </small>

                                <span
                                  className={`badge ${getLocationBadgeClass(task.taskLocation)}`}
                                >
                                  <i className="bi bi-geo-alt-fill me-1"></i>
                                  {task.taskLocation}
                                </span>
                              </div>
                            </div>

                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => {
                                completeTask(task._id);
                              }}
                            >
                              <i className="bi bi-check-lg me-1"></i>
                              Complete
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted mb-0">No tasks due today.</p>
                      )}

                      {tasksDueToday.slice(0, 5).length > 0 ? (
                        <div className="text-center mt-3">
                          <Link to="/tasks" className="btn btn-outline-dark">
                            See More
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="fw-bold mb-3">
                    Upcoming Tasks ({inProgressTasks.length})
                  </h3>

                  <div className="card border-0 bg-light">
                    <div className="card-body">
                      {inProgressTasks.length > 0 ? (
                        inProgressTasks.slice(0, 5).map((task) => (
                          <div
                            key={task._id}
                            className="d-flex justify-content-between align-items-center py-3 border-bottom"
                          >
                            <div>
                              <div className="fw-semibold mb-1">
                                {task.taskName}
                              </div>

                              <div className="d-flex align-items-center gap-2 flex-wrap">
                                <small className="text-muted">
                                  Started: {formatDate(task.taskStartDate)}
                                </small>

                                <span
                                  className={`badge ${getLocationBadgeClass(task.taskLocation)}`}
                                >
                                  <i className="bi bi-geo-alt-fill me-1"></i>

                                  {task.taskLocation}
                                </span>
                              </div>
                            </div>

                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => {
                                completeTask(task._id);
                              }}
                            >
                              <i className="bi bi-check-lg me-1"></i>
                              Complete
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted mb-0">
                          No active tasks in progress.
                        </p>
                      )}
                      {upcomingTasks.slice(0, 5).length > 0 ? (
                        <div className="text-center mt-3">
                          <Link to="/tasks" className="btn btn-outline-dark">
                            See More
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
