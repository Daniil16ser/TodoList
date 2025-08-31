import TodoList from './components/TodoList';
import { mockTodos } from './data/mockTodos';

async function getInitialTodos() {
  return mockTodos;
}

export default async function Home() {
  const initialTodos = await getInitialTodos();

  return (
    <main className="container">
      <h1>Умный Todo List</h1>
      <TodoList initialTodos={initialTodos} />
    </main>
  );
}