import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PlusIcon } from 'lucide-react';
import Button from '../common/Button';
import { useTodoContext } from '../../context/TodoContext';
import toast from 'react-hot-toast';
interface TodoFormData {
  title: string;
  description: string;
}
const TodoForm: React.FC = () => {
  const {
    addTodo
  } = useTodoContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm<TodoFormData>({
    defaultValues: {
      title: '',
      description: ''
    }
  });
  const onSubmit = async (data: TodoFormData) => {
    setIsSubmitting(true);
    try {
      await addTodo({
        title: data.title,
        description: data.description,
        completed: false
      });
      reset();
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-4 rounded-lg border border-gray-200" aria-label="Add new task form">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Task Title <span className="text-red-500">*</span>
        </label>
        <input id="title" type="text" className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} placeholder="What needs to be done?" {...register('title', {
        required: 'Title is required',
        maxLength: {
          value: 100,
          message: 'Title must be less than 100 characters'
        }
      })} aria-invalid={errors.title ? 'true' : 'false'} />
        {errors.title && <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.title.message}
          </p>}
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea id="description" rows={3} className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`} placeholder="Add details about your task..." {...register('description', {
        maxLength: {
          value: 500,
          message: 'Description must be less than 500 characters'
        }
      })} aria-invalid={errors.description ? 'true' : 'false'} />
        {errors.description && <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.description.message}
          </p>}
      </div>
      <div className="flex justify-end">
        <Button type="submit" variant="primary" isLoading={isSubmitting} icon={<PlusIcon className="w-4 h-4" />} aria-label="Add task">
          Add Task
        </Button>
      </div>
    </form>;
};
export default TodoForm;