import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value, category);
    setValue('');
    setCategory('General');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task..."
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        <option value="General">📝 General</option>
        <option value="Work">💼 Work</option>
        <option value="Personal">🏡 Personal</option>
        <option value="Urgent">⚠️ Urgent</option>
      </select>
      <button type="submit" className="add-btn">
         Add
      </button>
    </form>
  );
}

export default TodoForm;
