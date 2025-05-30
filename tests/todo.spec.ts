import { test, expect } from '@playwright/test';

test.describe('Приложение Todo', () => {
  test.beforeEach(async ({ page }) => {
    // Переход к приложению перед каждым тестом
    await page.goto('/');
  });

  test('должно отображать приложение todo с пустым списком', async ({ page }) => {
    // Проверка начального состояния показывает сообщение о пустом списке
    await expect(page.getByTestId('empty-message')).toBeVisible();

    // Проверка наличия всех элементов интерфейса
    await expect(page.getByTestId('todo-form')).toBeVisible();
    await expect(page.getByTestId('todo-input')).toBeVisible();
    await expect(page.getByTestId('add-todo-button')).toBeVisible();
  });

  test('должно добавлять новую задачу при отправке', async ({ page }) => {
    // Получение элементов
    const todoInput = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');

    // Добавление задачи
    await todoInput.fill('Купить продукты');
    await addButton.click();

    // Проверка, что задача добавлена
    const todoText = page.getByTestId(/todo-text-/);
    await expect(todoText).toBeVisible();
    await expect(todoText).toHaveText('Купить продукты');

    // Сообщение о пустом списке должно исчезнуть
    await expect(page.getByTestId('empty-message')).not.toBeVisible();
  });

  test('должно отмечать задачу как выполненную', async ({ page }) => {
    // Сначала добавляем задачу
    const todoInput = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');
    await todoInput.fill('Выполнить тестовое задание');
    await addButton.click();

    // Получаем чекбокс и кликаем по нему
    const checkbox = page.getByTestId(/todo-checkbox-/);
    await checkbox.check();

    // Проверяем, что задача отмечена как выполненная (имеет класс "completed")
    const todoText = page.getByTestId(/todo-text-/);
    await expect(todoText).toHaveClass(/completed/);
  });

  test('должно удалять задачу', async ({ page }) => {
    // Сначала добавляем задачу
    const todoInput = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');
    await todoInput.fill('Удалить эту задачу');
    await addButton.click();

    // Проверяем, что задача существует
    const todoText = page.getByTestId(/todo-text-/);
    await expect(todoText).toBeVisible();

    // Удаляем задачу
    const deleteButton = page.getByTestId(/todo-delete-/);
    await deleteButton.click();

    // Проверяем, что задача исчезла и появилось сообщение о пустом списке
    await expect(todoText).not.toBeVisible();
    await expect(page.getByTestId('empty-message')).toBeVisible();
  });

  test('должно добавлять несколько задач', async ({ page }) => {
    // Получение элементов
    const todoInput = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');

    // Добавление трёх задач
    const todos = ['Первая задача', 'Вторая задача', 'Третья задача'];

    for (const todo of todos) {
      await todoInput.fill(todo);
      await addButton.click();
    }

    // Проверка, что все задачи добавлены
    const todoItems = page.locator('.todo-item');
    await expect(todoItems).toHaveCount(3);

    // Проверка текста каждой задачи
    for (let i = 0; i < todos.length; i++) {
      await expect(todoItems.nth(i).locator('.todo-text')).toHaveText(todos[i]);
    }
  });

  test('кнопка удаления должна быть красного цвета', async ({ page }) => {
    // Сначала добавляем задачу
    const todoInput = page.getByTestId('todo-input');
    const addButton = page.getByTestId('add-todo-button');
    await todoInput.fill('Тестовая задача');
    await addButton.click();

    // Проверяем цвет кнопки удаления
    const deleteButton = page.getByTestId(/todo-delete-/);
    const buttonColor = await deleteButton.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('background-color');
    });

    // Проверяем, что цвет соответствует красному (в формате rgb)
    expect(buttonColor).toBe('rgb(239, 68, 68)'); // Это соответствует цвету bootstrap danger
  });

  test('кнопка добавления должна быть синего цвета', async ({ page }) => {
    // Находим кнопку добавления
    const addButton = page.getByTestId('add-todo-button');

    // Получаем цвет кнопки
    const buttonColor = await addButton.evaluate((el) => {
      return window.getComputedStyle(el).getPropertyValue('background-color');
    });

    // Проверяем, что цвет соответствует синему (в формате rgb)
    expect(buttonColor).toBe('rgb(52, 102, 246)'); // Стандартный синий цвет Bootstrap
  });
});