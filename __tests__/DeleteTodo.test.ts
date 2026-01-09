import { MockTodoRepository } from './mocks/MockTodoRepository';

describe('DeleteTodo', () => {
  it('should delete todo', async () => {
    const repo = new MockTodoRepository();

    const createdTodo = await repo.addTodo({
      title: 'Delete me',
      status: 'PENDING',
    });
    let todos = await repo.getTodos();
    expect(todos.length).toBe(1);

    await repo.deleteTodo(createdTodo.id);
    todos = await repo.getTodos();
    expect(todos.length).toBe(0);
  });
});
