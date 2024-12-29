import axios from 'axios';

// Set base URL for your backend API
const API = axios.create({
  baseURL: process.env.REACT_APP_TODO_URL
});

// API call for sign-in
export const signIn = async (email: string, password: string) => {
    const response = await API.post('/auth/signin', { email, password });
    const token = response.data.token; // assuming the token is returned in the 'token' field
    if (token) {
      localStorage.setItem('auth_token', token); // Store token in localStorage
    }
    return response.data;
  };

// API calls for todos
export const fetchTodos = async () => {
    const token = localStorage.getItem('auth_token'); // Retrieve token from localStorage
    if (!token) {
      throw new Error('No token found');
    }
  
    const response = await API.get(`/todos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

export const addTodo = async (userId: string, todo: { title: string, description: string }) => {
  const response = await API.post(`/todos/${userId}`, todo);
  return response.data;
};

export const updateTodo = async (userId: string, todoId: string, updatedTodo: { title: string, description: string }) => {
  const response = await API.put(`/todos/${userId}/${todoId}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (userId: string, todoId: string) => {
  const response = await API.delete(`/todos/${userId}/${todoId}`);
  return response.data;
};
