export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

/**
 * Sets up todo list functionality
 */
export function setupTodoList(container: HTMLElement) {
  let todos: Todo[] = [];
  
  const renderTodos = () => {
    // Clear current todos
    container.innerHTML = '';
    
    if (todos.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'empty-message';
      emptyMessage.textContent = 'No todos yet. Add one above!';
      emptyMessage.setAttribute('data-testid', 'empty-message');
      container.appendChild(emptyMessage);
      return;
    }
    
    // Create todo list
    const list = document.createElement('ul');
    list.className = 'todo-list';
    
    // Add todos to list
    todos.forEach(todo => {
      const item = document.createElement('li');
      item.className = 'todo-item';
      item.setAttribute('data-id', todo.id);
      
      // Create checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'todo-checkbox';
      checkbox.checked = todo.completed;
      checkbox.setAttribute('data-testid', `todo-checkbox-${todo.id}`);
      checkbox.addEventListener('change', () => {
        toggleTodo(todo.id);
      });
      
      // Create text element
      const text = document.createElement('span');
      text.className = `todo-text ${todo.completed ? 'completed' : ''}`;
      text.textContent = todo.text;
      text.setAttribute('data-testid', `todo-text-${todo.id}`);
      
      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.className = 'todo-delete danger';
      deleteButton.textContent = '✕';
      deleteButton.setAttribute('data-testid', `todo-delete-${todo.id}`);
      deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id);
      });
      
      // Add elements to item
      item.appendChild(checkbox);
      item.appendChild(text);
      item.appendChild(deleteButton);
      
      // Add item to list
      list.appendChild(item);
    });
    
    // Add list to container
    container.appendChild(list);
  };
  
  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false
    };
    
    todos = [...todos, newTodo];
    renderTodos();
    
    return newTodo;
  };
  
  const deleteTodo = (id: string) => {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  };
  
  const toggleTodo = (id: string) => {
    todos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
  };
  
  const clearCompleted = () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
  };
  
  // Initialize empty todo list
  renderTodos();
  
  // Return methods for testing and external access
  return {
    addTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    getTodos: () => [...todos]
  };
}