import { Router } from "express";
import { TodoValidator } from "../validators";
import { checkAuth } from "../utils/checkAuth";
import {  TodoController } from "../controllers"; // Assuming these are in separate files

export const todoRouter = Router();

// Route to create a new todo item
todoRouter.post("/", TodoValidator.createTodoValidator(), checkAuth, TodoController.createTodoController );

// Route to get all todo items for the current user
todoRouter.get("/", checkAuth,  TodoController.getTodosController);

// Route to update a specific todo item
todoRouter.put("/:id", TodoValidator.updateTodoValidator(), checkAuth, TodoController.updateTodoController);

// Route to delete a specific todo item
todoRouter.delete("/:id",  checkAuth, TodoController.deleteTodoController);