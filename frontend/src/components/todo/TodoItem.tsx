import React, { useState } from 'react';
import { Edit2Icon, TrashIcon, CheckIcon, CalendarIcon } from 'lucide-react';
import { useTodoContext, Todo } from '../../context/TodoContext';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
interface TodoItemProps {
  todo: Todo;
}
interface EditFormData {
  title: string;
  description: string;
}
const TodoItem: React.FC<TodoItemProps> = ({
  todo
}) => {
  const {
    updateTodo,
    deleteTodo,
    toggleTodo
  } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<EditFormData>({
    defaultValues: {
      title: todo.title,
      description: todo.description
    }
  });
  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await toggleTodo(todo.id);
      toast.success(todo.completed ? 'Task marked as active' : 'Task marked as completed');
    } catch (error) {
      toast.error('Failed to update task status');
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteTodo(todo.id);
      toast.success('Task deleted successfully', {
        icon: '🗑️'
      });
      setIsDeleting(false);
    } catch (error) {
      toast.error('Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  };
  const onEditSubmit = async (data: EditFormData) => {
    setIsLoading(true);
    try {
      await updateTodo({
        ...todo,
        title: data.title,
        description: data.description
      });
      toast.success('Task updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return <>
      <div className={`h-full bg-white border ${todo.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'} rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col`}>
        {/* Card header with status and actions */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <button onClick={handleToggle} disabled={isLoading} className={`w-6 h-6 rounded-full border ${todo.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-blue-500'} flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}>
              {todo.completed && <CheckIcon className="w-4 h-4" />}
            </button>
            <span className={`ml-2 text-xs font-medium ${todo.completed ? 'text-green-600' : 'text-blue-600'} px-2 py-0.5 rounded-full ${todo.completed ? 'bg-green-100' : 'bg-blue-100'}`}>
              {todo.completed ? 'Completed' : 'Active'}
            </span>
          </div>
          <div className="flex">
            <button onClick={() => setIsEditing(true)} className="mr-2 text-gray-500 hover:text-blue-600 focus:outline-none" aria-label="Edit task">
              <Edit2Icon className="w-4 h-4" />
            </button>
            <button onClick={() => setIsDeleting(true)} className="text-gray-500 hover:text-red-600 focus:outline-none" aria-label="Delete task">
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Card content */}
        <div className="p-4 flex-grow">
          <h3 className={`text-lg font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'} mb-2`}>
            {todo.title}
          </h3>
          {todo.description && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} className="mt-2">
              <p className={`text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'} line-clamp-3`}>
                {todo.description}
              </p>
            </motion.div>}
        </div>
        {/* Card footer with dates */}
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
          <div className="flex items-center">
            <CalendarIcon className="w-3 h-3 mr-1" />
            <span>Created: {formatDate(todo.createdAt)}</span>
          </div>
          {todo.updatedAt && todo.updatedAt !== todo.createdAt && <div className="flex items-center mt-1">
              <CalendarIcon className="w-3 h-3 mr-1" />
              <span>Updated: {formatDate(todo.updatedAt)}</span>
            </div>}
        </div>
      </div>
      {/* Edit Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Task" size="md" footer={<div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit(onEditSubmit)} isLoading={isLoading}>
              Save Changes
            </Button>
          </div>}>
        <form>
          <div className="mb-4">
            <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input id="edit-title" type="text" className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: 100,
              message: 'Title must be less than 100 characters'
            }
          })} />
            {errors.title && <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>}
          </div>
          <div>
            <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea id="edit-description" rows={4} className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} {...register('description', {
            maxLength: {
              value: 500,
              message: 'Description must be less than 500 characters'
            }
          })} />
            {errors.description && <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>}
          </div>
        </form>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleting} onClose={() => setIsDeleting(false)} title="Delete Task" size="sm" footer={<div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={isLoading} icon={<TrashIcon className="w-4 h-4" />}>
              Delete
            </Button>
          </div>}>
        <p className="text-gray-700">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <p className="font-medium">{todo.title}</p>
          {todo.description && <p className="mt-1 text-sm text-gray-600 truncate">
              {todo.description}
            </p>}
        </div>
      </Modal>
    </>;
};
export default TodoItem;