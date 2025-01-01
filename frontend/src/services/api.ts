import axios from 'axios';

// Set base URL for your backend API
const API = axios.create({
  baseURL: process.env.REACT_APP_TODO_URL
});

// API call for sign-in
export const signIn = async (email: string, password: string) => {
    const response = await API.post('/auth/login', { email, password });
    const token = response.data.token; // assuming the token is returned in the 'token' field
    if (token) {
      localStorage.setItem('auth_token', token); // Store token in localStorage
    }
    return response.data;
  };

  // API call for signup
export const signUp = async (username: string, email: string, password: string) => {
    const response = await API.post('/auth/register', { username,email, password });
    return response.data;
  };

// API calls for todos
export const fetchTodos = async () => {
    const token = localStorage.getItem('auth_token'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('No token found');
    }
  
    const response = await API.get(`/todo`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  };

export const addTodo = async (todo: { title: string, description: string, dueDate: string }) => {
  const token = localStorage.getItem('auth_token'); // Retrieve token from localStorage
  const response = await API.post(`/todo`, todo,
    {
      headers: {
        Authorization: `${token}`,
    },
   }
  );
  return response.data;
};

export const updateTodo = async (todoId: string, updatedTodo: { title: string, description: string, dueDate: string, isCompleted: boolean }) => {
 const token = localStorage.getItem('auth_token'); // Retrieve token from localStorage
  const response = await API.put(`/todo/${todoId}`,
    updatedTodo,
     {
        headers: {
          Authorization: `${token}`,
      },
     }
    );
  return response.data;
};



export const deleteTodo = async (todoId: string) => {
  const token = localStorage.getItem('auth_token'); // Retrieve token from localStorage
  const response = await API.delete(`/todo/${todoId}`,
     {
        headers: {
          Authorization: `${token}`,
      },
     }
    );
  return response.data;
};
