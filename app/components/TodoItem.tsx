'use client';

import { Todo } from './types';
import styles from './styles.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number | string) => void;
  onDelete: (id: number | string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className={styles.checkbox}
      />
      <span className={styles.todoText}>{todo.title}</span>
      <button
        onClick={() => onDelete(todo.id)}
        className={styles.deleteButton}
      >
        ×
      </button>
    </div>
  );
}