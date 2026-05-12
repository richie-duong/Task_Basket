import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

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

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await db.collection("tasks").find().toArray();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
 })

app.post("/add-task", async (req, res) => {
  try {
    const taskData = {
      uid: "",
      taskName: req.body.taskName,
      taskStartDate: req.body.taskStartDate,
      taskDeadline: req.body.taskDeadline,
      taskLocation: req.body.taskLocation,
      taskDescription: req.body.taskDescription,
      taskCompleted: false,
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

connectToDatabase();
