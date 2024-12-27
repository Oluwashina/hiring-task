import { Request, Response } from "express";
import { todoService } from "../../services"; 
import { UserEntity } from '../../entities/user.entity';
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";


interface CustomRequest extends Request {
    user?: UserEntity
}

const createTodoHandler = async (req: CustomRequest, res: Response) => {
  const { title, description, dueDate } = req.body;
  // Get the user object from the request (attached by the checkAuth middleware)
  const user = req.user; 

  if (!user) { 
    // Handle the case where user is not found (potentially due to authentication issues)
    return res.status(401).json({ message: 'User not found.' }); 
  }

  try { 
    const newTodo = await todoService.createTodo({ 
      title, 
      description, 
      dueDate, 
      user
    });

    return res.status(httpStatus.CREATED).json(newTodo); 
  } catch (error) { 
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" })
  }
};

export const createTodoController = errorHandlerWrapper(createTodoHandler);