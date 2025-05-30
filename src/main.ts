import './style.css';
import { setupTodoApp } from './components/todoApp';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="container">
    <h1>Todo App</h1>
    <div id="todo-app" class="card"></div>
    <p class="footer">
      Built with TypeScript and Vite
    </p>
  </div>
`;

setupTodoApp(document.querySelector<HTMLDivElement>('#todo-app')!);