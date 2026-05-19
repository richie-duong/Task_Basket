import path from "path";

import { fileURLToPath } from "url";

import express from "express";
import axios from "axios";
import cors from "cors";
import { ObjectId, MongoClient } from "mongodb";
import dotenv from "dotenv";

// Firebase authentication: serviceAccount contains Admin SDK Key
import admin from "firebase-admin";
import serviceAccount from "../firebase-service-account.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

// Initializing Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firebase middleware
/* 
- User logs in > Firebase gives ID token
- Frontend sends token (Authorization: Bearer TOKEN)
- Backend verifies that token with Firebase Admin SDK
- "req.user.uid" will now become available
*/
async function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid token",
    });
  }
}

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

app.post("/create-profile", authenticateUser, async (req, res) => {
  try {
    const userData = {
      uid: req.user.uid,
      email: req.user.email,
      postalCode: req.body.postalCode,
      createdAt: new Date(),
    };

    await db.collection("users").updateOne(
      {
        uid: req.user.uid,
      },
      {
        $set: userData,
      },
      {
        upsert: true,
      },
    );

    res.status(201).json({
      message: "User profile created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/dashboard", authenticateUser, async (req, res) => {
  try {
    const tasks = await db
      .collection("tasks")
      .find({
        uid: req.user.uid,
      })
      .toArray();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/weather", authenticateUser, async (req, res) => {
  try {
    const user = await db.collection("users").findOne({
      uid: req.user.uid,
    });
    const postalCode = user.postalCode;
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${postalCode}&days=1&alerts=yes`,
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/traffic", authenticateUser, async (req, res) => {});

app.get("/tasks", authenticateUser, async (req, res) => {
  try {
    const tasks = await db
      .collection("tasks")
      .find({
        uid: req.user.uid,
      })
      .toArray();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.post("/add-task", authenticateUser, async (req, res) => {
  try {
    const taskData = {
      uid: req.user.uid,
      taskName: req.body.taskName,
      taskStartDate: req.body.taskStartDate,
      taskDeadline: req.body.taskDeadline,
      taskLocation:
        req.body.taskLocation === "" ? "Unknown" : req.body.taskLocation,
      taskDescription: req.body.taskDescription,
      taskCompleted: false,
      taskCompletionDate: null,
      createdAt: new Date(),
    };

    const result = await db.collection("tasks").insertOne(taskData);

    res.status(201).json({
      message: "Task created",
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/edit-task/:id", authenticateUser, async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await db.collection("tasks").findOne({
      _id: new ObjectId(taskId),
      uid: req.user.uid,
    });

    if (!task) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.put("/edit-task/:id", authenticateUser, async (req, res) => {
  try {
    const taskId = req.params.id;

    const updatedTask = {
      taskName: req.body.taskName,
      taskStartDate: req.body.taskStartDate,
      taskDeadline: req.body.taskDeadline,
      taskLocation: req.body.taskLocation,
      taskDescription: req.body.taskDescription,
    };

    const result = await db.collection("tasks").updateOne(
      {
        _id: new ObjectId(taskId),
        uid: req.user.uid,
      },

      {
        $set: updatedTask,
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.delete("/edit-task/:id", authenticateUser, async (req, res) => {
  try {
    const taskId = req.params.id;

    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(taskId),
      uid: req.user.uid,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.put("/complete-task/:id", authenticateUser, async (req, res) => {
  try {
    const taskId = req.params.id;

    const result = await db.collection("tasks").updateOne(
      {
        _id: new ObjectId(taskId),
        uid: req.user.uid,
      },

      {
        $set: {
          taskCompleted: true,
          taskCompletionDate: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task completed successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.put("/uncomplete-task/:id", authenticateUser, async (req, res) => {
  try {
    const taskId = req.params.id;

    const result = await db.collection("tasks").updateOne(
      {
        _id: new ObjectId(taskId),
        uid: req.user.uid,
      },

      {
        $set: {
          taskCompleted: false,
          taskCompletionDate: null,
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task reverted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/settings", authenticateUser, async (req, res) => {
  try {
    const user = await db.collection("users").findOne({
      uid: req.user.uid,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.put("/settings", authenticateUser, async (req, res) => {
  try {
    await db.collection("users").updateOne(
      {
        uid: req.user.uid,
      },
      {
        $set: {
          postalCode: req.body.postalCode,
        },
      },
    );

    res.status(200).json({
      message: "Settings updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.use(express.static(path.join(__dirname, "../../front-end/dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "../../front-end/dist/index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

connectToDatabase();
