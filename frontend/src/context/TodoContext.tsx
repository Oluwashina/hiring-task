import React, { createContext, useContext, useState, ReactNode } from 'react';
import { signIn, fetchTodos, addTodo, updateTodo, deleteTodo, signUp } from '../services/api';
import toast from "react-hot-toast";

// Types Definition for state
interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string
}

interface User {
  id: string;
  email: string;
}

interface TodoContextType {
  todos: Todo[];
  user: User | null;
  loading: boolean;
  loader: boolean;
  error: string | null;
  signInUser: (email: string, password: string) => void;
  signUpUser: (username: string, email: string, password: string) => void;
  signOutUser: () => void;
  fetchUserTodos: () => void;
  addNewTodo: (todo: { title: string; description: string, dueDate: string }) => void;
  updateTodoItem: (todoId: string, updatedTodo: { title: string; description: string, dueDate: string, isCompleted: boolean }) => void;
  removeTodoItem: (todoId: string) => void;
}

// Create context
const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};

// Create context provider
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await signIn(email, password);
      setUser(userData.user);
      setLoading(false);
    } catch (error: any) {
       setLoading(false);
       if (error.response.status === 400 || error.response.status === 404) {
        setError('Failed to sign in');
        toast.error("Oops, Looks like either the username/password is not valid!", {
          style: {
            fontSize: 14,
            fontFamily: "Inter",
          },
        });
       }
    }
  };

  const signUpUser = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await signUp(username,email, password);
      setUser(userData.user);
      setLoading(false);
    } catch (error: any) {      
      setLoading(false);
      if (error.response.status === 400 || error.response.status === 404) {
        setError('Failed to sign in');
        toast.error("Oops, Looks like this account already exist", {
          style: {
            fontSize: 14,
            fontFamily: "Inter",
          },
        });
       }
    }
  };

  const signOutUser = () => {
    localStorage.removeItem('auth_token'); // Remove token from localStorage on sign-out
    setUser(null);
    setTodos([]);
  };

  const fetchUserTodos = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      setError('No token found');
      return;
    }

    setLoading(true);
    try {
      const userTodos = await fetchTodos();
      setTodos(userTodos);
      setLoading(false);
      console.log(userTodos);
    } catch (error) {
      setError('Failed to fetch todos');
      setLoading(false);
    }
  };

const addNewTodo = async (todo: { title: string; description: string, dueDate: string }) => {
    if (user) {
      setLoader(true);
      try {
        const newTodo = await addTodo(todo);
        setTodos([...todos, {
          id: newTodo.id,
          title: newTodo.title,
          description: newTodo.description,
          isCompleted: false,
          dueDate: newTodo.dueDate,
          createdAt: newTodo.createdAt,
          updatedAt: newTodo.updatedAt,
        }]);
        setLoader(false);
      } catch (error) {
        setError('Failed to add todo');
        setLoader(false);
      }
    }
  };

const updateTodoItem = async (todoId: string, updatedTodo: { title: string; description: string, dueDate: string,isCompleted: boolean }) => {
    if (user) {
      setLoading(true);
      try {
        const updated = await updateTodo(todoId, updatedTodo);
        setTodos(todos.map(todo => (todo.id === todoId ? {
          id: todo.id,
          title: updated.title || todo.title,
          description: updated.description || todo.description,
          dueDate: updated.dueDate || todo.dueDate,
          isCompleted: updated.isCompleted || todo.isCompleted,
          createdAt: updated.createdAt,
          updatedAt: updated.updatedAt,
        } : todo)));
        setLoading(false);
      } catch (error) {
        setError('Failed to update todo');
        setLoading(false);
      }
    }
  };



  const removeTodoItem = async (todoId: string) => {
    if (user) {
      setLoader(true);
      try {
        await deleteTodo(todoId);
        setTodos(todos.filter(todo => todo.id !== todoId));
        setLoader(false);
      } catch (error) {
        setError('Failed to delete todo');
        setLoader(false);
      }
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        user,
        loading,
        loader,
        error,
        signInUser,
        signUpUser,
        signOutUser,
        fetchUserTodos,
        addNewTodo,
        updateTodoItem,
        removeTodoItem,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
