import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = Router();

userRouter.post("/", createUser);

userRouter.get("/", authMiddleware, getUsers);
userRouter.get("/:id", authMiddleware, getUserById);
userRouter.put("/:id", authMiddleware, updateUser);
userRouter.delete("/:id", authMiddleware, deleteUser);

export default userRouter; 