import React from 'react';
import { useTodoContext } from '../../context/TodoContext';
const Footer: React.FC = () => {
  const {
    state
  } = useTodoContext();
  const {
    todos
  } = state;
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;
  return <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <div className="flex space-x-4 mb-2 sm:mb-0">
          <div className="flex items-center">
            <span className="font-medium">Total:</span>
            <span className="ml-1 bg-gray-200 px-2 py-1 rounded-full">
              {todos.length}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Active:</span>
            <span className="ml-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {activeCount}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Completed:</span>
            <span className="ml-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {completedCount}
            </span>
          </div>
        </div>
        <div>
          <p>© {new Date().getFullYear()} TaskApp</p>
        </div>
      </div>
    </footer>;
};
export default Footer;