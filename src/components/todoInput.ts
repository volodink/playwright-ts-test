/**
 * Sets up input field to add new todos
 */
export function setupTodoInput(
  container: HTMLElement,
  addTodo: (text: string) => any
) {
  // Create form element
  const form = document.createElement('form');
  form.className = 'todo-form';
  form.setAttribute('data-testid', 'todo-form');
  
  // Create input field
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Add a new todo...';
  input.className = 'todo-input';
  input.setAttribute('data-testid', 'todo-input');
  
  // Create add button
  const addButton = document.createElement('button');
  addButton.type = 'submit';
  addButton.textContent = 'Add';
  addButton.className = 'todo-add';
  addButton.setAttribute('data-testid', 'add-todo-button');
  
  // Add elements to form
  form.appendChild(input);
  form.appendChild(addButton);
  
  // Add form to container
  container.appendChild(form);
  
  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const text = input.value;
    if (text.trim() !== '') {
      addTodo(text);
      input.value = '';
      input.focus();
    }
  });
}