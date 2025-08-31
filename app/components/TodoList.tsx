'use client';

import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoFilter from './TodoFilter';
import { Todo, FilterType } from './types';
import styles from './styles.module.css';

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isMounted, setIsMounted] = useState(false);

  // Инициализация состояния после монтирования
  useEffect(() => {
    setIsMounted(true);
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error('Error parsing stored todos:', error);
        setTodos(initialTodos);
      }
    } else {
      setTodos(initialTodos);
    }
  }, [initialTodos]);

  // Синхронизация с localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isMounted]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: inputValue.trim(),
        completed: false
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number | string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number | string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className={styles.todoList}>
      <div className={styles.inputSection}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Добавить новую задачу..."
          className={styles.input}
        />
        <button onClick={addTodo} className={styles.addButton} disabled={!inputValue.trim()}>
          Add
        </button>
      </div>

      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />

      <div className={styles.todoCount}>
        Активных задач: {activeCount}
      </div>

      <div className={styles.todosContainer}>
        {filteredTodos.length > 0 ? (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            {filter === 'all' ? 'Нет задач' : 
             filter === 'active' ? 'Нет активных задач' : 'Нет завершенных задач'}
          </div>
        )}
      </div>
    </div>
  );
}