import React from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';
import { useTodoContext } from '../../context/TodoContext';
import Loading from '../common/Loading';
const TodoApp: React.FC = () => {
  const {
    state
  } = useTodoContext();
  const {
    isLoading,
    error
  } = state;
  return <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Tasks</h2>
        <TodoForm />
        <div className="my-6">
          <TodoFilters />
        </div>
        {isLoading ? <div className="py-10 flex justify-center">
            <Loading text="Loading your tasks..." />
          </div> : error ? <div className="py-10 text-center text-red-600">
            <p>Error: {error}</p>
            <p className="text-sm mt-2">Please try refreshing the page</p>
          </div> : <TodoList />}
      </div>
    </div>;
};
export default TodoApp;