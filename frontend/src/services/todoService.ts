import { api } from './api';
import { Todo } from '../context/TodoContext';
export const todoService = {
  // Get all todos
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data;
  },
  // Get active todos
  getActiveTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos/active');
    return response.data;
  },
  // Get completed todos
  getCompletedTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos/completed');
    return response.data;
  },
  // Create a new todo
  createTodo: async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>): Promise<Todo> => {
    const response = await api.post('/todos', todo);
    return response.data;
  },
  // Update a todo
  updateTodo: async (todo: Todo): Promise<Todo> => {
    const response = await api.put(`/todos/${todo.id}`, todo);
    return response.data;
  },
  // Toggle todo completion status
  toggleTodo: async (id: number): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },
  // Delete a todo
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  }
};