import { setupTodoList } from './todoList';
import { setupTodoInput } from './todoInput';

/**
 * Sets up the todo app in the specified element
 */
export function setupTodoApp(element: HTMLElement) {
  // Create todo container
  const todoContainer = document.createElement('div');
  todoContainer.className = 'todo-container';
  
  // Create todo input container
  const todoInputContainer = document.createElement('div');
  todoInputContainer.className = 'todo-input-container';
  
  // Create todo list container
  const todoListContainer = document.createElement('div');
  todoListContainer.className = 'todo-list-container';
  todoListContainer.setAttribute('data-testid', 'todo-list');
  
  // Assemble the todo app
  todoContainer.appendChild(todoInputContainer);
  todoContainer.appendChild(todoListContainer);
  element.appendChild(todoContainer);
  
  // Set up todo functionality
  const todoActions = setupTodoList(todoListContainer);
  
  // Set up todo input
  setupTodoInput(todoInputContainer, todoActions.addTodo);
}