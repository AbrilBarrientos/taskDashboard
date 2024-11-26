import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Trash2, Clock, Tag } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const priorityColors = {
    baja: 'bg-green-100 text-green-800',
    media: 'bg-yellow-100 text-yellow-800',
    alta: 'bg-red-100 text-red-800',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        <button
          onClick={() => onToggle(todo.id)}
          className="mt-1 text-gray-400 hover:text-blue-500 transition-colors"
        >
          {todo.completed ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <Circle />
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3
              className={`text-lg font-medium ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
            >
              {todo.title}
            </h3>
            <button
              onClick={() => onDelete(todo.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {todo.description && (
            <p className="text-gray-600 mt-1">{todo.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                priorityColors[todo.priority]
              }`}
            >
              {todo.priority}
            </span>

            {todo.dueDate && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock size={14} />
                {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}

            {todo.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag size={14} className="text-gray-400" />
                {todo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};