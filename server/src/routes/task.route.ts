import { Router } from "express";
import { createTask ,  getTasks, getTaskById,updateTask,deleteTask,updateTaskStatus,updateTaskPriority,searchTasks,filterTasks,updateTaskDueDate } from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.get("/:id", protect, getTaskById);

router.put("/:id", protect, updateTask);


router.delete("/:id", protect, deleteTask);

router.patch("/:id/status", protect, updateTaskStatus);

router.patch("/:id/priority", protect, updateTaskPriority);

router.get("/search", protect, searchTasks);

router.get("/filter", protect, filterTasks);

router.patch("/:id/due-date",protect,updateTaskDueDate);

export default router;