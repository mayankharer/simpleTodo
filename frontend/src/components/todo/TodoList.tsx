import React, { useState } from 'react';
import TodoItem from './TodoItem';
import { useTodoContext } from '../../context/TodoContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const TodoList: React.FC = () => {
  const {
    state
  } = useTodoContext();
  const {
    filteredTodos,
    filter
  } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 12;
  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTodos.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTodos.length / tasksPerPage);
  // Pagination controls
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  if (filteredTodos.length === 0) {
    return <div className="py-10 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
        <p className="text-lg">
          {filter === 'all' ? 'No tasks yet. Add your first task above!' : filter === 'active' ? 'No active tasks. All tasks completed!' : 'No completed tasks yet.'}
        </p>
      </div>;
  }
  return <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" aria-label="Todo list">
        <AnimatePresence>
          {currentTasks.map(todo => <motion.div key={todo.id} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.9
        }} transition={{
          duration: 0.2
        }} className="h-full">
              <TodoItem todo={todo} />
            </motion.div>)}
        </AnimatePresence>
      </div>
      {/* Pagination */}
      {totalPages > 1 && <div className="mt-8 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstTask + 1}</span>{' '}
            to{' '}
            <span className="font-medium">
              {Math.min(indexOfLastTask, filteredTodos.length)}
            </span>{' '}
            of <span className="font-medium">{filteredTodos.length}</span> tasks
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`} aria-label="Previous page">
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            {Array.from({
          length: totalPages
        }, (_, i) => i + 1).map(page => <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-full ${currentPage === page ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} aria-label={`Page ${page}`} aria-current={currentPage === page ? 'page' : undefined}>
                {page}
              </button>)}
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`} aria-label="Next page">
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>}
    </div>;
};
export default TodoList;