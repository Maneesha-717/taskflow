import { Router } from "express";
import { createTask ,  getTasks, getTaskById,updateTask,deleteTask} from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.get("/:id", protect, getTaskById);

router.put("/:id", protect, updateTask);


router.delete("/:id", protect, deleteTask);


export default router;