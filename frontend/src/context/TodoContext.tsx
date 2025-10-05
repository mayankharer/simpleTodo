import React, { useEffect, createContext, useContext, useReducer } from 'react';
import { todoService } from '../services/todoService';
// Define Todo type
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
// Define filter types
export type FilterType = 'all' | 'active' | 'completed';
// Define the state shape
interface TodoState {
  todos: Todo[];
  filteredTodos: Todo[];
  isLoading: boolean;
  error: string | null;
  filter: FilterType;
}
// Define action types
type TodoAction = {
  type: 'FETCH_TODOS_REQUEST';
} | {
  type: 'FETCH_TODOS_SUCCESS';
  payload: Todo[];
} | {
  type: 'FETCH_TODOS_FAILURE';
  payload: string;
} | {
  type: 'ADD_TODO_SUCCESS';
  payload: Todo;
} | {
  type: 'UPDATE_TODO_SUCCESS';
  payload: Todo;
} | {
  type: 'DELETE_TODO_SUCCESS';
  payload: number;
} | {
  type: 'SET_FILTER';
  payload: FilterType;
};
// Initial state
const initialState: TodoState = {
  todos: [],
  filteredTodos: [],
  isLoading: false,
  error: null,
  filter: 'all'
};
// Create context
const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  setFilter: (filter: FilterType) => void;
}>({
  state: initialState,
  dispatch: () => {},
  addTodo: async () => {},
  updateTodo: async () => {},
  deleteTodo: async () => {},
  toggleTodo: async () => {},
  setFilter: () => {}
});
// Create reducer
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'FETCH_TODOS_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case 'FETCH_TODOS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
        filteredTodos: filterTodos(action.payload, state.filter)
      };
    case 'FETCH_TODOS_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'ADD_TODO_SUCCESS':
      const updatedTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: updatedTodos,
        filteredTodos: filterTodos(updatedTodos, state.filter)
      };
    case 'UPDATE_TODO_SUCCESS':
      const updatedTodoList = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo);
      return {
        ...state,
        todos: updatedTodoList,
        filteredTodos: filterTodos(updatedTodoList, state.filter)
      };
    case 'DELETE_TODO_SUCCESS':
      const filteredTodos = state.todos.filter(todo => todo.id !== action.payload);
      return {
        ...state,
        todos: filteredTodos,
        filteredTodos: filterTodos(filteredTodos, state.filter)
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
        filteredTodos: filterTodos(state.todos, action.payload)
      };
    default:
      return state;
  }
};
// Helper function to filter todos
const filterTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
// Create provider component
export const TodoProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({
        type: 'FETCH_TODOS_REQUEST'
      });
      try {
        const todos = await todoService.getAllTodos();
        dispatch({
          type: 'FETCH_TODOS_SUCCESS',
          payload: todos
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_TODOS_FAILURE',
          payload: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      }
    };
    fetchTodos();
  }, []);
  const addTodo = async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTodo = await todoService.createTodo(todo);
      dispatch({
        type: 'ADD_TODO_SUCCESS',
        payload: newTodo
      });
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  const updateTodo = async (todo: Todo) => {
    try {
      const updatedTodo = await todoService.updateTodo(todo);
      dispatch({
        type: 'UPDATE_TODO_SUCCESS',
        payload: updatedTodo
      });
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  const deleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      dispatch({
        type: 'DELETE_TODO_SUCCESS',
        payload: id
      });
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
  const toggleTodo = async (id: number) => {
    try {
      const todo = state.todos.find(t => t.id === id);
      if (todo) {
        const updatedTodo = await todoService.toggleTodo(id);
        dispatch({
          type: 'UPDATE_TODO_SUCCESS',
          payload: updatedTodo
        });
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };
  const setFilter = (filter: FilterType) => {
    dispatch({
      type: 'SET_FILTER',
      payload: filter
    });
  };
  return <TodoContext.Provider value={{
    state,
    dispatch,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    setFilter
  }}>
      {children}
    </TodoContext.Provider>;
};
// Custom hook to use the todo context
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};