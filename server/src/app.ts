import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.route";

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

export default app;