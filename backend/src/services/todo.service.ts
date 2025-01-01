import { AppDataSouce } from "../db";
import { TodoEntity } from "../entities"; // Import TodoEntity
import { UserEntity } from "../entities";



export const createTodo = async (data: { title: string; description?: string; dueDate?: Date; user: UserEntity; }) => {
  try {
    const todoRepository = AppDataSouce.getRepository(TodoEntity);

    // Create a new Todo entity with just the user ID
    const newTodo = new TodoEntity();
    newTodo.title = data.title;
    newTodo.description = data.description;
    newTodo.dueDate = data.dueDate;
    newTodo.user = data.user.uuid;
    

    await todoRepository.save(newTodo);
    return newTodo;
  } catch (error: any) {
    console.error("Error creating todo:", error);
    throw new Error(error);
  }
};

export const getTodos = async (user: UserEntity) => {
  try {
    const todoRepository = AppDataSouce.getRepository(TodoEntity);
    const todos = await todoRepository.find({
      where: { user :{ uuid: user.uuid } }, 
    });
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error); 
    throw new Error("Failed to fetch todos.");
  }
};

export const getOneTodo = async (data) => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);
  const findTodo = await todoRepository.findOne({ where: { ...data },relations: ['user'],select: { 
    user: { 
      uuid: true, 
      username: true, 
      email: true 
    } 
  }  });
  if (!findTodo) return null;
  return findTodo;
};


export const updateTodo = async ( data: { title?: string; description?: string; dueDate?: Date; isCompleted?: boolean; user: UserEntity, getTodo: TodoEntity }) => {
  try {
    const todoRepository = AppDataSouce.getRepository(TodoEntity);
    const todo = data.getTodo

    // Update only the provided fields
    if (data.title) {
      todo.title = data.title;
    }
    if (data.description) {
      todo.description = data.description;
    }
    if (data.dueDate) {
      todo.dueDate = data.dueDate;
    }
    if (data.isCompleted !== undefined) { 
      todo.isCompleted = data.isCompleted; 
    }

    await todoRepository.save(todo);

    return todo;
  } catch (error) {
    throw error; 
  }
};


export const deleteTodo = async ( todo: TodoEntity) => {
  try {
    const todoRepository = AppDataSouce.getRepository(TodoEntity);

    await todoRepository.remove(todo); 

    return { message: 'Todo deleted successfully.' }; 
  } catch (error) {
    throw error; 
  }
};