import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface TodoFormProps {
  onSubmit: (todo: any) => void;
  onClose?: () => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'baja' | 'media' | 'alta'>('media');
  const [dueDate, setDueDate] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title,
      description,
      completed: false,
      priority,
      dueDate,
      tags,
    });

    setTitle('');
    setDescription('');
    setPriority('media');
    setDueDate('');
    setTags([]);
    onClose?.();
  };

  const addTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag('');
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg p-6 space-y-4"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Nueva tarea</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de tarea"
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
      />

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Prioridad</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'baja' | 'media' | 'alta')}
            className="mt-1 block w-full p-2 border rounded"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700">Hasta la fecha:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full p-2 border rounded"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Añadir etiqueta"
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
            >
              {t}
              <button
                type="button"
                onClick={() => setTags(tags.filter((tag) => tag !== t))}
                className="hover:text-blue-600"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Añadir tarea
      </button>
    </motion.form>
  );
};