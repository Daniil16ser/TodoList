import TodoList from './components/TodoList';

async function getInitialTodos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5');
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const todos = await response.json();
    return todos.map((todo: any) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    }));
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
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