import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditTaskPage(taskID) {
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskStartDate, setTaskStartDate] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [taskLocation, setTaskLocation] = useState("");
  const [locationName, setLocationName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const navigate = useNavigate();

  async function EditTask() {
    // Input validation
    if (taskLocation === "Other" && !locationName) {
      alert("Please enter a location name.");
      return;
    }

    const taskData = {
      taskName,
      taskDeadline,
      taskLocation: taskLocation === "Other" ? locationName : taskLocation,
      taskDescription,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/add-task",
        taskData,
      );
      console.log(response.data);
      alert("Task added successfully!");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Add Task</h1>
      <input
        type="text"
        id="task-name"
        placeholder="Task Name"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />
      <input
        type="datetime-local"
        id="task-start-date"
        value={taskStartDate}
        onChange={(event) => setTaskStartDate(event.target.value)}
      />
      <input
        type="datetime-local"
        id="task-deadline"
        value={taskDeadline}
        onChange={(event) => setTaskDeadline(event.target.value)}
      />
      <select
        onChange={(event) => setTaskLocation(event.target.value)}
        value={taskLocation}
      >
        <option value="" disabled hidden>
          Select your task location
        </option>
        <option value="Home">Home</option>
        <option value="Online">Online</option>
        <option value="Other">Other</option>
      </select>
      {taskLocation === "Other" ? (
        <input
          type="text"
          id="other-task-name"
          placeholder="Location Name"
          required
          onChange={(event) => {
            setLocationName(event.target.value);
          }}
          value={locationName}
        />
      ) : null}
      <textarea
        placeholder="Text Description"
        value={taskDescription}
        onChange={(event) => setTaskDescription(event.target.value)}
      />
      <button onClick={addTask}>Submit</button>
      <button
        onClick={() => {
          setTaskName("");
          setTaskStartDate("");
          setTaskDeadline("");
          setTaskLocation("");
          setTaskDescription("");
        }}
      >
        Clear
      </button>
    </>
  );
}
