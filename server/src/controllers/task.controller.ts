import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.user!.userId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getTasks = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user!.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const getTaskById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user!.userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    // Get task ID from URL
    const id = String(req.params.id);

    // Get updated data from request body
    const { title, description } = req.body;

    // Get logged-in user's ID
    const userId = req.user!.userId;

    // Check if the task exists and belongs to the logged-in user
    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Update the task
    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        description,
      },
    });

    // Send response
    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = String(req.params.id);
    const userId = req.user!.userId;

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const deletedTask = await prisma.task.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};