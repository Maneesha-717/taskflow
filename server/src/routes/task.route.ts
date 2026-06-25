import { Router } from "express";
import { createTask ,  getTasks,} from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

export default router;