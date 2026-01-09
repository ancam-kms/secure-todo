import { MockTodoRepository } from './mocks/MockTodoRepository';

describe('GetTodoById', () => {
  it('should return todo by id', async () => {
    const repo = new MockTodoRepository();

    const createdTodo = await repo.addTodo({
      title: 'Find me',
      status: 'PENDING',
    });

    const todo = await repo.getById(createdTodo.id);
    expect(todo).not.toBeNull();
    expect(todo?.title).toBe('Find me');
  });

  it('should return null if not found', async () => {
    const repo = new MockTodoRepository();
    const todo = await repo.getById('404');
    expect(todo).toBeNull();
  });
});
