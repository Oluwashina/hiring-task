import { Request, Response } from "express";
import { todoService } from "../../services"; 
import { UserEntity } from '../../entities/user.entity';
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

interface CustomRequest extends Request {
  user?: UserEntity
}

const deleteTodoHandler = async (req: CustomRequest, res: Response) => {
  const { id } = req.params; 
  const user = req.user; 

  if (!user) { 
    return res.status(401).json({ message: 'User not found.' }); 
  }

  const getTodo = await todoService.getOneTodo({id})
  if (!getTodo) {
    return res.status(400).json({ message: 'Todo not found' }); 
  }
  
  if (user.uuid != getTodo.user.uuid) { 
    return res.status(400).json({ message: 'Unauthorized: You can only update your own todos.' }); 
  }


  try {
    const result = await todoService.deleteTodo(getTodo); 

    return res.status(httpStatus.OK).json(result); 
  } catch (error) { 
    console.error("Error deleting todo:", error); 
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" }); 
  }
};

export const deleteTodoController = errorHandlerWrapper(deleteTodoHandler);