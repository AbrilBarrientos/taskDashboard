import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, List, LayoutGrid, Filter } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './hooks/useTodos';
import { Todo } from './types/todo';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  }).filter((todo) => {
    if (priorityFilter === 'all') return true;
    return todo.priority === priorityFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tareas Dashboard</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            Añadir tarea
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded ${
                view === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'
              }`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded ${
                view === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500'
              }`}
            >
              <List size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
            <Filter size={20} className="text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
              className="border-none bg-transparent focus:ring-0"
            >
              <option value="all">Todas</option>
              <option value="active">Activas</option>
              <option value="completed">Completadas</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as 'all' | 'low' | 'medium' | 'high')}
              className="border-none bg-transparent focus:ring-0"
            >
              <option value="all">Todas las prioridades</option>
              <option value="low">Baja prioridad</option>
              <option value="medium">Media prioridad</option>
              <option value="high">Alta prioridad</option>
            </select>
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <div className="max-w-md w-full">
                <TodoForm
                  onSubmit={(todo) => {
                    addTodo(todo);
                    setShowForm(false);
                  }}
                  onClose={() => setShowForm(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`grid gap-4 ${
            view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          }`}
        >
          <AnimatePresence>
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredTodos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Sin tareas.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;