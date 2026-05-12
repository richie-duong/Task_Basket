import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const [toggleOverdueTasks, setToggleOverdueTasks] = useState(false);

export default function Tasks() {
  const navigate = useNavigate();

  const response = await axios.get('http://localhost:3000/tasks');

  console.log(response.data);

  return (
    <>
      <h1>All Tasks</h1>
      <button onClick={() => navigate("/add-task")}>Add Task</button>
      <div>
        <h2>Due Today</h2>
        <div>

        </div>
      </div>
      <div>
        <h2>In Progress</h2>
        <div>

        </div>
      </div>
    </>
  );
}
