import express from "express";
import cors from "cors";
import { ObjectId, MongoClient } from "mongodb";
import dotenv from "dotenv";

import admin from "firebase-admin"

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const uri = process.env.MONGODB_CONNECT;

const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("user");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

app.get("/dashboard", async (req, res) => {
  try {
    const tasks = await db.collection("tasks").find().toArray();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/weather", async (req, res) => {
})

app.get("/traffic", async (req, res) => {
})

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await db.collection("tasks").find().toArray();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/add-task", async (req, res) => {
  try {
    const taskData = {
      uid: "",
      taskName: req.body.taskName,
      taskStartDate: req.body.taskStartDate,
      taskDeadline: req.body.taskDeadline,
      taskLocation: (req.body.taskLocation === "" ? "Unknown" : req.body.taskLocation),
      taskDescription: req.body.taskDescription,
      taskCompleted: false,
      taskCompletionDate: null,
      createdAt: new Date(),
    };

    const result = await db.collection("tasks").insertOne(taskData);

    res
      .status(201)
      .json({ message: "Task created", insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/edit-task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await db.collection("tasks").findOne({
      _id: new ObjectId(taskId),
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.put("/edit-task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = {
      taskName: req.body.taskName,
      taskStartDate: req.body.taskStartDate,
      taskDeadline: req.body.taskDeadline,
      taskLocation: req.body.taskLocation,
      taskDescription: req.body.taskDescription,
    };
    const response = await db.collection("tasks").updateOne(
      {
        _id: new ObjectId(taskId),
      },
      {
        $set: updatedTask,
      },
    );
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.delete("/edit-task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const response = await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(taskId) });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.put("/complete-task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    await db.collection("tasks").updateOne(
      {
        _id: new ObjectId(taskId),
      },

      {
        $set: {
          taskCompleted: true,

          taskCompletionDate: new Date(),
        },
      },
    );

    res.status(200).json({
      message: "Task completed successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.put("/uncomplete-task/:id", async (req, res) => {
  try {
    const taskId = req.params.id;

    await db.collection("tasks").updateOne(
      {
        _id: new ObjectId(taskId),
      },

      {
        $set: {
          taskCompleted: false,

          taskCompletionDate: null,
        },
      },
    );
    res.status(200).json({
      message: "Task reverted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

connectToDatabase();
