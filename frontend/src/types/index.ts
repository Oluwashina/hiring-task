
export interface Todo {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    dueDate: string;
    createdAt: string;
    updatedAt: string
  }


export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string
  }