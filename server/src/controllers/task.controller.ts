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