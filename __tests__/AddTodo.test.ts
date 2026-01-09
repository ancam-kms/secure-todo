import { MockTodoRepository } from './mocks/MockTodoRepository';

describe('AddTodo', () => {
  it('should add a todo', async () => {
    const repo = new MockTodoRepository();

    await repo.addTodo({
      title: 'New Todo',
      status: 'PENDING',
      description: 'Description new todo',
    });

    const todos = await repo.getTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].title).toBe('New Todo');
  });
});
