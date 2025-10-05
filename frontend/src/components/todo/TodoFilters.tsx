import React from 'react';
import { useTodoContext, FilterType } from '../../context/TodoContext';
const TodoFilters: React.FC = () => {
  const {
    state,
    setFilter
  } = useTodoContext();
  const {
    filter,
    todos
  } = state;
  const filters: {
    label: string;
    value: FilterType;
    count: number;
  }[] = [{
    label: 'All',
    value: 'all',
    count: todos.length
  }, {
    label: 'Active',
    value: 'active',
    count: todos.filter(todo => !todo.completed).length
  }, {
    label: 'Completed',
    value: 'completed',
    count: todos.filter(todo => todo.completed).length
  }];
  return <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter todos">
      {filters.map(filterOption => <button key={filterOption.value} onClick={() => setFilter(filterOption.value)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${filter === filterOption.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} role="tab" aria-selected={filter === filterOption.value} aria-controls={`${filterOption.value}-todos`}>
          {filterOption.label}
          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${filter === filterOption.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {filterOption.count}
          </span>
        </button>)}
    </div>;
};
export default TodoFilters;