import { Request, Response } from "express";
import { todoService } from "../../services"; 
import { UserEntity } from '../../entities/user.entity';
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

interface CustomRequest extends Request {
  user?: UserEntity
}

const getTodosHandler = async (req: CustomRequest, res: Response) => {
  try {
    const user = req.user; 

    if (!user) { 
      return res.status(401).json({ message: 'User not found.' }); 
    }

    const todos = await todoService.getTodos(user); 

    res.status(httpStatus.OK).json(todos); 
  } catch (error) { 
    console.error("Error fetching todos:", error); 
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" }); 
  }
};

export const getTodosController = errorHandlerWrapper(getTodosHandler);