import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route";
import taskRoute from "./routes/task.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is working",
  });
});

app.use("/api/auth", authRoute);
app.use("/api/tasks", taskRoute);

export default app;