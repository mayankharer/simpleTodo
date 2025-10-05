import React from 'react';
import { TodoProvider } from './context/TodoContext';
import Layout from './components/layout/Layout';
import TodoApp from './components/todo/TodoApp';
export function App() {
  return <TodoProvider>
      <Layout>
        <TodoApp />
      </Layout>
    </TodoProvider>;
}