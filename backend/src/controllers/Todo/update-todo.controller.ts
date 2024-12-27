import { Request, Response } from "express";
import { todoService } from "../../services"; 
import { UserEntity } from '../../entities/user.entity';
import { errorHandlerWrapper } from "../../utils";
import httpStatus from "http-status";

interface CustomRequest extends Request {
  user?: UserEntity
}

const updateTodoHandler = async (req: CustomRequest, res: Response) => {
  console.log("got her")
  const { id } = req.params; 
  const { title, description, dueDate, isCompleted } = req.body;
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

   console.log("got", getTodo)
  try {
    const updatedTodo = await todoService.updateTodo({ 
      title: title ? title : undefined, 
      description: description ? description : undefined, 
      dueDate: dueDate ? dueDate : undefined, 
      isCompleted: isCompleted !== undefined ? isCompleted : undefined, 
      user ,
      getTodo
    }); 

    return res.status(httpStatus.OK).json(updatedTodo); 
  } catch (error) { 
    console.error("Error updating todo:", error); 
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" }); 
  }
};

export const updateTodoController = errorHandlerWrapper(updateTodoHandler);